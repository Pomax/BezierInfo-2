const marked = require("marked");
const latexToSVG = require("./latex-to-svg");
const nunjucks = require("nunjucks");
nunjucks.configure(".", { autoescape: false });


/**
 * ...docs go here...
 */
module.exports = async function convertMarkDown(markdown) {
    // preprocess marrkdown to extract LaTeX sections
    let latexSection = 0,
      pos = -1,
      data = markdown,
      latex = {},
      startmark = `<script type="text/latex">`,
      endmark = `</script>`;

    do {
      pos = data.indexOf(startmark);
      if (pos !== -1) {
        let endpos = data.indexOf(endmark, pos) + endmark.length;
        let key = `latex${latexSection++}`;
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
