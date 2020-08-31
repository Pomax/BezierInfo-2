let curve;

setup() {
  curve = new Bezier(this, 20, 250, 30, 20, 200, 250, 220, 20);
  setMovable(curve.points);
  setSlider(`.slide-control`, `position`, 0.5);
}

draw() {
  clear();

  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  let w = this.height;
  let h = this.height;

  let bbox = curve.bbox();
  let x = bbox.x.min + (bbox.x.max - bbox.x.min) * this.position;

  if (bbox.x.min < x && x < bbox.x.max) {
    setStroke("red");
    line(x,0,x,h);
    text(`x=${x | 0}`, x + 5, h - 30);
  }

  translate(w, 0);

  setStroke("black");
  line(0,0,0,h);

  // draw x = t(x)
  line(0, h-20, w, h-20);
  text('0', 10, h-10);
  text('⅓', 10 + (w-10)/3, h-10);
  text('⅔', 10 + 2*(w-10)/3, h-10);
  text('1', w-10, h-10);
  let p, s = { x: 0, y: h - curve.get(0).x };

  for (let step = 0.02, t = step; t < 1 + step; t += step) {
    p = {x: t * w, y: h - curve.get(t).x };
    line(s.x, s.y, p.x, p.y);
    s = p;
  }

  setStroke("black");
  text("↑\nx", 10, h/2);
  text("t →", w/2, h-10);

  if (bbox.x.min < x && x < bbox.x.max) {
    setStroke("red");
    line(0, h-x, w, h-x);
  }
}
