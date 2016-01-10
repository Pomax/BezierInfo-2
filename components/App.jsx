var React = require("react");
var ReactDOM = require("react-dom");
var Article = require("./Article.jsx");

require("../stylesheets/style.less");

ReactDOM.render(<Article/>, document.getElementById("article"), function() {
  // trigger a #hash navigation
  if (window.location.hash) {
    var hash = window.location.hash;
    window.location.hash = hash;
  }
});
