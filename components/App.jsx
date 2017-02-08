var React = require("react");
var ReactDOM = require("react-dom");
var FullArticle = require("./FullArticle.jsx");

function addPontoon() {
  // It is entirely unclear when pontoon.js should be loading.
  // According to the people in #pontoon on mozilla.org, it should
  // be loaded after DOM content has finished loading, but running
  // this injection without a timeout clearly isn't late enough still.
  setTimeout( () => {
    var jquery = document.createElement("script");
    jquery.src = "https://localize-bezierinfo.herokuapp.com/static/js/jquery-1.11.1.min.js";
    document.head.appendChild(jquery);

    var pontoon = document.createElement("script");
    pontoon.src = "https://localize-bezierinfo.herokuapp.com/pontoon.js";
    document.head.appendChild(pontoon);
  }, 5000);
}

ReactDOM.render(<FullArticle/>, document.getElementById("article"), addPontoon);
