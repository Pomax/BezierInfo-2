import fs from "fs-extra";
import path from "path";
import { createHash } from "crypto";
import { execSync } from "child_process";
import cleanUp from "./cleanup.js";

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.href.replace(`file:///`, ``));
const baseDir = path.join(__dirname, `..`, `..`, `..`, `images`, `latex`);

fs.ensureDirSync(baseDir);

const sourceDir = path.join(baseDir, `source`);
fs.ensureDirSync(sourceDir);

/**
 * This converts a latex block into a .svg file by running it through
 * XeLaTeX, and then converting the resulting PDF into an SVG image
 * in the ./images directory.
 *
 * The function returns an <img> tag with the src pointing at the
 * right file, and the width and height attributes prespecified,
 * so that the document won't constantly reflow as it loads images
 * in.
 */
export default async function latexToSVG(latex, chapter, localeStrings, block) {
  latex = colorPreProcess(latex);

  const locale = localeStrings.getCurrentLocale();
  const hash = createHash(`md5`).update(latex).digest(`hex`);

  const TeXfilename = path.join(sourceDir, hash + `.tex`);
  const SVGfilename = path.resolve(
    path.join(path.dirname(TeXfilename), `..`, hash + `.svg`)
  );

  if (!fs.existsSync(SVGfilename)) {
    const PDFfilename = TeXfilename.replace(`.tex`, `.pdf`);
    const PDFfilenameCropped = TeXfilename.replace(`.tex`, `-crop.pdf`);

    let fonts = [
      "\\setmainfont[Ligatures=TeX]{TeX Gyre Pagella}",
      "\\setmathfont{TeX Gyre Pagella Math}",
    ];

    // For Chinese, we need the xeCJK package because there might be Chinese
    // in maths context, which base XeLaTeX can't quite deal with.
    if (locale === "zh-CN") {
      fonts = [
        "\\usepackage{xeCJK}",
        "\\xeCJKsetup{CJKmath=true}",
        "\\setCJKmainfont{gbsn00lp.ttf}",
      ];
    }

    // The same goes for Japanese, although we obviously want a different
    // font than Chinese, as they are different languages entirely.
    if (locale === "ja-JP") {
      fonts = [
        "\\usepackage{xeCJK}",
        "\\xeCJKsetup{CJKmath=true}",
        "\\setCJKmainfont{ipaexm.ttf}",
      ];
    }

    fs.writeFileSync(
      TeXfilename,
      [
        `\\documentclass[12pt]{article}`,
        `\\usepackage[paperwidth=12in, paperheight=12in]{geometry}`,
        `\\pagestyle{empty}`,
        `\\usepackage{color}`,
        `\\usepackage{amsmath}`,
        `\\usepackage{unicode-math}`,
      ]
        .concat(fonts)
        .concat([
          `\\begin{document}`,
          `\\[`,
          cleanUp(latex),
          `\\]`,
          `\\end{document}`,
        ])
        .join(`\n`)
    );

    // Finally: run the conversion
    console.log(
      `- running xelatex for block [${chapter}:${locale}:${block}] (${hash}.tex)`
    );
    runCmd(
      `xelatex -output-directory "${path.dirname(
        TeXfilename
      )}" "${TeXfilename}"`,
      hash
    );

    process.stdout.write(`  - cropping PDF to document content: `);
    try {
      runCmd(`pdfcrop "${PDFfilename}"`, hash);
      console.log(`✓`);

      process.stdout.write(`  - converting cropped PDF to SVG: `);
      try {
        runCmd(`pdf2svg "${PDFfilenameCropped}" "${SVGfilename}"`, hash);
        console.log(`✓`);

        process.stdout.write(`  - cleaning up SVG: `);
        try {
          runCmd(`npx svgo "${SVGfilename}"`, hash);
          console.log(`✓`);
        } catch (e) {
          console.log(`✕`);
          console.error(e);
        }
      } catch (e) {
        console.log(`✕`);
        console.error(e);
      }
    } catch (e) {
      console.log(`✕`);
      console.error(e);
    }
  }

  // Make sure we hardcode the size of this LaTeX SVG image, because we absolutely
  // do not want the page to resize in any possible noticable way if we can help it.
  var svg = fs.readFileSync(SVGfilename).toString(`utf8`);
  var vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/);

  // The SVG contains values in "pt" units, but to maximise legibility we convert
  // these to "rem" instead, so that formulae are always sized based on the font
  // around them, rather than being sized independently of the document text.
  // Base browser sizes are 16pt so the conversion factor is 4/3.
  var w = Math.round(((parseFloat(vb[2]) - parseFloat(vb[0])) * 4) / 3);
  var h = Math.round(((parseFloat(vb[3]) - parseFloat(vb[1])) * 4) / 3);

  return `<img class="LaTeX SVG" src="images/latex/${path.basename(
    SVGfilename
  )}" width="${Math.round(w)}px" height="${Math.round(h)}px" loading="lazy">`;
}

// This function really needs better stdio capture,
// so it can report _what went wrong_ when xelatex fails.
function runCmd(cmd, hash) {
  try {
    execSync(cmd); //, { stdio: 'inherit' });
  } catch (e) {
    console.error(`could not run cmd: ${cmd}`);
    console.log(`hash:\n${hash}`);
    process.exit(1);
  }
}

// This function converst things like RED[a] into real LaTeX.
function colorPreProcess(input) {
  var regexp = new RegExp(`([A-Z]+)\\[([^\\]]+)\\]`, `g`);
  var output = input.replace(regexp, function (_, color, content) {
    if (content.indexOf(` `) !== -1) {
      content = ` ${content}`;
    }
    return `{\\color{${color.toLowerCase()}}${content.replace(/ /g, "\\ ")}}`;
  });
  return output;
}
