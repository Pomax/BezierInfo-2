var ratios;

module.exports = {
  drawCubic: function(api) {
    var curve = new api.Bezier(
      120, 160,
      35,  200,
      220, 260,
      220, 40
    );
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  setRatio: function(api, values) {
    ratios = values;
    this.update(api);
  },

  changeRatio: function(api, value, pos) {
    ratios[pos] = parseFloat(value) || 0.00001;
    this.update(api);
  },

  update: function(api) {
    api.curve.setRatios(ratios.slice());
    this.drawCurve(api, api.curve);
  }
};
