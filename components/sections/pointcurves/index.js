var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var abs = Math.abs;

var PointCurves = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Creating a curve from three points"
    };
  },

  setup: function(api) {
    api.lpts = [];
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
        top = bottom - 1
    return abs(top/bottom);
  },

  drawQuadratic: function(api, curve) {
    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = {x:w, y:0},
        labels = ["start","t=0.5","end"];

    api.reset();

    api.setFill("black");
    api.lpts.forEach((p,i) => {
      api.drawCircle(p,3);
      api.text(labels[i], p, {x:5, y:2});
    });

    api.setColor("black");
    api.drawLine({x:0,y:0},{x:0,y:h}, offset);
    api.drawLine({x:w,y:0},{x:w,y:h}, offset);

    if(api.lpts.length === 3) {
      var S = api.lpts[0],
          E = api.lpts[2],
          B = api.lpts[1],
          C = {
            x: (S.x + E.x)/2,
            y: (S.y + E.y)/2,
          };
      api.setColor("blue");
      api.drawLine(S, E);
      api.drawLine(B, C);
      api.drawCircle(C, 3);
      var ratio = this.getQRatio(0.5),
          A = {
            x: B.x + (B.x-C.x)/ratio,
            y: B.y + (B.y-C.y)/ratio
          },
          curve = new api.Bezier([S, A, E]);
      api.setColor("lightgrey");
      api.drawLine(A, B);
      api.drawLine(A, S);
      api.drawLine(A, E);
      api.setColor("black");
      api.drawCircle(A, 3);
      api.drawCurve(curve);
    }
  },

  drawCubic: function(api, curve) {
    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = {x:w, y:0},
        labels = ["start","t=0.5","end"];

    api.reset();

    api.setFill("black");
    api.lpts.forEach((p,i) => {
      api.drawCircle(p,3);
      api.text(labels[i], p, {x:5, y:2});
    });

    api.setColor("black");
    api.drawLine({x:0,y:0},{x:0,y:h}, offset);
    api.drawLine({x:w,y:0},{x:w,y:h}, offset);

    if(api.lpts.length === 3) {
      var S = api.lpts[0],
          E = api.lpts[2],
          B = api.lpts[1],
          C = {
            x: (S.x + E.x)/2,
            y: (S.y + E.y)/2,
          };
      api.setColor("blue");
      api.drawLine(S, E);
      api.drawLine(B, C);
      api.drawCircle(C, 3);
      var ratio = this.getCRatio(0.5),
          A = {
            x: B.x + (B.x-C.x)/ratio,
            y: B.y + (B.y-C.y)/ratio
          },
          e1 = {
            x: B.x - (E.x-S.x)/4,
            y: B.y - (E.y-S.y)/4
          },
          e2 = {
            x: B.x + (E.x-S.x)/4,
            y: B.y + (E.y-S.y)/4
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
          },
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
      api.drawCircle(A, 3);
      api.drawCircle(nc1, 3);
      api.drawCircle(nc2, 3);
      api.drawCurve(curve);
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Given the preceding section on curve manipulation, we can also generate quadratic and cubic
        curves from any three points. However, unlike circle-fitting, which requires only three points,
        Bézier curve fitting requires three points, as well as a <i>t</i> value (so we can figure out
        where point 'C' needs to be) and in cade of quadratic curves, a tangent that lets us place
        those points 'e1' and 'e2' around our point 'B'.</p>

        <p>There's some freedom here, so for illustrative purposes we're going to pretend <i>t</i> is
        simply 0.5, which puts C in the middle of the start--end line segment, and then we'll also set
        the cubic curve's tangent to half the length of start--end, centered on B.</p>

        <p>Using these "default" values for curve creation, we can already get fairly respectable
        curves; Click three times on each of the following sketches to set up the points
        that should be used to form a quadratic and cubic curve, respectively:</p>

        <Graphic preset="generate" title="Fitting a quadratic Bézier curve" setup={this.setup} draw={this.drawQuadratic}
                 onClick={this.onClick} />
        <Graphic preset="generate" title="Fitting a cubic Bézier curve" setup={this.setup} draw={this.drawCubic}
                 onClick={this.onClick} />

        <p>In each graphic, the blue parts are the values that we "just have" simply by setting up
        our three points, and deciding on which <i>t</i>-value (and tangent, for cubic curves)
        we're working with. There are many ways to determine a combination of <i>t</i> and tangent
        values that lead to a more "aesthetic" curve, but this will be left as an exercise to the
        reader, since there are many, and aesthetics are often quite personal.</p>
      </section>
    );
  }
});

module.exports = PointCurves;
