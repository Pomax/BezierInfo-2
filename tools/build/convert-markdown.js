import marked from "marked";
import latexToSVG from "./latex/latex-to-svg.js";
import localeStrings from "../../locale-strings.js";
import nunjucks from "nunjucks";
nunjucks.configure(".", { autoescape: false });

/**
 * ...docs go here...
 */
export default async function convertMarkDown(chapter, locale, markdown) {
  markdown = injectGraphicsFallback(locale, markdown);

  const { data, latex } = extractLaTeX(markdown);

  await Promise.all(
    Object.keys(latex).map(async (key, pos) => {
      const svg = await latexToSVG(latex[key], chapter, locale, pos + 1);
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

/**
 *
 */
function injectGraphicsFallback(locale, markdown) {
  let pos = -1,
    data = markdown,
    startmark = `<graphics-element`,
    endmark = `</graphics-element>`;

  do {
    pos = data.indexOf(startmark, pos);
    if (pos !== -1) {
      let endpos = data.indexOf(endmark, pos) + endmark.length;
      let slice = data.slice(pos, endpos);
      let updated = slice.replace(/width="([^"]+)"\s+height="([^"]+)"\s+src="([^"]+)"\s*>/, (_, width, height, src) =>
      `width="${width}" height="${height}" src="${src}">
          <fallback-image>
            <img width="${width}" height="${height}" src="${src.replace(`.js`, `.png`)}" loading="lazy">
            ${ localeStrings.disabledMessage[locale] }
          </fallback-image>`);
      data = data.replace(slice, updated);
      pos += updated.length;
    }
  } while (pos !== -1);

  return data;
}

/**
 * ...
 */
function extractLaTeX(markdown) {
  let latexSection = 0,
    pos = -1,
    data = markdown,
    latex = {},
    startmark = `\\[`,
    endmark = `\\]`;

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

  return { data, latex };
}
