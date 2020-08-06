import fs from "fs-extra";
import path from "path";
import { createHash } from "crypto";
import { execSync } from "child_process";
import cleanUp from "./cleanup.js";

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.href.replace(`file:///`,``));
const baseDir = path.join(__dirname, `..`, `..`, `..`, `images`, `latex`);

fs.ensureDirSync(baseDir);

const sourceDir = path.join(baseDir, `source`);
fs.ensureDirSync(sourceDir);

// This function really needs better stdio capture,
// so it can report _what went wrong_ when xelatex fails.
function runCmd(cmd, hash) {
  try {
    execSync(cmd); //, { stdio: 'inherit' });
  } catch (e) {
    console.error("could not run cmd: ", cmd);
    console.log("hash:\n", hash);
    process.exit(1);
  }
}

export default async function latexToSVG(latex) {
    const hash = createHash(`md5`).update(latex).digest(`hex`);

    const TeXfilename = path.join(sourceDir, hash + ".tex");
    const SVGfilename = path.resolve(path.join(path.dirname(TeXfilename), '..', hash + ".svg"));

    if (!fs.existsSync(SVGfilename)) {

        const PDFfilename = TeXfilename.replace(".tex",".pdf");
        const PDFfilenameCropped = TeXfilename.replace(".tex","-crop.pdf");

        fs.writeFileSync(TeXfilename,  [
            `\\documentclass[12pt]{article}`,
            `\\usepackage[paperwidth=12in, paperheight=12in]{geometry}`,
            `\\pagestyle{empty}`,
            `\\usepackage{color}`,
            `\\usepackage{amsmath}`,
            `\\usepackage{unicode-math}`,
            `\\setmainfont[Ligatures=TeX]{TeX Gyre Pagella}`,
            `\\setmathfont{TeX Gyre Pagella Math}`,
            `\\begin{document}`,
            `\\[`,
            cleanUp(latex),
            `\\]`,
            `\\end{document}`
        ].join(`\n`));

        // Finally: run the conversion
        console.log("- running xelatex on " + hash + ".tex");
        runCmd(`xelatex -output-directory "${path.dirname(TeXfilename)}" "${TeXfilename}"`, hash);

        console.log("- cropping PDF to document content");
        runCmd(`pdfcrop "${ PDFfilename }"`, hash);

        console.log("- converting cropped PDF to SVG");
        runCmd(`pdf2svg "${ PDFfilenameCropped }" "${ SVGfilename }"`, hash);

        console.log("- cleaning up SVG");
        runCmd(`npx svgo "${ SVGfilename }"`, hash);
    }

    // Make sure we hardcode the size of this LaTeX SVG image, because we absolutely
    // do not want the page to resize in any possible noticable way if we can help it.
    var svg = fs.readFileSync(SVGfilename).toString(`utf8`);
    var vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/);

    // The SVG contains values in "pt" units, but to maximise legibility we convert
    // these to "rem" instead, so that formulae are always sized based on the font
    // around them, rather than being sized independently of the document text.
    // Base browser sizes are 16pt so the conversion factor is 4/3.
    var w = Math.round((parseFloat(vb[2]) - parseFloat(vb[0])) * 4/3);
    var h = Math.round((parseFloat(vb[3]) - parseFloat(vb[1])) * 4/3);

    return `<img className="LaTeX SVG" src="images/latex/${path.basename(SVGfilename)}" width="${Math.round(w)}px" height="${Math.round(h)}px">`;
};
