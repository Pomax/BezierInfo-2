let curve, ratios=[1, 1, 1, 1];

setup() {
  curve = Bezier.defaultCubic(this);
  setMovable(curve.points);
  for (let i=0; i<4; i++) {
    // Set up a slider, but in a way that does not tie it to a variable
    // that is exposed through `this`, because we want to store its value
    // in the "ratios" array we already declared globally.
    //
    // To make that happen, we tell the slider logic that it should be
    // calling the setRatio function instead when the slider moves.
    setSlider(`.ratio-${i+1}`, `!ratio-${i+1}`, 1, v => this.setRatio(i,v))
  }
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
