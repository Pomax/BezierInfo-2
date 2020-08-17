setup() {
    this.curve = Bezier.defaultQuadratic(this);
    setMovable(this.curve.points);
}

draw() {
    resetTransform();
    clear();
    const dim = this.height;
    const curve = this.curve;
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    translate(dim, 0);
    setStroke(`black`);
    line(0,0,0,dim);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0, 1, `X`, 0, dim, dim, dim);

    this.plotDimension(dim, new Bezier(this, curve.points.map((p,i) => ({
        x: (i/2) * dim,
        y: p.x
    }))));

    resetTransform();
    translate(2*dim, 0);
    setStroke(`black`);
    line(0,0,0,dim);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0,1, `Y`, 0, dim, dim, dim);

    this.plotDimension(dim, new Bezier(this, curve.points.map((p,i) => ({
      x: (i/2) * dim,
      y: p.y
    }))))
}

plotDimension(dim, dimension) {
    cacheStyle();
    dimension.drawCurve();

    setFill(`red`);
    setStroke(`red)`);

    // There are three possible extrema: t=0, t=1, and
    // the t value that solves B'(t)=0, provided that
    // value is between 0 and 1. But of those three,
    // only two will be real extrema (one minimum value,
    // and one maximum value)

    // First we compute the "simple" cases:
    let t1 = 0; let y1 = dimension.get(t1).y;
    let t2 = 1; let y2 = dimension.get(t2).y;

    // We assume y1 < y2, but is that actually true?
    let reverse = (y2 < y1);

    // Is there a solution for B'(t) = 0?
    let dpoints = dimension.dpoints[0];
    let a = dpoints[1].y - dpoints[0].y;
    let b = dpoints[0].y;
    let t3 = -b / a;

    // Is that solution a value in [0,1]?
    if (t3 > 0 && t3 < 1) {
        // It is, so we have either a new minimum value
        // or new maximum value:
        let dp = dimension.get(t3);
        if (reverse) {
            if (dp.y < y2) { t2 = t3; y2 = dp.y; }
            if (dp.y > y1) { t1 = t3; y1 = dp.y; }
        } else {
            if (dp.y < y1) { t1 = t3; y1 = dp.y; }
            if (dp.y > y2) { t2 = t3; y2 = dp.y; }
        }
    }

    // Done, show our extrema:
    circle(t1 * dim, y1, 3);
    text(`t = ${t1.toFixed(2)}`, map(t1, 0,1, 15,dim-15), y1 + 25);
    circle(t2 * dim, y2, 3);
    text(`t = ${t2.toFixed(2)}`, map(t2, 0,1, 15,dim-15), y2 + 25);
    restoreStyle();
}

onMouseMove() {
    redraw();
}
