/**
 *
 *  This script acts as support to the latex-loader for webpack.
 *  The latex-loader finds and preprocesses LaTeX elements,
 *  and then this script is run via execSync, to get the SVG
 *  conversion happening synchronously, since Webpack doesn't
 *  do async loaders (unfortunately).
 *
 */
var fs = require("fs-extra");
var path = require("path");
var cleanUp = require("./cleanup");
var execSync = require("child_process").execSync;

// This function really needs better stdio capture,
// so it can report _what went wrong_ when xelatex fails.
function runCmd(cmd) {
  try {
    execSync(cmd); //, { stdio: 'inherit' });
  } catch (e) {
    console.error("could not run cmd: ", cmd);
    console.log("latex:\n", latex);
    process.exit(1);
  }
}

// Get the LaTeX we need, either straight up or base64 encoded:
var latex = process.argv.indexOf("--latex");

if (latex === -1) {
  var base64 = process.argv.indexOf("--base64");
  if (base64 === -1) {
    console.error("missing [--latex] or [--base64] runtime option");
    process.exit(1);
  }
  base64 = process.argv[base64+1];
  latex = new Buffer(base64, "base64").toString();
} else {
  // get the --latex value
  var args = Array.from(process.argv);
  latex = args.slice(latex+1).join(" ");
  if(!latex) {
    console.error("missing [--latex] runtime option string");
    process.exit(1);
  }
}

// Get the filename we'll need to write:
var hash = process.argv.indexOf("--hash");
hash = (latex === -1) ? Date.now() : process.argv[hash+1];
var dir = path.resolve(__dirname + "/../images/latex");
fs.ensureDirSync(dir);
var filename = path.join(dir, hash + ".svg");

// also set up a tex source copy
dir = path.join(dir, "source");
fs.ensureDirSync(dir);
var TeXfilename = path.join(dir, hash + ".tex");

// form the LaTeX block that will be injected into the .tex file
var latexSourceCode = cleanUp(latex);

latexSourceCode = ['\\[', latexSourceCode, '\\]'].join('\n');

// Convert the passed LaTeX to SVG form and write the .tex source
var filedata = [
  '\\documentclass[12pt]{article}',
  '\\usepackage[paperwidth=12in, paperheight=12in]{geometry}', // pdfcrop will remove the unused bits later
  '\\pagestyle{empty}',
  '\\usepackage{color}',
  '\\usepackage{amsmath}',
  '\\usepackage{unicode-math}'
]

// For Chinese, we need the xeCJK package because there might be Chinese
// in maths context, which base XeLaTeX can't quite deal with.
if (process.env.LOCALE === 'zh-CN') {
  filedata = filedata.concat([
    '\\usepackage{xeCJK}',
    '\\xeCJKsetup{CJKmath=true}',
    '\\setCJKmainfont{gbsn00lp.ttf}'
  ]);
}

// The same goes for Japanese, although we obviously want a different
// font than Chinese, as they are different languages entirely.
if (process.env.LOCALE === 'ja-JP') {
  filedata = filedata.concat([
    '\\usepackage{xeCJK}',
    '\\xeCJKsetup{CJKmath=true}',
    '\\setCJKmainfont{ipaexm.ttf}'
  ]);
}

// Form the final .tex source code, including the latexSourceCode we formed already:
filedata = filedata.concat([
  '\\setmainfont[Ligatures=TeX]{TeX Gyre Pagella}',
  '\\setmathfont{TeX Gyre Pagella Math}',
  '\\begin{document}',
  latexSourceCode,
  '\\end{document}'
]);

// Then we write the .tex file to disk
filedata = filedata.join('\n');
fs.writeFileSync(TeXfilename, filedata);

// Chronicle the filenames that we'll be working through as we run
// through the .tex to pdf to svg conversion process:
var PDFfilename = TeXfilename.replace(".tex",".pdf");
var PDFfilenameCropped = TeXfilename.replace(".tex","-crop.pdf");
var SVGfilename = TeXfilename.replace(".tex",".svg");

// and make sure the SVGfilename points to one dir higher than the .tex file
SVGfilename = path.resolve(path.join(path.dirname(TeXfilename), '..', hash + ".svg"));

// Finally: run the conversion
console.log("- running xelatex on " + hash + ".tex");
runCmd(`npm run xelatex -- -output-directory "${path.dirname(TeXfilename)}" "${TeXfilename}"`);

console.log("- cropping PDF to document content");
runCmd(`npm run pdfcrop -- "${ PDFfilename }"`);

console.log("- converting cropped PDF to SVG");
runCmd(`pdf2svg "${ PDFfilenameCropped }" "${ SVGfilename }"`);

console.log("- cleaning up SVG");
runCmd(`npm run svgo -- "${ SVGfilename }"`);
