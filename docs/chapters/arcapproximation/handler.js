var atan2 = Math.atan2, PI = Math.PI, TAU = 2*PI, cos = Math.cos, sin = Math.sin;

module.exports = {
  // These are functions that can be called "From the page",
  // rather than being internal to the sketch. This is useful
  // for making on-page controls hook into the sketch code.
  statics: {
    keyHandlingOptions: {
      propName: "error",
      values: {
        "38": 0.1,  // up arrow
        "40": -0.1  // down arrow
      },
      controller: function(api) {
        if (api.error < 0.1) {
          api.error = 0.1;
        }
      }
    }
  },

  /**
   *  Setup up a skeleton curve that, when using its
   *  points for a B-spline, can form a circle.
   */
  setupCircle: function(api) {
    var curve = new api.Bezier(70,70, 140,40, 240,130);
    api.setCurve(curve);
  },

  /**
   * Set up the default quadratic curve.
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  /**
   * Set up the default cubic curve.
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.error = 0.5;
  },

  /**
   * Given three points, find the (only!) circle
   * that passes through all three points, based
   * on the fact that the perpendiculars of the
   * chords between the points all cross each
   * other at the center of that circle.
   */
  getCCenter: function(api, p1, p2, p3) {
    // deltas
    var dx1 = (p2.x - p1.x),
        dy1 = (p2.y - p1.y),
        dx2 = (p3.x - p2.x),
        dy2 = (p3.y - p2.y);

    // perpendiculars (quarter circle turned)
    var dx1p = dx1 * cos(PI/2) - dy1 * sin(PI/2),
        dy1p = dx1 * sin(PI/2) + dy1 * cos(PI/2),
        dx2p = dx2 * cos(PI/2) - dy2 * sin(PI/2),
        dy2p = dx2 * sin(PI/2) + dy2 * cos(PI/2);

    // chord midpoints
    var mx1 = (p1.x + p2.x)/2,
        my1 = (p1.y + p2.y)/2,
        mx2 = (p2.x + p3.x)/2,
        my2 = (p2.y + p3.y)/2;

    // midpoint offsets
    var mx1n = mx1 + dx1p,
        my1n = my1 + dy1p,
        mx2n = mx2 + dx2p,
        my2n = my2 + dy2p;

    // intersection of these lines:
    var i = api.utils.lli8(mx1,my1,mx1n,my1n, mx2,my2,mx2n,my2n);
    var r = api.utils.dist(i,p1);

    // arc start/end values, over mid point
    var s = atan2(p1.y - i.y, p1.x - i.x),
        m = atan2(p2.y - i.y, p2.x - i.x),
        e = atan2(p3.y - i.y, p3.x - i.x);

    // determine arc direction (cw/ccw correction)
    var __;
    if (s<e) {
      if (s>m || m>e) { s += TAU; }
      if (s>e) { __=e; e=s; s=__; }
    } else {
      if (e<m && m<s) { __=e; e=s; s=__; } else { e += TAU; }
    }

    // assign and done.
    i.s = s;
    i.e = e;
    i.r = r;
    return i;
  },

  /**
   * Draw the circle-computation sketch
   */
  drawCircle: function(api, curve) {
    api.reset();
    var pts = curve.points;

    // get center
    var C = this.getCCenter(api, pts[0], pts[1], pts[2]);
    // outer circle
    api.setColor("grey");
    api.drawCircle(C, api.utils.dist(C,pts[0]));

    // controllable points
    api.setColor("black");
    pts.forEach(p => api.drawCircle(p,3));

    // chords and perpendicular lines
    var m;

    api.setColor("blue");
    api.drawLine(pts[0], pts[1]);
    m = {x: (pts[0].x + pts[1].x)/2, y: (pts[0].y + pts[1].y)/2};
    api.drawLine(m, {x:C.x+(C.x-m.x), y:C.y+(C.y-m.y)});

    api.setColor("red");
    api.drawLine(pts[1], pts[2]);
    m = {x: (pts[1].x + pts[2].x)/2, y: (pts[1].y + pts[2].y)/2};
    api.drawLine(m, {x:C.x+(C.x-m.x), y:C.y+(C.y-m.y)});

    api.setColor("green");
    api.drawLine(pts[2], pts[0]);
    m = {x: (pts[2].x + pts[0].x)/2, y: (pts[2].y + pts[0].y)/2};
    api.drawLine(m, {x:C.x+(C.x-m.x), y:C.y+(C.y-m.y)});

    // center
    api.setColor("black");
    api.drawPoint(C);
    api.setFill("black");
    api.text("Intersection point", C, {x:-25, y:10});
  },

  /**
   * Draw a single arc being fit to a Bezier curve,
   * to show off the general application.
   */
  drawSingleArc: function(api, curve) {
    api.reset();
    var arcs = curve.arcs(api.error);
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var a = arcs[0];
    api.setColor("red");
    api.setFill("rgba(255,0,0,0.2)");
    api.debug = true;
    api.drawArc(a);

    api.setFill("black");
    api.text("Arc approximation with total error " + api.utils.round(api.error,1), {x:10, y:15});
  },

  /**
   * Draw an arc approximation for an entire Bezier curve.
   */
  drawArcs: function(api, curve) {
    api.reset();
    var arcs = curve.arcs(api.error);
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    arcs.forEach(a => {
      api.setRandomColor(0.3);
      api.setFill(api.getColor());
      api.drawArc(a);
    });

    api.setFill("black");
    api.text("Arc approximation with total error " + api.utils.round(api.error,1) + " per arc segment", {x:10, y:15});
  }
};
