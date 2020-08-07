(function() {
  "use strict";

  // math-inlining.
  var abs = Math.abs,
    cos = Math.cos,
    sin = Math.sin,
    acos = Math.acos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    pow = Math.pow,
    // cube root function yielding real roots
    crt = function(v) {
      return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
    },
    // trig constants
    pi = Math.PI,
    tau = 2 * pi,
    quart = pi / 2,
    // float precision significant decimal
    epsilon = 0.000001,
    // extremas used in bbox calculation and similar algorithms
    nMax = Number.MAX_SAFE_INTEGER || 9007199254740991,
    nMin = Number.MIN_SAFE_INTEGER || -9007199254740991,
    // a zero coordinate, which is surprisingly useful
    ZERO = { x: 0, y: 0, z: 0 };

  // Bezier utility functions
  var utils = {
    // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
    Tvalues: [
      -0.0640568928626056260850430826247450385909,
      0.0640568928626056260850430826247450385909,
      -0.1911188674736163091586398207570696318404,
      0.1911188674736163091586398207570696318404,
      -0.3150426796961633743867932913198102407864,
      0.3150426796961633743867932913198102407864,
      -0.4337935076260451384870842319133497124524,
      0.4337935076260451384870842319133497124524,
      -0.5454214713888395356583756172183723700107,
      0.5454214713888395356583756172183723700107,
      -0.6480936519369755692524957869107476266696,
      0.6480936519369755692524957869107476266696,
      -0.7401241915785543642438281030999784255232,
      0.7401241915785543642438281030999784255232,
      -0.8200019859739029219539498726697452080761,
      0.8200019859739029219539498726697452080761,
      -0.8864155270044010342131543419821967550873,
      0.8864155270044010342131543419821967550873,
      -0.9382745520027327585236490017087214496548,
      0.9382745520027327585236490017087214496548,
      -0.9747285559713094981983919930081690617411,
      0.9747285559713094981983919930081690617411,
      -0.9951872199970213601799974097007368118745,
      0.9951872199970213601799974097007368118745
    ],

    // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
    Cvalues: [
      0.1279381953467521569740561652246953718517,
      0.1279381953467521569740561652246953718517,
      0.1258374563468282961213753825111836887264,
      0.1258374563468282961213753825111836887264,
      0.121670472927803391204463153476262425607,
      0.121670472927803391204463153476262425607,
      0.1155056680537256013533444839067835598622,
      0.1155056680537256013533444839067835598622,
      0.1074442701159656347825773424466062227946,
      0.1074442701159656347825773424466062227946,
      0.0976186521041138882698806644642471544279,
      0.0976186521041138882698806644642471544279,
      0.086190161531953275917185202983742667185,
      0.086190161531953275917185202983742667185,
      0.0733464814110803057340336152531165181193,
      0.0733464814110803057340336152531165181193,
      0.0592985849154367807463677585001085845412,
      0.0592985849154367807463677585001085845412,
      0.0442774388174198061686027482113382288593,
      0.0442774388174198061686027482113382288593,
      0.0285313886289336631813078159518782864491,
      0.0285313886289336631813078159518782864491,
      0.0123412297999871995468056670700372915759,
      0.0123412297999871995468056670700372915759
    ],

    arcfn: function(t, derivativeFn) {
      var d = derivativeFn(t);
      var l = d.x * d.x + d.y * d.y;
      if (typeof d.z !== "undefined") {
        l += d.z * d.z;
      }
      return sqrt(l);
    },

    compute: function(t, points, _3d) {
      // shortcuts
      if (t === 0) {
        return points[0];
      }

      var order = points.length-1;

      if (t === 1) {
        return points[order];
      }

      var p = points;
      var mt = 1 - t;

      // constant?
      if (order === 0) {
        return points[0];
      }

      // linear?
      if (order === 1) {
        ret = {
          x: mt * p[0].x + t * p[1].x,
          y: mt * p[0].y + t * p[1].y
        };
        if (_3d) {
          ret.z = mt * p[0].z + t * p[1].z;
        }
        return ret;
      }

      // quadratic/cubic curve?
      if (order < 4) {
        var mt2 = mt * mt,
          t2 = t * t,
          a,
          b,
          c,
          d = 0;
        if (order === 2) {
          p = [p[0], p[1], p[2], ZERO];
          a = mt2;
          b = mt * t * 2;
          c = t2;
        } else if (order === 3) {
          a = mt2 * mt;
          b = mt2 * t * 3;
          c = mt * t2 * 3;
          d = t * t2;
        }
        var ret = {
          x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
          y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
        };
        if (_3d) {
          ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
        }
        return ret;
      }

      // higher order curves: use de Casteljau's computation
      var dCpts = JSON.parse(JSON.stringify(points));
      while (dCpts.length > 1) {
        for (var i = 0; i < dCpts.length - 1; i++) {
          dCpts[i] = {
            x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t,
            y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t
          };
          if (typeof dCpts[i].z !== "undefined") {
            dCpts[i] = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t;
          }
        }
        dCpts.splice(dCpts.length - 1, 1);
      }
      return dCpts[0];
    },

    computeWithRatios: function (t, points, ratios, _3d) {
      var mt = 1 - t, r = ratios, p = points, d;
      var f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3];

      // spec for linear
      f1 *= mt;
      f2 *= t;

      if (p.length === 2) {
        d = f1 + f2;
        return {
          x: (f1 * p[0].x + f2 * p[1].x)/d,
          y: (f1 * p[0].y + f2 * p[1].y)/d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z)/d
        };
      }

      // upgrade to quadratic
      f1 *= mt;
      f2 *= 2 * mt;
      f3 *= t * t;

      if (p.length === 3) {
        d = f1 + f2 + f3;
        return {
          x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x)/d,
          y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y)/d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z)/d
        };
      }

      // upgrade to cubic
      f1 *= mt;
      f2 *= 1.5 * mt;
      f3 *= 3 * mt;
      f4 *= t * t * t;

      if (p.length === 4) {
        d = f1 + f2 + f3 + f4;
        return {
          x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x)/d,
          y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y)/d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z)/d
        };
      }
    },

    derive: function (points, _3d) {
      var dpoints = [];
      for (var p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
        var list = [];
        for (var j = 0, dpt; j < c; j++) {
          dpt = {
            x: c * (p[j + 1].x - p[j].x),
            y: c * (p[j + 1].y - p[j].y)
          };
          if (_3d) {
            dpt.z = c * (p[j + 1].z - p[j].z);
          }
          list.push(dpt);
        }
        dpoints.push(list);
        p = list;
      }
      return dpoints;
    },

    between: function(v, m, M) {
      return (
        (m <= v && v <= M) ||
        utils.approximately(v, m) ||
        utils.approximately(v, M)
      );
    },

    approximately: function(a, b, precision) {
      return abs(a - b) <= (precision || epsilon);
    },

    length: function(derivativeFn) {
      var z = 0.5,
        sum = 0,
        len = utils.Tvalues.length,
        i,
        t;
      for (i = 0; i < len; i++) {
        t = z * utils.Tvalues[i] + z;
        sum += utils.Cvalues[i] * utils.arcfn(t, derivativeFn);
      }
      return z * sum;
    },

    map: function(v, ds, de, ts, te) {
      var d1 = de - ds,
        d2 = te - ts,
        v2 = v - ds,
        r = v2 / d1;
      return ts + d2 * r;
    },

    lerp: function(r, v1, v2) {
      var ret = {
        x: v1.x + r * (v2.x - v1.x),
        y: v1.y + r * (v2.y - v1.y)
      };
      if (!!v1.z && !!v2.z) {
        ret.z = v1.z + r * (v2.z - v1.z);
      }
      return ret;
    },

    pointToString: function(p) {
      var s = p.x + "/" + p.y;
      if (typeof p.z !== "undefined") {
        s += "/" + p.z;
      }
      return s;
    },

    pointsToString: function(points) {
      return "[" + points.map(utils.pointToString).join(", ") + "]";
    },

    copy: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    angle: function(o, v1, v2) {
      var dx1 = v1.x - o.x,
        dy1 = v1.y - o.y,
        dx2 = v2.x - o.x,
        dy2 = v2.y - o.y,
        cross = dx1 * dy2 - dy1 * dx2,
        dot = dx1 * dx2 + dy1 * dy2;
      return atan2(cross, dot);
    },

    // round as string, to avoid rounding errors
    round: function(v, d) {
      var s = "" + v;
      var pos = s.indexOf(".");
      return parseFloat(s.substring(0, pos + 1 + d));
    },

    dist: function(p1, p2) {
      var dx = p1.x - p2.x,
        dy = p1.y - p2.y;
      return sqrt(dx * dx + dy * dy);
    },

    closest: function(LUT, point) {
      var mdist = pow(2, 63),
        mpos,
        d;
      LUT.forEach(function(p, idx) {
        d = utils.dist(point, p);
        if (d < mdist) {
          mdist = d;
          mpos = idx;
        }
      });
      return { mdist: mdist, mpos: mpos };
    },

    abcratio: function(t, n) {
      // see ratio(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n !== 2 && n !== 3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t === 0 || t === 1) {
        return t;
      }
      var bottom = pow(t, n) + pow(1 - t, n),
        top = bottom - 1;
      return abs(top / bottom);
    },

    projectionratio: function(t, n) {
      // see u(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n !== 2 && n !== 3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t === 0 || t === 1) {
        return t;
      }
      var top = pow(1 - t, n),
        bottom = pow(t, n) + top;
      return top / bottom;
    },

    lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
      var nx =
          (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
        d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (d == 0) {
        return false;
      }
      return { x: nx / d, y: ny / d };
    },

    lli4: function(p1, p2, p3, p4) {
      var x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y,
        x3 = p3.x,
        y3 = p3.y,
        x4 = p4.x,
        y4 = p4.y;
      return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
    },

    lli: function(v1, v2) {
      return utils.lli4(v1, v1.c, v2, v2.c);
    },

    makeline: function(p1, p2) {
      var Bezier = require("./bezier");
      var x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y,
        dx = (x2 - x1) / 3,
        dy = (y2 - y1) / 3;
      return new Bezier(
        x1,
        y1,
        x1 + dx,
        y1 + dy,
        x1 + 2 * dx,
        y1 + 2 * dy,
        x2,
        y2
      );
    },

    findbbox: function(sections) {
      var mx = nMax,
        my = nMax,
        MX = nMin,
        MY = nMin;
      sections.forEach(function(s) {
        var bbox = s.bbox();
        if (mx > bbox.x.min) mx = bbox.x.min;
        if (my > bbox.y.min) my = bbox.y.min;
        if (MX < bbox.x.max) MX = bbox.x.max;
        if (MY < bbox.y.max) MY = bbox.y.max;
      });
      return {
        x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
        y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
      };
    },

    shapeintersections: function(
      s1,
      bbox1,
      s2,
      bbox2,
      curveIntersectionThreshold
    ) {
      if (!utils.bboxoverlap(bbox1, bbox2)) return [];
      var intersections = [];
      var a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
      var a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
      a1.forEach(function(l1) {
        if (l1.virtual) return;
        a2.forEach(function(l2) {
          if (l2.virtual) return;
          var iss = l1.intersects(l2, curveIntersectionThreshold);
          if (iss.length > 0) {
            iss.c1 = l1;
            iss.c2 = l2;
            iss.s1 = s1;
            iss.s2 = s2;
            intersections.push(iss);
          }
        });
      });
      return intersections;
    },

    makeshape: function(forward, back, curveIntersectionThreshold) {
      var bpl = back.points.length;
      var fpl = forward.points.length;
      var start = utils.makeline(back.points[bpl - 1], forward.points[0]);
      var end = utils.makeline(forward.points[fpl - 1], back.points[0]);
      var shape = {
        startcap: start,
        forward: forward,
        back: back,
        endcap: end,
        bbox: utils.findbbox([start, forward, back, end])
      };
      var self = utils;
      shape.intersections = function(s2) {
        return self.shapeintersections(
          shape,
          shape.bbox,
          s2,
          s2.bbox,
          curveIntersectionThreshold
        );
      };
      return shape;
    },

    getminmax: function(curve, d, list) {
      if (!list) return { min: 0, max: 0 };
      var min = nMax,
        max = nMin,
        t,
        c;
      if (list.indexOf(0) === -1) {
        list = [0].concat(list);
      }
      if (list.indexOf(1) === -1) {
        list.push(1);
      }
      for (var i = 0, len = list.length; i < len; i++) {
        t = list[i];
        c = curve.get(t);
        if (c[d] < min) {
          min = c[d];
        }
        if (c[d] > max) {
          max = c[d];
        }
      }
      return { min: min, mid: (min + max) / 2, max: max, size: max - min };
    },

    align: function(points, line) {
      var tx = line.p1.x,
        ty = line.p1.y,
        a = -atan2(line.p2.y - ty, line.p2.x - tx),
        d = function(v) {
          return {
            x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
            y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
          };
        };
      return points.map(d);
    },

    roots: function(points, line) {
      line = line || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
      var order = points.length - 1;
      var p = utils.align(points, line);
      var reduce = function(t) {
        return 0 <= t && t <= 1;
      };

      if (order === 2) {
        var a = p[0].y,
          b = p[1].y,
          c = p[2].y,
          d = a - 2 * b + c;
        if (d !== 0) {
          var m1 = -sqrt(b * b - a * c),
            m2 = -a + b,
            v1 = -(m1 + m2) / d,
            v2 = -(-m1 + m2) / d;
          return [v1, v2].filter(reduce);
        } else if (b !== c && d === 0) {
          return [(2*b - c)/(2*b - 2*c)].filter(reduce);
        }
        return [];
      }

      // see http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
      var pa = p[0].y,
        pb = p[1].y,
        pc = p[2].y,
        pd = p[3].y,
        d = -pa + 3 * pb - 3 * pc + pd,
        a = 3 * pa - 6 * pb + 3 * pc,
        b = -3 * pa + 3 * pb,
        c = pa;

      if (utils.approximately(d, 0)) {
        // this is not a cubic curve.
        if (utils.approximately(a, 0)) {
          // in fact, this is not a quadratic curve either.
          if (utils.approximately(b, 0)) {
            // in fact in fact, there are no solutions.
            return [];
          }
          // linear solution:
          return [-c / b].filter(reduce);
        }
        // quadratic solution:
        var q = sqrt(b * b - 4 * a * c),
          a2 = 2 * a;
        return [(q - b) / a2, (-b - q) / a2].filter(reduce);
      }

      // at this point, we know we need a cubic solution:

      a /= d;
      b /= d;
      c /= d;

      var p = (3 * b - a * a) / 3,
        p3 = p / 3,
        q = (2 * a * a * a - 9 * a * b + 27 * c) / 27,
        q2 = q / 2,
        discriminant = q2 * q2 + p3 * p3 * p3,
        u1,
        v1,
        x1,
        x2,
        x3;
      if (discriminant < 0) {
        var mp3 = -p / 3,
          mp33 = mp3 * mp3 * mp3,
          r = sqrt(mp33),
          t = -q / (2 * r),
          cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
          phi = acos(cosphi),
          crtr = crt(r),
          t1 = 2 * crtr;
        x1 = t1 * cos(phi / 3) - a / 3;
        x2 = t1 * cos((phi + tau) / 3) - a / 3;
        x3 = t1 * cos((phi + 2 * tau) / 3) - a / 3;
        return [x1, x2, x3].filter(reduce);
      } else if (discriminant === 0) {
        u1 = q2 < 0 ? crt(-q2) : -crt(q2);
        x1 = 2 * u1 - a / 3;
        x2 = -u1 - a / 3;
        return [x1, x2].filter(reduce);
      } else {
        var sd = sqrt(discriminant);
        u1 = crt(-q2 + sd);
        v1 = crt(q2 + sd);
        return [u1 - v1 - a / 3].filter(reduce);
      }
    },

    droots: function(p) {
      // quadratic roots are easy
      if (p.length === 3) {
        var a = p[0],
          b = p[1],
          c = p[2],
          d = a - 2 * b + c;
        if (d !== 0) {
          var m1 = -sqrt(b * b - a * c),
            m2 = -a + b,
            v1 = -(m1 + m2) / d,
            v2 = -(-m1 + m2) / d;
          return [v1, v2];
        } else if (b !== c && d === 0) {
          return [(2 * b - c) / (2 * (b - c))];
        }
        return [];
      }

      // linear roots are even easier
      if (p.length === 2) {
        var a = p[0],
          b = p[1];
        if (a !== b) {
          return [a / (a - b)];
        }
        return [];
      }
    },

    curvature: function(t, points, _3d, kOnly) {
      var dpoints = utils.derive(points);
      var d1 = dpoints[0];
      var d2 = dpoints[1];
      var num, dnm, adk, dk, k=0, r=0;

      //
      // We're using the following formula for curvature:
      //
      //              x'y" - y'x"
      //   k(t) = ------------------
      //           (x'² + y'²)^(3/2)
      //
      // from https://en.wikipedia.org/wiki/Radius_of_curvature#Definition
      //
      // With it corresponding 3D counterpart:
      //
      //          sqrt( (y'z" - y"z')² + (z'x" - z"x')² + (x'y" - x"y')²)
      //   k(t) = -------------------------------------------------------
      //                     (x'² + y'² + z'²)^(3/2)
      //

      var d = utils.compute(t, d1);
      var dd = utils.compute(t, d2);
      var qdsum = d.x*d.x + d.y*d.y;
      if (_3d) {
        num = sqrt(
          pow(d.y*dd.z - dd.y*d.z, 2) +
          pow(d.z*dd.x - dd.z*d.x, 2) +
          pow(d.x*dd.y - dd.x*d.y, 2)
        );
        dnm = pow(qdsum + d.z*d.z, 3/2);
      } else {
        num = d.x*dd.y - d.y*dd.x;
        dnm = pow(qdsum, 3/2);
      }

      if (num === 0 || dnm === 0) {
        return { k:0, r:0 };
      }

      k = num/dnm;
      r = dnm/num;

      // We're also computing the derivative of kappa, because
      // there is value in knowing the rate of change for the
      // curvature along the curve. And we're just going to
      // ballpark it based on an epsilon.
      if (!kOnly) {
        // compute k'(t) based on the interval before, and after it,
        // to at least try to not introduce forward/backward pass bias.
        var pk = utils.curvature(t-0.001, points, _3d, true).k;
        var nk = utils.curvature(t+0.001, points, _3d, true).k;
        dk = ((nk-k) + (k-pk))/2;
        adk = (abs(nk-k) + abs(k-pk))/2;
      }

      return { k: k, r: r, dk: dk, adk:adk, };
    },

    inflections: function(points) {
      if (points.length < 4) return [];

      // FIXME: TODO: add in inflection abstraction for quartic+ curves?

      var p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }),
        a = p[2].x * p[1].y,
        b = p[3].x * p[1].y,
        c = p[1].x * p[2].y,
        d = p[3].x * p[2].y,
        v1 = 18 * (-3 * a + 2 * b + 3 * c - d),
        v2 = 18 * (3 * a - b - 3 * c),
        v3 = 18 * (c - a);

      if (utils.approximately(v1, 0)) {
        if (!utils.approximately(v2, 0)) {
          var t = -v3 / v2;
          if (0 <= t && t <= 1) return [t];
        }
        return [];
      }

      var trm = v2 * v2 - 4 * v1 * v3,
        sq = Math.sqrt(trm),
        d = 2 * v1;

      if (utils.approximately(d, 0)) return [];

      return [(sq - v2) / d, -(v2 + sq) / d].filter(function(r) {
        return 0 <= r && r <= 1;
      });
    },

    bboxoverlap: function(b1, b2) {
      var dims = ["x", "y"],
        len = dims.length,
        i,
        dim,
        l,
        t,
        d;
      for (i = 0; i < len; i++) {
        dim = dims[i];
        l = b1[dim].mid;
        t = b2[dim].mid;
        d = (b1[dim].size + b2[dim].size) / 2;
        if (abs(l - t) >= d) return false;
      }
      return true;
    },

    expandbox: function(bbox, _bbox) {
      if (_bbox.x.min < bbox.x.min) {
        bbox.x.min = _bbox.x.min;
      }
      if (_bbox.y.min < bbox.y.min) {
        bbox.y.min = _bbox.y.min;
      }
      if (_bbox.z && _bbox.z.min < bbox.z.min) {
        bbox.z.min = _bbox.z.min;
      }
      if (_bbox.x.max > bbox.x.max) {
        bbox.x.max = _bbox.x.max;
      }
      if (_bbox.y.max > bbox.y.max) {
        bbox.y.max = _bbox.y.max;
      }
      if (_bbox.z && _bbox.z.max > bbox.z.max) {
        bbox.z.max = _bbox.z.max;
      }
      bbox.x.mid = (bbox.x.min + bbox.x.max) / 2;
      bbox.y.mid = (bbox.y.min + bbox.y.max) / 2;
      if (bbox.z) {
        bbox.z.mid = (bbox.z.min + bbox.z.max) / 2;
      }
      bbox.x.size = bbox.x.max - bbox.x.min;
      bbox.y.size = bbox.y.max - bbox.y.min;
      if (bbox.z) {
        bbox.z.size = bbox.z.max - bbox.z.min;
      }
    },

    pairiteration: function(c1, c2, curveIntersectionThreshold) {
      var c1b = c1.bbox(),
        c2b = c2.bbox(),
        r = 100000,
        threshold = curveIntersectionThreshold || 0.5;
      if (
        c1b.x.size + c1b.y.size < threshold &&
        c2b.x.size + c2b.y.size < threshold
      ) {
        return [
          ((r * (c1._t1 + c1._t2) / 2) | 0) / r +
            "/" +
            ((r * (c2._t1 + c2._t2) / 2) | 0) / r
        ];
      }
      var cc1 = c1.split(0.5),
        cc2 = c2.split(0.5),
        pairs = [
          { left: cc1.left, right: cc2.left },
          { left: cc1.left, right: cc2.right },
          { left: cc1.right, right: cc2.right },
          { left: cc1.right, right: cc2.left }
        ];
      pairs = pairs.filter(function(pair) {
        return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
      });
      var results = [];
      if (pairs.length === 0) return results;
      pairs.forEach(function(pair) {
        results = results.concat(
          utils.pairiteration(pair.left, pair.right, threshold)
        );
      });
      results = results.filter(function(v, i) {
        return results.indexOf(v) === i;
      });
      return results;
    },

    getccenter: function(p1, p2, p3) {
      var dx1 = p2.x - p1.x,
        dy1 = p2.y - p1.y,
        dx2 = p3.x - p2.x,
        dy2 = p3.y - p2.y;
      var dx1p = dx1 * cos(quart) - dy1 * sin(quart),
        dy1p = dx1 * sin(quart) + dy1 * cos(quart),
        dx2p = dx2 * cos(quart) - dy2 * sin(quart),
        dy2p = dx2 * sin(quart) + dy2 * cos(quart);
      // chord midpoints
      var mx1 = (p1.x + p2.x) / 2,
        my1 = (p1.y + p2.y) / 2,
        mx2 = (p2.x + p3.x) / 2,
        my2 = (p2.y + p3.y) / 2;
      // midpoint offsets
      var mx1n = mx1 + dx1p,
        my1n = my1 + dy1p,
        mx2n = mx2 + dx2p,
        my2n = my2 + dy2p;
      // intersection of these lines:
      var arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n),
        r = utils.dist(arc, p1),
        // arc start/end values, over mid point:
        s = atan2(p1.y - arc.y, p1.x - arc.x),
        m = atan2(p2.y - arc.y, p2.x - arc.x),
        e = atan2(p3.y - arc.y, p3.x - arc.x),
        _;
      // determine arc direction (cw/ccw correction)
      if (s < e) {
        // if s<m<e, arc(s, e)
        // if m<s<e, arc(e, s + tau)
        // if s<e<m, arc(e, s + tau)
        if (s > m || m > e) {
          s += tau;
        }
        if (s > e) {
          _ = e;
          e = s;
          s = _;
        }
      } else {
        // if e<m<s, arc(e, s)
        // if m<e<s, arc(s, e + tau)
        // if e<s<m, arc(s, e + tau)
        if (e < m && m < s) {
          _ = e;
          e = s;
          s = _;
        } else {
          e += tau;
        }
      }
      // assign and done.
      arc.s = s;
      arc.e = e;
      arc.r = r;
      return arc;
    },

    numberSort: function(a, b) {
      return a - b;
    }
  };

  module.exports = utils;
})();
