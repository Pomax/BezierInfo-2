var vectorOffset;
var normalsOffset;

var SHADOW_ALPHA = 0.2;
var SHOW_PROJECTIONS = true;

function normalize(v) {
  var d = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
  return { x:v.x/d, y:v.y/d, z:v.z/d };
}

module.exports = {
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

  getVectors: function(d1curve, t) {
    var dt, a, ddt, d, r, R, n;
    // get the normalized tangent
    dt = d1curve.get(t);

    // and then let's work in the change in tangent
    a = d1curve.derivative(t);
    ddt = { x: dt.x + a.x, y: dt.y + a.y, z: dt.z + a.z };

    // compute the crossproduct, and normalize it
    r = {
      x: ddt.y * dt.z - ddt.z * dt.y,
      y: ddt.z * dt.x - ddt.x * dt.z,
      z: ddt.x * dt.y - ddt.y * dt.x
    };
    d = Math.sqrt(r.x*r.x + r.y*r.y + r.z*r.z);
    r = { x: r.x/d, y: r.y/d, z: r.z/d };

    // compute the normal, which should not need renormalization
    R = [
      r.x*r.x,       r.x*r.y -r.z,  r.x*r.z + r.y,
      r.x*r.y + r.z, r.y*r.y,       r.y*r.z - r.x,
      r.x*r.z - r.y, r.y*r.z + r.x, r.z*r.z
    ];
    n = {
      x: dt.x * R[0] + dt.y * R[1] + dt.z * R[2],
      y: dt.x * R[3] + dt.y * R[4] + dt.z * R[5],
      z: dt.x * R[6] + dt.y * R[7] + dt.z * R[8]
    };

    return { dt, a, ddt, r, R, n };
  },

  drawVector: function(api, from, to, len, r,g,b, project) {
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

    if (project) {
      // and the side projections.
      api.setColor(`rgba(${r},${g},${b},${SHADOW_ALPHA})`);
      api.drawLine(api.projectXY(from, vectorOffset), api.projectXY(to, vectorOffset));
      api.drawLine(api.projectXZ(from, vectorOffset), api.projectXZ(to, vectorOffset));
      api.drawLine(api.projectYZ(from, vectorOffset), api.projectYZ(to, vectorOffset));
    }
  },

  setup: function(api) {
    vectorOffset = {
      x: 2 * api.getPanelWidth() / 5,
      y: 4 * api.getPanelHeight() / 5
    };
    api.setSize(1.25 * api.getPanelWidth(),api.getPanelHeight());
  },

  drawVectors: function(api) {
    api.reset();
    var prj = p => api.project(p, vectorOffset);

    this.drawCube(api);

    var curvepoints = [
      {x:120,y:0,z:0},
      {x:120,y:220,z:0},
      {x:30,y:0,z:30},
      {x:0,y:0,z:200}
    ];

    this.drawCurve(api, curvepoints);

    // let's mark t
    var curve = new api.Bezier(curvepoints);
    var d1curve = new api.Bezier(curve.dpoints[0]);
    var t = Math.max(api.hover.x? api.hover.x / api.getPanelWidth() : 0, 0);
    var mt = curve.get(t);
    api.drawCircle(prj(mt), 3);

    // draw the tangent, rotational axis, and normal
    var vectors = this.getVectors(d1curve, t);
    this.drawVector(api, mt, vectors.dt, 40, 0,200,0);
    this.drawVector(api, mt, vectors.r, 40,  0,0,200);
    this.drawVector(api, mt, vectors.n, 40,  200,0,0);
  },

  setupNormals: function(api) {
    normalsOffset = {
      x: 2 * api.getPanelWidth() / 5,
      y: 4 * api.getPanelHeight() / 5
    };
    api.setSize(1.25 * api.getPanelWidth(),api.getPanelHeight());
  },

  drawNormals: function(api) {
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
    var vectors = this.getVectors(d1curve, t);
    this.drawVector(api, mt, vectors.dt, 40, 0,200,0, SHOW_PROJECTIONS);
    this.drawVector(api, mt, vectors.r, 40,  0,0,200, SHOW_PROJECTIONS);
    this.drawVector(api, mt, vectors.n, 40,  200,0,0, SHOW_PROJECTIONS);
  }
};
