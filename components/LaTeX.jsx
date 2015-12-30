var React = require("react");
var ReactDOM = require("react-dom");
var noop = require("../lib/noop");

var MathJax = (typeof window !== "undefined" ? window.MathJax : false);

// fallback will simply do nothing when typesetting.
if(!MathJax){MathJax={Hub:{Queue:noop}};}

var LaTeX = React.createClass({
  getInitialState() {
    var data = this.props.children;
    if (!data.forEach) data = [data];
    return { latex: data.join('') };
  },

  componentDidMount: function() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.refs.latex, false]);
    MathJax.Hub.Queue(this.bindHTML);
  },

  bindHTML: function() {
    this.setState({ html: this.refs.latex.innerHTML });
  },

  render: function() {
    var content = this.state.html ? this.state.html : this.state.latex;
    return <p ref="latex" dangerouslySetInnerHTML={{__html: content }} />;
  }
});

module.exports = LaTeX;
