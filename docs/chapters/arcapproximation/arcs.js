// setup={this.setupCubic} draw={this.drawSingleArc} onKeyDown={this.props.onKeyDown}

let curve, utils = Bezier.getUtils();

setup() {
    curve = Bezier.defaultCubic(this);
    setMovable(curve.points);
    setSlider(`.slide-control`, `error`, 0.5);
}

draw() {
    clear();

    curve.drawSkeleton();
    curve.drawCurve();

    // See "arc.js" for the code required to find arcs on the curve.
    let arcs = curve.arcs(this.error);
    arcs.forEach(a => {
        setColor(randomColor(0.3));
        arc(
            a.x, a.y, a.r, a.s, a.e,
            a.x, a.y
        );
    });

    setColor("black");
    text(`Arc approximation with total error ${this.error}`, this.width/2, 15, CENTER);
    curve.drawPoints();
}
