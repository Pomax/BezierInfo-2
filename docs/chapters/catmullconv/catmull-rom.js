let points, knots;

setup() {
    points = [
        {x:38,y:136},
        {x:65,y:89},
        {x:99,y:178},
        {x:149,y:93},
        {x:191,y:163},
        {x:227,y:122},
        {x:251,y:132}
    ];
    setMovable(points);
    knots = [0, 1/3, 2/3, 1];
    setSlider(`.slide-control.tension`, `tension`, 0.5, v => this.transformTension(v));
}

transformTension(v) {
    return (v < 0.5) ? 1 / map(v, 0.5,0, 1,10) : map(v, 0.5,1, 1,10);
}

draw() {
    clear();

    const p = points, n = points.length;
    for (let i=1, e=n-2; i<e; i++) {
        this.dragSegment(
            p[i - 1], // used for tangent
            p[i + 0], // "current" point
            p[i + 1], // "next" point
            p[i + 2]  // used for tangent
        );
    }

    setLineDash(4,2);
    setStroke(`lightblue`);
    line(p[0].x, p[0].y, p[1].x, p[1].y);
    line(p[n-1].x, p[n-1].y, p[n-2].x, p[n-2].y);
    noLineDash();

    points.forEach(p => {
        setColor(randomColor());
        circle(p.x, p.y, 3);
    });
}

dragSegment(p0, p1, p2, p3) {
    const s = 2 * this.tension,
          m1 = {
            x: (p2.x - p0.x) / s,
            y: (p2.y - p0.y) / s
          },
          m2 = {
            x: (p3.x - p1.x) / s,
            y: (p3.y - p1.y) / s
          };

    noFill();
    setStroke(randomColor() );

    start();
    this.addCoordinate(0, p1, p2, m1, m2);
    for(let s=0.01, t=s; t<1; t+=0.01) this.addCoordinate(t, p1, p2, m1, m2);
    this.addCoordinate(1, p1, p2, m1, m2);
    end();
}

addCoordinate(t, p0, p1, m0, m1) {
    // See https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Unit_interval_(0,_1)
    let c = 2*t**3 - 3*t**2,
        c0 = c + 1,
        c1 = t**3 - 2*t**2 + t,
        c2 = -c,
        c3 = t**3 - t**2;

    vertex(
        c0 * p0.x + c1 * m0.x + c2 * p1.x + c3 * m1.x,
        c0 * p0.y + c1 * m0.y + c2 * p1.y + c3 * m1.y
    )
}

onMouseDown() {
    if (!this.currentPoint) {
        let {x, y} = this.cursor;
        points.push({ x, y });
        resetMovable(points);
        redraw();
    }
}
