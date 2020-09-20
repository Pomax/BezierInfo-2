import { C, T } from "./ct-values.js";

setup() {
    this.curve = Bezier.defaultCubic(this);
    setMovable(this.curve.points);
}

draw() {
    clear();
    const curve = this.curve;
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    const len = this.computeLength(curve);
    setFill("black");
    text(`Curve length: ${len.toFixed(2)} pixels`, 10, 15);
}

computeLength(curve) {
    const z = 0.5, len = T.length;
    let sum = 0;
    for (let i = 0, t; i < len; i++) {
      t = z * T[i] + z;
      sum += C[i] * this.arcfn(t, curve.derivative(t));
    }
    return z * sum;
}

arcfn(t, d) {
    return sqrt(d.x * d.x + d.y * d.y);
}
