let curve;

setup() {
  let type = this.parameters.type ?? `quadratic`;
  if (type === `quadratic`) {
      curve = Bezier.defaultQuadratic(this);
  } else {
      curve = Bezier.defaultCubic(this);
      curve.points[2].x = 210;
  }
  setMovable(curve.points);
}

draw() {
  clear();
  const dim = this.height;
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  translate(dim, 0);
  setStroke(`black`);
  line(0,0,0,dim);

  scale(0.8, 0.9);
  translate(40,20);
  drawAxes(`t`, 0, 1, `X`, 0, dim, dim, dim);

  let pcount = curve.points.length;
  new Bezier(this, curve.points.map((p,i) => ({
    x: (i/(pcount-1)) * dim,
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
    x: (i/(pcount-1)) * dim,
    y: p.y
  }))).drawCurve();
}
