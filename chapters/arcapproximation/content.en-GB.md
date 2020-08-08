# Approximating Bézier curves with circular arcs

Let's look at doing the exact opposite of the previous section: rather than approximating circular arc using Bézier curves, let's approximate Bézier curves using circular arcs.

We already saw in the section on circle approximation that this will never yield a perfect equivalent, but sometimes you need circular arcs, such as when you're working with fabrication machinery, or simple vector languages that understand lines and circles, but not much else.

The approach is fairly simple: pick a starting point on the curve, and pick two points that are further along the curve. Determine the circle that goes through those three points, and see if it fits the part of the curve we're trying to approximate. Decent fit? Try spacing the points further apart. Bad fit? Try spacing the points closer together. Keep doing this until you've found the "good approximation/bad approximation" boundary, record the "good" arc, and then move the starting point up to overlap the end point we previously found. Rinse and repeat until we've covered the entire curve.

So: step 1, how do we find a circle through three points? That part is actually really simple. You may remember (if you ever learned it!) that a line between two points on a circle is called a [chord](https://en.wikipedia.org/wiki/Chord_%28geometry%29), and one property of chords is that the line from the center of any chord, perpendicular to that chord, passes through the center of the circle.

So: if we have have three points, we have three (different) chords, and consequently, three (different) lines that go from those chords through the center of the circle. So we find the centers of the chords, find the perpendicular lines, find the intersection of those lines, and thus find the center of the circle.

The following graphic shows this procedure with a different colour for each chord and its associated perpendicular through the center. You can move the points around as much as you like, those lines will always meet!

<Graphic title="Finding a circle through three points" setup={this.setupCircle} draw={this.drawCircle} />

So, with the procedure on how to find a circle through three points, finding the arc through those points is straight-forward: pick one of the three points as start point, pick another as an end point, and the arc has to necessarily go from the start point, over the remaining point, to the end point.

So how can we convert a Bézier curve into a (sequence of) circular arc(s)?

- Start at <em>t=0</em>
- Pick two points further down the curve at some value <em>m = t + n</em> and <em>e = t + 2n</em>
- Find the arc that these points define
- Determine how close the found arc is to the curve:
  - Pick two additional points <em>e1 = t + n/2</em> and <em>e2 = t + n + n/2</em>.
  - These points, if the arc is a good approximation of the curve interval chosen, should
      lie <em>on</em> the circle, so their distance to the center of the circle should be the
      same as the distance from any of the three other points to the center.
  - For point points, determine the (absolute) error between the radius of the circle, and the
    <em>actual</em> distance from the center of the circle to the point on the curve.
  - If this error is too high, we consider the arc bad, and try a smaller interval.

The result of this is shown in the next graphic: we start at a guaranteed failure: s=0, e=1. That's the entire curve. The midpoint is simply at <em>t=0.5</em>, and then we start performing a [Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm).

1. We start with {0, 0.5, 1}
2. That'll fail, so we retry with the interval halved: {0, 0.25, 0.5}
  - If that arc's good, we move back up by half distance: {0, 0.375, 0.75}.
  - However, if the arc was still bad, we move <em>down</em> by half the distance: {0, 0.125, 0.25}.
3. We keep doing this over and over until we have two arcs found in sequence of which the first arc is good, and the second arc is bad. When we find that pair, we've found the boundary between a good approximation and a bad approximation, and we pick the former.

The following graphic shows the result of this approach, with a default error threshold of 0.5, meaning that if an arc is off by a <em>combined</em> half pixel over both verification points, then we treat the arc as bad. This is an extremely simple error policy, but already works really well. Note that the graphic is still interactive, and you can use your up and down arrow keys keys to increase or decrease the error threshold, to see what the effect of a smaller or larger error threshold is.

<Graphic title="Arc approximation of a Bézier curve" setup={this.setupCubic} draw={this.drawSingleArc} onKeyDown={this.props.onKeyDown} />

With that in place, all that's left now is to "restart" the procedure by treating the found arc's end point as the new to-be-determined arc's starting point, and using points further down the curve. We keep trying this until the found end point is for <em>t=1</em>, at which point we are done. Again, the following graphic allows for up and down arrow key input to increase or decrease the error threshold, so you can see how picking a different threshold changes the number of arcs that are necessary to reasonably approximate a curve:

<Graphic title="Arc approximation of a Bézier curve" setup={this.setupCubic} draw={this.drawArcs} onKeyDown={this.props.onKeyDown} />

So... what is this good for? Obviously, if you're working with technologies that can't do curves, but can do lines and circles, then the answer is pretty straightforward, but what else? There are some reasons why you might need this technique: using circular arcs means you can determine whether a coordinate lies "on" your curve really easily (simply compute the distance to each circular arc center, and if any of those are close to the arc radii, at an angle between the arc start and end, bingo, this point can be treated as lying "on the curve"). Another benefit is that this approximation is "linear": you can almost trivially travel along the arcs at fixed speed. You can also trivially compute the arc length of the approximated curve (it's a bit like curve flattening). The only thing to bear in mind is that this is a lossy equivalence: things that you compute based on the approximation are guaranteed "off" by some small value, and depending on how much precision you need, arc approximation is either going to be super useful, or completely useless. It's up to you to decide which, based on your application!
