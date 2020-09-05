# Graduated curve offsetting

What if we want to do graduated offsetting, starting at some distance `s` but ending at some other distance `e`? Well, if we can compute the length of a curve (which we can if we use the Legendre-Gauss quadrature approach) then we can also determine how far "along the line" any point on the curve is. With that knowledge, we can offset a curve so that its offset curve is not uniformly wide, but graduated between with two different offset widths at the start and end.

Like normal offsetting we cut up our curve in sub-curves, and then check at which distance along the original curve each sub-curve starts and ends, as well as to which point on the curve each of the control points map. This gives us the distance-along-the-curve for each interesting point in the sub-curve. If we call the total length of all sub-curves seen prior to seeing "the current" sub-curve `S` (and if the current sub-curve is the first one, `S` is zero), and we call the full length of our original curve `L`, then we get the following graduation values:

- start: map `S` from interval (`0,L`) to interval `(s,e)`
- c1: `map(<strong>S+d1</strong>, 0,L, s,e)`, d1 = distance along curve to projection of c1
- c2: `map(<strong>S+d2</strong>, 0,L, s,e)`, d2 = distance along curve to projection of c2
- ...
- end: `map(<strong>S+length(subcurve)</strong>, 0,L, s,e)`

At each of the relevant points (start, end, and the projections of the control points onto the curve) we know the curve's normal, so offsetting is simply a matter of taking our original point, and moving it along the normal vector by the offset distance for each point. Doing so will give us the following result (these have with a starting width of 0, and an end width of 40 pixels, but can be controlled with your up and down arrow keys):

<graphics-element title="Offsetting a quadratic Bézier curve" src="./offsetting.js" data-type="quadratic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>

<graphics-element title="Offsetting a cubic Bézier curve" src="./offsetting.js" data-type="cubic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>
