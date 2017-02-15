var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale("en-GB");
var page = "extended";

var Explanation = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setupQuadratic: function(api) {
    var curve = new api.Bezier(70, 155, 20, 110, 100,75);
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = new api.Bezier(60,105, 75,30, 215,115, 140,160);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("lightgrey");

    var t, step=0.05, min=-10;
    var pt = curve.get(min - step), pn;
    for (t=min; t<=step; t+=step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }

    pt = curve.get(1);
    var max = 10;
    for (t=1+step; t<=max; t+=step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }
  },

  render: function() {
    return (
      <section>{ locale.getContent(page, this) }</section>
    );
  }
});

module.exports = Explanation;
