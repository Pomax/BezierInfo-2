setup() {
    this.curve = Bezier.defaultCubic(this);
    setMovable(this.curve.points);
}

draw() {
    clear();
    const curve = this.curve;
    curve.drawSkeleton();
    const pts = curve.points;
    const f = 15;

    for(let i=0; i<=10; i++) {
        let t = i/10.0;
        let p = curve.get(t);
        let d = this.getDerivative(t, pts);

        let m = sqrt(d.x*d.x + d.y*d.y);
        d = { x: d.x/m, y: d.y/m };
        let n = this.getNormal(t, d);

        setStroke(`blue`);
        line(p.x, p.y, p.x + d.x*f, p.y + d.y*f);

        setStroke(`red`);
        line(p.x, p.y, p.x + n.x*f, p.y + n.y*f);

        setStroke(`purple`);
        line(p.x, p.y, p.x - n.x*f, p.y - n.y*f);

        setStroke(`black`);
        circle(p.x, p.y, 3);
    }

    curve.drawPoints();
}

getDerivative(t, points) {
    let mt = (1 - t), a = mt*mt, b = mt*t, c = t*t, d = [
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
