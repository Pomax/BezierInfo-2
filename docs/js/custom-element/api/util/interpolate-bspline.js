// https://github.com/thibauts/b-spline
export default function interpolate(t, degree, points, knots, weights, result, scaled) {
  var i, j, s, l; // function-scoped iteration variables
  var n = points.length; // points count
  var d = points[0].length; // point dimensionality

  if (degree < 1) throw new Error("degree must be at least 1 (linear)");
  if (degree > n - 1) throw new Error("degree must be less than or equal to point count - 1");

  if (!weights) {
    // build weight vector of length [n]
    weights = [];
    for (i = 0; i < n; i++) {
      weights[i] = 1;
    }
  }

  // closed curve?
  if (weights.length < points.length) {
    weights = weights.concat(weights.slice(0, degree));
  }

  if (!knots) {
    // build knot vector of length [n + degree + 1]
    var knots = [];
    for (i = 0; i < n + degree + 1; i++) {
      knots[i] = i;
    }
  } else {
    if (knots.length !== n + degree + 1) throw new Error("bad knot vector length");
  }

  // closed curve?
  if (knots.length === points.length) {
    knots = knots.concat(knots.slice(0, degree));
  }

  var domain = [degree, knots.length - 1 - degree];

  var low = knots[domain[0]];
  var high = knots[domain[1]];

  // remap t to the domain where the spline is defined
  if (!scaled) {
    t = t * (high - low) + low;
  }

  if (t < low || t > high) throw new Error("out of bounds");

  // find s (the spline segment) for the [t] value provided
  for (s = domain[0]; s < domain[1]; s++) {
    if (t >= knots[s] && t <= knots[s + 1]) {
      break;
    }
  }

  // convert points to homogeneous coordinates
  var v = [];
  for (i = 0; i < n; i++) {
    v[i] = [];
    for (j = 0; j < d; j++) {
      v[i][j] = points[i][j] * weights[i];
    }
    v[i][d] = weights[i];
  }

  // l (level) goes from 1 to the curve degree + 1
  var alpha;
  for (l = 1; l <= degree + 1; l++) {
    // build level l of the pyramid
    for (i = s; i > s - degree - 1 + l; i--) {
      alpha = (t - knots[i]) / (knots[i + degree + 1 - l] - knots[i]);

      // interpolate each component
      for (j = 0; j < d + 1; j++) {
        v[i][j] = (1 - alpha) * v[i - 1][j] + alpha * v[i][j];
      }
    }
  }

  // convert back to cartesian and return
  var result = result || [];
  for (i = 0; i < d; i++) {
    result[i] = v[s][i] / v[s][d];
  }

  return result;
}
