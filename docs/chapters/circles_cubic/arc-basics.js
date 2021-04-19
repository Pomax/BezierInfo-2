let curve, w, h, pad = 75, r;

setup() {
    w = this.width;
    h = this.height;
    r = w - 2 * pad;
    curve = new Bezier(this,
//      { x: r, y: h/2},
      { x: r, y: h/2},
      { x: r, y: h/2},
      { x: r, y: h/2}
    );
    setSlider(`.slide-control`, `angle`, 1.57, v => this.updateCurve2(v));
}

draw() {
  clear();

  translate(1.5 * pad,pad);
  setColor(`grey`);
  line(0,-h,0,h);
  line(-w,0,w,0);
  curve.drawSkeleton(`grey`);
  let p = curve.drawStruts(0.5, `grey`, false);
  curve.drawCurve(`black`);
  // this.drawCubicInformation(p);
  this.drawQuadraticInformation(p);
}

drawQuadraticInformation(p) {
  noFill();
  setStroke(`black`)
  let a = this.angle;
  let ar = 20
  arc(0,0,ar,0,a);
  setStroke(`grey`);
  let br = 4 * ar;
  arc(0,0,br,0,a/2);
  line(0,0, p[2].x, p[2].y);
  line(0,0, p[1].x, p[1].y);

  setFill(`black`);
  setTextStroke(`white`, 3);
  text(`P1`, p[0]);
  text(`P2`, p[1]);
  text(`P3`, p[2]);
  text(`B`, p[5]);

  text(`θ`, 1.2 * ar * cos(a / 3), 1.2 * ar * sin(a / 3));
  text(`θ/2`, 1.2 * br * cos(a / 4), 1.2 * br * sin(a / 4));
}


drawCubicInformation(p) {
  noFill();
  setStroke(`black`)
  let a = this.angle;
  let ar = 20
  arc(0,0,ar,0,a);
  setStroke(`grey`);
  let br = 4 * ar;
  arc(0,0,br,0,a/2);
  line(0,0, p[3].x, p[3].y);
  line(0,0, p[9].x, p[9].y);

  setFill(`black`);
  setTextStroke(`white`, 3);
  text(`P1`, p[0]);
  text(`P2`, p[1]);
  text(`P3`, p[2]);
  text(`P4`, p[3]);
  text(`A`, p[5]);
  text(`B`, p[9]);
  text(`e1`, p[7]);
  text(`e2`, p[8]);

  text(`θ`, 1.2 * ar * cos(a / 3), 1.2 * ar * sin(a / 3));
  text(`θ/2`, 1.2 * br * cos(a / 4), 1.2 * br * sin(a / 4));
}

updateCurve3(a) {
  this.angle = a;
  let p = curve.points;
  let d = r * 4/3 * tan(a/4);

  // start point
  p[0].x = r;
  p[0].y = 0;

  // end point
  p[3].x = r * cos(a);
  p[3].y = r * sin(a);

  // first control point
  p[1].x = r;
  p[1].y = d;

  // second control point
  p[2].x = p[3].x + d * sin(a);
  p[2].y = p[3].y - d * cos(a);
}

updateCurve2(a) {
  this.angle = a;
  let p = curve.points;
  let d = r * tan(a/2);

  // start point
  p[0].x = r;
  p[0].y = 0;

  // control point
  p[1].x = r;
  p[1].y = d;

  // end point
  p[2].x = r * cos(a);
  p[2].y = r * sin(a);
}
