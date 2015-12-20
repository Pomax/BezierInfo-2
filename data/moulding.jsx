        <p>De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split
        curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves
        based on three points and a tangent. Particularly this last thing is really useful because it lets us "mould" a curve,
        by picking it up at some point, and dragging that point around to change the curve's shape.</p>

        <p>How does that work? Succinctly: we run de Casteljau's algorithm in reverse!</p>

        <p>Let's start out with a pre-existing curve, defined by <i>start</i>, two control points, and <i>end</i>. We can
        mould this curve by picking a point somewhere on the curve, at some <i>t</i> value, and the moving it to a new
        location and reconstructing the curve that goes through <i>start</i>, our new point with the original tangent,
        and </i>end</i>. In order to see how and why we can do this, let's look at some identity information for Bézier
        curves. There's actually a hidden goldmine of identities that we can exploit when doing Bézier operations, and
        this will only scratch the surface. But, in a good way!</p>

        <p>In the following graphic, click anywhere on the curves to see the identity information that we'll
        be using to run de Casteljau in reverse:</p>

        <textarea class="sketch-code" data-sketch-preset="abc" data-sketch-title="Projections in a quadratic Bézier curve">
        void setupCurve() {
          setupDefaultQuadratic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();

          if(Bt != -1) {
            Point[] abc = curve.getABC(Bt);
            drawABC(curve, abc);
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="abc" data-sketch-title="Projections in a cubic Bézier curve">
        void setupCurve() {
          setupDefaultCubic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();

          if(Bt != -1) {
            Point[] abc = curve.getABC(Bt);
            drawABC(curve, abc);
          }
        }</textarea>

        <p>So, what exactly do we see in these graphics? First off, there's the three points <i>A</i>, <i>B</i> and
        <i>C</i>.</p>

        <p>Point <i>B</i> is our "on curve" point, A is the first "strut" point when running de Casteljau's
        algorithm in reverse; for quadratic curves, this happens to also be the curve's control point. For cubic
        curves, it's the "top of the triangle" for the struts that lead to point <i>B</i>. Point
        <i>C</i>, finally, is the intersection of the line that goes through <i>A</i> and <i>B</i> and the baseline,
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

        <div class="note">
          <p>In fact, because the distance ratio is a fixed value for each point <i>B</i>, which we get by picking
          some <i>t</i> value on our curve, the distance ratio is actually an identity function for Bézier curves.
          If we were to plot all the ratio values for all possible <i>t</i> values for quadratic and cubic curves,
          we'd see two very interesting functions: asymptotic at <i>t=0</i> and <i>t=1</i>, tending towards positive
          infinity, with a zero-derivative minimum at <i>t=0.5</i>.</p>

          <p>Since these are ratios, we can actually express the ratio values as a function of <i>t</i>. I actually
          failed at coming up with the precise functions, but thanks to some help from
          <a href="http://mathoverflow.net/questions/122257/finding-the-formula-for-Bézier-curve-ratios-hull-point-point-baseline">Boris
          Zbarsky</a> we can see that the ratio functions are actually remarkably simple:</p>

          <table style="width:100%; border:0"><tr><td>
            <p>Quadratic curves:\[
              ratio(t)_2 = \left | \frac{2t^2 - 2t}{2t^2 - 2t + 1} \right |
            \]</p>
          </td><td>
            <p>Cubic curves: \[
              ratio(t)_3 = \left | \frac{t^3 + (1-t)^3}{t^3 + (1-t)^3 - 1} \right |
            \]</p>
          </td></tr></table>

          <p>Unfortunately, this trick only works for quadratic and cubic curves. Once we hit higher order curves,
          things become a lot less predictable; the "fixed point <i>C</i>" is no longer fixed, moving around as we
          move the control points, and projections of <i>B</i> onto the line between start and end may actually
          lie on that line before the start, or after the end, and there are no simple ratios that we can exploit.</p>
        </div>

        <p>So, with this knowledge, let's change a curve's shape by click-dragging some part of it. The follow
        graphics let us click-drag somewhere on the curve, repositioning point <i>B</i> according to a simple
        rule: we keep the original point <i>B</i>'s tangent:</p>

        <textarea class="sketch-code" data-sketch-preset="moulding" data-sketch-title="Moulding a quadratic Bézier curve">
        void setupCurve() {
          setupDefaultQuadratic();
          mould();
          span();
          additionals();
        }

        void mouldCurve(BezierCurve curve, int mx, int my) {
          if(Bt != -1) {
            B = new Point(mx, my);
            BezierCurve newcurve = comp.generateCurve(curve.order, curve.points[0], B, curve.points[curve.order], Bt);
            curves.clear();
            curves.add(newcurve);
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="moulding" data-sketch-title="Moulding a cubic Bézier curve">
        void setupCurve() {
          setupDefaultCubic();
          mould();
          span();
          additionals();
        }

        void mouldCurve(BezierCurve curve, int mx, int my) {
          if(Bt != -1) {
            B = new Point(mx, my);
            BezierCurve newcurve = comp.generateCurve(curve.order, curve.points[0], B, curve.points[curve.order], Bt, tangents);
            curves.clear();
            curves.add(newcurve);
          }
        }</textarea>
