var fs = require("fs-extra");
var React = require("react");
var Server = require("react-dom/server");

var FullArticle = require("./article").FullArticle;
var article = React.createElement(FullArticle, {});
//var html = Server.renderToString(article);
var html = Server.renderToStaticMarkup(article);

fs.writeFileSync("fullhtml.html", html);
