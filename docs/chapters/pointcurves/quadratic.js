let points;

setup() {
    points = [
        {x: 0.25 * this.width, y: 0.25 * this.height},
        {x: 0.5 * this.width, y: 0.5 * this.height},
        {x: 0.25 * this.width, y: 0.75 * this.height},
    ];
    setMovable(points);
}

draw() {
    clear();
    let [S, B, E] = points, t;

    if (points.length === 3) {
        let d1 = dist(S.x, S.y, B.x, B.y);
        let d2 = dist(E.x, E.y, B.x, B.y);
        t = d1 / (d1 + d2);

        let {A, C} = Bezier.getABC(2, ...points, t);
        let curve = new Bezier(this, [S, A, E]);

        curve.drawSkeleton(`lightblue`);
        curve.drawCurve(`grey`);
        setColor(`lightblue`);
        circle(A.x, A.y, 2);
        circle(C.x, C.y, 2);
        text(`A`, A.x+5, A.y+5);
        line(S.x,S.y,E.x,E.y);
        line(C.x,C.y,A.x,A.y);
        text(`C`, C.x+5, C.y+15);
    }

    setColor(`black`);
    let lbl = [`Start`, `B`, `End`];
    points.forEach((p,i) => {
        circle(p.x, p.y, 3);
        text(lbl[i], p.x+5, p.y+5);
    });

    if (points.length === 3) {
        text(` with t=${t.toFixed(2)}`, B.x + 10, B.y+5);
    }
}
