let points = [], utils = Bezier.getUtils();

setup() {
    points = [
        {x: 0.5 * this.width, y: 0.25 * this.height},
        {x: 0.75 * this.width, y: 0.5 * this.height},
        {x: 0.5 * this.width, y: 0.75 * this.height},
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

        let {A, C} = Bezier.getABC(3, ...points, t);
        let { e1, e2, C1, C2 } = this.findControlPoints(t, A, B, C, S, E);

        circle(e1.x, e1.y, 2);
        circle(e2.x, e2.y, 2);

        let curve = new Bezier(this, [S, C1, C2, E]);

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
        text(` with t=${t.toFixed(2)}`, B.x + 10, B.y+20);
    }
}

findControlPoints(t, A, B, C, S, E) {
    // get our e1-e2 distances
    const angle = atan2(E.y-S.y, E.x-S.x) - atan2(B.y-S.y, B.x-S.x),
          bc = (angle < 0 || angle > PI ? -1 : 1) * dist(S.x, S.y, E.x, E.y)/3,
          de1 = t * bc,
          de2 = (1-t) * bc;

    // get the circle-aligned slope as normalized dx/dy
    const c = utils.getccenter(S,B,E),
          tangent = [
            { x: B.x - (B.y - c.y), y: B.y + (B.x - c.x) },
            { x: B.x + (B.y - c.y), y: B.y - (B.x - c.x) }
          ],
          tlength = dist(tangent[0].x, tangent[0].y, tangent[1].x, tangent[1].y),
          dx = (tangent[1].x - tangent[0].x)/tlength,
          dy = (tangent[1].y - tangent[0].y)/tlength;

    // then set up an e1 and e2 parallel to the baseline
    const e1 = { x: B.x + de1 * dx, y: B.y + de1 * dy};
    const e2 = { x: B.x - de2 * dx, y: B.y - de2 * dy };

      // then use those e1/e2 to derive the new hull coordinates
    const v1 = {
            x: A.x + (e1.x - A.x) / (1 - t),
            y: A.y + (e1.y - A.y) / (1 - t)
          };

    const v2 = {
            x: A.x + (e2.x - A.x) / t,
            y: A.y + (e2.y - A.y) / t
          };

    const C1 = {
            x: S.x + (v1.x - S.x) / t,
            y: S.y + (v1.y - S.y) / t
          };

    const C2 = {
            x: E.x + (v2.x - E.x) / (1 - t),
            y: E.y + (v2.y - E.y) / (1 - t),
          };

    return { e1, e2, C1, C2 };
}