import path from "path";

/**
 * ...docs go here...
 */
function preprocessGraphicsElement(chapter, localeStrings, markdown) {
  const translate = localeStrings.translate;

  let pos = -1,
    data = markdown,
    startmark = `<graphics-element`,
    endmark = `</graphics-element>`;

  do {
    pos = data.indexOf(startmark, pos);
    if (pos !== -1) {
      // extract a <graphics-element...>...</graphics-element> segment
      let endpos = data.indexOf(endmark, pos) + endmark.length;
      let slice = data.slice(pos, endpos);
      let updated = slice;

      // if there are no width/height attributes, inject them

      // FIXME:   This will not work if there is UI html that
      // TODO:    uses width/height attributes, of course!

      if (updated.indexOf(`width=`) === -1)
        updated = updated.replace(
          /title="([^"]+)"\s*/,
          `title="$1" width="275" `
        );

      if (updated.indexOf(`height=`) === -1)
        updated = updated.replace(
          /width="(\d+)\s*"/,
          `width="$1" height="275" `
        );

      // Then add in the fallback code
      updated = updated.replace(
        /width="([^"]+)"\s+height="([^"]+)"\s+src="([^"]+)"\s*>/,
        (_, width, height, src) => {
          if (src.indexOf(`../`) === 0) src = `./chapters/${chapter}/${src}`;
          else {
            if (src[0] !== `.`) src = `./${src}`;
            src = src.replace(`./`, `./chapters/${chapter}/`);
          }

          // TODO: generate a fallback image here, since this is where we need
          //       to know what the code-hash is so we can properly link images.

          let imageHash = generateFallbackImage(src);
          let img = path.join(
            path.dirname(src.replace(`./`, `./images/`)),
            `${imageHash}.png`
          );

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

function generateFallbackImage(src) {
  return path.basename(src).replace(`.js`, ``);
}

export default preprocessGraphicsElement;
