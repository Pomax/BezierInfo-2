var sin = Math.sin;
var tau = Math.PI*2;

module.exports = {
  setup: function(api) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var generator;
    if (!this.generator) {
      generator = ((v,scale) => {
        scale = scale || 1;
        return {
          x: v*w/tau,
          y: scale * sin(v)
        };
      });
      generator.start = 0;
      generator.end = tau;
      generator.step = 0.1;
      generator.scale = h/3;
      this.generator = generator;
    }
  },

  drawSine: function(api, dheight) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var generator = this.generator;
    generator.dheight = dheight;

    api.setColor("black");
    api.drawLine({x:0,y:h/2}, {x:w,y:h/2});
    api.drawFunction(generator, {x:0, y:h/2});
  },

  drawSlices: function(api, steps) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var f = w/tau;
    var area = 0;
    var c = steps <= 25 ? 1 : 0;
    api.reset();
    api.setColor("transparent");
    api.setFill("rgba(150,150,255, 0.4)");
    for (var step=tau/steps, i=step/2, v, p1, p2; i<tau+step/2; i+=step) {
      v = this.generator(i);
      p1 = {x:v.x - f*step/2 + c, y: 0};
      p2 = {x:v.x + f*step/2 - c, y: v.y * this.generator.scale};

      if (!c) { api.setFill("rgba(150,150,255,"+(0.4 + 0.3*Math.random())+")"); }
      api.drawRect(p1, p2, {x:0, y:h/2});
      area += step * Math.abs(v.y * this.generator.scale);
    }
    api.setFill("black");
    var trueArea = ((100 * 4 * h/3)|0)/100;
    var currArea = ((100 * area)|0)/100;
    api.text("Approximating with "+steps+" strips (true area: "+trueArea+"): " + currArea, {x: 10, y: h-15});
  },

  drawCoarseIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 10);
    this.drawSine(api);
  },

  drawFineIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 24);
    this.drawSine(api);
  },

  drawSuperFineIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 99);
    this.drawSine(api);
  },

  setupCurve: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    var len = curve.length();
    api.setFill("black");
    api.text("Curve length: "+len+" pixels", {x:10, y:15});
  }
};
