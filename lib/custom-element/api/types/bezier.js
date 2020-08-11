import { Vector } from "./vector.js";
import { Bezier as Original } from "../../lib/bezierjs/bezier.js";

/**
 * A canvas-aware Bezier curve class
 */
class Bezier extends Original {
  static defaultQuadratic(apiInstance) {
    return new Bezier(apiInstance, 70, 250, 20, 110, 220, 60);
  }

  static defaultCubic(apiInstance) {
    return new Bezier(apiInstance, 110, 150, 25, 190, 210, 250, 210, 30);
  }

  constructor(apiInstance, ...coords) {
    super(...coords);
    this.api = apiInstance;
    this.ctx = apiInstance.ctx;
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
    ctx.cacheStyle();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `#333`;
    ctx.beginPath();
    const lut = this.getLUT().slice();
    let p = lut.shift();
    ctx.moveTo(p.x, p.y);
    while (lut.length) {
      p = lut.shift();
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restoreStyle();
  }

  drawPoints() {
    const colors = [`red`, `green`, `blue`, `yellow`];
    const api = this.api;
    const ctx = this.ctx;

    ctx.cacheStyle();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `#999`;
    this.points.forEach((p, i) => {
      api.setFill(colors[i % colors.length]);
      api.circle(p.x, p.y, 5);
      api.setFill(`black`);
      api.text(`(${p.x},${p.y})`, p.x + 10, p.y + 10);
    });
    ctx.restoreStyle();
  }

  drawSkeleton(t = false) {
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
      if (t !== false) {
        // TODO: additional cubic struts
        // ... code goes here ...
      }
    }
    ctx.stroke();
    ctx.restoreStyle();
  }

  drawStruts(t) {
    const p = this.points.map((p) => new Vector(p));
    const mt = 1 - t;

    const api = this.api;
    const ctx = api.ctx;
    ctx.cacheStyle();
    api.noFill();

    let s = 0;
    let n = p.length + 1;
    while (--n > 1) {
      let list = p.slice(s, s + n);
      api.start();
      for (let i = 0, e = list.length - 1; i < e; i++) {
        let pt = list[i + 1].subtract(list[i + 1].subtract(list[i]).scale(mt));
        p.push(pt);
        api.vertex(pt.x, pt.y);
        api.circle(pt.x, pt.y, 5);
      }
      api.end();
      s += n;
    }
    ctx.restoreStyle();

    return p;
  }
}

export { Bezier };
