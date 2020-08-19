setup() {
    this.curve = Bezier.defaultQuadratic(this);
    setMovable(this.curve.points);
}

draw() {
    clear();
    const curve = this.curve;
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    noFill();

    let minx = Number.MAX_SAFE_INTEGER,
        miny = minx,
        maxx = Number.MIN_SAFE_INTEGER,
        maxy = maxx;

    setStroke(`red`);

    let extrema = curve.extrema();

    [0, ...extrema.x, ...extrema.y, 1].forEach(t => {
        let p = curve.get(t);
        if (p.x < minx) minx = p.x;
        if (p.x > maxx) maxx = p.x;
        if (p.y < miny) miny = p.y;
        if (p.y > maxy) maxy = p.y;
        if (t > 0 && t< 1) circle(p.x, p.y, 3);
    });

    setStroke(`#0F0`);
    rect(minx, miny, maxx - minx, maxy - miny);
}

onMouseMove() {
    redraw();
}
