let curve;

setup() {
    // we're going to look at this as three different "views"
    setPanelCount(3);
    curve = Bezier.defaultCubic(this);
    setMovable(curve.points);
    setSlider(`.slide-control`, `position`, 0.5);
}

draw() {
    clear();

    // form our left and right curves, using the "de Casteljau" points
    let p = curve.get(this.position);
    const struts = this.struts = curve.getStrutPoints(this.position);
    const c1 = new Bezier(this, [struts[0], struts[4], struts[7], struts[9]]);
    const c2 = new Bezier(this, [struts[9], struts[8], struts[6], struts[3]]);

    // first, draw the same thing we saw in the section on de Casteljau's algorithm
    this.drawBasics(p);

    // then in the next panel, draw the subcurve to the "left" of point `t`
    nextPanel();
    setStroke(`black`);
    line(0, 0, 0, this.height);
    this.drawSegment(c1, p, `first`);

    // and in the third panel, draw the subcurve to the "right" of point `t`
    nextPanel();
    setStroke(`black`);
    line(0, 0, 0, this.height);
    this.drawSegment(c2, p, `second`);
}

drawBasics(p) {
    curve.drawCurve(`lightgrey`);
    curve.drawSkeleton(`lightgrey`);
    curve.drawPoints(false);

    noFill();
    setStroke(`red`);
    circle(p.x, p.y, 3);

    setStroke(`lightblue`);
    curve.drawStruts(this.struts);

    setFill(`black`)
    text(`The full curve, with struts`, 10, 15);
}

drawSegment(c, p, halfLabel) {
    setStroke(`lightblue`);
    curve.drawCurve(`lightblue`);
    curve.drawSkeleton(`lightblue`);

    c.drawCurve();
    c.drawSkeleton(`black`);
    c.points.forEach(p => circle(p.x, p.y, 3));

    noFill();
    setStroke(`red`);
    circle(p.x, p.y, 3);

    setFill(`black`)
    text(`The ${halfLabel} half`, 10, 15);
}
