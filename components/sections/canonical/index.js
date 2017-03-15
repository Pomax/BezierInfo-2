var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "canonical";

var Canonical = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.reset();
    api._map_loaded = false;
  },

  draw: function(api, curve) {
    var w = 400,
        h = w,
        unit = this.unit,
        center = {x:w/2, y:h/2};

    api.setSize(w,h);
    api.setPanelCount(2);
    api.reset();

    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.offset.x += 400;

    if (api._map_loaded) { api.image(api._map_image); }
    else { setTimeout((
      function() {
        this.drawBase(api, curve);
        this.draw(api, curve);
      }
    ).bind(this), 100); }

    api.drawLine({x:0,y:0}, {x:0, y:h});

    var npts = [
      {x:0, y: 0},
      {x:0, y: unit},
      {x:unit, y: unit},
      this.forwardTransform(curve.points, unit)
    ];

    var canonical = new api.Bezier(npts);
    api.setColor("blue");
    api.drawCurve(canonical, center);
    api.drawCircle(npts[3], 3, center);
  },

  forwardTransform: function(pts, s) {
    s = s || 1;
    var p1 = pts[0], p2 = pts[1], p3 = pts[2], p4 = pts[3];

    var xn = -p1.x + p4.x - (-p1.x+p2.x)*(-p1.y+p4.y)/(-p1.y+p2.y);
    var xd = -p1.x + p3.x - (-p1.x+p2.x)*(-p1.y+p3.y)/(-p1.y+p2.y);
    var np4x = s*xn/xd;

    var yt1 = s*(-p1.y+p4.y) / (-p1.y+p2.y);
    var yt2 = s - (s*(-p1.y+p3.y)/(-p1.y+p2.y));
    var yp = yt2 * xn / xd;
    var np4y = yt1 + yp;

    return {x:np4x, y:np4y};
  },

  drawBase: function(api, curve) {
    api.reset();

    var w = 400,
        h = w,
        unit = this.unit = w/5,
        center = {x:w/2, y:h/2};

    api.setSize(w,h);

    // axes + gridlines
    api.setColor("lightgrey");
    for(var x=0; x<w; x+= unit/2) { api.drawLine({x:x, y:0}, {x:x, y:h}); }
    for(var y=0; y<h; y+= unit/2) { api.drawLine({x:0, y:y}, {x:w, y:y}); }
    api.setColor("black");
    api.drawLine({x:w/2,y:0}, {x:w/2, y:h});
    api.drawLine({x:0,y:h/2}, {x:w, y:h/2});

    // Inflection border:
    api.setColor("green");
    api.drawLine({x:-w/2,y:unit}, {x:w/2,y:unit}, center);

    // the three stable points
    api.setColor("black");
    api.setFill("black");
    api.drawCircle({x:0, y:0}, 4, center);
    api.text("(0,0)", {x: 5+center.x, y:15+center.y});
    api.drawCircle({x:0, y:unit}, 4, center);
    api.text("(0,1)", {x: 5+center.x, y:unit+15+center.y});
    api.drawCircle({x:unit, y:unit}, 4, center);
    api.text("(1,1)", {x: unit+5+center.x, y:unit+15+center.y});

    // cusp parabola:
    api.setWeight(1.5);
    api.setColor("#FF0000");
    api.setFill(api.getColor());
    var pts = [];
    var px = 1, py = 1;
    for (x=-10; x<=1; x+=0.01) {
      y = (-x*x + 2*x + 3)/4;
      if (x>-10) {
        pts.push({x:unit*px, y:unit*py});
        api.drawLine({x:unit*px, y:unit*py}, {x:unit*x, y:unit*y}, center);
      }
      px = x;
      py = y;
    }
    pts.push({x:unit*px, y:unit*py});
    api.text("Curve form has cusp →", {x:w/2-unit*2, y: h/2+unit/2.5});

    // loop/arch transition boundary, elliptical section
    api.setColor("#FF00FF");
    api.setFill(api.getColor());
    var sqrt = Math.sqrt;
    for (x=1; x>=0; x-=0.005) {
      pts.push({x:unit*px, y:unit*py});
      y = 0.5 * (sqrt(3) * sqrt(4*x - x*x) - x);
      api.drawLine({x:unit*px, y:unit*py}, {x:unit*x, y:unit*y}, center);
      px = x;
      py = y;
    }
    pts.push({x:unit*px, y:unit*py});
    api.text("← Curve forms a loop at t = 1", {x:w/2+unit/4, y: h/2+unit/1.5});


    // loop/arch transition boundary, parabolic section
    api.setColor("#3300FF");
    api.setFill(api.getColor());
    for (x=0; x>-w; x-=0.01) {
      pts.push({x:unit*px, y:unit*py});
      y = (-x*x + 3*x)/3;
      api.drawLine({x:unit*px, y:unit*py}, {x:unit*x, y:unit*y}, center);
      px = x;
      py = y;
    }
    pts.push({x:unit*px, y:unit*py});
    api.text("← Curve forms a loop at t = 0", {x:w/2-unit+10, y: h/2-unit*1.25});

    // shape fill
    api.setColor("transparent");
    api.setFill("rgba(255,120,100,0.2)");
    api.drawPath(pts, center);
    pts = [{x:-w/2,y:unit}, {x:w/2,y:unit}, {x:w/2,y:h}, {x:-w/2,y:h}];
    api.setFill("rgba(0,200,0,0.2)");
    api.drawPath(pts, center);

    // further labels
    api.setColor("black");
    api.setFill(api.getColor());
    api.text("← Curve form has one inflection →", {x:w/2 - unit, y: h/2 + unit*1.75});
    api.text("← Plain curve ↕", {x:w/2 + unit/2, y: h/6});
    api.text("↕ Double inflection", {x:10, y: h/2 - 10});

    api._map_image = api.toImage();
    api._map_loaded = true;
  },

  render: function() {
    return locale.getContent(page, this);
  }
});

module.exports = Canonical;
