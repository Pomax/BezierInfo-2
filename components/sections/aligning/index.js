var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "aligning";

var Aligning = React.createClass({
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

  align: function(points, line) {
    var tx = line.p1.x,
        ty = line.p1.y,
        a = -Math.atan2(line.p2.y-ty, line.p2.x-tx),
        cos = Math.cos,
        sin = Math.sin,
        d = function(v) {
          return {
            x: (v.x-tx)*cos(a) - (v.y-ty)*sin(a),
            y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a)
          };
        };
    return points.map(d);
  },

  draw: function(api, curve) {
    api.setPanelCount(2);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var pts = curve.points;
    var line = {p1: pts[0], p2: pts[pts.length-1]};
    var apts = this.align(pts, line);
    var aligned = new api.Bezier(apts);
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();

    var offset = {x:w, y:0};
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    offset.x += w/4;
    offset.y += h/2;
    api.setColor("grey");
    api.drawLine({x:0,y:-h/2}, {x:0,y:h/2}, offset);
    api.drawLine({x:-w/4,y:0}, {x:w,y:0}, offset);
    api.setFill("grey");

    api.setColor("black");
    api.drawSkeleton(aligned, offset);
    api.drawCurve(aligned, offset);
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = Aligning;
