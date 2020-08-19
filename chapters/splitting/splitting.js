setup() {
    this.t = 0.5;
    this.curve = Bezier.defaultCubic(this);
    setMovable(this.curve.points);
}

draw() {
    resetTransform();
    clear();

    let p = this.curve.get(this.t);
    const struts = this.struts = this.curve.getStrutPoints(this.t);
    const c1 = new Bezier(this, [struts[0], struts[4], struts[7], struts[9]]);
    const c2 = new Bezier(this, [struts[9], struts[8], struts[6], struts[3]]);

    this.drawBasics(p);

    translate(this.width/3, 0);
    setStroke(`black`);
    line(0, 0, 0, this.height);

    this.drawSegment(c1, p);

    translate(this.width/3, 0);
    setStroke(`black`);
    line(0, 0, 0, this.height);

    this.drawSegment(c2, p);
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

drawSegment(c, p) {
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
    text(`The first half`, 10, 15);
}

onKeyDown() {
    let key = this.keyboard.currentKey;

    if(key === `ArrowUp`) {
      this.t += 0.01;
    }

    if(key === `ArrowDown`) {
      this.t -= 0.01
    }

    this.t = this.t < 0 ? 0 : this.t > 1 ? 1 : this.t;

    redraw();
}

onMouseMove() {
    if (this.cursor.down && !this.currentPoint) {
      this.t = map(this.cursor.y, 0,this.height, 0, 1);
    }
    redraw();
}
