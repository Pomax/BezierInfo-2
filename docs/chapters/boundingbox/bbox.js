let curve;

setup() {
    let type = this.parameters.type ?? `quadratic`;
    if (type === `quadratic`) {
        curve = Bezier.defaultQuadratic(this);
    } else {
        curve = Bezier.defaultCubic(this);
        curve.points[2].x = 210;
    }
    setMovable(curve.points);
}

draw() {
    clear();

    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    // Start with complete nonsense min/max values, where
    // min is huge and max is tiny, so we can bring them
    // down and up, respectively.

    let minx = Number.MAX_SAFE_INTEGER,
        miny = minx,
        maxx = Number.MIN_SAFE_INTEGER,
        maxy = maxx,
        extrema = curve.extrema();

    noFill();
    setStroke(`red`);

    // For each extremum, see if that changes the bbox values.
    [0, ...extrema.x, ...extrema.y, 1].forEach(t => {
        let p = curve.get(t);
        if (p.x < minx) minx = p.x;
        if (p.x > maxx) maxx = p.x;
        if (p.y < miny) miny = p.y;
        if (p.y > maxy) maxy = p.y;
        if (t > 0 && t< 1) circle(p.x, p.y, 3);
    });

    // And we're done.
    setStroke(`#0F0`);
    rect(minx, miny, maxx - minx, maxy - miny);
}
