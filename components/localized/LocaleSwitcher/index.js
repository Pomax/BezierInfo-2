var React = require('react');

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "locale-switcher";

module.exports = function(props) {
  return <div className="locale-switcher">{ locale.getContent(page, this) }</div>;
};
