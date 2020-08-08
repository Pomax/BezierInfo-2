module.exports = {
  setupCubic: function(api) {
    var curve = new api.Bezier(135,25,  25, 135,  215,75,  215,240);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.setColor("red");
    curve.inflections().forEach(function(t) {
      api.drawCircle(curve.get(t), 5);
    });
  }
};
