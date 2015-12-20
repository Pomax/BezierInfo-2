        <p>With our knowledge of bounding boxes, and curve alignment, We can now form the "tight" bounding box for
        curves. We first align  our curve, recording the translation we performed, "T", and the rotation angle we
        used, "R". We then determine the aligned curve's normal bounding box. Once we have that, we can map that
        bounding box back to our original curve by rotating it by -R, and then translating it by -T. We now have
        nice tight bounding boxes for our curves:</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Tight quadratic Bézier bounding box">
        void setupCurve() {
          setupDefaultQuadratic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();
          drawBoundingBox(curve.generateTightBoundingBox());
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Tight cubic Bézier bounding box">
        void setupCurve() {
          setupDefaultCubic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();
          drawBoundingBox(curve.generateTightBoundingBox());
        }</textarea>

        <p>These are, strictly speaking, not necessarily the tightest possible bounding boxes. It is possible to compute
        the optimal bounding box by determining which spanning lines we need to effect a minimal box area, but because
        of the parametric nature of Bézier curves this is actually a rather costly operation, and the gain in bounding
        precision is often not worth it. If there is high demand for it, I'll add a section on how to precisely compute
        the best fit bounding box, but the maths is fairly gruelling and just not really worth spending time on.</p>
