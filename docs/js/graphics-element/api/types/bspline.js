import interpolate from "../util/interpolate-bspline.js";

// cubic B-Spline
const DEGREE = 3;

class BSpline {
  constructor(apiInstance, points) {
    this.api = apiInstance;
    this.ctx = apiInstance.ctx;

    // the spline library needs points in array format [x,y] rather than object format {x:..., y:...}
    this.points = points.map((v) => {
      if (v instanceof Array) return v;
      return [v.x, v.y];
    });
  }

  getLUT(count) {
    let c = count - 1;
    return [...new Array(count)].map((_, i) => {
      let p = interpolate(i / c, DEGREE, this.points, this.knots, this.weights);
      return { x: p[0], y: p[1] };
    });
  }

  formKnots(open = false) {
    if (!open) return this.formUniformKnots();

    let knots = [],
      l = this.points.length,
      m = l - DEGREE;

    // form the open-uniform knot vector
    for (let i = 1; i < l - DEGREE; i++) {
      knots.push(i + DEGREE);
    }
    // add [degree] zeroes at the front
    for (let i = 0; i <= DEGREE; i++) {
      knots = [DEGREE].concat(knots);
    }
    // add [degree] max-values to the back
    for (let i = 0; i <= DEGREE; i++) {
      knots.push(m + DEGREE);
    }

    return (this.knots = knots);
  }

  formUniformKnots() {
    return (this.knots = [...new Array(this.points.length + DEGREE + 1)].map((_, i) => i));
  }

  formWeights() {
    return (this.weights = this.points.map((p) => 1));
  }
}

export { BSpline };
