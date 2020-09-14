let curve;

setup() {
  setPanelCount(3);
  curve = Bezier.defaultQuadratic(this);
  setMovable(curve.points);

  // We're going to 
  setSlider(`.slide-control`, `step`, 25);
}

draw() {
  clear();
  this.drawBasics();
  this.drawPointCurve();
  this.drawInterpolations();
  this.drawCurveCoordinates();
}

/**
 * Draw the basic curve lines (from start to control to end)
 */
drawBasics() {
  setStroke(`black`);
  setFill(`black`);
  curve.drawSkeleton();
  text(`First linear interpolation, spaced ${this.step}% (${Math.floor(99/this.step)} steps)`, {x:5, y:15});

  nextPanel();

  line(0, 0, 0, this.height);
  curve.drawSkeleton();
  text(`Second interpolation, between each generated pair`, {x:5, y:15});

  nextPanel();

  line(0, 0, 0, this.height);
  curve.drawSkeleton();
  text(`Curve points generated this way`, {x:5, y:15});
}

/**
 * To show how each interpolated point fits on the curve,
 * we'll draw the curve not as a straight line, but as a
 * series of points, instead: 
 */
drawPointCurve() {
  setStroke(`lightgrey`);
  for(let i=1, e=50, p; i<=e; i++) {
    p = curve.get(i/e);
    circle(p.x, p.y, 1);
  }
}

/**
 * Draw the iteration in two steps, at an interval determined
 * by our "step" value.
 */
drawInterpolations() {
  for(let i=this.step; i<100; i+=this.step) {
    resetTransform();
    this.setIterationColor(i);
    let [np2, np3] = this.drawFirstInterpolation(curve.points, i);
    let np4 = this.drawSecondInterpolation(np2, np3, i);
    this.drawOnCurve(np4, i);
  }
}

// a little helper function to make iteration points use a colour gradient
setIterationColor(i) {
  let c = `#${(2*i).toString(16)}00${(255 - 2*i).toString(16)}`;
  setFill(c);
  setStroke(`${c}55`);
}

/**
 * The first iteration interpolates between the curve's "outlines"
 */
drawFirstInterpolation(p, i) {
  p = p.map(v => new Vector(v));

  let np2 = p[1].subtract(p[1].subtract(p[0]).scale(1 - i/100));
  circle(np2.x, np2.y, 5);
  text(`${i}%`, np2.add({x:10,y:0}));

  let np3 = p[2].subtract(p[2].subtract(p[1]).scale(1 - i/100));
  circle(np3.x, np3.y, 5);
  text(`${i}%`, np3.add({x:-10,y:-15}));

  return [np2, np3];
}

/**
 * The second iteration interpolates between the first interpolations
 */
drawSecondInterpolation(np2, np3, i) {
  nextPanel();

  line(np2.x, np2.y, np3.x, np3.y);
  circle(np2.x, np2.y, 5);
  circle(np3.x, np3.y, 5);

  let np4 = np3.subtract(np3.subtract(np2).scale(1 - i/100));
  circle(np4.x, np4.y, 2);
  text(`${i}%`, np4.add({x:10,y:10}));

  return np4;
}

/**
 * Draw a point on the curve with its corresponding "ratio" value next to it.
 */
drawOnCurve(np4, i) {
  nextPanel();
  circle(np4.x, np4.y, 2);
  text(`ratio = ${i/100}`, np4.add({x:10,y:15}));
}

/**
 * As a last step, draw the curve's control points, so that it's more
 * obvious where the curve starts and stops, and how the control points work.
 */
drawCurveCoordinates() {
  resetTransform();
  curve.drawPoints();
  nextPanel();
  curve.drawPoints();
  nextPanel();
  curve.drawPoints();
}
