import fs from "fs-extra";
import path from "path";
import { createHash } from "crypto";
import { generateGraphicsModule } from "./generate-graphics-module.js";

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.href.replace(`file:///`, ``));
const __root = path.join(__dirname, `..`, `..`, `..`);

/**
 * ...docs go here...
 */
async function preprocessGraphicsElement(chapter, localeStrings, markdown) {
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
      const terms = updated.match(
        /width="([^"]+)"\s+height="([^"]+)"\s+src="([^"]+)"\s*>/
      );
      const [original, width, height] = terms;

      let src = terms[3];
      if (src.indexOf(`../`) === 0) src = `./chapters/${chapter}/${src}`;
      else {
        if (src[0] !== `.`) src = `./${src}`;
        src = src.replace(`./`, `./chapters/${chapter}/`);
      }

      let imageHash = await generateFallbackImage(src, width, height); // ← this is super fancy functionality.
      let imgUrl = path.join(
        path.dirname(src.replace(`./`, `./images/`)),
        `${imageHash}.png`
      );

      const replacement = `width="${width}" height="${height}" src="${src}">
        <fallback-image>
          <img width="${width}px" height="${height}px" src="${imgUrl}" loading="lazy">
          ${translate`disabledMessage`}
        </fallback-image>`;

      updated = updated.replace(original, replacement);
      data = data.replace(slice, updated);
      pos += updated.length;
    }
  } while (pos !== -1);

  return data;
}

/**
 *
 * @param {*} src
 */
async function generateFallbackImage(src, width, height) {
  // Get the sketch code
  const sourcePath = path.join(__root, src);
  let code;
  try {
    code = fs.readFileSync(sourcePath).toString(`utf8`);
  } catch (e) {
    console.log(`could not read file "${sourcePath}".`);
    throw e;
  }

  // Do we need to even generate a file here?
  const hash = createHash(`md5`).update(code).digest(`hex`);
  const destPath = path.dirname(path.join(__root, `images`, src));
  const filename = path.join(destPath, `${hash}.png`);
  if (fs.existsSync(filename)) return hash;

  // If we get here, we need to actually run the magic: convert
  // this to a valid JS module code and write this to a temporary
  // file so we can import it.
  const nodeCode = generateGraphicsModule(code, width, height);
  const fileName = `./nodecode.${Date.now()}.${Math.random()}.js`;
  const tempFile = path.join(__dirname, fileName);
  fs.writeFileSync(tempFile, nodeCode, `utf8`);

  // Then we import our entirely valid JS module, which will run
  // the sketch code and export a canvas instance that we can
  // turn into an actual image file.
  const { canvas } = await import(fileName);

  fs.unlinkSync(tempFile);

  // The canvas runs setup() + draw() as part of the module load, so
  // all we have to do now is get the image data and writ it to file.
  const dataURI = canvas.toDataURL();
  const start = dataURI.indexOf(`base64,`) + 7;
  const imageData = Buffer.from(dataURI.substring(start), `base64`);

  fs.ensureDirSync(path.dirname(destPath));
  fs.writeFileSync(filename, imageData);
  console.log(`Generated fallback image for ${src}`);

  return hash;
}

export default preprocessGraphicsElement;
