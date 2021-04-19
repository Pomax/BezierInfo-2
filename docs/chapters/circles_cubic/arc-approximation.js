let curve, w, h, pad = 75, r;

setup() {
  w = this.width;
  h = this.height;
  r = w/2 - pad;
  setSlider(`.slide-control`, `angle`, 1.4);
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

  setColor(`black`);
  this.updateCurve(this.angle);
  curve.drawSkeleton();
  curve.drawCurve();
  curve.points.forEach(p => {
    circle(p.x, p.y, 2);
    text(`(${p.x|0},${p.y|0})`, p.x+5, p.y);
  });
}

updateCurve(angle) {
  const f = 4/3 * tan(angle/4);
  const S =  { x: w/2 + r, y: h/2 };
  const C1 = { x: w/2 + r, y: h/2 + r * f };
  const C2 = {
    x: w/2 + r * (cos(angle) + f * sin(angle)),
    y: h/2 + r * (sin(angle) - f * cos(angle))
  };
  const E = { x: w/2 + r * cos(angle), y: h/2 + r * sin(angle) };
  curve = new Bezier(this, [S, C1, C2, E]);
}
