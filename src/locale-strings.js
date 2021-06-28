const localeStringData = {
  title: {
    "en-GB": `A Primer on Bézier Curves`,
    "ja-JP": `ベジェ曲線入門`,
    "zh-CN": `贝塞尔曲线底漆`,
    "ru-RU": `Основы кривых Безье`,
    "uk-UA": `Підручник з кривих Безьє`,
  },

  subtitle: {
    "en-GB": `A free, online book for when you really need to know how to do Bézier things.`,
    "ru-RU": `Бесплатная онлайн-книга для тех, кому действительно важно знать, как работают кривые Безье`,
    "uk-UA": `Безкоштовна онлайн-книга, яка навчить вас всьому необхідному, щоб працювати з кривими Безьє.`,
  },

  description: {
    "en-GB": `A detailed explanation of Bézier curves, and how to do the many things that we commonly want to do with them.`,
    "ru-RU": `Подробное обьяснение кривых Безье и возможностей их применения`,
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
    `,
    "ru-RU": `
      <p>
        Приветствуем на Основах кривых Безье. Это бесплатная веб-страница/электронная книга, посвященная как математическим,
        так и программным аспектам кривых Безье, охватывает широкий спектр тем касающихся рисования и работы с кривой,
        которая, кажется, появляется повсюду: от кривых в Photoshop до функций плавности (easing functions) CSS и начертания шрифтов.
      </p>
      <p>
        Если вы здесь впервые: Добро пожаловать! Обязательно <a href="https://github.com/Pomax/BezierInfo-2/issues">напишите мне</a>, 
        если вы ищете что-то конкретное, но не нашли ответ в тексте.
      </p>
    `,
    "uk-UA": `
      <p>
        Ласкаво прошу до Підручника з кривих Безьє. Це безкоштовний вебсайт/електронна книга, що пояснює і математичні,
        і програмувальні аспекти кривих Безьє, покриваючи широкий спектр областей, які стосуються малювання та роботи з
        цими кривими. Криві Безьє застосовуються всюди, починаючи з кривих у Photoshop, і закінчуючи функціями пом'якшення
        (easing function) CSS та описом контурів популярних шрифтів.
      </p>
      <p>
        Якщо ви тут вперше: ласкаво прошу! Напишіть мені <a href="https://github.com/Pomax/BezierInfo-2/issues">сюди</a>,
        якщо вас цікавить щось, пов'язане з кривими Безьє, чого немає у підручнику.
      </p>
      `,
  },

  donationsHeading: {
    "en-GB": `Donations and sponsorship`,
    "ru-RU": `Пожертвования и спонсорство`,
  },

  donationCTA: {
    "en-GB": `<p>
        If this is a resource that you're using for research, as work reference, or even writing your own software,
        please consider <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=3BNHGHZAS3DP6&locale.x=en_CA">donating</a>
        (any amount helps) or signing up as <a href="https://www.patreon.com/bezierinfo">a patron on Patreon</a>.
        I don't get paid to work on this, so if you find this site valuable, and you'd like it
        to stick around for a long time to come, a lot of coffee went into writing this over the
        years, and a lot more coffee will need to go into it yet: if you can spare a coffee, you'd
        be helping keep a resource alive and well.
      </p>
      <p>
        Also, if you are a company and your staff uses this book as a resource, or you use it as an
        onboarding resource, then please: consider sponsoring the site! I am more than happy to work
        with your finance department on sponsorship invoicing and recognition.
      </p>
    `,
    "ru-RU": `
      <p>
        Если вы используете этот источник для исследований, в качестве справочника по работе, или даже для написания
        собственного программного обеспечения рассмотрите возможность
        <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=3BNHGHZAS3DP6&locale.x=en_CA">задонатить</a>
        (любая сумма годится) или станьте <a href="https://www.patreon.com/bezierinfo">патроном на Patreon</a>. Мне не
        платят за эту работу, так что, если вы нашли что-то полезное для себя и хотите, чтобы он оставался с нами надолго,
        то вот вам мысль: на создание этих страниц ушло много кофе, и уйдет ещё больше на их совершенствование;
        если вы можете помочь с кофе, то поможете долгой и счастливой жизни этого ресурса.
      </p>
      <p>
        Кроме того, если вы являетесь компанией и ваши сотрудники используют эту книгу в качестве источника, или вы используете
        её в качестве вспомогательного ресурса, пожалуйста: подумайте о финансировании сайта! Я более чем счастлив, работая
        с вашим финансовым отделом над выставлением счетов и признанием спонсорства.
      </p>
    `,
    "uk-UA": `
      <p>
        Якщо ви використовуєте цей ресурс для наукових досліджень, або пишете власне програмне забезпечення, будь ласка,
        розгляньте можливість <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=3BNHGHZAS3DP6&locale.x=en_CA">фінансової
        підтримки</a> (будь-яка сума вітається), або <a href="https://www.patreon.com/bezierinfo">станьте патроном на Patreon</a>.
        Мені не платять за цю роботу, тому якщо ви вважаєте цей сайт корисним, і хотіли б, щоб він підтримувався протягом
        тривалого часу, знайте: багато кави потрібно було за ці роки, і ще багато буде потрібно. Тому, якщо можете допомогти
        з кавою, то можете бути впевнені, що цей ресурс буде підтримуватися ще довго!
      </p>
    `,
  },

  bitcoinHeading: {
    "en-GB": `Bitcoin donations:`,
    "ru-RU": `Пожертвования в биткойнах:`,
  },

  bitcoinCTA: {
    "en-GB": `<p>
        If you prefer to donate via Bitcoin, you can donate either directly to
        <a class="btclk" href="bitcoin:3GY1HbQ2cH9V4xBLnRYdEfc42Nd1ZyjLZu?label=Primer%20on%20Bezier%20Curves">3GY1HbQ2cH9V4xBLnRYdEfc42Nd1ZyjLZu</a>
        or use the QR code on the right, if that's the kind of convenience you prefer =)
      </p>
    `,
    "ru-RU": `<p>
        Если вы предпочитаете делать пожертвования через биткойн, вы можете сделать пожертвование либо напрямую на
        <a class="btclk" href="bitcoin:3GY1HbQ2cH9V4xBLnRYdEfc42Nd1ZyjLZu?label=Primer%20on%20Bezier%20Curves">3GY1HbQ2cH9V4xBLnRYdEfc42Nd1ZyjLZu</a>
        либо используя QR-код справа, если вы предпочитаете такой вид =)
      </p>
    `,
  },

  tocLabel: {
    "en-GB": `Table of Contents`,
    "ja-JP": `目次`,
    "zh-CN": `目录`,
    "ru-RU": `Оглавление`,
    "uk-UA": `Зміст`,
  },

  localeName: {
    "en-GB": `English`,
    "ja-JP": `日本語`,
    "zh-CN": `中文`,
    "ru-RU": `Русский`,
    "uk-UA": `Українська`,
  },

  langSwitchLabel: {
    "en-GB": `Read this in your own language:`,
    "ru-RU": `Читайте на своём языке:`,
    "uk-UA": `Читати рідною мовою:`,
  },

  langHelpLabel: {
    "en-GB": `Don't see your language listed, or want to see it reach 100%? <a href="https://github.com/Pomax/BezierInfo-2/wiki/help-localize-the-primer-on-bezier-curves">Help translate this content!</a>`,
    "ru-RU": `Не нашли свой язык или хотите, чтобы он достиг до 100%? <a href="https://github.com/Pomax/BezierInfo-2/wiki/help-localize-the-primer-on-bezier-curves">Помогите нам с переводом!</a>`,
    "uk-UA": `Не бачите своєї мови у списку або хочете, щоб вона досягла 100%? <a href="https://github.com/Pomax/BezierInfo-2/wiki/help-localize-the-primer-on-bezier-curves">Допоможіть перекласти цей контент!</a>`,
  },

  disabledMessage: {
    "en-GB": `Scripts are disabled. Showing fallback image.`,
    "ru-RU": `Скрипты отключены. Показываем резервное изображение.`,
    "uk-UA": `Скрипти вимкнено. показує резервний.`,
  },

  reset: {
    "en-GB": `reset`,
    "ja-JP": `リセット`,
    "zh-CN": `重启`,
    "ru-RU": `cбросить`,
    "uk-UA": `скинути`,
  },

  viewSource: {
    "en-GB": `view source`,
  },

  changelogTitle: {
    "en-GB": `What's new?`,
    "ru-RU": `Что нового?`,
    "uk-UA": `Що нового?`,
  },

  toggleLabel: {
    "en-GB": `Toggle changes`,
    "ru-RU": `Показать/скрыть изменения`,
    "uk-UA": `Перемкнути зміни`,
  },

  preambleLabel: {
    "en-GB": `Preamble`,
    "ja-JP": `前文`,
    "zh-CN": `前言`,
    "ru-RU": `Преамбула`,
    "uk-UA": `Преамбула`,
  },

  prefaceLabel: {
    "en-GB": `Preface`,
    "ja-JP": `まえがき`,
    "zh-CN": `序言`,
    "ru-RU": `Предисловие`,
    "uk-UA": `Передмова`,
  },

  mainContentLabel: {
    "en-GB": `Main content`,
    "ru-RU": `Содержание`,
    "uk-UA": `Основний вміст`,
  },

  changelogLabel: {
    "en-GB": `What's new`,
    "ru-RU": `Что нового`,
    "uk-UA": `Зміни`,
  },

  changelogDescription: {
    "en-GB": `This primer is a living document, and so depending on when you last look at it, there may be new content. Click the following link to expand this section to have a look at what got added, when, or click through to the <a href="./news">News posts</a> for more detailed updates. (<a href="./news/rss.xml">RSS feed</a> available)`,
    "ru-RU": `Этот документ живое пособие, в зависимости от даты вашего последнего посещения, может появиться новый материал. Кликайте <a href="./news">здесь</a> для просмотра лога изменений. (также доступен <a href="./news/rss.xml">RSS-канал</a>)`,
    "uk-UA": `Цей підручник постійно розвививається, тож залежно від того, коли ви востаннє його переглядали, тут можуть бути оновлення. Перейдіть за <a href="./news">цим посиланням</a>, щоб побачити, що було додано. (Також доступний <a href="./news/rss.xml">RSS-канал</a>)`,
  },

  previous: {
    "en-GB": `previous`,
    "ja-JP": `前`,
    "zh-CN": `前`,
    "ru-RU": `предыдущий`,
    "uk-UA": `попередній`,
  },

  next: {
    "en-GB": `next`,
    "ja-JP": `次`,
    "zh-CN": `下`,
    "ru-RU": `следующий`,
    "uk-UA": `наступний`,
  },
};

export default localeStringData;
