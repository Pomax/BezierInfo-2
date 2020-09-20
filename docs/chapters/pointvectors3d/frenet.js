import vec from "./vector-lib.js";
import { project, projectXY, projectXZ, projectYZ } from "./projection.js";

let d, cube;

setup() {
  // step 1: let's define a cube to show our curve "in"
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

  // step 2: let's also define our 3D curve
  const points = this.points = [
    {x:120, y:  0, z:  0},
    {x:120, y:220, z:  0},
    {x: 30, y:  0, z: 30},
    {x:  0, y:  0, z:200}
  ];

  // step 3: to draw this curve to the screen, we need to project the
  //         coordinates from 3D to 2D, for which we use what is called
  //         a "cabinet projection".
  this.curve = new Bezier(this, points.map(p => project(p)));

  // We also construct handy projections on just the X/Y, X/Z, and Y/Z planes.
  this.cxy = new Bezier(this, points.map(p => projectXY(p)));
  this.cxz = new Bezier(this, points.map(p => projectXZ(p)));
  this.cyz = new Bezier(this, points.map(p => projectYZ(p)));

  setSlider(`.slide-control`, `position`, 0);
}

draw() {
  clear();
  translate(this.width/2 - 60, this.height/2 + 75);
  const curve = this.curve;

  // Draw all our planar curve projections first
  this.drawCurveProjections();

  // And the "back" side of our cube
  this.drawCubeBack();

  // Then, we draw the real curve
  curve.drawCurve(`grey`);
  setStroke(`grey`)
  line(curve.points[0].x, curve.points[0].y, curve.points[1].x, curve.points[1].y);
  line(curve.points[2].x, curve.points[2].y, curve.points[3].x, curve.points[3].y);
  curve.points.forEach(p => circle(p.x, p.y, 2));

  // And the current point on that curve
  this.drawPoint(this.position);

  // and then we can add the "front" of the cube.
  this.drawCubeFront();
}

drawCurveProjections() {
  this.cxy.drawCurve(`#EEF`);
  this.cxz.drawCurve(`#EEF`);
  this.cyz.drawCurve(`#EEF`);
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

drawPoint(t) {
  const {o, r, n, dt} = this.getFrenetVectors(t, this.points);

  setStroke(`red`);
  setFill(`red`);
  const p = project(o);
  circle(p.x, p.y, 3);

  // Draw our axis of rotation,
  this.drawVector(p, vec.normalize(r),  40, `blue`, `r`);

  // our normal,
  this.drawVector(p, vec.normalize(n),  40, `red`, `n`);

  // and our derivative.
  this.drawVector(p, vec.normalize(dt), 40, `green`, `t′`);

  setFill(`black`)
  text(`t = ${t.toFixed(2)}`, p.x+10, p.y+15);
}

drawCubeFront() {
  const c = cube;
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
  // The frenet vectors are based on the (unprojected) curve,
  // and its derivative curve.
  const curve = new Bezier(this, originalPoints);
  const d1curve = new Bezier(this, curve.dpoints[0]);
  const o = curve.get(t);
  const dt = d1curve.get(t);
  const ddt = d1curve.derivative(t);
  // project the derivative into the future
  const f = vec.plus(dt, ddt);
  // and then find the axis of rotation wrt the plane
  // spanned by the currented and projected derivative
  const r = vec.cross(f, dt);
  // after which the normal is found by rotating the
  // tangent in that plane.
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
