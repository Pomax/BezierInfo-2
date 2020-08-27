let curve;

setup() {
    const type = this.parameters.type ?? `quadratic`;
    curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    setMovable(curve.points);
}

draw() {
    clear();
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    let translated = this.translatePoints(curve.points);
    let rotated = this.rotatePoints(translated);
    let rtcurve = new Bezier(this, rotated);
    let extrema = rtcurve.extrema();

    let minx = Number.MAX_SAFE_INTEGER,
        miny = minx,
        maxx = Number.MIN_SAFE_INTEGER,
        maxy = maxx;

    setStroke(`red`);

    [0, ...extrema.x, ...extrema.y, 1].forEach(t => {
        let p = curve.get(t);
        let rtp = rtcurve.get(t);
        if (rtp.x < minx) minx = rtp.x;
        if (rtp.x > maxx) maxx = rtp.x;
        if (rtp.y < miny) miny = rtp.y;
        if (rtp.y > maxy) maxy = rtp.y;
        if (t > 0 && t< 1) circle(p.x, p.y, 3);
    });

    noFill();
    setStroke(`#0F0`);

    let tx = curve.points[0].x;
    let ty = curve.points[0].y;
    let a = rotated[0].a;

    start();
    vertex(tx + minx * cos(a) - miny * sin(a), ty + minx * sin(a) + miny * cos(a));
    vertex(tx + maxx * cos(a) - miny * sin(a), ty + maxx * sin(a) + miny * cos(a));
    vertex(tx + maxx * cos(a) - maxy * sin(a), ty + maxx * sin(a) + maxy * cos(a));
    vertex(tx + minx * cos(a) - maxy * sin(a), ty + minx * sin(a) + maxy * cos(a));
    end(true);
}

translatePoints(points) {
    // translate to (0,0)
    let m = points[0];
    return points.map(v => {
        return {
            x: v.x - m.x,
            y: v.y - m.y
        }
    });
}

rotatePoints(points) {
    // rotate so that last point is (...,0)
    let last = points.length - 1;
    let dx = points[last].x;
    let dy = points[last].y;
    let a = atan2(dy, dx);
    return points.map(v => {
        return {
            a: a,
            x: v.x * cos(-a) - v.y * sin(-a),
            y: v.x * sin(-a) + v.y * cos(-a)
        };
    });
}
