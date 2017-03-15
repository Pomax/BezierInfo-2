var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "intersections";

var min = Math.min, max = Math.max;

var Intersections = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Intersections"
    };
  },

  setupLines: function(api) {
    var curve1 = new api.Bezier([50,50,150,110]);
    var curve2 = new api.Bezier([50,250,170,170]);
    api.setCurve(curve1, curve2);
  },

  drawLineIntersection: function(api, curves) {
    api.reset();

    var lli = api.utils.lli4;
    var p = lli(
      curves[0].points[0],
      curves[0].points[1],
      curves[1].points[0],
      curves[1].points[1]
    );

    var mark = 0;
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.setColor("black");
      if (p) {
        var pts = curve.points,
            mx = min(pts[0].x, pts[1].x),
            my = min(pts[0].y, pts[1].y),
            Mx = max(pts[0].x, pts[1].x),
            My = max(pts[0].y, pts[1].y);
        if (mx <= p.x && my <= p.y && Mx >= p.x && My >= p.y) {
          api.setColor("#00FF00");
          mark++;
        }
      }
      api.drawCurve(curve);
    });

    if (p) {
      api.setColor(mark < 2 ? "red" : "#00FF00");
      api.drawCircle(p, 3);
    }
  },

  setupQuadratic: function(api) {
    var curve1 = api.getDefaultQuadratic();
    var curve2 = new api.Bezier([15,250,220,20]);
    api.setCurve(curve1, curve2);
  },

  setupCubic: function(api) {
    var curve1 = new api.Bezier([100,240, 30,60, 210,230, 160,30]);
    var curve2 = new api.Bezier([25,260, 230,20]);
    api.setCurve(curve1, curve2);
  },

  draw: function(api, curves) {
    api.reset();
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.drawCurve(curve);
    });

    var utils = api.utils;
    var line = { p1: curves[1].points[0], p2: curves[1].points[1] };
    var acpts = utils.align(curves[0].points, line);
    var nB = new api.Bezier(acpts);
    var roots = utils.roots(nB.points);
    roots.forEach(t => {
      var p = curves[0].get(t);
      api.drawCircle(p, 3);
      api.text("t = " + t, {x: p.x + 5, y: p.y + 10});
    });
  },

  render: function() {
    return locale.getContent(page, this);
  }
});

module.exports = Intersections;
