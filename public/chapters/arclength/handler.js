var sin = Math.sin;
var tau = Math.PI*2;

module.exports = {
  /**
   * Set up a sinusoid generating function,
   * which we'll use to draw the "progressively
   * better looking" integral approximations.
   */
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

  /**
   * Draw the generator's sine function:
   */
  drawSine: function(api, dheight) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var generator = this.generator;
    generator.dheight = dheight;

    api.setColor("black");
    api.drawLine({x:0,y:h/2}, {x:w,y:h/2});
    api.drawFunction(generator, {x:0, y:h/2});
  },

  /**
   * Draw the sliced between the sine curve and
   * the x-axis, with a variable number of steps so
   * we can show the approximation becoming better
   * and better as we increase the step count.
   */
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

      // draw a rectangular strip between the curve and the x-axis:
      p1 = {x:v.x - f*step/2 + c, y: 0};
      p2 = {x:v.x + f*step/2 - c, y: v.y * this.generator.scale};

      if (!c) { api.setFill("rgba(150,150,255,"+(0.4 + 0.3*Math.random())+")"); }
      api.drawRect(p1, p2, {x:0, y:h/2});

      // and keep track of the (much simpler to compute) approximated area under the curve so far:
      area += step * Math.abs(v.y * this.generator.scale);
    }
    api.setFill("black");
    var trueArea = ((100 * 4 * h/3)|0)/100;
    var currArea = ((100 * area)|0)/100;
    api.text("Approximating with "+steps+" strips (true area: "+trueArea+"): " + currArea, {x: 10, y: h-15});
  },

  /**
   * Draw the sine curve, with a 10 slice approximation:
   */
  drawCoarseIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 10);
    this.drawSine(api);
  },

  /**
   * Draw the sine curve, with a 24 slice approximation:
   */
  drawFineIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 24);
    this.drawSine(api);
  },

  /**
   * Draw the sine curve, with a 99 slice approximation:
   */
  drawSuperFineIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 99);
    this.drawSine(api);
  },

  /**
   * Set up a default cubic curve for which we'll be determining
   * its length, using the iterative integral approach:
   */
  setupCurve: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  /**
   * Draw our curve, and show its computed length:
   */
  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    var len = curve.length();
    api.setFill("black");
    api.text("Curve length: "+len+" pixels", {x:10, y:15});
  }
};
