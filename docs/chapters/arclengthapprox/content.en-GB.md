# Approximated arc length

Sometimes, we don't actually need the precision of a true arc length, and we can get away with simply computing the approximate arc length instead. The by far fastest way to do this is to flatten the curve and then simply calculate the linear distance from point to point. This will come with an error, but this can be made arbitrarily small by increasing the segment count.

If we combine the work done in the previous sections on curve flattening and arc length computation, we can implement these with minimal effort:

<div class="figure">

<graphics-element title="Approximate quadratic curve arc length" src="./approximate.js" data-type="quadratic">
    <input type="range" min="2" max="24" step="1" value="4" class="slide-control">
</graphics-element>

<graphics-element title="Approximate cubic curve arc length" src="./approximate.js" data-type="cubic">
    <input type="range" min="2" max="32" step="1" value="8" class="slide-control">
</graphics-element>

</div>

You may notice that even though the error in length is actually pretty significant in absolute terms, even at a low number of segments we get a length that agrees with the true length when it comes to just the integer part of the arc length. Quite often, approximations can drastically speed things up!
