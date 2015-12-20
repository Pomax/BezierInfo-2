        <p>How long is a Bézier curve? As it turns out, that's not actually an easy question, because the answer
        requires maths that —much like root finding— cannot generally be solved the traditional way. If we
        have a parametric curve with <i>f<sub>x</sub>(t)</i> and <i>f<sub>y</sub>(t)</i>, then the length of the
        curve, measured from start point to some point <i>t = z</i>, is computed using the following seemingly
        straight forward (if a bit overwhelming) formula:</p>

        <p>\[
          \int_{0}^{z}\sqrt{f_x'(t)^2+f_y'(t)^2} dt
        \]</p>

        <p>or, more commonly written using Leibnitz notation as:</p>

        <p>\[
          length = \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
        \]</p>

        <p>This formula says that the length of a parametric curve is in fact equal to the <b>area</b> underneath a function that
        looks a remarkable amount like Pythagoras' rule for computing the diagonal of a straight angled triangle. This sounds
        pretty simple, right? Sadly, it's far from simple... cutting straight to after the chase is over: for quadratic curves,
        this formula generates an <a href="http://www.wolframalpha.com/input/?i=antiderivative+for+sqrt((2*(1-t)*t*B+%2b+t^2*C)'^2+%2b+(2*(1-t)*t*E)'^2)&incParTime=true">unwieldy computation</a>,
        and we're simply not going to implement things that way. For cubic Bézier curves, things get even more fun, because there
        is no "closed form" solution, meaning that due to the way calculus works, there is no generic formula that allows you to
        calculate the arc length. Let me just repeat this, because it's fairly crucial: <strong><em>for cubic and higher Bézier curves,
        there is no way to solve this function if you want to use it "for all possible coordinates".</em></strong></p>

        <p>Seriously: <a href="https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem">It cannot be done.</a>.</p>

        <p>So we turn to numerical approaches again. The method we'll look at here is the
        <a href="http://www.youtube.com/watch?v=unWguclP-Ds&feature=BFa&list=PLC8FC40C714F5E60F&index=1">Gauss
        quadrature</a>. This approximation is a really neat trick, because for any <i>n<sup>th</sup></i> degree polynomial
        it finds approximated values for an integral really efficiently. Explaining this procedure in length is way beyond
        the scope of this page, so if you're interested in finding out why it works, I can recommend the University of
        South Florida video lecture on the procedure, linked in this very paragraph. The general solution we're looking
        for is the following:</p>

        <p>\[
          \int_{-1}^{1}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
          ≃
          \left [ C_1 \cdot f\left(t_1\right)
                 \ +\ ...
                 \ +\ C_n \cdot f\left(t_n\right)
          \right ]
          =
          \sum_{i=1}^{n}{C_i \cdot f\left(t_i\right)}
        \]</p>

        <p>In plain text: an integral function can always be treated as the sum of an (infinite) number of
        (infinitely thin) rectangular strips sitting "under" the function's plotted graph. To illustrate
        this idea, the following graph shows the integral for a sinoid function. If we pick thin enough
        strips, we'd get a "perfect" fit for all the strips from the midline to the actual function values:</p>

        <textarea class="sketch-code" data-sketch-preset="empty" data-sketch-title="A function's approximated integral">
        void drawFunction() {
          float x=0, y=dim/2, nx, ny;
          stroke(0);
          for(float t=0; t<=2*PI; t+=0.05) {
            nx = map(t,0,2*PI,0,dim);
            ny = map(sin(t), -1,1, pad,dim-pad);
            line(x,y,nx,ny);
            x=nx;y=ny;
          }
          stroke(255);
          fill(0,0,255,100);
          x=0;
          y=dim/2;
          for(float t=0; t<=2*PI+0.2; t+=0.2) {
            nx = map(t,0,2*PI,0,dim);
            ny = map(sin(t), -1,1, pad,dim-pad);
            rect(x-(nx-x)/2,dim/2,nx-x,y-(dim/2));
            x=nx;y=ny;
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="empty" data-sketch-title="A better approximation">
        void drawFunction() {
          float x=0, y=dim/2, nx, ny;
          stroke(0);
          for(float t=0; t<=2*PI; t+=0.05) {
            nx = map(t,0,2*PI,0,dim);
            ny = map(sin(t), -1,1, pad,dim-pad);
            line(x,y,nx,ny);
            x=nx;y=ny;
          }
          stroke(255);
          fill(0,0,255,100);
          x=0;
          y=dim/2;
          for(float t=0; t<=2*PI+0.1; t+=0.1) {
            nx = map(t,0,2*PI,0,dim);
            ny = map(sin(t), -1,1, pad,dim-pad);
            rect(x-(nx-x)/2,dim/2,nx-x,y-(dim/2));
            x=nx;y=ny;
          }
        }</textarea>

        <p>Now, infinitely many terms to sum and infinitely thin rectangles are not something that computers
        can work with, so instead we're going to approximate the infinite summation by using a sum of a finite
        number of "just thin" rectangular strips. As long as we use a high enough number of thin enough rectangular
        strips, this will give us an approximation that is pretty close to what the real value is.</p>

        <p>So, the trick is to come up with useful rectangular strips. A naive way is to simply create <i>n</i>
        strips, all with the same width, but there is a far better way using special values for <i>C</i> and
        <i>f(t)</i> depending on the value of <i>n</i>, which indicates how many strips we'll use.</p>

        <div class="note">

          <p>Note that one requirement for the approach we'll use is that the integral must run from -1 to 1. That's no good, because
          we're dealing with Bézier curves, and the length of a section of curve applies to values which run from 0 to "some
          value smaller than or equal to 1" (let's call that value <i>z</i>). Thankfully, we can quite easily transform any
          integral interval to any other integral interval, by shifting and scaling the inputs. Doing so, we get the
          following:</p>

          <p>\[\begin{array}{l}
            \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
            \\
            ≃ \
            \frac{z}{2} \cdot \left [ C_1 \cdot f\left(\frac{z}{2} \cdot t_1 + \frac{z}{2}\right)
                                      + ...
                                      + C_n \cdot f\left(\frac{z}{2} \cdot t_n + \frac{z}{2}\right)
                              \right ]
            \\
            = \
            \frac{z}{2} \cdot \sum_{i=1}^{n}{C_i \cdot f\left(\frac{z}{2} \cdot t_i + \frac{z}{2}\right)}
          \end{array}\]</p>

          <p>That may look a bit more complicated, but the fraction involving <i>z</i> is a fixed number,
          so the summation, and the evaluation of the <i>f(t)</i> values are still pretty simple.</p>

          <p>So, what do we need to perform this calculation? For one, we'll need an explicit formula for <i>f(t)</i>,
          because that derivative notation is handy on paper, but not when we have to implement it. We'll also
          need to know what these <i>C<sub>i</sub></i> and <i>t<sub>i</sub></i> values should be. Luckily, that's
          less work because there are actually many tables available that give these values, for any <i>n</i>,
          so if we want to approximate our integral with only two terms (which is a bit low, really) then
          <a href="legendre-gauss.html">these tables</a> would tell us that for <i>n=2</i> we must use the following values:</p>

          <p>\[\begin{array}{l}
          C_1 = 1 \\
          C_2 = 1 \\
          t_1 = - \frac{1}{\sqrt{3}} \\
          t_2 = + \frac{1}{\sqrt{3}}
          \end{array}\]</p>

          <p>Which means that in order for us to approximate the integral, we must plug these values into the approximate
          function, which gives us:</p>

          <p>\[

          \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
          ≃
          \frac{z}{2} \cdot \left [ f\left( \frac{z}{2} \cdot \frac{-1}{\sqrt{3}} + \frac{z}{2} \right)
                        + f\left( \frac{z}{2} \cdot \frac{1}{\sqrt{3}} + \frac{z}{2} \right)
                    \right ]
          \]</p>

          <p>We can program that pretty easily, provided we have that <i>f(t)</i> available, which we do,
          as we know the full description for the Bézier curve functions B<sub>x</sub>(t) and B<sub>y</sub>(t).</p>
        </div>

        <p>If we use the Legendre-Gauss values for our <i>C</i> values (thickness for each strip) and <i>t</i>
        values (location of each strip), we can determine the approximate length of a Bézier curve by computing the
        Legendre-Gauss sum. The following graphic shows a cubic curve, with its computed lengths; Go ahead and
        change the curve, to see how its length changes (the sketch allows curve order elevation and lowering,
        in case you want to try more complex, or simpler, curves), and use your "+" and "-" keys to change the number
        of intervals the Legendre-Gauss integral is approximated with (to a maximum of 23, with the sketch always
        telling you the result of a 24 interval arc length computation).</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Arc length for a Bézier curve">
        void setupCurve() {
          setupDefaultCubic();
          offsetting();
          offset = 20;
        }

        void drawCurve(BezierCurve curve) {
          if(offset<1) { offset = 1; }
          if(offset>23) { offset = 23; }
          int resolution = 100000;
          curve.draw();
          pushStyle();
          fill(0);
          float ref = curve.getCurveLength();
          float f = curve.getCurveLength(offset);
          if (f<0) {
            curves.clear();
            curves.add(curve.lower());
            redraw();
            return;
          }
          float fo = int(resolution*f)/resolution;
          text("curve length using "+offset+" intervals: "+fo+"px", 5, 15);

          float fn = int(resolution*ref)/resolution;
          float fe = 100*abs(ref-f)/ref;
          fe = int(resolution*fe)/resolution;
          text("24 interval arc length: "+fn+" (error: "+fe+"%)", 5, dim-5);
          popStyle();
        }</textarea>
