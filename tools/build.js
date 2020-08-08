import LocaleStrings from "./locale-strings.js";
import getAllChapterFiles from "./build/get-all-chapter-files.js";
import processLocale from "./build/process-locale.js";
import createIndexPages from "./build/create-index-page.js";

/**
 * main entry point:
 * - aggregate all content files organized by locale
 * -
 */
getAllChapterFiles().then((chapterFiles) => {
  const languageCodes = Object.keys(chapterFiles);
  languageCodes.forEach(async (locale) => {
    const localeStrings = new LocaleStrings(locale);
    const chapters = await processLocale(locale, localeStrings, chapterFiles);
    createIndexPages(locale, localeStrings, chapters);
  });
});
