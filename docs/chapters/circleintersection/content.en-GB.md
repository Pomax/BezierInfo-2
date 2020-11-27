# Intersections with a circle

It might seem odd to cover this subject so much later than the line/line, line/curve, and curve/curve intersection topics from several sections earlier, but the reason we can't cover circle/curve intersections is that we can't really discuss circle/curve intersection until we've covered the kind of lookup table (LUT) walking that the section on projecting a point onto a curve uses. To see why, let's look at what we would have to do if we wanted to find the intersections between a curve and a circle using calculus.

First, we observe that "finding intersections" in this case means that, given a circle defined by a center point `c = (x,y)` and a radius `r`, we want to find all points on the Bezier curve for which the distance to the circle's center point is equal to the circle radius, which by definition means those points lie on the circle, and so count as intersections. In maths, that means we're trying to solve:

\[
  dist(B(t), c) = r
\]

Which seems simple enough. Unfortunately, when we expand that `dist` function, things get a lot more problematic:

\[
  \begin{aligned}
    r &= dist(B(t), c) \\
    &= \sqrt{ \left ( B_x{t} - c_x \right )^2 + \left ( B_y{t} - c_y \right )^2} \\
    &= \sqrt{ \left (
      x_1 (1-t)^3 + 3 x_2 (1-t)^2 t + 2 x_3 (1-t) t^2 + x_4 t^3 - c_x
    \right )^2
    +
    \left (
      y_1 (1-t)^3 + 3 y_2 (1-t)^2 t + 2 y_3 (1-t) t^2 + y_4 t^3 - c_y
    \right )^2}
  \end{aligned}
\]

And now we have a problem because that's a sixth degree polynomial inside the square root. So, thanks to the [Abel-Ruffini theorem](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem) that we saw before, we can't solve this by just going "square both sides because we don't care about signs"... we can't solve a sixth degree polynomial. So, we're going to have to actually evaluate that expression. We can "simplify" this by translating all our coordinates so that the center of the circle is (0,0) and all our coordinates are shifted accordingly, which makes the c<sub>x</sub> and c<sub>y</sub> terms fall away, but then we're still left with a monstrous function to solve.

So instead, we turn to the same kind of "LUT walking" that we saw for projecting points onto a curve, with a twist: instead of finding the on-curve point with the smallest distance to our projection point, we want to find the on-curve point that has the exact distance `r` to our projection point (namely, our circle center). Of course, there can be more than one such point, so there's also a bit more code to make sure we find all of them, but let's look at the steps involved:

```
p = our circle's center point
r = our circle's radius
d = some initially huge value
i = 0
for (coordinate, index) in LUT:
  q = abs(distance(coordinate, p) - r)
  if q < d:
    d = q
    i = index
```

This is _very_ similar to the code in the previous section, with an extra input `r` for the circle radius, and a minor change in the "distance for this coordinate": rather than just `distance(coordinate, p)` we want to know the difference between that distance and the circle radius. After all, if that difference is zero, then the distance from the coordinate to the circle center is exactly the radius, so the coordinate lies on both the curve and the circle.

So far so good.

However, we also want to make sure we find _all_ the points, not just a single one, so we need a little more code for that:

```
p = our circle's center point
r = our circle's radius
d = some initially huge value
start = 0
values = []
do:
    i = findClosest(start, p, r, LUT)
    if i < start, or i>0 but the same as start: stop
    values.add(i);
    start = i + 2;
```

After running this code, `values` will be the list of all LUT coordinates that are closest to the distance `r`: we can use those values to run the same kind of refinement lookup we used for point projection (with the caveat that we're now _not_ checking for smallest distance, but for "distance closest to `r`"), and we'll have all our intersection points. Of course, that does require explaining what `findClosest` does: rather than looking for a global minimum, we're now interested in finding a _local_ minimum, so instead of checking a single point and looking at its distance value, we check _three_ points ("current", "previous" and "before previous") and then check whether they form a local minimum:

```
findClosest(start, p, r, LUT):
    minimizedDistance = some very large number
    pd2 = LUT[start-2], if it exists. Otherwise use minimizedDistance
    pd1 = LUT[start-1], if it exists. Otherwise use minimizedDistance
    slice = LUT.subset(start, LUT.length)
    epsilon = the largest point-to-point distance in our LUT
    i = -1;

    for (coordinate, index) in slice:
        q = abs(dist(coordinate, p) - r);
        if pd1 less than all three values epsilon, pd2, and q:
            i = index - 1
            break

        minimizedDistance = min(q, minimizedDistance)
        pd2 = pd1
        pd1 = q

  return start + i
```

In words: given a `start` index, the circle center and radius, and our LUT, we check where (closest to our `start` index) we can find a local minimum for the difference between "the distance from the curve to the circle center", and the circle's radius.  We track this by looking at three values (associated with the indices `index-2`, `index-1`, and `index`), and we know we've found a local minimum if the three values show that the middle value (`pd1`) is less than either value beside it. When we do, we can set our "best guess, relative to `start`" as `index-1`. Of course, since we're now checking values relative to some `start` value, we might not find another candidate value at all, in which case we return `start - 1`, so that a simple "is the result less than `start`?" lets us determine that there are no more intersections to find.

Finally, while not necessary for point projection, there is one more step we need to perform when we run the binary refinement function on our candidate LUT indices, because we've so far only been testing using distances "closest to the radius of the circle", and that's actually not good enough... we need distances that _are_ the radius of the circle. So, after running the refinement for each of these indices, we need to discard any final value that isn't the circle radius. And because we're working with floating point numbers, what this really means is that we need to discard any value that's a pixel or more "off". Or, if we want to get really fancy, "some small `epsilon` value".

Based on all of that, the following graphic shows this off for the standard cubic curve (which you can move the coordinates around for, of course) and a circle with a controllable radius centered on the graphic's center, using the code approach described above.

<graphics-element title="circle intersection" src="./circle.js">
  <input type="range" min="1" max="150" step="1" value="70" class="slide-control">
</graphics-element>

And of course, for the full details, click that "view source" link.
