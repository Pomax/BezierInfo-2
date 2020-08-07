/**
 * ...docs go here...
 */
export default function extractLaTeX(markdown) {
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
