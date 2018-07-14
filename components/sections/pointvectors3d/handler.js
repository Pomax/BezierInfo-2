var vectorOffset;
var normalsOffset;

var SHADOW_ALPHA = 0.2;
var SHOW_PROJECTIONS = true;

function normalize(v) {
  var d = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
  return { x:v.x/d, y:v.y/d, z:v.z/d };
}

function vdot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function vscale(v1, s) {
  return {
    x: s * v1.x,
    y: s * v1.y,
    z: s * v1.z
  };
}

function vplus(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z
  };
}

function vminus(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z
  };
}

function vcross(v1, v2) {
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x
  };
}

function vlerp(t, v1, v2) {
  return {
    x: (1-t)*v1.x + t*v2.x,
    y: (1-t)*v1.y + t*v2.y,
    z: (1-t)*v1.z + t*v2.z
  };
}

module.exports = {
  setup: function(api) {
    vectorOffset = {
      x: 2 * api.getPanelWidth() / 5,
      y: 4 * api.getPanelHeight() / 5
    };
    api.setSize(1.25 * api.getPanelWidth(),api.getPanelHeight());
  },

  drawCube: function(api) {
    var prj = p => api.project(p, vectorOffset);

    var cube = [
      {x:0,  y:0,  z:0},
      {x:200,y:0,  z:0},
      {x:200,y:200,z:0},
      {x:0,  y:200,z:0},
      {x:0,  y:0,  z:200},
      {x:200,y:0,  z:200},
      {x:200,y:200,z:200},
      {x:0,  y:200,z:200}
    ].map(p => prj(p));

    // "most of the cube"
    api.setColor("grey");
    api.drawLine(cube[1], cube[2]);
    api.drawLine(cube[2], cube[3]);
    api.drawLine(cube[1], cube[5]);
    api.drawLine(cube[2], cube[6]);
    api.drawLine(cube[3], cube[7]);
    api.drawLine(cube[4], cube[5]);
    api.drawLine(cube[5], cube[6]);
    api.drawLine(cube[6], cube[7]);
    api.drawLine(cube[7], cube[4]);

    // x axis
    api.setColor("blue");
    api.drawLine(cube[0], cube[1]);

    // y axis
    api.setColor("red");
    api.drawLine(cube[3], cube[0]);

    // z axis
    api.setColor("green");
    api.drawLine(cube[0], cube[4]);
  },

  drawCurve(api, curvepoints, project) {
    var prj = p => api.project(p, vectorOffset),
        curve2d = curvepoints.map(p => prj(p)),
        points;

    if (project) {
      // projections
      api.setColor(`rgba(0,0,0,${SHADOW_ALPHA})`);
      api.drawCurve({ points: curvepoints.map(p => api.projectXY(p, vectorOffset)) });
      api.drawCurve({ points: curvepoints.map(p => api.projectYZ(p, vectorOffset)) });
      api.drawCurve({ points: curvepoints.map(p => api.projectXZ(p, vectorOffset)) });
    }

    // control lines
    api.setColor("#333");
    api.drawLine(curve2d[0], curve2d[1]);
    api.drawCircle(curve2d[1], 3);
    api.drawCircle(curve2d[2], 3);
    api.drawLine(curve2d[2], curve2d[3]);

    // main curve
    api.setColor("black");
    api.drawCircle(curve2d[0], 3);
    api.drawCircle(curve2d[3], 3);

    var curve = new api.Bezier(curve2d);
    api.drawCurve({ points: curve2d });
  },

  getFrenetVectors: function(t, curve, d1curve) {
    var o = curve.get(t),
        // get the normalized tangent
        dt = d1curve.get(t),
        // and then let's work in the change in tangent
        ddt = d1curve.derivative(t),
        b = normalize(vplus(dt, ddt)),
        // compute the normalized axis of rotation
        r = normalize(vcross(b, dt)),
        // compute the normal
        n = normalize(vcross(r, dt));
    return { o, dt, r, n };
  },

  lerpVectors(t, v1, v2) {
    var v = {};
    ['o', 'dt', 'r', 'n'].forEach(p => {
      v[p] = vlerp(t, v1[p], v2[p]);
    });
    return v;
  },

  generateRMF: function(curve, d1curve) {
    var frames = [], step = 0.05;
    frames.push(this.getFrenetVectors(0, curve, d1curve));
    for(var t0=0; t0<=1; t0+=step) {
      var x0 = frames.slice(-1)[0],
          t1 = t0 + step,
          x1 = { o: curve.get(t1), dt: d1curve.get(t1) },
          v1 = vminus(x1.o, x0.o),
          c1 = vdot(v1, v1),
          riL = vminus(x0.r, vscale(v1, 2/c1 * vdot(v1, x0.r))),
          tiL = vminus(x0.dt, vscale(v1, 2/c1 * vdot(v1, x0.dt))),
          v2 = vminus(x1.dt, tiL),
          c2 = vdot(v2, v2);
      x1.r = vminus(riL, vscale(v2, 2/c2 * vdot(v2, riL)));
      x1.n = vcross(x1.r, x1.dt);
      frames.push(x1); }
    return frames;
  },

  getRMF: function(t, curve, d1curve) {
    if (!this.rmf_LUT) {
      this.rmf_LUT = this.generateRMF(curve, d1curve);
    }
    // find integer index
    var l = this.rmf_LUT.length;
    var i = t * l;
    if (i != (i|0)) {
      // no intenger index: interpolate values?
      i = (i|0);
      if (i===l-1) return this.rmf_LUT[i-1];
      var j = i + 1, ti = i/l, tj = j/l;
      t = (t - ti) / (tj - ti);
      return this.lerpVectors(t, this.rmf_LUT[i], this.rmf_LUT[j]);
    }
    return this.rmf_LUT[i];
  },

  drawVector: function(api, from, to, len, r,g,b) {
    var prj = p => api.project(p, vectorOffset);
    to = normalize(to);
    to = {
      x: from.x + len * to.x,
      y: from.y + len * to.y,
      z: from.z + len * to.z
    };
    api.setColor(`rgba(${r},${g},${b},1)`);
    // draw the actual vector
    api.drawLine(prj(from), prj(to));
  },

  drawFrenetVectors: function(api) {
    api.reset();
    var prj = p => api.project(p, vectorOffset);

    this.drawCube(api);

    var curvepoints = [
      {x:120,y:0,z:0},
      {x:120,y:220,z:0},
      {x:30,y:0,z:30},
      {x:0,y:0,z:200}
    ];

    this.drawCurve(api, curvepoints, SHOW_PROJECTIONS);

    // let's mark t
    var curve = new api.Bezier(curvepoints);
    var d1curve = new api.Bezier(curve.dpoints[0]);
    var t = Math.max(api.hover.x? api.hover.x / api.getPanelWidth() : 0, 0);
    var mt = curve.get(t);
    api.drawCircle(prj(mt), 3);

    // draw the tangent, rotational axis, and normal
    var vectors = this.getFrenetVectors(t, curve, d1curve);
    this.drawVector(api, mt, vectors.dt, 40, 0,200,0);
    this.drawVector(api, mt, vectors.r, 40,  0,0,200);
    this.drawVector(api, mt, vectors.n, 40,  200,0,0);
  },

  drawRMFNormals: function(api) {
    api.reset();
    var prj = p => api.project(p, vectorOffset);

    this.drawCube(api);

    var curvepoints = [
      {x:120,y:0,z:0},
      {x:120,y:220,z:0},
      {x:30,y:0,z:30},
      {x:0,y:0,z:200}
    ];

    this.drawCurve(api, curvepoints, SHOW_PROJECTIONS);

    // let's mark t
    var curve = new api.Bezier(curvepoints);
    var d1curve = new api.Bezier(curve.dpoints[0]);
    var t = Math.max(api.hover.x? api.hover.x / api.getPanelWidth() : 0, 0);
    var mt = curve.get(t);
    api.drawCircle(prj(mt), 3);

    // draw the tangent, rotational axis, and normal
    var vectors = this.getRMF(t, curve, d1curve);
    this.drawVector(api, mt, vectors.dt, 40, 0,200,0);
    this.drawVector(api, mt, vectors.r, 40,  0,0,200);
    this.drawVector(api, mt, vectors.n, 40,  200,0,0);
  }
};
