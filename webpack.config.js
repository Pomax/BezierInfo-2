var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const defaultLocale = "en-GB";
var locale = process.env.LOCALE || defaultLocale;

console.log("Using locale: "+locale);

// Bundle entry point
var entry = ['./components/App.jsx'];

// Bundle output
var output = {
  path: path.join(__dirname,locale),
  filename: 'article.js',
  library: 'BezierArticle',
  libraryTarget: 'umd'
};

// Necessary webpack loaders for converting our content:
var webpackLoaders = [
  {loader: 'babel-loader'},
  {loader: 'eslint-loader'},
  {loader: __dirname + '/lib/latex-loader'},
  {loader: __dirname + '/lib/pre-loader'},
  {loader: __dirname + '/lib/p-loader'},
  {loader: __dirname + '/lib/textarea-loader'}
];

var resolve = {
  alias: {
    LocalizedContent: path.resolve(__dirname, 'locales/en-GB/content.js'),
    react: "preact-compat",
    "react-dom": "preact-compat"
  }
};

// switch the locales
if (locale !== defaultLocale) {
  resolve = {
    alias: {
      LocalizedContent: path.resolve(__dirname, 'locales/' + locale + '/content.js')
    }
  };
  output.filename = 'article.js';
  console.log("using " + resolve.alias.LocalizedContent + " for output " + output.filename);
}

// And the final config that webpack will read in.
module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry:  entry,
  output: output,
  resolve: resolve,
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' }
        ]
      },
      {
        test: /.jsx?$/,
        include: [
          /components/,
          /lib.site/,
          /locales/
        ],
        use: webpackLoaders
      }
    ]
  }
};
