var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale("en-GB");
var page = "preface";

var Preface = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  render: function() {
    return (
      <section>{ locale.getContent(page, this) }</section>
    );
  }
});

module.exports = Preface;
