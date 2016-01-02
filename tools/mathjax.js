/**
 *
 *  This script acts as support to the latex-loader for webpack.
 *  The latex-loader finds and preprocesses LaTeX elements,
 *  and then this script is run via execSync, to get the SVG
 *  conversion happening synchronously, since Webpack doesn't
 *  do async loaders (unfortunately).
 *
 */
var className="LaTeX SVG";
var fs = require("fs");
var API = require("mathjax-node/lib/mj-single");

function cleanUp(latex) {
  // strip any \[ and \], which is an block-level LaTeX markup indicator for MathJax:
  latex = latex.replace(/^'/,'').replace(/'$/,'').replace('\\[','').replace('\\]','');
  return latex;
}

// Set up the MathJax processor
API.config({
  MathJax: {
    SVG: {
      font: "Latin-Modern" // STIX-Web is too fat for this article
    },
    TeX: {
      extensions: [
        "AMSmath.js",
        "AMSsymbols.js",
        "autoload-all.js",
        "color.js"
      ]
    }
  }
});
API.start();

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
var filename = "images/latex/" + hash + ".svg";
var destination = __dirname + "/../" + filename;

// Set up the MathJax options for this conversion run
var options = { math: cleanUp(latex), format: "TeX", svg: true };

// Convert the passed LaTeX to SVG form
API.typeset(options, function saveToFile(data) {
  if (data.errors) {
    console.error(data.errors);
    process.exit(1);
  }
  fs.writeFileSync(destination, data.svg);
  process.exit(0);
});
