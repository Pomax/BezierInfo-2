let curve;

setup() {
    curve = Bezier.defaultCubic(this);
    setMovable(curve.points);
    setSlider(`.slide-control`, `position`, 0.5);
}

draw() {
    clear();
    const blue = `lightblue`;
    const t = this.position;
    const {A,B,C,S,E} = curve.getABC(t);
    const struts = curve.drawStruts(t, blue, false);
    curve.drawSkeleton(blue);
    curve.drawCurve(`black`);
    setStroke(blue);
    line(S.x, S.y, E.x, E.y);
    line(A.x, A.y, C.x, C.y);
    curve.drawPoints();

    [A,B,C].forEach(p => circle(p.x, p.y, 3));
    setFill(`black`);
    text(`A`, A.x+10, A.y);
    text(`B`, B.x+10, B.y);
    text(`C`, C.x+10, C.y);
    setStroke(`purple`);

    const lbl = [`v1`, `v2`, `e1`, `e2`];
    [struts[4], struts[6], struts[7], struts[8]].forEach((p,i) => {
        circle(p.x, p.y, 2);
        text(lbl[i], p.x+10, p.y);
    });
}
