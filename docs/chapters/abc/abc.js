let curve, utils = Bezier.getUtils();

setup() {
    const type = this.parameters.type ?? `quadratic`;
    curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    curve.points.forEach(p => p.y -= 20);
    setMovable(curve.points);
    setSlider(`.slide-control`, `position`, 0.5);
}


/**
 * The master draw function for the `projection` sketches
 */
draw() {
    clear();
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    const t = this.position;
    const p = curve.get(t);

    setStroke(`black`);
    circle(p.x, p.y, 2);

    // find the A/B/C values as described in the section text
    const hull = curve.drawStruts(t, `lightblue`);
    let A, B, C;

    setStroke(`lightgrey`);
    if(hull.length === 6) {
        A = curve.points[1];
        B = hull[5];
        let p1 = curve.points[0];
        let p2 = curve.points[2];
        C = utils.lli4(A, B, p1, p2);
        line(p1.x, p1.y, p2.x, p2.y);
    } else if(hull.length === 10) {
        A = hull[5];
        B = hull[9];
        let p1 = curve.points[0];
        let p2 = curve.points[3];
        C = utils.lli4(A, B, p1, p2);
        line(p1.x, p1.y, p2.x, p2.y);
    }

    this.drawABCdata(t, A, B, C);
}

drawABCdata(t, A, B, C) {
    // show the lines between the A/B/C values
    setStroke(`#00FF00`);
    line(A.x, A.y, B.x, B.y);
    setStroke(`red`);
    line(B.x, B.y, C.x, C.y);
    setStroke(`black`);
    circle(C.x, C.y, 3);

    // with their associated labels
    setFill(`black`);
    text(`A`, 10 + A.x, A.y);
    text(`B (t = ${t.toFixed(2)})`, 10 + B.x, B.y);
    text(`C`, 10 + C.x, C.y);

    // and show the distance ratio, which we see does not change irrespective of whether A/B/C change.
    const d1 = dist(A.x, A.y, B.x, B.y);
    const d2 = dist(B.x, B.y, C.x, C.y);
    const ratio = d1/d2;
    text(`d1 = A-B: ${d1.toFixed(2)}, d2 = B-C: ${d2.toFixed(2)}, d1/d2: ${ratio.toFixed(4)}`, 10, this.height-7);
}
