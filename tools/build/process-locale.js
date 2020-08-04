const fs = require("fs-extra");
const path = require("path");
const localeStrings = require("../../locale-strings.json");
const defaultLocale = localeStrings.defaultLocale
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

  const chapters = {};
  let missing = 0;

  await Promise.all(
    localeFiles.map(async (file) => {
      const chapter = file.match(/chapters\/([^/]+)\/content./)[1];
      try {
        const markdown = fs.readFileSync(file).toString("utf8");
        const replaced = nunjucks.renderString(markdown, {
          disableMessage: `<span>${localeStrings.disabledMessage[locale]}</span>`,
        });
        const converted = await convertMarkDown(replaced);
        chapters[chapter] = converted;
      } catch (e) {
        if (locale === defaultLocale) missing++;
      }
    })
  );

  if (locale === defaultLocale) {
    console.log(`Warning: ${missing} chapters appear to be missing, based on the ToC listing.`);
  }

  if (localized < sectionList.length) {
    console.log(`${locale} partially localized: [${localized}/${sectionList.length}]`)
  } else {
    console.log(`${locale} fully localized.`)
  }

  return chapters;
};
