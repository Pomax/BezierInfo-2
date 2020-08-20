var atan2 = Math.atan2, sqrt = Math.sqrt, sin = Math.sin, cos = Math.cos;

module.exports = {
  setupQuadratic: function(api) {
    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        cx = w/2, cy = h/2, pad = 40,
        pts = [
          // first curve:
          {x:cx,y:pad}, {x:w-pad,y:pad}, {x:w-pad,y:cy},
          // subsequent curve
          {x:w-pad,y:h-pad}, {x:cx,y:h-pad},
          // subsequent curve
          {x:pad,y:h-pad}, {x:pad,y:cy},
          // final curve control point
          {x:pad,y:pad}
        ];
    api.lpts = pts;
  },

  setupCubic: function(api) {
    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        cx = w/2, cy = h/2, pad = 40,
        r = (w - 2*pad)/2,
        k = 0.55228,
        kr = k*r,
        pts = [
          // first curve:
          {x:cx,y:pad}, {x:cx+kr,y:pad}, {x:w-pad,y:cy-kr}, {x:w-pad,y:cy},
          // subsequent curve
          {x:w-pad,y:cy+kr}, {x:cx+kr,y:h-pad}, {x:cx,y:h-pad},
          // subsequent curve
          {x:cx-kr,y:h-pad}, {x:pad,y:cy+kr}, {x:pad,y:cy},
          // final curve control point
          {x:pad,y:cy-kr}, {x:cx-kr,y:pad}
        ];
    api.lpts = pts;
  },

  movePointsQuadraticLD: function(api, i) {
    // ...we need to move _everything_
    var anchor, fixed, toMove;
    for(var p=1; p<4; p++) {
      anchor = i + (2*p - 2) + api.lpts.length;
      anchor = api.lpts[anchor % api.lpts.length];
      fixed = i + (2*p - 1);
      fixed = api.lpts[fixed % api.lpts.length];
      toMove = i + 2*p;
      toMove = api.lpts[toMove % api.lpts.length];

      toMove.x = fixed.x + (fixed.x - anchor.x);
      toMove.y = fixed.y + (fixed.y - anchor.y);
    }
    // then, the furthest point cannot be computed properly!
    toMove = i + 6;
    toMove = api.lpts[toMove % api.lpts.length];
    api.problem = toMove;
  },

  movePointsCubicLD: function(api, i) {
    var toMove, fixed;
    if (i%3 === 1) {
      fixed = i-1;
      fixed += (fixed < 0) ? api.lpts.length : 0;
      toMove = i-2;
      toMove += (toMove < 0) ? api.lpts.length : 0;
    } else {
      fixed = (i+1) % api.lpts.length;
      toMove = (i+2) % api.lpts.length;
    }
    fixed = api.lpts[fixed];
    toMove = api.lpts[toMove];
    toMove.x = fixed.x + (fixed.x - api.mp.x);
    toMove.y = fixed.y + (fixed.y - api.mp.y);
  },

  linkDerivatives: function(evt, api) {
    if (api.mp) {
      var quad = api.lpts.length === 8;
      var i = api.mp_idx;
      if (quad) {
        if (i%2 !== 0) { this.movePointsQuadraticLD(api, i); }
      } else {
        if(i%3 !== 0) { this.movePointsCubicLD(api, i); }
      }
    }
  },

  movePointsQuadraticDirOnly: function(api, i) {
    // ...we need to move _everything_  ...again
    var anchor, fixed, toMove;

    // move left and right
    [-1,1].forEach(v => {
      anchor = api.mp;
      fixed = i + v + api.lpts.length;
      fixed = api.lpts[fixed % api.lpts.length];
      toMove = i + 2*v + api.lpts.length;
      toMove = api.lpts[toMove % api.lpts.length];
      var a = atan2(fixed.y - anchor.y, fixed.x - anchor.x),
          dx = toMove.x - fixed.x,
          dy = toMove.y - fixed.y,
          d = sqrt(dx*dx + dy*dy);
      toMove.x = fixed.x + d*cos(a);
      toMove.y = fixed.y + d*sin(a);
    });

    // then, the furthest point cannot be computed properly!
    toMove = i + 4;
    toMove = api.lpts[toMove % api.lpts.length];
    api.problem = toMove;
  },

  movePointsCubicDirOnly: function(api, i) {
    var toMove, fixed;
    if (i%3 === 1) {
      fixed = i-1;
      fixed += (fixed < 0) ? api.lpts.length : 0;
      toMove = i-2;
      toMove += (toMove < 0) ? api.lpts.length : 0;
    } else {
      fixed = (i+1) % api.lpts.length;
      toMove = (i+2) % api.lpts.length;
    }
    fixed = api.lpts[fixed];
    toMove = api.lpts[toMove];
    var a = atan2(fixed.y - api.mp.y, fixed.x - api.mp.x),
        dx = toMove.x - fixed.x,
        dy = toMove.y - fixed.y,
        d = sqrt(dx*dx + dy*dy);
    toMove.x = fixed.x + d*cos(a);
    toMove.y = fixed.y + d*sin(a);
  },

  linkDirection: function(evt, api) {
    if (api.mp) {
      var quad = api.lpts.length === 8;
      var i = api.mp_idx;
      if (quad) {
        if(i%2 !== 0) { this.movePointsQuadraticDirOnly(api, i); }
      } else {
        if(i%3 !== 0) { this.movePointsCubicDirOnly(api, i); }
      }
    }
  },

  bufferPoints: function(evt, api) {
    api.bpts = JSON.parse(JSON.stringify(api.lpts));
  },

  moveQuadraticPoint: function(api, i) {
    this.moveCubicPoint(api,i);

    // then move the other control points
    [-1,1].forEach(v => {
      var anchor = i - v + api.lpts.length;
      anchor = api.lpts[anchor % api.lpts.length];
      var fixed = i - 2*v + api.lpts.length;
      fixed = api.lpts[fixed % api.lpts.length];
      var toMove = i - 3*v + api.lpts.length;
      toMove = api.lpts[toMove % api.lpts.length];
      var a = atan2(fixed.y - anchor.y, fixed.x - anchor.x),
          dx = toMove.x - fixed.x,
          dy = toMove.y - fixed.y,
          d = sqrt(dx*dx + dy*dy);
      toMove.x = fixed.x + d*cos(a);
      toMove.y = fixed.y + d*sin(a);
    });

    // then signal a problem
    var toMove = i + 4;
    toMove = api.lpts[toMove % api.lpts.length];
    api.problem = toMove;
  },

  moveCubicPoint: function(api, i) {
    var op = api.bpts[i],
        np = api.lpts[i],
        dx = np.x - op.x,
        dy = np.y - op.y,
        len = api.lpts.length,
        l = i-1+len,
        r = i+1,
        // original left and right
        ol = api.bpts[l % len],
        or = api.bpts[r % len],
        // current left and right
        nl = api.lpts[l % len],
        nr = api.lpts[r % len];
    // update current left
    nl.x = ol.x + dx;
    nl.y = ol.y + dy;
    // update current right
    nr.x = or.x + dx;
    nr.y = or.y + dy;
    return {x:dx, y:dy};
  },

  modelCurve: function(evt, api) {
    if (api.mp) {
      var quad = api.lpts.length === 8;
      var i = api.mp_idx;
      if (quad) {
        if (i%2 !== 0) { this.movePointsQuadraticDirOnly(api, i); }
        else { this.moveQuadraticPoint(api, i); }
      }
      else {
        if(i%3 !== 0) { this.movePointsCubicDirOnly(api, i); }
        else { this.moveCubicPoint(api, i); }
      }
    }
  },

  draw: function(api, curves) {
    api.reset();
    var pts = api.lpts;
    var quad = pts.length === 8;

    var c1 = quad ? new api.Bezier(pts[0],pts[1],pts[2]) : new api.Bezier(pts[0],pts[1],pts[2],pts[3]);
    api.drawSkeleton(c1, false, true);
    api.drawCurve(c1);

    var c2 = quad ? new api.Bezier(pts[2],pts[3],pts[4]) : new api.Bezier(pts[3],pts[4],pts[5],pts[6]);
    api.drawSkeleton(c2, false, true);
    api.drawCurve(c2);

    var c3 = quad ? new api.Bezier(pts[4],pts[5],pts[6]) : new api.Bezier(pts[6],pts[7],pts[8],pts[9]);
    api.drawSkeleton(c3, false, true);
    api.drawCurve(c3);

    var c4 = quad ? new api.Bezier(pts[6],pts[7],pts[0]) : new api.Bezier(pts[9],pts[10],pts[11],pts[0]);
    api.drawSkeleton(c4, false, true);
    api.drawCurve(c4);

    if (api.problem) {
      api.setColor("red");
      api.drawCircle(api.problem,5);
    }
  }
};
