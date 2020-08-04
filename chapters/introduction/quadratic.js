setup() {
  this.curve = Bezier.defaultQuadratic(this);
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
  this.curve.update();
  redraw();
}
