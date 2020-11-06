import fs from "fs-extra";
import path from "path";
import paths from "../../../../project-paths.js";
import splitCodeSections from "../../../../../docs/js/graphics-element/lib/split-code-sections.js";
import performCodeSurgery from "../../../../../docs/js/graphics-element/lib/perform-code-surgery.js";
import toPosix from "../../../../to-posix.js";

// Get all the values we need to ensure our generated graphics code knows
// where it lives, and where it can find all its dependencies

const apiSource = fs.readFileSync(path.join(paths.sitejs, `graphics-element`, `api`, `graphics-api.js`)).toString(`utf-8`);

const API_IMPORTS = apiSource.match(/(export { [^}]+ })/)[0].replace(`export`, `import`);

const GRAPHICS_API_LOCATION = path
  .join(path.relative(paths.temp, paths.public), `js`, `graphics-element`, `api`, `graphics-api.js`)
  .split(path.sep)
  .join(path.posix.sep);

const IMPORT_GLOBALS_FROM_GRAPHICS_API = `${API_IMPORTS} from "${GRAPHICS_API_LOCATION}"`;

/**
 * Node does not have a native canvas available, so we  need to shim a number
 * of objects and functions to ensure it can generate a "first load" snapshot
 * image use the node-canvas library, instead.
 */
const canvasBuilder = function canvasBuilder(w, h) {
  const canvas = CanvasBuilder.createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  canvas.addEventListener = canvas.setAttribute = noop;
  canvas.classList = { add: noop };
  canvas.style = {};
  ctx.getTransform = () => ctx.currentTransform;
  return { canvas, ctx };
};

/**
 * ...docs go here...
 */
function generateGraphicsModule(pathdata, code, width, height, dataset) {
  const { file } = pathdata;
  const relativeWriteDir = toPosix(path.relative(paths.temp, path.dirname(file)));

  // step 1: fix the imports
  code = code.replace(/(import .+? from) "([^"]+)"/g, (_, main, group) => {
    return `${main} "${relativeWriteDir}/${group}"`;
  });

  // step 2: split up the code into "global" vs. "class" code
  const split = splitCodeSections(code);
  const globalCode = split.quasiGlobal;
  const classCode = performCodeSurgery(split.classCode);

  let moduleCode = `
    import CanvasBuilder from 'canvas';
    ${IMPORT_GLOBALS_FROM_GRAPHICS_API};

    const noop = (()=>{});
    const Image = CanvasBuilder.Image;

    ${globalCode}

    class Example extends GraphicsAPI { ${classCode} }

    const canvasBuilder = ${canvasBuilder}
    const dataset = ${JSON.stringify(dataset)};
    const example = new Example(undefined, ${width}, ${height}, canvasBuilder, dataset);
    const canvas = example.canvas;

    export { canvas };
  `;

  return moduleCode;
}

export { generateGraphicsModule };
