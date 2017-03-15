# Projecting a point onto a Bézier curve

Say we have a Bézier curve and some point, not on the curve, of which we want to know which `t` value on the curve gives us an on-curve point closest to our off-curve point. Or: say we want to find the projection of a random point onto a curve. How do we do that?

If the Bézier curve is of low enough order, we might be able to [work out the maths for how to do this](http://jazzros.blogspot.ca/2011/03/projecting-point-on-bezier-curve.html), and get a perfect `t` value back, but in general this is an incredibly hard problem and the easiest solution is, really, a numerical approach again. We'll be finding our ideal `t` value using a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm). First, we do a coarse distance-check based on `t` values associated with the curve's "to draw" coordinates (using a lookup table, or LUT). This is pretty fast. Then we run this algorithm:

1. with the `t` value we found, start with some small interval around `t` (1/length_of_LUT on either side is a reasonable start),
2. if the distance to `t ± interval/2` is larger than the distance to `t`, try again with the interval reduced to half its original length.
3. if the distance to `t ± interval/2` is smaller than the distance to `t`, replace `t` with the smaller-distance value.
4. after reducing the interval, or changing `t`, go back to step 1.

We keep repeating this process until the interval is small enough to claim the difference in precision found is irrelevant for the purpose we're trying to find `t` for. In this case, I'm arbitrarily fixing it at 0.0001.

The following graphic demonstrates the result of this procedure.Simply move the cursor around, and if it does not lie on top of the curve, you will see a line that projects the cursor onto the curve based on an iteratively found "ideal" `t` value.

<Graphic preset="simple" title="Projecting a point onto a Bézier curve" setup={this.setup} draw={this.draw} onMouseMove={this.onMouseMove}/>
