var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "boundingbox";

var BoundingBox = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.setColor("#00FF00");
    api.drawbbox(curve.bbox());
    api.setColor("black");
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("red");
    curve.extrema().values.forEach(t => {
      api.drawCircle(curve.get(t), 3);
    });
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = BoundingBox;
