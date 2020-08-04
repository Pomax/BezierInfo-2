/**
 * The base API class, responsible for such things as setting up canvas event
 * handling, method accumulation, custom element binding, etc. etc.
 *
 * Basically if it's not part of the "public" API, it's in this class.
 */
class BaseAPI {
  static get privateMethods() {
    return [`constructor`, `addListeners`, `getMouseCoords`]
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
    const names = Object.getOwnPropertyNames(this.prototype).concat([`setSize`, `showFocus`, `redraw`]);
    return names.filter((v) => priv.indexOf(v) < 0);
  }

  /**
   *
   */
  constructor(uid, width = 200, height = 200) {
    this.element = window[uid];
    delete window[uid];
    this.canvas = document.createElement(`canvas`);
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
    const element = this.element;
    element.setGraphic(this);

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
  getMouseCoords(evt) {
    this.cursor.x = evt.offsetX;
    this.cursor.y = evt.offsetY;
  }

  /**
   *
   */
  onMouseDown(evt) {
    stop(evt);
    this.cursor.button = evt.button;
    this.cursor.down = true;
    this.getMouseCoords(evt);
  }

  /**
   *
   */
  onMouseMove(evt) {
    stop(evt);
    this.cursor.button = undefined;
    this.cursor.move = true;
    this.getMouseCoords(evt);
  }

  /**
   *
   */
  onMouseUp(evt) {
    stop(evt);
    this.cursor.button = evt.button;
    this.cursor.down = false;
    this.cursor.move = false;
    this.getMouseCoords(evt);
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
    const canvas = this.canvas;
    if (show) {
      canvas.setAttribute(`tabIndex`, 0);
      canvas.classList.add(`focus-enabled`);
      canvas._force_listener = () => this.forceFocus();
      [`touchstart`, `mousedown`].forEach((evtName) =>
        canvas.addEventListener(evtName, canvas._force_listener)
      );
    } else {
      canvas.removeAttribute(`tabIndex`);
      canvas.classList.remove(`focus-enabled`);
      [`touchstart`, `mousedown`].forEach((evtName) =>
        canvas.removeEventListener(evtName, canvas._force_listener)
      );
    }
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
    this.canvas.width = this.width;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.height = this.height;
    this.ctx = enhanceContext(this.canvas.getContext(`2d`));
  }

  /**
   * This is the main entry point.
   */
  setup() {
    // console.log(`setup`);
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
    styles.push({
      strokeStyle: ctx.strokeStyle,
      fillStyle: ctx.fillStyle,
      lineWidth: ctx.lineWidth,
    });
  };
  ctx.restoreStyle = () => {
    const v = styles.pop();
    Object.keys(v).forEach((k) => (ctx[k] = v[k]));
  };
  return ctx;
}

// Outright kill off an event.
function stop(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

export { BaseAPI };
