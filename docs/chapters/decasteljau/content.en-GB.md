# de Casteljau's algorithm

If we want to draw Bézier curves, we can run through all values of `t` from 0 to 1 and then compute the weighted basis function at each value, getting the `x/y` values we need to plot. Unfortunately, the more complex the curve gets, the more expensive this computation becomes. Instead, we can use *de Casteljau's algorithm* to draw curves. This is a geometric approach to curve drawing, and it's really easy to implement. So easy, in fact, you can do it by hand with a pencil and ruler.

Rather than using our calculus function to find `x/y` values for `t`, let's do this instead:

- treat `t` as a ratio (which it is). t=0 is 0% along a line, t=1 is 100% along a line.
- Take all lines between the curve's defining points. For an order `n` curve, that's `n` lines.
- Place markers along each of these line, at distance `t`. So if `t` is 0.2, place the mark at 20% from the start, 80% from the end.
- Now form lines between `those` points. This gives `n-1` lines.
- Place markers along each of these line at distance `t`.
- Form lines between `those` points. This'll be `n-2` lines.
- Place markers, form lines, place markers, etc.
- Repeat this until you have only one line left. The point `t` on that line coincides with the original curve point at `t`.

To see this in action, mouse-over the following sketch. Moving the mouse changes which curve point is explicitly evaluated using de Casteljau's algorithm, moving the cursor left-to-right (or, of course, right-to-left), shows you how a curve is generated using this approach.

<graphics-element title="Traversing a curve using de Casteljau's algorithm" src="./decasteljau.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

<div class="howtocode">

### How to implement de Casteljau's algorithm

Let's just use the algorithm we just specified, and implement that:

```
function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)
```

And done, that's the algorithm implemented. Except usually you don't get the luxury of overloading the "+" operator, so let's also give the code for when you need to work with `x` and `y` values:

```
function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      x = (1-t) * points[i].x + t * points[i+1].x
      y = (1-t) * points[i].y + t * points[i+1].y
      newpoints[i] = new point(x,y)
    drawCurve(newpoints, t)
```

So what does this do? This draws a point, if the passed list of points is only 1 point long. Otherwise it will create a new list of points that sit at the <i>t</i> ratios (i.e. the "markers" outlined in the above algorithm), and then call the draw function for this new list.

</div>

