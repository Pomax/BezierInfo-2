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
async function generateFallbackImage(localeStrings, src, width, height) {
  const locale = localeStrings.getCurrentLocale();

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

  if (locale !== localeStrings.getDefaultLocale()) return hash;

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

  //    fs.unlinkSync(tempFile);

  // The canvas runs setup() + draw() as part of the module load, so
  // all we have to do now is get the image data and writ it to file.
  const dataURI = canvas.toDataURL();
  const start = dataURI.indexOf(`base64,`) + 7;
  const imageData = Buffer.from(dataURI.substring(start), `base64`);

  fs.ensureDirSync(path.dirname(filename));
  fs.writeFileSync(filename, imageData);
  console.log(`Generated fallback image for ${src} (${locale})`);

  return hash;
}

export default generateFallbackImage;
