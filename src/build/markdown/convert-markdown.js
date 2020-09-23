import convert from "./convert.js";
import latexToSVG from "../latex/latex-to-svg.js";
import preprocessGraphicsElement from "./preprocess-graphics-element.js";
import extractLaTeX from "./extract-latex.js";
import nunjucks from "nunjucks";
nunjucks.configure(".", { autoescape: false });

/**
 * ...docs go here...
 */
async function convertMarkDown(pathdata, localeStrings, markdown) {
  try {
    markdown = await preprocessGraphicsElement(pathdata, localeStrings, markdown);
  } catch (e) {
    console.error(`Unrecoverable error in ${pathdata.file}.`);
    console.error(e);
    process.exit(1);
  }

  // This yields the original markdown with all LaTeX blocked replaced with
  // uniquely named templating variables, referencing keys in the `latex` array.
  const { data, latex } = extractLaTeX(markdown);

  await Promise.all(
    Object.keys(latex).map(async (key, pos) => {
      latex[key] = await latexToSVG(latex[key], pathdata, localeStrings, pos + 1);
    })
  );

  let converted = convert(data);
  return nunjucks.renderString(converted, latex);
}

export { convertMarkDown };
