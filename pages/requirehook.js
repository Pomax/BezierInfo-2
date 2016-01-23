/**
 * In order to run all this code in Node.js, rather than bundling it using
 * webpack, we need to hook into Node's require, so that it runs .js and
 * .jsx files through our preprocessors, as well as Babel.
 *
 * We use Pirates for that O_O!
 */

var pirates = require("pirates");
var babel = require("babel-core");

var loaders = {
  latex: require('../lib/latex-loader'),
  pre: require('../lib/pre-loader'),
  p: require('../lib/p-loader'),
  babel: function(source) {
    return babel.transform(source, {
      presets: ['es2015', 'react']
    }).code;
  }
};

function convertJS(source, filename) {
  // bug? https://github.com/ariporad/pirates/issues/15
  if (!filename.match(/.js(x)$/)) return source;

  source = loaders.p(source);
  source = loaders.pre(source);
  source = loaders.latex(source);
  source = loaders.babel(source);
  return source;
}

/*
function convertLESS(source, filename) {
  // bug? https://github.com/ariporad/pirates/issues/15
  if (!filename.match(/.less$/)) return source;
  source = loaders.p(source);
  source = loaders.pre(source);
  source = loaders.latex(source);
  source = loaders.babel(source);
  return source;
}
*/

var revert = [
  pirates.addHook(convertJS,   { exts: ['.js'] }),
  pirates.addHook(convertJS,   { exts: ['.jsx'] }),
  pirates.addHook(convertLESS, { exts: ['.less'] })
];

module.exports = function() {
  revert.forEach(function(fn) { fn(); });
};
