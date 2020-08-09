import marked from "marked";
import latexToSVG from "./latex/latex-to-svg.js";
import injectGraphicsFallback from "./markdown/inject-fallback.js";
import extractLaTeX from "./markdown/extract-latex.js";
import nunjucks from "nunjucks";
nunjucks.configure(".", { autoescape: false });

/**
 * ...docs go here...
 */
export default async function convertMarkDown(
  chapter,
  localeStrings,
  markdown
) {
  markdown = injectGraphicsFallback(chapter, localeStrings, markdown);

  const { data, latex } = extractLaTeX(markdown);

  await Promise.all(
    Object.keys(latex).map(async (key, pos) => {
      const svg = await latexToSVG(latex[key], chapter, localeStrings, pos + 1);
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
    // templating introduces some funk
    .replace(/<p>{{/g, `{{`)
    .replace(/}}<\/p>/g, `}}`)
    // also <sup> and <sub> in code does fun things
    .replace(/&lt;sub&gt;/g, `<sub>`)
    .replace(/&lt;\/sub&gt;/g, `</sub>`)
    .replace(/&lt;sup&gt;/g, `<sup>`)
    .replace(/&lt;\/sup&gt;/g, `</sup>`);

  return nunjucks.renderString(converted, latex);
}
