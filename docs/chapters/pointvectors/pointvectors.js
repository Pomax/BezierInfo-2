let curve;

setup() {
    const type = this.type = this.parameters.type ?? `quadratic`;
    if (type === `quadratic`) {
        curve = Bezier.defaultQuadratic(this);
    } else {
        curve = Bezier.defaultCubic(this);
        // to show this off for Cubic curves we need to change some of the points
        curve.points[0].x = 30;
        curve.points[0].y = 230;
        curve.points[1].x = 75;
        curve.points[1].y = 50;
    }
    setMovable(curve.points);
}

draw() {
    clear();
    curve.drawSkeleton();

    const pts = curve.points;
    const f = 15;

    for(let i=0; i<=10; i++) {
        let t = i/10.0;
        let p = curve.get(t);
        let d = this.type === `quadratic` ? this.getQuadraticDerivative(t, pts) : this.getCubicDerivative(t, pts);
        this.drawVectors(f, t, p, d);
    }

    curve.drawPoints();
}

drawVectors(f, t, p, d) {
    let m = sqrt(d.x*d.x + d.y*d.y);
    d = { x: d.x/m, y: d.y/m };
    let n = this.getNormal(t, d);

    // draw the tangent vector
    setStroke(`blue`);
    line(p.x, p.y, p.x + d.x*f, p.y + d.y*f);

    // draw the normal vector
    setStroke(`red`);
    line(p.x, p.y, p.x + n.x*f, p.y + n.y*f);

    // and the point these are for
    setStroke(`black`);
    circle(p.x, p.y, 3);
}

getQuadraticDerivative(t, points) {
    let mt = (1 - t), d = [
        {
            x: 2 * (points[1].x - points[0].x),
            y: 2 * (points[1].y - points[0].y)
        },
        {
            x: 2 * (points[2].x - points[1].x),
            y: 2 * (points[2].y - points[1].y)
        }
    ];

    return {
        x: mt * d[0].x + t * d[1].x,
        y: mt * d[0].y + t * d[1].y
    };
}

getCubicDerivative(t, points) {
    let mt = (1 - t), a = mt*mt, b = 2*mt*t, c = t*t, d = [
        {
            x: 3 * (points[1].x - points[0].x),
            y: 3 * (points[1].y - points[0].y)
        },
        {
            x: 3 * (points[2].x - points[1].x),
            y: 3 * (points[2].y - points[1].y)
        },
        {
            x: 3 * (points[3].x - points[2].x),
            y: 3 * (points[3].y - points[2].y)
        }
    ];

    return {
        x: a * d[0].x + b * d[1].x + c * d[2].x,
        y: a * d[0].y + b * d[1].y + c * d[2].y
    };
}

getNormal(t, d) {
    const q = sqrt(d.x * d.x + d.y * d.y);
    return { x: -d.y / q, y: d.x / q };
}
