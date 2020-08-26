import fs from "fs-extra";
import path from "path";
import paths from "../project-paths.js";
import prettier from "prettier";
import generateLangSwitcher from "./generate-lang-switcher.js";
import nunjucks from "nunjucks";
import sectionOrder from "../../docs/chapters/toc.js";
import changelog from "../changelog.js";

nunjucks.configure(paths.src, { autoescape: false });

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
      let localePrefix = base ? `${locale}/` : ``;
      let link = localePrefix
        ? `${localePrefix}index.html#${section}`
        : `#${section}`;
      let title = content.match(/<h1>([^<]+)<\/h1>/)[1];
      toc[section] = `<li><a href="${link}">${title}</a></li>`;
      // hyperlinked section titles please
      return `<section id="${section}">
      ${content
        .replace(`<h1>`, `<h1><a href="${link}">`)
        .replace(`</h1>`, `</a></h1>`)}
      </section>`;
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

  let index = nunjucks.render(`index.template.html`, context);

  if (typeof process !== "undefined") {
    if (process.argv.indexOf(`--pretty`) !== 0) {
      index = prettier.format(index, { parser: `html` });
    }
  }

  // Prettification happens as an npm script action

  if (locale === defaultLocale) {
    fs.writeFileSync(path.join(paths.public, `index.html`), index, `utf8`);
  } else {
    let localeDir = path.join(paths.public, locale);
    fs.ensureDirSync(localeDir);
    fs.writeFileSync(path.join(localeDir, `index.html`), index, `utf8`);
  }

  return true;
}

export { createIndexPages };
