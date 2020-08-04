import { Bezier, Point } from "./bezier.js";

function compute(t, a, b, c) {
  let mt = 1 - t;
  return a * (mt * mt) + 2 * b * mt * t + c * (t * t);
}

function computeDerivative(t, a, b, c) {
  let u = 2 * (a - b),
    v = 2 * (b - c);
  return u * (1-t) + v * t;
}

/**
 * A canvas-aware Bezier curve class
 */
class Quadratic extends Bezier {
  get(t) {
    let p = this.points;
    let ret = new Point(
      compute(t, p[0].x, p[1].x, p[2].x),
      compute(t, p[0].y, p[1].y, p[2].y)
    );
    ret.t = t;
    return ret;
  }

  getDerivative(t) {
    let p = this.points;
    let ret = new Point(
      computeDerivative(t, p[0].x, p[1].x, p[2].x),
      computeDerivative(t, p[0].y, p[1].y, p[2].y)
    );
    ret.t = t;
    return ret;
  }
}

export { Quadratic };
