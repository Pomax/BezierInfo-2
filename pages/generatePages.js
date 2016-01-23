//var unhook = require('./requirehook');
//unhook();

var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ReactRouter = require('react-router');
var RoutingContext = ReactRouter.RoutingContext;
var match = ReactRouter.match;

var RouteMap = require('./routemap');
var routes = RouteMap.routes;
var paths = RouteMap.paths;
var sections = RouteMap.sections;
var rootComponent = RouteMap.rootComponent;
var RouteSet = RouteMap.RouteSet;

var fs = require("fs-extra");
var pageWrap = require("../lib/site/pagewrap");

var title = "A Primer on Bézier Curves";
var html = ReactDOMServer.renderToStaticMarkup(React.createElement(rootComponent));
console.log("generating " + title + " main page");
fs.mkdirp('./pages/');
fs.writeFile('./pages/index.html', pageWrap(title, html), 'utf-8');

var writeHTML = function(location) {
  return function(err, _, renderProps) {
    title = sections[location].getDefaultProps().title;
    routingContext = React.createElement(RoutingContext, renderProps);
    html = ReactDOMServer.renderToString(routingContext);
    console.log(title);
    fs.mkdirp('./pages/' + location);
    fs.writeFile('./pages/' + location + '/index.html', pageWrap(title, html), 'utf-8');
  };
};


paths.forEach(function(location) {
  var opts = { routes:routes, location: location };
  match(opts, writeHTML(location));
});
