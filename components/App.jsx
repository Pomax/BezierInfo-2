var React = require("react");
var ReactDOM = require("react-dom");
var FullArticle = require("./FullArticle.jsx");

// in the browser, do:
if (typeof document !== "undefined") {
  ReactDOM.render(<FullArticle/>, document.getElementById("article"));
}

// in not-the browser, do:
module.exports = { FullArticle };
