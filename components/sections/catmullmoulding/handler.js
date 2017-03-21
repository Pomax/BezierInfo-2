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

  setup: function(api) {
    api.setPanelCount(3);
    api.lpts = [
      {x:56, y:153},
      {x:144,y:83},
      {x:188,y:185}
    ];
    api.distance = 0;
  },

  convert: function(p1, p2, p3, p4) {
    var t = 0.5;
    return [
      p2, {
        x: p2.x + (p3.x-p1.x)/(6*t),
        y: p2.y + (p3.y-p1.y)/(6*t)
      }, {
        x: p3.x - (p4.x-p2.x)/(6*t),
        y: p3.y - (p4.y-p2.y)/(6*t)
      }, p3
    ];
  },

  draw: function(api) {
    api.reset();
    api.setColor("lightblue");
    api.drawGrid(10,10);

    var pts = api.lpts;
    api.setColor("black");
    api.setFill("black");
    pts.forEach((p,pos) => {
      api.drawCircle(p, 3);
      api.text("point "+(pos+1), p, {x:10, y:7});
    });

    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var offset = {x:w, y:0};
    api.setColor("lightblue");
    api.drawGrid(10,10,offset);
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    pts.forEach((p,pos) => {
      api.drawCircle(p, 3, offset);
    });
    var p1 = pts[0], p2 = pts[1], p3 = pts[2];
    var dx = p3.x - p1.x,
        dy = p3.y - p1.y,
        m = Math.sqrt(dx*dx + dy*dy);
    dx /= m;
    dy /= m;
    api.drawLine(p1, p3, offset);

    var p0 = {
      x: p1.x + (p3.x - p2.x) - api.distance * dx,
      y: p1.y + (p3.y - p2.y) - api.distance * dy
    };
    var p4 = {
      x: p1.x + (p3.x - p2.x) + api.distance * dx,
      y: p1.y + (p3.y - p2.y) + api.distance * dy
    };
    var center = api.utils.lli4(p1,p3,p2,{
      x: (p0.x + p4.x)/2,
      y: (p0.y + p4.y)/2
    });
    api.setColor("blue");
    api.drawCircle(center, 3, offset);
    api.drawLine(pts[1],center, offset);
    api.setColor("#666");
    api.drawLine(center, p0, offset);
    api.drawLine(center, p4, offset);

    api.setFill("blue");
    api.text("p0", p0, {x:-20 + offset.x, y:offset.y + 2});
    api.text("p4", p4, {x:+10 + offset.x, y:offset.y + 2});

    // virtual point p0
    api.setColor("red");
    api.drawCircle(p0, 3, offset);
    api.drawLine(p2, p0, offset);
    api.drawLine(p1, {
      x: p1.x + (p2.x - p0.x)/5,
      y: p1.y + (p2.y - p0.y)/5
    }, offset);

    // virtual point p4
    api.setColor("#00FF00");
    api.drawCircle(p4, 3, offset);
    api.drawLine(p2, p4, offset);
    api.drawLine(p3, {
      x: p3.x + (p4.x - p2.x)/5,
      y: p3.y + (p4.y - p2.y)/5
    }, offset);

    // Catmull-Rom curve for p0-p1-p2-p3-p4
    var c1 = new api.Bezier(this.convert(p0,p1,p2,p3)),
        c2 = new api.Bezier(this.convert(p1,p2,p3,p4));
    api.setColor("lightgrey");
    api.drawCurve(c1, offset);
    api.drawCurve(c2, offset);


    offset.x += w;
    api.setColor("lightblue");
    api.drawGrid(10,10,offset);
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    api.drawCurve(c1, offset);
    api.drawCurve(c2, offset);
    api.drawPoints(c1.points, offset);
    api.drawPoints(c2.points, offset);
    api.setColor("lightgrey");
    api.drawLine(c1.points[0], c1.points[1], offset);
    api.drawLine(c1.points[2], c2.points[1], offset);
    api.drawLine(c2.points[2], c2.points[3], offset);
  }
};
