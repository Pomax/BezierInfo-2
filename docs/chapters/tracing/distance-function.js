let curve;

setup(api) {
  curve = new Bezier(this, 65, 150, 15, 35, 175, 245, 35, 140);
  setMovable(curve.points);
}

draw() {
  clear();

  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  let w = this.width/2;
  let h = this.height;
  let len = curve.length();

  translate(w,0);
  line(0, 0, 0, h);
  scale(0.85);
  translate(30,30);

  setStroke(`black`);
  drawAxes("t", 0, 1, "d", 0, len|0, w, h);
  this.plotDistanceFunction(w, h, len);
}

plotDistanceFunction(w, h, len) {
  noFill();
  let LUT = curve.getLUT(this.steps * 10);
  let d = 0;
  start();
  vertex(0,0);
  for(let i=1, e=LUT.length, p1, p2; i<e; i++) {
    p1 = LUT[i-1];
    p2 = LUT[i];
    d += dist(p1.x, p1.y, p2.x, p2.y);
    vertex(
      map(i, 0, e, 0, w),
      map(d, 0, len, 0, h)
    );
  }
  end();
}
