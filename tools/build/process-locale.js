import fs from "fs-extra";
import path from "path";
import { convertMarkDown } from "./markdown/convert-markdown.js";
import nunjucks from "nunjucks";
import toc from "../../chapters/toc.js";

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.href.replace(`file:///`, ``));

const sectionList = toc.map((v) =>
  path.posix.join(
    __dirname.split(path.sep).join(path.posix.sep),
    `..`,
    `..`,
    `chapters`,
    v
  )
);

nunjucks.configure(".", { autoescape: false });

/**
 * ...docs go here...
 */
async function processLocale(locale, localeStrings, chapterFiles) {
  const start = Date.now();

  const defaultLocale = localeStrings.getDefaultLocale();

  const localeFiles = chapterFiles[locale];
  let localized = 0;
  let missing = 0;

  // make sure we fall back to en-GB content if there is no localised version
  sectionList.forEach((chapterpath) => {
    if (!fs.existsSync(chapterpath)) {
      if (locale === defaultLocale) {
        missing++;
      }
      return;
    }
    if (localeFiles.every((file) => file.indexOf(chapterpath) === -1)) {
      localeFiles.push(
        path.posix.join(chapterpath, `content.${defaultLocale}.md`)
      );
    } else {
      localized++;
    }
  });

  const chapters = {};

  await Promise.all(
    localeFiles.map(async (file) => {
      const chapter = file.match(/chapters\/([^/]+)\/content./)[1];
      const markdown = fs.readFileSync(file).toString("utf8");
      chapters[chapter] = await convertMarkDown(
        chapter,
        localeStrings,
        markdown
      );
    })
  );

  if (locale === defaultLocale && missing > 0) {
    console.log(
      `Warning: ${missing} chapters appear to be missing, based on the ToC listing.`
    );
  }

  if (localized < sectionList.length) {
    console.log(
      `${locale} partially localized: [${localized}/${sectionList.length}]`
    );
  } else {
    console.log(`${locale} fully localized.`);
  }

  const end = Date.now();
  console.log(`Processing ${locale} took ${(end - start) / 1000}s`);

  return chapters;
}

export { processLocale };
