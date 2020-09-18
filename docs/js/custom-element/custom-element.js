const REG_KEY = `registered as custom element`;

// helper function
function NotImplemented(instance, fname) {
  console.warn(`missing implementation for ${fname}(...data) in ${instance.__proto__.constructor.name}`);
}

// helper function for turning "ClassName" into "class-name"
function getElementTagName(cls) {
  return cls.prototype.constructor.name.replace(/([A-Z])([a-z])/g, (a, b, c, d) => {
    const r = `${b.toLowerCase()}${c}`;
    return d > 0 ? `-${r}` : r;
  });
}

/**
 * This is an enrichment class to make working with custom elements
 * actually pleasant, rather than a ridiculous exercise in figuring
 * out a low-level spec.
 */
class CustomElement extends HTMLElement {
  static register(cls) {
    if (!cls[REG_KEY]) {
      const tagName = cls.tagName || getElementTagName(cls);
      customElements.define(tagName, cls);
      cls[REG_KEY] = true;
      return customElements.whenDefined(tagName);
    }
    return Promise.resolve();
  }

  static get tagName() {
    return getElementTagName(this);
  }

  constructor(options = {}) {
    super();

    if (!customElements.resolveScope) {
      customElements.resolveScope = function (scope) {
        try {
          return scope.getRootNode().host;
        } catch (e) {
          console.warn(e);
        }
        return window;
      };
    }

    this._options = options;

    const route = {
      childList: (record) => {
        this.handleChildChanges(Array.from(record.addedNodes), Array.from(record.removedNodes));
        this.render();
      },
      attributes: (record) => {
        this.handleAttributeChange(record.attributeName, record.oldValue, this.getAttribute(record.attributeName));
        this.render();
      },
    };

    // Set up a mutation observer because there are no custom
    // element lifecycle functions for changes to the childNodes
    // nodelist.

    this._observer = new MutationObserver((records) => {
      if (this.isConnected) {
        records.forEach((record) => {
          // console.log(record);
          route[record.type](record);
        });
      }
    });

    this._observer.observe(this, {
      childList: true,
      attributes: true,
    });

    // Set up an open shadow DOM, because the web is open,
    // and hiding your internals is ridiculous.

    const shadowProps = { mode: `open` };

    this._shadow = this.attachShadow(shadowProps);
    this._style = document.createElement(`style`);
    this._style.textContent = this.getStyle();

    if (this._options.header !== false) this._header = document.createElement(`header`);
    if (this._options.slot !== false && this._options.void !== true) this._slot = document.createElement(`slot`);
    if (this._options.footer !== false) this._footer = document.createElement(`footer`);
  }

  connectedCallback() {
    this.render();
  }

  handleChildChanges(added, removed) {
    if (!this._options.void) NotImplemented(this, `handleChildChanges`);
  }

  handleAttributeChange(name, oldValue, newValue) {
    NotImplemented(this, `handleAttributeChange`);
  }

  getStyle() {
    return ``;
  }

  render() {
    this._shadow.innerHTML = ``;
    this._shadow.append(this._style);
    if (this._options.header !== false) this._shadow.append(this._header);
    if (this._options.slot !== false) this._shadow.append(this._slot);
    if (this._options.footer !== false) this._shadow.append(this._footer);
  }
}

export { CustomElement };
