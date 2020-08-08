var invert = require('../../../lib/matrix-invert.js');
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
      M[i] = (new Array(k - 1)).fill(0);
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

    if (!Mi) {
      console.error('MtM has no inverse?');
      return curve;
    }

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

module.exports = Reordering;
