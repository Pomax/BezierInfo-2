import CanvasBuilder from "canvas";
import {
  GraphicsAPI,
  Bezier,
  Vector,
  Matrix,
} from "../../../lib/custom-element/api/graphics-api.js";

import vec from "../../../chapters/pointvectors3d/./vector-lib.js";
import {
  project,
  projectXY,
  projectXZ,
  projectYZ,
} from "../../../chapters/pointvectors3d/./projection.js";

let d, cube;

const noop = () => {};

class Example extends GraphicsAPI {
  setup() {
    super.setup();
    d = this.width / 2 + 25;
    cube = [
      { x: 0, y: 0, z: 0 },
      { x: d, y: 0, z: 0 },
      { x: d, y: d, z: 0 },
      { x: 0, y: d, z: 0 },
      { x: 0, y: 0, z: d },
      { x: d, y: 0, z: d },
      { x: d, y: d, z: d },
      { x: 0, y: d, z: d },
    ].map((p) => project(p));
    const points = (this.points = [
      { x: 120, y: 0, z: 0 },
      { x: 120, y: 220, z: 0 },
      { x: 30, y: 0, z: 30 },
      { x: 0, y: 0, z: 200 },
    ]);
    this.curve = new Bezier(
      this,
      points.map((p) => project(p))
    );
    this.cxy = new Bezier(
      this,
      points.map((p) => projectXY(p))
    );
    this.cxz = new Bezier(
      this,
      points.map((p) => projectXZ(p))
    );
    this.cyz = new Bezier(
      this,
      points.map((p) => projectYZ(p))
    );
    this.t = 0;
  }
  draw() {
    super.draw();
    this.resetTransform();
    this.clear();
    this.translate(this.width / 2 - 60, this.height / 2 + 75);
    const curve = this.curve;

    this.drawCurveProjections();

    this.drawCubeBack();

    curve.drawCurve(`grey`);
    this.setStroke(`grey`);
    this.line(
      curve.points[0].x,
      curve.points[0].y,
      curve.points[1].x,
      curve.points[1].y
    );
    this.line(
      curve.points[2].x,
      curve.points[2].y,
      curve.points[3].x,
      curve.points[3].y
    );
    curve.points.forEach((p) => this.circle(p.x, p.y, 2));

    this.drawPoint(this.t);

    this.drawCubeFront();
  }
  drawCubeBack() {
    const c = cube;

    // x axis
    this.setStroke(`blue`);
    this.line(c[0].x, c[0].y, c[1].x, c[1].y);

    // y axis
    this.setStroke(`red`);
    this.line(c[3].x, c[3].y, c[0].x, c[0].y);

    // z axis
    this.setStroke(`green`);
    this.line(c[0].x, c[0].y, c[4].x, c[4].y);
  }
  drawCurveProjections() {
    this.cxy.drawCurve(`#EEF`);
    this.cxz.drawCurve(`#EEF`);
    this.cyz.drawCurve(`#EEF`);
  }
  drawPoint(t) {
    const curve = this.curve;

    this.setStroke(`red`);

    this.setFill(`red`);
    const p = curve.get(t);
    this.circle(p.x, p.y, 3);

    this.setFill(`black`);
    this.text(`t = ${t.toFixed(2)}`, p.x + 10, p.y + 15);

    const { r, n, dt } = this.getFrenetVectors(t, this.points);

    this.drawVector(p, vec.normalize(r), 40, `blue`, `r`);
    this.drawVector(p, vec.normalize(n), 40, `red`, `n`);
    this.drawVector(p, vec.normalize(dt), 40, `green`, `t′`);
  }
  drawCubeFront() {
    const c = cube;

    // rest of the cube
    this.setStroke("lightgrey");
    this.line(c[1].x, c[1].y, c[2].x, c[2].y);
    this.line(c[2].x, c[2].y, c[3].x, c[3].y);
    this.line(c[1].x, c[1].y, c[5].x, c[5].y);
    this.line(c[2].x, c[2].y, c[6].x, c[6].y);
    this.line(c[3].x, c[3].y, c[7].x, c[7].y);
    this.line(c[4].x, c[4].y, c[5].x, c[5].y);
    this.line(c[5].x, c[5].y, c[6].x, c[6].y);
    this.line(c[6].x, c[6].y, c[7].x, c[7].y);
    this.line(c[7].x, c[7].y, c[4].x, c[4].y);
  }
  getFrenetVectors(t, originalPoints) {
    const curve = new Bezier(this, originalPoints);
    const d1curve = new Bezier(this, curve.dpoints[0]);
    const dt = d1curve.get(t);
    const ddt = d1curve.derivative(t);
    const o = curve.get(t);
    const b = vec.normalize(vec.plus(dt, ddt));
    const r = vec.normalize(vec.cross(b, dt));
    const n = vec.normalize(vec.cross(r, dt));
    return { o, dt, r, n };
  }
  drawVector(from, vec, length, color, label) {
    this.setStroke(color);
    this.setFill(`black`);

    let pt = project({
      x: length * vec.x,
      y: length * vec.y,
      z: length * vec.z,
    });
    this.line(from.x, from.y, from.x + pt.x, from.y + pt.y);

    let txt = project({
      x: (length + 15) * vec.x,
      y: (length + 15) * vec.y,
      z: (length + 15) * vec.z,
    });
    this.text(label, from.x + txt.x, from.y + txt.y);
  }
  onMouseMove(evt) {
    super.onMouseMove(evt);
    this.t = this.constrain(
      this.map(this.cursor.x, 0, this.width, -0.1, 1.1),
      0,
      1
    );
    this.redraw();
  }
  onKeyDown(evt) {
    super.onKeyDown(evt);
    let key = this.keyboard.currentKey;
    if (key === `ArrowUp`) {
      this.t += 0.01;
      if (this.t > 1) this.t = 1;
    }
    if (key === `ArrowDown`) {
      this.t -= 0.01;
      if (this.t < 0) this.t = 0;
    }
    this.redraw();
  }
}

const example = new Example(undefined, 350, 300, (w, h) => {
  const canvas = CanvasBuilder.createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  // as this is node-canvas, we need to shim some functions:
  canvas.addEventListener = canvas.setAttribute = noop;
  canvas.classList = { add: noop };
  canvas.style = {};
  ctx.getTransform = () => ctx.currentTransform;

  return { canvas, ctx };
});

const canvas = example.canvas;

export { canvas };
