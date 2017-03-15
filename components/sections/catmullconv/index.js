var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "catmullconv";

var CatmullRomConversion = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  render: function() {
    return locale.getContent(page, this);
  }
});

module.exports = CatmullRomConversion;
