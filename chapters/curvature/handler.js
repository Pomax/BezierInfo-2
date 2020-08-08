module.exports = {
  setup: function(api) {
    let d = api.defaultWidth;
    api.setSize(d*3, api.defaultHeight);

    // Set up two curves with identical form, but different functions:
    var q = this.q = new api.Bezier(115, 250, 10, 35, 190, 45);
    var c = this.c = q.raise();
    q.points.forEach(p => (p.x += d/2));
    c.points.forEach(p => (p.x += 3*d/2));

    // And "fake" a master curve that we'll never draw, but which
    // will allow us to move interact with the curve points.
    api.setCurve({
      points: q.points.concat(c.points)
    });
  },

  updateCurves(api, curve) {
    // update the quadratic and cubic curves by grabbing
    // whatever the points in our "fake" master curve are

    let q = this.q;
    q.points = curve.points.slice(0,3);
    q.update();

    let c = this.c;
    c.points = curve.points.slice(3,7);
    c.update();
  },

  drawCurvature(api, curve, omni) {
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var s, t, p, n, c, ox, oy;
    for( s=0; s<256; s++) {
      // Draw the curvature as a coloured line at the
      // current point, along the normal.
      api.setColor('rgba(255,127,'+s+',0.6)');
      t = s/255;
      p = curve.get(t);
      n = curve.normal(t);
      c = curve.curvature(t);
      ox = c.k * n.x;
      oy = c.k * n.y;
      api.drawLine(p, { x: p.x + ox, y: p.y + oy });

      // And if requested, also draw it along the anti-normal.
      if (omni) {
        api.setColor('rgba('+s+',127,255,0.6)');
        api.drawLine(p, { x: p.x - ox, y: p.y - oy });
      }
    }
  },

  proxyDraw: function(api, curve, omni) {
    api.reset();
    this.updateCurves(api, curve);
    [this.q, this.c].forEach(curve => this.drawCurvature(api, curve, omni));
  },

  draw: function(api, curve) {
    this.proxyDraw(api, curve);
  },

  drawOmni: function(api, curve) {
    this.proxyDraw(api, curve, true);
  }
};
