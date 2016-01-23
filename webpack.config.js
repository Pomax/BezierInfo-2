var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// see http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var externals = false;

// Bundle entry point
var entry = ['./components/App.jsx'];

// Bundle target
var target = "web";

// Bundle output
var output = {
  path: __dirname,
  filename: 'article.js'
};

// Necessary webpack loaders for converting our content:
var webpackLoaders = [
  'babel-loader',
  'eslint',
  __dirname + '/lib/latex-loader',
  __dirname + '/lib/pre-loader',
  __dirname + '/lib/p-loader'
];

var plugins = [];

// Dev mode: make certain concessions to speed up dev work.
if(process.argv.indexOf("--prod") === -1 && process.argv.indexOf("--lint")) {
  // use the webpack hot Reload server:
  entry.push('webpack/hot/dev-server');
  // allow code in textareas when in dev mode:
  webpackLoaders.push(__dirname + '/lib/textarea-loader');
}

// Prod mode: make sure to minify the bundle
else if(process.argv.indexOf("--prod") > -1) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// However, do we want one full page, or single pages with react-router?
if(process.argv.indexOf("--singles") !== -1 ) {
  entry = ['./lib/site/routemap.js'];

  target = "node";

  output = {
    path:  output.path + '/pages',
    filename: "routemap.js",
    library: "routemap",
    libraryTarget: "commonjs2"
  };

  console.log("\n","marking node_modules as external","\n");
  externals = {};
  fs.readdirSync('node_modules')
    .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
    .forEach(function(mod) { externals[mod] = 'commonjs ' + mod; });
  plugins.pop();
}

// And the final config that webpack will read in.
module.exports = {
  entry:  entry,
  target: target,
  output: output,
  module: {
    loaders: [
      {
        test: /\.(png|gif)$/,
        loader: "file?name=images/packed/[hash].[ext]"
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /.jsx?$/,
        include: [
          /components/,
          /lib.site/
        ],
        loaders: webpackLoaders
      }
    ]
  },
  plugins: plugins,
  eslint: {
    configFile: __dirname + '/.eslintrc'
  },
  externals: externals
};
