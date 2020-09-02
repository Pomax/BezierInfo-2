var binomialCoefficients = [[1], [1, 1]];

/**
 * ... docs go here ...
 */
function binomial(n, k) {
  if (n === 0) return 1;
  var lut = binomialCoefficients;
  while (n >= lut.length) {
    var s = lut.length;
    var nextRow = [1];
    for (var i = 1, prev = s - 1; i < s; i++) {
      nextRow[i] = lut[prev][i - 1] + lut[prev][i];
    }
    nextRow[s] = 1;
    lut.push(nextRow);
  }
  return lut[n][k];
}

export default binomial;
