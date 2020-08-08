module.exports = {
  degree: 3,
  activeDistance: 9,

  setup() {
    this.size(600, 300);
    this.draw();
  },

  draw() {
    this.clear();
    this.grid(25);
    var p = this.points[0];
    this.points.forEach(n => {
      this.stroke(200);
      this.line(n.x, n.y, p.x, p.y);
      p = n;
      this.stroke(0);
      this.circle(p.x, p.y, 4);
    });
    this.drawSplineData();
  },

  drawSplineData() {
    if (this.points.length <= this.degree) return;
    var mapped = this.points.map(p => [p.x, p.y]);
    this.drawCurve(mapped);
    this.drawKnots(mapped);
  }
};
