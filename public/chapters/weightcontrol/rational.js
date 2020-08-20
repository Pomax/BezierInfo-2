setup() {
  this.curve = Bezier.defaultCubic(this);
  setMovable(this.curve.points);

  const inputs = findAll(`input[type=range]`);
  if (inputs) {
    const ratios = inputs.map(i => parseFloat(i.value));
    this.curve.setRatios(ratios);

    inputs.forEach((input,pos) => {
      const span = input.nextSibling;
      input.listen(`input`, evt => {
        const value = parseFloat(evt.target.value);
        span.textContent = ratios[pos] = value;
        this.curve.update();
        this.redraw();
      });
    })
  }
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
