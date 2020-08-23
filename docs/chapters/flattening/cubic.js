setup() {
  this.curve = Bezier.defaultCubic(this);
  setMovable(this.curve.points);
  setSlider(`.slide-control`, `steps`, 8);
}

draw() {
  clear();

  this.curve.drawSkeleton();

  noFill();
  start();
   for(let i=0, e=this.steps; i<=e; i++) {
    let p = this.curve.get(i/e);
    vertex(p.x, p.y);
  }
  end();

  this.curve.drawPoints();

  setFill(`black`);
  text(`Flattened to ${this.steps} segments`, 10, 15);
}

onMouseMove() {
  redraw();
}
