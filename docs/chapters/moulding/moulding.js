let curve;

setup() {
    setPanelCount(3);
    const type = this.type = this.parameters.type ?? `quadratic`;
    curve = type === `quadratic` ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    this.position = {x:0,y:0};
    setMovable(curve.points, [this.position]);
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
    text(`t = ${t.toFixed(2)}`, B.x + 5, B.y + 10);

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
        this.moulded = new Bezier(this, [S,A,E]);
    }
}

drawCubicMark() {
    let {B, t, e1, e2} = this.mark;
    let d1 = { x: e1.x - B.x, y: e1.y - B.y};
    let d2 = { x: e2.x - B.x, y: e2.y - B.y};
    setFill(`black`);
    text(`t = ${t.toFixed(2)}`, B.x + 5, B.y + 10);

    let {A, C, S, E} = curve.getABC(this.mark.t, B);
    let olen = dist(A.x, A.y, C.x, C.y);
    setColor(`lightblue`);
    line(S.x, S.y, E.x, E.y);
    line(A.x, A.y, C.x, C.y);

    const lbl = [`A`, `B`, `C`, `e1`, `e2`];
    [A,B,C,e1,e2].forEach((p,i) => {
        circle(p.x, p.y, 3);
        text(lbl[i], p.x + 10, p.y);
    });

    if (this.currentPoint) {
        let {A,B,C,S,E} = curve.getABC(this.mark.t, this.position);

        let nlen = dist(A.x, A.y, C.x, C.y);
        let f = this.parameters.scaling ? nlen/olen : 1;
        let e1 = { x: B.x + f * d1.x, y: B.y + f * d1.y };
        let e2 = { x: B.x + f * d2.x, y: B.y + f * d2.y };

        setColor(`purple`);
        line(A.x, A.y, C.x, C.y);
        line(e1.x, e1.y, e2.x, e2.y);

        let v1 = {
            x: A.x - (A.x - e1.x)/(1-t),
            y: A.y - (A.y - e1.y)/(1-t)
        };

        let v2 = {
            x: A.x - (A.x - e2.x)/t,
            y: A.y - (A.y - e2.y)/t
        };

        let C1 = {
            x: S.x + (v1.x - S.x) / t,
            y: S.y + (v1.y - S.y) / t
        };
        let C2 = {
            x: E.x + (v2.x - E.x) / (1-t),
            y: E.y + (v2.y - E.y) / (1-t)
        };

        [A,B,C,e1,e2,v1,v2,C1,C2].forEach(p => circle(p.x, p.y, 3));

        noFill();
        circle(B.x, B.y, 5);
        this.moulded = new Bezier(this, [S,C1,C2,E]);
    }
}

drawResult() {
    let last = curve;
    if (this.moulded) last = this.moulded;

    last.drawSkeleton(`lightblue`);
    last.drawCurve(`black`);
    last.points.forEach(p => circle(p.x, p.y, 2));

    if (this.mark) {
        let t = this.mark.t;
        let B = last.get(t);
        circle(B.x, B.y, 3);
        setFill(`black`);
        text(`t = ${this.mark.t.toFixed(2)}`, B.x + 5, B.y + 10);
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
            this.mark = {
                t, B: this.position.projection,
                e1: struts[7],
                e2: struts[8]
            };
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
    if (this.moulded) {
        curve = this.moulded;
        resetMovable(curve.points, [this.position]);
    }
    redraw();
}
