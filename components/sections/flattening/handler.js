module.exports = {
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1  // down arrow
      },
      controller: function(api) {
        if (api.steps < 1) {
          api.steps = 1;
        }
      }
    }
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.steps = 3;
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 5;
  },

  drawFlattened: function(api, curve) {
    api.reset();
    api.setColor("#DDD");
    api.drawSkeleton(curve);
    api.setColor("#DDD");
    api.drawCurve(curve);
    var step = 1 / api.steps;
    var p0 = curve.points[0], pc;
    for(var t=step; t<1.0+step; t+=step) {
      pc = curve.get(Math.min(t,1));
      api.setColor("red");
      api.drawLine(p0,pc);
      p0 = pc;
    }
    api.setFill("black");
    api.text("Curve approximation using "+api.steps+" segments", {x:10, y:15});
  },

  values: {
    "38": 1,  // up arrow
    "40": -1  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.steps += v;
      if (api.steps < 1) {
        api.steps = 1;
      }
    }
  }
};
