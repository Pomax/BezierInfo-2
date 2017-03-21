var handler = require("./handler.js");
var generateBase = require("../../generate-base");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");
module.exports = keyHandling(generateBase("flattening", handler));
