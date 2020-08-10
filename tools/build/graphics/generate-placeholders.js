import fs from "fs-extra";
import path from "path";
import { generateGraphicsModule } from "./generate-graphics-module.js";

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.href.replace(`file:///`, ``));
const __root = path.join(__dirname, `..`, `..`, `..`);

/**
 * ...docs go here...
 */
async function generatePlaceHolders(localeStrings, markdown) {
  const locale = localeStrings.getCurrentLocale();

  if (locale !== localeStrings.getDefaultLocale()) return;

  let graphic = 0,
    pos = -1,
    data = markdown,
    elements = {},
    startmark = `<graphics-element`,
    endmark = `</graphics-element>`;

  do {
    pos = data.indexOf(startmark);
    if (pos !== -1) {
      let endpos = data.indexOf(endmark, pos) + endmark.length;
      let key = `graphic${graphic++}`;
      elements[key] = data.substring(pos, endpos - endmark.length);
      data = `${data.slice(0, pos)}{{ ${key} }}${data.slice(endpos)}`;
    }
  } while (pos !== -1);

  const keys = Object.keys(elements);
  const sourcePaths = keys.map(
    (key) => elements[key].match(/src="([^"]+)"/)[1]
  );

  await Promise.all(
    sourcePaths.map(async (srcPath, i) => {
      try {
        // Get the sketch code
        const sourcePath = path.join(__root, srcPath);
        let code;
        try {
          code = fs.readFileSync(sourcePath).toString(`utf8`);
        } catch (e) {
          console.log(srcPath, sourcePath);
          throw e;
        }
        const width = elements[keys[i]].match(`width="([^"]+)"`)[1];
        const height = elements[keys[i]].match(`height="([^"]+)"`)[1];

        // Convert this to a valid JS module code and write this to
        // a temporary file so we can import it.
        const nodeCode = generateGraphicsModule(code, width, height);
        const fileName = `./nodecode.${Date.now()}.${Math.random()}.js`;
        const tempFile = path.join(__dirname, fileName);
        fs.writeFileSync(tempFile, nodeCode, `utf8`);

        // Import our entirely valid JS module, which will run the
        // sketch code and export a canvas instance that we can turn
        // into an actual image file.
        const { canvas } = await import(fileName);

        fs.unlinkSync(tempFile);

        const dataURI = canvas.toDataURL();
        const start = dataURI.indexOf(`base64,`) + 7;
        const imageData = Buffer.from(dataURI.substring(start), `base64`);
        const destPath = path.join(__root, `images`, srcPath);
        const filename = destPath.replace(`.js`, `.png`);

        // console.log(`Writing placeholder to ${filename}`);
        fs.ensureDirSync(path.dirname(destPath));
        fs.writeFileSync(filename, imageData);
      } catch (e) {
        console.error(e);
      }
    })
  );
}

export { generatePlaceHolders };
