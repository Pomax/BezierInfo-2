import LocaleStrings from "./locale-strings.js";
import { getAllChapterFiles } from "./build/get-all-chapter-files.js";
import { processLocale } from "./build/process-locale.js";
import { createIndexPages } from "./build/create-index-page.js";

/**
 * main entry point:
 * - aggregate all content files organized by locale
 * -
 */
getAllChapterFiles().then(async (chapterFiles) => {
  const start = Date.now();
  const languageCodes = Object.keys(chapterFiles);

  await Promise.all(
    languageCodes.map(async (locale) => {
      const localeStrings = new LocaleStrings(locale);
      const chapters = await processLocale(locale, localeStrings, chapterFiles);
      return createIndexPages(locale, localeStrings, chapters);
    })
  );

  const runtime = Date.now() - start;
  console.log(`Finished build (${(runtime / 1000).toFixed(2)}s)`);
});
