let curve;

setup() {
  curve = new Bezier(this, 20, 250, 30, 20, 200, 250, 220, 20);
  setMovable(curve.points);
  setSlider(`.slide-control`, `position`, 0.5);
}

draw() {
  clear();

  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  let w = this.height;
  let h = this.height;
  let bbox = curve.bbox();

  // prepare our values for root finding:
  let x = round(bbox.x.min + (bbox.x.max - bbox.x.min) * this.position);
  let xcoords = curve.points.map((p,i) => ({x:i/3, y: p.x - x}));

  // find our root:
  let roots = Bezier.getUtils().roots(xcoords);
  let t = this.position===0 ? 0 : this.position===1 ? 1 : roots[0];

  // find our answer:
  let y = round(curve.get(t).y);

  // and draw everything
  setStroke("red");
  line(x, y, x, h);
  line(x, y, 0, y);
  setTextStroke(`white`, 3);
  setShadow(`white`, 5);
  text(`y=${y}`, x/2, y - 5);
  text(`x=${x}`, x + 5, h - (h-y)/2);
  text(`t=${((t*100)|0)/100}`, x + 15, y);
}
