# Intersections with a circle

It might seem odd to cover this subject so much later than the line/line, line/curve, and curve/curve intersection topics from several sections earlier, but the reason we can't cover circle/curve intersections is that we can't really discuss circle/curve intersection until we've covered the kind of lookup table (LUT) walking that the section on projecting a point onto a curve uses. To see why, let's look at what we would have to do if we wanted to find the intersections between a curve and a circle using calculus.

First, we observe that "finding intersections" in this case means that, given a circle defined by a center point `c = (x,y)` and a radius `r`, we want to find all points on the Bezier curve for which the distance to the circle's center point is equal to the circle radius, which by definition means those points lie on the circle, and so count as intersections. In maths, that means we're trying to solve:

\[
  dist(B(t), c) = r
\]

Which seems simple enough. Unfortunately, when we expand that `dist` function, things get a lot more problematic:

\[
  \begin{array}{cl}
    r &= dist(B(t), c) \\
    &= \sqrt{ \left ( B_x{t} - c_x \right )^2 + \left ( B_y{t} - c_y \right )^2} \\
    &= \sqrt{ \left (
      x_1 (1-t)^3 + 3 x_2 (1-t)^2 t + 2 x_3 (1-t) t^2 + x_4 t^3 - c_x
    \right )^2
    +
    \left (
      y_1 (1-t)^3 + 3 y_2 (1-t)^2 t + 2 y_3 (1-t) t^2 + y_4 t^3 - c_y
    \right )^2}
  \end{array}
\]

And now we have a problem because that's a sixth degree polynomial inside the square root. So, thanks to the [Abel-Ruffini theorem](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem) that we saw before, we can't solve this by just going "square both sides because we don't care about signs"... we can't solve a sixth degree polynomial. So, we're going to have to actually evaluate that expression. We can "simplify" this by translating all our coordinates so that the center of the circle is (0,0) and all our coordinates are shifted accordingly, which makes the c<sub>x</sub> and c<sub>y</sub> terms fall away, but then we're still left with a monstrous function to solve.

So instead, we turn to the same kind of "LUT walking" that we saw for projecting points onto a curve, with a twist: instead of finding the on-curve point with the smallest distance to our projection point, we want to find the on-curve point that has the exact distance `r` to our projection point (namely, our circle center). Of course, there can be more than one such point, so there's also a bit more code to make sure we find all of them, but let's look at the steps involved:

```
c = our circle's center point
r = our circle's radius
d = some initially huge value
i = 0
for (coordinate, index) in LUT:
  q = abs(distance(coordinate, p) - r)
  if q < d:
    d = q
    i = index
```

This is _very_ similar to the code in the previous section, but adapted so that we home in on points with an exact distance, rather than "the smallest distance". So far so good. However, we also want to make sure we find _all_ the points, not just a single one, so we need a little more code for that:

```
c = our circle's center point
r = our circle's radius
d = some initially huge value
start = 0
values = []
run:
    i = findClosest(start, x, y, r, LUT)
    if (i < start) stop
    if (i>0 && i === start) stop
    values.add(i);
    start = i + 2;
```

After running this code, `values` will be the list of all LUT coordinates that are closest to the distance `r`: we can use those values to run the same kind of refinement lookup we used for point projection (with the caveat that we're now _not_ checking for smallest distance, but for "distance closest to `r`"), and we'll have all our intersection points. Of course, that does require explaining what `findClosest` does: rather than looking for a global minimum, we're now interested in finding a _local_ minimum, so instead of checking a single point and looking at its distance value, we check _three_ points ("current", "previous" and "before previous") and then check whether they form a local minimum:

```
findClosest(start, x, y, r, LUT):
    D = some very large number
    pd2 = LUT[start-2], if it exists. Otherwise use D
    pd1 = LUT[start-1], if it exists. Otherwise use D
    slice = LUT.subset(start, LUT.length)
    epsilon = the largest point-to-point distance in our LUT
    i = -1;

    for (point, index) in slice:
        q = abs(dist(point, (x,y)) - r);
        if pd1 < epsilon && pd2 > pd1 && pd1 < q:
            i = index - 1
            break

        if q < D: D = q

        pd2 = pd1
        pd1 = q

  return start + i
```

In words: given a `start` index, the circles `x`, `y`, and `r` values, and our LUT, we check where, closest to out `start` index, we can find a local minimum for the difference between the distance to the circle center, and the circle's radius value. We track this over three points, and we know we've found a local minimum if the distances `{pd2, pd1, index}` show that the middle value (`pd1`) is lower than the values on either side. When we do, we can set our "best guess related to `start`" as the index that belongs to that `pd1`. Of course, since we're not checking values relative to some `start` value, we might not find another candidate value at all, in which case we return `start - 1`, so that a simple "is the result less than `start`?" lets us determine that there are no more intersections to find.

So, the following graphic shows this off for the standard cubic curve (which you can move the coordinates around for, of course) and a circle with a controllable radius centered on the graphic's center, using the code approach described above.

<graphics-element title="circle intersection" src="./circle.js">
  <input type="range" min="1" max="150" step="1" value="70" class="slide-control">
</graphics-element>

And of course, for the full details, click that "view source" link.
