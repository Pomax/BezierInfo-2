var sha1 = require("sha1");
var fs = require("fs");
var execSync = require("child_process").execSync;
var blockLoader = require("block-loader");
var cleanup = require("../tools/cleanup");

var options = {
  start: "\\[",
  end: "\\]",

  preprocessors: [
    /**
     * convert some convenience colour markers to true LaTeX form.
     */
    function colorPreProcess(input) {
      var regexp = new RegExp("([A-Z]+)\\[([^\\]]+)\\]",'g');
      var output = input.replace(regexp, function(_,color,content) {
        if(content.indexOf(" ")!==-1) { content = " " + content; }
        return "{\\color{"+color.toLowerCase()+"}"+content.replace(/ /g,"\\ ")+"}";
      });
      return output;
    }
  ],

  /**
   * We look for MathJax/KaTeX style data, and make sure
   * it is escaped properly so that JSX conversion will
   * still work.
   */
  process: function escapeBlockLaTeX(latex) {
    latex = cleanup(latex);

    // convert this LaTeX code into an SVG file in ./images/latex,
    // using mathjax-node in the ./tools directory.
    var hash = sha1(latex);

    var filename = "images/latex/" + hash + ".svg";
    var destination = __dirname + "/../" + filename;

    // And only generate if the file doesn't already exist, of course.
    if (!fs.existsSync(destination)) {
      var cmdarg = new Buffer(latex).toString("base64");
      var cmd = "npm run latex -- --hash " + hash + " --base64 " + cmdarg;
      console.log(" generating " + hash + ".svg");
      execSync(cmd, { stdio: 'inherit' });
    }

    // Make sure we hardcode the size of this LaTeX SVG image, because we absolutely
    // do not want the page to resize in any possible noticable way if we can help it.
    var svg = fs.readFileSync(destination).toString();
    var vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/);
    var w = parseFloat(vb[2]) - parseFloat(vb[0]);
    var h = parseFloat(vb[3]) - parseFloat(vb[1]);

    // The SVG contains values in "pt" units, but to maximise legibility we convert
    // these to "rem" instead, so that formulae are always sized based on the font
    // around them, rather than being sized independently of the document text.
    // Base browser sizes are 16pt so pt2rem "should" be 4/3 but 1.4 spaces better.
    var pt2rem = 1.4;
    w *= pt2rem;
    h *= pt2rem;

    return `<img className="LaTeX SVG" src="${filename}" width="${w}rem" height="${h}rem"/>`;
  }
};

module.exports = blockLoader(options);
