let points;

setup() {
  var w = this.width,
      h = this.height,
      cx = w/2,
      cy = h/2,
      pad = 40,
      type = this.type = this.parameters.type ?? `quadratic`;

  if (type === `quadratic`) {
    points = [
          // first curve:
          {x:cx,y:pad}, {x:w-pad,y:pad}, {x:w-pad,y:cy},
          // subsequent curve
          {x:w-pad,y:h-pad}, {x:cx,y:h-pad},
          // subsequent curve
          {x:pad,y:h-pad}, {x:pad,y:cy},
          // final curve control point
          {x:pad,y:pad}
    ];
  } else {
    let r = (w - 2*pad)/2,
        k = 0.55228,
        kr = k*r;
    points = [
      // first curve:
      {x:cx,y:pad}, {x:cx+kr,y:pad}, {x:w-pad,y:cy-kr}, {x:w-pad,y:cy},
      // subsequent curve
      {x:w-pad,y:cy+kr}, {x:cx+kr,y:h-pad}, {x:cx,y:h-pad},
      // subsequent curve
      {x:cx-kr,y:h-pad}, {x:pad,y:cy+kr}, {x:pad,y:cy},
      // final curve control point
      {x:pad,y:cy-kr}, {x:cx-kr,y:pad}
    ];
  }
  setMovable(points);
}

draw() {
  clear()
  var pts = points;
  var quad = pts.length === 8;

  var c1 = quad ? new Bezier(this, pts[0],pts[1],pts[2]) : new Bezier(this, pts[0],pts[1],pts[2],pts[3]);
  c1.drawSkeleton();
  c1.drawCurve();
  c1.drawPoints(false);

  var c2 = quad ? new Bezier(this, pts[2],pts[3],pts[4]) : new Bezier(this, pts[3],pts[4],pts[5],pts[6]);
  c2.drawSkeleton();
  c2.drawCurve();
  c2.drawPoints(false);

  var c3 = quad ? new Bezier(this, pts[4],pts[5],pts[6]) : new Bezier(this, pts[6],pts[7],pts[8],pts[9]);
  c3.drawSkeleton();
  c3.drawCurve();
  c3.drawPoints(false);

  var c4 = quad ? new Bezier(this, pts[6],pts[7],pts[0]) : new Bezier(this, pts[9],pts[10],pts[11],pts[0]);
  c4.drawSkeleton();
  c4.drawCurve();
  c4.drawPoints(false);

  if (this.problem) {
    noFill();
    setStroke(`red`);
    circle(this.problem.x, this.problem.y, 7);
  }
}

movePointsQuadratic(i, link) {
  const l = points.length;
  if (link === `conventional` && i%2 === 0) {
    let ppl = points[(l+i-3)%l];
    let pl = points[(l+i-1)%l];
    let pr = points[(l+i+1)%l];
    let ppr = points[(l+i+3)%l];
    pl.x += this.cursor.diff.x;
    pl.y += this.cursor.diff.y;
    pr.x += this.cursor.diff.x;
    pr.y += this.cursor.diff.y;
    ppl.x -= this.cursor.diff.x;
    ppl.y -= this.cursor.diff.y;
    ppr.x -= this.cursor.diff.x;
    ppr.y -= this.cursor.diff.y;

    this.problem = points[(l+i+4)%l];
    if (ppr.y === this.problem.y) {
      this.problem = false;
    }
  }

  if (i%2 === 1) {
    let c1 = points[(l+i-2)%l];
    let p1 = points[(l+i-1)%l];
    let p2 = points[(l+i+1)%l];
    let c2 = points[(l+i+2)%l];
    let p3 = points[(l+i+3)%l];
    let c3 = points[(l+i+4)%l];
    let p4 = points[(l+i+5)%l];
    if (link === `derivative`) {
      c1.x = p1.x + (p1.x - this.currentPoint.x)
      c1.y = p1.y + (p1.y - this.currentPoint.y)
      c2.x = p2.x + (p2.x - this.currentPoint.x)
      c2.y = p2.y + (p2.y - this.currentPoint.y)
      c3.x = p3.x + (p3.x - c2.x)
      c3.y = p3.y + (p3.y - c2.y)
      this.problem = false;
      if (c3.x !== p4.x + (p4.x - c1.x) || c3.y !== p4.y + (p4.y - c1.y)) {
        this.problem = c3;
      }
    }
    if (link === `direction` || link === `conventional`) {
      let a1 = atan2(this.currentPoint.y-p1.y,this.currentPoint.x-p1.x) + PI;
      let d1 = dist(c1.x, c1.y, p1.x, p1.y);
      c1.x = p1.x + d1 * cos(a1);
      c1.y = p1.y + d1 * sin(a1);
      let a2 = atan2(this.currentPoint.y-p2.y,this.currentPoint.x-p2.x) + PI;
      let d2 = dist(c2.x, c2.y, p2.x, p2.y);
      c2.x = p2.x + d2 * cos(a2);
      c2.y = p2.y + d2 * sin(a2);
      this.problem = c3;
    }
  }
}

movePointsCubic(i, link) {
  const l = points.length;
  if (link === `conventional` && i%3 === 0) {
    let left = points[(l+i-1)%l];
    left.x += this.cursor.diff.x;
    left.y += this.cursor.diff.y;

    let right = points[(l+i+1)%l];
    right.x += this.cursor.diff.x;
    right.y += this.cursor.diff.y;
  }

  if (i%3 > 0) {
    let c, p;
    if (i%3 === 1) {
      c = points[(l+i-2)%l];
      p = points[(l+i-1)%l];
    }
    if (i%3 === 2) {
      c = points[(l+i+2)%l];
      p = points[(l+i+1)%l];
    }
    if (link === `derivative`) {
      c.x = p.x + (p.x - this.currentPoint.x)
      c.y = p.y + (p.y - this.currentPoint.y)
    }
    if (link === `direction` || link === `conventional`) {
      let a = atan2(this.currentPoint.y-p.y,this.currentPoint.x-p.x) + PI;
      let d = dist(c.x, c.y, p.x, p.y);
      c.x = p.x + d * cos(a);
      c.y = p.y + d * sin(a);
    }
  }
}

onMouseMove() {
  if (this.currentPoint) {
    const position = points.indexOf(this.currentPoint);
    const link = this.parameters.link;
    if (this.type === `quadratic`) {
      this.movePointsQuadratic(position, link);
    } else {
      this.movePointsCubic(position, link);
    }
    redraw();
  }
}
