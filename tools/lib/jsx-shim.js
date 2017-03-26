// shim nodejs so that it "knows" what to do with jsx files:
// namely just return empty objects.
var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function() {
  try {
    return originalRequire.apply(this, arguments);
  } catch (e) {
    return {};
  }
};
