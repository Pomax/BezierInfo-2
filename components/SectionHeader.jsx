var React = require("react");

var SectionHeader = React.createClass({
  render: function() {
    return (
      <h2 id={this.props.name} data-num={this.props.number}>
        <a href={'#' + this.props.name}>{this.props.title}</a>
      </h2>
    );
  },
  componentDidMount() {
    var h = window.location.hash;
    if (h) {
      window.location = window.location.hash;
    }
  }
});

module.exports = SectionHeader;
