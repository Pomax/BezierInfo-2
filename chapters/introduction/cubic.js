setup() {
  this.curve = Bezier.create(this, 50,150, 10,10, 190,10, 150,150);
}

draw() {
  clear();
  this.curve.drawSkeleton();
  this.curve.drawCurve();
  this.curve.drawPoints();
}
