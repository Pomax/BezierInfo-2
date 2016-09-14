module.exports = {
  degree: 3,
  activeDistance: 9,

  setup() {
    this.size(600, 300);
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
    this.N(3, 3, pad);
  },

  // based on http://www.ibiblio.org/e-notes/Splines/Bspline.java
  N(n, k, pad) {
    var n1 = n+1;
    var nt = n+k+1;
    var w2 = this.width/2;
    var h1 = this.height;
    var step = 0.1;
    var ti = [0,1,2,3,4,5,6];
    var t = ti[0];
    var N = [[],[],[],[],[],[],[],[]];

    var i1 = 0;
    for (var l = 0; l < w2; l++) {
      while (t >= ti[i1] ) {
        i1++;
      }
      var i = i1-1;
      for (var s = 0; s < nt; s++) {
        N[s][l] = 0;
      }
      N[i][l] = 1;
      //  basis functions calculation
      for (var m = 2; m <= k; m++) {
        var jb = i-m+1;
        if (jb < 0) {
          jb = 0;
        }
        for (var j = jb; j <= i; j++) {
          N[j][l] = N[j][l]*(t - ti[j])/(ti[j+m-1] - ti[j]) +
                    N[j+1][l]*(ti[j+m] - t)/(ti[j+m] - ti[j+1]);
        }
      }
      t += step;
    }

    var colors = [
      '#C00',
      '#CC0',
      '#0C0',
      '#0CC',
      '#00C',
      '#C0C'
    ];

    var stw = this.width/8;
    for (let j = 0; j < n1; j++) {
      t = ti[0];
      let to = t;
      this.stroke(colors[j]);
      for (let l = 1; l < w2; l++) {
        t += step;
        let t1 = t;
        this.line(
          pad + stw * to,
          h1 - (h1 * N[j][l-1]) - pad,
          pad + stw * t1,
          h1 - (h1 * N[j][l]) - pad
        );
        to = t1;
      }
    }

    this.stroke(0);
    this.fill(0);
    for(let j=0; j<n+k+1; j++) {
      this.circle(pad + j*stw, h1 - pad, 3);
    }
  }
};
