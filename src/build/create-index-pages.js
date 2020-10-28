import fs from "fs-extra";
import path from "path";
import paths from "../project-paths.js";
import generateLangSwitcher from "./generate-lang-switcher.js";
import nunjucks from "nunjucks";
import sectionOrder from "../../docs/chapters/toc.js";
import changelogData from "../changelog.js";

nunjucks.configure(paths.html, { autoescape: false });

/**
 * ...docs go here...
 */
async function createIndexPages(locale, localeStrings, chapters, langProgress) {
  const defaultLocale = localeStrings.getDefaultLocale();
  const base = locale !== defaultLocale ? `<base href="..">` : ``;
  const langSwitcher = generateLangSwitcher(localeStrings, langProgress);
  const toclist = {};

  const localePrefix = base ? `${locale}/index.html` : ``;
  const preface = `<section id="preface">${chapters[sectionOrder[0]]}</section>`;
  const sections = formSectionData(chapters, sectionOrder, toclist, locale, base);
  const sectionText = finaliseSections(sections);
  const changelog = formChangeLog(changelogData);

  const renderContext = {
    base,
    locale,
    localePrefix,
    langSwitcher,
    preface,
    toc: Object.values(toclist).join(`\n`),
    changelog,
    chapters: sectionText.join(`\n`),
    urlSuffix: base ? `/${locale}` : ``,
    publishTime: `2013-06-13T12:00:00+00:00`,
    currentTime: new Date().toISOString().substring(0, 19) + "+00:00",
  };

  localeStrings.extendContext(renderContext);

  const index = nunjucks.render(`index.template.html`, renderContext);
  const writeDir = locale === defaultLocale ? paths.public : path.join(paths.public, locale);
  fs.ensureDirSync(writeDir);
  fs.writeFileSync(path.join(writeDir, `index.html`), index, `utf8`);

  return true;
}

export { createIndexPages };

/**
 * ...docs go here...
 */
function formSectionData(chapters, sectionOrder, toclist, locale, base) {
  // Preprocess the sections so the titles are links to themselves,
  // and we have the data required to crosslink each section to the
  // previous and next one in the book.

  return sectionOrder.slice(1).map((section, pos) => {
    let content = chapters[section];
    if (content) {
      let localePrefix = base ? `${locale}/` : ``;
      let link = localePrefix ? `${localePrefix}index.html#${section}` : `#${section}`;
      let title = content.match(/<h1>([^<]+)<\/h1>/)[1];
      toclist[section] = `<li><a href="${link}">${title}</a></li>`;
      // turn titles into links to themselves
      return {
        previous: pos - 1,
        next: pos + 1,
        link: link,
        content: `<section id="${section}">
          ${content.replace(`<h1>`, `<h1><a href="${link}">`).replace(`</h1>`, `</a></h1>`)}
          </section>`,
      };
    }
    return {};
  });
}

/**
 * ...docs go here...
 */
function finaliseSections(sections) {
  // Perform crosslinking as part of yielding the section text

  return sections.map((section) => {
    let elements = [];
    let previous = sections[section.previous];
    if (previous) {
      elements.push(`<a href="${previous.link}">previous</a>`);
    }
    let next = sections[section.next];
    if (next) {
      elements.push(`<a href="${next.link}">next</a>`);
    }
    let nav = `<div class="nav">${elements.join(``)}</div>`;
    return section.content.replace(`<h1><a`, `<h1>${nav}<a`);
  });
}

/**
 * ...docs go here...
 */
function formChangeLog(changelogData) {
  let changeLogHTML = [];
  Object.keys(changelogData).forEach((period) => {
    let changes = changelogData[period].map((change) => `<li>${change}</li>`).join(`\n`);
    changeLogHTML.push(`<h2>${period}</h2><ul>${changes}</ul>`);
  });
  return changeLogHTML.join(`\n`);
}
