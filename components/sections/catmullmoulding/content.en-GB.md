# Creating a Catmull-Rom curve from three points

Now, we saw how to fit a Bézier curve to three points, but if Catmull-Rom curves go through points, why can't we just use those to do curve fitting, instead?

As a matter of fact, we can, but there's a difference between the kind of curve fitting we did in the previous section, and the kind of curve fitting that we can do with Catmull-Rom curves. In the previous section we came up with a single curve that goes through three points. There was a decent amount of maths and computation involved, and the end result was three or four coordinates that described a single curve, depending on whether we were fitting a quadratic or cubic curve.

Using Catmull-Rom curves, we need virtually no computation, but even though we end up with one Catmull-Rom curve of <i>n</i> points, in order to draw the equivalent curve using cubic Bézier curves we need a massive <i>3n-1</i> points (and that's without double-counting points that are shared by consecutive cubic curves).

In the following graphic, on the left we see three points that we want to draw a Catmull-Rom curve through (which we can move around freely, by the way), with in the second panel some of the "interesting" Catmull-Rom information: in black there's the baseline start--end, which will act as tangent orientation for the curve at point p2. We also see a virtual point p0 and p4, which are initially just point p2 reflected over the baseline. However, by using the up and down cursor key we can offset these points parallel to the baseline. Why would we want to do this? Because the line p0--p2 acts as departure tangent at p1, and the line p2--p4 acts as arrival tangent at p3. Play around with the graphic a bit to get an idea of what all of that meant:

<Graphic preset="threepanel" title="Catmull-Rom curve fitting" setup={this.setup} draw={this.draw} onKeyDown={this.props.onKeyDown}/>

As should be obvious by now, Catmull-Rom curves are great for "fitting a curvature to some points", but if we want to convert that curve to Bézier form we're going to end up with a lot of separate (but visually joined) Bézier curves. Depending on what we want to do, that'll be either unnecessary work, or exactly what we want: which it is depends entirely on you.
