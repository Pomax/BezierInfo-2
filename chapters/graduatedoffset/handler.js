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
    api.drawCurve(curve);


    api.setColor("blue");
    var outline = curve.outline(0,0,api.distance,api.distance);
    outline.curves.forEach(c => api.drawCurve(c));
  }
};
