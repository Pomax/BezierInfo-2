module.exports = {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  setup: function(api, curve) {
    api.setCurve(curve);
    api.distance = 20;
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    this.setup(api, curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    this.setup(api, curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);

    var reduced = curve.reduce();
    reduced.forEach(c => {
      api.setRandomColor();
      api.drawCurve(c);
      api.drawCircle(c.points[0], 1);
    });
    var last = reduced.slice(-1)[0];
    api.drawPoint(last.points[3] || last.points[2]);

    api.setColor("red");
    var offset = curve.offset(api.distance);
    offset.forEach(c => {
      api.drawPoint(c.points[0]);
      api.drawCurve(c);
    });
    last = offset.slice(-1)[0];
    api.drawPoint(last.points[3] || last.points[2]);

    api.setColor("blue");
    offset = curve.offset(-api.distance);
    offset.forEach(c => {
      api.drawPoint(c.points[0]);
      api.drawCurve(c);
    });
    last = offset.slice(-1)[0];
    api.drawPoint(last.points[3] || last.points[2]);
  }
};
