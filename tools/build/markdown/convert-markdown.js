import marked from "marked";
import latexToSVG from "../latex/latex-to-svg.js";
import preprocessGraphicsElement from "./preprocess-graphics-element.js";
import extractLaTeX from "./extract-latex.js";
import nunjucks from "nunjucks";
nunjucks.configure(".", { autoescape: false });

/**
 * ...docs go here...
 */
async function convertMarkDown(chapter, localeStrings, markdown) {
  markdown = await preprocessGraphicsElement(chapter, localeStrings, markdown);

  // This yields the original markdown with all LaTeX blocked replaced with
  // uniquely named templating variables, referencing keys in the `latex` array.
  const { data, latex } = extractLaTeX(markdown);

  await Promise.all(
    Object.keys(latex).map(
      async (key, pos) =>
        (latex[key] = await latexToSVG(
          latex[key],
          chapter,
          localeStrings,
          pos + 1
        ))
    )
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

export { convertMarkDown };
