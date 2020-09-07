let curve, ratios=[1, 1, 1, 1];

setup() {
  curve = Bezier.defaultCubic(this);
  setMovable(curve.points);
  curve.points.forEach((p,i) => {
    setSlider(`.ratio-${i+1}`, `!ratio-${i+1}`, 1, v => this.setRatio(i,v))
  });
}

setRatio(i, v) {
  ratios[i] = v;
  curve.setRatios(ratios);
  redraw();
}

draw() {
  clear();
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();
}
