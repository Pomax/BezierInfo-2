import { CustomElement } from "./custom-element.js";

import splitCodeSections from "./lib/split-code-sections.js";
import performCodeSurgery from "./lib/perform-code-surgery.js";

const MODULE_URL = import.meta.url;
const MODULE_PATH = MODULE_URL.slice(0, MODULE_URL.lastIndexOf(`/`));

/**
 * A simple "for programming code" element, for holding entire
 * programs, rather than code snippets.
 */
CustomElement.register(class ProgramCode extends HTMLElement {});

/**
 * Our custom element
 */
class GraphicsElement extends CustomElement {
  constructor() {
    super({ header: false, footer: false, focus: true });
    this.loadSource();
    if (this.title) {
      this.label = document.createElement(`label`);
      this.label.textContent = this.title;
    }
  }

  /**
   * part of the CustomElement API
   */
  getStyle() {
    // TODO: document the "focus-css" attribute
    return `
      :host([hidden]) { display: none; }
      :host style { display: none; }
      :host canvas { display: block; margin: auto; border-radius: 0; }
      :host canvas:focus { ${
        this.getAttribute(`focus-css`) || `border: 1px solid red !important;  margin: -1px; `
      } }
      :host a.view-source { float: left; font-size: 60%; text-decoration: none; }
      :host label { display: block; font-style:italic; font-size: 0.9em; text-align: right; }
    `;
  }

  /**
   * part of the CustomElement API
   */
  handleChildChanges(added, removed) {
    // console.log(`child change:`, added, removed);
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
    let codeElement = this.querySelector(`program-code`);

    let code = ``;

    if (codeElement) {
      let src = codeElement.getAttribute("src");
      if (src) {
        code = await fetch(src).then((response) => response.text());
      } else {
        code = codeElement.textContent;
      }
    } else {
      let src = this.getAttribute("src");
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
      this.processSource(codeElement.textContent);
    }).observe(codeElement, {
      characterData: true,
      attributes: false,
      childList: true,
      subtree: true,
    });

    // But on the first pass, we do.
    this.processSource(code, true);
  }

  /**
   * Transform the graphics source code into global and class code.
   */
  processSource(code, rerender = false) {
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

    const split = splitCodeSections(code);
    const globalCode = split.quasiGlobal;
    const classCode = performCodeSurgery(split.classCode);

    this.setupCodeInjection(uid, globalCode, classCode, rerender);
  }

  /**
   * Form the final, perfectly valid JS module code, and create the <script>
   * element for it, to be inserted into the shadow DOM during render().
   */
  setupCodeInjection(uid, globalCode, classCode, rerender) {
    const width = this.getAttribute(`width`, 200);
    const height = this.getAttribute(`height`, 200);

    this.code = `
      import { GraphicsAPI, Bezier, Point } from "${MODULE_PATH}/api/graphics-api.js";

      ${globalCode}

      class Example extends GraphicsAPI {
        ${classCode}
      }

      new Example('${uid}', ${width}, ${height});
    `;

    const script = (this.script = document.createElement(`script`));
    script.type = "module";
    script.src = URL.createObjectURL(
      new Blob([this.code], { type: `text/javascript` })
    );

    if (rerender) this.render();
  }

  /**
   * Hand the <graphics-element> a reference to the "Example" instance that it built.
   */
  setGraphic(apiInstance) {
    this.apiInstance = apiInstance;
    this.setCanvas(apiInstance.canvas);
  }

  /**
   * Locally bind the Example's canvas, since it needs to get added to the shadow DOM.
   */
  setCanvas(canvas) {
    this.canvas = canvas;
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
    console.log(
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

    const a = document.createElement('a');
    a.classList.add('view-source');
    a.textContent = `view source`;
    a.href = new URL(`data:text/plain;charset=utf-8,${encodeURIComponent(this.rawCode)}`);
    a.target = `_blank`;
    if (this.label) slotParent.insertBefore(a, this.label);
  }
}

CustomElement.register(GraphicsElement);

export { GraphicsElement };
