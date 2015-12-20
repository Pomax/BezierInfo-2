var React = require("react");
var ReactDOM = require("react-dom");

var SectionHeader = React.createClass({
  render: function() {
    return <h2 data-num={this.props.number}>{this.props.children}</h2>;
  }
});

module.exports = SectionHeader;
