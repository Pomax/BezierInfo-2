module.exports = {

  // ============== first sketch set =====================

  /**
   * The entry point for the quadratic curve example
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[0].y -= 10;
    api.setCurve(curve);
  },

  /**
   * The entry point for the cubic curve example
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  /**
   * When someone clicks a graphic, find the associated
   * on-curve t value and redraw with that new knowledge.
   */
  onClick: function(evt, api) {
    api.t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (api.t < 0.05 || api.t > 0.95) api.t = false;
    api.redraw();
  },

  /**
   * The master draw function for the "projection" sketches
   */
  draw: function(api, curve) {
    // draw the basic curve and curve control points
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.setColor("black");
    if (!api.t) return;

    // draw the user-clicked on-curve point
    api.drawCircle(api.curve.get(api.t),3);
    api.setColor("lightgrey");

    var utils = api.utils;

    // find the A/B/C values as described in the section text
    var hull = api.drawHull(curve, api.t);
    var A, B, C;
    if(hull.length === 6) {
      A = curve.points[1];
      B = hull[5];
      C = utils.lli4(A, B, curve.points[0], curve.points[2]);
      api.setColor("lightgrey");
      api.drawLine(curve.points[0], curve.points[2]);
    } else if(hull.length === 10) {
      A = hull[5];
      B = hull[9];
      C = utils.lli4(A, B, curve.points[0], curve.points[3]);
      api.setColor("lightgrey");
      api.drawLine(curve.points[0], curve.points[3]);
    }

    // show the lines between the A/B/C values
    api.setColor("#00FF00");
    api.drawLine(A,B);
    api.setColor("red");
    api.drawLine(B,C);
    api.setColor("black");
    api.drawCircle(C,3);

    // with their associated labels
    api.setFill("black");
    api.text("A", {x:10 + A.x, y: A.y});
    api.text("B (t = " + api.utils.round(api.t,2) + ")", {x:10 + B.x, y: B.y});
    api.text("C", {x:10 + C.x, y: C.y});

    // and show the distance ratio, which we see does not change irrespective of whether A/B/C change.
    var d1 = utils.dist(A, B);
    var d2 = utils.dist(B, C);
    var ratio = d1/d2;
    var h = api.getPanelHeight();
    api.text("d1 (A-B): " + utils.round(d1,2) + ", d2 (B-C): "+ utils.round(d2,2) + ", ratio (d1/d2): " + utils.round(ratio,4), {x:10, y:h-7});
  },

  // ============== second sketch set =====================

  /**
   * on mouse move, fix the t value for drawing based on the
   * cursor position over the sketch. All the way on the left
   * is t=0, all the way on the right is t=1, with a linear
   * interpolation for anything in between.
   */
  setCT: function(evt,api) {
    api.t = evt.offsetX / api.getPanelWidth();
  },

  /**
   * Draw the quadratic C(t) values
   */
  drawQCT: function(api) {
    api.u = api.u || function(t) {
      var top = (t-1) * (t-1),
          bottom = 2*t*t - 2*t + 1;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  /**
   * Draw the cubic C(t) values
   */
  drawCCT: function(api) {
    api.u = api.u || function(t) {
      var top = (1-t) * (1-t) * (1-t),
          bottom = t*t*t + top;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  /**
   * Draw a C(t) curve
   */
  drawCTgraph: function(api) {
    api.reset();
    var w = api.getPanelWidth();
    var pad = 20;
    var fwh = w - 2*pad;

    // draw some axes
    api.setColor("black");
    api.drawAxes(pad, "t",0,1, "u",0,1);

    // draw the C(t) function using an
    // indirection function that takes a
    // t value and spits out the C(t) value
    // as a point coordinate.
    api.setColor("blue");
    var uPoint = function(t) {
      var value = api.u(t),
          res = { x: pad + t*fwh, y: pad + value*fwh };
      return res;
    };
    api.drawFunction(uPoint);

    // if the cursor is (or was ever) over this
    // graphic, draw the "crosshair" that pinpoints
    // where in the function the associated t/C(t)
    // coordinate is.
    if (api.t) {
      var v = api.u(api.t),
          v1 = api.utils.round(v,3),
          v2 = api.utils.round(1-v,3),
          up = uPoint(api.t);
      api.drawLine({x:up.x,y:pad}, up);
      api.drawLine({x:pad,y:up.y}, up);
      api.drawCircle(up,3);

      // with some handy text that shows the actual computed values
      api.setFill("blue");
      api.text("    t = " + api.utils.round(api.t,3), {x:up.x+10, y:up.y-7});
      api.text("u(t) = " + api.utils.round(v,3), {x:up.x+10, y:up.y+7});
      api.setFill("black");
      api.text("C = "+v1+" * start + "+v2+" * end", {x:w/2 - pad, y:pad+fwh});
    }
  }
};
