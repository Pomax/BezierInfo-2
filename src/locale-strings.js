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
  longDescription: {
    "en-GB": `
      <p>
        Welcome to the Primer on Bezier Curves. This is a free website/ebook dealing with both
        the maths and programming aspects of Bezier Curves, covering a wide range of topics
        relating to drawing and working with that curve that seems to pop up everywhere, from
        Photoshop paths to CSS easing functions to Font outline descriptions.
      </p>
      <p>
        If this is your first time here: welcome! Let me know if you were looking for anything
        in particular that the primer doesn't cover over on the <a href="https://github.com/Pomax/BezierInfo-2/issues">issue tracker</a>!
      </p>

      <p>
        If this is a resource that you're using for research, or writing your own software,
        please consider <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=3BNHGHZAS3DP6&locale.x=en_CA">donating</a>
        (any amount helps) or signing up as <a href="https://www.patreon.com/bezierinfo">a patron on Patreon</a>.
        I don't get paid to work on this, so if you find this site valuable, and you'd like it
        to stick around for a long time to come, a lot of coffee went into writing this over the
        years, and a lot more coffee will need to go into it yet: if you can spare a coffee, you'd
        be helping keep a resource alive and well!
      </p>
    `,
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
    "en-GB": `Don't see your language listed, or want to see it reach 100%? <a href="https://github.com/Pomax/BezierInfo-2/wiki/help-localize-the-primer-on-bezier-curves">Help translate this content!</a>`,
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
    "en-GB": `This primer is a living document, and so depending on when you last look at it, there may be new content. Click the following link to expand this section to have a look at what got added, when, or click through to the <a href="./news">News posts</a> for more detailed updates. (<a href="./news/rss.xml">RSS feed</a> available)`,
  },
};

// =============================
//   Locale strings end here
// =============================

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
