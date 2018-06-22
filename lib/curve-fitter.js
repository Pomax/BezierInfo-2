var invert = require('./matrix-invert.js');
var matrices = [];

var binomialCoefficients = [[1],[1,1]];

function binomial(n,k) {
  if (n===0) return 1;
  var lut = binomialCoefficients;
  while(n >= lut.length) {
    var s = lut.length;
    var nextRow = [1];
    for(var i=1,prev=s-1; i<s; i++) {
      nextRow[i] = lut[prev][i-1] + lut[prev][i];
    }
    nextRow[s] = 1;
    lut.push(nextRow);
  }
  return lut[n][k];
}


function dist(p1,p2) {
  var dx = p1.x - p2.x, dy = p1.y - p2.y;
  return Math.sqrt(dx*dx + dy*dy);
}

function transpose(M) {
  var Mt = [];
  M.forEach(row => Mt.push([]));
  M.forEach((row,r) => row.forEach((v,c) => Mt[c][r] = v));
  return Mt;
}

function row(M,i) {
  return M[i];
}

function col(M,i) {
  var col = [];
  for(var r=0, l=M.length; r<l; r++) {
    col.push(M[r][i]);
  }
  return col;
}

function multiply(M1, M2) {
  // prep
  var M = [];
  var dims = [M1.length, M1[0].length, M2.length, M2[0].length];
  // work
  for (var r=0, c; r<dims[0]; r++) {
    M[r] = [];
    var _row = row(M1, r);
    for (c=0; c<dims[3]; c++) {
      var _col = col(M2,c);
      var reducer = (a,v,i) => a + _col[i]*v;
      M[r][c] = _row.reduce(reducer, 0);
    }
  }
  return M;
}

function getValueColumn(P, prop) {
  var col = [];
  P.forEach(v => col.push([v[prop]]));
  return col;
}

function computeBasisMatrix(n) {
  /*
    We can form any basis matrix using a generative approach:

     - it's an M = (n x n) matrix
     - it's a lower triangular matrix: all the entries above the main diagonal are zero
     - the main diagonal consists of the binomial coefficients for n
     - all entries are symmetric about the antidiagonal.

    What's more, if we number rows and columns starting at 0, then
    the value at position M[r,c], with row=r and column=c, can be
    expressed as:

      M[r,c] = (r choose c) * M[r,r] * S,

      where S = 1 if r+c is even, or -1 otherwise

    That is: the values in column c are directly computed off of the
    binomial coefficients on the main diagonal, through multiplication
    by a binomial based on matrix position, with the sign of the value
    also determined by matrix position. This is actually very easy to
    write out in code:
  */

  // form the square matrix, and set it to all zeroes
  var M = [], i = n;
  while (i--) { M[i] = "0".repeat(n).split('').map(v => parseInt(v)); }

  // populate the main diagonal
  var k = n - 1;
  for (i=0; i<n; i++) { M[i][i] = binomial(k, i); }

  // compute the remaining values
  for (var c=0, r; c<n; c++) {
    for (r=c+1; r<n; r++) {
      var sign = (r+c)%2 ? -1 : 1;
      var value = binomial(r, c) * M[r][r];
      M[r][c] = sign * value; }}

  return M;
}

function computeTimeValues(P, n) {
  n = n || P.length;
  var D = [0];
  for(var i = 1; i<n; i++) {
    D[i] = D[i-1] + dist(P[i-1], P[i]);
  }
  var S = [0], len = D[n-1];
  D.forEach((v,i) => { S[i] = v/len; });
  return S;
}

function raiseRowPower(row, i) {
  return row.map(v => Math.pow(v,i));
}

function formTMatrix(S, n) {
  n = n || S.length;
  var Tp = [];
  // it's easier to generate the transposed matrix:
  for(var i=0; i<n; i++) Tp.push( raiseRowPower(S, i));
  return {
    Tt: Tp,
    T: transpose(Tp) // and then transpose "again" to get the real matrix
  };
}

function computeBestFit(P, M, S, n) {
  n = n || P.length;
  var tm = formTMatrix(S, n),
      T = tm.T,
      Tt = tm.Tt,
      M1 = invert(M),
      TtT1 = invert(multiply(Tt,T)),
      step1 = multiply(TtT1, Tt),
      step2 = multiply(M1, step1),
      X = getValueColumn(P,'x'),
      Cx = multiply(step2, X),
      Y = getValueColumn(P,'y'),
      Cy = multiply(step2, Y);
  return { x: Cx, y: Cy };
}

function fit(points) {
  var n = points.length,
      P = Array.from(points),
      M = computeBasisMatrix(n),
      S = computeTimeValues(P, n),
      C = computeBestFit(P, M, S, n);
  return { n, P, M, S, C };
}

module.exports = window.makeFit = fit;
