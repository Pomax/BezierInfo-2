var React = require("react");
var ReactDOM = require("react-dom");
var FullArticle = require("./FullArticle.jsx");

function addPontoon() {
  var jquery = document.createElement("script");
  jquery.src = "https://localize-bezierinfo.herokuapp.com/static/js/jquery-1.11.1.min.js";
  document.head.appendChild(jquery);

  var pontoon = document.createElement("script");
  pontoon.src = "https://localize-bezierinfo.herokuapp.com/pontoon.js";
  document.head.appendChild(pontoon);
}

ReactDOM.render(<FullArticle/>, document.getElementById("article"), addPontoon);
