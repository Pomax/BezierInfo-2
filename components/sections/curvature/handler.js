module.exports = {
  setupQuadratic: function(api) {
    var curve = new api.Bezier(115, 250, 10, 35, 190, 45);
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = new api.Bezier(20, 95, 65, 195, 190, 80, 230, 170);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    for(var s=0; s<256; s++) {
      api.setColor('rgba(255,127,'+s+',0.6)');
      var t = s/255;
      var p = curve.get(t);
      var n = curve.normal(t);
      var c = curve.curvature(t);
      api.drawLine(p, {
        x: p.x + c.k * n.x,
        y: p.y + c.k * n.y
      });
    }
  }
};
