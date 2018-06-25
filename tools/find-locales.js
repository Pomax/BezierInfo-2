var glob = require('glob');
var path = require("path");

// make sure we know what our base location is
const BASEDIR = path.join(__dirname,"..");

// find all locales used based on content files
module.exports = function findLocales(handleLocales) {
  glob(path.join(BASEDIR,"components/sections/**/content*md"), (err, files) => {
    var locales = [];

    files.forEach(file => {
      let locale = file.match(/content\.([^.]+)\.md/)[1];
      if (locales.indexOf(locale) === -1) {
        locales.push(locale);
      }
    });

    handleLocales(locales);
  });
};
