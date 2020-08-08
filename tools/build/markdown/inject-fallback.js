/**
 * ...docs go here...
 */
export default function injectGraphicsFallback(
  chapter,
  localeStrings,
  markdown
) {
  const translate = localeStrings.translate;

  let pos = -1,
    data = markdown,
    startmark = `<graphics-element`,
    endmark = `</graphics-element>`;

  do {
    pos = data.indexOf(startmark, pos);
    if (pos !== -1) {
      let endpos = data.indexOf(endmark, pos) + endmark.length;
      let slice = data.slice(pos, endpos);
      let updated = slice.replace(
        /width="([^"]+)"\s+height="([^"]+)"\s+src="([^"]+)"\s*>/,
        (_, width, height, src) => {
          src = src.replace(`./`, `./chapters/${chapter}/`);
          let img = src.replace(`./`, `./images/`).replace(`.js`, `.png`);
          return `width="${width}" height="${height}" src="${src}">
            <fallback-image>
              <img width="${width}px" height="${height}px" src="${img}" loading="lazy">
              ${translate`disabledMessage`}
            </fallback-image>`;
        }
      );
      data = data.replace(slice, updated);
      pos += updated.length;
    }
  } while (pos !== -1);

  return data;
}
