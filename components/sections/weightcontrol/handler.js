var r = [1, 0.6, 0.9, 1];

module.exports = {
  drawCubic: function(api) {
    var curve = new api.Bezier(
      r[0] * 120, r[0] * 160,
      r[1] * 35,  r[1] * 200,
      r[2] * 220, r[2] * 260,
      r[3] * 220, r[3] * 40
    );
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    console.log('redrawing', curve);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  changeRatio: function(api, value, pos) {
    r[pos] = parseFloat(value);
    api.curve.setRatios(r.slice());
    this.drawCurve(api, api.curve);
  }
};
