# Finding Y, given X

One common task that pops up in things like CSS work, or parametric equalisers, or image leveling, or any other number of applications where Bezier curves are used as control curves in a way that there is really only ever one "y" value associated with one "x" value,  you might want to cut out the middle man, as it were, and compute "y" directly based on "x". After all, the function looks simple enough, finding the "y" value should be simple too, right? Unfortunately, not really. However, it _is_ possible and as long as you have some code in place to help, it's not a lot of a work either.

We'll be tackling this problem in two stages: the first, which is the hard part, is figuring out which "t" value belongs to any given "x" value. For instance, have a look at the following graphic. On the left we have a Bezier curve that looks for all intents and purposes like it fits our criteria: every "x" has one and only one associated "y" value. On the right we see the function for just the "x" values: that's a cubic curve, but not a really crazy cubic curve.

<Graphic title="Finding t, given x=x(t). Left: our curve, right: the x=x(t) function" setup={this.tforx.setup} draw={this.tforx.draw} onMouseMove={this.onMouseMove} />

If you look more closely at that right graphic, you'll notice something interesting: if we treat the red line, corresponding to some x value, as an axis, then we can compute the point where the function crosses that line by computing the roots for the cubic function x=t(x). Sure, we'll need to compute cubic roots, but we _know_ there is only root, so that's not as much work as general cubic root finding. So how do we find the roots?

Let's look at the function for x(t):

\[
    x(t) = a(1-t)³ + 3b(1-t)²t + 3c(1-t)t² + dt³
\]

We can rewrite this to a plain polynomial form, by just working out all the terms, as:

\[
    x(t) = (-a + 3b- 3c + d)t³ + (3a - 6b + 3c)t² + (-3a + 3b)t + a
\]

Nothing special here, that's a standard cubic polynomial in "power" form (i.e. all the terms are ordered by their power of `t`). Given that a, b, c, d, _and_ x(t) are all known constants, we can trivially rewrite this (by moving the x(t) across the equal sign) as:

\[
    (-a + 3b- 3c + d)t³ + (3a - 6b + 3c)t² + (-3a + 3b)t + (a-x) = 0
\]

You might be wondering "where did all the other `-x`, for all the other values a, b, c, and d?" and the answer is that they all cancel out, so the only one we _actually_ need to subtract is the one all the way at the end. Handy! So now we just... solve this equation: we know everything except `t`, we just need some mathematical insight to tell us how to do this.

...Of course "just" is not the right qualifier here, there is nothing "just" about finding the roots of a cubic function, but thankfully, [Gerolano Cardano](http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm) laid the ground works to determining the roots back in the 16<sup>th</sup> century, using complex numbers. Before anyone had even invented complex numbers. Quite a feat! Let's see what his approach looks like in code, although if you just want to see it work, you can safely skip the code section.

<div className="howtocode">
## Let's implement Cardano's root finder

Cardano's root finding relies on turning a function of the form:

\[
  a t^3 + bt^2 + ct + d
\]

into a "depressed" form that looks like:

\[
  t^3 + pt + q
\]

So the highest order term has a coefficient of 1, and the second highest order term is actuall gone entirely. This requires some clever substitution, but for the purpose of this section suffice it to say that (a) any cubic can be depressed, and (b) we know the formulae necessary, even though we won't go into them here.

Instead, we're going to just implement the root finding as outlined in the before-linked-article, so: given some known value for x, and a knowledge of our coordinates a, b, c, and d, we can implement our root-finding as follows:

```
// Find the roots for a cubic polynomial with bernstein coefficients
// {pa, pb, pc, pd}. The function will first convert those to the
// standard polynomial coefficients, and then run through Cardano's
// formula for finding the roots of a depressed cubic curve.
double[] findRoots(double x, double pa, double pb, double pc, double pd) {
  double
    pa3 = 3 * pa,
    pb3 = 3 * pb,
    pc3 = 3 * pc,
    a = -pa  +   pb3 - pc3 + pd,
    b =  pa3 - 2*pb3 + pc3,
    c = -pa3 +   pb3,
    d =  pa  -     x;

  // As we saw earlier, any Bezier curve may (accidentally or
  // on purpose) perfectly model any lower order curve, so we
  // want to test for that: lower order curves are much easier
  // to find the roots for.

  // If a is zero, this curve is quadratic or lower.
  if (approximately(a, 0)) {
    // In fact, if b is zero, this curve is linear or lower!
    if (approximately(b, 0)) {
      // in fact in fact, this curve is... a point?
      if (approximately(c, 0)) {
        // Points have no roots.
        return new double[]{};
      }
      // The linear solution is simply the intercept.
      return new double[]{-d / c};
    }
    // The quadratic solution is literally that.
    double
      q = sqrt(c * c - 4 * b * d),
      b2 = 2 * b;
    return new double[]{
      (q - c) / b2,
      (-c - q) / b2
    };
  }

  // If we get here, we know we need a cubic solution,
  // and the above a/b/c/d values were technically a
  // pre-optimized set because a might be zero and that
  // would cause the following divisions to error.

  b /= a;
  c /= a;
  d /= a;

  double
    b3 = b / 3,
    p = (3 * c - b*b) / 3,
    p3 = p / 3,
    q = (2 * b*b*b - 9 * b * c + 27 * d) / 27,
    q2 = q / 2,
    discriminant = q2*q2 + p3*p3*p3,
    u1, v1;

  // case 1: three real roots, but finding them involves complex
  // maths. Since we don't have a complex data type, we use trig
  // instead, because complex numbers have nice geometric properties.

  if (discriminant < 0) {
    double
      mp3 = -p/3,
      r = sqrt(mp3*mp3*mp3),
      t = -q / (2 * r),
      cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
      phi = acos(cosphi),
      crtr = crt(r),
      t1 = 2 * crtr;
    return new double[]{
      t1 * cos(phi / 3) - b3,
      t1 * cos((phi + TAU) / 3) - b3,
      t1 * cos((phi + 2 * TAU) / 3) - b3
    };
  }

  // case 2: three real roots, but two form a "double root",
  // and so will have the same resultant value. We only need
  // to return two values in this case.

  else if (discriminant == 0) {
    u1 = q2 < 0 ? crt(-q2) : -crt(q2);
    return new double[]{
      2 * u1 - b3,
      -u1 - b3
    };
  }

  // case 3: one real root, 2 complex roots. We don't care about
  // complex results so we just ignore those and directly compute
  // that single real root.

  else {
    double sd = sqrt(discriminant);
    u1 = crt(-q2 + sd);
    v1 = crt(q2 + sd);
    return new double[]{u1 - v1 - b3};
  }
}
```

Okay, that's quite the slab of code, with a few additionals implied functions:

- `crt()` is the "cube root" function. We actually don't care about complex numbers in this case so the easier way to implement this is with a def, or macro, or ternary, or whatever shorthand your language of choice offers: `crt(x) = x < 0 ? -pow(-x, 1f/3f) : pow(x, 1f/3f);`.

- `tau` is just 2π. It's useful to have around when you're doing geometry programming.

- `approximately()` is a function that compares a value to a _very small interval around the target_ because IEEE floating point numerals are _jerks_. Basically we're talking about code that looks similar to `approximately(a,b) { return abs(a-b) < 0.0000001; }`.

And that's it. Root finding, implemented.

</div>

Now, we still need to be a bit careful, because cubic roots are complicated things: you can get up to three roots back. And in our case, only one will be both a real number (as opposed to a complex number) _and_ lie in the `t` interval [0,1]. So let's make sure to only pick the right `t` value:

    double x = some value we know!
    double[] roots = getTforX(x);
    double t;
    if (roots.length > 0) {
      for (double _t: roots) {
        if (_t<0 || _t>1) continue;
        t = _t;
        break;
      }
    }

And that's it, we're done: we now have the `t` value corresponding to our `x`, and we can just evaluate our curve for that `t` value to find a coordinate that has our original, known `x`, and our unknown `y` value.

<Graphic title="Finding y(t), by finding t, given x=x(t)" setup={this.yforx.setup} draw={this.yforx.draw} onMouseMove={this.onMouseMove} />
