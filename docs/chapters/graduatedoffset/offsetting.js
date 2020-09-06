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
  curve.drawCurve(`lightblue`);
  this.outline(curve, this.distance).forEach(c => this.drawCurve(c));
  curve.drawPoints();
};

drawCurve(c) {
  setStroke(randomColor() );
  start()
  c.getLUT(16).forEach(p => vertex(p.x, p.y));
  end();
}

outline(curve, d) {
  const reduced = curve.reduce(),
        fcurves = [];

  let bcurves = [],
      alen = 0,
      tlen = curve.length();

  // form curve oulines
  reduced.forEach(segment => {
    let slen = segment.length();
    fcurves.push(segment.scale(this.linearDistanceFunction(d, tlen, alen, slen)));
    bcurves.push(segment.scale(this.linearDistanceFunction(-d, tlen, alen, slen)));
    alen += slen;
  });

  // reverse the "return" outline
  bcurves = bcurves
    .map(s => {
      s.points = s.points.reverse();
      return s;
    })
    .reverse();

  return [...fcurves, ...bcurves];
}

linearDistanceFunction(d, tlen, alen, slen)  {
  return v => {
    const f1 = alen / tlen,
          f2 = (alen + slen) / tlen;
    return map(v, 0, 1, f1 * d, f2 * d);
  };
}
