var webpack = require('webpack');

// Hot Reload server when we're in dev mode,
// otherwise build it the normal way.
var entry = ['./components/App.jsx'];
if(!process.argv.indexOf("--prod")) {
  entry.push('webpack/hot/dev-server');
}

module.exports = {
  entry:  entry,
  output: {
    path: __dirname,
    filename: 'article.js'
  },
  module: {
    loaders: [
      { test: /\.txt$/, loader: "raw" },
      { test: /\.(png|gif)$/, loader: "file?name=images/packed/[hash].[ext]" },
      { test: /\.less$/, loader: "style!css!less" },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          __dirname + '/lib/latex-loader',
          __dirname + '/lib/pre-loader'
        ]
      }
    ]
  },
};