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

var fs = require("fs-extra");
var glob = require('glob');
var path = require("path");
var marked = require("marked");
var chunk = require("./lib/chunk");
var jsxshim = require("./lib/jsx-shim");

// make sure we know what our base location is
const BASEDIR = path.join(__dirname,"..");

// bundle all content in a specific locale for use by the app
const defaultLocale = "en-GB";
var locale = defaultLocale;
var lpos = process.argv.indexOf('--locale');
if (lpos !== -1) { locale = process.argv[lpos+1]; }

/**
 * turn locale markdown into locale javascript data
 */
function processLocation(loc, fragmentid, number) {
  var processed = { data: '', title: `Unknown title (${fragmentid})` };
  try {
    data = fs.readFileSync(loc).toString();
    data = chunk(data).map(block => {
      // preserver is simple
      if (!block.convert) return block.data;

      // markdown conversion is a little more work
      let d = marked(block.data.trim());

      // serious can we fucking not, please.
      d = d.replace('<p></div></p>', '</div>')
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')

      // ``` conversion does odd things with <code> tags inside <pre> tags.
      d = d.replace(/<pre>(\r?\n)*<code>/g,'<pre>')
          .replace(/<\/code>(\r?\n)*<\/pre>/g,'</pre>');

      // And then title extraction/rewriting
      d = d.replace(/<h1[^>]+>([^<]+)<\/h1>/,function(_,t) {
        processed.title = t;
        return `<SectionHeader name="${fragmentid}" title="` + t + `"${ number ? ' number="'+number+'"': ''}/>`;
      });

      return d;
    }).join('');
    processed.data = data;
  } catch (e) {
    // console.warn(e);
  }

  return processed;
}


/**
 * Form the content.js file content as a single string for file-writing.
 */
function formContentBundle(locale, content) {
  var bcode = JSON.stringify(content, false, 2);
  bcode = bcode.replace(/"<section>/g, "function(handler) { return <section>")
              .replace(/this\.(\w)/g, "handler.$1")
              .replace(/<\/section>"(,?)/g, "</section>; }$1\n")
              .replace(/\\"/g,'"')
              .replace(/\\n/g,'\n')
              .replace(/></g,'>\n<')
              .replace(/\\\\/g, '\\');

  var bundle = [
    `var React = require('react');`,
    `var Graphic = require("../../components/Graphic.jsx");`,
    `var SectionHeader = require("../../components/SectionHeader.jsx");`,
    `var BSplineGraphic = require("../../components/BSplineGraphic.jsx");`,
    `var KnotController = require("../../components/KnotController.jsx");`,
    `var WeightController = require("../../components/WeightController.jsx");`,
    ``,
    `SectionHeader.locale="${locale}";`,
    ``,
    `module.exports = ${bcode};`,
    ``
  ].join('\n');

  return bundle;
}

/**
 * Process the locale switcher component.
 */
function processLocaleSwitcher(locale, content) {
  // We also need to localize the "LocaleSwitcher"
  var localeCode = locale;
  var loc = `./components/localized/LocaleSwitcher/content.${localeCode}.md`;
  if (!fs.existsSync(loc)) {
    localeCode = defaultLocale;
    loc = `./components/localized/LocaleSwitcher/content.${localeCode}.md`;
  }
  var key = "locale-switcher";
  var processed = processLocation(loc, key);
  content[key] = {
    locale: localeCode,
    title: key,
    getContent: "<section>" + processed.data + "</section>"
  };
}

/**
 * Write a content.js bundle to the filesystem
 */
function writeContentBundle(locale, content) {
  var bundle = formContentBundle(locale, content);

  // write the content.js file for bundling purposes
  var dir = `./locales/${locale}`;
  fs.ensureDirSync(dir);
  fs.writeFileSync(`${dir}/content.js`, bundle);

  // Write the actual locale directory and generate a locale-specific index.html
  var html = fs.readFileSync('./index.template.html').toString();
  var preface = content.preface.getContent.replace(/<SectionHeader name="preface" title="([^"]+)"\/>/, "<h2>$1</h2>");
  html = html.replace("{{ PREFACE }}", preface);
  html = html.replace("{{ locale }}", locale);
  fs.ensureDirSync(locale);
  fs.writeFileSync(`./${locale}/index.html`, html);
}

/**
 * Process a single locale, with `en-GB` fallback for missing files.
 */
function processLocale(locale) {
  // Get the section map. This will try to load .jsx code, which will fail,
  // but the above shim makes a failure simply return an empty object instead.
  // This is good: we only care about the keys, not the content.
  var index = require(path.join(BASEDIR, "components/sections"));
  var sections = Object.keys(index);
  var content = { locale };

  var processSection = (key, number) => {
    // Grab locale file, or defaultLocale file if the chosen locale has
    // has no translated content (yet)...
    var localeCode = locale;
    var loc = path.join(BASEDIR, `./components/sections/${key}/content.${localeCode}.md`);
    if (!fs.existsSync(loc)) {
      localeCode = defaultLocale;
      loc = path.join(BASEDIR, `./components/sections/${key}/content.${localeCode}.md`);
    }

    // Read in the content.{lang}.md file
    var processed = processLocation(loc, key, number);

    content[key] = {
      locale: localeCode,
      title: processed.title,
      getContent: "<section>" + processed.data + "</section>"
    };
  };

  sections.forEach(processSection);
  processLocaleSwitcher(locale, content);
  writeContentBundle(locale, content);
}

// find all locales used and generate their respective content dirs
glob(path.join(BASEDIR,"components/sections/**/content*md"), (err, files) => {
  var locales = [];
  files.forEach(file => {
    let locale = file.match(/content\.([^.]+)\.md/)[1];
    if (locales.indexOf(locale) === -1) {
      locales.push(locale);
    }
  });
  locales.forEach(processLocale);
});
