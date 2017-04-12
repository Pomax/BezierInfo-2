# Getting 3D normals

Before we move on to the next section we need to spend a little bit of time on the difference between 2D and 3D, because while for many things this difference is irrelevant and the procedures are identical (for instance, getting the 3D tangent is just doing what we do for 2D, but for x, y, and z, instead of just for x and y), when it comes to normals things are a little more complex, and thus more work. Mind you, it's not "super hard", but there are more steps involved and we should have a look at those.

Getting normals in 3D is in principle the same as in 2D: we need to take the normalised tangent vector, and then rotate it by a quarter turn. However, this is where things get that little more complex: we can turn in quite a few directions, so we need to restrict the rotation to the plane that the tangent lies on. That might sound strange: tangents are themselves lines and lines simultaneously lie on an infinite number of planes, so what's up with that?

Well, we know more about the tangent: we also know its rate of change. Think of the Bezier curve as the path of a car. The curve itself tells us the "place in space" at any given time, and the first derivative at any point tells us the "speed of the car at that point". However, we know more: we also know the tangent at "some next moment in time", the second derivative tells us the "accelleration of the car at that point", and if we add the accelleration to the velocity, we know where the car will be "if the curve stopped changing": as long as the curve we're dealing with is not degenerate (that is to say: it isn't actually a pure 2D curve that we simply rotated in 3D) then at any point in time we know two vectors in the same plane, with a third vector in that same plane, and a fourth vector perpendicular that we don't know yet:

- **t**, the (normalized) vector for the direction of travel at some point B(t),
- **a**, the difference vector between "the tangent here" to what "the tangent at the next point" would be,
- **t'** = **t** + **a**, that (normalized) "tangent at the next point",
- **r**, a (normalized) vector aligned with the axis over which we can rotate **t** to overlap **t'**, and
- **n**, the normal at B(t).

The following graphic shows us some of those known and unknown vectors: when you mouse-over the graphic, you will see a point on the curve selected, showing **t** in green, **r** in blue, and **n** in red (note: all of them scaled to a uniform length). As you move across the graphic, you will see the point, and the corresponding vectors, move along the curve. Notice how the vectors rotate around the curve itself: by visualising them, we can see something that would otherwise be invisible to us: this curve twists!

<Graphic title="Some known and unknown vectors" setup={this.setup} draw={this.drawVectors}/>

All these vectors have the same origin (except for **a** but we only use that to find **t'**): our on-curve point. And that means we can quite easily compute the axis over which we need to rotate any of these vectors to overlap another. Since we know **t** and **t'**, we can compute that axis with some linear algebra, and then we're almost done, because as in the 2D case getting the normal is a question of rotating the (normalized) tangent by a quarter turn over our axis of rotation.

First up: we need to actually *find* that axis of rotation. As it turns out, this is quite easy: we just compute the [cross product](https://en.wikipedia.org/wiki/Cross_product#Mnemonic) of our two known vectors, and that will give us **r**:

\[
  r = \textit{normalize} \left ( t' \times t \right ) = \textit{normalize} \left ( \begin{bmatrix}
      t'_y \cdot t_z - t'_z \cdot t_y\\
      t'_z \cdot t_x - t'_x \cdot t_z\\
      t'_x \cdot t_y - t'_y \cdot t_x
  \end{bmatrix} \right )
\]

(Note that the order of operations matters for cross products: we compute **t'**×**t**, because if we compute **t**×**t'** we'll be computing the same axis of rotation, but represented by a vector in the opposite direction, so our final normal will actually be rotated a quarter turn "the wrong way". While correcting that is super easy, literally just taking our final normal and multiplying by -1, why correct after the fact what we can get it right from the start?)

Note that the cross product does not yield a normalized vector, so we have to do this manually. We already saw how to do this in the above section, though:

\[
  \textit{normalize}(v) = \frac{v}{\left \| v \right \|}
\]

Now we have everything we need: in order to turn our normalised tangent vectors into normal vectors, all we have to do is rotate them about the axes we just found by a quarter turn. If we turn them one way, we get normals, if we turn them the other, we get backfacing normals.

[Rotating about an axis is perhaps laborious, but not difficult](https://en.wikipedia.org/wiki/Rotation_matrix#Rotation_matrix_from_axis_and_angle), and much like in the 2D case, quarter turns in 3D greatly simplify the maths. To rotate a point a quarter turn over our rotation axis **r**, the rotation matrix is:

\[
  R = \begin{bmatrix}
       r^2_x     & r_x \cdot r_y - r_z  & r_x \cdot r_z + r_y \\
       r_x \cdot r_y + r_z &      r^2_y     & r_y \cdot r_z - r_x \\
       r_x \cdot r_z - r_y &  r_y \cdot r_z + r_x &     r^2_z
  \end{bmatrix}
\]

So that's still easy: just tell the computer to evaluate those nine values, and all that's left is a matrix multiplication to get our 3D normal:

\[
  n = R \cdot t
\]

Which means computing:

\[
  n =
  \begin{bmatrix}
       n_x \\
       n_y \\
       n_z
  \end{bmatrix}
  =
  \begin{bmatrix}
  t_x \cdot R_{1,1} + t_y \cdot R_{1,2} + t_z \cdot R_{1,3} \\
  t_x \cdot R_{2,1} + t_y \cdot R_{2,2} + t_z \cdot R_{2,3} \\
  t_x \cdot R_{3,1} + t_y \cdot R_{3,2} + t_z \cdot R_{3,3}
  \end{bmatrix}
\]

And with that, we have the normal vector(s) we were looking for. Perfect! And if we need backfacing normals, we can either effect those "from the start" by evaluating the cross product as **t**×**t'** as mentioned above, or we can multiply the normal vector we get here by -1.

So, let's look at the same graphic as above to see it all in action again, but this time with some projections turned on, so that you can see how different things are in 3D, compared to 2D: look at how the tangent and normal (and axis of rotation) change as you move along the curve in each projection: that doesn't look anything like what we'd see if we compute the normal purely in 2D!

<Graphic title="Appreciating 3D curve normals" setup={this.setup} draw={this.drawNormals}/>
