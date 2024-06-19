# Finding Y, given X

One common task that pops up in things like CSS work, or parametric equalizers, or image leveling, or any other number of applications where Bézier curves are used as control curves in a way that there is really only ever one "y" value associated with one "x" value,  you might want to cut out the middle man, as it were, and compute "y" directly based on "x". After all, the function looks simple enough, finding the "y" value should be simple too, right? Unfortunately, not really. However, it _is_ possible and as long as you have some code in place to help, it's not a lot of a work either.

We'll be tackling this problem in two stages: the first, which is the hard part, is figuring out which "t" value belongs to any given "x" value. For instance, have a look at the following graphic. On the left we have a Bézier curve that looks for all intents and purposes like it fits our criteria: every "x" has one and only one associated "y" value. On the right we see the function for just the "x" values: that's a cubic curve, but not a really crazy cubic curve. If you move the graphic's slider, you will see a red line drawn that corresponds to the `x` coordinate: this is a vertical line in the left graphic, and a horizontal line on the right.

<graphics-element title="Finding t, given x=x(t). Left: our curve, right: the function x=f(t)" width="550" src="./basics.js">
  <input type="range" min="0" max="1" step="0.01" class="slide-control">
</graphics-element>

Now, if you look more closely at that right graphic, you'll notice something interesting: if we treat the red line as "the x axis", then the point where the function crosses our line is really just a root for the cubic function x(t) through a shifted "x-axis"... and [we've already seen](#extremities) how to calculate roots, so let's just run cubic root finding - and not even the complicated cubic case either: because of the kind of curve we're starting with, we _know_ there is at most a single root in the interval [0,1], simplifying the code we need!

First, let's look at the function for x(t):

\[
    x(t) = a(1-t)^3 + 3b(1-t)^2t + 3c(1-t)t^2 + dt^3
\]

We can rewrite this to a plain polynomial form, by just fully writing out the expansion and then collecting the polynomial factors, as:

\[
    x(t) = (-a + 3b- 3c + d)t^3 + (3a - 6b + 3c)t^2 + (-3a + 3b)t + a
\]

Nothing special here: that's a standard cubic polynomial in "power" form (i.e. all the terms are ordered by their power of `t`). So, given that `a`, `b`, `c`, `d`, *and* `x(t)` are all known constants, we can trivially rewrite this (by moving the `x(t)` across the equal sign) as:

\[
    (-a + 3b - 3c + d)t^3 + (3a - 6b + 3c)t^2 + (-3a + 3b)t + (a-x) = 0
\]

You might be wondering "where did all the other 'minus x' for all the other values a, b, c, and d go?" and the answer there is that they all cancel out, so the only one we actually need to subtract is the one at the end. Handy! So now we just solve this equation using Cardano's algorithm, and we're left with some rather short code:

```
// prepare our values for root finding:
x = a value we already know
xcoord = our set of Bézier curve's x coordinates
foreach p in xcoord: p.x -= x

// find our root, of which we know there is exactly one:
t = getRoots(p[0], p[1], p[2], p[3])[0]

// find our answer:
if t in [0,1] y = curve.get(t).y
```

So the procedure is fairly straight forward: pick an `x`, find the associated `t` value, evaluate our curve _for_ that `t` value, which gives us the curve's {x,y} coordinate, which means we know `y` for this `x`. Move the slider for the following graphic to see this in action:

<graphics-element title="Finding By(t), by finding t for a given x" src="./yforx.js">
  <input type="range" min="0" max="1" step="0.01" class="slide-control">
</graphics-element>

