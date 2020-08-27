let curve;

setup() {
  curve = Bezier.defaultCubic(this);
  setMovable(curve.points);

  const inputs = findAll(`input[type=range]`);
  if (inputs) {
    const ratios = inputs.map(i => parseFloat(i.value));
    curve.setRatios(ratios);

    inputs.forEach((input,pos) => {
      const span = input.nextSibling;
      input.listen(`input`, evt => {
        const value = parseFloat(evt.target.value);
        span.textContent = ratios[pos] = value;
        curve.update();
        this.redraw();
      });
    })
  }
}

draw() {
  clear();
  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();
}
