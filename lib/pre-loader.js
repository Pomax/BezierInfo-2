var blockLoader = require("block-loader");

var options = {
  start: "<pre>",
  end: "</pre>",

  /**
   * There's a fair few things we'll want to safify for
   * <pre> elements used in JSX...
   */
  process: function fixPreBlocks(pre) {
    var replaced = pre
    .replace(options.start,'')
    .replace(options.end,'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/([{}])/g,"{'$1'}")
    .replace(/\n/g,"{'\\n'}");
    return options.start + replaced + options.end;
  }
};

module.exports = blockLoader(options);
