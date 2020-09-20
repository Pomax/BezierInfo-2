let curves, curve1, curve2, next;

setup() {
  setPanelCount(3);
  this.pairReset();
  this.setupEventListening();
  setSlider(`.slide-control`, `threshold`, 1.0, v => this.reset(v));
}

pairReset() {
  curve1 = new Bezier(this, 50,35, 45,235, 220,235, 220,135);
  curve2 = new Bezier(this, 20,150, 120,20, 220,95, 140,240);
  curves = [curve1, curve2];
  resetMovable(curve1.points, curve2.points);
  this.reset();
}

reset(v) {
  if (next && next.disabled) next.disabled = false;
  this.pairs = [[curve1, curve2]];
  this.finals = [];
  this.step = 0;
  return v;
}

setupEventListening() {
  next = find(`.next`);
  if (next) next.listen([`click`,`touchstart`],  evt => {
    this.step++;
    redraw();
  });
}

draw() {
  clear();

  // panel 1: base curves
  curves.forEach(c => {
    c.drawSkeleton();
    c.drawCurve();
    c.drawPoints();
  });

  // panel 2: the current iteration step
  nextPanel();

  this.drawIteration();
  setFill(`black`);
  let information = `Initial curves, threshold = ${this.threshold}px`
  if (this.step) {
    information = `Curve collection at iteration ${this.step}`;
  }
  text(information, this.panelWidth/2, 15, CENTER);

  if (this.finals.length) {
    text(`${this.finals.length} intersections found.`, this.panelWidth/2, this.height - 10, CENTER);
  }

  // panel 3: the (already known) intersections
  nextPanel();
  this.drawIntersections();
}

drawIteration() {
  if (this.step > 0) {
    const pairs = this.pairs;
    this.pairs = [];
    pairs.forEach(pair => {
        if(pair[0].length() < this.threshold && pair[1].length() < this.threshold)
          return this.finals.push(pair);

        // split two curves into four curves
        const s1 = pair[0].split(0.5);
        const s2 = pair[1].split(0.5);

        // cross check to see if we need to keep any of the pairs
        if (s1.left.overlaps(s2.left)) { this.pairs.push([ s1.left, s2.left ]); }
        if (s1.left.overlaps(s2.right)) { this.pairs.push([ s1.left, s2.right ]); }
        if (s1.right.overlaps(s2.left)) { this.pairs.push([ s1.right, s2.left ]); }
        if (s1.right.overlaps(s2.right)) { this.pairs.push([ s1.right, s2.right ]); }
    });
  }

  // if we have no pairs left, the next button should not be clickable anymore.
  if (!this.pairs.length && next) {
    next.disabled = true;
  }

  // draw any curves we have in our pairs list
  this.pairs.forEach(pair => {
    pair.forEach(b => {
      let curve = new Bezier(this, b.points);
      curve.drawCurve();
      curve.drawBoundingBox(randomColor());
    })
  });

  // and draw any "finals" as established intersections at this point.
  setStroke(`red`);
  this.finals.forEach(pair => {
    let p = pair[0].get(0.5);
    circle(p.x, p.y, 3);
  })
}

drawIntersections() {
  curve1.drawCurve(`lightblue`);
  curve2.drawCurve(`lightblue`);
  noFill();
  setStroke(`blue`);
  let intersections = curve1.intersects(curve2);
  intersections = intersections.map(v => v.split(`/`).map(t => parseFloat(t)));
  intersections.forEach(p => {
    p = curve1.get(p[0]);
    circle(p.x, p.y, 3);
  });
}

onMouseMove() {
  if (this.currentPoint && this.step !== 0) {
    this.reset();
    redraw();
  }
}
