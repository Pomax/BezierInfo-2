/**
 * <pre> should preserve newlines. Damnit, JSX
 */

var op = "<pre>";
var ed = "</pre>";

function hasTokens(input) {
  return input.indexOf(op) !== -1 && input.indexOf(ed) !== -1;
}

function fixPreBlocks(source) {
  // we can't do this with regexp, unfortunately.
  var from = 0, curr, term;
  var newsource = "", pre;
  for(curr = source.indexOf(op, from); curr !== -1; from = term + ed.length, curr = source.indexOf(op, from)) {
    newsource += source.substring(from, curr);
    term = source.indexOf(ed, from);
    if(term === -1) {
      // that's a problem...
      throw new Error("improperly closed LaTeX encountered!");
    }
    pre = source.substring(curr, term + ed.length);
    pre = pre.replace(/\n/g,"{'\\n'}");
    newsource += pre;
  }
  return newsource + source.substring(from);
}


module.exports = function(source) {
  this.cacheable();
  if (!hasTokens(source)) return source;
  return fixPreBlocks(source);
};

