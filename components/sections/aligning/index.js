var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Aligning = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Aligning curves"
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
            y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a)
          };
        };
    return points.map(d);
  },

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
  },


  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>While there are an incredible number of curves we can define by varying the x- and y-coordinates for
        the control points, not all curves are actually distinct. For instance, if we define a curve, and then
        rotate it 90 degrees, it's still the same curve, and we'll find its extremities in the same spots, just
        at different draw coordinates. As such, one way to make sure we're working with a "unique" curve is to
        "axis-align" it.</p>

        <p>Aligning also simplifies a curve's functions. We can translate (move) the curve so that the first
        point lies on (0,0), which turns our <i>n</i> term polynomial functions into <i>n-1</i> term functions.
        The order stays the same, but we have less terms. Then, we can rotate the curves so that the last point
        always lies on the x-axis, too, making its coordinate (...,0). This further simplifies the function for
        the y-component to an <i>n-2</i> term function. For instance, if we have a cubic curve such as this:</p>

        <p>\[
        \left \{ \begin{matrix}
          x = BLUE[120] \cdot (1-t)^3 BLUE[+ 35] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 220] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 220] \cdot t^3 \\
          y = BLUE[160] \cdot (1-t)^3 BLUE[+ 200] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 260] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 40] \cdot t^3
        \end{matrix} \right. \]</p>

        <p>Then translating it so that the first coordinate lies on (0,0), moving all <i>x</i> coordinates
        by -120, and all <i>y</i> coordinates by -160, gives us:</p>

        <p>\[
        \left \{ \begin{matrix}
          x = BLUE[0] \cdot (1-t)^3 BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 100] \cdot t^3 \\
          y = BLUE[0] \cdot (1-t)^3 BLUE[+ 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 120] \cdot t^3
        \end{matrix} \right. \]</p>

        <p>If we then rotate the curve so that its end point lies on the x-axis, the coordinates (integer-rounded
        for illustrative purposes here) become:</p>

        <p>\[
        \left \{ \begin{matrix}
          x = BLUE[0] \cdot (1-t)^3 BLUE[+ 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 12] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 156] \cdot t^3 \\
          y = BLUE[0] \cdot (1-t)^3 BLUE[+ 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 140] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 0] \cdot t^3
        \end{matrix} \right. \]</p>

        <p>If we drop all the zero-terms, this gives us:</p>

        <p>\[
        \left \{ \begin{array}{l}
          x = BLUE[85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 13] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 156] \cdot t^3 \\
          y = BLUE[40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 141] \cdot 3 \cdot (1-t) \cdot t^2
        \end{array} \right. \]</p>

        <p>We can see that our original curve definition has been simplified considerably. The following graphics
        illustrate the result of aligning our example curves to the x-axis, with the cubic case using
        the coordinates that were just used in the example formulae:</p>


        <Graphic preset="twopanel" title="Aligning a quadratic curve" setup={this.setupQuadratic} draw={this.draw} />
        <Graphic preset="twopanel" title="Aligning a cubic curve" setup={this.setupCubic} draw={this.draw} />


      </section>
    );
  }
});

module.exports = Aligning;
