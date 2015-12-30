module.exports = {

  setup: function(sketch) {
    this.offset = 20;
    var curve = sketch.getDefaultQuadratic();
    sketch.setPanelCount(3);
    sketch.setCurve(curve);
    this.dim = sketch.getPanelWidth();
  },

  draw: function(sketch, curve) {
    var pts = curve.points;
    var p1 = pts[0], p2=pts[1], p3 = pts[2];

    var p1e = {
      x: p1.x + 0.2 * (p2.x - p1.x),
      y: p1.y + 0.2 * (p2.y - p1.y)
    };

    var p2e = {
      x: p2.x + 0.2 * (p3.x - p2.x),
      y: p2.y + 0.2 * (p3.y - p2.y)
    };

    var m = {
      x: p1e.x + 0.2 * (p2e.x - p1e.x),
      y: p1e.y + 0.2 * (p2e.y - p1e.y)
    }

    var p1e2 = {
      x: p1.x + 0.4 * (p2.x - p1.x),
      y: p1.y + 0.4 * (p2.y - p1.y)
    };

    var p2e2 = {
      x: p2.x + 0.4 * (p3.x - p2.x),
      y: p2.y + 0.4 * (p3.y - p2.y)
    };

    var m2 = {
      x: p1e2.x + 0.4 * (p2e2.x - p1e2.x),
      y: p1e2.y + 0.4 * (p2e2.y - p1e2.y)
    }

    var p1e3 = {
      x: p1.x + 0.6 * (p2.x - p1.x),
      y: p1.y + 0.6 * (p2.y - p1.y)
    };

    var p2e3 = {
      x: p2.x + 0.6 * (p3.x - p2.x),
      y: p2.y + 0.6 * (p3.y - p2.y)
    };

    var m3 = {
      x: p1e3.x + 0.6 * (p2e3.x - p1e3.x),
      y: p1e3.y + 0.6 * (p2e3.y - p1e3.y)
    }

    sketch.reset();

    sketch.setColor("black");
    sketch.setFill("black");
    sketch.drawSkeleton(curve);
    //sketch.drawCurve(curve);

    // draw 20% off-start points and struts
    sketch.setWeight(2);

    sketch.setColor("blue");
    sketch.drawLine(p1, p1e);
    sketch.drawLine(p2, p2e);
    sketch.drawCircle(p1e,3);
    sketch.drawCircle(p2e,3);

    sketch.setColor("red");
    sketch.drawLine(p1e, p1e2);
    sketch.drawLine(p2e, p2e2);
    sketch.drawCircle(p1e2,3);
    sketch.drawCircle(p2e2,3);

    sketch.setColor("green");
    sketch.drawLine(p1e2, p1e3);
    sketch.drawLine(p2e2, p2e3);
    sketch.drawCircle(p1e3,3);
    sketch.drawCircle(p2e3,3);

    sketch.text("First linear interpolation at 20% / 40% / 60%", {x:5, y:15});

    // next panel
    sketch.setColor("black");
    sketch.setWeight(1);
    sketch.setOffset({x:this.dim + 0.5, y:0});
    sketch.drawLine({x:0, y:0}, {x:0, y:this.dim});

    sketch.drawSkeleton(curve);
    //sketch.drawCurve(curve);

    sketch.setColor("rgb(100,100,200)");
    sketch.drawLine(p1e, p2e);
    sketch.drawCircle(p1e,3);
    sketch.drawCircle(p2e,3);

    sketch.setColor("rgb(200,100,100)");
    sketch.drawLine(p1e2, p2e2);
    sketch.drawCircle(p1e2,3);
    sketch.drawCircle(p2e2,3);

    sketch.setColor("rgb(100,200,100)");
    sketch.drawLine(p1e3, p2e3);
    sketch.drawCircle(p1e3,3);
    sketch.drawCircle(p2e3,3);

    sketch.setColor("blue");
    sketch.setWeight(2);
    sketch.drawLine(p1e, m);
    sketch.drawCircle(m,3);

    sketch.setColor("red");
    sketch.drawLine(p1e2, m2);
    sketch.drawCircle(m2,3);

    sketch.setColor("green");
    sketch.drawLine(p1e3, m3);
    sketch.drawCircle(m3,3);

    sketch.text("Second interpolation at 20% / 40% / 60%", {x:5, y:15});

    // next panel
    sketch.setColor("black");
    sketch.setWeight(1);
    sketch.setOffset({x: 2*this.dim + 0.5, y:0});
    sketch.drawLine({x:0, y:0}, {x:0, y:this.dim});

    sketch.drawSkeleton(curve);
    sketch.setColor("lightgrey");
    for(var t=1,d=20,v,tvp; t<d; t++) {
      v = t/d;
      tvp = curve.get(v);
      sketch.drawCircle(tvp,2);
    }

    sketch.setColor("black");
    sketch.setFill("black");

    sketch.drawCircle(m,3);
    sketch.drawCircle(m2,3);
    sketch.drawCircle(m3,3);

    var offset = {x:10, y:5};
    sketch.text("20%, or t = 0.2", {x: m.x + offset.x, y: m.y + offset.y});
    sketch.text("40%, or t = 0.4", {x:m2.x + offset.x, y:m2.y + offset.y});
    sketch.text("60%, or t = 0.6", {x:m3.x + offset.x, y:m3.y + offset.y});

    sketch.text("Curve points generated this way", {x:5, y:15});
  }
};
