import refineBinary from "../projections/refine-binary.js";

let curve;

setup() {
  curve = Bezier.defaultCubic(this);
  setMovable(curve.points);
  setSlider(`.slide-control`, `radius`, 70);
}

draw() {
  clear();
  curve.drawSkeleton(`lightblue`);
  curve.drawCurve();
  curve.drawPoints();

  noFill();
  let x = this.width/2;
  let y = this.height/2;

  // Find all the circle intersections for this curve:
  let LUT = curve.getLUT(100);
  let start = 0, count = 0;
  let values = [];

  // never use while(true)
  while(++count < 25) {
    let i = start + this.findClosest(
      x, y, LUT.slice(start),
      // We also want the previous two distances, which either don't
      // exist because we're starting at 0, or they exist because they
      // were computed in the previous findClosest() call.
      LUT[start-2]?.distance,
      LUT[start-1]?.distance
    );
    if (i < start) break;
    if (i>0 && i === start) break;
    values.push(i);
    start = i + 2; // We need to add 2, because findClosest already tells us that i+1 cannot be a viable candidate.
  }

  // Draw a convenience marker for our circle center
  setStroke(`black`);
  line(x-10,y,x+10,y);
  line(x,y-10,x,y+10);

  // Then draw our circle, and all intersections
  setStroke(values.length ? `green` : `red`);
  circle(x, y, this.radius);
  values.forEach(i => this.drawProjection(x, y, LUT, i));
}

// We want to find the "locally closest" points, rather than
// the globally closest point, so we don't run a blind .forEach
// as in the projection graphic, but instead find a value of i
// such that the distance for [i-1] and [i+1] are both bigger
// than for [i], signalling a local minimum.
findClosest(x, y, LUT, pd2, pd1, distanceEpsilon = 5) {
  let distance = Number.MAX_SAFE_INTEGER,
    prevDistance2 = pd2 || distance,
    prevDistance1 = pd1 || distance,
    i = -1;

  for(let index=0, e=LUT.length; index<e; index++) {
    let p = LUT[index];
    p.distance = abs(dist(x, y, p.x, p.y) - this.radius);

    // Realistically, there's only going to be an intersection if
    // the distance to the circle center is already approximately
    // the circle's radius.
    if (prevDistance1 < distanceEpsilon && prevDistance2 > prevDistance1 && prevDistance1 < p.distance) {
      i = index - 1;
      break;
    }

    if (p.distance < distance) {
      distance = p.distance;
    }

    prevDistance2 = prevDistance1;
    prevDistance1 = p.distance;
  }

  return i;
}

drawProjection(x, y, LUT, i) {
  let B = refineBinary(curve, x, y, LUT, i, this.radius);

  // Our initial guess might actually not be close enough,
  // so it's possible that after binary refining, it turns
  // out the local minimum is actually still too far away
  // to count. In that case B will be undefined, so we need
  // to make sure to check before we draw it.

  if (B) {
    setColor(`rgba(100,100,255)`);
    circle(B.x, B.y, 3);
    line(B.x, B.y, x, y);
  }
}

onMouseMove() {
  redraw();
}
