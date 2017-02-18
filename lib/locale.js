var enData = require("LocalizedContent");

var Locale  = function() {
  this.data = {};
  this.data = enData;
};

Locale.prototype = {
  getSectionLocale: function(key) {
    return this.data[key].locale;
  },

  getContent: function(key, handler) {
    return this.data[key].getContent(handler);
  },

  getTitle: function(key) {
    return this.data[key].title;
  }
};

module.exports = Locale;
