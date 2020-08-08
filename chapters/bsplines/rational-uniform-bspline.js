module.exports = {
  degree: 3,
  activeDistance: 9,
  weights: [],

  setup() {
    this.size(400, 400);

    var TAU = Math.PI*2;
    var r = this.width/3;
    for (let i=0; i<6; i++) {
      this.points.push({
        x: this.width/2 + r * Math.cos(i/6 * TAU),
        y: this.height/2 + r * Math.sin(i/6 * TAU)
      });
    }
    this.points = this.points.concat(this.points.slice(0,3));
    this.closed = this.degree;

    this.knots = this.formKnots(this.points);
    this.weights = this.formWeights(this.points);

    if(this.props.controller) {
      this.props.controller(this, this.knots, this.weights, this.closed);
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
