let q, c;

setup() {
  q = new Bezier(this, 60,55, 125,160, 365,165);
  c = new Bezier(this, 385,165, 645,165, 645,70, 750,165);
  if (this.parameters.omni) {
    setSlider(`.slide-control`, `position`, 0);
  }
  setMovable(q.points.concat(c.points));
}

draw() {
  clear();

  [q, c].forEach(curve => {
    curve.drawSkeleton();
    curve.drawCurve();
    this.drawCurvature(curve);
    curve.drawPoints();
  });

  if (this.parameters.omni) {
    let t = this.position;
    let curve = q;
    if (t>1) { t -= 1; curve = c; }
    this.drawIncidentCircle(curve, t)
  }
}

drawCurvature(curve) {
  let s, t, p, n, k, ox, oy;
  for(s=0; s<256; s++) {
    setStroke(`rgba(255,127,${s},0.6)`);
    t = s/255;
    p = curve.get(t);
    n = curve.normal(t);
    k = this.computeCurvature(curve, t) * 10000;

    ox = k * n.x;
    oy = k * n.y;
    line(p.x, p.y, p.x + ox, p.y + oy);

    // And if requested, also draw it along the anti-normal.
    if (this.parameters.omni) {
      setStroke(`rgba(${s},127,255,0.6)`);
      line(p.x, p.y, p.x - ox, p.y - oy);
    }
  }
}

computeCurvature(curve, t) {
  const d = curve.derivative(t),
        dd = curve.dderivative(t),
        num = d.x * dd.y - d.y * dd.x,
        qdsum = d.x * d.x + d.y * d.y,
        dnm = qdsum ** 3/2;

  if (num === 0 || dnm === 0) return 0;

  return num / dnm;
}

drawIncidentCircle(curve, t) {
  let p = curve.get(t),
      n = curve.normal(t),
      k = this.computeCurvature(curve, t),
      r = 1 / k,
      rx = p.x + n.x * r,
      ry = p.y + n.y * r;

  setFill(`rgba(200,200,255,0.4)`);
  setStroke(`red`);

  line(p.x, p.y, rx, ry);
  circle(p.x, p.y, 3);
  circle(rx, ry, 3);
  circle(rx, ry, abs(r));
}
