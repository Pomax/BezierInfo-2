const glue = '<div className="note">';
var marked = require("marked");
var fs = require("fs-extra");

// bundle all content in a specific locale for use by the app
var locale = process.env.locale || "en-GB";

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
 * Split data up into "markdown" and "latex"
 */
function chunk(data) {
  var p = 0, e = 0, chunks = [];
  while (p !== -1) {
    let s = data.indexOf('\n\\[', p);
    if (s === -1) {
      chunks.push({
        latex: false,
        data: data.substring(p)
      });
      break;
    }

    chunks.push({
      latex: false,
      data: data.substring(p, s)
    });

    e = data.indexOf('\\]\n\n', s) + 4;
    chunks.push({
      latex: true,
      data: data.substring(s, e)
    });

    p = e;
  }
  return chunks;
}

// Then get the section map. This will try to load .jsx code, which will fail,
// but the above shim makes a failure simply return an empty object instead.
// This is good: we only care about the keys, not the content.
var index = require("./components/sections");
var sections = Object.keys(index);
var content = {};
sections.forEach((cname, number) => {
  var loc = `./components/sections/${cname}/content.${locale}.md`;
  var data, title;
  try {
    data = fs.readFileSync(loc).toString();

    // convert all non-latex data
    data = data.split(glue).map(content => {
      return chunk(content).map(chunk => {
        if (chunk.latex) return chunk.data;
        let d = marked(chunk.data)
        // And then some post-processing...
        d = d.replace(/<h1[^>]+>([^<]+)<\/h1>/,function(_,t) {
          title = t;
          return `<SectionHeader name="${cname}" title="` + t + `"${ number ? ' number="'+number+'"': ''}/>`;
        });
        d = d.replace('<p></div></p>', '</div>')
             // serious can we fucking not, please.
             .replace(/&#39;/g, "'")
             .replace(/&amp;/g, '&')
             .replace(/&quot;/g, '"')
        return d;
      }).join('');
    }).join(glue);

  } catch (e) {
    data = '';
    title = `Unknown title (${cname})`;
  }

  content[cname] = {
    title: title,
    getContent: "<section>" + data + "</section>"
  };
});

// Now, form a JSX resource for this locale.
var bcode = JSON.stringify(content, false, 2);
bcode = bcode.replace(/"<section>/g, "function(handler) { return <section>")
             .replace(/this\./g, "handler.")
             .replace(/<\/section>"(,?)/g, "</section>; }$1\n")
             .replace(/\\"/g,'"')
             .replace(/\\n/g,'\n')
             .replace(/></g,'>\n<')
             .replace(/\\\\/g, '\\');

var bundle = `var React = require('react');\nvar Graphic = require("../../components/Graphic.jsx");\nvar SectionHeader = require("../../components/SectionHeader.jsx");\n\nmodule.exports = ${bcode};\n`;

var dir = `./locales/${locale}`;
fs.ensureDir(dir);
fs.writeFileSync(`${dir}/content.js`, bundle);
