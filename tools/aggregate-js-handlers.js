/**********************************************************************
 *
 *  This script is a JS handling aggregator that grabs all handler.js
 *  files defined for any section, and turns it into a giant master
 *  handler file for later use, keyed on section dir names.
 *
 **********************************************************************/

var fs = require("fs-extra");
var glob = require('glob');
var path = require("path");
var jsxshim = require("./lib/jsx-shim");

const BASEDIR = path.join(__dirname, "..");

var index = require(path.join(BASEDIR, "components/sections"));
var handlers = [];
Object.keys(index).forEach( section => {
  var handlerFile = path.join(BASEDIR, `components/sections/${section}/handler.js`);
  if (fs.existsSync(handlerFile)) {
    let content = fs.readFileSync(handlerFile).toString();
    content = content.replace("module.exports = ","return ");
    content = `(function() { ${content} }())`;
    let def = `  ${section}: {
    handler: ${content}`;
    if (content.indexOf('keyHandlingOptions') > -1) { def += `,\n    withKeys: true`; }
    def += `\n  }`;
    handlers.push(def);
  }
});

var masterFile = `module.exports = {\n${ handlers.join(',\n') }\n};\n`;
fs.writeFileSync(path.join(BASEDIR, "lib/site/handlers.js"), masterFile);
