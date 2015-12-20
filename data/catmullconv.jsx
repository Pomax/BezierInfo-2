        <p>Taking an excursion to different splines, the other common design curve is the
          <a href="https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom
          spline</a>. Now, a Catmull-Rom spline is a form of cubic Hermite spline, and as it so happens
          the cubic Bézier curve is also a cubic Hermite spline, so maybe... maybe we can convert one
          into the other, and back, with some simple substitutions?</p>

        <p>Unlike Bézier curves, Catmull-Rom splines pass through each point used to define the curve,
          except the first and last, which makes sense if you read the "natural language" description
          for how a Catmull-Rom spline works: a Catmull-Rom spline is a curve that, at each point
           P<sub>x</sub>, has a tangent along the line P<sub>x-1</sub> to P<sub>x+1</sub>. The curve
           runs from points P<sub>2</sub> to  P<sub>n-1</sub>, and has a "tension" that determines
           how fast the curve passes through each point. The lower the tension, the faster the curve
           goes through each point, and the bigger its local tangent is.</p>

        <!-- interactive Catmull Rom curve example goes here -->

        <p>I'll be showing the conversion to and from Catmull-Rom curves for the tension that the
          Processing language uses for its Catmull-Rom algorithm.</p>

        <p>We start with showing the Catmull-Rom matrix form:</p>

        <p>\[
          CatmullRom(t) =
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 &  0 \\
           0 &  0 &  1 &  0 \\
          -3 &  3 & -2 & -1 \\
           2 & -2 &  1 &  1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          V_1 \\ V_2 \\ V'_1 \\ V'_2
          \end{bmatrix}
        \]
        </p>

        <p>However, there's something funny going on here: the coordinate column matrix looks weird.
          The reason is that Catmull-Rom curves are actually curve segments that are described by two
          points, and two tangents; the curve leaves a point V1 (if we have four coordinates instead,
          this is coordinate 2), arriving at a point V2 (coordinate 3), with the curve departing V1
          with a tangent vector V'1 (equal to the tangent from coordinate 1 to coordinate 3) and
          arriving at V2 with tangent vector V'2 (equal to the tangent from coordinate 2 to coordinate
          4). So if we want to express this as a matrix form based on four coordinates, we get this
          representation instead:</p>

        <p>\[
          \begin{bmatrix}
          V_1 \\ V_2 \\ V'_1 \\ V'_2
          \end{bmatrix}
          =
          T
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
          =
          \begin{bmatrix}
          P_2 \\ P_3 \\ \frac{P_3 - P_1}{2} \\ \frac{P_4 - P_2}{2}
          \end{bmatrix}
          \ \Rightarrow \
          T
          =
          \frac{1}{2}
          \cdot
          \begin{bmatrix}
           0 &  2 & 0 & 0 \\
           0 &  0 & 2 & 0 \\
          -1 &  0 & 1 & 0 \\
           0 & -1 & 0 & 1
          \end{bmatrix}
        \]</p>

        <div class="note">
          <h2>Where did that 2 come from?</h2>

          <p>Catmull-Rom splines are based on the concept of tension: the higher the tensions,
            the shorter the tangents at the departure and arrival points. The basic Catmull-Rom
            curve arrives and departs with tangents equal to half the distance between the two
            adjacent points, so that's where that 2 came from.</p>

          <p>However, the "real" matrix is this:</p>

          <p>\[
            T
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3 \\ P_4
            \end{bmatrix}
            =
            \begin{bmatrix}
            P_2 \\ P_3 \\ \frac{P_3 - P_1}{2 \cdot τ} \\ \frac{P_4 - P_2}{2 \cdot τ}
            \end{bmatrix}
            \Rightarrow \
            T
            =
            \frac{1}{2}
            \cdot
            \begin{bmatrix}
             0 &  2 & 0 & 0 \\
             0 &  0 & 2 & 0 \\
            -τ &  0 & τ & 0 \\
             0 & -τ & 0 & τ
            \end{bmatrix}
          \]</p>

          <p>This bakes in the tension factor τ explicitly.</p>
        </div>

        <p>Plugging this into the "two coordinates and two tangent vectors" matrix form,
          we get:</p>

        <p>\[
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 &  0 \\
           0 &  0 &  1 &  0 \\
          -3 &  3 & -2 & -1 \\
           2 & -2 &  1 &  1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          V_1 \\ V_2 \\ V'_1 \\ V'_2
          \end{bmatrix}
        \]</p>

        <p>\[
          =
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 &  0 \\
           0 &  0 &  1 &  0 \\
          -3 &  3 & -2 & -1 \\
           2 & -2 &  1 &  1
          \end{bmatrix}
          \cdot
          \left (
          \frac{1}{2}
          \cdot
          \begin{bmatrix}
           0 &  2 & 0 & 0 \\
           0 &  0 & 2 & 0 \\
          -τ &  0 & τ & 0 \\
           0 & -τ & 0 & τ
          \end{bmatrix}
          \right )
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
        \]</p>

       <p>\[
          =
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \frac{1}{2}
          \cdot
          \begin{bmatrix}
            0 &    2 &       0 &  0 \\
           -τ &    0 &       τ &  0 \\
           2τ &  τ-6 & -2(τ-3) & -τ \\
           -τ &  4-τ &     τ-4 &  τ
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
        \]</p>

        <p>So let's find out which transformation matrix we need in order to convert from Catmull-Rom to Bézier:</p>

        <p>\[
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \frac{1}{2}
          \cdot
          \begin{bmatrix}
            0 &    2 &       0 &  0 \\
           -τ &    0 &       τ &  0 \\
           2τ &  τ-6 & -2(τ-3) & -τ \\
           -τ &  4-τ &     τ-4 &  τ
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
          =
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          A
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
        \]</p>

        <p>The difference is somewhere in the actual hermite matrix, since the <em>t</em> and coordinate
          values are identical, so let's solve that matrix equasion:</p>

        <p>\[
          \frac{1}{2}
          \cdot
          \begin{bmatrix}
            0 &    2 &       0 &  0 \\
           -τ &    0 &       τ &  0 \\
           2τ &  τ-6 & -2(τ-3) & -τ \\
           -τ &  4-τ &     τ-4 &  τ
          \end{bmatrix}
          =
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          A
        \]</p>

        <p>We left-multiply both sides by the inverse of the Bézier matrix, to get rid of the
        Bézier matrix on the right side of the equals sign:</p>

        <p>\[
          {
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          }^{-1}
          \cdot
          \frac{1}{2}
          \cdot
          \begin{bmatrix}
            0 &    2 &       0 &  0 \\
           -τ &    0 &       τ &  0 \\
           2τ &  τ-6 & -2(τ-3) & -τ \\
           -τ &  4-τ &     τ-4 &  τ
          \end{bmatrix}
          =
          {
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          }^{-1}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          A
          \ =\
          I \cdot A
          \ =\
          A
        \]
        </p>

        <p>Which gives us:</p>

        <p>\[
          \frac{1}{6}
          \cdot
          \begin{bmatrix}
           0 & 6 & 0 &  0 \\
          -τ & 6 & τ &  0 \\
           0 & τ & 0 & -τ \\
           0 & 0 & 6 &  0
          \end{bmatrix}
          =
          A
        \]</p>

        <p>Multiplying this <strong><em>A</em></strong> with our coordinates
        will give us a proper Bézier matrix expression again:<p>

        <p>\[
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          \frac{1}{6}
          \cdot
          \begin{bmatrix}
           0 & 6 & 0 &  0 \\
          -τ & 6 & τ &  0 \\
           0 & τ & 0 & -τ \\
           0 & 0 & 6 &  0
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
        \]</p>

        <p>\[
          =
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_2 \\
          P_2 + \frac{P_3-P_1}{6 \cdot τ} \\
          P_3 - \frac{P_4-P_2}{6 \cdot τ} \\
          P_3
          \end{bmatrix}
        \]</p>

        <p>So a Catmull-Rom to Bézier conversion, based on coordinates, requires turning
          the Catmull-Rom coordinates on the left into the Bézier coordinates on the right
          (with τ being our tension factor):</p>

        <p>\[
          \begin{bmatrix}
          P_1 \\
          P_2 \\
          P_3 \\
          P_4
          \end{bmatrix}_{CatmullRom}
          \Rightarrow
          \begin{bmatrix}
          P_2 \\
          P_2 + \frac{P_3-P_1}{6 \cdot τ} \\
          P_3 - \frac{P_4-P_2}{6 \cdot τ} \\
          P_3
          \end{bmatrix}_{Bézier}
        \]</p>

        <p>And the other way around, a Bézier to Catmull-Rom conversion requires turning
        the Bézier coordinates on the left this time into the Catmull-Rom coordinates
        on the right. Note that there is no tension this time, because Bézier curves
        don't have any. Converting from Bézier to Catmull-Rom is simply a default-tension
        Catmull-Rom curve:</p>

        <p>\[
          \begin{bmatrix}
          P_1 \\
          P_2 \\
          P_3 \\
          P_4
          \end{bmatrix}_{Bézier}
          \Rightarrow
          \begin{bmatrix}
          P_4 + 6 \cdot (P_1 - P_2) \\
          P_1 \\
          P_4 \\
          P_1 + 6 \cdot (P_4 - P_3)
          \end{bmatrix}_{CatmullRom}
        \]</p>

        <p>Done. We can now draw the curves we want using either Bézier curves or Catmull-Rom
          splines, the choice mostly being which drawing algorithms we have natively available,
