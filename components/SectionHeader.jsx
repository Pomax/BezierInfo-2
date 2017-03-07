var React = require("react");

var SectionHeader = React.createClass({
  statics: {
    locale: ''
  },

  render: function() {
    var locale = SectionHeader.locale;
    if (typeof window !== undefined && window.location.toString().indexOf(locale) === -1) {
      locale = '';
    }
    var fragmentid = `${locale ? './' + locale + '/': '.'}#${this.props.name}`;
    return (
      <h2 id={this.props.name} data-num={this.props.number}>
        <a href={fragmentid}>{this.props.title}</a>
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
