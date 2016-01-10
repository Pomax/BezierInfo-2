var React = require("react");

var SectionHeader = React.createClass({
  render: function() {
    return <h2 data-num={this.props.number}><a href={'#' + this.props.name}>{this.props.title}</a></h2>;
  }
});

module.exports = SectionHeader;
