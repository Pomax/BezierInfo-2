import fs from "fs-extra";
import path from "path";
import rewriteGraphicsElement from "./rewrite-graphics-element.js";
import localeStrings from "../../locale-strings.js";

const defaultLocale = localeStrings.defaultLocale;

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.href.replace(`file:///`,``));

export default async function generatePlaceHolders(locale, markdown) {
  if (locale !== defaultLocale) return;

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
  const sourcePaths = keys.map(key => elements[key].match(/src="([^"]+)"/)[1]);

  await Promise.all(
    sourcePaths.map(async(sourcePath, i) => {
      try {
        // Get the sketch code
        sourcePath = path.join(__dirname, "..", "..", sourcePath);
        let code = fs.readFileSync(sourcePath).toString(`utf8`);
        let width = elements[keys[i]].match(`width="([^"]+)"`)[1];
        let height = elements[keys[i]].match(`height="([^"]+)"`)[1];

        // Convert this to a valid JS module code and write this to
        // a temporary file so we can import it.
        let nodeCode = rewriteGraphicsElement(code, width, height);
        let fileName = `./nodecode.${Date.now()}.${Math.random()}.js`;
        let tempFile = path.join(__dirname, fileName);
        fs.writeFileSync(tempFile, nodeCode, `utf8`);

        // Import our entirely valid JS module, which will run the
        // sketch code and
        const { canvas } = await import(fileName);

        fs.unlinkSync(tempFile);

        const dataURI = canvas.toDataURL();
        const start = dataURI.indexOf(`base64,`) + 7;
        const imageData = Buffer.from(dataURI.substring(start), `base64`);
        const filename = sourcePath.replace(`.js`, `.png`);
        // console.log(`Writing placeholder to ${filename}`);
        fs.writeFileSync(filename, imageData);
      }
      catch (e) { console.error(e); }
    })
  );
}
