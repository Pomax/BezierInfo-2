let curve;

setup() {
  let type = this.parameters.type ?? `quadratic`;
  curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
  setMovable(curve.points);
  setSlider(`.slide-control`, `steps`, type === `quadratic` ? 4 : 8);
}

draw() {
  clear();

  let alen = 0;
  const len = curve.length();
  const LUT = curve.getLUT(this.steps + 1);

  setStroke("red");
  curve.drawSkeleton(`lightblue`);

  // instead of running an arclength summation, we
  // just... sum the lengths of our line segments.
  LUT.forEach((p1,i) => {
    if (i===0) return;
    let p0 = LUT[i-1];
    line(p0.x, p0.y, p1.x, p1.y);
    alen += dist(p0.x, p0.y, p1.x, p1.y);
  });

  curve.drawPoints();
  setFill(`black`);
  text(`Approximate length, ${this.steps} steps: ${alen.toFixed(2)} (true: ${len.toFixed(2)})`, 10, 15);
};
