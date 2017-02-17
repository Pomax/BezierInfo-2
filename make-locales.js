var marked = require("marked");
var fs = require("fs-extra");

// bundle all content in a specific locale for use by the app
const defaultLocale = "en-GB";
var locale = defaultLocale;
var lpos = process.argv.indexOf('--locale');
if (lpos !== -1) { locale = process.argv[lpos+1]; }

// shim nodejs so that it knows what to do with jsx files: return empty objects.
var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function() {
  try {
    return originalRequire.apply(this, arguments);
  } catch (e) {
    return {};
  }
};

/**
 *
 */
function chunkGraphicJSX(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      gfxTag = '<Graphic',
      gfxEnd = '/>';

  while (p !== -1) {
    // Let's check a LaTeX block
    let gfx = data.indexOf(gfxTag, p);
    if (gfx === -1) {
      // No <Graphic/> block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-<Graphic/> data for whatever else might be in there.
    performChunking(data.substring(p, gfx), chunks, next, otherChunkers);

    // Then capture the <Graphic/> block and mark it as "don't convert"
    let eol = data.indexOf(gfxEnd, gfx) + gfxEnd.length;
    chunks.push({ convert: false, type: "gfx", s:gfx, e:eol, data: data.substring(gfx, eol) });
    p = eol;
  }
}


/**
 *
 */
function chunkDivs(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      divMatch = '\n<div className="',
      divEnd = '">\n',
      divClosingTag = '</div>\n';

  while (p !== -1) {
    // Let's check for a <div className="..."> tag
    let div = data.indexOf(divMatch, p);
    if (div === -1) {
      // No div tags found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-div data for whatever else might be in there.
    performChunking(data.substring(p, div), chunks, next, otherChunkers);

    // Now, if we have a div, there's a few options:
    //
    // - "figure" contains HTML content, not to be converted
    // - "note" contains markdown content, to be converted
    // - "howtocode" contains markdown content, to be converted
    let className = data.substring(div).match(/className="([^"]+)"/);
    if (className !== null) { className = className[1]; }

    let eod, type="div";
    if (className === "figure") {
      eod = data.indexOf(divClosingTag, div) + divClosingTag.length;
      type += ".figure";
    } else {
      eod = data.indexOf(divEnd, div) + divEnd.length;
    }

    chunks.push({ convert: false, type: type, s:div, e:eod, data: data.substring(div, eod) });
    p = eod;
  }
}

/**
 * Split data up into "latex" and "not latex".
 * Anything that is not latex might still be "not markdown"
 * though, so we hand that data off to additional chunkers
 */
function chunkLatex(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      latexEnd = '\\]\n';

  while (p !== -1) {
    // Let's check a LaTeX block
    let latex = data.indexOf('\n\\[', p);
    if (latex === -1) {
      // No LaTeX block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-LaTeX data for whatever else might be in there.
    performChunking(data.substring(p, latex), chunks, next, otherChunkers);

    // Then capture the LaTeX block and mark it as "don't convert"
    let eol = data.indexOf(latexEnd, latex) + latexEnd.length;
    chunks.push({ convert: false, type: "latex", s:latex, e:eol, data: data.substring(latex, eol) });
    p = eol;
  }
}

// in-place chunking
function performChunking(data, chunks, chunker, moreChunkers) {
  // If there's no further chunking function to run, just
  // record this data as a chunk of convertible data.
  if (!chunker) {
    if (data.trim()!=='') {
      chunks.push({ convert: true, data: data });
    }
    return "early";
  }

  // otherwise, perform more chunking.
  chunker(data, chunks, moreChunkers);
}

/**
 * Split data up into "markdown" and "not markdown" parts.
 * We'll only run markdown conversion on the markdown parts.
 */
function chunk(data) {
  var chunks = [];
  performChunking(data, chunks, chunkLatex, [chunkDivs, chunkGraphicJSX]);
  return chunks;
}


/**
 * Process a single locale, with `en-GB` fallback for missing files.
 */
function processLocale(locale) {
  // Get the section map. This will try to load .jsx code, which will fail,
  // but the above shim makes a failure simply return an empty object instead.
  // This is good: we only care about the keys, not the content.
  var index = require("./components/sections");
  var sections = Object.keys(index);
  var content = {};
  sections.forEach((cname, number) => {

    // Grab locale file, or defaultLocale file if the chosen locale has
    // has no translated content (yet)...
    var localeCode = locale;
    var loc = `./components/sections/${cname}/content.${localeCode}.md`;
    if (!fs.existsSync(loc)) {
      localeCode = defaultLocale;
      loc = `./components/sections/${cname}/content.${localeCode}.md`;
    }

    // Read in the content.{lang}.md file
    var data, title;
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
          title = t;
          return `<SectionHeader name="${cname}" title="` + t + `"${ number ? ' number="'+number+'"': ''}/>`;
        });

        return d;
      }).join('');
    } catch (e) { data = ''; title = `Unknown title (${cname})`; }

    content[cname] = {
      locale: localeCode,
      title: title,
      getContent: "<section>" + data + "</section>"
    };
  });

  var bcode = JSON.stringify(content, false, 2);
  bcode = bcode.replace(/"<section>/g, "function(handler) { return <section>")
              .replace(/this\.(\w)/g, "handler.$1")
              .replace(/<\/section>"(,?)/g, "</section>; }$1\n")
              .replace(/\\"/g,'"')
              .replace(/\\n/g,'\n')
              .replace(/></g,'>\n<')
              .replace(/\\\\/g, '\\');

  var bundle = `var React = require('react');\nvar Graphic = require("../../components/Graphic.jsx");\nvar SectionHeader = require("../../components/SectionHeader.jsx");\n\nmodule.exports = ${bcode};\n`;

  var dir = `./locales/${locale}`;
  fs.ensureDir(dir);
  fs.writeFileSync(`${dir}/content.js`, bundle);
}

// find all locales used
var glob = require('glob');
glob("components/sections/**/content*md", (err, files) => {
  var locales = [];
  files.forEach(file => {
    let locale = file.match(/content\.([^.]+)\.md/)[1];
    if (locales.indexOf(locale) === -1) {
      locales.push(locale);
    }
  });
  locales.forEach( processLocale);
});
