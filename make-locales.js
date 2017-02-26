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
 * fix the stupid nonsense inability for markdown parsers to see link
 * syntax with `)` in the links themselves.
 */
function fixMarkDownLinks(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false;
  var fixes = [];
  data.replace(/\[[^\]]+\]\(/g, function(_match, pos, _fullstring) {
    // this is the start of a link. Find the offset at which the next `)`
    // is actually the link closer.
    var offset = 0;
    var start = pos + _match.length;
    var complex = false;
    for (let d=0, i=start; i<data.length; i++) {
      if (data[i] === '(') { d++; complex = true; }
      else if (data[i] === ')') { d--; }
      if (d<0) { offset = i - start; break; }
    }
    var end = start + offset;
    // we now know the *actual* link length. Safify it.
    if (complex) { fixes.push({ start, end, data: data.substring(start,end) }); }
    // and return the matched text because we don't want to replace right now.
    return _match
  });

  // let's safify this data, if there was a complex pattern that needs fixin'
  if (fixes.length>0) {
    fixes.forEach(fix => {
      let s = fix.start,
          e = fix.end,
          newdata = fix.data.replace(/\(/g, '%28').replace(/\)/g, '%29');
      // I can't believe I still have to do this in 2017...
      data = data.substring(0,s) + newdata + data.substring(e);
    });
  }

  // alright, let "the rest" deal with this data now.
  performChunking(data, chunks, next, otherChunkers);
}

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
function chunkDivEnds(data, chunks, chunkMore) {
  var next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false;

  var splt = data.split('</div>');
  var dlen = splt.length;
  splt.forEach( function(segment, pos) {
    performChunking(segment, chunks, next, otherChunkers);
    if (pos < dlen-1) {
      chunks.push({ convert: false, type: '</div>', s:-1, e:-1, data: '</div>' });
    }
  });
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
      latexEnd = '\\]';

  while (p !== -1) {
    // Let's check a LaTeX block
    let latex = data.indexOf('\\[', p);
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
  performChunking(data, chunks, chunkLatex, [chunkDivs, chunkDivEnds, chunkGraphicJSX, fixMarkDownLinks]);
  return chunks;
}

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
 * Process a single locale, with `en-GB` fallback for missing files.
 */
function processLocale(locale) {
  // Get the section map. This will try to load .jsx code, which will fail,
  // but the above shim makes a failure simply return an empty object instead.
  // This is good: we only care about the keys, not the content.
  var index = require("./components/sections");
  var sections = Object.keys(index);
  var content = {};
  sections.forEach((key, number) => {

    // Grab locale file, or defaultLocale file if the chosen locale has
    // has no translated content (yet)...
    var localeCode = locale;
    var loc = `./components/sections/${key}/content.${localeCode}.md`;
    if (!fs.existsSync(loc)) {
      localeCode = defaultLocale;
      loc = `./components/sections/${key}/content.${localeCode}.md`;
    }

    // Read in the content.{lang}.md file
    var processed = processLocation(loc, key, number);

    content[key] = {
      locale: localeCode,
      title: processed.title,
      getContent: "<section>" + processed.data + "</section>"
    };
  });

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
  fs.ensureDirSync(dir);
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
  locales.forEach(processLocale);
});
