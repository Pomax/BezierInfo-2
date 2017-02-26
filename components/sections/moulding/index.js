var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "moulding";

var abs = Math.abs;

var Moulding = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setupQuadratic: function(api) {
    api.setPanelCount(3);
    var curve = api.getDefaultQuadratic();
    curve.points[2].x -= 30;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    api.setPanelCount(3);
    var curve = new api.Bezier([100,230, 30,160, 200,50, 210,160]);
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  saveCurve: function(evt, api) {
    if (!api.t) return;
    api.setCurve(api.newcurve);
    api.t = false;
    api.redraw();
  },

  findTValue: function(evt, api) {
    var t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (t < 0.05 || t > 0.95) return false;
    return t;
  },

  markQB: function(evt, api) {
    api.t = this.findTValue(evt, api);
    if(api.t) {
      var t = api.t,
          t2 = 2*t,
          top = t2*t - t2,
          bottom = top + 1,
          ratio = abs(top/bottom),
          curve = api.curve,
          A = api.A = curve.points[1],
          B = api.B = curve.get(t);
      api.C = api.utils.lli4(A, B, curve.points[0], curve.points[2]);
      api.ratio = ratio;
    }
  },

  markCB: function(evt, api) {
    api.t = this.findTValue(evt, api);
    if(api.t) {
      var t = api.t,
          mt = (1-t),
          t3 = t*t*t,
          mt3 = mt*mt*mt,
          bottom = t3 + mt3,
          top = bottom - 1,
          ratio = abs(top/bottom),
          curve = api.curve,
          hull = curve.hull(t),
          A = api.A = hull[5],
          B = api.B = curve.get(t);
      api.db = curve.derivative(t);
      api.C = api.utils.lli4(A, B, curve.points[0], curve.points[3]);
      api.ratio = ratio;
    }
  },

  drag: function(evt, api) {
    if (!api.t) return;

    var newB = api.newB = {
      x: evt.offsetX,
      y: evt.offsetY
    };

    // now that we know A, B, C and the AB:BC ratio, we can compute the new A' based on the desired B'
    api.newA = {
      x: newB.x - (api.C.x - newB.x) / api.ratio,
      y: newB.y - (api.C.y - newB.y) / api.ratio
    };
  },

  dragQB: function(evt, api) {
    if (!api.t) return;
    this.drag(evt, api);
    api.update = [api.newA];
  },

  dragCB: function(evt, api) {
    if (!api.t) return;
    this.drag(evt,api);

    // preserve struts for B when repositioning
    var curve = api.curve,
        hull = curve.hull(api.t),
        B = api.B,
        Bl = hull[7],
        Br = hull[8],
        dbl = { x: Bl.x - B.x, y: Bl.y - B.y },
        dbr = { x: Br.x - B.x, y: Br.y - B.y },
        pts = curve.points,
        // find new point on s--c1
        p1 = {x: api.newB.x + dbl.x, y: api.newB.y + dbl.y},
        sc1 = {
          x: api.newA.x - (api.newA.x - p1.x)/(1-api.t),
          y: api.newA.y - (api.newA.y - p1.y)/(1-api.t)
        },
        // find new point on c2--e
        p2 = {x: api.newB.x + dbr.x, y: api.newB.y + dbr.y},
        sc2 = {
          x: api.newA.x + (p2.x - api.newA.x)/(api.t),
          y: api.newA.y + (p2.y - api.newA.y)/(api.t)
        },
        // construct new c1` based on the fact that s--sc1 is s--c1 * t
        nc1 = {
          x: pts[0].x + (sc1.x - pts[0].x)/(api.t),
          y: pts[0].y + (sc1.y - pts[0].y)/(api.t)
        },
        // construct new c2` based on the fact that e--sc2 is e--c2 * (1-t)
        nc2 = {
          x: pts[3].x - (pts[3].x - sc2.x)/(1-api.t),
          y: pts[3].y - (pts[3].y - sc2.y)/(1-api.t)
        };

    api.p1 = p1;
    api.p2 = p2;
    api.sc1 = sc1;
    api.sc2 = sc2;
    api.nc1 = nc1;
    api.nc2 = nc2;

    api.update = [nc1, nc2];
  },

  drawMould: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = {x:w, y:0},
        round = api.utils.round;

    api.setColor("black");
    api.drawLine({x:0,y:0},{x:0,y:h}, offset);
    api.drawLine({x:w,y:0},{x:w,y:h}, offset);

    if (api.t) {
      api.drawCircle(curve.get(api.t),3);
      api.npts = [curve.points[0]].concat(api.update).concat([curve.points.slice(-1)[0]]);
      api.newcurve = new api.Bezier(api.npts);

      api.setColor("lightgrey");
      api.drawCurve(api.newcurve);
      var newhull = api.drawHull(api.newcurve, api.t, offset);
      api.drawLine(api.npts[0], api.npts.slice(-1)[0], offset);
      api.drawLine(api.newA, api.newB, offset);

      api.setColor("grey");
      api.drawCircle(api.newA, 3, offset);
      api.setColor("blue");
      api.drawCircle(api.B, 3, offset);
      api.drawCircle(api.C, 3, offset);
      api.drawCircle(api.newB, 3, offset);
      api.drawLine(api.B, api.C, offset);
      api.drawLine(api.newB, api.C, offset);

      api.setFill("black");
      api.text("A'", api.newA, {x:offset.x + 7, y:offset.y + 1});
      api.text("start", curve.get(0), {x:offset.x + 7, y:offset.y + 1});
      api.text("end", curve.get(1), {x:offset.x + 7, y:offset.y + 1});
      api.setFill("blue");
      api.text("B'", api.newB, {x:offset.x + 7, y:offset.y + 1});
      api.text("B, at t = "+round(api.t,2), api.B, {x:offset.x + 7, y:offset.y + 1});
      api.text("C", api.C, {x:offset.x + 7, y:offset.y + 1});

      if(curve.order === 3) {
        var hull = curve.hull(api.t);
        api.drawLine(hull[7], hull[8], offset);
        api.drawLine(newhull[7], newhull[8], offset);
        api.drawCircle(newhull[7], 3, offset);
        api.drawCircle(newhull[8], 3, offset);
        api.text("e1", newhull[7], {x:offset.x + 7, y:offset.y + 1});
        api.text("e2", newhull[8], {x:offset.x + 7, y:offset.y + 1});
      }

      offset.x += w;

      api.setColor("lightgrey");
      api.drawSkeleton(api.newcurve, offset);
      api.setColor("black");
      api.drawCurve(api.newcurve, offset);
    } else {
      offset.x += w;
      api.drawCurve(curve, offset);
    }
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = Moulding;
