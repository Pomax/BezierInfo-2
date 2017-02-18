var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "introduction";

var Introduction = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  drawQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  drawCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  render: function() {
    return (
      <section>{ locale.getContent(page, this) }</section>
    );
  }
});

module.exports = Introduction;
