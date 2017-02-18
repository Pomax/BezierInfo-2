var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "pointvectors";

var PointVectors = React.createClass({
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
    api.drawSkeleton(curve);

    var i,t,p,tg,n,m,nd=20;
    for(i=0; i<=10; i++) {
      t = i/10.0;
      p = curve.get(t);
      tg = curve.derivative(t);
      m = Math.sqrt(tg.x*tg.x + tg.y*tg.y);
      tg = {x:tg.x/m, y:tg.y/m};
      n = curve.normal(t);
      api.setColor("blue");
      api.drawLine(p, {x:p.x+tg.x*nd, y:p.y+tg.y*nd});
      api.setColor("red");
      api.drawLine(p, {x:p.x+n.x*nd, y:p.y+n.y*nd});
      api.setColor("black");
      api.drawCircle(p,3);
    }

  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = PointVectors;
