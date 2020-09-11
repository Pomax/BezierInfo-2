# Tracing a curve at fixed distance intervals

Say you want to draw a curve with a dashed line, rather than a solid line, or you want to move something along the curve at fixed distance intervals over time, like a train along a track, and you want to use Bézier curves.

Now you have a problem.

The reason you have a problem is that Bézier curves are parametric functions with non-linear behaviour, whereas moving a train along a track is about as close to a practical example of linear behaviour as you can get. The problem we're faced with is that we can't just pick `t` values at some fixed interval and expect the Bézier functions to generate points that are spaced a fixed distance apart. In fact, let's look at the relation between "distance long a curve" and "`t` value", by plotting them against one another.

The following graphic shows a particularly illustrative curve, and it's distance-for-t plot. For linear traversal, this line needs to be straight, running from (0,0) to (length,1). That is, it's safe to say, not what we'll see: we'll see something very wobbly, instead. To make matters even worse, the distance-for-t function is also of a much higher order than our curve is: while the curve we're using for this exercise is a cubic curve, which can switch concave/convex form twice at best, the distance function is our old friend the arc length function, which can have more inflection points.

<graphics-element title="The t-for-distance function" width="550" src="./distance-function.js"></graphics-element>

So, how do we "cut up" the arc length function at regular intervals, when we can't really work with it? We basically cheat: we run through the curve using `t` values, determine the distance-for-this-`t`-value at each point we generate during the run, and then we find "the closest `t` value that matches some required distance" using those values instead. If we have a low number of points sampled, we can then even refine which `t` value "should" work for our desired distance by interpolating between two points, but if we have a high enough number of samples, we don't even need to bother.

So let's do exactly that: the following graph is similar to the previous one, showing how we would have to "chop up" our distance-for-t curve in order to get regularly spaced points on the curve. It also shows what using those `t` values on the real curve looks like, by coloring each section of curve between two distance markers differently:

<graphics-element title="Fixed-interval coloring a curve" width="825" src="./tracing.js">
  <input type="range" min="2" max="24" step="1" value="8" class="slide-control">
</graphics-element>

Use the slider to increase or decrease the number of equidistant segments used to colour the curve.

However, are there better ways? One such way is discussed in "[Moving Along a Curve with Specified Speed](https://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf)" by David Eberly of Geometric Tools, LLC, but basically because we have no explicit length function (or rather, one we don't have to constantly compute for different intervals), you may simply be better off with a traditional lookup table (LUT).
