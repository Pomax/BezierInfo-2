/**********************************************************************
 *
 *  This script is responsible for building the index.js file for each
 *  section based on whether or not it has a handler, and whether or not
 *  that handler requires any keyhandling for its interaction.
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

  var hasHandler = false;
  var withKeys = false;

  if (fs.existsSync(handlerFile)) {
  	hasHandler = true;
    let content = fs.readFileSync(handlerFile).toString();
    withKeys = (content.indexOf('keyHandlingOptions') > -1);
  }

  var indexCode = [
	hasHandler ? `var handler = require("./handler.js");` : '',
  	`var generateBase = require("../../generate-base");`,
	withKeys ? `var keyHandling = require("../../decorators/keyhandling-decorator.jsx");` : '',
  	hasHandler ?
  		withKeys ?
  			`module.exports = keyHandling(generateBase("${section}", handler));`
  			:
  			`module.exports = generateBase("${section}", handler);`
  		:
  		`module.exports = generateBase("${section}");`
  ].filter(l => !!l).join('\n');

  fs.writeFileSync(path.join(BASEDIR,`components/sections/${section}/index.js`), indexCode);
});
