module.exports = {
  degree: 3,
  activeDistance: 9,

  setup() {
    this.size(400, 400);

    var TAU = Math.PI*2;
    for (let i=0; i<TAU; i+=TAU/9) {
      this.points.push({
        x: this.width/2 + 100 * Math.cos(i),
        y: this.height/2 + 100 * Math.sin(i)
      });
    }

    this.knots = this.formKnots(this.points);
    var m = Math.round(this.points.length/2)|0;
    this.knots[m+0] = this.knots[m];
    this.knots[m+1] = this.knots[m];
    this.knots[m+2] = this.knots[m];
    for (let i=m+3; i<this.knots.length; i++) {
      this.knots[i] = this.knots[i-1] + 1;
    }

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
