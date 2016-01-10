var blockLoader = require("block-loader");

var options = {
  start: "<p>",
  end: "</p>",

  /**
   * JSX curly brace replacement.
   */
  process: function fixPreBlocks(p) {
    var replaced = p.replace(options.start,'').replace(options.end,'');
    if(replaced.indexOf("\\[")>-1) return p;
    return options.start + replaced.replace(/([{}])/g,"{'$1'}") + options.end;
  }
};

module.exports = blockLoader(options);
