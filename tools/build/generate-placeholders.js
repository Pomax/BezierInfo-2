const fs = require("fs-extra");
const path = require("path");
const canvas = require("canvas");
const rewriteGraphicsElement = require("./rewrite-graphics-element");
const localeStrings = require("../../locale-strings.json");
const defaultLocale = localeStrings.defaultLocale;

module.exports = async function generatePlaceHolders(locale, markdown) {
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
    sourcePaths = Object.values(elements).map(v => v.match(/src="([^"]+)"/)[1]);

    sourcePaths.forEach((sourcePath,i) => {
        try {
            sourcePath = path.join(__dirname, "..", "..", sourcePath);
            let code = fs.readFileSync(sourcePath).toString(`utf8`);
            let width = elements[keys[i]].match(`width="([^"]+)"`)[1];
            let height = elements[keys[i]].match(`height="([^"]+)"`)[1];

            // TODO: figure out how to convert this code to code that will
            //       actually run in Node, with node's `canvas` module backing
            //       rather than the HTMLCanvasElement object, and in a way
            //       that uses `require()` or `import`, but not both.
            
            let nodeCode = rewriteGraphicsElement(code, width, height);

            var m = new module.constructor();
            m.paths = module.paths;
            m._compile(nodeCode, sourcePath);

            const sketch = m.exports;
            const dataURI = sketch.toDataURL();
            const start = dataURI.indexOf(`base64,`) + 7;
            const imageData = Buffer.from(dataURI.substring(start), `base64`);
            const filename = sourcePath.replace(`.js`, `.png`);

            console.log(`Writing placeholder to ${filename}`);
            fs.writeFileSync(filename, imageData);
        } catch (e) {
            console.error(e);
        }
    });
};
