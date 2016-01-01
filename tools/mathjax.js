/**
 *
 *  This script acts as support to the latex-loader for webpack.
 *  The latex-loader finds and preprocesses LaTeX elements,
 *  and then this script is run via execSync, to get the SVG
 *  conversion happening synchronously, since Webpack doesn't
 *  do async loaders (unfortunately).
 *
 */

// fine the --latex option
var hash, base64, latex;

hash = process.argv.indexOf("--hash");
if (latex === -1) {
  hash = Date.now();
} else {
  hash = process.argv[hash+1];
}

latex = process.argv.indexOf("--latex");
if (latex === -1) {
  base64 = process.argv.indexOf("--base64");
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


// strip any \[ and \], which is an block-level LaTeX markup indicator for MathJax:
latex = latex.replace(/^'/,'').replace(/'$/,'').replace('\\[','').replace('\\]','');


// set up the MathJax processor
var API = require("mathjax-node/lib/mj-single");
API.config({
  MathJax: {
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


// find style="..." declarations and rewrite them to style={{...}} format
var toReactStyle = function(input) {
  return input.replace(/style="([^"]+)"/g, function(a, b) {
    var c = {};
    b = b.split(';');
    b.forEach(function(v) {
      v = v.split(':').map(function(s) { return s.trim(); });
      v[0] = v[0].replace(/-(\w)/g,function(a, b) {
        return b.toUpperCase();
      });
      c[v[0]] = v[1];
    });
    return "style={" + JSON.stringify(c) + "}";
  });
};

var fs = require("fs");
var filename = "images/latex/" + hash + ".svg";
var destination = __dirname + "/../" + filename;
var className="LaTeX SVG";

// convert the passed LaTeX to SVG form
API.typeset({
  math: latex,
  format: "TeX",
  svg: true
}, function (data) {
  if (data.errors) {
    console.error(data.errors);
    process.exit(1);
  }

  // strip namespacing and use correct React xlink:href attribute
  var svg = data.svg;
  fs.writeFileSync(destination, svg);
  process.exit(0);
});
