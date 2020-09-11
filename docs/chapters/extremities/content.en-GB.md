# Finding extremities: root finding

Now that we understand (well, superficially anyway) the component functions, we can find the extremities of our Bézier curve by finding maxima and minima on the component functions, by solving the equation B'(t) = 0. We've already seen that the derivative of a Bézier curve is a simpler Bézier curve, but how do we solve the equality? Fairly easily, actually, until our derivatives are 4th order or higher... then things get really hard. But let's start simple:

### Quadratic curves: linear derivatives.

The derivative of a quadratic Bézier curve is a linear Bézier curve, interpolating between just two terms, which means finding the solution for "where is this line 0" is effectively trivial by rewriting it to a function of `t` and solving. First we turn our cubic Bézier function into a quadratic one, by following the rule mentioned at the end of the [derivatives section](#derivatives):

\[
\begin{aligned}
  B'(t) = a(1-t) + b(t) &= 0,\\
  a - at + bt &= 0,\\
  (b-a)t + a &= 0\\
\end{aligned}
\]

And then we turn this into our solution for `t` using basic arithmetics:

\[
\begin{aligned}
  (b-a)t + a &= 0,\\
  (b-a)t &= -a,\\
  t &= \frac{-a}{b-a}\\
\end{aligned}
\]

Done.

Although with the [caveat](https://en.wikipedia.org/wiki/Caveat_emptor#Caveat_lector) that if `b-a` is zero, there is no solution and we probably shouldn't try to perform that division.

### Cubic curves: the quadratic formula.

The derivative of a cubic Bézier curve is a quadratic Bézier curve, and finding the roots for a quadratic polynomial means we can apply the [Quadratic formula](https://en.wikipedia.org/wiki/Quadratic_formula). If you've seen it before, you'll remember it, and if you haven't, it looks like this:

\[
  Given\ f(t) = at^2 + bt + c,\ f(t)=0\ when\ t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]

So, if we can rewrite the Bézier component function as a plain polynomial, we're done: we just plug in the values into the quadratic formula, check if that square root is negative or not (if it is, there are no roots) and then just compute the two values that come out (because of that plus/minus sign we get two). Any value between 0 and 1 is a root that matters for Bézier curves, anything below or above that is irrelevant (because Bézier curves are only defined over the interval [0,1]). So, how do we convert?

First we turn our cubic Bézier function into a quadratic one, by following the rule mentioned at the end of the [derivatives section](#derivatives):

\[
\begin{array}{l}
  B(t)\ uses\ \{ p_1,p_2,p_3,p_4 \} \\
  B'(t)\ uses\ \{ v_1,v_2,v_3 \},\ where\ v_1 = 3(p_2-p_1),\ v_2 = 3(p_3-p_2),\ v_3 = 3(p_4-p_3)
\end{array}
\]

And then, using these *v* values, we can find out what our *a*, *b*, and *c* should be:

\[
\begin{aligned}
  B'(t) &= v_1(1-t)^2 + 2v_2(1-t)t + v_3t^2 \\
  ... &= v_1(t^2 - 2t + 1) + 2v_2(t-t^2) + v_3t^2 \\
  ... &= v_1t^2 - 2v_1t + v_1 + 2v_2t - 2v_2t^2 + v_3t^2 \\
  ... &= v_1t^2 - 2v_2t^2 + v_3t^2 - 2v_1t + v_1 + 2v_2t \\
  ... &= (v_1-2v_2+v_3)t^2 + 2(v_2-v_1)t + v_1
\end{aligned}
\]

This gives us three coefficients {a, b, c} that are expressed in terms of `v` values, where the `v` values are expressions of our original coordinate values, so we can do some substitution to get:

\[
\begin{aligned}
  a &= v_1-2v_2+v_3 = 3(-p_1 + 3p_2 - 3p_3 + p_4) \\
  b &= 2(v_2-v_1) = 6(p_1 - 2p_2 + p_3) \\
  c &= v_1 = 3(p_2-p_1)
\end{aligned}
\]

Easy-peasy. We can now almost trivially find the roots by plugging those values into the quadratic formula.

And as a cubic curve, there is also a meaningful second derivative, which we can compute by simple taking the derivative of the derivative.

### Quartic curves: Cardano's algorithm.

We haven't really looked at them before now, but the next step up would be a Quartic curve, a fourth degree Bézier curve. As expected, these have a derivative that is a cubic function, and now things get much harder. Cubic functions don't have a "simple" rule to find their roots, like the quadratic formula, and instead require quite a bit of rewriting to a form that we can even start to try to solve.


Back in the 16<sup>th</sup> century, before Bézier curves were a thing, and even before _calculus itself_ was a thing, [Gerolamo Cardano](https://en.wikipedia.org/wiki/Gerolamo_Cardano) figured out that even if the general cubic function is really hard to solve, it can be rewritten to a form for which finding the roots is "easier" (even if not "easy"):

\[
  \begin{aligned}
    \textit{very hard: solve } & at^3 + bt^2 + ct + d = 0 \\
    \textit{easier: solve } & t^3 + pt + q = 0
  \end{aligned}
\]

We can see that the easier formula only has two constants, rather than four, and only two expressions involving `t`, rather than three: this makes things considerably easier to solve because it lets us use [regular calculus](https://www.wolframalpha.com/input/?i=t^3+%2B+pt+%2B+q) to find the values that satisfy the equasion.

Now, there is one small hitch: as a cubic function, the solutions may be [complex numbers](https://en.wikipedia.org/wiki/Complex_number) rather than plain numbers... And Cardona realised this, centuries befor complex numbers were a well-understood and established part of number theory. His interpretation of them was "these numbers are impossible but that's okay because they disappear again in later steps", allowing him to not think about them too much, but we have it even easier: as we're trying to find the roots for display purposes, we don't even _care_ about complex numbers: we're going to simplify Cardano's approach just that tiny bit further by throwing away any solution that's not a plain number.

So, how do we rewrite the hard formula into the easier formula? This is explained in detail over at [Ken J. Ward's page](https://trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm) for solving the cubic equation, so instead of showing the maths, I'm simply going to show the programming code for solving the cubic equation, with the complex roots getting totally ignored, but if you're interested you should definitely head over to Ken's page and give the procedure a read-through.

<div class="howtocode">

### Implementing Cardano's algorithm for finding all real roots

The "real roots" part is fairly important, because while you cannot take a square, cube, etc. root of a negative number in the "real" number space (denoted with ℝ), this is perfectly fine in the ["complex" number](https://en.wikipedia.org/wiki/Complex_number) space (denoted with ℂ). And, as it so happens, Cardano is also attributed as the first mathematician in history to have made use of complex numbers in his calculations. For this very algorithm!

```
// A helper function to filter for values in the [0,1] interval:
function accept(t) {
  return 0<=t && t <=1;
}

// A real-cuberoots-only function:
function cuberoot(v) {
  if(v<0) return -pow(-v,1/3);
  return pow(v,1/3);
}

// Now then: given cubic coordinates {pa, pb, pc, pd} find all roots.
function getCubicRoots(pa, pb, pc, pd) {
  var   a = (3*pa - 6*pb + 3*pc),
        b = (-3*pa + 3*pb),
        c = pa,
        d = (-pa + 3*pb - 3*pc + pd);

  // do a check to see whether we even need cubic solving:
  if (approximately(d,0)) {
    // this is not a cubic curve.
    if (approximately(a,0)) {
      // in fact, this is not a quadratic curve either.
      if (approximately(b,0)) {
        // in fact in fact, there are no solutions.
        return [];
      }
      // linear solution
      return [-c / b].filter(accept);
    }
    // quadratic solution
    var q = sqrt(b*b - 4*a*c), 2a = 2*a;
    return [(q-b)/2a, (-b-q)/2a].filter(accept)
  }

  // at this point, we know we need a cubic solution.

  a /= d;
  b /= d;
  c /= d;

  var p = (3*b - a*a)/3,
      p3 = p/3,
      q = (2*a*a*a - 9*a*b + 27*c)/27,
      q2 = q/2,
      discriminant = q2*q2 + p3*p3*p3;

  // and some variables we're going to use later on:
  var u1, v1, root1, root2, root3;

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
  if(discriminant === 0) {
    u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
    root1 = 2*u1 - a/3;
    root2 = -u1 - a/3;
    return [root1, root2].filter(accept);
  }

  // one real root, two complex roots
  var sd = sqrt(discriminant);
  u1 = cuberoot(sd - q2);
  v1 = cuberoot(sd + q2);
  root1 = u1 - v1 - a/3;
  return [root1].filter(accept);
}
```

</div>

And that's it. The maths is complicated, but the code is pretty much just "follow the maths, while caching as many values as we can to prevent recomputing things as much as possible" and now we have a way to find all roots for a cubic function and can just move on with using that to find extremities of our curves.

And of course, as a quartic curve  also has meaningful second and third derivatives, we can quite easily compute those by using the derivative of the derivative (of the derivative), just as for cubic cuvers.


### Quintic and higher order curves: finding numerical solutions

And this is where thing stop, because we _cannot_ find the roots for polynomials of degree 5 or higher using algebra (a fact known as [the Abel–Ruffini theorem](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem)). Instead, for occasions like these, where algebra simply cannot yield an answer, we turn to [numerical analysis](https://en.wikipedia.org/wiki/Numerical_analysis).

That's a fancy term for saying "rather than trying to find exact answers by manipulating symbols, find approximate answers by describing the underlying process as a combination of steps, each of which _can_ be assigned a number via symbolic manipulation". For example, trying to mathematically compute how much water fits in a completely crazy three dimensional shape is very hard, even if it got you the perfect, precise answer. A much easier approach, which would be less perfect but still entirely useful, would be to just grab a buck and start filling the shape until it was full: just count the number of buckets of water you used. And if we want a more precise answer, we can use smaller buckets.

So that's what we're going to do here, too: we're going to treat the problem as a sequence of steps, and the smaller we can make each step, the closer we'll get to that "perfect, precise" answer. And as it turns out, there is a really nice numerical root-finding algorithm, called the [Newton-Raphson](https://en.wikipedia.org/wiki/Newton-Raphson) root finding method (yes, after *[that](https://en.wikipedia.org/wiki/Isaac_Newton)* Newton), which we can make use of. The Newton-Raphson approach consists of taking our impossible-to-solve function `f(x)`, picking some intial value `x` (literally any value will do), and calculating `f(x)`. We can think of that value as the "height" of the function at `x`. If that height is zero, we're done, we have found a root. If it isn't, we calculate the tangent line at `f(x)` and calculate at which `x` value _its_ height is zero (which we've already seen is very easy). That will give us a new `x` and we repeat the process until we find a root.

Mathematically, this means that for some `x`, at step `n=1`, we perform the following calculation until `f<sub>y</sub>(x)` is zero, so that the next `t` is the same as the one we already have:

\[
  x_{n+1} = x_n - \frac{f_y(x_n)}{f'_y(x_n)}
\]

(The Wikipedia article has a decent animation for this process, so I will not add a graphic for that here)

Now, this works well only if we can pick good starting points, and our curve is [continuously differentiable](https://en.wikipedia.org/wiki/Continuous_function) and doesn't have [oscillations](https://en.wikipedia.org/wiki/Oscillation_(mathematics)). Glossing over the exact meaning of those terms, the curves we're dealing with conform to those constraints, so as long as we pick good starting points, this will work. So the question is: which starting points do we pick?

As it turns out, Newton-Raphson is so blindingly fast that we could get away with just not picking: we simply run the algorithm from *t=0* to *t=1* at small steps (say, 1/200<sup>th</sup>) and the result will be all the roots we want. Of course, this may pose problems for high order Bézier curves: 200 steps for a 200<sup>th</sup> order Bézier curve is going to go wrong, but that's okay: there is no reason (at least, none that I know of) to _ever_ use Bézier curves of crazy high orders. You might use a fifth order curve to get the "nicest still remotely workable" approximation of a full circle with a single Bézier curve, but that's pretty much as high as you'll ever need to go.

### In conclusion:

So now that we know how to do root finding, we can determine the first and second derivative roots for our Bézier curves, and show those roots overlaid on the previous graphics. For the quadratic curve, that means just the first derivative, in red:

<graphics-element title="Quadratic Bézier curve extremities" width="825" src="./extremities.js" data-type="quadratic"></graphics-element>

And for cubic curves, that means first and second derivatives, in red and purple respectively:

<graphics-element title="Cubic Bézier curve extremities" width="825" src="./extremities.js" data-type="cubic"></graphics-element>
