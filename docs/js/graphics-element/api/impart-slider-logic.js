import { create } from "../lib/create.js";

export default function impartSliderLogic(GraphicsAPI) {
  /**
   * Dynamically add a slider
   */
  GraphicsAPI.prototype.addSlider = function addSlider(classes, propname, min, max, step, value, transform) {
    if (this.element) {
      let slider = create(`input`);
      slider.type = `range`;
      slider.min = min;
      slider.max = max;
      slider.step = step;
      slider.setAttribute(`value`, value);
      slider.setAttribute(`class`, classes);
      this.element.append(slider);
      return this.setSlider(slider, propname, value, transform);
    }
  };

  /**
   * Update a slider with new min/max/step parameters, and value.
   *
   * @param {*} propname
   * @param {*} min
   * @param {*} max
   * @param {*} step
   * @param {*} value
   */
  GraphicsAPI.prototype.updateSlider = function updateSlider(propname, min, max, step, value) {
    let slider = this._sliders[propname];

    if (!slider) {
      throw new Error(`this.${propname} has no associated slider.`);
    }

    slider.setAttribute(`min`, min);
    slider.setAttribute(`max`, max);
    slider.setAttribute(`step`, step);
    slider.setAttribute(`value`, value);
    slider.updateProperty(value);
  };

  /**
   * Set up a slider to control a named, numerical property in the sketch.
   *
   * @param {String} local query selector for the type=range element.
   * @param {String} propname the name of the property to control.
   * @param {float} initial the initial value for this property.
   * @param {boolean} redraw whether or not to redraw after updating the value from the slider.
   */
  GraphicsAPI.prototype.setSlider = function setSlider(qs, propname, initial, transform) {
    if (propname !== false && typeof this[propname] !== `undefined`) {
      throw new Error(`this.${propname} already exists: cannot bind slider.`);
    }

    this._sliders = this._sliders || {};

    let propLabel = propname.replace(`!`, ``);
    propname = propLabel === propname ? propname : false;

    let slider = typeof qs === `string` ? this.find(qs) : qs;

    // create a slider row in the table of sliders
    let ui = (() => {
      if (!this.element) {
        return { update: (v) => {} };
      }

      let table = find(`table.slider-wrapper`);

      if (!table) {
        table = slider.parentNode.querySelector(`table.slider-wrapper`);
        if (!table) {
          table = create(`table`);
          table.classList.add(`slider-wrapper`);
          slider.parentNode.replaceChild(table, slider);
        }
      }

      let tr = create(`tr`);

      let td = create(`td`);
      let label = create(`label`);
      label.classList.add(`slider-label`);
      label.innerHTML = propLabel;
      td.append(label);
      tr.append(td);

      td = create(`td`);
      slider.classList.add(`slider`);
      this._sliders[propname] = slider;
      td.append(slider);
      tr.append(td);

      td = create(`td`);
      let valueField = create(`label`);
      valueField.classList.add(`slider-value`);
      valueField.textContent;
      td.append(valueField);
      tr.append(td);

      table.append(tr);
      return { update: (v) => (valueField.textContent = v) };
    })();

    if (!slider) {
      console.warn(`Warning: no slider found for query selector "${qs}"`);
      if (propname) this[propname] = initial;
      return undefined;
    }

    let step = slider.getAttribute(`step`) || "1";
    let res = !step.includes(`.`) ? 0 : step.substring(step.indexOf(`.`) + 1).length;

    slider.updateProperty = (evt) => {
      let value = parseFloat(slider.value);
      ui.update(value.toFixed(res));
      try {
        let checked = transform ? transform(value) ?? value : value;
        if (propname) this[propname] = checked;
      } catch (e) {
        if (evt instanceof Event) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        ui.update(e.value.toFixed(res));
        slider.value = e.value;
        slider.setAttribute(`value`, e.value);
      }
      if (!this.redrawing) this.redraw();
    };

    slider.value = initial;
    slider.updateProperty({ target: { value: initial } });
    slider.listen(`input`, (evt) => slider.updateProperty(evt));

    return slider;
  };

  /**
   * remove all sliders from this element
   */
  GraphicsAPI.prototype.removeSliders = function removeSliders() {
    this.findAll(`.slider-wrapper`).forEach((s) => {
      s.parentNode.removeChild(s);
    });
  };

  return GraphicsAPI;
}
