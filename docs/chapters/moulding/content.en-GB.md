# Manipulating a curve

Armed with knowledge of the "ABC" relation, we can now update a curve interactively, by letting people click anywhere on the curve, find the <em>t</em>-value matching that coordinate, and then letting them drag that point around. With every drag update we'll have a new point "B", which we can combine with the fixed point "C" to find our new point A. Once we have those, we can reconstruct the de Casteljau skeleton and thus construct a new curve with the same start/end points as the original curve, passing through the user-selected point B, with correct new control points.

<graphics-element title="Moulding a quadratic Bézier curve" width="825" src="./moulding.js" data-type="quadratic"></graphics-element>

Click-dragging a point on the curve shows what we're using to compute the new coordinates: while dragging you will see the original point `B` and its corresponding <i>t</i>-value, and the original points `A` and `C` for that <i>t</i>-value, in light coloring, as well as the new `A'`, `B'`, and `C'` (although of course the `C` coordinates are the same ones, because that's the defining feature of point `C`) based on where you're dragging point `B` to, in purple.

Since we know the new point `B'`, and the "new" point `C'` as well as the `t` value, we know our new point A' has to be:

\[
  A' = B' - \frac{C - B'}{ratio(t)} = B' + \frac{B' - C}{ratio(t)}
\]

For quadratic curves, this means we're done, since the new point `A'` is equivalent to the new quadratic control point.

For cubic curves, we need to do a little more work, because while computing a new `A'` is exactly the same as before, we're not quite done once we've done so. For cubic curves, `B` has not just an associated `t` value, but also two associated "side" values. Let's revisit the graphic from the chapter on de Casteljau's algorithm, to see what we mean:

<graphics-element title="The information necessary to manipulate cubic curves" src="./decasteljau.js">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>

In addition to the `A`, `B`, and `C` values, we also see the points `e1` and `e2`, without which constructing our de Casteljau "strut lines" becomes very difficult indeed; as well as the points `v1` and `v2`, which we can construct when we know our ABC values enriched with `e1` and `e2`:

\[
    \left \{ \begin{aligned}
    v_1 &= A' - \frac{A' - e_1}{1 - t} \\
    v_2 &= A' - \frac{A' - e_2}{t}
    \end{aligned} \right .
\]

After which computing the new control points is straight-forward:

\[
    \left \{ \begin{aligned}
    C_1' &= start + \frac{v_1 - start}{t} \\
    C_2' &= end + \frac{v_2 - end}{1 - t}
    \end{aligned} \right .
\]

So let's put that into practice:

<graphics-element title="Moulding a cubic Bézier curve" width="825" src="./moulding.js" data-type="cubic"></graphics-element>

So that looks pretty good, but you may not like having `e1` and `e2` stay the same distances away from `B'` while moving the point around, and want to rearrange those to lead to "cleaner looking" curve manipulation. Unfortunately, there are so many differen ways in which we can do this that figuring out "good looking" alternatives, given what the curve is being manipulated for, could be an entire book on its own... so we're only going to look at one way that you might effect alternative `e1` and `e2` points, based on the idea of rotating a vector.

If we treat point `B` as a "a vector originating at `C`" then we can treat the points `e1` and `e2` as offets (let's call these `d1` and `d2`) of that vector, where:

\[
  \left \{ \begin{aligned}
    e_1 &= B + d_1 \\
    e_2 &= B + d_2
  \end{aligned} \right .
\]

Which means that:

\[
  \left \{ \begin{aligned}
    d_1 &= e_1 - B\\
    d_2 &= e_2 - B
  \end{aligned} \right .
\]

Now, if we now `B` to some new coordinate `B'` we can treat that "moving of the coordinate" as a rotation and scaling of the vector for `B` instead. If the new point `B'` is the same distance away from `C` as `B` was, this is a pure rotation, but otherwise the length of the vector has decreased or increased by some factor.

We can use both those values to change where `e1` and `e2` end up, and thus how our curve moulding "feels", by placing new `e1'` and `e2'` where:

\[
  \left \{ \begin{aligned}
    angle &= atan2(B_y-C_y,B_x-C_x) - atan2(B_y\prime-C.y, B_x\prime-C.x) \\
    e_1' &= B' + scale \cdot rotate(d_1, B', angle) \\
    e_2' &= B' + scale \cdot rotate(d_2, B', angle)
  \end{aligned} \right .
\]

Here, the `rotate()` function rotates a vector (in this case `d1` or `d2`) around some point (in this case, `B'`), by some angle (in this case, the angle by which we rotated our original `B` to become `B'`). So what does _that_ look like?

<graphics-element title="Moulding a cubic Bézier curve" width="825" src="./moulding.js" data-type="cubic" data-alternative="true"></graphics-element>

As you can see, this is both better, and worse, depending on what you're trying to do with the curve, and there are many different ways in which you can try to change `e1` and `e2` such that they behave "as users would expect them to" based on the context in which you're implementing curve moulding. You might want to add reflections when `B'` crosses the baseline, or even some kind of weight-swapping when `B'` crosses the midline (perpendicular to the baseline, at its mid point), and instead of scaling both points with respects to `C`, you might want to scale them to coordinates 1/2rd and 2/3rd along the baseline, etc. etc.

There are too many options to go over here, so: the best behaviour is, of course, the behaviour _you_ think is best, and it might be a lot of work to find that and/or implement that!
