setup() {
    this.curve = Bezier.defaultCubic(this);
    setMovable(this.curve.points);
    setSlider(`.slide-control`, `position`, 0.5);
}

draw() {
    resetTransform();
    clear();

    let p = this.curve.get(this.position);
    const struts = this.struts = this.curve.getStrutPoints(this.position);
    const c1 = new Bezier(this, [struts[0], struts[4], struts[7], struts[9]]);
    const c2 = new Bezier(this, [struts[9], struts[8], struts[6], struts[3]]);

    this.drawBasics(p);

    translate(this.width/3, 0);
    setStroke(`black`);
    line(0, 0, 0, this.height);

    this.drawSegment(c1, p, `first`);

    translate(this.width/3, 0);
    setStroke(`black`);
    line(0, 0, 0, this.height);

    this.drawSegment(c2, p, `second`);
}

drawBasics(p) {
    this.curve.drawCurve(`lightgrey`);
    this.curve.drawSkeleton(`lightgrey`);
    this.curve.drawPoints(false);
    noFill();
    setStroke(`red`);
    circle(p.x, p.y, 3);

    setStroke(`lightblue`);
    this.curve.drawStruts(this.struts);
    setFill(`black`)
    text(`The full curve, with struts`, 10, 15);
}

drawSegment(c, p, halfLabel) {
    setStroke(`lightblue`);
    this.curve.drawCurve(`lightblue`);
    this.curve.drawSkeleton(`lightblue`);
    this.curve.drawStruts(this.struts);
    c.drawCurve();
    c.drawSkeleton(`black`);
    noFill();
    setStroke(`red`);
    circle(p.x, p.y, 3);
    setFill(`black`)
    text(`The ${halfLabel} half`, 10, 15);
}
