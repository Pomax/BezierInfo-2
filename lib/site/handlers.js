window["Bezier Section Handlers"] = {
  "introduction": {
    handler: (function() { return {
  drawQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  drawCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  }
};
 }())
  },
  "whatis": {
    handler: (function() { return {
  setup: function(api) {
    api.setPanelCount(3);
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.step = 25;
  },

  draw: function(api, curve) {
    var dim = api.getPanelWidth(),
        pts = curve.points,
        p1 = pts[0],
        p2=pts[1],
        p3 = pts[2],
        p1e, p2e, m, t, i,
        offset = {x:0, y:0},
        d,v,tvp;

    api.reset();

    api.setColor("black");
    api.setFill("black");
    api.drawSkeleton(curve, offset);
    api.text("First linear interpolation at "+api.step+"% steps", {x:5, y:15}, offset);

    offset.x += dim;
    api.drawLine({x:0, y:0}, {x:0, y:this.dim}, offset);
    api.drawSkeleton(curve, offset);
    api.text("Second interpolation at "+api.step+"% steps", {x:5, y:15}, offset);

    offset.x += dim;
    api.drawLine({x:0, y:0}, {x:0, y:this.dim}, offset);
    api.drawSkeleton(curve, offset);
    api.text("Curve points generated this way", {x:5, y:15}, offset);

    api.setColor("lightgrey");
    for(t=1,d=20,v,tvp; t<d; t++) {
      v = t/d;
      tvp = curve.get(v);
      api.drawCircle(tvp,2,offset);
    }

    for(i = 3*api.step; i>0; i -= api.step) {
      t = i/100;
      if (t>1) continue;
      api.setRandomColor();

      p1e = {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };

      p2e = {
        x: p2.x + t * (p3.x - p2.x),
        y: p2.y + t * (p3.y - p2.y)
      };

      m = {
        x: p1e.x + t * (p2e.x - p1e.x),
        y: p1e.y + t * (p2e.y - p1e.y)
      };

      offset = {x:0, y:0};
      api.drawCircle(p1e,3, offset);
      api.drawCircle(p2e,3, offset);
      api.setWeight(0.5);
      api.drawLine(p1e, p2e, offset);
      api.setWeight(1.5);
      api.drawLine(p1, p1e, offset);
      api.drawLine(p2, p2e, offset);
      api.setWeight(1);

      offset.x += dim;
      api.drawCircle(p1e,3, offset);
      api.drawCircle(p2e,3, offset);
      api.setWeight(0.5);
      api.drawLine(p1e, p2e, offset);
      api.setWeight(1.5);
      api.drawLine(p1e, m, offset);
      api.setWeight(1);
      api.drawCircle(m,3,offset);

      offset.x += dim;
      api.drawCircle(m,3,offset);

      api.text(i+"%, or t = " + api.utils.round(t,2), {x: m.x + 10 + offset.x, y: m.y + 10 + offset.y});
    }
  },

  values: {
    "38": 1,  // up arrow
    "40": -1  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.step += v;
      if (api.step < 1) {
        api.step = 1;
      }
    }
  }
};
 }())
  },
  "explanation": {
    handler: (function() { return {
  statics: {
    keyHandlingOptions: {
      propName: "step",
      values: {
        "38": 0.1,  // up arrow
        "40": -0.1  // down arrow
      },
      controller: function(api) {
        if (api.step < 0.1) {
          api.step = 0.1;
        }
      }
    }
  },

  setup: function(api) {
    api.step = 5;
  },

  draw: function(api, curve) {
    var dim = api.getPanelWidth(),
        w = dim,
        h = dim,
        w2 = w/2,
        h2 = h/2,
        w4 = w2/2,
        h4 = h2/2;

    api.reset();
    api.setColor("black");
    api.drawLine({x:0,y:h2},{x:w,y:h2});
    api.drawLine({x:w2,y:0},{x:w2,y:h});

    var offset = {x:w2, y:h2};
    for(var t=0, p; t<=api.step; t+=0.1) {
      p = {
        x: w4 * Math.cos(t),
        y: h4 * Math.sin(t)
      };
      api.drawPoint(p, offset);
      var modulo = t % 1;
      if(modulo<0.05 || modulo> 0.95) {
        api.text("t = " + Math.round(t), {
          x: offset.x + 1.25 * w4 * Math.cos(t) - 10,
          y: offset.y + 1.25 * h4 * Math.sin(t) + 5
        });
        api.drawCircle(p, 2, offset);
      }
    }
  }
};
 }()),
    withKeys: true
  },
  "control": {
    handler: (function() { return {
  drawCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  drawFunction: function(api, label, where, generator) {
    api.setRandomColor();
    api.drawFunction(generator);
    api.setFill(api.getColor());
    if (label) api.text(label, where);
  },

  drawLerpBox: function(api, dim, pad, p) {
    api.noColor();
    api.setFill("rgba(0,0,100,0.2)");
    var p1 = {x: p.x-5, y:pad},
        p2 = {x:p.x + 5, y:dim};
    api.drawRect(p1, p2);
    api.setColor("black");
  },

  drawLerpPoint: function(api, tf, pad, fwh, p) {
    p.y = pad + tf*fwh;
    api.drawCircle(p, 3);
    api.setFill("black");
    api.text(((tf*10000)|0)/100 + "%", {x:p.x+10, y:p.y+4});
    api.noFill();
  },

  drawQuadraticLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;

    api.drawAxes(pad, "t",0,1, "S","0%","100%");

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      var t = (p.x-pad)/fwh;
      this.drawLerpPoint(api, (1-t)*(1-t), pad, fwh, p);
      this.drawLerpPoint(api, 2*(1-t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, (t)*(t), pad, fwh, p);
    }

    this.drawFunction(api, "first term", {x: pad*2, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (1-t) * (1-t)
      };
    });
    this.drawFunction(api, "second term", {x: dim/2 - 1.5*pad, y: dim/2 + pad}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 2 * (1-t) * (t)
      };
    });
    this.drawFunction(api, "third term", {x: fwh - pad*2.5, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (t) * (t)
      };
    });
  },

  drawCubicLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;

    api.drawAxes(pad, "t",0,1, "S","0%","100%");

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      var t = (p.x-pad)/fwh;
      this.drawLerpPoint(api, (1-t)*(1-t)*(1-t), pad, fwh, p);
      this.drawLerpPoint(api, 3*(1-t)*(1-t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, 3*(1-t)*(t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, (t)*(t)*(t), pad, fwh, p);
    }

    this.drawFunction(api, "first term", {x: pad*2, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (1-t) * (1-t) * (1-t)
      };
    });
    this.drawFunction(api, "second term", {x: dim/2 - 4*pad, y: dim/2 }, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 3 * (1-t) * (1-t) * (t)
      };
    });
    this.drawFunction(api, "third term", {x: dim/2 + 2*pad, y: dim/2}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 3 * (1-t) * (t) * (t)
      };
    });
    this.drawFunction(api, "fourth term", {x: fwh - pad*2.5, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (t) * (t) * (t)
      };
    });
  },

  draw15thLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;

    api.drawAxes(pad, "t",0,1, "S","0%","100%");

    var factors = [1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1];

    var p = api.hover, n;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      for(n=0; n<=15; n++) {
        var t = (p.x-pad)/fwh,
            tf = factors[n] * Math.pow(1-t, 15-n) * Math.pow(t, n);
        this.drawLerpPoint(api, tf, pad, fwh, p);
      }
    }

    for(n=0; n<=15; n++) {
      var label = false, position = false;
      if (n===0) {
        label = "first term";
        position = {x: pad + 5, y: fwh};
      }
      if (n===15) {
        label = "last term";
        position = {x: dim - 3.5*pad, y: fwh};
      }
      this.drawFunction(api, label, position, function(t) {
        return {
          x: pad + t * fwh,
          y: pad + fwh * factors[n] * Math.pow(1-t, 15-n) * Math.pow(t, n)
        };
      });
    }
  }
};
 }())
  },
  "extended": {
    handler: (function() { return {
  setupQuadratic: function(api) {
    var curve = new api.Bezier(70, 155, 20, 110, 100,75);
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = new api.Bezier(60,105, 75,30, 215,115, 140,160);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("lightgrey");

    var t, step=0.05, min=-10;
    var pt = curve.get(min - step), pn;
    for (t=min; t<=step; t+=step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }

    pt = curve.get(1);
    var max = 10;
    for (t=1+step; t<=max; t+=step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }
  }
};
 }())
  },
  "decasteljau": {
    handler: (function() { return {
  setup: function(api) {
    var points = [
      {x: 90, y:110},
      {x: 25, y: 40},
      {x:230, y: 40},
      {x:150, y:240}
    ];
    api.setCurve(new api.Bezier(points));
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    if (api.hover) {
      api.setColor("rgb(200,100,100)");
      var dim = api.getPanelWidth();
      var t = api.hover.x / dim;
      var hull = api.drawHull(curve, t);

      for(var i=4; i<=8; i++) {
        api.drawCircle(hull[i],3);
      }

      var p = curve.get(t);
      api.drawCircle(p, 5);
      api.setFill("black");
      api.drawCircle(p, 3);
      var perc = (t*100)|0;
      t = perc/100;
      api.text("Sequential interpolation for "+perc+"% (t="+t+")", {x: 10, y:15});
    }
  }
};
 }())
  },
  "flattening": {
    handler: (function() { return {
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1  // down arrow
      },
      controller: function(api) {
        if (api.steps < 1) {
          api.steps = 1;
        }
      }
    }
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.steps = 3;
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 5;
  },

  drawFlattened: function(api, curve) {
    api.reset();
    api.setColor("#DDD");
    api.drawSkeleton(curve);
    api.setColor("#DDD");
    api.drawCurve(curve);
    var step = 1 / api.steps;
    var p0 = curve.points[0], pc;
    for(var t=step; t<1.0+step; t+=step) {
      pc = curve.get(Math.min(t,1));
      api.setColor("red");
      api.drawLine(p0,pc);
      p0 = pc;
    }
    api.setFill("black");
    api.text("Curve approximation using "+api.steps+" segments", {x:10, y:15});
  },

  values: {
    "38": 1,  // up arrow
    "40": -1  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.steps += v;
      if (api.steps < 1) {
        api.steps = 1;
      }
    }
  }
};
 }()),
    withKeys: true
  },
  "splitting": {
    handler: (function() { return {
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.forward = true;
  },

  drawSplit: function(api, curve) {
    api.setPanelCount(2);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var offset = {x:0, y:0};
    var t = 0.5;
    var pt = curve.get(0.5);
    var split = curve.split(t);
    api.drawCurve(split.left);
    api.drawCurve(split.right);
    api.setColor("red");
    api.drawCircle(pt,3);

    api.setColor("black");
    offset.x = api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawCircle(pt,4);

    offset.x -= 20;
    offset.y -= 20;
    api.drawSkeleton(split.left, offset, true);
    api.drawCurve(split.left, offset);

    offset.x += 40;
    offset.y += 40;
    api.drawSkeleton(split.right, offset, true);
    api.drawCurve(split.right, offset);
  },

  drawAnimated: function(api, curve) {
    api.setPanelCount(3);
    api.reset();

    var frame = api.getFrame();
    var interval = 5 * api.getPlayInterval();
    var t = (frame%interval)/interval;
    var forward = (frame%(2*interval)) < interval;
    if (forward) { t = t%1; } else { t = 1 - t%1; }
    var offset = {x:0, y:0};

    api.setColor("lightblue");
    api.drawHull(curve, t);
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    var pt = curve.get(t);
    api.drawCircle(pt, 4);

    api.setColor("black");
    offset.x += api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    var split = curve.split(t);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawHull(curve, t, offset);
    api.setColor("black");
    api.drawCurve(split.left, offset);
    api.drawPoints(split.left.points, offset);
    api.setFill("black");
    api.text("Left side of curve split at t = " + (((100*t)|0)/100), {x: 10 + offset.x, y: 15 + offset.y});

    offset.x += api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawHull(curve, t, offset);
    api.setColor("black");
    api.drawCurve(split.right, offset);
    api.drawPoints(split.right.points, offset);
    api.setFill("black");
    api.text("Right side of curve split at t = " + (((100*t)|0)/100), {x: 10 + offset.x, y: 15 + offset.y});
  },

  togglePlay: function(evt, api) {
    if (api.playing) { api.pause(); } else { api.play(); }
  }
};
 }())
  },
  "reordering": {
    handler: (function() { var invert = require('../../../lib/matrix-invert.js');
var multiply = require('../../../lib/matrix-multiply.js');
var transpose = require('../../../lib/matrix-transpose.js');

var Reordering = {
  statics: {
    keyHandlingOptions: {
      values: {
        "38": function(api) {
          api.setCurve(api.curve.raise());
          api.redraw();
        },
        "40": function(api) {
          api.setCurve(Reordering.lower(api));
          api.redraw();
        }
      }
    }
  },

  // Based on http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/
  lower: function(api) {
    var curve = api.curve,
        pts = curve.points,
        k = pts.length,
        M = [],
        n = k-1,
        i;

    // build M, which will be (k) rows by (k-1) columns
    for(i=0; i<k; i++) {
      M[i] = (new Array(k)).fill(0);
      if(i===0) { M[i][0] = 1; }
      else if(i===n) { M[i][i-1] = 1; }
      else {
        M[i][i-1] = i / k;
        M[i][i] = 1 - M[i][i-1];
      }
    }

    // then, apply our matrix operations:
    var Mt = transpose(M);
    var Mc = multiply(Mt, M);
    var Mi = invert(Mc);
    var V = multiply(Mi, Mt);

    // And then we map our k-order list of coordinates
    // to an n-order list of coordinates, instead:
    var x = pts.map(p => [p.x]);
    var nx = multiply(V, x);

    var y = pts.map(p => [p.y]);
    var ny = multiply(V, y);

    var npts = nx.map((x,i) => {
      return {
        x: x[0],
        y: ny[i][0]
      };
    });

    return new api.Bezier(npts);
  },

  getInitialState: function() {
    return {
      order: 0
    };
  },

  setup: function(api) {
    var points = [];
    var w = api.getPanelWidth(),
        h = api.getPanelHeight();
    for (var i=0; i<10; i++) {
      points.push({
        x: w/2 + (Math.random() * 20) + Math.cos(Math.PI*2 * i/10) * (w/2 - 40),
        y: h/2 + (Math.random() * 20) + Math.sin(Math.PI*2 * i/10) * (h/2 - 40)
      });
    }
    var curve = new api.Bezier(points);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    var pts = curve.points;

    this.setState({
      order: pts.length
    });

    var p0 = pts[0];

    // we can't "just draw" this curve, since it'll be an arbitrary order,
    // And the canvas only does 2nd and 3rd - we use de Casteljau's algorithm:
    for(var t=0; t<=1; t+=0.01) {
      var q = JSON.parse(JSON.stringify(pts));
      while(q.length > 1) {
        for (var i=0; i<q.length-1; i++) {
          q[i] = {
            x: q[i].x + (q[i+1].x - q[i].x) * t,
            y: q[i].y + (q[i+1].y - q[i].y) * t
          };
        }
        q.splice(q.length-1, 1);
      }
      api.drawLine(p0, q[0]);
      p0 = q[0];
    }

    p0 = pts[0];
    api.setColor("black");
    api.drawCircle(p0,3);
    pts.forEach(p => {
      if(p===p0) return;
      api.setColor("#DDD");
      api.drawLine(p0,p);
      api.setColor("black");
      api.drawCircle(p,3);
      p0 = p;
    });
  },

  getOrder: function() {
    var order = this.state.order;
    if (order%10 === 1 && order !== 11) {
      order += "st";
    } else if (order%10 === 2 && order !== 12) {
      order += "nd";
    } else if (order%10 === 3 && order !== 13) {
      order += "rd";
    } else {
      order += "th";
    }
    return order;
  },

  onMouseMove: function(evt, api) {
    api.redraw();
  }
};

return Reordering;
 }()),
    withKeys: true
  },
  "pointvectors": {
    handler: (function() { return {
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);

    var i,t,p,tg,n,m,nd=20;
    for(i=0; i<=10; i++) {
      t = i/10.0;
      p = curve.get(t);
      tg = curve.derivative(t);
      m = Math.sqrt(tg.x*tg.x + tg.y*tg.y);
      tg = {x:tg.x/m, y:tg.y/m};
      n = curve.normal(t);
      api.setColor("blue");
      api.drawLine(p, {x:p.x+tg.x*nd, y:p.y+tg.y*nd});
      api.setColor("red");
      api.drawLine(p, {x:p.x+n.x*nd, y:p.y+n.y*nd});
      api.setColor("black");
      api.drawCircle(p,3);
    }
  }
};
 }())
  },
  "pointvectors3d": {
    handler: (function() { var vectorOffset;
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

return {
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
 }())
  },
  "components": {
    handler: (function() { return {
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[2].x = 210;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.setPanelCount(3);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var tf = curve.order,
        pad = 20,
        pts = curve.points,
        w = api.getPanelWidth(),
        wp = w - 2 * pad,
        h = api.getPanelHeight(),
        offset = { x: w, y: 0 };

    var x_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => {
      return {x:wp*t/tf, y:p.x};
    });
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "x",0,w, offset);
    offset.x += pad;
    api.drawCurve(new api.Bezier(x_pts), offset);

    offset.x += w-pad;
    var y_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => {
      return {x:wp*t/tf, y:p.y};
    });
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "y",0,w, offset);
    offset.x += pad;
    api.drawCurve(new api.Bezier(y_pts), offset);
  }
};
 }())
  },
  "extremities": {
    handler: (function() { return {
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[2].x = 210;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.setPanelCount(3);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var tf = curve.order + 1,
        pad = 20,
        pts = curve.points,
        w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = { x: w, y: 0 };

    var x_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.x}; });
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "x",0,w, offset);
    offset.x += pad;
    var xcurve = new api.Bezier(x_pts);
    api.drawCurve(xcurve, offset);
    api.setColor("red");
    xcurve.extrema().y.forEach(t => {
      var p = xcurve.get(t);
      api.drawCircle(p, 3, offset);
    });

    offset.x += w-pad;
    var y_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.y}; });
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "y",0,w, offset);
    offset.x += pad;
    var ycurve = new api.Bezier(y_pts);
    api.drawCurve(ycurve, offset);
    api.setColor("red");
    ycurve.extrema().y.forEach(t => {
      var p = ycurve.get(t);
      api.drawCircle(p, 3, offset);
    });
  }
};
 }())
  },
  "boundingbox": {
    handler: (function() { return {
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.setColor("#00FF00");
    api.drawbbox(curve.bbox());
    api.setColor("black");
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("red");
    curve.extrema().values.forEach(t => {
      api.drawCircle(curve.get(t), 3);
    });
  }
};
 }())
  },
  "aligning": {
    handler: (function() { return {
  /**
   * Setup function for a default quadratic curve.
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  /**
   * Setup function for a default cubic curve.
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  /**
   * A coordinate rotation function that rotates and
   * translates the curve, such that the first coordinate
   * of the curve is (0,0) and the last coordinate is (..., 0)
   */
  align: function(points, line) {
    var tx = line.p1.x,
        ty = line.p1.y,
        // The atan2 function is so important to computing
        // that most CPUs have a dedicated implementation
        // at the hardware level for it.
        a = -Math.atan2(line.p2.y-ty, line.p2.x-tx),
        cos = Math.cos,
        sin = Math.sin,
        d = function(v) {
          return {
            x: (v.x-tx)*cos(a) - (v.y-ty)*sin(a),
            y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a)
          };
        };
    return points.map(d);
  },

  /**
   * Draw a curve and its aligned counterpart
   * side by side across two panels.
   */
  draw: function(api, curve) {
    api.setPanelCount(2);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var pts = curve.points;
    var line = {p1: pts[0], p2: pts[pts.length-1]};
    var apts = this.align(pts, line);
    var aligned = new api.Bezier(apts);
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();

    var offset = {x:w, y:0};
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    offset.x += w/4;
    offset.y += h/2;
    api.setColor("grey");
    api.drawLine({x:0,y:-h/2}, {x:0,y:h/2}, offset);
    api.drawLine({x:-w/4,y:0}, {x:w,y:0}, offset);
    api.setFill("grey");

    api.setColor("black");
    api.drawSkeleton(aligned, offset);
    api.drawCurve(aligned, offset);
  }
};
 }())
  },
  "tightbounds": {
    handler: (function() { return {
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  align: function(points, line) {
    var tx = line.p1.x,
        ty = line.p1.y,
        a = -Math.atan2(line.p2.y-ty, line.p2.x-tx),
        cos = Math.cos,
        sin = Math.sin,
        d = function(v) {
          return {
            x: (v.x-tx)*cos(a) - (v.y-ty)*sin(a),
            y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a),
            a: a
          };
        };
    return points.map(d);
  },

  // FIXME: I'm not satisfied with needing to turn a bbox[] into a point[],
  //        this needs a bezier.js solution, really, with a  call curve.tightbbox()
  transpose: function(points, angle, offset) {
    var tx = offset.x,
        ty = offset.y,
        cos = Math.cos,
        sin = Math.sin,
        v = [points.x.min, points.y.min, points.x.max, points.y.max];
    return [
      {x: v[0], y: v[1] },
      {x: v[2], y: v[1] },
      {x: v[2], y: v[3] },
      {x: v[0], y: v[3] }
    ].map(p => {
      var x=p.x, y=p.y;
      return {
        x: x*cos(angle) - y*sin(angle) + tx,
        y: x*sin(angle) + y*cos(angle) + ty
      };
    });
  },

  draw: function(api, curve) {
    api.reset();

    var pts = curve.points;
    var line = {p1: pts[0], p2: pts[pts.length-1]};
    var apts = this.align(pts, line);
    var angle = -apts[0].a;
    var aligned = new api.Bezier(apts);
    var bbox = aligned.bbox();
    var tpts = this.transpose(bbox, angle, pts[0]);

    api.setColor("#00FF00");
    api.drawLine(tpts[0], tpts[1]);
    api.drawLine(tpts[1], tpts[2]);
    api.drawLine(tpts[2], tpts[3]);
    api.drawLine(tpts[3], tpts[0]);

    api.setColor("black");
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  }
};
 }())
  },
  "inflections": {
    handler: (function() { return {
  setupCubic: function(api) {
    var curve = new api.Bezier(135,25,  25, 135,  215,75,  215,240);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.setColor("red");
    curve.inflections().forEach(function(t) {
      api.drawCircle(curve.get(t), 5);
    });
  }
};
 }())
  },
  "canonical": {
    handler: (function() { return {
  setup: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.reset();
    api._map_loaded = false;
  },

  draw: function(api, curve) {
    var w = 400,
        h = w,
        unit = this.unit,
        center = {x:w/2, y:h/2};

    api.setSize(w,h);
    api.setPanelCount(2);
    api.reset();

    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.offset.x += 400;

    if (api._map_loaded) { api.image(api._map_image); }
    else { setTimeout((
      function() {
        this.drawBase(api, curve);
        this.draw(api, curve);
      }
    ).bind(this), 100); }

    api.drawLine({x:0,y:0}, {x:0, y:h});

    var npts = [
      {x:0, y: 0},
      {x:0, y: unit},
      {x:unit, y: unit},
      this.forwardTransform(curve.points, unit)
    ];

    var canonical = new api.Bezier(npts);
    api.setColor("blue");
    api.drawCurve(canonical, center);
    api.drawCircle(npts[3], 3, center);
  },

  forwardTransform: function(pts, s) {
    s = s || 1;
    var p1 = pts[0], p2 = pts[1], p3 = pts[2], p4 = pts[3];

    var xn = -p1.x + p4.x - (-p1.x+p2.x)*(-p1.y+p4.y)/(-p1.y+p2.y);
    var xd = -p1.x + p3.x - (-p1.x+p2.x)*(-p1.y+p3.y)/(-p1.y+p2.y);
    var np4x = s*xn/xd;

    var yt1 = s*(-p1.y+p4.y) / (-p1.y+p2.y);
    var yt2 = s - (s*(-p1.y+p3.y)/(-p1.y+p2.y));
    var yp = yt2 * xn / xd;
    var np4y = yt1 + yp;

    return {x:np4x, y:np4y};
  },

  drawBase: function(api, curve) {
    api.reset();

    var w = 400,
        h = w,
        unit = this.unit = w/5,
        center = {x:w/2, y:h/2};

    api.setSize(w,h);

    // axes + gridlines
    api.setColor("lightgrey");
    for(var x=0; x<w; x+= unit/2) { api.drawLine({x:x, y:0}, {x:x, y:h}); }
    for(var y=0; y<h; y+= unit/2) { api.drawLine({x:0, y:y}, {x:w, y:y}); }
    api.setColor("black");
    api.drawLine({x:w/2,y:0}, {x:w/2, y:h});
    api.drawLine({x:0,y:h/2}, {x:w, y:h/2});

    // Inflection border:
    api.setColor("green");
    api.drawLine({x:-w/2,y:unit}, {x:w/2,y:unit}, center);

    // the three stable points
    api.setColor("black");
    api.setFill("black");
    api.drawCircle({x:0, y:0}, 4, center);
    api.text("(0,0)", {x: 5+center.x, y:15+center.y});
    api.drawCircle({x:0, y:unit}, 4, center);
    api.text("(0,1)", {x: 5+center.x, y:unit+15+center.y});
    api.drawCircle({x:unit, y:unit}, 4, center);
    api.text("(1,1)", {x: unit+5+center.x, y:unit+15+center.y});

    // cusp parabola:
    api.setWeight(1.5);
    api.setColor("#FF0000");
    api.setFill(api.getColor());
    var pts = [];
    var px = 1, py = 1;
    for (x=-10; x<=1; x+=0.01) {
      y = (-x*x + 2*x + 3)/4;
      if (x>-10) {
        pts.push({x:unit*px, y:unit*py});
        api.drawLine({x:unit*px, y:unit*py}, {x:unit*x, y:unit*y}, center);
      }
      px = x;
      py = y;
    }
    pts.push({x:unit*px, y:unit*py});
    api.text("Curve form has cusp →", {x:w/2-unit*2, y: h/2+unit/2.5});

    // loop/arch transition boundary, elliptical section
    api.setColor("#FF00FF");
    api.setFill(api.getColor());
    var sqrt = Math.sqrt;
    for (x=1; x>=0; x-=0.005) {
      pts.push({x:unit*px, y:unit*py});
      y = 0.5 * (sqrt(3) * sqrt(4*x - x*x) - x);
      api.drawLine({x:unit*px, y:unit*py}, {x:unit*x, y:unit*y}, center);
      px = x;
      py = y;
    }
    pts.push({x:unit*px, y:unit*py});
    api.text("← Curve forms a loop at t = 1", {x:w/2+unit/4, y: h/2+unit/1.5});


    // loop/arch transition boundary, parabolic section
    api.setColor("#3300FF");
    api.setFill(api.getColor());
    for (x=0; x>-w; x-=0.01) {
      pts.push({x:unit*px, y:unit*py});
      y = (-x*x + 3*x)/3;
      api.drawLine({x:unit*px, y:unit*py}, {x:unit*x, y:unit*y}, center);
      px = x;
      py = y;
    }
    pts.push({x:unit*px, y:unit*py});
    api.text("← Curve forms a loop at t = 0", {x:w/2-unit+10, y: h/2-unit*1.25});

    // shape fill
    api.setColor("transparent");
    api.setFill("rgba(255,120,100,0.2)");
    api.drawPath(pts, center);
    pts = [{x:-w/2,y:unit}, {x:w/2,y:unit}, {x:w/2,y:h}, {x:-w/2,y:h}];
    api.setFill("rgba(0,200,0,0.2)");
    api.drawPath(pts, center);

    // further labels
    api.setColor("black");
    api.setFill(api.getColor());
    api.text("← Curve form has one inflection →", {x:w/2 - unit, y: h/2 + unit*1.75});
    api.text("← Plain curve ↕", {x:w/2 + unit/2, y: h/6});
    api.text("↕ Double inflection", {x:10, y: h/2 - 10});

    api._map_image = api.toImage();
    api._map_loaded = true;
  }
};
 }())
  },
  "yforx": {
    handler: (function() { var sketch = {
  getCurve: api => {
    if (!sketch.curve) {
      sketch.curve = new api.Bezier(20, 250, 30, 20, 200, 250, 250, 20);
    }
    return sketch.curve;
  },

  onMouseMove: function(evt, api) {
    api.redraw();
  },

  tforx: {
    setup: function(api) {
      api.setPanelCount(2);
      api.setCurve(sketch.getCurve(api));
    },

    draw: function(api, curve) {
      api.reset();
      api.drawSkeleton(curve);
      api.drawCurve(curve);

      let w = api.defaultWidth;
      let h = api.defaultHeight;
      let bbox = curve.bbox();
      let x = api.mx;
      if (bbox.x.min < x && x < bbox.x.max) {
        api.setColor("red");
        api.drawLine({ x: x, y: 0 }, { x: x, y: h });
        api.text(`x=${x | 0}`, { x: x + 5, y: h - 30 });
      }

      api.setColor("black");
      api.drawLine({ x: w, y: 0 }, { x: w, y: h });
      api.setOffset({ x: w, y: 0 });

      // draw x = t(x)
      api.drawLine({x:0,y:h-20}, {x:w, y:h-20});
      api.text('0', {x:10,y:h-10});
      api.text('⅓', {x:10 + (w-10)/3,y:h-10});
      api.text('⅔', {x:10 + 2*(w-10)/3,y:h-10});
      api.text('1', {x:w-10,y:h-10});
      let p, s = { x: 0, y: h - curve.get(0).x };

      for (let step = 0.05, t = step; t < 1 + step; t += step) {
        p = {x: t * w, y: h - curve.get(t).x };
        api.drawLine(s, p);
        s = p;
      }

      api.setColor("black");
      api.text("↑\nx", {x:10,y:h/2});
      api.text("t →", {x:w/2,y:h-10});

      if (bbox.x.min < x && x < bbox.x.max) {
        api.setColor("red");
        api.drawLine({ x: 0, y: h-x }, { x: w, y: h-x });
      }
    }
  },

  yforx: {
    setup: function(api) {
      api.setCurve(sketch.getCurve(api));
    },

    draw: function(api, curve) {
      api.reset();
      api.drawSkeleton(curve);
      api.drawCurve(curve);

      let w = api.defaultWidth;
      let h = api.defaultHeight;
      let bbox = curve.bbox();
      let x = api.mx;
      if (bbox.x.min < x && x < bbox.x.max) {
        api.setColor("red");
        // The root finder is based on normal x/y coordinates,
        // so we can "trick" it by giving it "t" values as x
        // values, and "x" values as y values. Since it won't
        // even look at the x dimension, we can also just leave it.
        let roots = api.utils.roots(curve.points.map(v => {
          return { x: v.x, y: v.x-x};
        }));
        roots = roots.filter(t => t>=0 && t<=1.0);
        let t = roots[0];
        let p = curve.get(t);
        api.drawLine({ x: p.x, y: p.y }, { x: p.x, y: h });
        api.drawLine({ x: p.x, y: p.y }, { x: 0, y: p.y });
        api.text(`y=${p.y|0}`, { x: p.x/2, y: p.y - 5 });
        api.text(`x=${p.x|0}`, { x: x + 5, y: h - (h-p.y)/2 });
        api.text(`t=${((t*100)|0)/100}`, { x: x + 15, y: p.y });
      }
    }
  }
};

return sketch;
 }())
  },
  "arclength": {
    handler: (function() { var sin = Math.sin;
var tau = Math.PI*2;

return {
  /**
   * Set up a sinusoid generating function,
   * which we'll use to draw the "progressively
   * better looking" integral approximations.
   */
  setup: function(api) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var generator;
    if (!this.generator) {
      generator = ((v,scale) => {
        scale = scale || 1;
        return {
          x: v*w/tau,
          y: scale * sin(v)
        };
      });
      generator.start = 0;
      generator.end = tau;
      generator.step = 0.1;
      generator.scale = h/3;
      this.generator = generator;
    }
  },

  /**
   * Draw the generator's sine function:
   */
  drawSine: function(api, dheight) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var generator = this.generator;
    generator.dheight = dheight;

    api.setColor("black");
    api.drawLine({x:0,y:h/2}, {x:w,y:h/2});
    api.drawFunction(generator, {x:0, y:h/2});
  },

  /**
   * Draw the sliced between the sine curve and
   * the x-axis, with a variable number of steps so
   * we can show the approximation becoming better
   * and better as we increase the step count.
   */
  drawSlices: function(api, steps) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var f = w/tau;
    var area = 0;
    var c = steps <= 25 ? 1 : 0;
    api.reset();
    api.setColor("transparent");
    api.setFill("rgba(150,150,255, 0.4)");
    for (var step=tau/steps, i=step/2, v, p1, p2; i<tau+step/2; i+=step) {
      v = this.generator(i);

      // draw a rectangular strip between the curve and the x-axis:
      p1 = {x:v.x - f*step/2 + c, y: 0};
      p2 = {x:v.x + f*step/2 - c, y: v.y * this.generator.scale};

      if (!c) { api.setFill("rgba(150,150,255,"+(0.4 + 0.3*Math.random())+")"); }
      api.drawRect(p1, p2, {x:0, y:h/2});

      // and keep track of the (much simpler to compute) approximated area under the curve so far:
      area += step * Math.abs(v.y * this.generator.scale);
    }
    api.setFill("black");
    var trueArea = ((100 * 4 * h/3)|0)/100;
    var currArea = ((100 * area)|0)/100;
    api.text("Approximating with "+steps+" strips (true area: "+trueArea+"): " + currArea, {x: 10, y: h-15});
  },

  /**
   * Draw the sine curve, with a 10 slice approximation:
   */
  drawCoarseIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 10);
    this.drawSine(api);
  },

  /**
   * Draw the sine curve, with a 24 slice approximation:
   */
  drawFineIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 24);
    this.drawSine(api);
  },

  /**
   * Draw the sine curve, with a 99 slice approximation:
   */
  drawSuperFineIntegral: function(api) {
    api.reset();
    this.drawSlices(api, 99);
    this.drawSine(api);
  },

  /**
   * Set up a default cubic curve for which we'll be determining
   * its length, using the iterative integral approach:
   */
  setupCurve: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  /**
   * Draw our curve, and show its computed length:
   */
  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    var len = curve.length();
    api.setFill("black");
    api.text("Curve length: "+len+" pixels", {x:10, y:15});
  }
};
 }())
  },
  "arclengthapprox": {
    handler: (function() { return {
  // These are functions that can be called "From the page",
  // rather than being internal to the sketch. This is useful
  // for making on-page controls hook into the sketch code.
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      },
      controller: function(api) {
        if (api.steps < 1) {
          api.steps = 1;
        }
      }
    }
  },

  /**
   * Set up the default quadratic curve.
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.steps = 10;
  },

  /**
   * Set up the default cubic curve.
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 16;
  },

  /**
   * Draw a curve and its polygon-approximation,
   * showing the "true" length of the curve vs. the
   * length based on tallying up the polygon sections.
   */
  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);

    var pts = curve.getLUT(api.steps);

    var step = 1 / api.steps;
    var p0 = curve.points[0], pc;
    for(var t=step; t<1.0+step; t+=step) {
      pc = curve.get(Math.min(t,1));
      api.setColor("red");
      api.drawLine(p0,pc);
      p0 = pc;
    }

    var len = curve.length();
    var alen = 0;
    for(var i=0,p1,dx,dy; i<pts.length-1; i++) {
      p0 = pts[i];
      p1 = pts[i+1];
      dx = p1.x-p0.x;
      dy = p1.y-p0.y;
      alen += Math.sqrt(dx*dx+dy*dy);
    }
    alen = ((100*alen)|0)/100;
    len = ((100*len)|0)/100;

    api.text("Approximate length, "+api.steps+" steps: "+alen+" (true: "+len+")", {x:10, y: 15});
  }
};
 }()),
    withKeys: true
  },
  "curvature": {
    handler: (function() { return {
  setup: function(api) {
    let d = api.defaultWidth;
    api.setSize(d*3, api.defaultHeight);

    // Set up two curves with identical form, but different functions:
    var q = this.q = new api.Bezier(115, 250, 10, 35, 190, 45);
    var c = this.c = q.raise();
    q.points.forEach(p => (p.x += d/2));
    c.points.forEach(p => (p.x += 3*d/2));

    // And "fake" a master curve that we'll never draw, but which
    // will allow us to move interact with the curve points.
    api.setCurve({
      points: q.points.concat(c.points)
    });
  },

  updateCurves(api, curve) {
    // update the quadratic and cubic curves by grabbing
    // whatever the points in our "fake" master curve are

    let q = this.q;
    q.points = curve.points.slice(0,3);
    q.update();

    let c = this.c;
    c.points = curve.points.slice(3,7);
    c.update();
  },

  drawCurvature(api, curve, omni) {
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var s, t, p, n, c, ox, oy;
    for( s=0; s<256; s++) {
      // Draw the curvature as a coloured line at the
      // current point, along the normal.
      api.setColor('rgba(255,127,'+s+',0.6)');
      t = s/255;
      p = curve.get(t);
      n = curve.normal(t);
      c = curve.curvature(t);
      ox = c.k * n.x;
      oy = c.k * n.y;
      api.drawLine(p, { x: p.x + ox, y: p.y + oy });

      // And if requested, also draw it along the anti-normal.
      if (omni) {
        api.setColor('rgba('+s+',127,255,0.6)');
        api.drawLine(p, { x: p.x - ox, y: p.y - oy });
      }
    }
  },

  proxyDraw: function(api, curve, omni) {
    api.reset();
    this.updateCurves(api, curve);
    [this.q, this.c].forEach(curve => this.drawCurvature(api, curve, omni));
  },

  draw: function(api, curve) {
    this.proxyDraw(api, curve);
  },

  drawOmni: function(api, curve) {
    this.proxyDraw(api, curve, true);
  }
};
 }())
  },
  "tracing": {
    handler: (function() { return {
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      },
      controller: function(api) {
        if (api.steps < 1) {
          api.steps = 1;
        }
      }
    }
  },

  setup: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 8;
  },

  generate: function(api, curve, offset, pad, fwh) {
    offset.x += pad;
    offset.y += pad;
    var len = curve.length();
    var pts = [{x:0, y:0, d:0}];
    for(var v=1, t, d; v<=100; v++) {
      t = v/100;
      d = curve.split(t).left.length();
      pts.push({
        x: api.utils.map(t, 0,1,   0,fwh),
        y: api.utils.map(d, 0,len, 0,fwh),
        d: d,
        t: t
      });
    }
    return pts;
  },

  draw: function(api, curve, offset) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var len = curve.length();
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var pad = 20;
    var fwh = w - 2*pad;

    offset.x += w;
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "d",0,len, offset);

    return this.generate(api, curve, offset, pad, fwh);
  },

  plotOnly: function(api, curve) {
    api.setPanelCount(2);
    var offset = {x:0, y:0};
    var pts = this.draw(api, curve, offset);
    for(var i=0; i<pts.length-1; i++) {
      api.drawLine(pts[i], pts[i+1], offset);
    }
  },

  drawColoured: function(api, curve) {
    api.setPanelCount(3);
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var pad = 20;
    var fwh = w - 2*pad;

    var offset = {x:0, y:0};
    var len = curve.length();
    var pts = this.draw(api, curve, offset);
    var s = api.steps, i, p, ts=[];
    for(i=0; i<=s; i++) {
      var target = (i * len)/s;
      // find the t nearest our target distance
      for (p=0; p<pts.length; p++) {
        if (pts[p].d > target) {
          p--;
          break;
        }
      }
      if(p<0) p=0;
      if(p===pts.length) p=pts.length-1;
      ts.push(pts[p]);
    }

    for(i=0; i<pts.length-1; i++) {
      api.drawLine(pts[i], pts[i+1], offset);
    }

    ts.forEach(p => {
      var pt = { x: api.utils.map(p.t,0,1,0,fwh), y: 0 };
      var pd = { x: 0, y: api.utils.map(p.d,0,len,0,fwh) };
      api.setColor("black");
      api.drawCircle(pt, 3, offset);
      api.drawCircle(pd, 3, offset);
      api.setColor("lightgrey");
      api.drawLine(pt, {x:pt.x, y:pd.y}, offset);
      api.drawLine(pd, {x:pt.x, y:pd.y}, offset);
    });

    offset = {x:2*w, y:0};
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    var idx=0, colors = ["rgb(240,0,200)", "rgb(0,40,200)"];
    api.setColor(colors[idx]);
    var p0 = curve.get(pts[0].t), p1;
    api.drawCircle(curve.get(0), 4, offset);

    for (i=1, p1; i<pts.length; i++) {
      p1 = curve.get(pts[i].t);
      api.drawLine(p0, p1, offset);
      if (ts.indexOf(pts[i]) !== -1) {
        api.setColor(colors[++idx % colors.length]);
        api.drawCircle(p1, 4, offset);
      }
      p0 = p1;
    }
  }
};
 }()),
    withKeys: true
  },
  "intersections": {
    handler: (function() { var min = Math.min, max = Math.max;

return {
  setupLines: function(api) {
    var curve1 = new api.Bezier([50,50,150,110]);
    var curve2 = new api.Bezier([50,250,170,170]);
    api.setCurve(curve1, curve2);
  },

  drawLineIntersection: function(api, curves) {
    api.reset();

    var lli = api.utils.lli4;
    var p = lli(
      curves[0].points[0],
      curves[0].points[1],
      curves[1].points[0],
      curves[1].points[1]
    );

    var mark = 0;
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.setColor("black");
      if (p) {
        var pts = curve.points,
            mx = min(pts[0].x, pts[1].x),
            my = min(pts[0].y, pts[1].y),
            Mx = max(pts[0].x, pts[1].x),
            My = max(pts[0].y, pts[1].y);
        if (mx <= p.x && my <= p.y && Mx >= p.x && My >= p.y) {
          api.setColor("#00FF00");
          mark++;
        }
      }
      api.drawCurve(curve);
    });

    if (p) {
      api.setColor(mark < 2 ? "red" : "#00FF00");
      api.drawCircle(p, 3);
    }
  },

  setupQuadratic: function(api) {
    var curve1 = api.getDefaultQuadratic();
    var curve2 = new api.Bezier([15,250,220,20]);
    api.setCurve(curve1, curve2);
  },

  setupCubic: function(api) {
    var curve1 = new api.Bezier([100,240, 30,60, 210,230, 160,30]);
    var curve2 = new api.Bezier([25,260, 230,20]);
    api.setCurve(curve1, curve2);
  },

  draw: function(api, curves) {
    api.reset();
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.drawCurve(curve);
    });

    var utils = api.utils;
    var line = { p1: curves[1].points[0], p2: curves[1].points[1] };
    var acpts = utils.align(curves[0].points, line);
    var nB = new api.Bezier(acpts);
    var roots = utils.roots(nB.points);
    roots.forEach(t => {
      var p = curves[0].get(t);
      api.drawCircle(p, 3);
      api.text("t = " + t, {x: p.x + 5, y: p.y + 10});
    });
  }
};
 }())
  },
  "curveintersection": {
    handler: (function() { var abs = Math.abs;

return {
  setup: function(api) {
    this.api = api;
    api.setPanelCount(3);
    var curve1 = new api.Bezier(10,100,90,30,40,140,220,220);
    var curve2 = new api.Bezier(5,150,180,20,80,250,210,190);
    api.setCurve(curve1, curve2);
    this.pairReset();
  },

  pairReset: function() {
    this.prevstep = 0;
    this.step = 0;
  },

  draw: function(api, curves) {
    api.reset();
    var offset = {x:0, y:0};
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.drawCurve(curve);
    });

    // next panel: iterations
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    offset.x += w;
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    if (this.step === 0) {
      this.pairs = [{c1: curves[0], c2: curves[1]}];
    }

    if(this.step !== this.prevstep) {
      var pairs = this.pairs;
      this.pairs = [];
      this.finals = [];
      pairs.forEach(p => {

        if(p.c1.length() < 0.6 && p.c2.length() < 0.6) {
          return this.finals.push(p);
        }

        var s1 = p.c1.split(0.5);
        api.setColor("black");
        api.drawCurve(p.c1, offset);
        api.setColor("red");
        api.drawbbox(s1.left.bbox(), offset);
        api.drawbbox(s1.right.bbox(), offset);

        var s2 = p.c2.split(0.5);
        api.setColor("black");
        api.drawCurve(p.c2, offset);
        api.setColor("blue");
        api.drawbbox(s2.left.bbox(), offset);
        api.drawbbox(s2.right.bbox(), offset);

        if (s1.left.overlaps(s2.left)) { this.pairs.push({c1: s1.left, c2: s2.left}); }
        if (s1.left.overlaps(s2.right)) { this.pairs.push({c1: s1.left, c2: s2.right}); }
        if (s1.right.overlaps(s2.left)) { this.pairs.push({c1: s1.right, c2: s2.left}); }
        if (s1.right.overlaps(s2.right)) { this.pairs.push({c1: s1.right, c2: s2.right}); }
      });
      this.prevstep = this.step;
    } else {
      this.pairs.forEach(p => {
        api.setColor("black");
        api.drawCurve(p.c1, offset);
        api.drawCurve(p.c2, offset);
        api.setColor("red");
        api.drawbbox(p.c1.bbox(), offset);
        api.setColor("blue");
        api.drawbbox(p.c2.bbox(), offset);
      });
    }

    if (this.pairs.length === 0) {
      this.pairReset();
      this.draw(api, curves);
    }

    // next panel: results
    offset.x += w;
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    // get intersections as coordinates
    var results = curves[0].intersects(curves[1]).map(s => {
      var tvals = s.split('/').map(v => parseFloat(v));
      return {t1: tvals[0], t2: tvals[1]};
    });

    // filter out likely duplicates
    var curr = results[0], _, i, same = ((a,b) => abs(a.t1-b.t1) < 0.01 && abs(a.t2-b.t2) < 0.01);
    for(i=1; i<results.length; i++) {
      _ = results[i];
      if (same(curr, _)) {
        results.splice(i--,1);
      } else { curr = _; }
    }

    api.setColor("lightblue");
    api.drawCurve(curves[0], offset);
    api.drawCurve(curves[1], offset);

    api.setColor("blue");
    results.forEach(tvals => {
      api.drawCircle(curves[0].get(tvals.t1), 3, offset);
    });
  },

  stepUp: function() {
    this.step++;
    this.api.redraw();
  }
};
 }())
  },
  "abc": {
    handler: (function() { return {

  // ============== first sketch set =====================

  /**
   * The entry point for the quadratic curve example
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[0].y -= 10;
    api.setCurve(curve);
  },

  /**
   * The entry point for the cubic curve example
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  /**
   * When someone clicks a graphic, find the associated
   * on-curve t value and redraw with that new knowledge.
   */
  onClick: function(evt, api) {
    api.t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (api.t < 0.05 || api.t > 0.95) api.t = false;
    api.redraw();
  },

  /**
   * The master draw function for the "projection" sketches
   */
  draw: function(api, curve) {
    // draw the basic curve and curve control points
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.setColor("black");
    if (!api.t) return;

    // draw the user-clicked on-curve point
    api.drawCircle(api.curve.get(api.t),3);
    api.setColor("lightgrey");

    var utils = api.utils;

    // find the A/B/C values as described in the section text
    var hull = api.drawHull(curve, api.t);
    var A, B, C;
    if(hull.length === 6) {
      A = curve.points[1];
      B = hull[5];
      C = utils.lli4(A, B, curve.points[0], curve.points[2]);
      api.setColor("lightgrey");
      api.drawLine(curve.points[0], curve.points[2]);
    } else if(hull.length === 10) {
      A = hull[5];
      B = hull[9];
      C = utils.lli4(A, B, curve.points[0], curve.points[3]);
      api.setColor("lightgrey");
      api.drawLine(curve.points[0], curve.points[3]);
    }

    // show the lines between the A/B/C values
    api.setColor("#00FF00");
    api.drawLine(A,B);
    api.setColor("red");
    api.drawLine(B,C);
    api.setColor("black");
    api.drawCircle(C,3);

    // with their associated labels
    api.setFill("black");
    api.text("A", {x:10 + A.x, y: A.y});
    api.text("B (t = " + api.utils.round(api.t,2) + ")", {x:10 + B.x, y: B.y});
    api.text("C", {x:10 + C.x, y: C.y});

    // and show the distance ratio, which we see does not change irrespective of whether A/B/C change.
    var d1 = utils.dist(A, B);
    var d2 = utils.dist(B, C);
    var ratio = d1/d2;
    var h = api.getPanelHeight();
    api.text("d1 (A-B): " + utils.round(d1,2) + ", d2 (B-C): "+ utils.round(d2,2) + ", ratio (d1/d2): " + utils.round(ratio,4), {x:10, y:h-7});
  },

  // ============== second sketch set =====================

  /**
   * on mouse move, fix the t value for drawing based on the
   * cursor position over the sketch. All the way on the left
   * is t=0, all the way on the right is t=1, with a linear
   * interpolation for anything in between.
   */
  setCT: function(evt,api) {
    api.t = evt.offsetX / api.getPanelWidth();
  },

  /**
   * Draw the quadratic C(t) values
   */
  drawQCT: function(api) {
    api.u = api.u || function(t) {
      var top = (t-1) * (t-1),
          bottom = 2*t*t - 2*t + 1;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  /**
   * Draw the cubic C(t) values
   */
  drawCCT: function(api) {
    api.u = api.u || function(t) {
      var top = (1-t) * (1-t) * (1-t),
          bottom = t*t*t + top;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  /**
   * Draw a C(t) curve
   */
  drawCTgraph: function(api) {
    api.reset();
    var w = api.getPanelWidth();
    var pad = 20;
    var fwh = w - 2*pad;

    // draw some axes
    api.setColor("black");
    api.drawAxes(pad, "t",0,1, "u",0,1);

    // draw the C(t) function using an
    // indirection function that takes a
    // t value and spits out the C(t) value
    // as a point coordinate.
    api.setColor("blue");
    var uPoint = function(t) {
      var value = api.u(t),
          res = { x: pad + t*fwh, y: pad + value*fwh };
      return res;
    };
    api.drawFunction(uPoint);

    // if the cursor is (or was ever) over this
    // graphic, draw the "crosshair" that pinpoints
    // where in the function the associated t/C(t)
    // coordinate is.
    if (api.t) {
      var v = api.u(api.t),
          v1 = api.utils.round(v,3),
          v2 = api.utils.round(1-v,3),
          up = uPoint(api.t);
      api.drawLine({x:up.x,y:pad}, up);
      api.drawLine({x:pad,y:up.y}, up);
      api.drawCircle(up,3);

      // with some handy text that shows the actual computed values
      api.setFill("blue");
      api.text("    t = " + api.utils.round(api.t,3), {x:up.x+10, y:up.y-7});
      api.text("u(t) = " + api.utils.round(v,3), {x:up.x+10, y:up.y+7});
      api.setFill("black");
      api.text("C = "+v1+" * start + "+v2+" * end", {x:w/2 - pad, y:pad+fwh});
    }
  }
};
 }())
  },
  "moulding": {
    handler: (function() { var abs = Math.abs;

return {
  setupQuadratic: function(api) {
    api.setPanelCount(3);
    var curve = api.getDefaultQuadratic();
    curve.points[2].x -= 30;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    api.setPanelCount(3);
    var curve = new api.Bezier([100,230, 30,160, 200,50, 210,160]);
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  saveCurve: function(evt, api) {
    if (!api.t) return;
    if (!api.newcurve) return;
    api.setCurve(api.newcurve);
    api.t = false;
    api.redraw();
  },

  findTValue: function(evt, api) {
    var t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (t < 0.05 || t > 0.95) return false;
    return t;
  },

  markQB: function(evt, api) {
    api.t = this.findTValue(evt, api);
    if(api.t) {
      var t = api.t,
          t2 = 2*t,
          top = t2*t - t2,
          bottom = top + 1,
          ratio = abs(top/bottom),
          curve = api.curve,
          A = api.A = curve.points[1],
          B = api.B = curve.get(t);
      api.C = api.utils.lli4(A, B, curve.points[0], curve.points[2]);
      api.ratio = ratio;
      this.dragQB(evt, api);
    }
  },

  markCB: function(evt, api) {
    api.t = this.findTValue(evt, api);
    if(api.t) {
      var t = api.t,
          mt = (1-t),
          t3 = t*t*t,
          mt3 = mt*mt*mt,
          bottom = t3 + mt3,
          top = bottom - 1,
          ratio = abs(top/bottom),
          curve = api.curve,
          hull = curve.hull(t),
          A = api.A = hull[5],
          B = api.B = curve.get(t);
      api.db = curve.derivative(t);
      api.C = api.utils.lli4(A, B, curve.points[0], curve.points[3]);
      api.ratio = ratio;
      this.dragCB(evt, api);
    }
  },

  drag: function(evt, api) {
    if (!api.t) return;

    var newB = api.newB = {
      x: evt.offsetX,
      y: evt.offsetY
    };

    // now that we know A, B, C and the AB:BC ratio, we can compute the new A' based on the desired B'
    api.newA = {
      x: newB.x - (api.C.x - newB.x) / api.ratio,
      y: newB.y - (api.C.y - newB.y) / api.ratio
    };
  },

  dragQB: function(evt, api) {
    if (!api.t) return;
    this.drag(evt, api);
    api.update = [api.newA];
  },

  dragCB: function(evt, api) {
    if (!api.t) return;
    this.drag(evt,api);

    // preserve struts for B when repositioning
    var curve = api.curve,
        hull = curve.hull(api.t),
        B = api.B,
        Bl = hull[7],
        Br = hull[8],
        dbl = { x: Bl.x - B.x, y: Bl.y - B.y },
        dbr = { x: Br.x - B.x, y: Br.y - B.y },
        pts = curve.points,
        // find new point on s--c1
        p1 = {x: api.newB.x + dbl.x, y: api.newB.y + dbl.y},
        sc1 = {
          x: api.newA.x - (api.newA.x - p1.x)/(1-api.t),
          y: api.newA.y - (api.newA.y - p1.y)/(1-api.t)
        },
        // find new point on c2--e
        p2 = {x: api.newB.x + dbr.x, y: api.newB.y + dbr.y},
        sc2 = {
          x: api.newA.x + (p2.x - api.newA.x)/(api.t),
          y: api.newA.y + (p2.y - api.newA.y)/(api.t)
        },
        // construct new c1` based on the fact that s--sc1 is s--c1 * t
        nc1 = {
          x: pts[0].x + (sc1.x - pts[0].x)/(api.t),
          y: pts[0].y + (sc1.y - pts[0].y)/(api.t)
        },
        // construct new c2` based on the fact that e--sc2 is e--c2 * (1-t)
        nc2 = {
          x: pts[3].x - (pts[3].x - sc2.x)/(1-api.t),
          y: pts[3].y - (pts[3].y - sc2.y)/(1-api.t)
        };

    api.p1 = p1;
    api.p2 = p2;
    api.sc1 = sc1;
    api.sc2 = sc2;
    api.nc1 = nc1;
    api.nc2 = nc2;

    api.update = [nc1, nc2];
  },

  drawMould: function(api, curve) {
    api.reset();

    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = {x:w, y:0},
        round = api.utils.round;

    api.setColor("black");
    api.drawLine({x:0,y:0},{x:0,y:h}, offset);
    api.drawLine({x:w,y:0},{x:w,y:h}, offset);

    if (api.t && api.update) {
      api.drawCircle(curve.get(api.t),3);
      api.npts = [curve.points[0]].concat(api.update).concat([curve.points.slice(-1)[0]]);
      api.newcurve = new api.Bezier(api.npts);

      api.setColor("lightgrey");
      api.drawCurve(api.newcurve);
      var newhull = api.drawHull(api.newcurve, api.t, offset);
      api.drawLine(api.npts[0], api.npts.slice(-1)[0], offset);
      api.drawLine(api.newA, api.newB, offset);

      api.setColor("grey");
      api.drawCircle(api.newA, 3, offset);
      api.setColor("blue");
      api.drawCircle(api.B, 3, offset);
      api.drawCircle(api.C, 3, offset);
      api.drawCircle(api.newB, 3, offset);
      api.drawLine(api.B, api.C, offset);
      api.drawLine(api.newB, api.C, offset);

      api.setFill("black");
      api.text("A'", api.newA, {x:offset.x + 7, y:offset.y + 1});
      api.text("start", curve.get(0), {x:offset.x + 7, y:offset.y + 1});
      api.text("end", curve.get(1), {x:offset.x + 7, y:offset.y + 1});
      api.setFill("blue");
      api.text("B'", api.newB, {x:offset.x + 7, y:offset.y + 1});
      api.text("B, at t = "+round(api.t,2), api.B, {x:offset.x + 7, y:offset.y + 1});
      api.text("C", api.C, {x:offset.x + 7, y:offset.y + 1});

      if(curve.order === 3) {
        var hull = curve.hull(api.t);
        api.drawLine(hull[7], hull[8], offset);
        api.drawLine(newhull[7], newhull[8], offset);
        api.drawCircle(newhull[7], 3, offset);
        api.drawCircle(newhull[8], 3, offset);
        api.text("e1", newhull[7], {x:offset.x + 7, y:offset.y + 1});
        api.text("e2", newhull[8], {x:offset.x + 7, y:offset.y + 1});
      }

      offset.x += w;

      api.setColor("lightgrey");
      api.drawSkeleton(api.newcurve, offset);
      api.setColor("black");
      api.drawCurve(api.newcurve, offset);
    } else {
      offset.x += w;
      api.drawCurve(curve, offset);
    }
  }
};
 }())
  },
  "pointcurves": {
    handler: (function() { var abs = Math.abs;

return {
  setup: function(api) {
    api.lpts = [
      {x:56, y:153},
      {x:144,y:83},
      {x:188,y:185}
    ];
  },

  onClick: function(evt, api) {
    if (api.lpts.length==3) { api.lpts = []; }
    api.lpts.push({
      x: evt.offsetX,
      y: evt.offsetY
    });
    api.redraw();
  },

  getQRatio: function(t) {
    var t2 = 2*t,
        top = t2*t - t2,
        bottom = top + 1;
    return abs(top/bottom);
  },

  getCRatio: function(t) {
    var mt = (1-t),
        t3 = t*t*t,
        mt3 = mt*mt*mt,
        bottom = t3 + mt3,
        top = bottom - 1;
    return abs(top/bottom);
  },

  drawQuadratic: function(api, curve) {
    var labels = ["start","t=0.5","end"];

    api.reset();

    api.setColor("lightblue");
    api.drawGrid(10,10);

    api.setFill("black");
    api.setColor("black");
    api.lpts.forEach((p,i) => {
      api.drawCircle(p,3);
      api.text(labels[i], p, {x:5, y:2});
    });

    if(api.lpts.length === 3) {
      var S = api.lpts[0],
          E = api.lpts[2],
          B = api.lpts[1],
          C = {
            x: (S.x + E.x)/2,
            y: (S.y + E.y)/2
          };
      api.setColor("blue");
      api.drawLine(S, E);
      api.drawLine(B, C);
      api.drawCircle(C, 3);
      var ratio = this.getQRatio(0.5),
          A = {
            x: B.x + (B.x-C.x)/ratio,
            y: B.y + (B.y-C.y)/ratio
          };
      curve = new api.Bezier([S, A, E]);
      api.setColor("lightgrey");
      api.drawLine(A, B);
      api.drawLine(A, S);
      api.drawLine(A, E);
      api.setColor("black");
      api.drawCircle(A, 1);
      api.drawCurve(curve);
    }
  },

  drawCubic: function(api, curve) {
    var labels = ["start","t=0.5","end"];

    api.reset();

    api.setFill("black");
    api.setColor("black");
    api.lpts.forEach((p,i) => {
      api.drawCircle(p,3);
      api.text(labels[i], p, {x:5, y:2});
    });

    api.setColor("lightblue");
    api.drawGrid(10,10);

    if(api.lpts.length === 3) {
      var S = api.lpts[0],
          E = api.lpts[2],
          B = api.lpts[1],
          C = {
            x: (S.x + E.x)/2,
            y: (S.y + E.y)/2
          };

      api.setColor("blue");
      api.drawLine(S, E);
      api.drawLine(B, C);
      api.drawCircle(C, 1);

      var ratio = this.getCRatio(0.5),
          A = {
            x: B.x + (B.x-C.x)/ratio,
            y: B.y + (B.y-C.y)/ratio
          },
          selen = api.utils.dist(S,E),
          bclen_min = selen/8,
          bclen = api.utils.dist(B,C),
          aesthetics = 4,
          be12dist = bclen_min + bclen/aesthetics,
          bx = be12dist * (E.x-S.x)/selen,
          by = be12dist * (E.y-S.y)/selen,
          e1 = {
            x: B.x - bx,
            y: B.y - by
          },
          e2 = {
            x: B.x + bx,
            y: B.y + by
          },

          v1 = {
            x: A.x + (e1.x-A.x)*2,
            y: A.y + (e1.y-A.y)*2
          },
          v2 = {
            x: A.x + (e2.x-A.x)*2,
            y: A.y + (e2.y-A.y)*2
          },

          nc1 = {
            x: S.x + (v1.x-S.x)*2,
            y: S.y + (v1.y-S.y)*2
          },
          nc2 = {
            x: E.x + (v2.x-E.x)*2,
            y: E.y + (v2.y-E.y)*2
          };

      curve = new api.Bezier([S, nc1, nc2, E]);
      api.drawLine(e1, e2);
      api.setColor("lightgrey");
      api.drawLine(A, C);
      api.drawLine(A, v1);
      api.drawLine(A, v2);
      api.drawLine(S, nc1);
      api.drawLine(E, nc2);
      api.drawLine(nc1, nc2);
      api.setColor("black");
      api.drawCircle(A, 1);
      api.drawCircle(nc1, 1);
      api.drawCircle(nc2, 1);
      api.drawCurve(curve);
    }
  }
};
 }())
  },
  "curvefitting": {
    handler: (function() { var fit = require('../../../lib/curve-fitter.js');

return {
  setup: function(api) {
    this.api = api;
    this.reset();
  },

  reset: function() {
    this.points = [];
    this.curveset = false;
    this.mode = 0;
    if (this.api) {
      let api = this.api;
      api.setCurve(false);
      api.reset();
      api.redraw();
    }
  },

  toggle: function() {
    if (this.api) {
      this.customTimeValues = false;
      this.mode = (this.mode + 1) % fit.modes.length;
      this.fitCurve(this.api);
      this.api.redraw();
    }
  },

  draw: function(api, curve) {
    api.setPanelCount(1);
    api.reset();
    api.setColor('lightgrey');
    api.drawGrid(10,10);

    api.setColor('black');

    if (!this.curveset && this.points.length > 2) {
      curve = this.fitCurve(api);
    }

    if (curve) {
      api.drawCurve(curve);
      api.drawSkeleton(curve);
    }

    api.drawPoints(this.points);

    if (!this.customTimeValues) {
      api.setFill(0);
      api.text("using "+fit.modes[this.mode]+" t values", {x: 5, y: 10});
    }
  },

  processTimeUpdate(sliderid, timeValues) {
    var api = this.api;
    this.customTimeValues = true;
    this.fitCurve(api, timeValues);
    api.redraw();
  },

  fitCurve(api, timeValues) {
    let bestFitData = fit(this.points, timeValues || this.mode),
        x = bestFitData.C.x,
        y = bestFitData.C.y,
        bpoints = [];
    x.forEach((r,i) => {
      bpoints.push({
        x: r[0],
        y: y[i][0]
      });
    });
    var curve = new api.Bezier(bpoints);
    api.setCurve(curve);
    this.curveset = true;
    this.sliders.setOptions(bestFitData.S);
    return curve;
  },

  onClick: function(evt, api) {
    this.curveset = false;
    this.points.push({x: api.mx, y: api.my });
    api.redraw();
  }
};
 }())
  },
  "catmullmoulding": {
    handler: (function() { return {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  setup: function(api) {
    api.setPanelCount(3);
    api.lpts = [
      {x:56, y:153},
      {x:144,y:83},
      {x:188,y:185}
    ];
    api.distance = 0;
  },

  convert: function(p1, p2, p3, p4) {
    var t = 0.5;
    return [
      p2, {
        x: p2.x + (p3.x-p1.x)/(6*t),
        y: p2.y + (p3.y-p1.y)/(6*t)
      }, {
        x: p3.x - (p4.x-p2.x)/(6*t),
        y: p3.y - (p4.y-p2.y)/(6*t)
      }, p3
    ];
  },

  draw: function(api) {
    api.reset();
    api.setColor("lightblue");
    api.drawGrid(10,10);

    var pts = api.lpts;
    api.setColor("black");
    api.setFill("black");
    pts.forEach((p,pos) => {
      api.drawCircle(p, 3);
      api.text("point "+(pos+1), p, {x:10, y:7});
    });

    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var offset = {x:w, y:0};
    api.setColor("lightblue");
    api.drawGrid(10,10,offset);
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    pts.forEach((p,pos) => {
      api.drawCircle(p, 3, offset);
    });
    var p1 = pts[0], p2 = pts[1], p3 = pts[2];
    var dx = p3.x - p1.x,
        dy = p3.y - p1.y,
        m = Math.sqrt(dx*dx + dy*dy);
    dx /= m;
    dy /= m;
    api.drawLine(p1, p3, offset);

    var p0 = {
      x: p1.x + (p3.x - p2.x) - api.distance * dx,
      y: p1.y + (p3.y - p2.y) - api.distance * dy
    };
    var p4 = {
      x: p1.x + (p3.x - p2.x) + api.distance * dx,
      y: p1.y + (p3.y - p2.y) + api.distance * dy
    };
    var center = api.utils.lli4(p1,p3,p2,{
      x: (p0.x + p4.x)/2,
      y: (p0.y + p4.y)/2
    });
    api.setColor("blue");
    api.drawCircle(center, 3, offset);
    api.drawLine(pts[1],center, offset);
    api.setColor("#666");
    api.drawLine(center, p0, offset);
    api.drawLine(center, p4, offset);

    api.setFill("blue");
    api.text("p0", p0, {x:-20 + offset.x, y:offset.y + 2});
    api.text("p4", p4, {x:+10 + offset.x, y:offset.y + 2});

    // virtual point p0
    api.setColor("red");
    api.drawCircle(p0, 3, offset);
    api.drawLine(p2, p0, offset);
    api.drawLine(p1, {
      x: p1.x + (p2.x - p0.x)/5,
      y: p1.y + (p2.y - p0.y)/5
    }, offset);

    // virtual point p4
    api.setColor("#00FF00");
    api.drawCircle(p4, 3, offset);
    api.drawLine(p2, p4, offset);
    api.drawLine(p3, {
      x: p3.x + (p4.x - p2.x)/5,
      y: p3.y + (p4.y - p2.y)/5
    }, offset);

    // Catmull-Rom curve for p0-p1-p2-p3-p4
    var c1 = new api.Bezier(this.convert(p0,p1,p2,p3)),
        c2 = new api.Bezier(this.convert(p1,p2,p3,p4));
    api.setColor("lightgrey");
    api.drawCurve(c1, offset);
    api.drawCurve(c2, offset);


    offset.x += w;
    api.setColor("lightblue");
    api.drawGrid(10,10,offset);
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    api.drawCurve(c1, offset);
    api.drawCurve(c2, offset);
    api.drawPoints(c1.points, offset);
    api.drawPoints(c2.points, offset);
    api.setColor("lightgrey");
    api.drawLine(c1.points[0], c1.points[1], offset);
    api.drawLine(c1.points[2], c2.points[1], offset);
    api.drawLine(c2.points[2], c2.points[3], offset);
  }
};
 }()),
    withKeys: true
  },
  "polybezier": {
    handler: (function() { var atan2 = Math.atan2, sqrt = Math.sqrt, sin = Math.sin, cos = Math.cos;

return {
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
 }())
  },
  "shapes": {
    handler: (function() { var modes;

return {
  getInitialState: function() {
    modes = this.modes = ["unite","intersect","exclude","subtract"];
    return {
      mode: modes[0]
    };
  },

  setMode: function(mode) {
    this.setState({ mode: mode });
  },

  formPath: function(api, mx, my, w, h) {
    mx = mx || 0;
    my = my || 0;
    var unit  = 30;
    var unit2 = unit/2;
    w = w || 8 * unit;
    h = h || 4 * unit;
    var w2 = w/2;
    var h2 = h/2;
    var ow3 = w2/3;
    var oh3 = h2/3;

    var Paper = api.Paper;
    var Path = Paper.Path;
    var Point = Paper.Point;
    var path = new Path();

    path.moveTo(
      new Point(mx-w2 + unit*2, my-h2)
    );
    path.cubicCurveTo(
      new Point(mx-w2 + unit2, my-h2 + unit2),
      new Point(mx-w2 + unit2, my+h2 - unit2),
      new Point(mx-w2 + unit*2,  my+h2)
    );
    path.cubicCurveTo(
      new Point(mx-ow3,       my+oh3),
      new Point(mx+ow3,       my+oh3),
      new Point(mx+w2 - unit*2, my+h2)
    );
    path.cubicCurveTo(
      new Point(mx+w2 - unit2, my+h2 - unit2),
      new Point(mx+w2 - unit2, my-h2 + unit2),
      new Point(mx+w2 - unit*2,  my-h2)
    );
    path.cubicCurveTo(
      new Point(mx+ow3,       my-oh3),
      new Point(mx-ow3,       my-oh3),
      new Point(mx-w2 + unit*2, my-h2)
    );
    path.closePath(true);
    path.strokeColor = "rgb(100,100,255)";
    return path;
  },

  setup: function(api) {
    var dim = api.getPanelWidth();
    var pad = 40;
    var cx = dim/2;
    var cy = dim/2;
    api.c1 = this.formPath(api, cx, cy);
    cx += pad;
    cy += pad;
    api.c2 = this.formPath(api, cx, cy);
    this.state.mode = modes[0];
  },

  onMouseMove: function(evt, api) {
    var cx = evt.offsetX;
    var cy = evt.offsetY;
    api.c2.position = {x:cx, y:cy};
  },

  draw: function(api) {
    if (api.c3) { api.c3.remove(); }
    var c1 = api.c1,
        c2 = api.c2,
        fn = c1[this.state.mode].bind(c1),
        c3 = api.c3 = fn(c2);

    c3.strokeColor = "red";
    c3.fillColor = "rgba(255,100,100,0.4)";
    api.Paper.view.draw();
  }
};
 }())
  },
  "projections": {
    handler: (function() { return {
  setup: function(api) {
    api.setSize(320,320);
    var curve = new api.Bezier([
      {x:248,y:188},
      {x:218,y:294},
      {x:45,y:290},
      {x:12,y:236},
      {x:14,y:82},
      {x:186,y:177},
      {x:221,y:90},
      {x:18,y:156},
      {x:34,y:57},
      {x:198,y:18}
    ]);
    api.setCurve(curve);
    api._lut = curve.getLUT();
  },

  findClosest: function(LUT, p, dist) {
    var i,
        end = LUT.length,
        d,
        dd = dist(LUT[0],p),
        f = 0;
    for(i=1; i<end; i++) {
      d = dist(LUT[i],p);
      if(d<dd) {f = i;dd = d;}
    }
    return f/(end-1);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    if (api.mousePt) {
      api.setColor("red");
      api.setFill("red");
      api.drawCircle(api.mousePt, 3);
      // naive t value
      var t = this.findClosest(api._lut, api.mousePt, api.utils.dist);
      // no real point in refining for illustration purposes
      var p = curve.get(t);
      api.drawLine(p, api.mousePt);
      api.drawCircle(p, 3);
      api.text("t = "+api.utils.round(t,2), p, {x:10, y:3});
    }
  },

  onMouseMove: function(evt, api) {
    api.mousePt = {x: evt.offsetX, y: evt.offsetY };
    api._lut = api.curve.getLUT();
  }
};
 }())
  },
  "offsetting": {
    handler: (function() { return {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  setup: function(api, curve) {
    api.setCurve(curve);
    api.distance = 20;
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    this.setup(api, curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    this.setup(api, curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);

    var reduced = curve.reduce();
    reduced.forEach(c => {
      api.setRandomColor();
      api.drawCurve(c);
      api.drawCircle(c.points[0], 1);
    });
    var last = reduced.slice(-1)[0];
    api.drawPoint(last.points[3] || last.points[2]);

    api.setColor("red");
    var offset = curve.offset(api.distance);
    offset.forEach(c => {
      api.drawPoint(c.points[0]);
      api.drawCurve(c);
    });
    last = offset.slice(-1)[0];
    api.drawPoint(last.points[3] || last.points[2]);

    api.setColor("blue");
    offset = curve.offset(-api.distance);
    offset.forEach(c => {
      api.drawPoint(c.points[0]);
      api.drawCurve(c);
    });
    last = offset.slice(-1)[0];
    api.drawPoint(last.points[3] || last.points[2]);
  }
};
 }()),
    withKeys: true
  },
  "graduatedoffset": {
    handler: (function() { return {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  setup: function(api, curve) {
    api.setCurve(curve);
    api.distance = 20;
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    this.setup(api, curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    this.setup(api, curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);


    api.setColor("blue");
    var outline = curve.outline(0,0,api.distance,api.distance);
    outline.curves.forEach(c => api.drawCurve(c));
  }
};
 }()),
    withKeys: true
  },
  "circles": {
    handler: (function() { var sin = Math.sin,
    cos = Math.cos;

return {
  setup: function(api) {
    api.w = api.getPanelWidth();
    api.h = api.getPanelHeight();
    api.pad = 20;
    api.r = api.w/2 - api.pad;
    api.mousePt = false;
    api.angle = 0;
    var spt = { x: api.w-api.pad, y: api.h/2 };
    api.setCurve(new api.Bezier(spt, spt, spt));
  },

  draw: function(api, curve) {
    api.reset();
    api.setColor("lightgrey");
    api.drawGrid(1,1);
    api.setColor("red");
    api.drawCircle({x:api.w/2,y:api.h/2},api.r);
    api.setColor("transparent");
    api.setFill("rgba(100,255,100,0.4)");
    var p = {
      x: api.w/2,
      y: api.h/2,
      r: api.r,
      s: api.angle < 0 ? api.angle : 0,
      e: api.angle < 0 ? 0 : api.angle
    };
    api.drawArc(p);
    api.setColor("black");
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  onMouseMove: function(evt, api) {
    var x = evt.offsetX - api.w/2,
        y = evt.offsetY - api.h/2;
    var angle = Math.atan2(y,x);
    var pts = api.curve.points;
    // new control
    var r = api.r,
        b = (cos(angle) - 1) / sin(angle);
    pts[1] = {
      x: api.w/2 + r * (cos(angle) - b * sin(angle)),
      y: api.w/2 + r * (sin(angle) + b * cos(angle))
    };
    // new endpoint
    pts[2] = {
      x: api.w/2 + api.r * cos(angle),
      y: api.w/2 + api.r * sin(angle)
    };
    api.setCurve(new api.Bezier(pts));
    api.angle = angle;
  }
};
 }())
  },
  "circles_cubic": {
    handler: (function() { var sin = Math.sin, cos = Math.cos, tan = Math.tan;

return {
  setup: function(api) {
    api.setSize(400,400);
    api.w = api.getPanelWidth();
    api.h = api.getPanelHeight();
    api.pad = 80;
    api.r = api.w/2 - api.pad;
    api.mousePt = false;
    api.angle = 0;
    var spt = { x: api.w-api.pad, y: api.h/2 };
    api.setCurve(new api.Bezier(spt, spt, spt, spt));
  },

  guessCurve: function(S, B, E)  {
    var C = {
          x: (S.x + E.x)/2,
          y: (S.y + E.y)/2
        },
        A = {
          x: B.x + (B.x-C.x)/3, // cubic ratio at t=0.5 is 1/3
          y: B.y + (B.y-C.y)/3
        },
        bx = (E.x-S.x)/4,
        by = (E.y-S.y)/4,
        e1 = {
          x: B.x - bx,
          y: B.y - by
        },
        e2 = {
          x: B.x + bx,
          y: B.y + by
        },

        v1 = {
          x: A.x + (e1.x-A.x)*2,
          y: A.y + (e1.y-A.y)*2
        },
        v2 = {
          x: A.x + (e2.x-A.x)*2,
          y: A.y + (e2.y-A.y)*2
        },

        nc1 = {
          x: S.x + (v1.x-S.x)*2,
          y: S.y + (v1.y-S.y)*2
        },
        nc2 = {
          x: E.x + (v2.x-E.x)*2,
          y: E.y + (v2.y-E.y)*2
        };
    return [nc1, nc2];
  },

  draw: function(api, curve) {
    api.reset();

    api.setColor("lightgrey");
    api.drawGrid(1,1);
    api.setColor("rgba(255,0,0,0.4)");
    api.drawCircle({x:api.w/2,y:api.h/2},api.r);
    api.setColor("transparent");
    api.setFill("rgba(100,255,100,0.4)");
    var p = {
      x: api.w/2,
      y: api.h/2,
      r: api.r,
      s: api.angle < 0 ? api.angle : 0,
      e: api.angle < 0 ? 0 : api.angle
    };
    api.drawArc(p);

    // guessed curve
    var B = {
      x: api.w/2 + api.r * cos(api.angle/2),
      y: api.w/2 + api.r * sin(api.angle/2)
    };
    var S = curve.points[0],
        E = curve.points[3],
        nc = this.guessCurve(S,B,E);
    var guess = new api.Bezier([S, nc[0], nc[1], E]);
    api.setColor("rgb(140,140,255)");
    api.drawLine(guess.points[0], guess.points[1]);
    api.drawLine(guess.points[1], guess.points[2]);
    api.drawLine(guess.points[2], guess.points[3]);
    api.setColor("blue");
    api.drawCurve(guess);
    api.drawCircle(guess.points[1], 3);
    api.drawCircle(guess.points[2], 3);

    // real curve
    api.drawSkeleton(curve);
    api.setColor("black");
    api.drawLine(curve.points[1], curve.points[2]);
    api.drawCurve(curve);
  },

  onMouseMove: function(evt, api) {
    var x = evt.offsetX - api.w/2,
        y = evt.offsetY - api.h/2;
    if (x>api.w/2) return;

    var angle = Math.atan2(y,x);
    if (angle < 0) {
      angle = 2*Math.PI + angle;
    }
    var pts = api.curve.points;
    // new control 1
    var r = api.r,
        f = (4 * tan(angle/4)) /3;
    pts[1] = {
      x: api.w/2 + r,
      y: api.w/2 + r * f
    };
    // new control 2
    pts[2] = {
      x: api.w/2 + api.r * (cos(angle) + f*sin(angle)),
      y: api.w/2 + api.r * (sin(angle) - f*cos(angle))
    };
    // new endpoint
    pts[3] = {
      x: api.w/2 + api.r * cos(angle),
      y: api.w/2 + api.r * sin(angle)
    };
    api.setCurve(new api.Bezier(pts));
    api.angle = angle;
  },

  drawCircle: function(api) {
    api.setSize(325,325);
    api.reset();

    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        pad = 60,
        r = w/2 - pad,
        k = 0.55228,
        offset = {x: -pad/2, y:-pad/4};

    var curve = new api.Bezier([
      {x:w/2 + r,   y:h/2},
      {x:w/2 + r,   y:h/2 + k*r},
      {x:w/2 + k*r, y:h/2 + r},
      {x:w/2,       y:h/2 + r}
    ]);

    api.setColor("lightgrey");
    api.drawLine({x:0,y:h/2}, {x:w+pad,y:h/2}, offset);
    api.drawLine({x:w/2,y:0}, {x:w/2,y:h+pad}, offset);

    var pts = curve.points;

    api.setColor("red");
    api.drawPoint(pts[0], offset);
    api.drawPoint(pts[1], offset);
    api.drawPoint(pts[2], offset);
    api.drawPoint(pts[3], offset);
    api.drawCurve(curve, offset);
    api.setColor("rgb(255,160,160)");
    api.drawLine(pts[0],pts[1],offset);
    api.drawLine(pts[1],pts[2],offset);
    api.drawLine(pts[2],pts[3],offset);

    api.setFill("red");
    api.text((pts[0].x - w/2) + "," + (pts[0].y - h/2), {x: pts[0].x + 7, y: pts[0].y + 3}, offset);
    api.text((pts[1].x - w/2) + "," + (pts[1].y - h/2), {x: pts[1].x + 7, y: pts[1].y + 3}, offset);
    api.text((pts[2].x - w/2) + "," + (pts[2].y - h/2), {x: pts[2].x + 7, y: pts[2].y + 7}, offset);
    api.text((pts[3].x - w/2) + "," + (pts[3].y - h/2), {x: pts[3].x, y: pts[3].y + 13}, offset);

    pts.forEach(p => { p.x = -(p.x - w); });
    api.setColor("blue");
    api.drawCurve(curve, offset);
    api.drawLine(pts[2],pts[3],offset);
    api.drawPoint(pts[2],offset);
    api.setFill("blue");
    api.text("reflected", {x: pts[2].x - pad/2, y: pts[2].y + 13}, offset);
    api.setColor("rgb(200,200,255)");
    api.drawLine(pts[1],pts[0],offset);
    api.drawPoint(pts[1],offset);

    pts.forEach(p => { p.y = -(p.y - h); });
    api.setColor("green");
    api.drawCurve(curve, offset);

    pts.forEach(p => { p.x = -(p.x - w); });
    api.setColor("purple");
    api.drawCurve(curve, offset);
    api.drawLine(pts[1],pts[0],offset);
    api.drawPoint(pts[1],offset);
    api.setFill("purple");
    api.text("reflected", {x: pts[1].x + 10, y: pts[1].y + 3}, offset);
    api.setColor("rgb(200,200,255)");
    api.drawLine(pts[2],pts[3],offset);
    api.drawPoint(pts[2],offset);



    api.setColor("black");
    api.setFill("black");
    api.drawLine({x:w/2, y:h/2}, {x:w/2 + r -2, y:h/2}, offset);
    api.drawLine({x:w/2, y:h/2}, {x:w/2, y:h/2 + r -2}, offset);
    api.text("r = " + r, {x:w/2 + r/3, y:h/2 + 10}, offset);
  }
};
 }())
  },
  "arcapproximation": {
    handler: (function() { var atan2 = Math.atan2, PI = Math.PI, TAU = 2*PI, cos = Math.cos, sin = Math.sin;

return {
  // These are functions that can be called "From the page",
  // rather than being internal to the sketch. This is useful
  // for making on-page controls hook into the sketch code.
  statics: {
    keyHandlingOptions: {
      propName: "error",
      values: {
        "38": 0.1,  // up arrow
        "40": -0.1  // down arrow
      },
      controller: function(api) {
        if (api.error < 0.1) {
          api.error = 0.1;
        }
      }
    }
  },

  /**
   *  Setup up a skeleton curve that, when using its
   *  points for a B-spline, can form a circle.
   */
  setupCircle: function(api) {
    var curve = new api.Bezier(70,70, 140,40, 240,130);
    api.setCurve(curve);
  },

  /**
   * Set up the default quadratic curve.
   */
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  /**
   * Set up the default cubic curve.
   */
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.error = 0.5;
  },

  /**
   * Given three points, find the (only!) circle
   * that passes through all three points, based
   * on the fact that the perpendiculars of the
   * chords between the points all cross each
   * other at the center of that circle.
   */
  getCCenter: function(api, p1, p2, p3) {
    // deltas
    var dx1 = (p2.x - p1.x),
        dy1 = (p2.y - p1.y),
        dx2 = (p3.x - p2.x),
        dy2 = (p3.y - p2.y);

    // perpendiculars (quarter circle turned)
    var dx1p = dx1 * cos(PI/2) - dy1 * sin(PI/2),
        dy1p = dx1 * sin(PI/2) + dy1 * cos(PI/2),
        dx2p = dx2 * cos(PI/2) - dy2 * sin(PI/2),
        dy2p = dx2 * sin(PI/2) + dy2 * cos(PI/2);

    // chord midpoints
    var mx1 = (p1.x + p2.x)/2,
        my1 = (p1.y + p2.y)/2,
        mx2 = (p2.x + p3.x)/2,
        my2 = (p2.y + p3.y)/2;

    // midpoint offsets
    var mx1n = mx1 + dx1p,
        my1n = my1 + dy1p,
        mx2n = mx2 + dx2p,
        my2n = my2 + dy2p;

    // intersection of these lines:
    var i = api.utils.lli8(mx1,my1,mx1n,my1n, mx2,my2,mx2n,my2n);
    var r = api.utils.dist(i,p1);

    // arc start/end values, over mid point
    var s = atan2(p1.y - i.y, p1.x - i.x),
        m = atan2(p2.y - i.y, p2.x - i.x),
        e = atan2(p3.y - i.y, p3.x - i.x);

    // determine arc direction (cw/ccw correction)
    var __;
    if (s<e) {
      if (s>m || m>e) { s += TAU; }
      if (s>e) { __=e; e=s; s=__; }
    } else {
      if (e<m && m<s) { __=e; e=s; s=__; } else { e += TAU; }
    }

    // assign and done.
    i.s = s;
    i.e = e;
    i.r = r;
    return i;
  },

  /**
   * Draw the circle-computation sketch
   */
  drawCircle: function(api, curve) {
    api.reset();
    var pts = curve.points;

    // get center
    var C = this.getCCenter(api, pts[0], pts[1], pts[2]);
    // outer circle
    api.setColor("grey");
    api.drawCircle(C, api.utils.dist(C,pts[0]));

    // controllable points
    api.setColor("black");
    pts.forEach(p => api.drawCircle(p,3));

    // chords and perpendicular lines
    var m;

    api.setColor("blue");
    api.drawLine(pts[0], pts[1]);
    m = {x: (pts[0].x + pts[1].x)/2, y: (pts[0].y + pts[1].y)/2};
    api.drawLine(m, {x:C.x+(C.x-m.x), y:C.y+(C.y-m.y)});

    api.setColor("red");
    api.drawLine(pts[1], pts[2]);
    m = {x: (pts[1].x + pts[2].x)/2, y: (pts[1].y + pts[2].y)/2};
    api.drawLine(m, {x:C.x+(C.x-m.x), y:C.y+(C.y-m.y)});

    api.setColor("green");
    api.drawLine(pts[2], pts[0]);
    m = {x: (pts[2].x + pts[0].x)/2, y: (pts[2].y + pts[0].y)/2};
    api.drawLine(m, {x:C.x+(C.x-m.x), y:C.y+(C.y-m.y)});

    // center
    api.setColor("black");
    api.drawPoint(C);
    api.setFill("black");
    api.text("Intersection point", C, {x:-25, y:10});
  },

  /**
   * Draw a single arc being fit to a Bezier curve,
   * to show off the general application.
   */
  drawSingleArc: function(api, curve) {
    api.reset();
    var arcs = curve.arcs(api.error);
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var a = arcs[0];
    api.setColor("red");
    api.setFill("rgba(255,0,0,0.2)");
    api.debug = true;
    api.drawArc(a);

    api.setFill("black");
    api.text("Arc approximation with total error " + api.utils.round(api.error,1), {x:10, y:15});
  },

  /**
   * Draw an arc approximation for an entire Bezier curve.
   */
  drawArcs: function(api, curve) {
    api.reset();
    var arcs = curve.arcs(api.error);
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    arcs.forEach(a => {
      api.setRandomColor(0.3);
      api.setFill(api.getColor());
      api.drawArc(a);
    });

    api.setFill("black");
    api.text("Arc approximation with total error " + api.utils.round(api.error,1) + " per arc segment", {x:10, y:15});
  }
};
 }()),
    withKeys: true
  },
  "bsplines": {
    handler: (function() { return {
  basicSketch: require('./basic-sketch'),
  interpolationGraph: require('./interpolation-graph'),
  uniformBSpline: require('./uniform-bspline'),
  centerCutBSpline: require('./center-cut-bspline'),
  openUniformBSpline: require('./open-uniform-bspline'),
  rationalUniformBSpline: require('./rational-uniform-bspline'),

  bindKnots: function(owner, knots, ref) {
    this.refs[ref].bindKnots(owner, knots);
  },

  bindWeights: function(owner, weights, closed, ref) {
    this.refs[ref].bindWeights(owner, weights, closed);
  }
};
 }())
  },
  "comments": {
    handler: (function() { /**
 * We REALLY don't want disqus to load unless the user
 * is actually looking at the comments section, because it
 * tacks on 2.5+ MB in network transfers...
 */
return {
  componentDidMount() {
    if (typeof document === "undefined") {
      return this.silence();
    }
    this.heading = document.getElementById(this.props.page);
    document.addEventListener("scroll", this.scrollHandler, {passive:true});
  },

  scrollHandler(evt) {
    var bbox = this.heading.getBoundingClientRect();
    var top = bbox.top;
    var limit = window.innerHeight;
    if (top<limit) { this.loadDisqus(); }
  },

  loadDisqus() {
    var script = document.createElement("script");
    script.src = "lib/site/disqus.js";
    script.async = true;
    document.head.appendChild(script);
    this.silence();
    this.unlisten();
  },

  silence() {
    this.loadDisqus = () => {};
  },

  unlisten() {
    document.removeEventListener("scroll", this.scrollHandler);
  }
};
 }())
  }
};
