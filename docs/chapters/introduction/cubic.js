let curve;

setup() {
  curve = Bezier.defaultCubic(this);
  setMovable(curve.points);
}

draw() {
  clear();
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();
}
