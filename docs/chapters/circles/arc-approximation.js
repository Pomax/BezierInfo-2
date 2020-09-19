let curve, w, h, pad = 55, r;

setup() {
    w = this.width;
    h = this.height;
    r = w/2 - pad;
    curve = new Bezier(this,
      { x: w - pad, y: h/2},
      { x: w - pad, y: h/2},
      { x: w - pad, y: h/2}
    );
    setSlider(`.slide-control`, `angle`, -PI/4, v => this.updateCurve(v));
}

draw() {
  clear();
  setColor(`lightgrey`);
  line(0, h/2, w, h/2);
  line(w/2, 0, w/2, h);

  noFill();
  setStroke(`red`);
  circle(w/2, h/2, r);

  noStroke();
  setFill(`rgba(100,255,100,0.4)`);
  let a = this.angle;
  wedge(w/2, h/2, r, a < 0 ? a : 0, a < 0 ? 0 : a);

  curve.drawSkeleton();
  curve.drawCurve();

  setColor(`black`);
  curve.points.forEach(p => {
    circle(p.x, p.y, 2);
    text(`(${p.x|0},${p.y|0})`, p.x+5, p.y);
  });
}

updateCurve(a) {
  let angle = -a;
  let b = (cos(angle) - 1 ) / sin(angle);

  // new control point
  curve.points[1] = {
    x: w/2 + r * (cos(angle) - b * sin(angle) ),
    y: w/2 + r * (sin(angle) + b * cos(angle) )
  };

  // new endpoint
  curve.points[2] = {
    x: w/2 + r * cos(angle),
    y: w/2 + r * sin(angle)
  };

  return angle;
}
