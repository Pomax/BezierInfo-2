var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "curveintersection";

var abs = Math.abs;

var CurveIntersections = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api) {
    this.api = api;
    api.setPanelCount(3);
    var curve1 = new api.Bezier(10,100,90,30,40,140,220,220);
    var curve2 = new api.Bezier(5,150,180,20,80,250,210,190);
    api.setCurve(curve1, curve2);
    this.pairReset();
  },

  pairReset: function() {
    this.prevstep = 0;
    this.step = 0;
  },

  draw: function(api, curves) {
    api.reset();
    var offset = {x:0, y:0};
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.drawCurve(curve);
    });

    // next panel: iterations
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    offset.x += w;
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    if (this.step === 0) {
      this.pairs = [{c1: curves[0], c2: curves[1]}];
    }

    if(this.step !== this.prevstep) {
      var pairs = this.pairs;
      this.pairs = [];
      this.finals = [];
      pairs.forEach(p => {

        if(p.c1.length() < 0.6 && p.c2.length() < 0.6) {
          return this.finals.push(p);
        }

        var s1 = p.c1.split(0.5);
        api.setColor("black");
        api.drawCurve(p.c1, offset);
        api.setColor("red");
        api.drawbbox(s1.left.bbox(), offset);
        api.drawbbox(s1.right.bbox(), offset);

        var s2 = p.c2.split(0.5);
        api.setColor("black");
        api.drawCurve(p.c2, offset);
        api.setColor("blue");
        api.drawbbox(s2.left.bbox(), offset);
        api.drawbbox(s2.right.bbox(), offset);

        if (s1.left.overlaps(s2.left)) { this.pairs.push({c1: s1.left, c2: s2.left}); }
        if (s1.left.overlaps(s2.right)) { this.pairs.push({c1: s1.left, c2: s2.right}); }
        if (s1.right.overlaps(s2.left)) { this.pairs.push({c1: s1.right, c2: s2.left}); }
        if (s1.right.overlaps(s2.right)) { this.pairs.push({c1: s1.right, c2: s2.right}); }
      });
      this.prevstep = this.step;
    } else {
      this.pairs.forEach(p => {
        api.setColor("black");
        api.drawCurve(p.c1, offset);
        api.drawCurve(p.c2, offset);
        api.setColor("red");
        api.drawbbox(p.c1.bbox(), offset);
        api.setColor("blue");
        api.drawbbox(p.c2.bbox(), offset);
      });
    }

    if (this.pairs.length === 0) {
      this.pairReset();
      this.draw(api, curves);
    }

    // next panel: results
    offset.x += w;
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    // get intersections as coordinates
    var results = curves[0].intersects(curves[1]).map(s => {
      var tvals = s.split('/').map(v => parseFloat(v));
      return {t1: tvals[0], t2: tvals[1]};
    });

    // filter out likely duplicates
    var curr = results[0], _, i, same = ((a,b) => abs(a.t1-b.t1) < 0.01 && abs(a.t2-b.t2) < 0.01);
    for(i=1; i<results.length; i++) {
      _ = results[i];
      if (same(curr, _)) {
        results.splice(i--,1);
      } else { curr = _; }
    }

    api.setColor("lightblue");
    api.drawCurve(curves[0], offset);
    api.drawCurve(curves[1], offset);

    api.setColor("blue");
    results.forEach(tvals => {
      api.drawCircle(curves[0].get(tvals.t1), 3, offset);
    });
  },

  stepUp: function() {
    this.step++;
    this.api.redraw();
  },

  render: function() {
    return locale.getContent(page, this);
  }
});

module.exports = CurveIntersections;
