const fs = require("fs-extra");
const path = require("path");
const getAllChapterFiles = require("./build/get-all-chapter-files.js");
const processLocale = require("./build/process-locale.js");
const createIndexPages = require("./build/create-index-page.js");
const sectionList = require("../chapters/toc.js").map((v) =>
  path.posix.join(
    __dirname.split(path.sep).join(path.posix.sep),
    `..`,
    `chapters`,
    v
  )
);

/**
 * main entry point:
 * - aggregate all content files organized by locale
 * -
 */
getAllChapterFiles().then((chapterFiles) => {
  const languageCodes = Object.keys(chapterFiles);

  languageCodes.forEach(async (locale) => {
    const chapters = await processLocale(locale, chapterFiles, sectionList);
    createIndexPages(locale, chapters, languageCodes);
  });
});
