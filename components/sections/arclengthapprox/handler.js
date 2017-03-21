module.exports = {
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
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
    api.steps = 10;
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 16;
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);

    var pts = curve.getLUT(api.steps);

    var step = 1 / api.steps;
    var p0 = curve.points[0], pc;
    for(var t=step; t<1.0+step; t+=step) {
      pc = curve.get(Math.min(t,1));
      api.setColor("red");
      api.drawLine(p0,pc);
      p0 = pc;
    }

    var len = curve.length();
    var alen = 0;
    for(var i=0,p1,dx,dy; i<pts.length-1; i++) {
      p0 = pts[i];
      p1 = pts[i+1];
      dx = p1.x-p0.x;
      dy = p1.y-p0.y;
      alen += Math.sqrt(dx*dx+dy*dy);
    }
    alen = ((100*alen)|0)/100;
    len = ((100*len)|0)/100;

    api.text("Approximate length, "+api.steps+" steps: "+alen+" (true: "+len+")", {x:10, y: 15});
  }
};
