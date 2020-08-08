# Tracing a curve at fixed distance intervals

Say you want to draw a curve with a dashed line, rather than a solid line, or you want to move something along the curve at fixed distance intervals over time, like a train along a track, and you want to use Bézier curves.

Now you have a problem.

The reason you have a problem is that Bézier curves are parametric functions with non-linear behaviour, whereas moving a train along a track is about as close to a practical example of linear behaviour as you can get. The problem we're faced with is that we can't just pick *t* values at some fixed interval and expect the Bézier functions to generate points that are spaced a fixed distance apart. In fact, let's look at the relation between "distance long a curve" and "*t* value", by plotting them against one another.

The following graphic shows a particularly illustrative curve, and it's length-to-t plot. For linear traversal, this line needs to be straight, running from (0,0) to (length,1). This is, it's safe to say, not what we'll see, we'll see something wobbly instead. To make matters even worse, the length-to-*t* function is also of a much higher order than our curve is: while the curve we're using for this exercise is a cubic curve, which can switch concave/convex form once at best, the plot shows that the distance function along the curve is able to switch forms three times (to see this, try creating an S curve with the start/end close together, but the control points far apart).

<Graphic title="The t-for-distance function" setup={this.setup} draw={this.plotOnly}/>

We see a function that might be invertible, but we won't be able to do so, symbolically. You may remember from the section on arc length that we cannot actually compute the true arc length function as an expression of *t*, which means we also can't compute the true inverted function that gives *t* as an expression of length. So how do we fix this?

One way is to do what the graphic does: simply run through the curve, determine its *t*-for-length values as a set of discrete values at some high resolution (the graphic uses 100 discrete points), and then use those as a basis for finding an appropriate *t* value, given a distance along the curve. This works quite well, actually, and is fairly fast.

We can use some colour to show the difference between distance-based and time based intervals: the following graph is similar to the previous one, except it segments the curve in terms of equal-distance intervals. This shows as regular colour intervals going down the graph, but the mapping to *t* values is not linear, so there will be (highly) irregular intervals along the horizontal axis. It also shows the curve in an alternating colouring based on the t-for-distance values we find our LUT:

<Graphic title="Fixed-interval coloring a curve" setup={this.setup} draw={this.drawColoured} onKeyDown={this.props.onKeyDown}/>

Use your up and down arrow keys to increase or decrease the number of equidistant segments used to colour the curve.

However, are there better ways? One such way is discussed in "[Moving Along a Curve with Specified Speed](http://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf)" by David Eberly of Geometric Tools, LLC, but basically because we have no explicit length function (or rather, one we don't have to constantly compute for different intervals), you may simply be better off with a traditional lookup table (LUT).
