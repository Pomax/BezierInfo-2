# Component functions

One of the first things people run into when they start using Bézier curves in their own programs is "I know how to draw the curve, but how do I determine the bounding box?". It's actually reasonably straightforward to do so, but it requires having some knowledge on exploiting math to get the values we need. For bounding boxes, we aren't actually interested in the curve itself, but only in its "extremities": the minimum and maximum values the curve has for its x- and y-axis values. If you remember your calculus (provided you ever took calculus, otherwise it's going to be hard to remember) we can determine function extremities using the first derivative of that function, but this poses a problem, since our function is parametric: every axis has its own function.

The solution: compute the derivative for each axis separately, and then fit them back together in the same way we do for the original.

Let's look at how a parametric Bézier curve "splits up" into two normal functions, one for the x-axis and one for the y-axis. Note the leftmost figure is again an interactive curve, without labeled axes (you get coordinates in the graph instead).  The center and rightmost figures are the component functions for computing the x-axis value, given a value for <i>t</i> (between 0 and 1 inclusive), and the y-axis value, respectively.

If you move points in a curve sideways, you should only see the middle graph change; likewise, moving points vertically should only show a change in the right graph.

<graphics-element title="Quadratic Bézier curve components" width="825" src="./components.js" data-type="quadratic"></graphics-element>

&nbsp;

<graphics-element title="Cubic Bézier curve components" width="825" src="./components.js" data-type="cubic"></graphics-element>
