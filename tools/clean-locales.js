var findLocales = require('./find-locales');
var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');

findLocales( locales => {
  locales.forEach( locale => rimraf(locale, () => {}));
});
