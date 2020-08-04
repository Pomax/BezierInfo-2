import { Bezier, Point } from "./bezier.js";

function compute(t, a, b, c, d) {
  let mt = 1 - t,
    t2 = t * t,
    t3 = t2 * t,
    mt2 = mt * mt,
    mt3 = mt2 * mt;
  return a * mt3 + 3 * b * mt2 * t + 3 * c * mt * t2 + d * t3;
}

function computeDerivative(t, a, b, c, d) {
  let mt = 1 - t,
    t2 = t * t,
    mt2 = mt * mt,
    u = 3 * (a - b),
    v = 3 * (b - c),
    w = 3 * (c - d);
  return u * mt2 + 2 * v * mt * t + w * t2;
}

/**
 * A canvas-aware Bezier curve class
 */
class Cubic extends Bezier {
  get(t) {
    let p = this.points;
    let ret = new Point(
      compute(t, p[0].x, p[1].x, p[2].x, p[3].x),
      compute(t, p[0].y, p[1].y, p[2].y, p[3].y)
    );
    ret.t = t;
    return ret;
  }

  getDerivative(t) {
    let p = this.points;
    let ret = new Point(
      computeDerivative(t, p[0].x, p[1].x, p[2].x, p[3].x),
      computeDerivative(t, p[0].y, p[1].y, p[2].y, p[3].y)
    );
    ret.t = t;
    return ret;
  }
}

export { Cubic };
