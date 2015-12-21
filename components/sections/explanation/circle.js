module.exports = {
  setup: function(sketch) {
  },

  draw: function(sketch, curve) {
    var dim = sketch.getPanelWidth(),
        w = dim,
        h = dim,
        w2 = w/2,
        h2 = h/2,
        w4 = w2/2,
        h4 = h2/2;

    sketch.reset();
    sketch.setColor("black");
    sketch.drawLine({x:0,y:h2},{x:w,y:h2});
    sketch.drawLine({x:w2,y:0},{x:w2,y:h});

    var offset = {x:w2, y:h2};
    for(var t=0, p; t<=5; t+=0.1) {
      p = {
        x: w4 * Math.cos(t),
        y: h4 * Math.sin(t)
      };
      sketch.drawPoint(p, offset);
      var modulo = t % 1;
      if(modulo<0.05 || modulo> 0.95) {
        sketch.drawText("t = " + Math.round(t), {
          x: offset.x + 1.25 * w4 * Math.cos(t) - 10,
          y: offset.y + 1.25 * h4 * Math.sin(t) + 5
        });
        sketch.drawCircle(p, 2, offset);
      }
    }
  }
};
