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
  let B = this.refineBinary(x, y, LUT, i);
  setColor(`rgba(100,100,255)`);
  circle(B.x, B.y, 3);
  line(B.x, B.y, x, y);
}

/*
  We already know that LUT[i1] and LUT[i2] are *not* good distances,
  so we know that a better distance will be somewhere between them.
  We generate three new points between those two, so we end up with
  five points, and then check which three of those five are a new,
  better, interval to check within.
*/
refineBinary(x, y, LUT, i) {
  let q, count=1, distance = Number.MAX_SAFE_INTEGER;

  do {
    let i1 = i === 0 ? 0 : i-1,
        i2 = i === LUT.length - 1 ? LUT.length -1 : i+1,
        t1 = LUT[i1].t,
        t2 = LUT[i2].t,
        lut = [],
        step = (t2 - t1)/5;

    if (step < 0.001) break;

    lut.push(LUT[i1]);
    for(let j=1; j<=3; j++) {
      let n = curve.get(t1 + j *step);
      n.distance = dist(n.x, n.y, x, y);
      if (n.distance < distance) {
        distance = n.distance;
        q = n;
        i = j;
      }
      lut.push(n);
    }
    lut.push(LUT[i2]);

    // update the LUT to be our new five point LUT, and run again.
    LUT = lut;

    // The "count" test is mostly a safety measure: it will
    // never kick in, but something that _will_ terminate is
    // always better than while(true). Never use while(true)
  } while (count++ < 25);

  return q;
}

onMouseMove() {
  redraw();
}
