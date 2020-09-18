const defaultLocale = "en-GB";

// =============================
//   Locale strings start here
// =============================

const localeStringData = {
  title: {
    "en-GB": `A Primer on Bézier Curves`,
    "ja-JP": `ベジェ曲線入門`,
    "zh-CN": `贝塞尔曲线底漆`,
  },
  subtitle: {
    "en-GB": `A free, online book for when you really need to know how to do Bézier things.`,
  },
  description: {
    "en-GB": `A detailed explanation of Bézier curves, and how to do the many things that we commonly want to do with them.`,
  },
  tocLabel: {
    "en-GB": `Table of Contents`,
    "ja-JP": `目次`,
    "zh-CN": `目录`,
  },
  localeName: {
    "en-GB": `English`,
    "ja-JP": `日本語`,
    "zh-CN": `中文`,
  },
  langSwitchLabel: {
    "en-GB": `Read this in your own language:`,
  },
  langHelpLabel: {
    "en-GB": `Don't see your language listed? <a href="https://github.com/Pomax/BezierInfo-2/wiki/localize">Help translate this content!</a>`,
  },
  disabledMessage: {
    "en-GB": `Scripts are disabled. Showing fallback image.`,
  },
  changelogTitle: {
    "en-GB": `What's new?`,
  },
  toggleLabel: {
    "en-GB": `Toggle changes`,
  },
  preambleLabel: {
    "en-GB": `Preamble`,
    "ja-JP": `前文`,
    "zh-CN": `前言`,
  },
  prefaceLabel: {
    "en-GB": `Preface`,
    "ja-JP": `まえがき`,
    "zh-CN": `序言`,
  },
  mainContentLabel: {
    "en-GB": `Main content`,
  },
  changelogLabel: {
    "en-GB": `What's new`,
  },
  changelogDescription: {
    "en-GB": `This primer is a living document, and so depending on when you last look at it, there may be new content. Click the following link to expand this section to have a look at what got added, when, or click through to the <a href="{{ relurl }}news">News posts</a> for more detailed updates. (<a href="{{ relurl }}news/rss.xml">RSS feed</a> available)`,
  },
};

// =============================
//   Locale strings end here
// =============================

class LocaleStrings {
  constructor(locale) {
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
