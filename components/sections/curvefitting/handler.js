var fit = require('../../../lib/curve-fitter.js');

module.exports = {
  setup: function(api) {
    this.api = api;
    this.reset();
  },

  reset: function() {
    this.points = [];
    this.curveset = false;
    let api = this.api;
    if (api) {
      api.setCurve(false);
      api.reset();
      api.redraw();
    }
  },

  draw: function(api, curve) {
    api.setPanelCount(1);
    api.reset();
    api.setColor('lightgrey');
    api.drawGrid(10,10);

    api.setColor('black');
    if (!this.curveset && this.points.length > 2) {
      let bestFitData = fit(this.points),
          x = bestFitData.C.x,
          y = bestFitData.C.y,
          bpoints = [];
      x.forEach((r,i) => {
        bpoints.push({
          x: r[0],
          y: y[i][0]
        });
      });
      curve = new api.Bezier(bpoints);
      api.setCurve(curve);
      this.curveset = true;
    }

    if (curve) {
      api.drawCurve(curve);
      api.drawSkeleton(curve);
    }
    api.drawPoints(this.points);
  },

  onClick: function(evt, api) {
    this.curveset = false;
    this.points.push({x: api.mx, y: api.my });
    api.redraw();
  }
};
