import { enrich } from "./enrich.js";

const noop = () => {};

function create(tag) {
  if (typeof document !== `undefined`) {
    return enrich(document.createElement(tag));
  }

  const element = {
    name: tag,
    tag: tag.toUpperCase(),
    append: noop,
    appendChild: noop,
    replaceChild: noop,
    removeChild: noop,
    classList: {
      add: noop,
      remove: noop,
    },
    children: [],
  };

  return element;
}

export { create };
