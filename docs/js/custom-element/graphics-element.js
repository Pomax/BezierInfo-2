import { CustomElement } from "./custom-element.js";

import splitCodeSections from "./lib/split-code-sections.js";
import performCodeSurgery from "./lib/perform-code-surgery.js";

const MODULE_URL = import.meta.url;
const MODULE_PATH = MODULE_URL.slice(0, MODULE_URL.lastIndexOf(`/`));

// Really wish this was baked into the DOM API...
function isInViewport(e) {
  if (typeof window === `undefined`) return true;
  if (typeof document === `undefined`) return true;

  var b = e.getBoundingClientRect();
  return (
    b.top >= 0 &&
    b.left >= 0 &&
    b.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    b.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * A simple "for programming code" element, for holding entire
 * programs, rather than code snippets.
 */
CustomElement.register(class ProgramCode extends HTMLElement {});

/**
 * Our custom element
 */
class GraphicsElement extends CustomElement {
  static DEBUG = false;

  /**
   * Create an instance of this element
   */
  constructor() {
    super({ header: false, footer: false });

    // Do we load immediately?
    if (isInViewport(this)) {
      this.loadSource();
    }

    // Or do we load later, once we've been scrolled into view?
    else {
      let fallback = this.querySelector(`img`);
      new IntersectionObserver(
        (entries, observer) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadSource();
              observer.disconnect();
            }
          }),
        { threshold: 0.1, rootMargin: `${window.innerHeight}px` }
      ).observe(fallback);
    }

    this.label = document.createElement(`label`);
    if (!this.title) this.title = ``;
    this.label.textContent = this.title;
  }

  /**
   * part of the CustomElement API
   */
  getStyle() {
    return `
      :host([hidden]) { display: none; }
      :host style { display: none; }
      :host canvas { position: relative; z-index: 1; display: block; margin: auto; border-radius: 0; box-sizing: content-box!important; border: 1px solid lightgrey; }
      :host canvas:focus { border: 1px solid red; }
      :host a.view-source { display: block; position:relative; top: -0.6em; margin-bottom: -0.2em; font-size: 60%; text-decoration: none; }
      :host label { display: block; font-style:italic; font-size: 0.9em; text-align: right; }
    `;
  }

  /**
   * part of the CustomElement API
   */
  handleChildChanges(added, removed) {
    // debugLog(`child change:`, added, removed);
  }

  /**
   * part of the CustomElement API
   */
  handleAttributeChange(name, oldValue, newValue) {
    if (name === `title`) {
      this.label.textContent = this.getAttribute(`title`);
    }
    if (this.apiInstance) {
      let instance = this.apiInstance;
      if (name === `width`) {
        instance.setSize(parseInt(newValue), false);
        instance.redraw();
      }
      if (name === `height`) {
        instance.setSize(false, parseInt(newValue));
        instance.redraw();
      }
    }
  }

  /**
   * Load the graphics code, either from a src URL, a <program-code> element, or .textContent
   */
  async loadSource() {
    debugLog(`loading ${this.getAttribute(`src`)}`);

    let src = false;
    let codeElement = this.querySelector(`program-code`);

    let code = ``;

    if (codeElement) {
      src = codeElement.getAttribute("src");
      if (src) {
        code = await fetch(src).then((response) => response.text());
      } else {
        code = codeElement.textContent;
      }
    } else {
      src = this.getAttribute("src");
      if (src) {
        code = await fetch(src).then((response) => response.text());
      } else {
        code = this.textContent;
      }
    }

    if (!codeElement) {
      codeElement = document.createElement(`program-code`);
      codeElement.textContent = code;
      this.prepend(codeElement);
    }

    codeElement.setAttribute(`hidden`, `hidden`);

    new MutationObserver((_records) => {
      // nornmally we don't want to completely recreate the shadow DOM
      this.processSource(src, codeElement.textContent);
    }).observe(codeElement, {
      characterData: true,
      attributes: false,
      childList: true,
      subtree: true,
    });

    // But on the first pass, we do.
    this.processSource(src, code, true);
  }

  /**
   * Transform the graphics source code into global and class code.
   */
  processSource(src, code, rerender = false) {
    this.rawCode = code;
    if (this.script) {
      if (this.script.parentNode) {
        this.script.parentNode.removeChild(this.script);
      }
      this.canvas.parentNode.removeChild(this.canvas);
      rerender = true;
    }

    const uid = `bg-uid-${Date.now()}-${`${Math.random()}`.replace(`0.`, ``)}`;
    window[uid] = this;

    // Step 1: fix the imports. This is ... a bit of work.
    let path;
    let base = document.querySelector(`base`);
    if (base) {
      path = base.href;
    } else {
      let loc = window.location.toString();
      path = loc.substring(0, loc.lastIndexOf(`/`) + 1);
    }
    let modulepath = `${path}${src}`;
    let modulebase = modulepath.substring(0, modulepath.lastIndexOf(`/`) + 1);

    // okay, I lied, it's actually quite a lot of work.
    code = code.replace(/(import .+? from) "([^"]+)"/g, (_, main, group) => {
      return `${main} "${modulebase}${group}"`;
    });

    // Then, step 2: split up the code into "global" vs. "class" code.
    const split = splitCodeSections(code);
    const globalCode = split.quasiGlobal;
    const classCode = performCodeSurgery(split.classCode);

    this.setupCodeInjection(src, uid, globalCode, classCode, rerender);
  }

  /**
   * Form the final, perfectly valid JS module code, and create the <script>
   * element for it, to be inserted into the shadow DOM during render().
   */
  setupCodeInjection(src, uid, globalCode, classCode, rerender) {
    const width = this.getAttribute(`width`, 200);
    const height = this.getAttribute(`height`, 200);

    this.code = `
      /**
       * Program source: ${src}
       * Data attributes: ${JSON.stringify(this.dataset)}
       */
      import { GraphicsAPI, Bezier, Vector, Matrix, Shape } from "${MODULE_PATH}/api/graphics-api.js";

      ${globalCode}

      class Example extends GraphicsAPI {
        ${classCode}
      }

      new Example('${uid}', ${width}, ${height});
    `;

    const script = (this.script = document.createElement(`script`));
    script.type = "module";
    script.src = `data:application/javascript;charset=utf-8,${encodeURIComponent(
      this.code
    )}`;

    if (rerender) this.render();
  }

  /**
   * Hand the <graphics-element> a reference to the "Example" instance that it built.
   */
  setGraphic(apiInstance) {
    this.apiInstance = apiInstance;
    this.setCanvas(apiInstance.canvas);
    // at this point we can remove our placeholder image for this element, too.
    let fallback = this.querySelector(`fallback-image`);
    if (fallback) this.removeChild(fallback);
  }

  /**
   * Locally bind the Example's canvas, since it needs to get added to the shadow DOM.
   */
  setCanvas(canvas) {
    this.canvas = canvas;
    // Make sure focus works, Which is a CLUSTERFUCK OF BULLSHIT in the August, 2020,
    // browser landscape, so this is the best I can give you right now. I am more
    // disappointed about this than you will ever be.
    this.canvas.setAttribute(`tabindex`, `0`);
    this.canvas.addEventListener(`touchstart`, (evt) => this.canvas.focus());
    this.canvas.addEventListener(`mousedown`, (evt) => this.canvas.focus());
    // If we get here, there were no source code errors: undo the scheduled error print.
    clearTimeout(this.errorPrintTimeout);
    this.render();
  }

  /**
   * This is a helper to aid debugging, mostly because dev tools are not super
   * great at pointing you to the right line for an injected script that it
   * can't actually find anywhere in the document or shadow DOM...
   */
  printCodeDueToError() {
    debugLog(
      this.code
        .split(`\n`)
        .map((l, pos) => `${pos + 1}: ${l}`)
        .join(`\n`)
    );
  }

  /**
   * Regenerate the shadow DOM content.
   */
  render() {
    super.render();

    if (this.script) {
      if (!this.script.__inserted) {
        // Schedule an error print, which will get cleared if there
        // were no source code errors.
        this.errorPrintTimeout = setTimeout(
          () => this.printCodeDueToError(),
          1000
        );
        this.script.__inserted = true;
        this._shadow.appendChild(this.script);
      }
    }

    const slotParent = this._slot.parentNode;
    if (this.canvas) slotParent.insertBefore(this.canvas, this._slot);
    if (this.label) slotParent.insertBefore(this.label, this._slot);

    const a = document.createElement("a");
    a.classList.add("view-source");
    a.textContent = `view source`;
    a.href = new URL(
      `data:text/plain;charset=utf-8,${encodeURIComponent(this.rawCode)}`
    );
    a.target = `_blank`;
    if (this.label) slotParent.insertBefore(a, this.canvas);
  }
}

CustomElement.register(GraphicsElement);

// debugging should be behind a flag
function debugLog(...data) {
  if (GraphicsElement.DEBUG) {
    console.log(...data);
  }
}

export { GraphicsElement };
