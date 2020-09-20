import vec from "./vector-lib.js";
import { project, projectXY, projectXZ, projectYZ } from "./projection.js";

let d, cube;

setup() {
  // We have the same setup as for the previous graphic
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
  // The only thing different compared to the previous graphic is this call:
  const {o, r, n, dt } = this.getRMF(t, this.points);

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

// This is where things are... rather different

getRMF(t, originalPoints) {
  // If we don't have a rotation-minimizing lookup table, build it.
  if (!this.rmf_LUT) {
    const curve = new Bezier(this, originalPoints);
    const d1curve = new Bezier(this, curve.dpoints[0]);
    this.rmf_LUT = this.generateRMF(originalPoints, curve, d1curve);
  }

  // find the frame for "t":
  const last = this.rmf_LUT.length - 1;
  const f =  t * last;
  const i = Math.floor(f);

  // If we're looking at an integer index, we're done.
  if (f === i) return this.rmf_LUT[i];

  // If we're not, we need to interpolate the adjacent frames
  const j = i + 1, ti = i/last, tj = j/last, ratio = (t - ti) / (tj - ti);
  return this.lerpFrames(ratio, this.rmf_LUT[i], this.rmf_LUT[j]);
}

generateRMF(originalPoints, curve, d1curve) {
  // Start with the frenet frame just before t=0 and shift it to t=0
  const first = this.getFrenetVectors(-0.001, originalPoints);
  first.o = curve.get(0);

  // Then we construct each next rotation-minimizing fame by reflecting
  // the previous frame and correcting the resulting vectors.
  const frames = [first];
  for(let i=0, steps=24; i<steps; i++) {
    const x0 = frames[i],
          // get the next frame
          t = (i+1)/steps,
          x1 = {
            o: curve.get(t),
            dt: d1curve.get(t)
          },
          // then mirror the rotational axis and tangent
          v1 = vec.minus(x1.o, x0.o),
          c1 = vec.dot(v1, v1),
          riL = vec.minus(x0.r, vec.scale(v1, 2/c1 * vec.dot(v1, x0.r))),
          dtiL = vec.minus(x0.dt, vec.scale(v1, 2/c1 * vec.dot(v1, x0.dt))),
          // then use those to compute a more stable rotational axis
          v2 = vec.minus(x1.dt, dtiL),
          c2 = vec.dot(v2, v2);
    // Fix the axis of rotation vector...
    x1.r = vec.minus(riL, vec.scale(v2, 2/c2 * vec.dot(v2, riL)));
    // ... and then compute the normal as usual
    x1.n = vec.cross(x1.r, x1.dt);
    frames.push(x1);
  }

  return frames;
}

getFrenetVectors(t, originalPoints) {
  const curve = new Bezier(this, originalPoints),
        d1curve = new Bezier(this, curve.dpoints[0]),
        dt = d1curve.get(t),
        ddt = d1curve.derivative(t),
        o = curve.get(t),
        b = vec.normalize(vec.plus(dt, ddt)),
        r = vec.normalize(vec.cross(b, dt)),
        n = vec.normalize(vec.cross(r, dt));
  return { o, dt, r, n };
}

lerpFrames(t, f1, f2) {
  var frame = {};
  [`o`, `dt`, `r`, `n`].forEach(type => frame[type] = vec.lerp(t, f1[type], f2[type]));
  return frame;
}
