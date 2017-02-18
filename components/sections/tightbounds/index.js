var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "tightbounds";

var TightBounds = React.createClass({
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
            y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a),
            a: a
          };
        };
    return points.map(d);
  },

  // FIXME: I'm not satisfied with needing to turn a bbox[] into a point[],
  //        this needs a bezier.js solution, really, with a  call curve.tightbbox()
  transpose: function(points, angle, offset) {
    var tx = offset.x,
        ty = offset.y,
        cos = Math.cos,
        sin = Math.sin,
        v = [points.x.min, points.y.min, points.x.max, points.y.max];
    return [
      {x: v[0], y: v[1] },
      {x: v[2], y: v[1] },
      {x: v[2], y: v[3] },
      {x: v[0], y: v[3] }
    ].map(p => {
      var x=p.x, y=p.y;
      return {
        x: x*cos(angle) - y*sin(angle) + tx,
        y: x*sin(angle) + y*cos(angle) + ty
      };
    });
  },

  draw: function(api, curve) {
    api.reset();

    var pts = curve.points;
    var line = {p1: pts[0], p2: pts[pts.length-1]};
    var apts = this.align(pts, line);
    var angle = -apts[0].a;
    var aligned = new api.Bezier(apts);
    var bbox = aligned.bbox();
    var tpts = this.transpose(bbox, angle, pts[0]);

    api.setColor("#00FF00");
    api.drawLine(tpts[0], tpts[1]);
    api.drawLine(tpts[1], tpts[2]);
    api.drawLine(tpts[2], tpts[3]);
    api.drawLine(tpts[3], tpts[0]);

    api.setColor("black");
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = TightBounds;
