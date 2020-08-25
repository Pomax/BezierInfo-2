import path from "path";
import paths from "../../project-paths.js";
import prettier from "prettier";
import splitCodeSections from "../../../docs/js/custom-element/lib/split-code-sections.js";
import performCodeSurgery from "../../../docs/js/custom-element/lib/perform-code-surgery.js";

const GRAPHICS_API_LOCATION = path
  .join(
    path.relative(paths.temp, paths.public),
    `js`,
    `custom-element`,
    `api`,
    `graphics-api.js`
  )
  .split(path.sep)
  .join(path.posix.sep);

const RELATIVE_IMPORT_LOCATION = path
  .relative(paths.temp, paths.chapters)
  .split(path.sep)
  .join(path.posix.sep);

/**
 * ...docs go here...
 */
function generateGraphicsModule(chapter, code, width, height, dataset) {
  // step 1: fix the imports
  code = code.replace(/(import .+? from) "([^"]+)"/g, (_, main, group) => {
    return `${main} "${RELATIVE_IMPORT_LOCATION}/${chapter}/${group}"`;
  });

  // step 2: split up the code into "global" vs. "class" code
  const split = splitCodeSections(code);
  const globalCode = split.quasiGlobal;
  const classCode = performCodeSurgery(split.classCode);

  return prettier.format(
    `
        import CanvasBuilder from 'canvas';
        import { GraphicsAPI, Bezier, Vector, Matrix, Shape } from "${GRAPHICS_API_LOCATION}";

        ${globalCode}

        const noop = (()=>{});
        const Image = CanvasBuilder.Image;

        class Example extends GraphicsAPI {
          ${classCode}
        }

        const example = new Example(undefined, ${width}, ${height}, (w,h) => {
            const canvas = CanvasBuilder.createCanvas(w,h);
            const ctx = canvas.getContext('2d');

            // as this is node-canvas, we need to shim some functions:
            canvas.addEventListener = canvas.setAttribute = noop;
            canvas.classList = { add: noop };
            canvas.style = {};
            ctx.getTransform = () => ctx.currentTransform;

            return { canvas, ctx};
        }, ${JSON.stringify(dataset)});

        const canvas = example.canvas;

        export { canvas };
    `,
    {
      // I'm not transpiling, I'm assuming Prettier just uses Babel as AST parser/rewriter.
      parser: `babel`,
    }
  );
}

export { generateGraphicsModule };
