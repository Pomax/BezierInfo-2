/**********************************************************************
 *
 *  This script is a locale aggregator and JSX generator, yielding
 *  locale-specific node modules that contain the section content
 *  keyed on section dir names.
 *
 *  1. find out which sections exist
 *  2. find out how many different locales exist
 *  3. for each locale:
 *
 *    1. for each section:
 *
 *      1. grab the associated locale
 *      2. chunk the data for "should be preserved" vs.
 *         "should be processed as markdown".
 *      3. join the chunks back up after converting the
 *         still acknowledged as markdown bits.
 *      4. aggregate with a function wrapper to allow for
 *         JS bindings to a handler object.
 *
 *    2. dump the aggregated locale data as a content.js file
 *    3. generate a locale-specific index.html
 *
 *
 **********************************************************************/

const fs = require("fs-extra");
const path = require("path");

const getAllChapterFiles = require("./build/get-all-chapter-files.js");
const processLocale = require("./build/process-locale.js");
const createIndexPages = require("./build/create-index-page.js");

// main entry point

(async function () {
  const chapterFiles = await getAllChapterFiles();
  const languageCodes = Object.keys(chapterFiles);
  const sectionList = fs
    .readdirSync(`chapters`)
    .filter((v) => v.indexOf(`.`) === -1)
    .map((v) => path.posix.join(__dirname.split(path.sep).join(path.posix.sep), `..`, `chapters`, v));
  languageCodes.forEach(async (locale) => {
    const chapters = await processLocale(locale, chapterFiles, sectionList);
    createIndexPages(locale, chapters, languageCodes);
  });
})();