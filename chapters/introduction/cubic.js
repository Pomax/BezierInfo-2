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
}

onMouseMove() {
  redraw();
}
