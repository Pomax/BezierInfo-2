var enData = require("LocalizedContent");

var Locale  = function(locale) {
  this.data = {};
  this.locale = locale || "en-GB";
  this.data = enData;
};

Locale.prototype = {
  getContent: function(key, handler) {
    return this.data[key].getContent(handler);
  },

  getTitle: function(key) {
    return this.data[key].title;
  }
};

module.exports = Locale;
