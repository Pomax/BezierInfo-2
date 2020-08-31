let curve;

setup() {
    setPanelCount(3);
    curve = Bezier.defaultQuadratic(this);
    this.position = {x:0,y:0};
    setMovable(curve.points, [this.position]);
}

draw() {
    clear();

    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    if (this.position) {
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

    nextPanel();
    setStroke(`black`);
    line(0,0,0,this.height);

    curve.drawSkeleton(`lightblue`);
    curve.drawCurve(`lightblue`);
    curve.points.forEach(p => circle(p.x, p.y, 2));

    if (this.mark) {
        let B = this.mark.B;
        setFill(`black`);
        text(`t = ${this.mark.t.toFixed(2)}`, B.x + 5, B.y + 10);

        let {A, C, S, E} = curve.getABC(this.mark.t, B);
        setColor(`lightblue`);
        line(S.x, S.y, E.x, E.y);
        line(A.x, A.y, C.x, C.y);
        circle(A.x, A.y, 3);
        circle(B.x, B.y, 3);
        circle(C.x, C.y, 3);

        if (this.currentPoint) {
            let {A,B,C,S,E} = curve.getABC(this.mark.t, this.position);
            setColor(`purple`);
            line(A.x, A.y, C.x, C.y);
            line(S.x, S.y, A.x, A.y);
            line(E.x, E.y, A.x, A.y);
            circle(A.x, A.y, 3);
            circle(B.x, B.y, 3);
            circle(C.x, C.y, 3);

            this.moulded = new Bezier(this, [S,A,E]);
        }
    }

    nextPanel();
    setStroke(`black`);
    line(0,0,0,this.height);

    if (this.moulded) {
        this.moulded.drawSkeleton(`lightblue`);
        this.moulded.drawCurve(`black`);
        this.moulded.points.forEach(p => circle(p.x, p.y, 2));
    } else {
        curve.drawSkeleton(`lightblue`);
        curve.drawCurve(`black`);
        curve.points.forEach(p => circle(p.x, p.y, 2));
    }
}

onMouseDown() {
    if (this.currentPoint !== this.position) {
        this.mark = false;
        this.position.projection = false;
    }
    else if (this.position.projection) {
        this.mark = {
            B: this.position.projection,
            t: this.position.projection.t
        };
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
