let curve;

setup() {
    curve = new Bezier(this, 70,250, 120,15, 20,95, 225,80);
    setMovable(curve.points);
}

draw() {
    clear();

    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    // align our curve and let's do some root finding
    const p = curve.align().points,

          a = p[2].x * p[1].y,
          b = p[3].x * p[1].y,
          c = p[1].x * p[2].y,
          d = p[3].x * p[2].y,

          x = -3*a + 2*b + 3*c - d,
          y = 3*a - b - 3*c,
          z = c - a,

          roots = [];

    // because of floating point maths, we can't check whether
    // x or y "are" zero, because they could be some value that is
    // just off from zero due to floating point compound errors.
    if (approx(x, 0)) {
      if (!approx(y, 0)) {
        roots.push(-z / y);
      }
    }

    else {
        const det = y * y - 4 * x * z,
              sq = sqrt(det),
              d2 = 2 * x;

        if (!approx(d2, 0) ) {
            roots.push(-(y+sq) / d2);
            roots.push((sq-y) / d2);
        }
    }

    // Aaaan let's draw them
    setColor(`red`);
    roots.forEach(t => {
        if (0 <= t && t <= 1) {
           let p = curve.get(t);
           circle(p.x, p.y, 3);
           text(`t=${t.toFixed(2)}`, p.x + 5, p.y + 15);
        }
     });
}
