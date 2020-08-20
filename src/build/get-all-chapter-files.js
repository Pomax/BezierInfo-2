import glob from "glob";
import path from "path";
import paths from "../project-paths.js";

/**
 * ...docs go here...
 */

function getAllChapterFiles() {
  // note that this returns a promise, and so can be `await`ed.
  return new Promise((resolve, reject) => {
    glob(path.join(paths.chapters, `**`, `content*md`), (err, files) => {
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

export { getAllChapterFiles };
