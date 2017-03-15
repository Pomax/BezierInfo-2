var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "pointcurves";

var abs = Math.abs;

var PointCurves = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

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
  },

  render: function() {
    return locale.getContent(page, this);
  }
});

module.exports = PointCurves;
