const utils = Bezier.getUtils();

let Point = Vector, curve, line;

setup() {
  const type = this.parameters.type ?? `quadratic`;
  if (type === `quadratic`) {
    curve = Bezier.defaultQuadratic(this);
    line = [new Point(15,250), new Point(220,20)];
  } else {
    curve = Bezier.defaultCubic(this);
    line = [new Point(25,260), new Point(240,55)];
  }
  setMovable(curve.points, line);
}

draw() {
  clear();

  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  this.drawLine(...line);

  // To find our intersections, we align the curve to our line,
  // so that all we need to do now is find the roots for the curve.
  const [p1, p2] = line;
  const aligned = utils.align(curve.points, {p1,p2});
  const nB = new Bezier(this, aligned);
  const roots = utils.roots(nB.points);
  const coords = roots.map(t => curve.get(t));

  // done: any roots we find are intersections on our original curve.
  if (roots.length) {
    roots.forEach((t,i) => {
      var p = coords[i];
      setColor(`magenta`);
      circle(p.x, p.y, 3);
      setColor(`black`);
      text(`t = ${t.toFixed(2)}`, p.x + 5, p.y + 10);
    });

    setFill(`black`);
    const cval = coords.map(p => `(${p.x|0},${p.y|0})`).join(`, `);
    text(`Intersection${roots.length>=1?`s`:``} at ${cval}`, this.width/2, 15, CENTER);
  }
}

drawLine(p1, p2) {
  setStroke(`black`);
  line(p1.x, p1.y, p2.x, p2.y);
  setStroke(randomColor() );
  circle(p1.x, p1.y, 3);
  circle(p2.x, p2.y, 3);
}
