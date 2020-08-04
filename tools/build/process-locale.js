const fs = require("fs-extra");
const path = require("path");
const config = require("../../config.json");
const defaultLocale = config.defaultLocale
const convertMarkDown = require("./convert-markdown.js");
const nunjucks = require("nunjucks");

nunjucks.configure(".", { autoescape: false });


/**
 * ...docs go here...
 */
module.exports = async function processLocale(
  locale,
  chapterFiles,
  sectionList
) {
  const localeFiles = chapterFiles[locale];
  let localized = 0;

  // make sure we fall back to en-GB content if there is no localised version
  sectionList.forEach((chapterpath) => {
    if (localeFiles.every((file) => file.indexOf(chapterpath) === -1)) {
      localeFiles.push(
        path.posix.join(chapterpath, `content.${defaultLocale}.md`)
      );
    } else {
      localized++;
    }
  });

  if (localized < sectionList.length) {
    console.log(`${locale} partially localized: [${localized}/${sectionList.length}]`)
  } else {
    console.log(`${locale} fully localized.`)
  }

  const chapters = {};

  await Promise.all(
    localeFiles.map(async (file) => {
      const chapter = file.match(/chapters\/([^/]+)\/content./)[1];
      const markdown = fs.readFileSync(file).toString("utf8");
      const replaced = nunjucks.renderString(markdown, {
        disableMessage: `<span>${config.disabledMessage[locale]}</span>`,
      });
      const converted = await convertMarkDown(replaced);
      chapters[chapter] = converted;
    })
  );

  return chapters;
};
