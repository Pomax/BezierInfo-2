module.exports = {
  /**
   * Setup function for a default quadratic curve.
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  /**
   * Setup function for a default cubic curve.
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  /**
   * A coordinate rotation function that rotates and
   * translates the curve, such that the first coordinate
   * of the curve is (0,0) and the last coordinate is (..., 0)
   */
  align: function(points, line) {
    var tx = line.p1.x,
        ty = line.p1.y,
        // The atan2 function is so important to computing
        // that most CPUs have a dedicated implementation
        // at the hardware level for it.
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

  /**
   * Draw a curve and its aligned counterpart
   * side by side across two panels.
   */
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
  }
};
