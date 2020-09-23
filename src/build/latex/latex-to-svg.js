import fs from "fs-extra";
import path from "path";
import paths from "../../project-paths.js";
import { createHash } from "crypto";
import { execSync } from "child_process";
import cleanUp from "./cleanup.js";
import toPOSIX from "../../to-posix.js";

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
export default async function latexToSVG(latex, pathdata, localeStrings, block) {
  const { imagepath, id } = pathdata;
  latex = colorPreProcess(latex);

  const locale = localeStrings.getCurrentLocale();
  const hash = createHash(`md5`).update(latex).digest(`hex`);

  const TeXfilename = path.join(paths.temp, `${hash}.tex`);
  fs.ensureDirSync(imagepath);

  const SVGfilename = path.join(imagepath, `${hash}.svg`);
  const srcURL = `./${toPOSIX(path.relative(paths.public, SVGfilename))}`;

  if (!fs.existsSync(SVGfilename)) {
    // There is no SVG graphic for the LaTeX code yet, so we need to generate
    // one, but it's possible we already tried and failed for a different locale.
    // As the temp dir gets wiped on each run, we can check for the the existence
    // of our TeX file: if it exists, we already unsuccessfully ran this code.
    if (fs.existsSync(TeXfilename)) return fail(hash);

    const PDFfilename = TeXfilename.replace(`.tex`, `.pdf`);
    const PDFfilenameCropped = TeXfilename.replace(`.tex`, `-crop.pdf`);

    let fonts = ["\\setmainfont[Ligatures=TeX]{TeX Gyre Pagella}", "\\setmathfont{TeX Gyre Pagella Math}"];

    // For Chinese, we need the xeCJK package because there might be Chinese
    // in maths context, which base XeLaTeX can't quite deal with.
    if (locale === "zh-CN") {
      fonts = ["\\usepackage{xeCJK}", "\\xeCJKsetup{CJKmath=true}", "\\setCJKmainfont{gbsn00lp.ttf}"];
    }

    // The same goes for Japanese, although we obviously want a different
    // font than Chinese, as they are different languages entirely.
    if (locale === "ja-JP") {
      fonts = ["\\usepackage{xeCJK}", "\\xeCJKsetup{CJKmath=true}", "\\setCJKmainfont{ipaexm.ttf}"];
    }

    fs.writeFileSync(
      TeXfilename,
      [
        `\\documentclass[12pt]{article}`,
        `\\usepackage[paperwidth=12in, paperheight=12in]{geometry}`,
        `\\pagestyle{empty}`,
        `\\usepackage[dvipsnames]{xcolor}`,
        `\\definecolor{darkred}{rgb}{0.6,0,0}`,
        `\\definecolor{darkgreen}{rgb}{0,0.6,0}`,
        `\\definecolor{darkblue}{rgb}{0,0,0.6}`,
        `\\definecolor{amber}{rgb}{0.9,0.6,0}`,
        `\\usepackage{amsmath}`,
        `\\usepackage{unicode-math}`,
      ]
        .concat(fonts)
        .concat([`\\begin{document}`, `\\[`, cleanUp(latex), `\\]`, `\\end{document}`])
        .join(`\n`)
    );

    const commands = {
      xetex: `xelatex -output-directory "${path.dirname(TeXfilename)}" "${TeXfilename}"`,
      crop: `pdfcrop "${PDFfilename}"`,
      svg: `pdf2svg "${PDFfilenameCropped}" "${SVGfilename}"`,
      svgo: `npm run svgo -- "${SVGfilename}"`,
    };

    // Finally: run the conversion
    try {
      process.stdout.write(`- running xelatex for block [${id}:${locale}:${block}] (${hash}.tex): `);
      runCmd(commands.xetex, hash);

      process.stdout.write(`  - cropping PDF to document content: `);
      runCmd(commands.crop, hash);

      process.stdout.write(`  - converting cropped PDF to SVG: `);
      runCmd(commands.svg, hash);

      process.stdout.write(`  - cleaning up SVG: `);
      runCmd(commands.svgo, hash);
    } catch (e) {
      if (e.cmd === commands.xetex) {
        console.error(`  | Error in ${TeXfilename}\n  |`);

        let loglines = e.output
          .filter((v) => !!v)
          .map((v) => v.toString("utf8").replace(/\r\n/g, `\n`))[0]
          .split(`\n`)
          .slice(-6); // this may depend on the xelatex version used...

        loglines.splice(2, 1); // remove 'no pages of output'

        // collapse and fix transcript file path
        let transcript = loglines.splice(2, 3).join(``);
        loglines.push(transcript.replace(`.log.`, `.log`).replace(`written on`, `written to`));
        console.error(`  |   ${loglines.join(`\n  |   `)}\n`);
      }
      return fail(hash);
    }
  }

  // Make sure we hardcode the size of this LaTeX SVG image, because we absolutely
  // do not want the page to resize in any possible noticable way if we can help it.
  let svg = fs.readFileSync(SVGfilename).toString(`utf8`);

  try {
    const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/);

    // The SVG contains values in "pt" units, but to maximise legibility we convert
    // these to "rem" instead, so that formulae are always sized based on the font
    // around them, rather than being sized independently of the document text.
    // Base browser sizes are 16pt so the conversion factor is 4/3.
    const w = Math.round(((parseFloat(vb[2]) - parseFloat(vb[0])) * 4) / 3);
    const h = Math.round(((parseFloat(vb[3]) - parseFloat(vb[1])) * 4) / 3);

    // Update the SVG's presentation size to use pixels
    svg = svg.replace(`width="${vb[2]}pt"`, `width="${w}px"`);
    svg = svg.replace(`height="${vb[3]}pt"`, `height="${h}px"`);
    fs.writeFileSync(SVGfilename, svg, `utf8`);

    return `<img class="LaTeX SVG" src="${srcURL}" width="${w}px" height="${h}px" loading="lazy">`;
  } catch (e) {
    // This code exists because sometimes a file turns out to be empty, and I suspect that's
    // because of successive SVGO calls, but whatever the cause: it's bad and should break the build.
    console.log(SVGfilename);
    console.error(e);
    process.exit(1);
  }
}

// This function really needs better stdio capture,
// so it can report _what went wrong_ when xelatex fails.
function runCmd(cmd, hash) {
  try {
    execSync(cmd); //, { stdio: 'inherit' });
    console.log(`✓`);
  } catch (e) {
    console.log(`✕`);
    e.cmd = cmd;
    throw e;
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

// Failure state HTML code is simply a script that yells in the console
function fail(hash) {
  return `<script>console.log("LaTeX for ${hash} failed!");</script>`;
}
