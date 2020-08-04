const fs = require("fs-extra");
const path = require("path");
const localeStrings = require("../../locale-strings.json");
const defaultLocale = localeStrings.defaultLocale
const prettier = require("prettier");
const generateLangSwitcher = require("./generate-lang-switcher.js");
const nunjucks = require("nunjucks");

nunjucks.configure(".", { autoescape: false });


/**
 * ...docs go here...
 */
module.exports = async function createIndexPages(locale, chapters, languages) {
  let base = ``;

  if (locale !== defaultLocale) {
    base = `<base href="..">`;
  }

  const langSwitcher = generateLangSwitcher(locale, languages, defaultLocale);

  const toc = {};

  const sectionOrder = require("../../chapters/toc.js");
  const preface = `<section id="preface">${chapters[sectionOrder[0]]}</section>`;

  const sections = sectionOrder.slice(1).map((section) => {
    let content = chapters[section];
    if (content) {
      let title = content.match(/<h1>([^<]+)<\/h1>/)[1];
      toc[section] = `<li><a href="#${section}">${title}</a></li>`;
      return `<section id="${section}">${content}</section>`;
    }
    return ``;
  });

  // Set up the templating context
  const context = {
    base,
    locale,
    langSwitcher,
    preface,
    toc: Object.values(toc).join(`\n`),
    chapters: sections.join(`\n`),
  };

  // And inject all the relevant locale strings
  Object.keys(localeStrings).forEach(key => {
    if (localeStrings[key][locale]) {
      context[key] = localeStrings[key][locale];
    }
  });

  const index = nunjucks.render(`index.template.html`, context);

  const data = prettier.format(index, { parser: `html` });

  if (locale === defaultLocale) {
    fs.writeFileSync(`index.html`, data, `utf8`);
  } else {
    fs.ensureDir(locale);
    fs.writeFileSync(path.join(locale, `index.html`), data, `utf8`);
  }
};
