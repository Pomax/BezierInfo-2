let Point = Vector, points = [];

setup() {
    points.push(new Point(50,50));
    points.push(new Point(150,110));
    points.push(new Point(50,250));
    points.push(new Point(170,170));
    setMovable(points);
}

draw() {
  clear();
  const [p1, p2, p3, p4] = points;

  setStroke(`black`);
  this.drawLine(p1,p2);
  this.drawLine(p3,p4);

  const p = this.lli(
    p1.x, p1.y,
    p2.x, p2.y,
    p3.x, p3.y,
    p4.x, p4.y
  );

  if (p) {
    if (this.onLine(p, p1, p2) && this.onLine(p, p3, p4)) {
      setColor(`lime`);
      circle(p.x, p.y, 3);
      setFill(`black`);
      text(`Intersection at (${p.x|0}, ${p.y|0})`, this.width/2, 15, CENTER);
    } else {
      setColor(`red`);
      circle(p.x, p.y, 3);
    }
  }
}

drawLine(p1, p2) {
  setColor(`black`);
  line(p1.x, p1.y, p2.x, p2.y);
  setStroke(randomColor() );
  circle(p1.x, p1.y, 2);
  circle(p2.x, p2.y, 2);
}

lli(x1, y1, x2, y2, x3, y3, x4, y4) {
  const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
        d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (d == 0) return;
  return { x: nx / d, y: ny / d };
}

onLine(p, p1, p2) {
  const mx = min(p1.x, p2.x),
        my = min(p1.y, p2.y),
        Mx = max(p1.x, p2.x),
        My = max(p1.y, p2.y);
  return (mx <= p.x && my <= p.y && Mx >= p.x && My >= p.y);
}
