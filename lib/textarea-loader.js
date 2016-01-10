var blockLoader = require("block-loader");

var options = {
  start: "<textarea",
  end: "</textarea>",

  /**
   * We want to be able to stick arbitrary text in a <textarea>
   */
  process: function fixPreBlocks(textarea) {
    var fpos = textarea.indexOf('>');
    var start = textarea.substring(0,fpos+1);
    var replaced = textarea.replace(start,'').replace(options.end,'').replace(/"/g,'\\"').replace(/\n/g,'\\n');
    var rewritten = start.substring(0,fpos) + ' defaultValue={"' + replaced +'"}/>';
    return rewritten;
  }
};

module.exports = blockLoader(options);
