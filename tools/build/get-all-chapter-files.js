const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");

// make sure we know what our base location is
const BASEDIR = path.join(__dirname, "..", "..");

/**
 * ...docs go here...
 */
module.exports = /* async */ function getAllChapterFiles() {
    return new Promise((resolve, reject) => {
      glob(path.join(BASEDIR, `chapters/**/content*md`), (err, files) => {
        if (err) reject(err);

        const locales = {};

        files.forEach((file) => {
          let locale = file.match(/content\.([^.]+)\.md/)[1];
          if (!locales[locale]) {
            locales[locale] = [];
          }
          locales[locale].push(file);
        });

        resolve(locales);
      });
    });
  }
