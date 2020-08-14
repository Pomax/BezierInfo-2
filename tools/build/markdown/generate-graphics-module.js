import splitCodeSections from "../../../lib/custom-element/lib/split-code-sections.js";
import performCodeSurgery from "../../../lib/custom-element/lib/perform-code-surgery.js";
import prettier from "prettier";

/**
 * ...docs go here...
 */
function generateGraphicsModule(chapter, code, width, height) {
  // step 1: fix the imports
  code = code.replace(/(import .+? from) "([^"]+)"/g, (_, main, group) => {
    return `${main} "../../../chapters/${chapter}/${group}"`;
  });

  // step 2: split up the code into "global" vs. "class" code
  const split = splitCodeSections(code);
  const globalCode = split.quasiGlobal;
  const classCode = performCodeSurgery(split.classCode);

  return prettier.format(
    `
        import CanvasBuilder from 'canvas';
        import { GraphicsAPI, Bezier, Vector, Matrix } from "../../../lib/custom-element/api/graphics-api.js";

        ${globalCode}

        const noop = (()=>{});

        class Example extends GraphicsAPI { ${classCode} }

        const example = new Example(undefined, ${width}, ${height}, (w,h) => {
            const canvas = CanvasBuilder.createCanvas(w,h);
            const ctx = canvas.getContext('2d');

            // as this is node-canvas, we need to shim some functions:
            canvas.addEventListener = canvas.setAttribute = noop;
            canvas.classList = { add: noop };
            canvas.style = {};
            ctx.getTransform = () => ctx.currentTransform;

            return { canvas, ctx};
        });

        const canvas = example.canvas;

        export { canvas };
    `,
    { parser: `babel` }
  );
}

export { generateGraphicsModule };
