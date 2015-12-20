        <p>One of the first things people run into when they start using Bézier curves in their own programs is
        "I know how to draw the curve, but how do I determine the bounding box?". It's actually reasonably straight
        forward to do so, but it requires having some knowledge on exploiting math to get the values we need.
        For bounding boxes, we aren't actually interested in the curve itself, but only in its "extremities": the
        minimum and maximum values the curve has for its x- and y-axis values. If you remember your calculus
        (provided you ever took calculus, otherwise it's going to be hard to remember) we can determine function
        extremities using the first derivative of that function, but this poses a problem, since our function is
        parametric: every axis has its own function.</p>

        <p>The solution: compute the derivative for each axis separately, and then fit them back together in the same
        way we do for the original.</p>

        <p>Let's look at how a parametric Bézier curve "splits up" into two normal functions, one for the x-axis and
        one for the y-axis. Note the left-most figure is again an interactive curve, without labeled axes (you
        get coordinates in the graph instead).  The center and right-most figures are the component functions for
        computing the x-axis value, given a value for <i>t</i> (between 0 and 1 inclusive), and the y-axis value,
        respectively.</p>

        <p>If you move points in a curve sideways, you should only see the middle graph change; likely, moving
        points vertically should only show a change in the right graph.</p>

        <textarea class="sketch-code" data-sketch-preset="threepanel" data-sketch-title="Quadratic Bézier curve components">
        void setupCurve() {
          setupDefaultQuadratic();
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          noAdditionals();
          usePanelPadding();

          nextPanel();
          drawAxes("t",0,1, "x",0,panelDim);
          BezierCurve x_only = curve.justX(dim-2*pad);
          x_only.draw();

          nextPanel();
          drawAxes("t",0,1, "y",0,panelDim);
          BezierCurve y_only = curve.justY(dim-2*pad);
          y_only.draw();
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="threepanel" data-sketch-title="Cubic Bézier curve components">
        void setupCurve() {
          setupDefaultCubic();
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          noAdditionals();
          usePanelPadding();

          nextPanel();
          drawAxes("t",0,1, "x",0,panelDim);
          BezierCurve x_only = curve.justX(dim-2*pad);
          x_only.draw();

          nextPanel();
          drawAxes("t",0,1, "y",0,panelDim);
          BezierCurve y_only = curve.justY(dim-2*pad);
          y_only.draw();
        }</textarea>