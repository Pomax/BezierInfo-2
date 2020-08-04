setup() {
  this.curve = Bezier.create(this, 10,50,  100,160, 190,50);
}

draw() {
  clear();
  this.curve.drawSkeleton();
  this.curve.drawCurve();
  this.curve.drawPoints();
}
