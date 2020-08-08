# Bounding boxes

If we have the extremities, and the start/end points, a simple for loop that tests for min/max values for x and y means we have the four values we need to box in our curve:

*Computing the bounding box for a Bézier curve*:

1. Find all *t* value(s) for the curve derivative's x- and y-roots.
2. Discard any *t* value that's lower than 0 or higher than 1, because Bézier curves only use the interval [0,1].
3. Determine the lowest and highest value when plugging the values *t=0*, *t=1* and each of the found roots into the original functions: the lowest value is the lower bound, and the highest value is the upper bound for the bounding box we want to construct.

Applying this approach to our previous root finding, we get the following bounding boxes (with all curve extremity points shown on the curve):

<Graphic title="Quadratic Bézier bounding box" setup={this.setupQuadratic} draw={this.draw} />
<Graphic title="Cubic Bézier bounding box" setup={this.setupCubic} draw={this.draw} />

We can construct even nicer boxes by aligning them along our curve, rather than along the x- and y-axis, but in order to do so we first need to look at how aligning works.
