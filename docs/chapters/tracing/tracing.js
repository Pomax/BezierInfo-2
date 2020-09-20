let curve;

setup(api) {
  curve = Bezier.defaultCubic(this);
  setMovable(curve.points);
  setSlider(`.slide-control`, `steps`, 8);
}

draw() {
  clear();

  curve.drawSkeleton();
  curve.drawCurve();
  curve.drawPoints();

  let w = this.width/3;
  let h = this.height;
  let len = curve.length();

  setStroke(`black`);
  translate(w,0);
  line(0, 0, 0, h);
  scale(0.85);
  translate(30,30);

  // This first part is the same as the previous graphic
  setFill(`black`);
  drawAxes("t", 0, 1, "d", 0, len|0, w, h);
  let LUT = this.plotDistanceFunction(w, h, len);

  // but this part is new.
  this.drawPlotIntervals(w, h, LUT);

  resetTransform();
  translate(2*w,0);
  line(0, 0, 0, h);

  this.drawCurveIntervals(LUT);
}

plotDistanceFunction(w, h, len) {
  noFill();
  let LUT = curve.getLUT(this.steps * 10);
  let d = LUT[0].d = 0;
  LUT[0].t = 0;
  start();
  vertex(0,0);
  for(let i=1, e=LUT.length-1, p1, p2; i<=e; i++) {
    p1 = LUT[i-1];
    p2 = LUT[i];
    d += dist(p1.x, p1.y, p2.x, p2.y);
    vertex(
      map(i, 0, e, 0, w),
      map(d, 0, len, 0, h)
    );
    p2.d = d;
    p2.t = i/e;
  }
  end();
  return LUT;
}

drawPlotIntervals(w, h, LUT) {
  noFill();
  setStroke(`grey`);
  let dlen = LUT.slice(-1)[0].d;
  let pos = 0;
  for(let i=0, e=this.steps; i<=e; i++) {
    // get our closest known coordinate
    let targetDistance = i/e * dlen;
    while(LUT[pos].d < targetDistance) pos++;

    // then we can either refine this to get a more exact
    // associated `t`, but really, there's no reason to if
    // we care about integer coordinates...

    let l = LUT[pos];
    let x = map(pos, 0, LUT.length-1, 0, w);
    let y = map(l.d, 0, dlen, 0, h);

    line(0,y,x,y);
    line(x,0,x,y);
  }
}

drawCurveIntervals(LUT) {
  noFill();
  setStroke(`red`);
  let dlen = LUT.slice(-1)[0].d;
  let lastpos = 0, pos = 0;
  for(let i=0, e=this.steps; i<=e; i++) {
    let targetDistance = i/e * dlen;
    while(LUT[pos].d < targetDistance) pos++;

    setStroke(randomColor() );
    start();
    for(let j=lastpos; j<=pos; j++) vertex(LUT[j].x, LUT[j].y);
    lastpos = pos;
    end();

    let p = curve.get(LUT[pos].t);
    setStroke(`black`);
    circle(p.x, p.y, 1);
  }
}
