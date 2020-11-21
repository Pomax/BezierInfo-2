import refineBinary from "./refine-binary.js";

let curve;

setup() {
  curve = new Bezier(this, [
    {x:288,y:218},
    {x:258,y:334},
    {x:85,y:330},
    {x:52,y:276},
    {x:54,y:122},
    {x:216,y:217},
    {x:261,y:130},
    {x:58,y:196},
    {x:84,y:97},
    {x:238,y:58}
  ]);

  this.cursor.x = 280;
  this.cursor.y = 265

  setMovable(curve.points);
}

draw() {
  clear();
  curve.drawSkeleton(`lightblue`);
  curve.drawCurve();
  curve.drawPoints();

  if (this.currentPoint) return;

  const x = this.cursor.x,
        y = this.cursor.y,
        LUT = curve.getLUT(20),
        i = this.findClosest(x, y, LUT);

  this.showCandidateInterval(x, y, LUT, i);
  this.drawProjection(x, y, LUT, i);
}

findClosest(x, y, LUT, distance = Number.MAX_SAFE_INTEGER) {
  let i = 0;
  LUT.forEach((p, index) => {
    p.t = index/(LUT.length-1);
    p.distance = dist(x, y, p.x, p.y);
    if (p.distance < distance) {
      distance = p.distance;
      i = index;
    }
  });
  return i;
}

showCandidateInterval(x, y, LUT, i) {
  let c = LUT[i];
  setColor(`rgba(100,255,100)`);
  circle(c.x, c.y, 3);
  line(c.x, c.y, x, y);
  if (i>0) { c = LUT[i-1]; circle(c.x, c.y, 3); line(c.x, c.y, x, y); }
  if (i<LUT.length-1) { c = LUT[i+1]; circle(c.x, c.y, 3); line(c.x, c.y, x, y); }
  c = LUT[i];
}

drawProjection(x, y, LUT, i) {
  let B = refineBinary(curve, x, y, LUT, i);
  setColor(`rgba(100,100,255)`);
  circle(B.x, B.y, 3);
  line(B.x, B.y, x, y);
}

onMouseMove() {
  redraw();
}
