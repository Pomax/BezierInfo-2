# Finding Y, given X

One common task that pops up in things like CSS work, or parametric equalisers, or image leveling, or any other number of applications where Bezier curves are used as control curves in a way that there is really only ever one "y" value associated with one "x" value,  you might want to cut out the middle man, as it were, and compute "y" directly based on "x". After all, the function looks simple enough, finding the "y" value should be simple too, right? Unfortunately, not really. However, it _is_ possible and as long as you have some code in place to help, it's not a lot of a work either.

We'll be tackling this problem in two stages: the first, which is the hard part, is figuring out which "t" value belongs to any given "x" value. For instance, have a look at the following graphic. On the left we have a Bezier curve that looks for all intents and purposes like it fits our criteria: every "x" has one and only one associated "y" value. On the right we see the function for just the "x" values: that's a cubic curve, but not a really crazy cubic curve. If you mouse over the graphic, you will see a red line drawn that corresponds to the `x` coordinate under your cursor: vertical in the left graphic, horizontal in the right.

<Graphic title="Finding t, given x=x(t). Left: our curve, right: the x=x(t) function" setup={this.tforx.setup} draw={this.tforx.draw} onMouseMove={this.onMouseMove} />

Now, if you look more closely at that right graphic, you'll notice something interesting: if we treat the red line as "the x axis", then the point where the function crosses our line is really just a root for the cubic function x(t). So... can we just use root finding to get the "t" value associated with an "x" value? To which the answer should unsurprisingly be " yes, we can". Sure, we'll need to compute cubic roots, but we've already seen how to do that in the section on [finding extremities](#extremities), and we're not dealing with a complicated case: we *know* there is only root, so let's go and find it!

First, let's look at the function for x(t):

\[
    x(t) = a(1-t)³ + 3b(1-t)²t + 3c(1-t)t² + dt³
\]

We can rewrite this to a plain polynomial form, by just fully writing out the expansion and then collecting the polynomial factors, as:

\[
    x(t) = (-a + 3b- 3c + d)t³ + (3a - 6b + 3c)t² + (-3a + 3b)t + a
\]

Nothing special here: that's a standard cubic polynomial in "power" form (i.e. all the terms are ordered by their power of `t`). So, given that `a`, `b`, `c`, `d`, *and* `x(t)` are all known constants, we can trivially rewrite this (by moving the `x(t)` across the equal sign) as:

\[
    (-a + 3b- 3c + d)t³ + (3a - 6b + 3c)t² + (-3a + 3b)t + (a-x) = 0
\]

You might be wondering "where did all the other 'minus x' for all the other values a, b, c, and d go?" and the answer there is that they all cancel out, so the only one we actually need to subtract is the one at the end. Handy! So now we just... solve this equation: we know everything except `t`, we just need some mathematical insight to tell us how to do this.

...Of course "just" is not the right qualifier here, there is nothing "just" about finding the roots of a cubic function, but thankfully we've already covered the tool to do this in the [root finding](#extremities) section: Gerolano Cardano's solution for cubic roots. Of course, we still need to be a bit careful, because cubic roots are complicated things: you can get up to three roots back, even though we only "want" one root. In our case, only one will be both a real number (as opposed to a complex number) _and_ lie in the `t` interval [0,1], so we need to filter for that:

```
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
```

And that's it, we're done: we now have the `t` value corresponding to our `x`, and we can just evaluate our curve for that `t` value to find a coordinate that has our original, known `x`, and our unknown `y` value. Mouse over the following graphic, which performs this root finding based on a knowledge of which "x" value we're interested in.

<Graphic title="Finding y(t), by finding t, given x=x(t)" setup={this.yforx.setup} draw={this.yforx.draw} onMouseMove={this.onMouseMove} />

