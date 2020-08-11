import fs from "fs-extra";
import path from "path";

import prettier from "prettier";
import generateLangSwitcher from "./generate-lang-switcher.js";
import nunjucks from "nunjucks";
import sectionOrder from "../../chapters/toc.js";
import changelog from "../../changelog.js";

nunjucks.configure(".", { autoescape: false });

/**
 * ...docs go here...
 */
async function createIndexPages(locale, localeStrings, chapters) {
  const defaultLocale = localeStrings.getDefaultLocale();
  const base = locale !== defaultLocale ? `<base href="..">` : ``;
  const langSwitcher = generateLangSwitcher(localeStrings);
  const toc = {};
  const preface = `<section id="preface">${
    chapters[sectionOrder[0]]
  }</section>`;

  const sections = sectionOrder.slice(1).map((section) => {
    let content = chapters[section];
    if (content) {
      let title = content.match(/<h1>([^<]+)<\/h1>/)[1];
      toc[section] = `<li><a href="#${section}">${title}</a></li>`;
      // hyperlinked section titles please
      return `<section id="${section}">${content
        .replace(`<h1>`, `<h1><a href="#${section}">`)
        .replace(`</h1>`, `</a></h1>`)}</section>`;
    }
    return ``;
  });

  let changeLogHTML = [];
  Object.keys(changelog).forEach((period) => {
    let changes = changelog[period]
      .map((change) => `<li>${change}</li>`)
      .join(`\n`);
    changeLogHTML.push(`<h2>${period}</h2><ul>${changes}</ul>`);
  });

  // Set up the templating context
  const context = {
    base,
    locale,
    langSwitcher,
    preface,
    toc: Object.values(toc).join(`\n`),
    changelog: changeLogHTML.join(`\n`),
    chapters: sections.join(`\n`),
  };

  // And inject all the relevant locale strings
  localeStrings.extendContext(context);

  const index = nunjucks.render(`index.template.html`, context);

  // TODO: FIXME: Prettier is slow as hell, find an alternative that isn't...
  const start = Date.now();
  const data = prettier.format(index, { parser: `html` });
  const end = Date.now();
  console.log(`beautification for ${locale} took ${(end - start) / 1000}s`);

  if (locale === defaultLocale) {
    fs.writeFileSync(`index.html`, data, `utf8`);
  } else {
    fs.ensureDir(locale);
    fs.writeFileSync(path.join(locale, `index.html`), data, `utf8`);
  }
}

export { createIndexPages };
