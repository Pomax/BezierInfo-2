module.exports = {
  degree: 3,
  activeDistance: 9,

  setup() {
    this.size(400, 400);

    var TAU = Math.PI*2;
    for (let i=0; i<TAU; i+=TAU/10) {
      this.points.push({
        x: this.width/2 + 100 * Math.cos(i),
        y: this.height/2 + 100 * Math.sin(i)
      });
    }

    this.knots = this.formKnots(this.points, true);

    if(this.props.controller) {
      this.props.controller(this, this.knots);
    }

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
