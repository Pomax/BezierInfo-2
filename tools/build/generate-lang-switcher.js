const localeStrings = require("../../locale-strings.json");
const defaultLocale = localeStrings.defaultLocale


module.exports = function generateLangSwitcher(currentLocale, allLocales) {
  return allLocales
    .map((locale) => {
      let link;
      if (currentLocale === defaultLocale) {
        if (locale === defaultLocale) {
          link = `./index.html`;
        } else {
          link = `${locale}/index.html`;
        }
      } else {
        if (locale === defaultLocale) {
          link = `../index.html`;
        } else {
          link = `../${locale}/index.html`;
        }
      }
      return `<li><a href="${link}">${localeStrings.localeName[locale]}</a></li>`;
    })
    .join(`\n`);
};
