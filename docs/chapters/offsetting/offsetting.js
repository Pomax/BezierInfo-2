let curve;

setup() {
  const type  = this.parameters.type ?? `quadratic`;
  if (type === `quadratic`) {
    curve = Bezier.defaultQuadratic(this);
  } else {
    curve = Bezier.defaultCubic(this);
  }
  setMovable(curve.points);
  setSlider(`.slide-control`, `distance`, 20);
}

draw() {
  clear();
  noFill();

  curve.drawSkeleton();

  // First, reduce our curves into a set of simple sections
  var reduced = this.reduce(curve);
  reduced.forEach(c => {
    setStroke(randomColor() );
    this.drawCurve(c);
    circle(c.points[0].x, c.points[0].y, 2);
  });

  var last = reduced.slice(-1)[0];
  let p = last.points[3] ?? last.points[2];
  circle(p.x, p.y, 3);

  // then, we can offset each simple curve by projective scaling
  setStroke(`#FF000050`);
  var offset = curve.offset(this.distance);
  offset.forEach(c => {
    circle(c.points[0].x, c.points[0].y, 2);
    this.drawCurve(c);
  });

  last = offset.slice(-1)[0];
  p = last.points[3] ?? last.points[2];
  circle(p.x, p.y, 3);

  // on both sides, so we need to offset by -distance, too.
  setStroke(`#0000FF50`);
  var offset = curve.offset(-this.distance);
  offset.forEach(c => {
    circle(c.points[0].x, c.points[0].y, 2);
    this.drawCurve(c);
  });

  last = offset.slice(-1)[0];
  p = last.points[3] ?? last.points[2];
  circle(p.x, p.y, 3);

  curve.drawPoints();
}

drawCurve(c) {
  start()
  c.getLUT(16).forEach(p => vertex(p.x, p.y));
  end();
}

reduce(curve) {
  let i,
    t1 = 0,
    t2 = 0,
    step = 0.01,
    segment,
    pass1 = [],
    pass2 = [];

  // first pass: split on extrema
  let extrema = curve.extrema().values;
  if (extrema.indexOf(0) === -1) {
    extrema = [0].concat(extrema);
  }
  if (extrema.indexOf(1) === -1) {
    extrema.push(1);
  }
  for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
    t2 = extrema[i];
    segment = curve.split(t1, t2);
    segment._t1 = t1;
    segment._t2 = t2;
    pass1.push(segment);
    t1 = t2;
  }

  // second pass: further reduce these segments to simple segments
  pass1.forEach(p1 => {
    t1 = 0;
    t2 = 0;
    while (t2 <= 1) {
      for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
        segment = p1.split(t1, t2);
        if (!segment.simple()) {
          t2 -= step;
          if (abs(t1 - t2) < step) {
            // we can never form a reduction
            return [];
          }
          segment = p1.split(t1, t2);
          segment._t1 = map(t1, 0, 1, p1._t1, p1._t2);
          segment._t2 = map(t2, 0, 1, p1._t1, p1._t2);
          pass2.push(segment);
          t1 = t2;
          break;
        }
      }
    }
    if (t1 < 1) {
      segment = p1.split(t1, 1);
      segment._t1 = map(t1, 0, 1, p1._t1, p1._t2);
      segment._t2 = p1._t2;
      pass2.push(segment);
    }
  });

  return pass2;
}

// TODO: duplicate the offset code from utils.js? It's *a lot* of code, though...
