/**********************************************************************
 *
 *  This script is a locale aggregator and JSX generator, yielding
 *  locale-specific node modules that contain the section content
 *  keyed on section dir names.
 *
 *  1. find out which sections exist
 *  2. find out how many different locales exist
 *  3. for each locale:
 *
 *    1. for each section:
 *
 *      1. grab the associated locale
 *      2. chunk the data for "should be preserved" vs.
 *         "should be processed as markdown".
 *      3. join the chunks back up after converting the
 *         still acknowledged as markdown bits.
 *      4. aggregate with a function wrapper to allow for
 *         JS bindings to a handler object.
 *
 *    2. dump the aggregated locale data as a content.js file
 *    3. generate a locale-specific index.html
 *
 *
 **********************************************************************/

const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const marked = require("marked");
const prettier = require("prettier");
const latexToSVG = require("./latex-to-svg");

const nunjucks = require("nunjucks");
nunjucks.configure(".", { autoescape: false });

// make sure we know what our base location is
const BASEDIR = path.join(__dirname, "..");

// bundle all content in a specific locale for use by the app
const defaultLocale = "en-GB";
var locale = defaultLocale;
var lpos = process.argv.indexOf("--locale");
if (lpos !== -1) locale = process.argv[lpos + 1];

// main entry point

(async function () {
  const locales = await findLocales();
  Object.keys(locales).forEach(async (locale) => {
    const chapters = await processLocale(locale, locales[locale]);
    createIndexPages(locale, chapters);
  });
})();

// functions

/**
 * ...docs go here...
 */
function findLocales() {
  return new Promise((resolve, reject) => {
    glob(path.join(BASEDIR, `chapters/**/content*md`), (err, files) => {
      if (err) reject(err);

      const locales = {};

      files.forEach((file) => {
        let locale = file.match(/content\.([^.]+)\.md/)[1];
        if (!locales[locale]) {
          locales[locale] = [];
        }
        locales[locale].push(file);
      });

      resolve(locales);
    });
  });
}

/**
 * ...docs go here...
 */
async function processLocale(locale, files) {
  const chapters = {};

  await Promise.all(
    files.map(async (file) => {
      const chapter = file.match(/chapters\/([^/]+)\/content./)[1];
      const markdown = fs.readFileSync(file).toString("utf8");
      const replaced = nunjucks.renderString(markdown, {
        disableMessage: `<span>${getDisabledMessage(locale)}</span>`,
      });
      const converted = await convertMarkDown(replaced);
      chapters[chapter] = converted;
    })
  );

  return chapters;
}

/**
 * ...docs go here
 */
function getDisabledMessage(locale) {
  const localizedMessages = {
    "en-GB": `Scripts are disabled. Showing fallback image.`,
    "zh-CN": `脚本已禁用，并显示后备图像。`,
    "ja-JP": `JSがなくて、画像を表示しています。`,
  };
  return localizedMessages[locale];
}

/**
 * ...docs go here...
 */
async function createIndexPages(locale, chapters) {
  const toc = {};
  const sections = Object.keys(chapters).map((section) => {
    let content = chapters[section];
    toc[section] = content.match(/<h1>([^<]+)<\/h1>/)[1];
    return `<section id="${section}">\n${content}</section>`;
  });

  const index = nunjucks.render(`index.template.html`, {
    locale,
    toc: Object.keys(toc)
      .map((id) => `<li><a href="#${id}">${toc[id]}</a></li>`)
      .join(`\n`),
    chapters: sections.join(`\n`),
  });

  const data = prettier.format(index, { parser: `html` });
  fs.writeFileSync(`index.${locale}.html`, data, `utf8`);
}

/**
 * ...docs go here...
 */
async function convertMarkDown(markdown) {
  // preprocess marrkdown to extract LaTeX sections
  let latexSection = 0,
    pos = -1,
    data = markdown,
    latex = [],
    startmark = `<script type="text/latex">`,
    endmark = `</script>`;

  do {
    pos = data.indexOf(startmark);
    if (pos !== -1) {
      let endpos = data.indexOf(endmark, pos) + endmark.length;
      let key = `latex${latexSection}`;
      latex[key] = data.substring(
        pos + startmark.length,
        endpos - endmark.length
      );
      data = `${data.slice(0, pos)}{{ ${key} }}${data.slice(endpos)}`;
    }
  } while (pos !== -1);

  await Promise.all(
    Object.keys(latex).map(async (key) => {
      const svg = await latexToSVG(latex[key]);
      return (latex[key] = svg);
    })
  );

  let converted = marked(data, {
    gfm: true,
    headerIds: false,
    mangle: false,
  })
    // sigh...
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<p>{{/g, `{{`)
    .replace(/}}<\/p>/g, `}}`);

  return nunjucks.renderString(converted, latex);
}
