let curve;

setup() {
  curve = new Bezier(this, 90, 200, 25, 100, 220, 40, 210, 240);
  setMovable(curve.points);
}

draw() {
  clear();
  curve.drawSkeleton();
  curve.drawCurve();

  setStroke("rgb(200,100,100)");

  let dim = this.height;
  let t = this.cursor.x / dim;
  curve.drawStruts(t);
  curve.drawPoints();

  let p = curve.get(t);
  circle(p.x, p.y, 5);

  let perc = (t*100)|0;
  t = perc/100;
  text(`Sequential interpolation for ${perc}% (t=${t})`, 10, 15);
}

onMouseMove() {
  redraw();
}
