setup() {
    const curve = this.curve = Bezier.defaultCubic(this);
    curve.points[2].x = 210;
    setMovable(curve.points);
}

draw() {
  resetTransform();
  clear();
  const dim = this.height;
  const curve = this.curve;
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  translate(dim, 0);
  setStroke(`black`);
  line(0,0,0,dim);

  scale(0.8, 0.9);
  translate(40,20);
  drawAxes(`t`, 0, 1, `X`, 0, dim, dim, dim);

  new Bezier(this, curve.points.map((p,i) => ({
    x: (i/3) * dim,
    y: p.x
  }))).drawCurve();

  resetTransform();
  translate(2*dim, 0);
  setStroke(`black`);
  line(0,0,0,dim);

  scale(0.8, 0.9);
  translate(40,20);
  drawAxes(`t`, 0,1, `Y`, 0, dim, dim, dim);

  new Bezier(this, curve.points.map((p,i) => ({
    x: (i/3) * dim,
    y: p.y
  }))).drawCurve();
}

onMouseMove() {
  redraw();
}
