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
    latex = latex.replace(/([{}])/g,"{'$1'}");
    newsource += latex;
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


