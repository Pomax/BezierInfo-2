var React = require("react");
var hashResolver = require("../lib/hash-resolver.js");

var SectionHeader = React.createClass({
  statics: {
    locale: ""
  },

  render: function() {
    var locale = SectionHeader.locale;
    if (
      typeof window !== "undefined" &&
      window.location.toString().indexOf(locale) === -1
    ) {
      locale = "";
    }
    var fragmentid = `${locale ? "./" + locale + "/" : "."}#${this.props.name}`;
    return (
      <h2 id={this.props.name} data-num={this.props.number}>
        <a href={fragmentid}>{this.props.title}</a>
      </h2>
    );
  },
  componentDidMount() {
    hashResolver();
  }
});

module.exports = SectionHeader;
