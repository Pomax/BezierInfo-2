var fit = require('../../../lib/curve-fitter.js');

module.exports = {
  setup: function(api) {
    this.api = api;
    this.reset();
  },

  reset: function() {
    this.points = [];
    this.curveset = false;
    this.mode = 0;
    if (this.api) {
      let api = this.api;
      api.setCurve(false);
      api.reset();
      api.redraw();
    }
  },

  toggle: function() {
    if (this.api) {
      this.customTimeValues = false;
      this.mode = (this.mode + 1) % fit.modes.length;
      this.fitCurve(this.api);
      this.api.redraw();
    }
  },

  draw: function(api, curve) {
    api.setPanelCount(1);
    api.reset();

    api.setColor('black');

    if (!this.curveset && this.points.length > 2) {
      curve = this.fitCurve(api);
    }

    if (curve) {
      api.drawCurve(curve);
      api.drawSkeleton(curve);
    }

    api.drawPoints(this.points);

    if (!this.customTimeValues) {
      api.setFill(0);
      api.text("using "+fit.modes[this.mode]+" t values", {x: 5, y: 10});
    }
  },

  processTimeUpdate(sliderid, timeValues) {
    var api = this.api;
    this.customTimeValues = true;
    this.fitCurve(api, timeValues);
    api.redraw();
  },

  fitCurve(api, timeValues) {
    let bestFitData = fit(this.points, timeValues || this.mode),
        x = bestFitData.C.x,
        y = bestFitData.C.y,
        bpoints = [];
    x.forEach((r,i) => {
      bpoints.push({
        x: r[0],
        y: y[i][0]
      });
    });
    var curve = new api.Bezier(bpoints);
    api.setCurve(curve);
    this.curveset = true;
    this.sliders.setOptions(bestFitData.S);
    return curve;
  },

  onClick: function(evt, api) {
    this.curveset = false;
    this.points.push({x: api.mx, y: api.my });
    api.redraw();
  }
};
