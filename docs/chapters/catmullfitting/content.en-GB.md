# Creating a Catmull-Rom curve from three points

Much shorter than the previous section: we saw that Catmull-Rom curves need at least 4 points to draw anything sensible, so how do we create a Catmull-Rom curve from three points?

Short and sweet: we don't.

We run through the maths that lets us [create a cubic Bézier curve](#pointcurves), and then convert its coordinates to Catmull-Rom form using the conversion formulae we saw above.
