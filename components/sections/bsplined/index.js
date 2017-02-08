var React = require("react");
var SectionHeader = require("../../SectionHeader.jsx");
var BSplineGraphic = require("../../BSplineGraphic.jsx");

var BoundingBox = React.createClass({
  getDefaultProps: function() {
    return {
      title: "B-Spline derivatives"
    };
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>
          One last section specific to B-Splines: in order to apply the same procedures
          to B-Splines as we've looked at for BEzier curves, we'll need to know the first
          and second derivative. But... what is the derivative of a B-Spline?
        </p>

        <p>
          Thankfully, much like as was the case for Bezier curves, the derivative of a
          B-Spline is itself a (lower order) B-Spline. The following two functions specify
          the general B-Spline formula for a B-Spline of degree <em>d</em> with <em>n</em>
          points, and knot vector of length <em>d+n+1</em>, and its derivative:
        </p>

        <p>\[
          C(t) = \sum_{i=0}^n P_i \cdot N_{i,k}(t)
        \]</p>

        <p>\[
          C'(t) = \sum_{i=0}^{n-1} P_i \prime \cdot N_{i+1,k-1}(t)
        \]</p>

        <p>where</p>

        <p>\[
          P_i \prime = \frac{d}{knot_{i+d+1} - knot_{i+1}} (P_{i+1} - P_i)
        \]</p>

        <p>
          So, much as for Bezier derivatives, we see a derivative function that is simply
          a new interpolation function, with interpolated weights. With this information, we
          can do things like draw tangents and normals, as well as determine the curvature
          function, draw inflection points, and all those lovely things.
        </p>

        <p>
          As a concrete example, let's look at cubic (=degree 3) B-Spline with five coordinates,
          and with uniform knot vector of length 3 + 5 + 1 = 9:
        </p>

        <p>\[\begin{array}{l}
          d = 3, \\
          P = {(50,240), (185,30), (320,135), (455,25), (560,255)}, \\
          knots = {0,1,2,3,4,5,6,7,8}
        \end{array}\]</p>

        <BSplineGraphic sketch={require('./demonstrator')} />

        <p>
          Applying the above knowledge, we end up with a new B-Spline of degree <em>d-1</em>,
          with four points <em>P'</em>:
        </p>

        <p>\[\begin{array}{l}
          P_0 \prime = \frac{d}{knot_{i+d+1} - knot_{i+1}} (P_{i+1} - P_i)
           = \frac{3}{knot_{4} - knot_{1}} (P_1 - P_0)
           = \frac{3}{3} (P_1 - P_0)
           = (135, -210) \\
          P_1 \prime = \frac{d}{knot_{i+d+1} - knot_{i+1}} (P_{i+1} - P_i)
           = \frac{3}{knot_{5} - knot_{2}} (P_2 - P_1)
           = \frac{3}{3} (P_2 - P_1)
           = (135, 105) \\
          P_2 \prime = \frac{d}{knot_{i+d+1} - knot_{i+1}} (P_{i+1} - P_i)
           = \frac{3}{knot_{6} - knot_{3}} (P_3 - P_2)
           = \frac{3}{3} (P_3 - P_2)
           = (135, -110) \\
          P_3 \prime = \frac{d}{knot_{i+d+1} - knot_{i+1}} (P_{i+1} - P_i)
           = \frac{3}{knot_{7} - knot_{4}} (P_4 - P_3)
           = \frac{3}{3} (P_4 - P_3)
           = (105, 230) \\
        \end{array}\]</p>

        <p>
          So, we end up with a derivative that has as parameters:
        </p>

        <p>\[\begin{array}{l}
          d = 3, \\
          P = {(50,240), (185,30), (320,135), (455,25), (560,255)}, \\
          knots = {0,1,2,3,4,5,6,7,8}
        \end{array}\]</p>


        <BSplineGraphic sketch={require('./derived')} />

      </section>
    );
  }
});

module.exports = BoundingBox;
