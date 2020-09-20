import { Vector } from "./vector.js";
import { Bezier as Original } from "../../lib/bezierjs/bezier.js";
import { fitCurveToPoints } from "../util/fit-curve-to-points.js";

/**
 * A canvas-aware Bezier curve class
 */
class Bezier extends Original {
  static defaultQuadratic(apiInstance) {
    if (!apiInstance) {
      throw new Error(`missing reference of API instance in Bezier.defaultQuadratic(instance)`);
    }
    return new Bezier(apiInstance, 70, 250, 20, 110, 220, 60);
  }

  static defaultCubic(apiInstance) {
    if (!apiInstance) {
      throw new Error(`missing reference of API instance in Bezier.defaultCubic(instance)`);
    }
    return new Bezier(apiInstance, 110, 150, 25, 190, 210, 250, 210, 30);
  }

  static fitCurveToPoints(apiInstance, points, tvalues) {
    if (!tvalues) {
      const D = [0];
      for (let i = 1; i < n; i++) {
        D[i] = D[i - 1] + dist(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
      }
      const S = [],
        len = D[n - 1];
      D.forEach((v, i) => {
        S[i] = v / len;
      });
      tvalues = S;
    }

    const bestFitData = fitCurveToPoints(points, tvalues),
      x = bestFitData.x,
      y = bestFitData.y,
      bpoints = x.map((r, i) => ({ x: r[0], y: y[i][0] }));

    return new Bezier(apiInstance, bpoints);
  }

  constructor(apiInstance, ...coords) {
    if (!apiInstance || !apiInstance.setMovable) {
      throw new Error(`missing reference of API instance in Bezier constructor`);
    }
    super(...coords);
    this.api = apiInstance;
    this.ctx = apiInstance.ctx;
  }

  project(x, y) {
    return super.project({ x, y });
  }

  getPointNear(x, y, d = 5) {
    const p = this.points;
    for (let i = 0, e = p.length; i < e; i++) {
      let dx = Math.abs(p[i].x - x);
      let dy = Math.abs(p[i].y - y);
      if ((dx * dx + dy * dy) ** 0.5 <= d) {
        return p[i];
      }
    }
  }

  drawCurve(color = `#333`) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    const lut = this.getLUT().slice();
    let p = lut.shift();
    ctx.moveTo(p.x, p.y);
    while (lut.length) {
      p = lut.shift();
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawPoints(labels = true) {
    const colors = [`red`, `green`, `blue`, `yellow`, `orange`, `cyan`, `magenta`];
    const api = this.api;
    const ctx = this.ctx;

    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `#999`;
    this.points.forEach((p, i) => {
      api.setFill(colors[i % colors.length]);
      api.circle(p.x, p.y, 5);
      if (labels) {
        api.setFill(`black`);
        let x = p.x | 0;
        let y = p.y | 0;
        api.text(`(${x},${y})`, x + 10, y + 10);
      }
    });
    ctx.restore();
  }

  drawSkeleton(color = `#555`) {
    const api = this.api;
    const ctx = this.ctx;
    ctx.save();
    const p = this.points;
    api.noFill();
    api.setStroke(color);
    api.start();
    p.forEach((v) => api.vertex(v.x, v.y));
    api.end();
    ctx.restore();
  }

  getStrutPoints(t) {
    const p = this.points.map((p) => new Vector(p));
    const mt = 1 - t;

    let s = 0;
    let n = p.length + 1;
    while (--n > 1) {
      let list = p.slice(s, s + n);
      for (let i = 0, e = list.length - 1; i < e; i++) {
        let pt = list[i + 1].subtract(list[i + 1].subtract(list[i]).scale(mt));
        p.push(pt);
      }
      s += n;
    }

    return p;
  }

  drawStruts(t, color = `black`, showpoints = true) {
    const p = t.forEach ? t : this.getStrutPoints(t);

    const api = this.api;
    const ctx = api.ctx;
    ctx.save();
    api.noFill();
    api.setStroke(color);

    let s = this.points.length;
    let n = this.points.length;
    while (--n > 1) {
      api.start();
      for (let i = 0; i < n; i++) {
        let pt = p[s + i];
        api.vertex(pt.x, pt.y);
        if (showpoints) api.circle(pt.x, pt.y, 5);
      }
      api.end();
      s += n;
    }
    ctx.restore();

    return p;
  }

  drawBoundingBox(color = `black`) {
    let bbox = this.bbox(),
      mx = bbox.x.min,
      my = bbox.y.min,
      MX = bbox.x.max,
      MY = bbox.y.max,
      api = this.api;
    api.save();
    api.noFill();
    api.setStroke(color);
    api.rect(mx, my, MX - mx, MY - my);
    api.restore();
  }
}

export { Bezier };
