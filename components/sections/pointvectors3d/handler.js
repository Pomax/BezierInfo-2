var vectorOffset;
var normalsOffset;

module.exports = {
  setupVectors: function(api) {
    var curve = api.getDefault3DCubic();
    vectorOffset = {
      x: 2 * api.getPanelWidth() / 5,
      y: 4 * api.getPanelHeight() / 5
    };
    api.setCurve(curve);
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

  drawCurveProjection(api, curvepoints) {
    var prj = p => api.project(p, vectorOffset),
        curve2d = curvepoints.map(p => prj(p)),
        points;

    // projections
    api.setColor("#E0E0E0");
    api.drawCurve({ points: curvepoints.map(p => api.projectXY(p, vectorOffset)) });
    api.drawCurve({ points: curvepoints.map(p => api.projectYZ(p, vectorOffset)) });
    api.drawCurve({ points: curvepoints.map(p => api.projectXZ(p, vectorOffset)) });

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

  drawVectors: function(api) {
    api.reset();
    var prj = p => api.project(p, vectorOffset);
    var t = api.hover.x? api.hover.x / api.getPanelWidth() : 0.35;

    this.drawCube(api);

    var curvepoints = [
      {x:120,y:0,z:0},
      {x:120,y:220,z:0},
      {x:30,y:0,z:30},
      {x:0,y:0,z:200}
    ];

    this.drawCurveProjection(api, curvepoints);

    var curve = new api.Bezier(curvepoints);
    var d1curve = new api.Bezier(curve.dpoints[0]);
    var d2curve = new api.Bezier(curve.dpoints[1]);

    // let's mark t
    var mt = curve.get(t);
    api.drawCircle(prj(mt), 3);

    // and let's show the tangent at that point
    var dt = d1curve.get(t);
    var pt1 = { x: mt.x + dt.x, y: mt.y + dt.y, z: mt.z + dt.z };

    // and then let's work in the change in tangent
    var roc = d2curve.get(t);
    var f = 10;
    var d = Math.sqrt(roc.x*roc.x + roc.y*roc.y + roc.z*roc.z);
    roc = { x: f * roc.x/d, y: f * roc.y/d, z: f * roc.z/d };
    var pt2 = { x: mt.x + dt.x + roc.x, y: mt.y + dt.y + roc.y, z: mt.z + dt.z + roc.z };

    api.drawLine(prj(mt), prj(pt1));
    api.drawLine(prj(mt), prj(pt2));

    // normalize t (=dt) and t' (=ddt) and compute the crossproduct:
    roc = d2curve.get(t);
    var ddt = { x: dt.x + roc.x, y: dt.y + roc.y, z: dt.z + roc.z };
    d = Math.sqrt(dt.x*dt.x + dt.y*dt.y + dt.z*dt.z);
    dt = { x: dt.x/d, y: dt.y/d, z: dt.z/d };
    d = Math.sqrt(ddt.x*ddt.x + ddt.y*ddt.y + ddt.z*ddt.z);
    ddt = { x: ddt.x/d, y: ddt.y/d, z: ddt.z/d };
    var r = {
      x: ddt.y * dt.z - ddt.z * dt.y,
      y: ddt.z * dt.x - ddt.x * dt.z,
      z: ddt.x * dt.y - ddt.y * dt.x
    };
    f = 20;
    var mc = {
      x: mt.x + f * r.x,
      y: mt.y + f * r.y,
      z: mt.z + f * r.z
    };
    // let's see the cross product
    api.setColor("darkgreen");
    api.drawLine(prj(mt), prj(mc));

    // and finally, compute the normal
    var R = [
      r.x*r.x,       r.x*r.y -r.z,  r.x*r.z + r.y,
      r.x*r.y + r.z, r.y*r.y,       r.y*r.z - r.x,
      r.x*r.z - r.y, r.y*r.z + r.x, r.z*r.z
    ];
    var n = {
      x: dt.x * R[0] + dt.y * R[1] + dt.z * R[2],
      y: dt.x * R[3] + dt.y * R[4] + dt.z * R[5],
      z: dt.x * R[6] + dt.y * R[6] + dt.z * R[7]
    };
    var mr = {
      x: mt.x + f * n.x,
      y: mt.y + f * n.y,
      z: mt.z + f * n.z
    };
    api.setColor("red");
    api.drawLine(prj(mt), prj(mr));
  },

  setupNormals: function(api) {
    var curve = api.getDefault3DCubic();
    normalsOffset = {
      x: api.getPanelWidth() / 2,
      y: api.getPanelHeight() / 2
    };
    api.setCurve(curve);
  },

  drawNormals: function(api, curve) {
    api.reset();
  }
};
