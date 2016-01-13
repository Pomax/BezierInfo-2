var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var Offsetting = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: "Curve offsetting"
    };
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
      api.drawCircle(c.points[0], 3);
    });
    var last = reduced.slice(-1)[0];
    api.drawCircle(last.points[3] || last.points[2],3);

    api.setColor("red");
    var offset = curve.offset(api.distance);
    offset.forEach(c => {
      api.drawCircle(c.points[0],1);
      api.drawCurve(c);
    });
    last = offset.slice(-1)[0];
    api.drawCircle(last.points[3] || last.points[2],1);

    api.setColor("blue");
    offset = curve.offset(-api.distance);
    offset.forEach(c => {
      api.drawCircle(c.points[0],1);
      api.drawCurve(c);
    });
    last = offset.slice(-1)[0];
    api.drawCircle(last.points[3] || last.points[2],1);
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Perhaps you are like me, and you've been writing various small programs that use Bézier curves in some way or another,
        and at some point you make the step to implementing path extrusion. But you don't want to do it pixel based, you want to
        stay in the vector world. You find that extruding lines is relatively easy, and tracing outlines is coming along nicely
        (although junction caps and fillets are a bit of a hassle), and then decide to do things properly and add Bézier curves
        to the mix. Now you have a problem.</p>

        <p>Unlike lines, you can't simply extrude a Bézier curve by taking a copy and moving it around, because of the curvatures;
        rather than a uniform thickness you get an extrusion that looks too thin in places, if you're lucky, but more likely will
        self-intersect. The trick, then, is to scale the curve, rather than simply copying it. But how do you scale a Bézier curve?</p>

        <p>Bottom line: <strong>you can't</strong>. So you cheat. We're not going to do true curve scaling, or rather curve
        offsetting, because that's impossible. Instead we're going to try to generate 'looks good enough' offset curves.</p>

        <div className="note">
          <h2>"What do you mean, you can't. Prove it."</h2>

          <p>First off, when I say "you can't" what I really mean is "you can't offset a Bézier curve with another
          Bézier curve". not even by using a really high order curve. You can find the function that describes the
          offset curve, but it won't be a polynomial, and as such it cannot be represented as a Bézier curve, which
          <strong>has</strong> to be a polynomial. Let's look at why this is:</p>

          <p>From a mathematical point of view, an offset curve <i>O(t)</i> is a curve such that, given our original curve
          <i>B(t)</i>, any point on <i>O(t)</i> is a fixed distance <i>d</i> away from coordinate <i>B(t)</i>.
          So let's math that:</p>

          <p>\[
            O(t) = B(t) + d
          \]</p>

          <p>However, we're working in 2D, and <i>d</i> is a single value, so we want to turn it into a vector. If we
          want a point distance <i>d</i> "away" from the curve <i>B(t)</i> then what we really mean is that we want
          a point at <i>d</i> times the "normal vector" from point <i>B(t)</i>, where the "normal" is a vector
          that runs perpendicular ("at a right angle") to the tangent at <i>B(t)</i>. Easy enough:</p>

          <p>\[
            O(t) = B(t) + d \cdot N(t)
          \]</p>

          <p>Now this still isn't very useful unless we know what the formula for <i>N(t)</i> is, so let's find out.
          <i>N(t)</i> runs perpendicular to the original curve tangent, and we know that the tangent is simply
          <i>B'(t)</i>, so we could just rotate that 90 degrees and be done with it. However, we need to ensure
          that <i>N(t)</i> has the same magnitude for every <i>t</i>, or the offset curve won't be at a uniform
          distance, thus not being an offset curve at all. The easiest way to guarantee this is to make sure
          <i>N(t)</i> always has length 1, which we can achieve by dividing <i>B'(t)</i> by its magnitude:</p>

          <p>\[
            N(t) \perp \left ( \frac{B'(t)}{\left || B'(t) \right || } \right )
          \]</p>

          <p>Determining the length requires computing an arc length, and this is where things get Tricky with
          a capital T. First off, to compute arc length from some start <i>a</i> to end <i>b</i>, we must use
          the formula we saw earlier. Noting that "length" is usually denoted with double vertical bars:</p>

          <p>\[
            \left || f(x,y) \right || = \int^b_a \sqrt{ f_x'^2 + f_y'^2}
          \]</p>

          <p>So if we want the length of the tangent, we plug in <i>B'(t)</i>, with <i>t = 0</i> as start and
          <i>t = 1</i> as end:</p>

          <p>\[
            \left || B'(t) \right || = \int^1_0 \sqrt{ B_x''(t)^2 + B_y''(t)^2}
          \]</p>

          <p>And that's where things go wrong. It doesn't even really matter what the second derivative for <i>B(t)</i>
          is, that square root is screwing everything up, because it turns our nice polynomials into things that are no
          longer polynomials.</p>

          <p>There is a small class of polynomials where the square root is also a polynomial, but
          they're utterly useless to us: any polynomial with unweighted binomial coefficients has a square root that is
          also a polynomial. Now, you might think that Bézier curves are just fine because they do, but they don't;
          remember that only the <strong>base</strong> function has binomial coefficients. That's before we factor
          in our coordinates, which turn it into a non-binomial polygon. The only way to make sure the functions
          stay binomial is to make all our coordinates have the same value. And that's not a curve, that's a point.
          We can already create offset curves for points, we call them circles, and they have much simpler functions
          than Bézier curves.</p>

          <p>So, since the tangent length isn't a polynomial, the normalised tangent won't be a polynomial either, which
          means <i>N(t)</i> won't be a polynomial, which means that <i>d</i> times <i>N(t)</i> won't be a polynomial,
          which means that, ultimately, <i>O(t)</i> won't be a polynomial, which means that even if we can determine the
          function for <i>O(t)</i> just fine (and that's far from trivial!), it simply cannot be represented as a
          Bézier curve.</p>

          <p>And that's one reason why Bézier curves are tricky: there are actually a <i>lot</i> of curves that
          cannot be represent as a Bézier curve at all. They can't even model their own offset curves. They're weird
          that way. So how do all those other programs do it? Well, much like we're about to do, they cheat. We're
          going to approximate an offset curve in a way that will look relatively close to what the real offset
          curve would look like, if we could compute it.</p>
        </div>

        <p>So, you cannot offset a Bézier curve perfectly with another Bézier curve, no matter how high-order you make
        that other Bézier curve. However, we can chop up a curve into "safe" sub-curves (where safe means that all the
        control points are always on a single side of the baseline, and the midpoint of the curve at <i>t=0.5</i> is
        roughly in the centre of the polygon defined by the curve coordinates) and then point-scale those sub-curves
        with respect to the curve's scaling origin (which is the intersection of the point normals at the start
        and end points).</p>

        <p>A good way to do this reduction is to first find the curve's extreme points, as explained in the earlier
        section on curve extremities, and use these as initial splitting points. After this initial split, we can
        check each individual segment to see if it's "safe enough" based on where the center of the curve is. If the
        on-curve point for <i>t=0.5</i> is too far off from the center, we simply split the segment down the middle.
        Generally this is more than enough to end up with safe segments.</p>

        <p>The following graphics show off curve offsetting, and you can use your up and down cursor keys to control
        the distance at which the curve gets offset. The curve first gets reduced to safe segments, each of which is
        then offset at the desired distance. Especially for simple curves, particularly easily set up for quadratic
        curves, no reduction is necessary, but the more twisty the curve gets, the more the curve needs to be reduced
        in order to get segments that can safely be scaled.</p>

        <Graphic preset="simple" title="Offsetting a quadratic Bézier curve" setup={this.setupQuadratic} draw={this.draw} onKeyDown={this.props.onKeyDown} />
        <Graphic preset="simple" title="Offsetting a cubic Bézier curve" setup={this.setupCubic} draw={this.draw} onKeyDown={this.props.onKeyDown} />

        <p>You may notice that this may still lead to small 'jumps' in the sub-curves when moving the
        curve around. This is caused by the fact that we're still performing a naive form of offsetting,
        moving the control points the same distance as the start and end points. If the curve is large
        enough, this may still lead to incorrect offsets.</p>

      </section>
    );
  }
});

module.exports = keyHandling(Offsetting);
