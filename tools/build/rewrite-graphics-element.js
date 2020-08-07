import splitCodeSections from "../../lib/custom-element/lib/split-code-sections.js";
import performCodeSurgery from "../../lib/custom-element/lib/perform-code-surgery.js";
import prettier from "prettier";

export default function rewriteGraphicsElement(code, width, height) {

    const split = splitCodeSections(code);
    const globalCode = split.quasiGlobal;
    const classCode = performCodeSurgery(split.classCode);

    return prettier.format(`
        import CanvasBuilder from 'canvas';
        import { GraphicsAPI, Bezier, Vector } from "../../lib/custom-element/api/graphics-api.js";

        const noop = (()=>{});

        ${globalCode}

        class Example extends GraphicsAPI { ${classCode} }

        const example = new Example(undefined, ${width}, ${height}, (w,h) => {
            const canvas = CanvasBuilder.createCanvas(w,h);
            canvas.addEventListener = canvas.setAttribute = noop;
            canvas.classList = { add: noop };
            canvas.style = {};

            const ctx = canvas.getContext('2d');
            ctx.getTransform = () => ctx.currentTransform; // node-canvas lacks getTransform() support?

            return { canvas, ctx};
        });

        const canvas = example.canvas;

        export { canvas };
    `, { parser: `babel` });
};
