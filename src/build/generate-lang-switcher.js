/**
 * ...docs go here...
 * @param {*} localeStrings
 */
export default function generateLangSwitcher(localeStrings, langProgress) {
  const defaultLocale = localeStrings.getDefaultLocale();

  return localeStrings
    .getAllLocaleCodes()
    .map((locale) => {
      let link;
      if (locale === defaultLocale) {
        link = `./index.html`;
      } else {
        link = `./${locale}/index.html`;
      }
      let localeName = localeStrings.getLocaleName(locale);
      let progress = langProgress[locale] !== 100 ? ` <span class="localisation-progress">(${langProgress[locale]}%)</span>` : ` &nbsp;`;
      return `<li><a href="${link}">${localeName}</a>${progress}</li>`;
    })
    .join(`\n`);
}
