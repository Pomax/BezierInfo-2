# Curve inflections

Now that we know how to align a curve, there's one more thing we can calculate: inflection points. Imagine we have a variable size circle that we can slide up against our curve. We place it against the curve and adjust its radius so that where it touches the curve, the curvatures of the curve and the circle are the same, and then we start to slide the circle along the curve - for quadratic curves, we can always do this without the circle behaving oddly: we might have to change the radius of the circle as we slide it along, but it'll always sit against the same side of the curve.

But what happens with cubic curves? Imagine we have an S curve and we place our circle at the start of the curve, and start sliding it along. For a while we can simply adjust the radius and things will be fine, but once we get to the midpoint of that S, something odd happens: the circle "flips" from one side of the curve to the other side, in order for the curvatures to keep matching. This is called an inflection, and we can find out where those happen relatively easily.

What we need to do is solve a simple equation:

\[
  C(t) = 0
\]

What we're saying here is that given the curvature function *C(t)*, we want to know for which values of *t* this function is zero, meaning there is no "curvature", which will be exactly at the point between our circle being on one side of the curve, and our circle being on the other side of the curve. So what does *C(t)* look like? Actually something that seems not too hard:

\[
  C(t) = Bézier_x\prime(t) \cdot Bézier_y{\prime\prime}(t) - Bézier_y\prime(t) \cdot Bézier_x{\prime\prime}(t)
\]

The function *C(t)* is the cross product between the first and second derivative functions for the parametric dimensions of our curve. And, as already shown, derivatives of Bézier curves are just simpler Bézier curves, with very easy to compute new coefficients, so this should be pretty easy.

However as we've seen in the section on aligning, aligning lets us simplify things *a lot*, by completely removing the contributions of the first coordinate from most mathematical evaluations, and removing the last *y* coordinate as well by virtue of the last point lying on the x-axis. So, while we can evaluate *C(t) = 0* for our curve, it'll be much easier to first axis-align the curve and *then* evaluating the curvature function.

<div class="note">

### Let's derive the full formula anyway

Of course, before we do our aligned check, let's see what happens if we compute the curvature function without axis-aligning. We start with the first and second derivatives, given our basis functions:

\[
\begin{aligned}
  & Bézier(t) = x_1(1-t)^3 + 3x_2(1-t)^2t + 3x_3(1-t)t^2 + x_4t^3 \\
  & Bézier^\prime(t) = a(1-t)^2 + 2b(1-t)t + ct^2\  \left\{ a=3(x_2-x_1),b=3(x_3-x_2),c=3(x_4-x_3) \right\} \\
  & Bézier^{\prime\prime}(t) = u(1-t) + vt\ \left\{ u=2(b-a),v=2(c-b) \right\}\
\end{aligned}
\]

And of course the same functions for *y*:

\[
\begin{aligned}
  & Bézier(t) = y_1(1-t)^3 + 3y_2(1-t)^2t + 3y_3(1-t)t^2 + y_4t^3 \\
  & Bézier^\prime(t) = d(1-t)^2 + 2e(1-t)t + ft^2\\
  & Bézier^{\prime\prime}(t) = w(1-t) + zt
\end{aligned}
\]

Asking a computer to now compose the *C(t)* function for us (and to expand it to a readable form of simple terms) gives us this rather overly complicated set of arithmetic expressions:

\[
\begin{array}{lclclclclcl}
-18 t^2 x_2 y_1 &+& 36 t^2 x_3 y_1 &-& 18 t^2 x_4 y_1 &+& 18 t^2 x_1 y_2 &-& 54 t^2 x_3 y_2 &&\\
+36 t^2 x_4 y_2 &-& 36 t^2 x_1 y_3 &+& 54 t^2 x_2 y_3 &-& 18 t^2 x_4 y_3 &+& 18 t^2 x_1 y_4 &&\\
-36 t^2 x_2 y_4 &+& 18 t^2 x_3 y_4 &+& 36 t x_2 y_1   &-& 54 t x_3 y_1   &+& 18 t x_4 y_1 &-& 36 t x_1 y_2 \\
+54 t x_3 y_2   &-& 18 t x_4 y_2   &+& 54 t x_1 y_3   &-& 54 t x_2 y_3   &-& 18 t x_1 y_4 &+& 18 t x_2 y_4 \\
-18 x_2 y_1     &+& 18 x_3 y_1     &+& 18 x_1 y_2     &-& 18 x_3 y_2     &-& 18 x_1 y_3   &+& 18 x_2 y_3
\end{array}
\]

That is... unwieldy. So, we note that there are a lot of terms that involve multiplications involving x1, y1, and y4, which would all disappear if we axis-align our curve, which is why aligning is a great idea.

</div>

Aligning our curve so that three of the eight coefficients become zero, and observing that scale does not affect finding `t` values, we end up with the following simple term function for *C(t)*:

\[
  \left ( 3 x_3 y_2+2 x_4 y_2+3 x_2 y_3-x_4 y_3 \right ) t^2 + \left ( 3 x_3 y_2-x_4 y_2-3 x_2 y_3 \right ) t + \left ( x_2 y_3-x_3 y_2 \right )
\]

That's a lot easier to work with: we see a fair number of terms that we can compute and then cache, giving us the following simplification:

\[
  \left.\begin{matrix}
    a = x_3 \cdot y_2 \\
    b = x_4 \cdot y_2 \\
    c = x_2 \cdot y_3 \\
    d = x_4 \cdot y_3
  \end{matrix}\right\}
  \ C(t) = (-3a + 2b + 3c - d)t^2 + (3a - b - 3c)t + (c - a)
\]

This is a plain quadratic curve, and we know how to solve *C(t) = 0*; we use the quadratic formula:

\[
  \left.\begin{matrix}
    x =& -3a + 2b + 3c - d \\
    y =& 3a - b - 3c \\
    z =& c - a
  \end{matrix}\right\}
  \ C(t) = 0 \ \Rightarrow\ t = \frac{-y \pm \sqrt{y^2 - 4 x z}}{2x}
\]

We can easily compute this value *if* the discriminator isn't a negative number (because we only want real roots, not complex roots), and *if* *x* is not zero, because divisions by zero are rather useless.

Taking that into account, we compute *t*, we disregard any *t* value that isn't in the Bézier interval [0,1], and we now know at which *t* value(s) our curve will inflect.

<graphics-element title="Finding cubic Bézier curve inflections" src="./inflection.js"></graphics-element>
