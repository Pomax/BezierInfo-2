let curve;

setup() {
    const type = this.parameters.type ?? `quadratic`;
    curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
    setMovable(curve.points);
}

draw() {
    clear();
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    translate(this.width/2, 0);
    line(0,0,0,this.height);

    // draw the realigned curve:
    this.drawRTCurve(
        this.rotatePoints(
            this.translatePoints(
                curve.points
            )
        )
    );
}

translatePoints(points) {
    // translate so that the curve starts at (0,0)
    let m = points[0];
    return points.map(v => {
        return {
            x: v.x - m.x,
            y: v.y - m.y
        }
    });
}

rotatePoints(points) {
    // rotate the curve so that the point is (...,0)
    let degree = curve.points.length - 1;
    let dx = points[degree].x;
    let dy = points[degree].y;
    let a = atan2(dy, dx);
    return points.map(v => {
        return {
            x: v.x * cos(-a) - v.y * sin(-a),
            y: v.x * sin(-a) + v.y * cos(-a)
        };
    });
}

drawRTCurve(points) {
    // draw axes
    translate(60, this.height/2);
    setStroke(`grey`);
    line(0, -this.height, 0, this.height);
    line(-60, 0, this.width, 0);

    // draw transformed curve
    let degree = curve.points.length - 1;
    let ncurve = new Bezier(this, points);
    ncurve.drawCurve();

    // and label the last point in the transformed curve
    setFill(`black`);
    text(`(0,0)`, 5,15);
    text(`(${points[degree].x|0},0)`, points[degree].x, -5, CENTER);
}
