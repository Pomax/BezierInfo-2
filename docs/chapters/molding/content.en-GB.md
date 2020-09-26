# Molding a curve

Armed with knowledge of the "ABC" relation, point-on-curve projection, and guestimating reasonable looking helper values for cubic curve construction, we can finally cover curve molding: updating a curve's shape interactively, by dragging points on the curve around.

For quadratic curve, this is a really simple trick: we project our cursor onto the curve, which gives us a `t` value and initial `B` coordinate. We don't even need the latter: with our `t` value and "wherever the cursor is" as target `B`, we can compute the associated `C`:

\[
  C = u(t)_{q} \cdot Start + \left ( 1-u(t)_{q} \right ) \cdot End
\]

And then the associated `A`:

\[
  A = B - \frac{C - B}{ratio(t)_{q}} = B + \frac{B - C}{ratio(t)_{q}}
\]

And we're done, because that's our new quadratic control point!

<graphics-element title="Molding a quadratic Bézier curve" width="825" src="./molding.js" data-type="quadratic"></graphics-element>

As before, cubic curves are a bit more work, because while it's easy to find our initial `t` value and ABC values, getting those all-important `e1` and `e2` coordinates is going to pose a bit of a problem... in the section on curve creation, we were free to pick an appropriate `t` value ourselves, which allowed us to find appropriate `e1` and `e2` coordinates. That's great, but when we're curve molding we don't have that luxury: whatever point we decide to start moving around already has its own `t` value, and its own `e1` and `e2` values, and those may not make sense for the rest of the curve.

For example, let's see what happens if we just "go with what we get" when we pick a point and start moving it around, preserving its `t` value and `e1`/`e2` coordinates:

<graphics-element title="Molding a cubic Bézier curve" width="825" src="./molding.js" data-type="cubic"></graphics-element>

That looks reasonable, close to the original point, but the further we drag our point, the less "useful" things become. Especially if we drag our point across the baseline, rather than turning into a nice curve.

One way to combat this might be to combine the above approach with the approach from the [creating curves](#pointcurves) section: generate both the "unchanged `t`/`e1`/`e2`" curve, as well as the "idealized" curve through the start/cursor/end points, with idealized `t` value, and then interpolating between those two curves:

<graphics-element title="Molding a cubic Bézier curve" width="825" src="./molding.js" data-type="cubic" data-interpolated="true">
  <input type="range" min="10" max="200" step="1" value="100" class="slide-control">
</graphics-element>

The slide controls the "falloff distance" relative to where the original point on the curve is, so that as we drag our point around, it interpolates with a bias towards "preserving `t`/`e1`/`e2`" closer to the original point, and bias towards "idealized" form the further away we move our point, with anything that's further than our falloff distance simply _being_ the idealized curve. We don't even try to interpolate at that point.

A more advanced way to try to smooth things out is to implement _continuous_ molding, where we constantly update the curve as we move around, and constantly change what our `B` point is, based on constantly projecting the cursor on the curve _as we're updating it_ - this is, you won't be surprised to learn, tricky, and beyond the scope of this section: interpolation (with a reasonable distance) will do for now!
