import { GraphicsAPI } from "../api/graphics-api.js";

export default function performCodeSurgery(code) {

  // 1. ensure that anything that needs to run by first calling its super function, does so.

  GraphicsAPI.superCallers.forEach((name) => {
    const re = new RegExp(`${name}\\(([^)]*)\\)[\\s\\r\\n]*{[\\s\\r\\n]*`, `g`);
    code = code.replace(re, `${name}($1) { super.${name}($1);\n`);
  });

  // 2. rewrite event handlers so that they capture the event and forward it to the super function.

  GraphicsAPI.eventHandlers.forEach((name) => {
    const re = new RegExp(`${name}\\(\\)[\\s\\r\\n]*{[\\s\\r\\n]*`, `g`);
    code = code.replace(re, `${name}(evt) { super.${name}(evt);\n`);
  });

  // 3. rewrite all public GraphicsAPI functions to have the required `this.` prefix

  GraphicsAPI.methods.forEach((fn) => {
    const re = new RegExp(`([\\s\\r\\n])${fn}\\(`, `g`);
    code = code.replace(re, `$1this.${fn}(`);
  });

  // 4. do the same for all GraphicsAPI constants.

  GraphicsAPI.constants.forEach((name) => {
    const re = new RegExp(`(\\b)${name}(\\b)`, `g`);
    code = code.replace(re, `$1this.${name}$2`);
  });

  return code;
}
