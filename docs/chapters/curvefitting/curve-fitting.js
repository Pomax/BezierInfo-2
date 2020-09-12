let points=[], curve, tvalues=[];

setup() {
  let btn = find(`.toggle`);
  if (btn) btn.listen(`click`, evt => this.toggle());
  this.mode = 0;
  this.label = `Using equidistant t values`;
}

toggle() {
  this.mode = (this.mode + 1) % 2;
  this.setSliderValues(this.mode);
  redraw();
}

draw() {
  clear();

  setColor('black');
  setFontSize(16);
  setTextStroke(`white`, 4);
  const n = points.length;
  if (n > 2) {
    curve = this.fitCurveToPoints(n);
    curve.drawSkeleton(`blue`);
    curve.drawCurve();
    text(this.label, this.width/2, 20, CENTER);
  }

  points.forEach(p => circle(p.x, p.y, 3));
}

fitCurveToPoints(n) {
  // alright, let's do this thing:
  const tm = this.formTMatrix(tvalues, n),
        T = tm.T,
        Tt = tm.Tt,
        M = this.generateBasisMatrix(n),
        M1 = M.invert(),
        TtT1 = Tt.multiply(T).invert(),
        step1 = TtT1.multiply(Tt),
        step2 = M1.multiply(step1),
        // almost there...
        X = new Matrix(points.map((v) => [v.x])),
        Cx = step2.multiply(X),
        x = Cx.data,
        // almost...
        Y = new Matrix(points.map((v) => [v.y])),
        Cy = step2.multiply(Y),
        y = Cy.data,
        // last step!
        bpoints = x.map((r,i) => ({x: r[0], y: y[i][0]}));

  return new Bezier(this, bpoints);
}

formTMatrix(row, n) {
  // it's actually easier to create the transposed
  // version, and then (un)transpose that to get T!
  let data = [];
  for (var i = 0; i < n; i++) {
    data.push(row.map((v) => v ** i));
  }
  const Tt = new Matrix(n, n, data);
  const T = Tt.transpose();
  return { T, Tt };
}

generateBasisMatrix(n) {
  const M = new Matrix(n, n);

  // populate the main diagonal
  var k = n - 1;
  for (let i = 0; i < n; i++) {
    M.set(i, i, binomial(k, i));
  }

  // compute the remaining values
  for (var c = 0, r; c < n; c++) {
    for (r = c + 1; r < n; r++) {
      var sign = (r + c) % 2 === 0 ? 1 : -1;
      var value = binomial(r, c) * M.get(r, r);
      M.set(r, c, sign * value);
    }
  }

  return M;
}

onMouseDown() {
  if (!this.currentPoint) {
    const {x, y} = this.cursor;
    points.push({ x, y });
    resetMovable(points);
    this.updateSliders();
    redraw();
  }
}


// -------------------------------------
// The rest of this code is slider logic
// -------------------------------------


updateSliders() {
  removeSliders();
  const l = points.length-1;
  if (l >= 2) {
    points.forEach((_,i) => {
      addSlider(`slide-control`, `!t<sub>${i}</sub>`, 0, 1, 0.01, i/l, v => this.setTvalue(i, v));
    });
  }
  this.label = `Using equidistant t values`;
}

setTvalue(i, t) {
  this.label = `Using custom t values`;
  tvalues[i] = t;
  redraw();
}

setSliderValues(mode) {
  let n = points.length;

  // equidistant
  if (mode === 0) {
    this.label = `Using equidistant t values`;
    tvalues = [...new Array(n)].map((_,i) =>i/(n-1));
  }

  // polygonal distance
  if (mode === 1) {
    this.label = `Using polygonal distance t values`;
    const D = [0];
    for(let i = 1; i<n; i++) {
      D[i] = D[i-1] + dist(
        points[i-1].x, points[i-1].y,
        points[i].x, points[i].y
      );
    }
    const S = [], len = D[n-1];
    D.forEach((v,i) => { S[i] = v/len; });
    tvalues = S;
  }

  findAll(`input[type=range]`).forEach((s,i) => {
    s.setAttribute(`value`, tvalues[i]);
    s.value = tvalues[i];
  });
}
