var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var TightBounds = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Tight boxes"
    };
  },

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
    api.drawSkeleton(curve);
    api.drawCurve(curve);

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
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>With our knowledge of bounding boxes, and curve alignment, We can now form the "tight" bounding box for
        curves. We first align  our curve, recording the translation we performed, "T", and the rotation angle we
        used, "R". We then determine the aligned curve's normal bounding box. Once we have that, we can map that
        bounding box back to our original curve by rotating it by -R, and then translating it by -T. We now have
        nice tight bounding boxes for our curves:</p>

        <Graphic preset="twopanel" title="Aligning a quadratic curve" setup={this.setupQuadratic} draw={this.draw} />
        <Graphic preset="twopanel" title="Aligning a cubic curve" setup={this.setupCubic} draw={this.draw} />

        <p>These are, strictly speaking, not necessarily the tightest possible bounding boxes. It is possible to compute
        the optimal bounding box by determining which spanning lines we need to effect a minimal box area, but because
        of the parametric nature of Bézier curves this is actually a rather costly operation, and the gain in bounding
        precision is often not worth it. If there is high demand for it, I'll add a section on how to precisely compute
        the best fit bounding box, but the maths is fairly gruelling and just not really worth spending time on.</p>

      </section>
    );
  }
});

module.exports = TightBounds;
