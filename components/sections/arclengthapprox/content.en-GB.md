# Approximated arc length

Sometimes, we don't actually need the precision of a true arc length, and we can get away with simply computing the approximate arc length instead. The by far fastest way to do this is to flatten the curve and then simply calculate the linear distance from point to point. This will come with an error, but this can be made arbitrarily small by increasing the segment count.

If we combine the work done in the previous sections on curve flattening and arc length computation, we can implement these with minimal effort:

<Graphic preset="twopanel" title="Approximate quadratic curve arc length" setup={this.setupQuadratic} draw={this.draw} onKeyDown={this.props.onKeyDown} />
<Graphic preset="twopanel" title="Approximate cubic curve arc length" setup={this.setupCubic} draw={this.draw} onKeyDown={this.props.onKeyDown} />

Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You may notice that the error in length is actually pretty significant, even if the percentage is fairly low: if the number of segments used yields an error of 0.1% or higher, the flattened curve already looks fairly obviously flattened. And of course, the longer the curve, the more significant the error will be.
