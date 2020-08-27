let curve;

setup() {
  const type = this.parameters.type ?? `quadratic`;
  curve = (type === `quadratic`) ? Bezier.defaultQuadratic(this) : Bezier.defaultCubic(this);
  setMovable(curve.points);
  setSlider(`.slide-control`, `steps`, (type === `quadratic`) ? 4 : 8);
}

draw() {
  clear();

  curve.drawSkeleton();

  noFill();
  start();
  for(let i=0, e=this.steps; i<=e; i++) {
    let p = curve.get(i/e);
    vertex(p.x, p.y);
  }
  end();

  curve.drawPoints();

  setFill(`black`);
  text(`Flattened to ${this.steps} segments`, 10, 15);
}
