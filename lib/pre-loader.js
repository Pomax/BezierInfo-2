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
    // ...sigh...
    .replace(/&amp;/g,'&')
    .replace(/&lt;/g,'<')
    .replace(/&gt;/g,'>')
    // generate a template literal, so JSX doesn't fuck with.
    return options.start + '{`' + replaced + '`}' + options.end;
  }
};

module.exports = blockLoader(options);
