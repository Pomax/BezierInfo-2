# Projecting a point onto a Bézier curve

Before we can move on to actual curve molding, it'll be good if know how to actually be able to find "some point on the curve" that we're trying to click on. After all, if all we have is our Bézier coordinates, that is not in itself enough to figure out which point on the curve our cursor will be closest to. So, how do we project points onto a curve?

If the Bézier curve is of low enough order, we might be able to [work out the maths for how to do this](https://web.archive.org/web/20140713004709/http://jazzros.blogspot.com/2011/03/projecting-point-on-bezier-curve.html), and get a perfect `t` value back, but in general this is an incredibly hard problem and the easiest solution is, really, a numerical approach again. We'll be finding our ideal `t` value using a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm). First, we do a coarse distance-check based on `t` values associated with the curve's "to draw" coordinates (using a lookup table, or LUT). This is pretty fast:

```
p = some point to project onto the curve
d = some initially huge value
i = 0
for (coordinate, index) in LUT:
  if distance(coordinate, p) < d:
    d = distance(coordinate, p)
    i = index
```

After this runs, we know that `LUT[i]` is the coordinate on the curve _in our LUT_ that is closest to the point we want to project, so that's a pretty good initial guess as to what the best projection onto our curve is. To refine it, we note that LUT[i] is a better guess than both LUT[i-1] and LUT[i+1], but there might be an even better projection _somewhere else_ between those two  values, so that's what we're going to be testing for, using a variation of the binary search.

1. we start with our point `p`, and the `t` values `t1=LUT[i-1].t` and `t2=LUT[i+1].t`, which span an interval `v = t2-t1`.
2. we test this interval in five spots: the start, middle, and end (which we already have), and the two points in between the middle and start/end points
3. we then check which of these five points is the closest to our original point `p`, and then repeat step 1 with the points before and after the closest point we just found.

This makes the interval we check smaller and smaller at each iteration, and we can keep running the three steps until the interval becomes so small as to lead to distances that are, for all intents and purposes, the same for all points.

So, let's see that in action: in this case, I'm going to arbitrarily say that if we're going to run the loop until the interval is smaller than 0.001, and show you what that means for projecting your mouse cursor or finger tip onto a rather complex Bézier curve (which, of course, you can reshape as you like). Also shown are the original three points that our coarse check finds.

<graphics-element title="Projecting a point onto a Bézier curve" width="400" height="400" src="./project.js"></graphics-element>
