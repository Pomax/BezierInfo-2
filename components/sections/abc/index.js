var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var abs = Math.abs;

var ABC = React.createClass({
  getDefaultProps: function() {
    return {
      title: "The 'ABC' curve identity"
    };
  },

  onClick: function(evt, api) {
    api.t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (api.t < 0.05 || api.t > 0.95) api.t = false;
    api.redraw();
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[0].y -= 10;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var h = api.getPanelHeight();

    api.setColor("black");
    if (!!api.t) {
      api.drawCircle(api.curve.get(api.t),3);
      api.setColor("lightgrey");
      var hull = api.drawHull(curve, api.t);
      var utils = api.utils;

      var A, B, C;

      if(hull.length === 6) {
        A = curve.points[1];
        B = hull[5];
        C = utils.lli4(A, B, curve.points[0], curve.points[2]);
        api.setColor("lightgrey");
        api.drawLine(curve.points[0], curve.points[2]);
      } else if(hull.length === 10) {
        A = hull[5]
        B = hull[9];
        C = utils.lli4(A, B, curve.points[0], curve.points[3]);
        api.setColor("lightgrey");
        api.drawLine(curve.points[0], curve.points[3]);
      }

      api.setColor("#00FF00");
      api.drawLine(A,B);
      api.setColor("red");
      api.drawLine(B,C);
      api.setColor("black");
      api.drawCircle(C,3);

      api.setFill("black");
      api.text("A", {x:10 + A.x, y: A.y});
      api.text("B", {x:10 + B.x, y: B.y});
      api.text("C", {x:10 + C.x, y: C.y});

      var d1 = utils.dist(A, B);
      var d2 = utils.dist(B, C);
      var ratio = d1/d2;

      api.text("d1 (A-B): " + utils.round(d1,2) + ", d2 (B-C): "+ utils.round(d2,2) + ", ratio (d1/d2): " + utils.round(ratio,4), {x:10, y:h-7});
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split
        curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves
        based on three points and a tangent. Particularly this last thing is really useful because it lets us "mould" a curve,
        by picking it up at some point, and dragging that point around to change the curve's shape.</p>

        <p>How does that work? Succinctly: we run de Casteljau's algorithm in reverse!</p>

        <p>Let's start out with a pre-existing curve, defined by <i>start</i>, two control points, and <i>end</i>. We can
        mould this curve by picking a point somewhere on the curve, at some <i>t</i> value, and the moving it to a new
        location and reconstructing the curve that goes through <i>start</i>, our new point with the original tangent,
        and <i>end</i>. In order to see how and why we can do this, let's look at some identity information for Bézier
        curves. There's actually a hidden goldmine of identities that we can exploit when doing Bézier operations, and
        this will only scratch the surface. But, in a good way!</p>

        <p>In the following graphic, click anywhere on the curves to see the identity information that we'll
        be using to run de Casteljau in reverse (you can manipulate the curve even after picking a point.
        Note the "ratio" value when you do so: does it change?):</p>

        <div className="figure">
          <Graphic inline={true} preset="abc" title="Projections in a quadratic Bézier curve"
                   setup={this.setupQuadratic} draw={this.draw} onClick={this.onClick} />
          <Graphic inline={true} preset="abc" title="Projections in a cubic Bézier curve"
                   setup={this.setupCubic} draw={this.draw} onClick={this.onClick} />
        </div>

        <p>So, what exactly do we see in these graphics? First off, there's the three points <i>A</i>, <i>B</i> and <i>C</i>.</p>

        <p>Point <i>B</i> is our "on curve" point, A is the first "strut" point when running de Casteljau's
        algorithm in reverse; for quadratic curves, this happens to also be the curve's control point. For cubic
        curves, it's the "top of the triangle" for the struts that lead to point <i>B</i>. Point <i>C</i>, finally,
        is the intersection of the line that goes through <i>A</i> and <i>B</i> and the baseline,
        between our start and end points.</p>

        <p>There is some important identity information here: as long as we don't pick a new <i>t</i> coordinate,
        the location of point <i>C</i> on the line <i>start-end</i> represents a fixed ratio distance. We can drag
        around the control points as much as we like, that point won't move at all, and if we can drag around
        the start or end point, C will stay at the same ratio-value. For instance, if it was located midway between
        start and end, it'll stay midway between start and end, even if the line segment between start and end
        becomes longer or shorter.</p>

        <p>We can also see that the distances for the lines <i>d1 = A-B</i> and <i>d2 = B-C</i> may vary, but the
        ratio between them, <i>d1/d2</i>, is a constant value. We can drag any of the start, end, or control points
        around as much as we like, but that value also stays the same.</p>

        <div className="note">
          <p>In fact, because the distance ratio is a fixed value for each point <i>B</i>, which we get by picking
          some <i>t</i> value on our curve, the distance ratio is actually an identity function for Bézier curves.
          If we were to plot all the ratio values for all possible <i>t</i> values for quadratic and cubic curves,
          we'd see two very interesting functions: asymptotic at <i>t=0</i> and <i>t=1</i>, tending towards positive
          infinity, with a zero-derivative minimum at <i>t=0.5</i>.</p>

          <p>Since these are ratios, we can actually express the ratio values as a function of <i>t</i>. I actually
          failed at coming up with the precise functions, but thanks to some help from
          <a href="http://mathoverflow.net/questions/122257/finding-the-formula-for-Bézier-curve-ratios-hull-point-point-baseline">Boris
          Zbarsky</a> we can see that the ratio functions are actually remarkably simple:</p>

          <table style={{width:"100%", border:0}}>
            <tbody>
              <tr>
                <td>
                  <p>Quadratic curves:\[
                    ratio(t)_2 = \left | \frac{2t^2 - 2t}{2t^2 - 2t + 1} \right |
                  \]</p>
                </td><td>
                  <p>Cubic curves: \[
                    ratio(t)_3 = \left | \frac{t^3 + (1-t)^3 - 1}{t^3 + (1-t)^3} \right |
                  \]</p>
                </td>
              </tr>
            </tbody>
          </table>

          <p>Unfortunately, this trick only works for quadratic and cubic curves. Once we hit higher order curves,
          things become a lot less predictable; the "fixed point <i>C</i>" is no longer fixed, moving around as we
          move the control points, and projections of <i>B</i> onto the line between start and end may actually
          lie on that line before the start, or after the end, and there are no simple ratios that we can exploit.</p>
        </div>

      </section>
    );
  }
});

module.exports = ABC;

