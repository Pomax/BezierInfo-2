import fs from "fs-extra";
import path from "path";
import { createHash } from "crypto";
import { generateGraphicsModule } from "./generate-graphics-module.js";
import paths from "../../../../project-paths.js";
import getModulePath from "../../../../get-module-path.js";
import toPosix from "../../../../to-posix.js";

const thisModuleDir = getModulePath(import.meta.url);

/**
 * ...docs go here...
 *
 * @param {String} chapter The chapter id (e.g. `whatis` rather than the section's title)
 * @param {LocaleStrings} localeStrings The locale object
 * @param {String} src Has the format "./chapters/chapterid/file.js"
 * @param {Number} w The sketch width in pixels
 * @param {Number} h The sketch height in pixels
 */
async function generateFallbackImage(
  pathdata,
  localeStrings,
  src,
  w,
  h,
  dataset = {} // Abstracted from the <graphics-element .... data-name="value"> markup
) {
  const locale = localeStrings.getCurrentLocale();
  const { imagepath } = pathdata;

  // Get the sketch code
  const sourcePath = path.join(paths.chapters, `..`, src);

  try {
    var code = fs.readFileSync(sourcePath).toString(`utf8`);
  } catch (e) {
    console.log(`could not read file "${sourcePath}".`);
    throw e;
  }

  // Hash this code + dataset into a print that we can use to determine whether
  // or not we should generate an image or whether we already did that previously.
  const hash = createHash(`md5`).update(code).update(JSON.stringify(dataset)).digest(`hex`);

  fs.ensureDirSync(imagepath);
  const filePath = path.join(imagepath, `${hash}.png`);
  const imgUrl = `./${toPosix(path.relative(paths.public, filePath))}`;

  if (locale !== localeStrings.getDefaultLocale()) return imgUrl;

  if (fs.existsSync(filePath)) return imgUrl;

  // If we get here, we need to actually run the magic: convert
  // this to a valid JS module code and write this to a temporary
  // file so we can import it.
  const nodeCode = generateGraphicsModule(pathdata, code, w, h, dataset);
  const codeFile = `./nodecode.${Date.now()}.${Math.random()}.js`;
  const modulePath = path.join(paths.temp, codeFile);
  fs.writeFileSync(modulePath, nodeCode, `utf8`);

  // Then we import our entirely valid JS module, which will run
  // the sketch code and export a canvas instance that we can
  // turn into an actual image file.
  const module = path.relative(thisModuleDir, modulePath).split(path.sep).join(path.posix.sep);

  try {
    const { canvas } = await import(module);
    fs.unlinkSync(modulePath);

    // The canvas runs setup() + draw() as part of the module load, so
    // all we have to do now is get the image data and writ it to file.
    const dataURI = canvas.toDataURL();
    const start = dataURI.indexOf(`base64,`) + 7;
    const imageData = Buffer.from(dataURI.substring(start), `base64`);

    fs.writeFileSync(filePath, imageData);
    console.log(`Generated fallback image for ${src} (${locale})`);
  } catch (e) {
    console.error(`error in ${src}`);
    console.error(e);
  }

  return imgUrl;
}

export default generateFallbackImage;
