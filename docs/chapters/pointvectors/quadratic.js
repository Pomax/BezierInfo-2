setup() {
    this.curve = Bezier.defaultQuadratic(this);
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

getNormal(t, d) {
    const q = sqrt(d.x * d.x + d.y * d.y);
    return { x: -d.y / q, y: d.x / q };
}
