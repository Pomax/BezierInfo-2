# Tangents and normals

If you want to move objects along a curve, or "away from" a curve, the two vectors you're most interested in are the tangent vector and normal vector for curve points. These are actually really easy to find. For moving and orienting along a curve, we use the tangent, which indicates the direction of travel at specific points, and is literally just the first derivative of our curve:

\[
\left \{ \begin{matrix}
  tangent_x(t) = B'_x(t) \\
  tangent_y(t) = B'_y(t)
\end{matrix} \right.
\]

This gives us the directional vector we want. We can normalize it to give us uniform directional vectors (having a length of 1.0) at each point, and then do whatever it is we want to do based on those directions:

\[
  d = || tangent(t) || = \sqrt{B'_x(t)^2 + B'_y(t)^2}
\]

\[
\left \{ \begin{matrix}
  \hat{x}(t) = || tangent_x(t) ||
             =\frac{tangent_x(t)}{ || tangent(t) || }
             = \frac{B'_x(t)}{d} \\
  \hat{y}(t) = || tangent_y(t) ||
             = \frac{tangent_y(t)}{ || tangent(t) || }
             = \frac{B'_y(t)}{d}
\end{matrix} \right.
\]

The tangent is very useful for moving along a line, but what if we want to move away from the curve instead, perpendicular to the curve at some point <i>t</i>? In that case we want the *normal* vector. This vector runs at a right angle to the direction of the curve, and is typically of length 1.0, so all we have to do is rotate the normalized directional vector and we're done:

\[
\left \{ \begin{array}{l}
  normal_x(t) = \hat{x}(t) \cdot \cos{\frac{\pi}{2}} - \hat{y}(t) \cdot \sin{\frac{\pi}{2}} = - \hat{y}(t) \\
  normal_y(t) = \underset{quarter\ circle\ rotation} {\underbrace{ \hat{x}(t) \cdot \sin{\frac{\pi}{2}} + \hat{y}(t) \cdot \cos{\frac{\pi}{2}} }} = \hat{x}(t)
\end{array} \right.
\]

<div class="note">

Rotating coordinates is actually very easy, if you know the rule for it. You might find it explained as "applying a [rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix), which is what we'll look at here, too. Essentially, the idea is to take the circles over which we can rotate, and simply "sliding the coordinates" over these circles by the desired
angle. If we want a quarter circle turn, we take the coordinate, slide it along the cirle by a quarter turn, and done.

To turn any point <i>(x,y)</i> into a rotated point <i>(x',y')</i> (over 0,0) by some angle φ, we apply this nice and easy computation:

\[\begin{array}{l}
  x' = x \cdot \cos(\phi) - y \cdot \sin(\phi) \\
  y' = x \cdot \sin(\phi) + y \cdot \cos(\phi)
\end{array}\]

Which is the "long" version of the following matrix transformation:

\[
  \begin{bmatrix}
    x' \\ y'
  \end{bmatrix}
  =
  \begin{bmatrix}
   \cos(\phi) & -\sin(\phi) \\
   \sin(\phi) & \cos(\phi)
  \end{bmatrix}
  \begin{bmatrix}
    x \\ y
  \end{bmatrix}
\]

And that's all we need to rotate any coordinate. Note that for quarter, half, and three-quarter turns these functions become even easier, since *sin* and *cos* for these angles are, respectively: 0 and 1, -1 and 0, and 0 and -1.

But ***why*** does this work? Why this matrix multiplication? [Wikipedia](https://en.wikipedia.org/wiki/Rotation_matrix#Decomposition_into_shears) (technically, Thomas Herter and Klaus Lott) tells us that a rotation matrix can be
treated as a sequence of three (elementary) shear operations. When we combine this into a single matrix operation (because all matrix multiplications can be collapsed), we get the matrix that you see above. [DataGenetics](https://datagenetics.com/blog/august32013/index.html) have an excellent article about this very thing: it's really quite cool, and I strongly recommend taking a quick break from this primer to read that article.

</div>

The following two graphics show the tangent and normal along a quadratic and cubic curve, with the direction vector coloured blue, and the normal vector coloured red (the markers are spaced out evenly as *t*-intervals, not spaced equidistant).

<div class="figure">
  <graphics-element title="Quadratic Bézier tangents and normals" src="./pointvectors.js" data-type="quadratic"></graphics-element>
  <graphics-element title="Cubic Bézier tangents and normals" src="./pointvectors.js" data-type="cubic"></graphics-element>
</div>
