let points=[], knots;

setup() {
  for (let s=TAU/9, i=s/2; i<TAU; i+=s) {
    points.push({
      x: this.width/2 + 100 * Math.cos(i),
      y: this.height/2 + 100 * Math.sin(i)
    });
  }
  setMovable(points);

  knots = new BSpline(this, points).formKnots(!!this.parameters.open);
  let min=0, max=knots.length-1;
  knots.forEach((_,i) => {
    addSlider(`slide-control`, `!knot ${i+1}`, min, max, 0.01, knots[i], v => this.setKnotValue(i, v));
  });
}

setKnotValue(i, v) {
  if (i>0 && v < knots[i-1]) throw {value: knots[i-1]};
  if (i<knots.length-1 && v > knots[i+1]) throw {value: knots[i+1]};
  knots[i] = v;
  redraw();
}

draw() {
  clear();

  setStroke(`#CC00CC99`);
  for (let i=0, e=points.length-1, p, n; i<e; i++) {
    p = points[i];
    n = points[i+1];
    line(p.x, p.y, n.x, n.y);
  }

  setColor(`black`);
  points.forEach(p => circle(p.x, p.y, 3));

  this.drawSplineData();
}

drawSplineData() {
  const spline = new BSpline(this, points);
  spline.knots = knots;

  noFill();
  setStroke(`black`);
  start();
  spline.getLUT((points.length - 3) * 20).forEach(p => vertex(p.x, p.y));
  end();
}
