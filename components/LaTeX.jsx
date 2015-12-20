var React = require("react");
var ReactDOM = require("react-dom");

var MathJax = (typeof window !== "undefined" ? window.MathJax : false);

var noop = function() {};

// fallback will simply do nothing when typesetting.
if(!MathJax){MathJax={Hub:{Queue:noop}};}

var LaTeX = React.createClass({
  mixins: [
    require("react-component-visibility")
  ],

  componentDidMount: function() {
    this.setComponentVisbilityRateLimit(200);
  },

  componentVisibilityChanged: function() {
    var visible = this.state.visible;
    if (visible) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.refs.latex, false]);
      this.componentVisibilityChanged = noop;
    }
  },

  render: function() {
    var data = this.props.children;
    if (!data.forEach) data = [data];
    return <p ref="latex" dangerouslySetInnerHTML={{__html: data.join('') }} />;
  }
});

module.exports = LaTeX;
