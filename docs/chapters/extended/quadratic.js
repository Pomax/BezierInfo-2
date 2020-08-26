setup() {
    this.curve = Bezier.defaultQuadratic(this);
    setMovable(this.curve.points);
}

draw() {
    const curve = this.curve;

    clear();
    curve.drawCurve();
    curve.drawSkeleton();

    let step=0.05, min=-10, max=10;
    let pt = curve.get(min - step), pn;

    setStroke(`skyblue`);

    for (let t=min; t<=step; t+=step) {
      pn = curve.get(t);
      line(pt.x, pt.y, pn.x, pn.y);
      pt = pn;
    }

    pt = curve.get(1);
    for (let t=1+step; t<=max; t+=step) {
      pn = curve.get(t);
      line(pt.x, pt.y, pn.x, pn.y);
      pt = pn;
    }

    curve.drawPoints();
}
