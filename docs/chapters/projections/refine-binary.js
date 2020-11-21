function abs(v) {
  return v<0 ? -v : v;
}

function dist(x1,y1,x2,y2) {
    return ((x1-x2)**2 + (y2-y1)**2) ** 0.5;
}

/*
  We already know that LUT[i1] and LUT[i2] are *not* good distances,
  so we know that a better distance will be somewhere between them.
  We generate three new points between those two, so we end up with
  five points, and then check which three of those five are a new,
  better, interval to check within.
*/
function refineBinary(curve, x, y, LUT, i, targetDistance=0) {
  let q = LUT[i],
    count = 1,
    distance = Number.MAX_SAFE_INTEGER;

  do {
    let i1 = i === 0 ? 0 : i - 1,
        i2 = i === LUT.length - 1 ? LUT.length - 1 : i + 1,
        t1 = LUT[i1].t,
        t2 = LUT[i2].t,
        lut = [],
        step = (t2 - t1) / 5;

    if (step < 0.001) break;

    lut.push(LUT[i1]);
    for (let j = 1; j <= 3; j++) {
      let n = curve.get(t1 + j * step);
      n.distance = abs(dist(n.x, n.y, x, y) - targetDistance);
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

export default refineBinary;
