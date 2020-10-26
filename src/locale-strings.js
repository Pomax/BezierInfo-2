const defaultLocale = "en-GB";

// =============================
//   Locale strings start here
// =============================

const localeStringData = {
  title: {
    "en-GB": `A Primer on Bézier Curves`,
    "ja-JP": `ベジェ曲線入門`,
    "zh-CN": `贝塞尔曲线底漆`,
    "uk-UA": `Підручник з кривих Безьє`,
  },
  subtitle: {
    "en-GB": `A free, online book for when you really need to know how to do Bézier things.`,
    "uk-UA": `Безкоштовна онлайн-книга, яка навчить вас всьому необхідному, щоб працювати з кривими Безьє.`,
  },
  description: {
    "en-GB": `A detailed explanation of Bézier curves, and how to do the many things that we commonly want to do with them.`,
    "uk-UA": `Детальне пояснення кривих Безьє та можливостей їх застосування.`,
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
    "uk-UA": `
      <p>
        Ласкаво прошу до Підручника з кривих Безьє. Це безкоштовний вебсайт/електронна книга, що пояснює і математичні, і програмувальні аспекти
        кривих Безьє, покриваючи широкий спектр областей, які стосуються малювання та роботи з цими кривими. Криві Безьє застосовуються всюди, починаючи з кривих у Photoshop, і закінчуючи  
         функціями пом'якшення (easing function) CSS та описом контурів популярних шрифтів.
      </p>
      <p>
        Якщо ви тут вперше: ласкаво прошу! Напишіть мені <a href="https://github.com/Pomax/BezierInfo-2/issues">сюди</a>, якщо вас цікавить щось, пов'язане з кривими Безьє, чого немає у підручнику.
      </p>

      <p>
        Якщо ви використовуєте цей ресурс для наукових досліджень, або пишете власне програмне забезпечення, будь ласка, розгляньте можливість
        <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=3BNHGHZAS3DP6&locale.x=en_CA">фінансової підтримки</a>
        (будь-яка сума вітається), або <a href="https://www.patreon.com/bezierinfo">станьте патроном на Patreon</a>.
        Мені не платять за цю роботу, тому якщо ви вважаєте цей сайт корисним, і хотіли б, щоб він підтримувався протягом тривалого часу, знайте: 
        багато кави потрібно було за ці роки, і ще багато буде потрібно. Тому, якщо можете допомогти з кавою, то можете бути впевнені, що цей ресурс буде підтримуватися ще довго!
        be helping keep a resource alive and well!
      </p>
    `,
  },
  tocLabel: {
    "en-GB": `Table of Contents`,
    "ja-JP": `目次`,
    "zh-CN": `目录`,
    "uk-UA": `Зміст`,
  },
  localeName: {
    "en-GB": `English`,
    "ja-JP": `日本語`,
    "zh-CN": `中文`,
    "uk-UA": `Українська`,
  },
  langSwitchLabel: {
    "en-GB": `Read this in your own language:`,
    "uk-UA": `Читати рідною мовою:`,
  },
  langHelpLabel: {
    "en-GB": `Don't see your language listed? <a href="https://github.com/Pomax/BezierInfo-2/wiki/localize">Help translate this content!</a>`,
    "uk-UA": `Не бачите вашої мови у списку? <a href="https://github.com/Pomax/BezierInfo-2/wiki/localize">Допоможіть перекласти цей контент!</a>`,
  },
  disabledMessage: {
    "en-GB": `Scripts are disabled. Showing fallback image.`,
    "uk-UA": `Скрипти вимкнено`,
  },
  changelogTitle: {
    "en-GB": `What's new?`,
    "uk-UA": `Що нового?`,
  },
  toggleLabel: {
    "en-GB": `Toggle changes`,
    "uk-UA": `Перемкнути зміни`,
  },
  preambleLabel: {
    "en-GB": `Preamble`,
    "ja-JP": `前文`,
    "zh-CN": `前言`,
    "uk-UA": `Преамбула`,
  },
  prefaceLabel: {
    "en-GB": `Preface`,
    "ja-JP": `まえがき`,
    "zh-CN": `序言`,
    "uk-UA": `Передмова`,
  },
  mainContentLabel: {
    "en-GB": `Main content`,
    "uk-UA": `Основний вміст`,
  },
  changelogLabel: {
    "en-GB": `What's new`,
    "uk-UA": `Зміни`,
  },
  changelogDescription: {
    "en-GB": `This primer is a living document, and so depending on when you last look at it, there may be new content. Click the following link to expand this section to have a look at what got added, when, or click through to the <a href="./news">News posts</a> for more detailed updates. (<a href="./news/rss.xml">RSS feed</a> available)`,
    "uk-UA": `Цей підручник постійно розвививається, тож залежно від того, коли ви востаннє його переглядали, тут можуть бути оновлення. Перейдіть за <a href="./news">цим посиланням</a>, щоб побачити, що було додано. (Також доступний <a href="./news/rss.xml">RSS-канал</a>)`,
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
