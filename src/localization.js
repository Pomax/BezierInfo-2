import localeStringData from "./locale-strings.js";

const defaultLocale = "en-GB";

class LocaleStrings {
  constructor(locale = `en-GB`) {
    this.currentLocale = locale;
    const strings = (this.strings = {});

    Object.keys(localeStringData).forEach((id) => {
      const map = localeStringData[id];
      if (typeof map !== "object") return;
      const value = map[locale] ? map[locale] : map[defaultLocale];
      if (!value) throw new Error(`unknown locale string id "${id}".`);
      strings[id] = value;

      // temporary bug catcher:
      Object.defineProperty(this, id, {
        get: () => {
          throw new Error(`cannot get localestring ${id} via property access`);
        },
      });
    });
  }
  // templating tags:

  get translate() {
    return this.get.bind(this);
  }

  // functions:

  get(id) {
    return this.strings[id];
  }

  getDefaultLocale() {
    return defaultLocale;
  }

  getCurrentLocale() {
    return this.currentLocale;
  }

  getLocaleName(locale) {
    const name = localeStringData.localeName[locale];
    if (!name) {
      throw new Error(`Unknown locale "${locale}"`);
    }
    return name;
  }

  getAllLocaleCodes() {
    return Object.keys(localeStringData.title);
  }

  extendContext(contextToExtend, localeStringTemplating = {}) {
    const strings = this.strings;

    Object.keys(strings).forEach((key) => {
      if (contextToExtend[key]) {
        throw new Error(`Context already has key "${key}"!`);
      }
      let v = strings[key];
      Object.entries(localeStringTemplating).forEach((keyval) => {
        let [name, value] = keyval;
        v = v.replace(new RegExp(`{{ ${name} }}`, `g`), value);
      });
      contextToExtend[key] = v;
    });
  }
}

export default LocaleStrings;
