setup() {
  this.curve = new Bezier(this, 20, 250, 30, 20, 200, 250, 220, 20);
  setMovable(this.curve.points);
  setSlider(`.slide-control`, `position`, 0.5);
}

draw() {
  resetTransform();
  clear();
  const curve = this.curve;

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

onMouseMove() {
  if (this.cursor.down) {
    redraw();
  }
}

/*
whatdoesthisdo() {
  clear();
  this.curve.drawSkeleton(curve);
  this.curve.drawCurve(curve);
  let w = this.height;
  let h = this.height;
  let bbox = this.curve.bbox();
  let x = this.cursor.x;

  if (bbox.x.min < x && x < bbox.x.max) {
    setStroke("red");

    // The root finder is based on normal x/y coordinates,
    // so we can "trick" it by giving it "t" values as x
    // values, and "x" values as y values. Since it won't
    // even look at the x dimension, we can also just leave it.
    let roots = api.utils.roots(curve.points.map(v => {
      return { x: v.x, y: v.x-x};
    }));
    roots = roots.filter(t => t>=0 && t<=1.0);
    let t = roots[0];

    let p = this.curve.get(t);
    line({ x: p.x, y: p.y }, { x: p.x, y: h });
    line({ x: p.x, y: p.y }, { x: 0, y: p.y });
    text(`y=${p.y|0}`, { x: p.x/2, y: p.y - 5 });
    text(`x=${p.x|0}`, { x: x + 5, y: h - (h-p.y)/2 });
    text(`t=${((t*100)|0)/100}`, { x: x + 15, y: p.y });
  }
}
*/