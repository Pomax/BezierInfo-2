let points = [], utils = Bezier.getUtils();

setup() {
    let w = this.width/4;
    let h = this.height/3;
    points.push({x: 0.30 * this.width, y: 0.25 * this.height});
    points.push({x: 0.80 * this.width, y: 0.50 * this.height});
    points.push({x: 0.30 * this.width, y: 0.75 * this.height});
    if (this.parameters.showCurve) {
        points[1].x = 0.66 * this.width;
        points[1].y = 0.75 * this.height;
    }
    setMovable(points);
}

draw() {
    clear();

    if (points.length === 3) {
        let [p1, p2, p3] = points;
        let c = this.caclulateCenter(p1, p2, p3);

        if (c) {
            if (this.parameters.showCurve) {
              this.showCurve(p1, p2, p3, c);
            } else {
              this.showChords(p1, p2, p3, c);
            }

            setColor(`black`);
            circle(c.x, c.y, 2);
            text(`center`, c.x+5, c.y+5);

            setFill(`#FF000030`)
            setStroke(`red`);
            circle(c.x, c.y, c.r);
            noFill();
            setStroke(`black`)
            arc(c.x, c.y, c.r, c.s, c.e);
        }
    }

    setColor(`black`);
    let lbl = this.parameters.showCurve ? [`start`, `B`, `end`] : [`p1`, `p2`, `p3`];
    points.forEach((p,i) => {
        circle(p.x, p.y, 3);
        text(lbl[i], p.x+7, p.y+7);
    });
}

caclulateCenter(p1, p2, p3) {
    // deltas
    const dx1 = (p2.x - p1.x),
          dy1 = (p2.y - p1.y),
          dx2 = (p3.x - p2.x),
          dy2 = (p3.y - p2.y);

    // perpendiculars (quarter circle turned)
    const dx1p = dx1 * cos(PI/2) - dy1 * sin(PI/2),
          dy1p = dx1 * sin(PI/2) + dy1 * cos(PI/2),
          dx2p = dx2 * cos(PI/2) - dy2 * sin(PI/2),
          dy2p = dx2 * sin(PI/2) + dy2 * cos(PI/2);

    // chord midpoints
    const mx1 = (p1.x + p2.x)/2,
          my1 = (p1.y + p2.y)/2,
          mx2 = (p2.x + p3.x)/2,
          my2 = (p2.y + p3.y)/2;

    // midpoint offsets
    const mx1n = mx1 + dx1p,
          my1n = my1 + dy1p,
          mx2n = mx2 + dx2p,
          my2n = my2 + dy2p;

    // intersection of these lines:
    const i = utils.lli8(mx1,my1,mx1n,my1n, mx2,my2,mx2n,my2n);

    if (!i) return false;

    const r = utils.dist(i,p1);

    // determine arc start/mid/end values, and direction (cw/ccw correction)
    let s = atan2(p1.y - i.y, p1.x - i.x),
        m = atan2(p2.y - i.y, p2.x - i.x),
        e = atan2(p3.y - i.y, p3.x - i.x),
        __;

    if (s<e) {
      if (s>m || m>e) { s += TAU; }
      if (s>e) { __=e; e=s; s=__; }
    } else {
      if (e<m && m<s) { __=e; e=s; s=__; } else { e += TAU; }
    }

    // assign and done.
    i.s = s;
    i.e = e;
    i.r = r;

    return i;
}

showChords(p1, p2, p3, c) {
  setStroke(randomColor() );
  line(p1.x, p1.y, p2.x, p2.y);
  let m1 = { x: (p1.x+p2.x)/2, y: (p1.y+p2.y)/2 };
  line(m1.x, m1.y, c.x + (c.x-m1.x)/2, c.y + (c.y-m1.y)/2);

  setStroke(randomColor() );
  line(p3.x, p3.y, p2.x, p2.y);
  let m2 = { x: (p3.x+p2.x)/2, y: (p3.y+p2.y)/2 };
  line(m2.x, m2.y, c.x + (c.x-m2.x)/2, c.y + (c.y-m2.y)/2);

  setStroke(randomColor() );
  line(p3.x, p3.y, p1.x, p1.y);
  let m3 = { x: (p3.x+p1.x)/2, y: (p3.y+p1.y)/2 };
  line(m3.x, m3.y, c.x + (c.x-m3.x)/2, c.y + (c.y-m3.y)/2);
}

showCurve(p1, p2, p3, c) {
    const d1 = dist(p1.x, p1.y, p2.x, p2.y),
          d2 = dist(p3.x, p3.y, p2.x, p2.y),
          t = d1 / (d1 + d2),
          { A, B, C, S, E } = Bezier.getABC(3, p1, p2, p3, t);

    setStroke(`lightblue`);
    line(B.x,B.y,S.x,S.y);
    line(B.x,B.y,E.x,E.y);
    text(`t=${t.toFixed(2)}`, B.x+10, B.y+20);

    // Check which length we need to use for our e1-e2 segment,
    // corrected for whether B is "above" or "below" the baseline:
    const angle = (atan2(E.y-S.y, E.x-S.x) - atan2(B.y-S.y, B.x-S.x) + TAU) % TAU,
          bc = (angle < 0 || angle > PI ? -1 : 1) * dist(S.x, S.y, E.x, E.y)/3,
          de1 = t * bc,
          de2 = (1-t) * bc;

    // We then determine the circle-aligned slope as normalized dx/dy
    const tangent = [
            { x: B.x - 10 * (B.y-c.y), y: B.y + 10 * (B.x-c.x) },
            { x: B.x + 10 * (B.y-c.y), y: B.y - 10 * (B.x-c.x) }
          ],
          tlength = dist(tangent[0].x, tangent[0].y, tangent[1].x, tangent[1].y),
          dx = (tangent[1].x - tangent[0].x)/tlength,
          dy = (tangent[1].y - tangent[0].y)/tlength;

    line(tangent[0].x, tangent[0].y, tangent[1].x, tangent[1].y);

    // and then construct e1 and e2 as per the chapter text
    const e1 = { x: B.x + de1 * dx, y: B.y + de1 * dy};
    circle(e1.x, e1.y, 3);
    text(`e1`, e1.x+15, e1.y+10);

    const e2 = { x: B.x - de2 * dx, y: B.y - de2 * dy };
    circle(e2.x, e2.y, 3);
    text(`e2`, e2.x+15, e2.y+10);
}
