import vec from "./vector-lib.js";
import { project, projectXY, projectXZ, projectYZ } from "./projection.js";

let d, cube;

setup() {
  d = this.width/2 + 25;
  cube = [
    {x:0, y:0, z:0},
    {x:d, y:0, z:0},
    {x:d, y:d, z:0},
    {x:0, y:d, z:0},
    {x:0, y:0, z:d},
    {x:d, y:0, z:d},
    {x:d, y:d, z:d},
    {x:0, y:d, z:d}
  ].map(p => project(p));
  const points = this.points = [
    {x:120, y:  0, z:  0},
    {x:120, y:220, z:  0},
    {x: 30, y:  0, z: 30},
    {x:  0, y:  0, z:200}
  ];
  this.curve = new Bezier(this, points.map(p => project(p)));
  this.cxy = new Bezier(this, points.map(p => projectXY(p)));
  this.cxz = new Bezier(this, points.map(p => projectXZ(p)));
  this.cyz = new Bezier(this, points.map(p => projectYZ(p)));
  setSlider(`.slide-control`, `position`, 0);
}

draw() {
  clear();
  translate(this.width/2 - 60, this.height/2 + 75);
  const curve = this.curve;

  this.drawCurveProjections();

  this.drawCubeBack();

  curve.drawCurve(`grey`);
  setStroke(`grey`)
  line(curve.points[0].x, curve.points[0].y, curve.points[1].x, curve.points[1].y);
  line(curve.points[2].x, curve.points[2].y, curve.points[3].x, curve.points[3].y);
  curve.points.forEach(p => circle(p.x, p.y, 2));

  this.drawPoint(this.position);

  this.drawCubeFront();
}

drawCubeBack() {
  const c = cube;

  // x axis
  setStroke(`blue`);
  line(c[0].x, c[0].y, c[1].x, c[1].y);

  // y axis
  setStroke(`red`);
  line(c[3].x, c[3].y, c[0].x, c[0].y);

  // z axis
  setStroke(`green`);
  line(c[0].x, c[0].y, c[4].x, c[4].y);
}

drawCurveProjections() {
  this.cxy.drawCurve(`#EEF`);
  this.cxz.drawCurve(`#EEF`);
  this.cyz.drawCurve(`#EEF`);
}

drawPoint(t) {
  const {o, r, n, dt} = this.getFrenetVectors(t, this.points);

  setStroke(`red`);
  setFill(`red`);
  const p = project(o);
  circle(p.x, p.y, 3);

  this.drawVector(p, vec.normalize(r),  40, `blue`, `r`);
  this.drawVector(p, vec.normalize(n),  40, `red`, `n`);
  this.drawVector(p, vec.normalize(dt), 40, `green`, `t′`);

  setFill(`black`)
  text(`t = ${t.toFixed(2)}`, p.x+10, p.y+15);
}

drawCubeFront() {
  const c = cube;

  // rest of the cube
  setStroke("lightgrey");
  line(c[1].x, c[1].y, c[2].x, c[2].y);
  line(c[2].x, c[2].y, c[3].x, c[3].y);
  line(c[1].x, c[1].y, c[5].x, c[5].y);
  line(c[2].x, c[2].y, c[6].x, c[6].y);
  line(c[3].x, c[3].y, c[7].x, c[7].y);
  line(c[4].x, c[4].y, c[5].x, c[5].y);
  line(c[5].x, c[5].y, c[6].x, c[6].y);
  line(c[6].x, c[6].y, c[7].x, c[7].y);
  line(c[7].x, c[7].y, c[4].x, c[4].y);
}

getFrenetVectors(t, originalPoints) {
  const curve = new Bezier(this, originalPoints);
  const d1curve = new Bezier(this, curve.dpoints[0]);
  const dt = d1curve.get(t);
  const ddt = d1curve.derivative(t);
  const o = curve.get(t);
  const b = vec.plus(dt, ddt);
  const r = vec.cross(b, dt);
  const n = vec.normalize(vec.cross(r, dt));
  return { o, dt, r, n };
}

drawVector(from, vec, length, color, label) {
  setStroke(color);
  setFill(`black`);

  let pt = project({
    x: length * vec.x,
    y: length * vec.y,
    z: length * vec.z
  });
  line(from.x, from.y, from.x + pt.x, from.y + pt.y);

  let txt = project({
    x: (length+15) * vec.x,
    y: (length+15) * vec.y,
    z: (length+15) * vec.z
  });
  text(label, from.x + txt.x, from.y + txt.y);
}
