import { enrich } from "./enrich.js";

function create(element) {
  if (typeof document !== `undefined`) {
    return enrich(document.createElement(element));
  }

  return {
    name: element,
    tag: element.toUpperCase(),
  };
}

export { create };
