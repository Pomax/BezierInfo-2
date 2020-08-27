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

    const p = curve.align().points,

          a = p[2].x * p[1].y,
          b = p[3].x * p[1].y,
          c = p[1].x * p[2].y,
          d = p[3].x * p[2].y,

          x = -3*a + 2*b + 3*c - d,
          y = 3*a - b - 3*c,
          z = c - a,

          roots = [];

    if (this.almost(x, 0) ) {
      if (!this.almost(y, 0) ) {
        roots.push(-z / y);
      }
    }

    else {
        const det = y * y - 4 * x * z,
              sq = sqrt(det),
              d2 = 2 * x;

        if (!this.almost(d2, 0) ) {
            roots.push(-(y+sq) / d2);
            roots.push((sq-y) / d2);
        }
    }

    setStroke(`red`);
    setFill(`red`);

    roots.forEach(t => {
        if (0 <= t && t <= 1) {
           let p = curve.get(t);
           circle(p.x, p.y, 3);
           text(`t=${t.toFixed(2)}`, p.x + 5, p.y + 15);
        }
     });
}

almost(v1, v2, epsilon=0.00001) {
    return abs(v1 - v2) < epsilon;
}
