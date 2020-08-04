import { Point } from "./point.js";

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
class Bezier {
  constructor(apiInstance, ...coords) {
    if (coords.length === 8) {
      this.points = [
        new Point(coords[0], coords[1]),
        new Point(coords[2], coords[3]),
        new Point(coords[4], coords[5]),
        new Point(coords[6], coords[7]),
      ];
    }
    this.ctx = apiInstance.ctx;
    this.update();
  }

  update() {
    this.buildLUT(25);
  }

  buildLUT(n) {
    this.lut = [];
    for (let i = 0; i <= n; i++) {
      this.lut[i] = this.get(i / n);
    }
  }

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

  getPointNear(point, d = 5) {
    const { x, y } = point;
    const p = this.points;
    for (let i = 0, e = p.length; i < e; i++) {
      let dx = Math.abs(p[i].x - x);
      let dy = Math.abs(p[i].y - y);
      if ((dx * dx + dy * dy) ** 0.5 <= d) {
        return p[i];
      }
    }
  }

  getProjectionPoint(point) {
    const { x, y } = point;
    // project this point onto the curve and return _that_ point
    const n = this.lut.length - 1,
      p = this.points;

    let d,
      closest,
      smallestDistance = Number.MAX_SAFE_INTEGER;

    // coarse check
    this.lut.forEach((p, i) => {
      d = p.dist(x, y);
      if (d < smallestDistance) {
        smallestDistance = d;
        p.t = i / n;
        closest = p;
      }
    });

    // fine check
    for (let o = -0.1, t, np, st = closest.t; o <= 0.1; o += 0.005) {
      t = st + o;
      if (t < 0) continue;
      if (t > 1) continue;
      np = new Point(
        compute(t, p[0].x, p[1].x, p[2].x, p[3].x),
        compute(t, p[0].y, p[1].y, p[2].y, p[3].y)
      );
      d = np.dist(x, y);
      if (d < smallestDistance) {
        smallestDistance = d;
        closest = np;
        closest.t = t;
      }
    }

    return closest;
  }

  drawCurve() {
    const ctx = this.ctx;
    const p = this.points;
    ctx.cacheStyle();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `#333`;
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.bezierCurveTo(p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);
    ctx.stroke();
    ctx.restoreStyle();
  }

  drawPoints() {
    const ctx = this.ctx;
    ctx.cacheStyle();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `#999`;
    const colors = [`red`, `green`, `blue`, `yellow`];
    this.points.forEach((p, i) => {
      ctx.fillStyle = colors[i];
      p.draw(ctx);
    });
    ctx.restoreStyle();
  }

  drawSkeleton() {
    const ctx = this.ctx;
    ctx.cacheStyle();
    const p = this.points;
    ctx.strokeStyle = `#555`;
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.lineTo(p[1].x, p[1].y);
    ctx.lineTo(p[2].x, p[2].y);
    ctx.lineTo(p[3].x, p[3].y);
    ctx.stroke();
    ctx.restoreStyle();
  }

  drawNormals() {
    const ctx = this.ctx;
    ctx.cacheStyle();
    this.lut.forEach((p) => {
      let tp = this.getDerivative(p.t).normalize(20);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - tp.y, p.y + tp.x);
      ctx.strokeStyle = `#CC00FFCC`;
      ctx.stroke();
    });
    ctx.restoreStyle();
  }
}

export { Bezier };
