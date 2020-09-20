let curve;

setup() {
  setPanelCount(3);

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
  let pcount = curve.points.length;
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  nextPanel();
  this.drawComponentX(dim, pcount);

  resetTransform();
  nextPanel();
  nextPanel();
  this.drawComponentY(dim, pcount);
}

drawComponentX(dim, pcount) {
  setStroke(`black`);
  line(0,0,0,dim);

  scale(0.8, 0.9);
  translate(40,20);
  drawAxes(`t`, 0, 1, `X`, 0, dim, dim, dim);

  // remap our curve so that y becomes our x
  // coordinates, and x becomes the t intervals.
  new Bezier(this, curve.points.map((p,i) => ({
    x: (i/(pcount-1)) * dim,
    y: p.x
  }))).drawCurve();
}

drawComponentY(dim, pcount) {
  setStroke(`black`);
  line(0,0,0,dim);

  scale(0.8, 0.9);
  translate(40,20);
  drawAxes(`t`, 0,1, `Y`, 0, dim, dim, dim);

  // remap our curve, leaving y as is, but
  // making  x be the t intervals.
  new Bezier(this, curve.points.map((p,i) => ({
    x: (i/(pcount-1)) * dim,
    y: p.y
  }))).drawCurve();
}
