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
      api.drawCircle(A, 3);
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
      api.drawCircle(C, 3);

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
        curves from any three points. However, unlike circle-fitting, which requires just three points,
        Bézier curve fitting requires three points, as well as a <i>t</i> value, so we can figure out
        where point 'C' needs to be.</p>

        <p>The following graphic lets you place three points, and will use the preceding sections on the
        ABC ratio and curve construction to form a quadratic curve through them. You can move the points
        you've placed around by click-dragging, or try a new curve by drawing new points with pure clicks.
        (There's some freedom here, so for illustrative purposes we clamped <i>t</i> to simply be
        0.5, lets us bypass some maths, since a <i>t</i> value of 0.5 always puts C in the middle of
        the start--end line segment)</p>

        <Graphic preset="generate" title="Fitting a quadratic Bézier curve" setup={this.setup} draw={this.drawQuadratic}
                 onClick={this.onClick} />

        <p>For cubic curves we also need some values to construct the "de Casteljau line through B" with,
        and that gives us quite a bit of choice. Since we've clamped <i>t</i> to 0.5, we'll set up a line
        through B parallel to the line start--end, with a length that is proportional to the length of the
        line B--C: the further away from the baseline B is, the wider its construction line will be, and so
        the more "bulby" the curve will look. This still gives us some freedom in terms of exactly how to
        scale the length of the construction line as we move B closer or further away from the baseline, so
        I simply picked some values that sort-of-kind-of look right in that if a circle through (start,B,end)
        forms a perfect hemisphere, the cubic curve constructed forms something close to a hemisphere, too,
        and if the points lie on a line, then the curve constructed has the control points very close to
        B, while still lying between B and the correct curve end point:</p>

        <Graphic preset="generate" title="Fitting a cubic Bézier curve" setup={this.setup} draw={this.drawCubic}
                 onClick={this.onClick} />

        <p>In each graphic, the blue parts are the values that we "just have" simply by setting up
        our three points, combined with our decision on which <i>t</i> value to use (and construction line
        orientation and length for cubic curves). There are of course many ways to determine a combination
        of <i>t</i> and tangent values that lead to a more "æsthetic" curve, but this will be left as an
        exercise to the reader, since there are many, and æsthetics are often quite personal.</p>
      </section>
    );
  }
});

module.exports = PointCurves;
