let curve;

setup() {
  curve = new Bezier(this, 90, 200, 25, 100, 220, 40, 210, 240);
  setMovable(curve.points);
  setSlider(`.slide-control`, `position`, 0);
}

draw() {
  clear();
  curve.drawSkeleton();
  curve.drawCurve();

  noFill();
  setStroke("rgb(200,100,100)");

  const t = this.position;
  if (0 < t && t < 1) {
    this.drawStruts(t);
  }

  curve.drawPoints();

  if (0 < t && t < 1) {
    const p = curve.get(t);
    circle(p.x, p.y, 5);

    const perc = (t*100)|0;
    const rt = perc/100;
    text(`Sequential interpolation for ${perc}% (t=${rt})`, 10, 15);
  }
}

drawStruts(t) {
  // get all the "de Casteljau" points
  const p = curve.getStrutPoints(t);

  // and then draw them
  let s = curve.points.length;
  let n = curve.points.length;
  while (--n > 1) {
    start();
    for (let i = 0; i < n; i++) {
      let pt = p[s + i];
      vertex(pt.x, pt.y);
      circle(pt.x, pt.y, 5);
    }
    end();
    s += n;
  }
}

getStrutPoints(t) {
  const mt = 1 - t;

  // run de Casteljau's algorithm, starting with the base points
  const points = curve.points.map((p) => new Vector(p));

  let s = 0;
  let n = p.length + 1;

  // Every iteration will interpolate between `n` points,
  // as well as decrease that `n` by one. So 4 points yield
  // 3 new points, which yield 2 new points, which yields 1
  // final point that is our on-curve point for `t`
  while (--n > 1) {
    let list = points.slice(s, s + n);
    for (let i = 0, e = list.length - 1; i < e; i++) {
      let pt = list[i + 1].subtract(list[i + 1].subtract(list[i]).scale(mt));
      points.push(pt);
    }
    s += n;
  }

  return points;
}

onMouseMove() {
  redraw();
}
