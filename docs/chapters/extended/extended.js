let curve;

setup() {
    const type = this.parameters.type ?? `quadratic`;
    curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    setMovable(curve.points);
}

draw() {
    clear();

    // let's draw the curve from -10 to 10, instead of 0 to 1
    setStroke(`skyblue`);
    let min=-10, max=10, step=0.05;

    // calculate the very first point
    let pt = curve.get(min - step), pn;


    // then draw the section from -10 to 0
    for (let t=min; t<step; t+=step) {
      pn = curve.get(t);
      line(pt.x, pt.y, pn.x, pn.y);
      pt = pn;
    }

    // then the regular curve, from 0 to 1
    curve.drawSkeleton();
    curve.drawCurve();

    // then draw the section from 1 to 10
    pt = curve.get(1);
    for (let t=1+step; t<=max; t+=step) {
      pn = curve.get(t);
      line(pt.x, pt.y, pn.x, pn.y);
      pt = pn;
    }

    // and just to make sure they show on top,
    // draw the curve's control points last.
    curve.drawPoints();
}
