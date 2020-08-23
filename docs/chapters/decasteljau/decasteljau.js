setup() {
  this.curve = new Bezier(this, 90, 200, 25, 100, 220, 40, 210, 240);
  setMovable(this.curve.points);
  setSlider(`.slide-control`, `position`, 0);
}

draw() {
  clear();
  const curve = this.curve;
  curve.drawSkeleton();
  curve.drawCurve();

  setStroke("rgb(200,100,100)");

  let t = this.position;
  if (0 < t && t < 1) {
    curve.drawStruts(t);
  }

  curve.drawPoints();

  if (0 < t && t < 1) {
    let p = curve.get(t);
    circle(p.x, p.y, 5);

    let perc = (t*100)|0;
    let rt = perc/100;
    text(`Sequential interpolation for ${perc}% (t=${rt})`, 10, 15);
  }
}

onMouseMove() {
  redraw();
}
