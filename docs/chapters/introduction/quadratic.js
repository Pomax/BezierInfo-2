let curve;

setup() {
  curve = Bezier.defaultQuadratic(this);
  setMovable(curve.points);
}

draw() {
  clear();
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();
}
