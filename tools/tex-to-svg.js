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

var latexSourceCode = cleanUp(latex);
var aligned = latexSourceCode.indexOf("\\begin{aligned}") !== -1;

//if (aligned) {
  latexSourceCode = [
    '\\[',
    latexSourceCode,
    '\\]'
  ].join('\n');
//}

// Convert the passed LaTeX to SVG form
// write the .tex source
var filedata = [
  '\\documentclass[12pt]{article}',
  '\\usepackage[paperwidth=12in, paperheight=12in]{geometry}', // pdfcrop will remove the unused bits later
  '\\pagestyle{empty}',
  '\\usepackage{color}',
  '\\usepackage{amsmath}',
  '\\usepackage{unicode-math}'
]

if (process.env.locale === 'zh-CN') {
  filedata = filedata.concat([
    '\\usepackage{xeCJK}',
    '\\xeCJKsetup{CJKmath=true}',
    '\\setCJKmainfont{gbsn00lp.ttf}'
  ]);
}

if (process.env.locale === 'ja-JP') {
  filedata = filedata.concat([
    '\\usepackage{xeCJK}',
    '\\xeCJKsetup{CJKmath=true}',
    '\\setCJKmainfont{ipaexm.ttf}'
  ]);
}

filedata = filedata.concat([
  '\\setmainfont[Ligatures=TeX]{TeX Gyre Pagella}',
  '\\setmathfont{TeX Gyre Pagella Math}',
  '\\begin{document}',
  latexSourceCode,
  '\\end{document}'
]);

filedata = filedata.join('\n');
fs.writeFileSync(TeXfilename, filedata);

var PDFfilename = TeXfilename.replace(".tex",".pdf");
var PDFfilenameCropped = TeXfilename.replace(".tex","-crop.pdf");
var SVGfilename = TeXfilename.replace(".tex",".svg");

// set the SVGfilename one dir higher
SVGfilename = path.resolve(path.join(path.dirname(TeXfilename), '..', hash + ".svg"));

// run xelatex on this file
try {
  var cmd = `npm run xelatex -- -output-directory "${path.dirname(TeXfilename)}" "${TeXfilename}"`;
  console.log("- running xelatex on " + hash + ".tex");
  execSync(cmd); //, { stdio: 'inherit' });

  var cmd = `npm run pdfcrop -- "${ PDFfilename }"`;
  console.log("- cropping PDF to document content");
  execSync(cmd); //, { stdio: 'inherit' });

  var cmd = `pdf2svg "${ PDFfilenameCropped }" "${ SVGfilename }"`;
  console.log("- converting cropped PDF to SVG");
  execSync(cmd); //, { stdio: 'inherit' });

  var cmd = `npm run svgo -- "${ SVGfilename }"`;
  console.log("- cleaning up SVG");
  execSync(cmd); //, { stdio: 'inherit' });
}

catch (e) { console.error(e); process.exit(1); }
