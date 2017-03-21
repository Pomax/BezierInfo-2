var Reordering = {
  statics: {
    // Improve this based on http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/
    lower: function(curve) {
      var pts = curve.points, q=[], n = pts.length;
      pts.forEach((p,k) => {
        if (!k) { return (q[k] = p); }
        var f1 = k/n, f2 = 1 - f1;
        q[k] = {
          x: f1 * p.x + f2 * pts[k-1].x,
          y: f1 * p.y + f2 * pts[k-1].y
        };
      });
      q.splice(n-1,1);
      q[n-2] = pts[n-1];
      curve.points = q;
      return curve;
    },

    keyHandlingOptions: {
      values: {
        "38": function(api) {
          api.setCurve(api.curve.raise());
        },
        "40": function(api) {
          api.setCurve(Reordering.lower(api.curve));
        }
      }
    }
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
  }
};

module.exports = Reordering;
