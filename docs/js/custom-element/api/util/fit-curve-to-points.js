import { Matrix } from "../types/matrix.js";
import binomial from "./binomial.js";

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
function generateBasisMatrix(n) {
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

/**
 * ...docs go here...
 */
function formTMatrix(row, n) {
  let data = [];
  for (var i = 0; i < n; i++) {
    data.push(row.map((v) => v ** i));
  }
  const Tt = new Matrix(n, n, data);
  const T = Tt.transpose();
  return { T, Tt };
}

/**
 * ...docs go here...
 */
function computeBestFit(points, n, M, S) {
  var tm = formTMatrix(S, n),
    T = tm.T,
    Tt = tm.Tt,
    M1 = M.invert(),
    TtT1 = Tt.multiply(T).invert(),
    step1 = TtT1.multiply(Tt),
    step2 = M1.multiply(step1),
    X = new Matrix(points.map((v) => [v.x])),
    Cx = step2.multiply(X),
    Y = new Matrix(points.map((v) => [v.y])),
    Cy = step2.multiply(Y);
  return { x: Cx.data, y: Cy.data };
}

/**
 * ...docs go here...
 */
function fitCurveToPoints(points, tvalues) {
  const n = points.length;
  return computeBestFit(points, n, generateBasisMatrix(n), tvalues);
}

export { fitCurveToPoints };
