#  Forming poly-Bézier curves

Much like lines can be chained together to form polygons, Bézier curves can be chained together to form poly-Béziers, and the only trick required is to make sure that:

1. the end point of each section is the starting point of the following section, and
2. the derivatives across that dual point line up.

Unless you want sharp corners, of course. Then you don't even need 2.

We'll cover three forms of poly-Bézier curves in this section. First, we'll look at the kind that just follows point 1. where the end point of a segment is the same point as the start point of the next segment. This leads to poly-Béziers that are pretty hard to work with, but they're the easiest to implement:

<graphics-element title="Unlinked quadratic poly-Bézier" src="./poly.js" data-type="quadratic" data-link="coordinate"></graphics-element>
<graphics-element title="Unlinked cubic poly-Bézier" src="./poly.js" data-type="cubic" data-link="coordinate"></graphics-element>

Dragging the control points around only affects the curve segments that the control point belongs to, and moving an on-curve point leaves the control points where they are, which is not the most useful for practical modelling purposes. So, let's add in the logic we need to make things a little better. We'll start by linking up control points by ensuring that the "incoming" derivative at an on-curve point is the same as it's "outgoing" derivative:

\[
  B'(1)_n = B'(0)_{n+1}
\]

We can effect this quite easily, because we know that the vector from a curve's last control point to its last on-curve point is equal to the derivative vector. If we want to ensure that the first control point of the next curve matches that, all we have to do is mirror that last control point through the last on-curve point. And mirroring any point A through any point B is really simple:

\[
  Mirrored = \left [
    \begin{matrix} B_x + (B_x - A_x) \\  B_y + (B_y - A_y) \end{matrix}
  \right ] = \left [
    \begin{matrix} 2B_x - A_x \\  2B_y - A_y \end{matrix}
  \right ]
\]

So let's implement that and see what it gets us. The following two graphics show a quadratic and a cubic poly-Bézier curve again, but this time moving the control points around moves others, too. However, you might see something unexpected going on for quadratic curves...

<graphics-element title="Connected quadratic poly-Bézier" src="./poly.js" data-type="quadratic" data-link="derivative"></graphics-element>
<graphics-element title="Connected cubic poly-Bézier" src="./poly.js" data-type="cubic" data-link="derivative"></graphics-element>

As you can see, quadratic curves are particularly ill-suited for poly-Bézier curves, as all the control points are effectively linked. Move one of them, and you move all of them. Not only that, but if we move the on-curve points, it's possible to get a situation where a control point cannot satisfy the constraint that it's the reflection of its two neighbouring control points... This means that we cannot use quadratic poly-Béziers for anything other than really, really simple shapes. And even then, they're probably the wrong choice. Cubic curves are pretty decent, but the fact that the derivatives are linked means we can't manipulate curves as well as we might if we relaxed the constraints a little.

So: let's relax the requirement a little.

We can change the constraint so that we still preserve the *angle* of the derivatives across sections (so transitions from one section to the next will still look natural), but give up the requirement that they should also have the same *vector length*. Doing so will give us a much more useful kind of poly-Bézier curve:

<graphics-element title="Angularly connected quadratic poly-Bézier" src="./poly.js" data-type="quadratic" data-link="direction"></graphics-element>
<graphics-element title="Angularly connected cubic poly-Bézier" src="./poly.js" data-type="cubic" data-link="direction"></graphics-element>

Cubic curves are now better behaved when it comes to dragging control points around, but the quadratic poly-Bézier still has the problem that moving one control points will move the control points and may ending up defining "the next" control point in a way that doesn't work. Quadratic curves really aren't very useful to work with...

Finally, we also want to make sure that moving the on-curve coordinates preserves the relative positions of the associated control points. With that, we get to the kind of curve control that you might be familiar with from applications like Photoshop, Inkscape, Blender, etc.

<graphics-element title="Standard connected quadratic poly-Bézier" src="./poly.js" data-type="quadratic" data-link="conventional"></graphics-element>
<graphics-element title="Standard connected cubic poly-Bézier" src="./poly.js" data-type="cubic"  data-link="conventional"></graphics-element>

Again, we see that cubic curves are now rather nice to work with, but quadratic curves have a new, very serious problem: we can move an on-curve point in such a way that we can't compute what needs to "happen next". Move the top point down, below the left and right points, for instance. There is no way to preserve correct control points without a kink at the bottom point. Quadratic curves: just not that good...

A final improvement is to offer fine-level control over which points behave which, so that you can have "kinks" or individually controlled segments when you need them, with nicely well-behaved curves for the rest of the path. Implementing that, is left as an exercise for the reader.
