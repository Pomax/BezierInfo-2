import LocaleStrings from "./locale-strings.js";
import { getAllChapterFiles } from "./build/get-all-chapter-files.js";
import { processLocale } from "./build/process-locale.js";
import { createIndexPages } from "./build/create-index-pages.js";
import { createNewsPages } from "./build/create-news-pages.js";

// TODO: figure out a way to cleanly indicate which dir is "the main content", needing
//       to be compiled into the index.html file, and which dirs are "satellite content"
//       that should get compiled into its own dir.

/**
 * main entry point:
 */
getAllChapterFiles().then(async (chapterFiles) => {
  const start = Date.now();
  const languageCodes = Object.keys(chapterFiles);

  const build = await Promise.all(
    languageCodes.map(async (locale) => {
      const localeStrings = new LocaleStrings(locale);
      return await processLocale(locale, localeStrings, chapterFiles);
    })
  );

  const progress = {};
  build.forEach((e) => (progress[e.locale] = e.percentage));

  await Promise.all(build.map((e) => createIndexPages(e.locale, e.localeStrings, e.chapters, progress)));

  await createNewsPages();

  const runtime = Date.now() - start;
  console.log(`\nFinished build (${(runtime / 1000).toFixed(2)}s)\n`);
});
