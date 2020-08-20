setup() {
  this.steps = 4;
  this.curve = Bezier.defaultQuadratic(this);
  setMovable(this.curve.points);
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

onKeyDown() {
  let key = this.keyboard.currentKey;

  if(key === `ArrowUp`) {
    this.steps++;
  }

  if(key === `ArrowDown`) {
    if(this.steps > 1) this.steps--;
  }

  redraw();
}

onMouseMove() {
  if (this.cursor.down && !this.currentPoint) {
    this.steps = round( map(this.cursor.y, 0,this.height, 16, 1) );
  }
  redraw();
}
