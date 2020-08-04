const fs = require("fs-extra");
const path = require("path");
const config = require("../../config.json");
const defaultLocale = config.defaultLocale
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

  const sections = Object.keys(chapters).map((section) => {
    let content = chapters[section];
    let title = content.match(/<h1>([^<]+)<\/h1>/)[1];
    toc[section] = `<li><a href="#${section}">${title}</a></li>`;
    return `<section id="${section}">\n${content}</section>`;
  });

  const index = nunjucks.render(`index.template.html`, {
    base,
    locale,
    langSwitchLabel: config.langSwitchLabel[locale],
    langSwitcher,
    toc: Object.values(toc).join(`\n`),
    chapters: sections.join(`\n`),
  });

  const data = prettier.format(index, { parser: `html` });

  if (locale === defaultLocale) {
    fs.writeFileSync(`index.html`, data, `utf8`);
  } else {
    fs.ensureDir(locale);
    fs.writeFileSync(path.join(locale, `index.html`), data, `utf8`);
  }
};
