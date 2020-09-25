import convert from "./util/convert.js";

import latexToSVG from "./processors/latex/latex-to-svg.js";
import processGraphicsElement from "./processors/graphics-element/process-graphics-element.js";
import markupCodeBlock from "./processors/code/markup-code-block.js";

import nunjucks from "nunjucks";
nunjucks.configure(".", { autoescape: false });

/**
 * The code currently has processors for three types of chunks.
 */
const Processors = [
  // Classic LaTeX, but only using the modern block syntax.
  // Ancient $$ is not acceptable.
  class LaTeXProcessor {
    static marks = { start: `\\[`, end: `\\]` };
    static async process(chunk, chunkPos, pathdata, localeStrings) {
      return await latexToSVG(chunk, pathdata, localeStrings, chunkPos);
    }
  },
  // Rewrite custom element stubs to their full form
  class GraphicsElementProcessor {
    static marks = { start: `<graphics-element`, end: `</graphics-element>` };
    static async process(chunk, _chunkPos, pathdata, localeStrings) {
      return await processGraphicsElement(chunk, pathdata, localeStrings);
    }
  },
  // Rewrite code to that classic code-with-numbered-lines look.
  class CodeBlockProcessor {
    static marks = { start: "```\n", end: "\n```" };
    static async process(chunk, _chunkPos, _pathdata, _localeStrings) {
      return markupCodeBlock(chunk);
    }
  },
];

// helper function for templating ids
const templatingId = (function () {
  let id = 1;
  const fn = () => id++;
  fn.reset = () => (id = 1);
  return fn;
})();

/**
 * Generic "chunker" that extract chunks of data based on start/end marks,
 * and returns the data with templating placeholders for each extracted
 * chunk, tracking the extraction via the "chunks" object.
 */
function replaceMarks(markdown, processor, chunks) {
  const marks = processor.marks;

  let data = markdown,
    pos = data.indexOf(marks.start),
    blockNum = 1;

  // extraction is implemented using forward-pass replacement
  while (pos !== -1) {
    const endpos = data.indexOf(marks.end, pos + marks.start.length) + marks.end.length;
    const chunk = data.slice(pos, endpos);
    const key = `content${templatingId()}`;
    const num = blockNum++;
    chunks.push({
      key,
      process: async (pathdata, localeStrings) => processor.process(chunk, num, pathdata, localeStrings),
    });
    const replacement = `{{ ${key} }}`;
    data = data.replace(chunk, replacement);
    pos = data.indexOf(marks.start, pos + replacement.length);
  }

  return data;
}

/**
 * Convert a markdown document to HTML format, with special treatment of
 *  - LaTeX blocks
 *  - <graphisc-element> elements
 *  - triple-backtick code blocks
 */
async function convertMarkDown(markdown, pathdata, localeStrings) {
  const chunks = [];

  templatingId.reset();

  // Extract all chunk types - this is a multi-pass approach mostly
  // because the code required to do this in a single pass requires
  // way more code than is reasonable to write right now.
  Processors.forEach((p) => (markdown = replaceMarks(markdown, p, chunks)));

  // Once chunked, process all chunks in parallel, as all blocks
  // are fully independent chunks of content.
  const context = {};

  await Promise.all(
    chunks.map(function (chunk) {
      return new Promise(async (resolve, _reject) => {
        context[chunk.key] = await chunk.process(pathdata, localeStrings);
        resolve(context[chunk.key]);
      });
    })
  );

  // Then "render" the markdown by replacing all chunk placeholders with
  // their actual conversation result.
  return nunjucks.renderString(convert(markdown), context);
}

export { convertMarkDown };
