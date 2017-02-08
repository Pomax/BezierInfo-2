var React = require("react");
var ReactDOM = require("react-dom");
var FullArticle = require("./FullArticle.jsx");
var localized = (
  <div>
    <FullArticle/>
    <script src="https://localize-bezierinfo.herokuapp.com/static/js/jquery-1.11.1.min.js"/>
    <script src="https://localize-bezierinfo.herokuapp.com/pontoon.js"/>
  </div>
);
ReactDOM.render(localized, document.getElementById("article"));
