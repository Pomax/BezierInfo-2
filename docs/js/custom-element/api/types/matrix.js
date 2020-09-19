function invert(M) {
  // Copied from http://blog.acipo.com/matrix-inversion-in-javascript/
  // With permission, http://blog.acipo.com/matrix-inversion-in-javascript/#comment-5057289889

  // (1) 'augment' the matrix (left) by the identity (on the right)
  // (2) Turn the matrix on the left into the identity by elemetry row ops
  // (3) The matrix on the right is the inverse (was the identity matrix)
  // There are 3 elemtary row ops:
  // (a) Swap 2 rows
  // (b) Multiply a row by a scalar
  // (c) Add 2 rows

  //if the matrix isn't square: exit (error)
  if (M.length !== M[0].length) {
    console.log("not square");
    return;
  }

  //create the identity matrix (I), and a copy (C) of the original
  var i = 0,
    ii = 0,
    j = 0,
    dim = M.length,
    e = 0,
    t = 0;
  var I = [],
    C = [];
  for (i = 0; i < dim; i += 1) {
    // Create the row
    I[I.length] = [];
    C[C.length] = [];
    for (j = 0; j < dim; j += 1) {
      //if we're on the diagonal, put a 1 (for identity)
      if (i == j) {
        I[i][j] = 1;
      } else {
        I[i][j] = 0;
      }

      // Also, make the copy of the original
      C[i][j] = M[i][j];
    }
  }

  // Perform elementary row operations
  for (i = 0; i < dim; i += 1) {
    // get the element e on the diagonal
    e = C[i][i];

    // if we have a 0 on the diagonal (we'll need to swap with a lower row)
    if (e == 0) {
      //look through every row below the i'th row
      for (ii = i + 1; ii < dim; ii += 1) {
        //if the ii'th row has a non-0 in the i'th col
        if (C[ii][i] != 0) {
          //it would make the diagonal have a non-0 so swap it
          for (j = 0; j < dim; j++) {
            e = C[i][j]; //temp store i'th row
            C[i][j] = C[ii][j]; //replace i'th row by ii'th
            C[ii][j] = e; //repace ii'th by temp
            e = I[i][j]; //temp store i'th row
            I[i][j] = I[ii][j]; //replace i'th row by ii'th
            I[ii][j] = e; //repace ii'th by temp
          }
          //don't bother checking other rows since we've swapped
          break;
        }
      }
      //get the new diagonal
      e = C[i][i];
      //if it's still 0, not invertable (error)
      if (e == 0) {
        return;
      }
    }

    // Scale this row down by e (so we have a 1 on the diagonal)
    for (j = 0; j < dim; j++) {
      C[i][j] = C[i][j] / e; //apply to original matrix
      I[i][j] = I[i][j] / e; //apply to identity
    }

    // Subtract this row (scaled appropriately for each row) from ALL of
    // the other rows so that there will be 0's in this column in the
    // rows above and below this one
    for (ii = 0; ii < dim; ii++) {
      // Only apply to other rows (we want a 1 on the diagonal)
      if (ii == i) {
        continue;
      }

      // We want to change this element to 0
      e = C[ii][i];

      // Subtract (the row above(or below) scaled by e) from (the
      // current row) but start at the i'th column and assume all the
      // stuff left of diagonal is 0 (which it should be if we made this
      // algorithm correctly)
      for (j = 0; j < dim; j++) {
        C[ii][j] -= e * C[i][j]; //apply to original matrix
        I[ii][j] -= e * I[i][j]; //apply to identity
      }
    }
  }

  //we've done all operations, C should be the identity
  //matrix I should be the inverse:
  return I;
}

function multiply(m1, m2) {
  var M = [];
  var m2t = transpose(m2);
  m1.forEach((row, r) => {
    M[r] = [];
    m2t.forEach((col, c) => {
      M[r][c] = row.map((v, i) => col[i] * v).reduce((a, v) => a + v, 0);
    });
  });
  return M;
}

function transpose(M) {
  return M[0].map((col, i) => M.map((row) => row[i]));
}

class Matrix {
  constructor(n, m, data) {
    data = n instanceof Array ? n : data;
    this.data = data ?? [...new Array(n)].map((v) => [...new Array(m)].map((v) => 0));
    this.rows = this.data.length;
    this.cols = this.data[0].length;
  }
  setData(data) {
    this.data = data;
  }
  get(i, j) {
    return this.data[i][j];
  }
  set(i, j, value) {
    this.data[i][j] = value;
  }
  row(i) {
    return this.data[i];
  }
  col(j) {
    var d = this.data,
      col = [];
    for (let r = 0, l = d.length; r < l; r++) {
      col.push(d[r][j]);
    }
    return col;
  }
  multiply(other) {
    return new Matrix(multiply(this.data, other.data));
  }
  invert() {
    return new Matrix(invert(this.data));
  }
  transpose() {
    return new Matrix(transpose(this.data));
  }
}

export { Matrix };
