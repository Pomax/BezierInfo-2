var sha1 = require("sha1");
var fs = require("fs");
var execSync = require("child_process").execSync;

var op = "\\[";
var ed = "\\]";

/**
 * Is there going to be anything to convert here?
 */
function hasLaTeX(input) {
  return input.indexOf(op) !== -1 && input.indexOf(ed) !== -1;
}

/**
 * We look for MathJax/KaTeX style data, and make sure
 * it is escaped properly so that JSX conversion will
 * still work.
 */
function escapeBlockLaTeX(source) {
  // we can't do this with regexp, unfortunately.
  var from = 0, curr, term;
  var newsource = "", latex;
  for(curr = source.indexOf(op, from); curr !== -1; from = term + ed.length, curr = source.indexOf(op, from)) {
    newsource += source.substring(from, curr);
    term = source.indexOf(ed, from);
    if(term === -1) {
      // that's a problem...
      throw new Error("improperly closed LaTeX encountered!");
    }
    latex = source.substring(curr, term + ed.length);

    // convert this LaTeX code into an SVG file in ./images/latex,
    // using mathjax-node in the ./tools directory.
    var hash = sha1(latex);
    var filename = "images/latex/" + hash + ".svg";
    var destination = __dirname + "/../" + filename;

    // And only generate if the file doesn't already exist, of course.
    if (!fs.existsSync(destination)) {
      var cmdarg = new Buffer(latex).toString("base64");
      var cmd = "npm run latex -- --hash " + hash + " --base64 " + cmdarg;
      execSync(cmd);
    }

    // Make sure we hardcode the size of this LaTeX SVG image, because we absolutely
    // do not want the page to resize in any possible noticable way if we can help it.
    // The SVG contains values in "ex" units, but to maximise rendering compatibility
    // with things like older Android tables etc. we convert these to "em" instead.
    var svg = fs.readFileSync(filename).toString();
    var exem = 0.45;
    var w = parseFloat(svg.match(/width="([^"]+)"/)[1]) * exem;
    var h = parseFloat(svg.match(/height="([^"]+)"/)[1]) * exem;
    var rewrite = `<img className="LaTeX SVG" src="${filename}" style={{width:"${w}em", height:"${h}em"}} />`;

    newsource += rewrite;
  }
  return newsource + source.substring(from);
}

/**
 * ...
 */
function colorPreProcess(input) {
  var regexp = new RegExp("([A-Z]+)\\[([^\\]]+)\\]",'g');
  var output = input.replace(regexp, function(_,color,content) {
    if(content.indexOf(" ")!==-1) { content = " " + content; }
    return "{\\color{"+color.toLowerCase()+"}"+content.replace(/ /g,"\\ ")+"}";
  });
  return output;
};

module.exports = function(source) {
  this.cacheable();
  if (!hasLaTeX(source)) return source;
  return escapeBlockLaTeX(colorPreProcess(source));
};


