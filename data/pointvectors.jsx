        <p>If you want to move objects along a curve, or "away from" a curve, the two vectors you're most interested
        in are the tangent vector and normal vector for curve points. These are actually really easy to find. For
        moving, and orienting, along a curve we use the tangent, which indicates the direction travel at specific
        points, and is literally just the first derivative of our curve:</p>

        <p>\[
        \left \{ \begin{matrix}
          tangent_x(t) = B'_x(t) \\
          tangent_y(t) = B'_y(t)
        \end{matrix} \right. \]</p>

        <p>This gives us the directional vector we want. We can normalize it to give us uniform directional vectors
        (having a length of 1.0) at each point, and then do whatever it is we want to do based on those directions:</p>

        <p>\[
          d = || tangent(t) || = \sqrt{B'_x(t)^2 + B'_y(t)^2}
        \]</p>

        <p>\[
        \left \{ \begin{matrix}
          \hat{x}(t) = || tangent_x(t) ||
                     =\frac{tangent_x(t)}{ || tangent(t) || }
                     = \frac{B'_x(t)}{d} \\
          \hat{y}(t) = || tangent_y(t) ||
                     = \frac{tangent_y(t)}{ || tangent(t) || }
                     = \frac{B'_y(t)}{d}
        \end{matrix} \right. \]</p>

        <p>The tangent is very useful for moving along a line, but what if we want to move away from the curve instead,
        perpendicular to the curve at some point <i>t</i>? In that case we want the "normal" vector. This vector runs
        at a right angle to the direction of the curve, and is typically of length 1.0, so all we have to do is rotate
        the normalized directional vector and we're done:</p>

        <p>\[
        \left \{ \begin{array}{l}
          normal_x(t) = \hat{x}(t) \cdot \cos{\frac{\pi}{2}} - \hat{y}(t) \cdot \sin{\frac{\pi}{2}} = - \hat{y}(t) \\
          normal_y(t) = \underset{quarter\ circle\ rotation} {\underbrace{ \hat{x}(t) \cdot \sin{\frac{\pi}{2}} + \hat{y}(t) \cdot \cos{\frac{\pi}{2}} }} = \hat{x}(t)
        \end{array} \right. \]</p>

        <div class="note">
          <p>Rotating coordinates is actually very easy, if you know the rule for it. You might find
          it explained as "applying a <a href="https://en.wikipedia.org/wiki/Rotation_matrix">rotation matrix</a>",
          which is what we'll look at here, too. Essentially, the idea is to take the circles over
          which we can rotate, and simply "sliding the coordinates" over those circles by the desired
          angle. If we want a quarter circle turn, we take the coordinate, slide it along the cirle
          by a quarter turn, and done.</p>

          <p>To turn any point <i>(x,y)</i> into a rotated point <i>(x',y')</i> (over 0,0) by
          some angle φ, we apply this nicely easy computation:</p>

          <p>\[\begin{array}{l}
            x' = x \cdot \cos(\phi) - y \cdot \sin(\phi) \\
            y' = x \cdot \sin(\phi) + y \cdot \cos(\phi)
          \end{array}\]</p>

          <p>Which is the "long" version of the following matrix transformation:</p>

          <p>\[
            \begin{bmatrix}
              x' \\ y'
            \end{bmatrix}
            =
            \begin{bmatrix}
             \cos(\phi) & -\sin(\phi) \\
             \sin(\phi) & \cos(\phi)
            \end{bmatrix}
            \begin{bmatrix}
              x \\ y
            \end{bmatrix}
          \]</p>

          <p>And that's all we need to rotate any coordinate. Note that for quarter, half
          and three quarter turns these functions become even easier, since <i>sin</i> and
          <i>cos</i> for these angles are, respectively: 0 and 1, -1 and 0, and 0 and -1.</p>

          <p>But <strong><em>why</em></strong> does this work? Why this matrix multiplication?
          <a href="http://en.wikipedia.org/wiki/Rotation_matrix#Decomposition_into_shears">wikipedia</a>
          (Technically, Thomas Herter and Klaus Lott) tells us that a rotation matrix can be
          treated as a sequence of three (elementary) shear operations. When we combine this into
          a single matrix operation (because all matrix multiplications can be collapsed), we get
          the matrix that you see above.
          <a href="http://datagenetics.com/blog/august32013/index.html">DataGenetics</a> have an
          excellent article about this very thing: it's really quite cool, and I strongly recommend
          taking a quick break from this primer to read that article.</p>
        </div>

        <p>The following two graphics show the tangent and normal along a quadratic and cubic curve, with
        the direction vector coloured blue, and the normal vector coloured red.</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Quadratic Bézier tangents and normals">
        void setupCurve() {
          setupDefaultQuadratic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw(color(0,40));
          float t, d = 15;
          Point p, tg, n;
          for(int i=0; i<=10; i++) {
            t = i/10.0;
            p = curve.getPoint(t);
            tg = curve.getDerivativePoint(t).normalize();
            n = curve.getNormal(t);
            stroke(0,0,255);
            line(p.x, p.y, p.x+d*tg.x, p.y+d*tg.y);
            stroke(200,0,0);
            line(p.x, p.y, p.x+d*n.x, p.y+d*n.y);
            stroke(0);
            ellipse(p.x, p.y, 5, 5);
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Cubic Bézier tangents and normals">
        void setupCurve() {
          setupDefaultCubic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw(color(0,40));
          float t, d = 15;
          Point p, tg, n;
          for(int i=0; i<=10; i++) {
            t = i/10.0;
            p = curve.getPoint(t);
            tg = curve.getDerivativePoint(t).normalize();
            n = curve.getNormal(t);
            stroke(0,0,255);
            line(p.x, p.y, p.x+d*tg.x, p.y+d*tg.y);
            stroke(200,0,0);
            line(p.x, p.y, p.x+d*n.x, p.y+d*n.y);
            stroke(0);
            ellipse(p.x, p.y, 5, 5);
          }
        }</textarea>