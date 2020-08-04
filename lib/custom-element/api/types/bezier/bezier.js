import { Point } from "../point.js";

/**
 * A canvas-aware Bezier curve class
 */
class Bezier {
  constructor(apiInstance, points) {
    this.points = points;
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
      np = this.get(t);
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
    if (!p[3]) {
        ctx.quadraticCurveTo(p[1].x, p[1].y, p[2].x, p[2].y);
    } else {
        ctx.bezierCurveTo(p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);
    }
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
    if (p[3]) {
        ctx.lineTo(p[3].x, p[3].y);
    }
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

export { Bezier, Point }
