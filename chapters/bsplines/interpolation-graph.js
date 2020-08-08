var colors = [
  '#C00',
  '#CC0',
  '#0C0',
  '#0CC',
  '#00C',
  '#C0C',
  '#600',
  '#660',
  '#060',
  '#066',
  '#006',
  '#606'
];

module.exports = {
  degree: 3,
  activeDistance: 9,
  cache: { N: [] },

  setup() {
    this.size(600, 300);
    this.points = [
      {x:0,   y:   0},
      {x:100, y:-100},
      {x:200, y: 100},
      {x:300, y:-100},
      {x:400, y: 100},
      {x:500, y:   0}
    ];
    this.knots = this.formKnots(this.points);
    if(this.props.controller) {
      this.props.controller(this, this.knots);
    }
    this.draw();
  },

  draw() {
    this.clear();
    var pad = 25;
    this.grid(pad);
    this.stroke(0);
    this.line(pad,0,pad,this.height);
    var y = this.height - pad;
    this.line(0,y,this.width,y);

    var k = this.degree;
    var n = this.points.length || 4;

    for (let i=0; i<n+1+k; i++) {
      this.drawN(i, k, pad, (this.width-pad)/(2*(n+2)), this.height-2*pad);
    }
  },

  drawN(i, k, pad, w, h) {
    this.stroke(colors[i]);
    let knots = this.knots;
    this.beginPath();
    for (let start=i-1, t=start, step=0.1, end=i+k+1; t<end; t+=step) {
      let x = pad + i*w + t*w;
      let y = this.height - pad - this.N(i, k, t) * h;
      this.vertex(x, y);
    }
    this.endPath();
  },

  N(i, k, t) {
    let t_i   = this.knots[i];
    let t_i1  = this.knots[i+1];
    let t_ik1 = this.knots[i+k-1];
    let t_ik  = this.knots[i+k];

    if (k===1) {
      return (t_i <= t && t <= t_i1) ? 1 : 0;
    }

    let n1 = t - t_i;
    let d1 = t_ik1 - t_i;
    let a1 = d1===0? 0: n1/d1;

    let n2 = t_ik - t;
    let d2 = t_ik - t_i1;
    let a2 = d2===0? 0: n2/d2;

    let N1 = 0;
    if (a1 !== 0) {
      let n1v = this.ensureN(i,k-1,t);
      N1 = n1v === undefined ? this.N(i,k-1,t) : n1v;
    }

    let N2 = 0;
    if (a2 !== 0) {
      let n2v = this.ensureN(i+1,k-1,t);
      N2 = n2v === undefined ? this.N(i+1,k-1,t) : n2v;
    }

    this.cacheN(i,k,t, a1 * N1 + a2 * N2);
    return this.cache.N[i][k][t];
  },

  ensureN(i,k,t) {
    if (!this.cache.N) { this.cache.N = []; }
    let N = this.cache.N;
    if (!N[i]) { N[i] = []; }
    if (!N[i][k]) { N[i][k] = []; }
    return N[i][k][t];
  },

  cacheN(i,k,t,value) {
    this.ensureN(i,k,t);
    this.cache.N[i][k][t] = value;
  }
};
