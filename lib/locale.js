var enData = require('../locales/en-GB/content.js');

class Locale {
  constructor(locale) {
    this.data = {};
    this.locale = locale || "en-GB";
    this.data = enData;
  }

  getContent(key, handler) {
    return this.data[key].getContent(handler);
  }

  getTitle(key) {
    return this.data[key].title;
   }
};

module.exports = Locale;
