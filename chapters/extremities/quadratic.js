setup() {
    this.curve = Bezier.defaultQuadratic(this);
    setMovable(this.curve.points);
}

draw() {
    resetTransform();
    clear();
    const dim = this.height;
    const curve = this.curve;
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    translate(dim, 0);
    setStroke(`black`);
    line(0,0,0,dim);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0, 1, `X`, 0, dim, dim, dim);

    plot(new Bezier(this, curve.points.map((p,i) => ({
        x: (i/2) * dim,
        y: p.x
    }))));

    resetTransform();
    translate(2*dim, 0);
    setStroke(`black`);
    line(0,0,0,dim);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0,1, `Y`, 0, dim, dim, dim);

    plot(new Bezier(this, curve.points.map((p,i) => ({
      x: (i/2) * dim,
      y: p.y
    }))))
}

plot(dimension) {
    dimension.drawCurve();

}


onMouseMove() {
    redraw();
}
