import glob from "glob";
import path from "path";
import paths from "../project-paths.js";

import sectionOrder from "../../docs/chapters/toc.js";

function getAllChapterFiles() {
  // async, by returning a Promise
  return new Promise((resolve, reject) => {
    glob(path.join(paths.chapters, `**`, `content*md`), (err, files) => {
      if (err) reject(err);

      const locales = {};

      files.forEach((file) => {
        const dir = path.relative(paths.chapters, path.dirname(file));

        if (!sectionOrder.includes(dir)) return;

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
