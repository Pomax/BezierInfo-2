/**
 * The base API class, responsible for such things as setting up canvas event
 * handling, method accumulation, custom element binding, etc. etc.
 *
 * Basically if it's not part of the "public" API, it's in this class.
 */
class BaseAPI {
  static get privateMethods() {
    return [`constructor`, `addListeners`, `getCursorCoords`]
      .concat(this.superCallers)
      .concat(this.eventHandlers);
  }

  static get superCallers() {
    return [`setup`, `draw`];
  }

  static get eventHandlers() {
    return [`onMouseDown`, `onMouseMove`, `onMouseUp`, `onKeyDown`, `onKeyUp`];
  }

  static get methods() {
    const priv = this.privateMethods;
    const names = Object.getOwnPropertyNames(this.prototype).concat([
      `setSize`,
      `showFocus`,
      `redraw`,
    ]);
    return names.filter((v) => priv.indexOf(v) < 0);
  }

  /**
   *
   */
  constructor(uid, width = 200, height = 200, canvasBuildFunction) {
    if (uid) {
      this.element = window[uid];
      delete window[uid];
    }
    if (canvasBuildFunction) {
      const { canvas, ctx } = canvasBuildFunction(width, height);
      this.canvas = canvas;
      this.ctx = enhanceContext(ctx);
      this.preSized = true;
    } else {
      this.canvas = document.createElement(`canvas`);
    }
    this.addListeners();
    this.setSize(width, height);
    this.setup();
    this.draw();
  }

  /**
   *
   */
  addListeners() {
    const canvas = this.canvas;

    if (this.element) {
      this.element.setGraphic(this);
    }

    this.cursor = {};

    [`touchstart`, `mousedown`].forEach((evtName) =>
      canvas.addEventListener(evtName, (evt) => this.onMouseDown(evt))
    );

    [`touchmove`, `mousemove`].forEach((evtName) =>
      canvas.addEventListener(evtName, (evt) => this.onMouseMove(evt))
    );

    [`touchend`, `mouseup`].forEach((evtName) =>
      canvas.addEventListener(evtName, (evt) => this.onMouseUp(evt))
    );

    this.keyboard = {};

    [`keydown`].forEach((evtName) =>
      canvas.addEventListener(evtName, (evt) => this.onKeyDown(evt))
    );

    [`keyup`].forEach((evtName) =>
      canvas.addEventListener(evtName, (evt) => this.onKeyUp(evt))
    );
  }

  /**
   *
   */
  getCursorCoords(evt) {
    const left = evt.target.offsetLeft,
          top = evt.target.offsetTop;

          let x, y;

    if (evt.targetTouches) {
      const touch = evt.targetTouches;
      for (let i=0; i<touch.length; i++) {
        console.log(touch[i]);
        if (!touch[i] || !touch[i].pageX) continue;
        x = touch[i].pageX - left;
        y = touch[i].pageY - top;
      }
    } else {
      x = evt.pageX - left;
      y = evt.pageY - top;
    }
    this.cursor.x = x;
    this.cursor.y = y;
  }

  /**
   *
   */
  onMouseDown(evt) {
    stop(evt);
    this.cursor.down = true;
    this.getCursorCoords(evt);
  }

  /**
   *
   */
  onMouseMove(evt) {
    stop(evt);
    this.cursor.move = true;
    this.getCursorCoords(evt);
  }

  /**
   *
   */
  onMouseUp(evt) {
    stop(evt);
    this.cursor.down = false;
    this.cursor.move = false;
    this.getCursorCoords(evt);
  }

  /**
   *
   */
  safelyInterceptKey(evt) {
    // We don't want to interfere with the browser, so we're only
    // going to allow unmodified keys, or shift-modified keys.
    if (!evt.altKey && !evt.ctrlKey && !evt.metaKey) {
      stop(evt);
    }
  }

  /**
   *
   */
  onKeyDown(evt) {
    this.safelyInterceptKey(evt);
    // FIXME: Known bug: this approach means that "shift + r + !shift + !r" leaves "R" set to true
    this.keyboard[evt.key] = true;
    this.keyboard.currentKey = evt.key;
  }

  /**
   *
   */
  onKeyUp(evt) {
    this.safelyInterceptKey(evt);
    // FIXME: Known bug: this approach means that "shift + r + !shift + !r" leaves "R" set to true
    this.keyboard[evt.key] = false;
    this.keyboard.currentKey = evt.key;
  }

  /**
   * Determine whether or not the canva should be focussed when interacted with.
   */
  showFocus(show = true) {
    if (show === false) {
      return this.noFocus();
    }

    const canvas = this.canvas;
    canvas.setAttribute(`tabIndex`, 0);
    canvas.classList.add(`focus-enabled`);
    canvas._force_listener = () => this.forceFocus();
    [`touchstart`, `mousedown`].forEach((evtName) =>
      canvas.addEventListener(evtName, canvas._force_listener)
    );
  }

  noFocus() {
    const canvas = this.canvas;
    canvas.removeAttribute(`tabIndex`);
    canvas.classList.remove(`focus-enabled`);
    [`touchstart`, `mousedown`].forEach((evtName) =>
      canvas.removeEventListener(evtName, canvas._force_listener)
    );
  }

  /**
   * Force the browser to .focus() on the canvas, as focus
   * from custom elements is ... unreliable?
   */
  forceFocus() {
    this.canvas.focus();
  }

  /**
   * This function is critical in correctly sizing the canvas.
   */
  setSize(w, h) {
    this.width = w || this.width;
    this.height = h || this.height;
    if (!this.preSized) {
      this.canvas.width = this.width;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.height = this.height;
      this.ctx = enhanceContext(this.canvas.getContext(`2d`));
    }
  }

  /**
   * This is the main entry point.
   */
  setup() {
    // console.log(`setup`);
    this.showFocus();
    this.moveable = [];
  }

  /**
   * This is the draw (loop) function.
   */
  draw() {
    // console.log(`draw`);
  }

  /**
   * This is mostly a safety function, to
   * prevent direct calls to draw().. it might
   * disappear.
   */
  redraw() {
    this.draw();
  }
}

// Ensure there are cacheStyle/restoreStyle functions
// on the Canvas context, so that it's trivial to make
// temporary changes.
function enhanceContext(ctx) {
  const styles = [];
  ctx.cacheStyle = () => {
    let m = ctx.currentTransform || ctx.getTransform();
    let e = {
      strokeStyle: ctx.strokeStyle,
      fillStyle: ctx.fillStyle,
      lineWidth: ctx.lineWidth,
      transform: [m.a, m.b, m.c, m.d, m.e, m.f],
    };
    styles.push(e);
  };
  ctx.restoreStyle = () => {
    const v = styles.pop();
    Object.keys(v).forEach((k) => {
      let val = v[k];
      if (k !== `transform`) ctx[k] = val;
      else ctx.setTransform(val[0], val[1], val[2], val[3], val[4], val[5]);
    });
  };
  return ctx;
}

// Outright kill off an event.
function stop(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

export { BaseAPI };
