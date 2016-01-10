var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Extremities = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Finding extremities: root finding"
    };
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[2].x = 210;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.setPanelCount(3);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var tf = curve.order + 1,
        pad = 20,
        pts = curve.points,
        w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = { x: w, y: 0 };

    var x_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.x}; });
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "x",0,w, offset);
    offset.x += pad;
    var xcurve = new api.Bezier(x_pts);
    api.drawCurve(xcurve, offset);
    api.setColor("red");
    xcurve.inflections().y.forEach(t => {
      var p = xcurve.get(t);
      api.drawCircle(p, 3, offset);
    });

    offset.x += w-pad;
    var y_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.y}; });
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "y",0,w, offset);
    offset.x += pad;
    var ycurve = new api.Bezier(y_pts);
    api.drawCurve(ycurve, offset);
    api.setColor("red");
    ycurve.inflections().y.forEach(t => {
      var p = ycurve.get(t);
      api.drawCircle(p, 3, offset);
    });
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Now that we understand (well, superficially anyway) the component functions, we can find the extremities of our
        Bézier curve by finding maxima and minima on the component functions, by solving the equations B'(t) = 0 and B''(t) = 0.
        Although, in the case of quadratic curves there is no B''(t), so we only need to compute B'(t) = 0. So, how do we compute the first and second derivatives? Fairly easily, actually, until our derivatives are 4th order or higher... then things get really hard. But let's start simple:</p>

        <h3>Quadratic curves: linear derivatives.</h3>

        <p>Finding the solution for "where is this line 0" should be trivial:</p>

        <p>\[\begin{align}
          l(x) = ax + b &= 0,\\
          ax + b &= 0,\\
          ax &= -b \\
          x &= \frac{-b}{a}
        \end{align}\]</p>

        <p>Done. And quadratic curves have no meaningful second derivative, so we're <em>really</em> done.</p>

        <h3>Cubic curves: the quadratic formula.</h3>

        <p>The derivative of a cubic curve is a quadratic curve, and finding the roots for a quadratic Bézier curve means we can apply the <a href="https://en.wikipedia.org/wiki/Quadratic_formula">Quadratic formulat</a>. If you've seen it before, you'll remember it, and if you haven't, it looks like this:</p>

        <p>\[
          Given\ f(t) = at^2 + bt + c,\ f(t)=0\ when\ t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
        \]</p>

        <p>So, if we can express a Bézier component function as a plain polynomial, we're done: we just plug in the values into the quadratic formula, check if that square root is negative or not (if it is, there are no roots) and then just compute the two values that come out (because of that plus/minus sign we get two). Any value between 0 and 1 is a root that matters for Bézier curves, anything below or above that is irrelevant (because Bézier curves are only defined over the interval [0,1]). So, how do we convert?</p>

        <p>First we turn our cubic Bézier function into a quadratic one, by following the rule mentioned at the end of the <a href="#derivatives">derivatives section</a>:</p>

        <p>\[
          B(t)\ uses\ \{ p_1,p_2,p_3,p_4 \} \\
          B'(t)\ uses\ \{ v_1.v_2,v_3 \},\ where\ v_1 = 3(p_2-p_1),\ v_2 = 3(p_3-p_2),\ v_3 = 3(p_4-p_3)
        \]</p>

        <p>And then, using these <em>v</em> values, we can find out what our <em>a</em>, <em>b</em>, and <em>c</em> should be:</p>

        <p>\[\begin{align}
          B'(t) &= v_1(1-t)^2 + 2v_2(1-t)t + v_3t^2 \\
          ... &= v_1(t^2 - 2t + 1) + 2v_2(t-t^2) + v_3t^2 \\
          ... &= v_1t^2 - 2v_1t + v_1 + 2v_2t - 2v_2t^2 + v_3t^2 \\
          ... &= v_1t^2 - 2v_2t^2 + v_3t^2 - 2v_1t + v_1 + 2v_2t \\
          ... &= (v_1-2v_2+v_3)t^2 + 2(v_2-v_1)t + v_1
        \end{align}\]</p>

        <p>So we can find the roots by using:</p>

        <p>\[\begin{align}
          a &= v_1-2v_2+v_3 = 3(-p_1 + 3p_2 - 3p_3 + p_4) \\
          b &= 2(v_2-v_1) = 6(p_1 - 2p_2 + p_3) \\
          c &= v_1 = 3(p_2-p_1)
        \end{align}\]</p>

        <p>Easy peasy. We also note that the second derivative of a cubic curve means computing the first derivative of a quadratic curve, and we just saw how to do that in the section above.</p>

        <h3>Quartic curves: Cardano's algorithm.</h3>

        <p>Quartic—fourth degree—curves have a cubic function as derivative. Now, cubic functions are a bit of a problem because they're really hard to solve. But, way back in the 16<sup>th</sup> century, <a href="https://en.wikipedia.org/wiki/Gerolamo_Cardano">Gerolamo Cardano</a> figured out that even if the general cubic function is really hard to solve, it can be rewritten to a form for which finding the roots is "easy", and then the only hard part is figuring out how to go from that form to the generic form. So:</p>

        <p>\[
          very\ hard:\ solve\ at^3 + bt^2 + ct + d = 0\\
          easier:\ solve\ t^3 + pt + q = 0
        \]</p>

        <p>This is easier because for the "easier formula" we can use <a href="http://www.wolframalpha.com/input/?i=t^3+%2B+pt+%2B+q">regular calculus</a> to find the roots (as a cubic function, however, it can have up to three roots, but two of those can be complex. For the purpose of Bézier curve extremities, we can completely ignore those complex roots, since our <em>t</em> is a plain real number from 0 to 1).</p>

        <p>So, the trick is to figure out how to turn the first formula into the second formula, and to then work out the maths that gives us the roots. This is explained in detail over at <a href="http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm">Ken J. Ward's page</a> for solving the cubic equation, so instead of showing the maths, I'm simply going to show the programming code for solving the cubic equation, with the complex roots getting totally ignored.</p>

        <div className="note"><pre>
// A helper function to filter for values in the [0,1] interval:
function accept(t) {
  return 0<=t && t <=1;
}

// A special cuberoot function, which we can use because we don't care about complex roots:
function crt(v) {
  if(v<0) return -Math.pow(-v,1/3);
  return Math.pow(v,1/3);
}

// Now then: given cubic coordinates pa, pb, pc, pd, find all roots.
function getCubicRoots(pa, pb, pc, pd) {
  var d = (-pa + 3*pb - 3*pc + pd),
      a = (3*pa - 6*pb + 3*pc) / d,
      b = (-3*pa + 3*pb) / d,
      c = pa / d;

  var p = (3*b - a*a)/3,
      p3 = p/3,
      q = (2*a*a*a - 9*a*b + 27*c)/27,
      q2 = q/2,
      discriminant = q2*q2 + p3*p3*p3;

  // and some variables we're going to use later on:
  var u1,v1,root1,root2,root3;

  // three possible real roots:
  if (discriminant < 0) {
    var mp3  = -p/3,
        mp33 = mp3*mp3*mp3,
        r    = sqrt( mp33 ),
        t    = -q / (2*r),
        cosphi = t<-1 ? -1 : t>1 ? 1 : t,
        phi  = acos(cosphi),
        crtr = cuberoot(r),
        t1   = 2*crtr;
    root1 = t1 * cos(phi/3) - a/3;
    root2 = t1 * cos((phi+2*pi)/3) - a/3;
    root3 = t1 * cos((phi+4*pi)/3) - a/3;
    return [root1, root2, root3].filter(accept);
  }

  // three real roots, but two of them are equal:
  else if(discriminant === 0) {
    u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
    root1 = 2*u1 - a/3;
    root2 = -u1 - a/3;
    return [root1, root2].filter(accept);
  }

  // one real root, two complex roots
  else {
    var sd = sqrt(discriminant);
    u1 = cuberoot(sd - q2);
    v1 = cuberoot(sd + q2);
    root1 = u1 - v1 - a/3;
    return [root1].filter(accept);
  }
}</pre></div>

        <p>And that's it. The maths is complicated, but the code is pretty much just "follow the maths, while caching as many values as we can to reduce recomputing things as much as possible" and now we have a way to find all roots for a cubic function and can just move on with using that to find extremities of our curves.</p>

        <h3>Quintic and higher order curves: finding numerical solutions</h3>

        <p>The problem with this is that as the order of the curve goes up, we can't actually solve those equations the normal
        way. We can't take the function, and then work out what the solutions are. Not to mention that even solving a third
        order derivative (for a fourth order curve) is already a royal pain in the backside. We need a better solution. We
        need numerical approaches.</p>

        <p>That's a fancy word for saying "rather than solve the function, treat the problem as a sequence of identical
        operations, the performing of which gets us closer and closer to the real answer". As it turns out, there is a
        really nice numerical root finding algorithm, called the <a href="http://en.wikipedia.org/wiki/Newton-Raphson">Newton-Raphson</a>
        root finding method (yes, after <strong>that</strong> Newton), which we can make use of.</p>

        <p>The Newton-Raphson approach consists of picking a value <i>t</i> (any will do), and getting the corresponding
        value at that <i>t</i> value. For normal functions, we can treat that value as a height. If the height is zero,
        we're done, we have found a root. If it's not, we take the tangent of the curve at that point, and extend
        it until it passes the x-axis, which will be at some new point <i>t</i>. We then repeat the procedure with this
        new value, and we keep doing this until we find our root.</p>

        <p>Mathematically, this means that for some <i>t</i>, at step <i>n=1</i>, we perform the following calculation
        until <i>f<sub>y</sub></i>(<i>t</i>) is zero, so that the next <i>t</i> is the same as the one we already have:</p>

        <p>\[
          t_{n+1} = t_n - \frac{f_y(t_n)}{f'_y(t_n)}
        \]</p>

        <p>(The wikipedia article has a decent animation for this process, so I'm not adding a sketch for that here)</p>

        <p>Now, this works well only if we can pick good starting points, and our curve is continuously differentiable
        and doesn't have oscillations. Glossing over the exact meaning of those terms, the curves we're dealing with
        conform to those constraints, so as long as we pick good starting points, this will work. So the question is:
        which starting points do we pick?</p>

        <p>As it turns out, Newton-Raphson is so blindingly fast, so we could get away with just not picking:
        we simply run the algorithm from <i>t=0</i> to <i>t=1</i> at small steps (say, 1/200<sup>th</sup>) and
        the result will be all the roots we want. Of course, this may pose problems for high order Bézier
        curves: 200 steps for a 200<sup>th</sup> order Bézier curve is going to go wrong, but that's okay:
        there is no reason, ever, to use Bézier curves of crazy high orders. You might use a fifth order curve
        to get the "nicest still remotely workable" approximation of a full circle with a single Bézier curve,
        that's pretty much as high as you'll ever need to go.</p>

        <h3>In conclusion:</h3>

        <p>So now that we know how to do root finding, we can determine the first and second derivative roots for our Bézier curves, and show those roots overlaid on the previous graphics:</p>

        <Graphic preset="simple" title="Quadratic Bézier curve extremities" setup={this.setupQuadratic} draw={this.draw}/>
        <Graphic preset="simple" title="Cubic Bézier curve extremities" setup={this.setupCubic} draw={this.draw}/>

      </section>
    );
  }
});

module.exports = Extremities;
