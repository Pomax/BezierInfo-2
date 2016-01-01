var React = require("react");
var ReactDOM = require("react-dom");
var noop = require("../lib/noop");

var MathJax = (typeof window !== "undefined" ? window.MathJax : false);

// fallback will simply do nothing when typesetting.
if(!MathJax){MathJax={Hub:{Queue:noop}};}

var LaTeX = React.createClass({
  render: function() {
    return <p ref="latex">{this.props.children}</p>;
  }
});

module.exports = LaTeX;
