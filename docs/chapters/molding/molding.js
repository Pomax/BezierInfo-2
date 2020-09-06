let curve, utils = Bezier.getUtils();

setup() {
    setPanelCount(3);
    const type = this.type = this.parameters.type ?? `quadratic`;
    curve = type === `quadratic` ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    this.position = {x:0,y:0};
    setMovable(curve.points, [this.position]);
    if (this.parameters.interpolated) {
        setSlider(`.slide-control`, `falloff`, 100);
    }
}

draw() {
    clear();

    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();
    this.drawPosition();

    nextPanel();

    curve.drawSkeleton(`lightblue`);
    curve.drawCurve(`lightblue`);
    curve.points.forEach(p => circle(p.x, p.y, 2));
    this.drawMark();

    nextPanel();

    this.drawResult();
}

drawPosition() {
    if (!this.position) return;

    setColor(`blue`);
    let p = this.position.projection;
    if (!this.mark) {
        p = this.position.projection = curve.project(
            this.position.x,
            this.position.y
        )
        this.position.x = p.x;
        this.position.y = p.y;
    }
    circle(p.x, p.y, 3);
}

drawMark() {
    if (!this.mark) return;
    if (this.type === `quadratic`) {
        this.drawQuadraticMark();
    } else {
        this.drawCubicMark();
    }
}

drawQuadraticMark() {
    let {B, t} = this.mark;
    setFill(`black`);
    text(`t: ${t.toFixed(5)}`, this.panelWidth/2, 15, CENTER);

    let {A, C, S, E} = curve.getABC(t, B);
    setColor(`lightblue`);
    line(S.x, S.y, E.x, E.y);
    line(A.x, A.y, C.x, C.y);

    const lbl = [`A`, `B`, `C`];
    [A,B,C].forEach((p,i) => {
        circle(p.x, p.y, 3);
        text(lbl[i], p.x + 10, p.y);
    });


    if (this.currentPoint) {
        let {A,B,C,S,E} = curve.getABC(t, this.position);
        setColor(`purple`);
        line(A.x, A.y, C.x, C.y);
        line(S.x, S.y, A.x, A.y);
        line(E.x, E.y, A.x, A.y);
        [A,B,C].forEach(p => circle(p.x, p.y, 3));

        noFill();
        circle(B.x, B.y, 5);
        this.molded = new Bezier(this, [S,A,E]);
    }
}

drawCubicMark() {
    const S = curve.points[0],
          E = curve.points[curve.order],
          {B, t, e1, e2} = this.mark,
          org = curve.getABC(t, B),
          nB = this.position,
          d1 = { x: e1.x - B.x, y: e1.y - B.y },
          d2 = { x: e2.x - B.x, y: e2.y - B.y },
          ne1 = { x: nB.x + d1.x, y: nB.y + d1.y },
          ne2 = { x: nB.x + d2.x, y: nB.y + d2.y },
          {A, C} = curve.getABC(t, nB),
          {v1, v2, C1, C2} = this.deriveControlPoints(S, A, E, ne1, ne2, t);

    if (this.parameters.interpolated) {
        const ideal = this.getIdealisedCurve(S, nB, E);
        this.ideal = new Bezier(this, [ideal.S, ideal.C1, ideal.C2, ideal.E]);
    }

    setColor(`black`);
    text(`t: ${t}`, this.panelWidth/2, 20, CENTER);

    setColor(`lightblue`);
    line(S.x,S.y,E.x,E.y);
    line(org.C.x,org.C.y,org.A.x,org.A.y);
    circle(org.A.x, org.A.y, 3);
    circle(org.B.x, org.B.y, 3);
    circle(org.C.x, org.C.y, 3);
    text(`A`, org.A.x + 5, org.A.y);
    text(`B`, org.B.x + 5, org.B.y);
    text(`C`, org.C.x + 5, org.C.y);

    setColor(`purple`);
    circle(A.x, A.y, 3);
    circle(nB.x, nB.y, 3);
    circle(C.x, C.y, 3);
    circle(ne1.x, ne1.y, 2);
    circle(ne2.x, ne2.y, 2);

    line(v1.x, v1.y, A.x, A.y);
    line(v2.x, v2.y, A.x, A.y);
    line(S.x,S.y,C1.x,C1.y);
    line(E.x,E.y,C2.x,C2.y);
    line(C2.x,C2.y,C1.x,C1.y);
    line(A.x,A.y,C.x,C.y);
    line(ne1.x, ne1.y, ne2.x, ne2.y);

    noFill();
    circle(nB.x, nB.y, 5);

    this.molded = new Bezier(this, [S,C1,C2,E]);
}

deriveControlPoints(S, A, E, e1, e2, t) {
    // And then use those to derive the correct v1/v2/C1/C2 coordinates
    const v1 = {
        x: A.x - (A.x - e1.x)/(1-t),
        y: A.y - (A.y - e1.y)/(1-t)
    };
    const v2 = {
        x: A.x - (A.x - e2.x)/t,
        y: A.y - (A.y - e2.y)/t
    };

    const C1 = {
        x: S.x + (v1.x - S.x) / t,
        y: S.y + (v1.y - S.y) / t
    };
    const C2 = {
        x: E.x + (v2.x - E.x) / (1-t),
        y: E.y + (v2.y - E.y) / (1-t)
    };

    return {v1, v2, C1, C2};
}

getIdealisedCurve(p1, p2, p3) {
    const c = utils.getccenter(p1, p2, p3),
          d1 = dist(p1.x, p1.y, p2.x, p2.y),
          d2 = dist(p3.x, p3.y, p2.x, p2.y),
          t = d1 / (d1 + d2),
          { A, B, C, S, E } = Bezier.getABC(3, p1, p2, p3, t),
          angle = (atan2(E.y-S.y, E.x-S.x) - atan2(B.y-S.y, B.x-S.x) + TAU) % TAU,
          bc = (angle < 0 || angle > PI ? -1 : 1) * dist(S.x, S.y, E.x, E.y)/3,
          de1 = t * bc,
          de2 = (1-t) * bc,
          tangent = [
            { x: B.x - 10 * (B.y-c.y), y: B.y + 10 * (B.x-c.x) },
            { x: B.x + 10 * (B.y-c.y), y: B.y - 10 * (B.x-c.x) }
          ],
          tlength = dist(tangent[0].x, tangent[0].y, tangent[1].x, tangent[1].y),
          dx = (tangent[1].x - tangent[0].x)/tlength,
          dy = (tangent[1].y - tangent[0].y)/tlength,
          e1 = { x: B.x + de1 * dx, y: B.y + de1 * dy},
          e2 = { x: B.x - de2 * dx, y: B.y - de2 * dy },
          {v1, v2, C1, C2} = this.deriveControlPoints(S, A, E, e1, e2, t);

    return {A,B,C,S,E,e1,e2,v1,v2,C1,C2};
}

drawResult() {
    let last = curve;
    if (this.molded) last = this.molded;

    last.drawSkeleton(`lightblue`);
    last.drawCurve(this.cursor.down ? `lightblue` : `black`);
    last.points.forEach(p => circle(p.x, p.y, 2));

    if (this.mark) {
        let t = this.mark.t;
        let B = last.get(t);
        circle(B.x, B.y, 3);

        if (this.ideal) {
            let d = dist(this.mark.B.x, this.mark.B.y, this.position.x, this.position.y);
            let t = min(this.falloff, d) / this.falloff;
            this.ideal.drawCurve(`lightblue`);
            let iC1 = {
                x: (1-t) * last.points[1].x + t * this.ideal.points[1].x,
                y: (1-t) * last.points[1].y + t * this.ideal.points[1].y
            };
            let iC2 = {
                x: (1-t) * last.points[2].x + t * this.ideal.points[2].x,
                y: (1-t) * last.points[2].y + t * this.ideal.points[2].y
            };
            this.interpolated = new Bezier(this, [last.points[0], iC1, iC2, last.points[3]]);
            this.interpolated.drawCurve();
        }
    }
}

onMouseDown() {
    if (this.currentPoint !== this.position) {
        this.mark = false;
        this.position.projection = false;
    }
    else if (this.position.projection) {
        let t = this.position.projection.t;
        if (this.type === `quadratic`) {
            this.mark = {
                t, B: this.position.projection,
            };
        } else {
            let struts = curve.getStrutPoints(t);
            let m = this.mark = {
                t, B: this.position.projection,
                e1: struts[7],
                e2: struts[8]
            };
            m.d1 = { x: m.e1.x - m.B.x, y: m.e1.y - m.B.y};
            m.d2 = { x: m.e2.x - m.B.x, y: m.e2.y - m.B.y};
        }
    }
    redraw();
}

onMouseMove() {
    if (!this.currentPoint && !this.mark) {
        this.position.x = this.cursor.x;
        this.position.y = this.cursor.y;
    }
    redraw();
}

onMouseUp() {
    this.mark = false;
    if (this.molded) {
        curve = this.interpolated || this.molded;
        resetMovable(curve.points, [this.position]);
        this.interpolated = false;
        this.molded = false;
    }
    redraw();
}
