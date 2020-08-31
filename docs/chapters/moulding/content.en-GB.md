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
    v1 &= A' - \frac{A' - e1}{1 - t} \\
    v2 &= A' - \frac{A' - e2}{t}
    \end{aligned} \right .
\]

After which computing the new control points is straight-forward:

\[
    \left \{ \begin{aligned}
    C1' &= start + \frac{v1 - start}{t} \\
    C2' &= end + \frac{v2 - end}{1 - t}
    \end{aligned} \right .
\]

So let's put that into practice:

<graphics-element title="Moulding a cubic Bézier curve" width="825" src="./moulding.js" data-type="cubic"></graphics-element>

So that looks pretty good, but you may not like having `e1` and `e2` stay the same distances away from `B'` while moving the point around. An alternative is to scale the distances of `e1` and `e2` to `B'` to match the scaling that `A`--`C` undergoes as `A'`--`C`' - whether this looks better or not depends somewhat on your intention as programmer or user, of course, so the following graphic applies this scaling, but it's up to you to decide whether or not that looks better (or, more appropriately, under which circumstances you might want to apply this scaling vs. when you might not):

<graphics-element title="Moulding a cubic Bézier curve" width="825" src="./moulding.js" data-type="cubic" data-scaling="true"></graphics-element>

