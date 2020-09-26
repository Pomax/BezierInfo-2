# Curve fitting

Given the previous section, one question you might have is "what if I don't want to guess `t` values?". After all, plenty of graphics packages do automated curve fitting, so how can we implement that in a way that just finds us reasonable `t` values all on its own?

And really this is just a variation on the question "how do I get the curve through these X points?", so let's look at that. Specifically, let's look at the answer: "curve fitting". This is in fact a rather rich field in geometry, applying to anything from data modelling to path abstraction to "drawing", so there's a fair number of ways to do curve fitting, but we'll look at one of the most common approaches: something called a [least squares](https://en.wikipedia.org/wiki/Least_squares) [polynomial regression](https://en.wikipedia.org/wiki/Polynomial_regression). In this approach, we look at the number of points we have in our data set, roughly determine what would be an appropriate order for a curve that would fit these points, and then tackle the question "given that we want an `nth` order curve, what are the coordinates we can find such that our curve is "off" by the least amount?".

Now, there are many ways to determine how "off" points are from the curve, which is where that "least squares" term comes in. The most common tool in the toolbox is to minimise the _squared distance_ between each point we have, and the corresponding point on the curve we end up "inventing". A curve with a snug fit will have zero distance between those two, and a bad fit will have non-zero distances between every such pair. It's a workable metric. You might wonder why we'd need to square, rather than just ensure that distance is a positive value (so that the total error is easy to compute by just summing distances) and the answer really is "because it tends to be a little better". There's lots of literature on the web if you want to deep-dive the specific merits of least squared error metrics versus least absolute error metrics, but those are <em>well</em> beyond the scope of this material.

So let's look at what we end up with in terms of curve fitting if we start with the idea of performing least squares Bézier fitting. We're going to follow a procedure similar to the one described by Jim Herold over on his ["Least Squares Bézier Fit"](https://web.archive.org/web/20180403213813/http://jimherold.com/2012/04/20/least-squares-bezier-fit/) article, and end with some nice interactive graphics for doing some curve fitting.

Before we begin, we're going to use the curve in matrix form. In the [section on matrices](#matrix), I mentioned that some things are easier if we use the matrix representation of a Bézier curve rather than its calculus form, and this is one of those things.

As such, the first step in the process is expressing our Bézier curve as powers/coefficients/coordinate matrix **T x M x C**, by expanding the Bézier functions.

<div class="note">

## Revisiting the matrix representation

Rewriting Bézier functions to matrix form is fairly easy, if you first expand the function, and then arrange them into a multiple line form, where each line corresponds to a power of t, and each column is for a specific coefficient. First, we expand the function:

\[
  \begin{aligned}
    B_{quadratic} & = a (1-t)^2 + 2 b (1-t) t + c t^2 \\
                  & = a - 2at + at^2 + 2bt - 2bt^2 + ct^2
  \end{aligned}
\]

And then we (trivially) rearrange the terms across multiple lines:

\[
  \begin{aligned}
    B_{quadratic} &=& a      &         &     \\
                  & & - 2at  & + 2bt   &     \\
                  & & + at^2 & - 2bt^2 & + ct^2
  \end{aligned}
\]

This rearrangement has "factors of t" at each row (the first row is t⁰, i.e. "1", the second row is t¹, i.e. "t", the third row is t²) and "coefficient" at each column (the first column is all terms involving "a", the second all terms involving "b", the third all terms involving "c").

With that arrangement, we can easily decompose this as a matrix multiplication:

\[
  \begin{aligned}
    B_{quadratic} &= T \cdot M \cdot C
      =
      \begin{bmatrix}1 & t & t^2 \end{bmatrix}
      \cdot
      \begin{bmatrix}
         a &  0 & 0 \\
       -2a & 2b & 0 \\
         a &-2b & c
      \end{bmatrix}
      =
      \begin{bmatrix}1 & t & t^2 \end{bmatrix}
      \cdot
      \begin{bmatrix}
         1 & 0 & 0 \\
        -2 & 2 & 0 \\
         1 &-2 & 1
      \end{bmatrix}
      \cdot
      \begin{bmatrix}a  \\ b \\ c \end{bmatrix}
  \end{aligned}
\]

We can do the same for the cubic curve, of course. We know the base function for cubics:

\[
  \begin{aligned}
    B_{cubic} & = & a(1-t)^3 + 3b(1-t)^2 t + 3c(1-t)t^2 + dt^3
  \end{aligned}
\]

So we write out the expansion and rearrange:

\[
  \begin{aligned}
    B_{cubic} & = & a        &          &          &   \\
              &   & - 3at    & + 3bt    &          &   \\
              &   & + 3at^2  & - 6bt^2  & +3ct^2   &   \\
              &   & - at^3   & + 3bt^3  & -3ct^3   & + dt^3
  \end{aligned}
\]

Which we can then decompose:

\[
  \begin{aligned}
    B_{cubic} &= T \cdot M \cdot C =
      \begin{bmatrix}1 & t & t^2 & t^3 \end{bmatrix}
      \cdot
      \begin{bmatrix}
        1 & 0 & 0 & 0 \\
       -3 & 3 & 0 & 0 \\
        3 &-6 & 3 & 0 \\
       -1 & 3 &-3 & 1
      \end{bmatrix}
      \cdot
      \begin{bmatrix}a  \\ b \\ c \\ d \end{bmatrix}
  \end{aligned}
\]

And, of course, we can do this for quartic curves too (skipping the expansion step):

\[
  \begin{aligned}
    B_{quartic} &= T \cdot M \cdot C =
      \begin{bmatrix}1 & t & t^2 & t^3 & t^4 \end{bmatrix}
      \cdot
      \begin{bmatrix}
        1 &   0 &   0 &  0 & 0 \\
       -4 &   4 &   0 &  0 & 0 \\
        6 & -12 &   6 &  0 & 0 \\
       -4 &  12 & -12 &  4 & 0 \\
        1 &  -4 &   6 & -4 & 1
      \end{bmatrix}
      \cdot
      \begin{bmatrix}a  \\ b \\ c \\ d \\ e \end{bmatrix}
  \end{aligned}
\]

And so and on so on. Now, let's see how to use these **T**, **M**, and **C**, to do some curve fitting.

</div>

Let's get started: we're going to assume we picked the right order curve: for `n` points we're fitting an `n-1`<sup>th</sup> order curve, so we "start" with a vector **P** that represents the coordinates we already know, and for which we want to do curve fitting:

\[
  P = \begin{bmatrix} p_1 \\ p_2 \\ ... \\ p_n \end{bmatrix}
\]

Next, we need to figure out appropriate `t` values for each point in the curve, because we need something that lets us tie "the actual coordinate" to "some point on the curve". There's a fair number of different ways to do this (and a large part of optimizing "the perfect fit" is about picking appropriate `t` values), but in this case let's look at two "obvious" choices:

1. equally spaced `t` values, and
2. `t` values that align with distance along the polygon.

The first one is really simple: if we have `n` points, then we'll just assign each point `i` a `t` value of `(i-1)/(n-1)`. So if we have four points, the first point will have `t=(1-1)/(4-1)=0/3`, the second point will have `t=(2-1)/(4-1)=1/3`, the third point will have `t=2/3`, and the last point will be `t=1`. We're just straight up spacing the `t` values to match the number of points we have.

The second one is a little more interesting: since we're doing polynomial regression, we might as well exploit the fact that our base coordinates just constitute a collection of line segments. At the first point, we're fixing t=0, and the last point, we want t=1, and anywhere in between we're simply going to say that `t` is equal to the distance along the polygon, scaled to the [0,1] domain.

To get these values, we first compute the general "distance along the polygon" matrix:

\[
  D = \begin{bmatrix}d_1 & d_2 & ... & d_n \end{bmatrix}, \textit{ where }
  \left \{
  \begin{matrix}
    d_1 = 0 \\
    d_i = d_{i-1} + \textit{length}(p_{i-1}, p_i)
  \end{matrix}
  \right.
\]

Where  `length()` is literally just that: the length of the line segment between the point we're looking at, and the previous point. This isn't quite enough, of course: we still need to make sure that all the values between `i=1` and `i=n` fall in the [0,1] interval, so we need to scale all values down by whatever the total length of the polygon is:

\[
  \begin{aligned}
    S = \begin{bmatrix}s_1 & s_2 & ... & s_n \end{bmatrix}, \textit{ where }
  \left \{
  \begin{matrix}
    s_1 = 0 \\
    s_i = d_i / d_n \\
    s_n = 1
  \end{matrix}
  \right.
  \end{aligned}
\]

And now we can move on to the actual "curve fitting" part: what we want is a function that lets us compute "ideal" control point values such that if we build a Bézier curve with them, that curve passes through all our original points. Or, failing that, have an overall error distance that is as close to zero as we can get it. So, let's write out what the error distance looks like.

As mentioned before, this function is really just "the distance between the actual coordinate, and the coordinate that the curve evaluates to for the associated `t` value", which we'll square to get rid of any pesky negative signs:

\[
  E(C)_i = \left ( p_i - Bézier(s_i) \right )^2
\]

Since this function only deals with individual coordinates, we'll need to sum over all coordinates in order to get the full error function. So, we literally just do that; the total error function is simply the sum of all these individual errors:

\[
  E(C) = \sum^n_{i=1} \left ( p_i - Bézier(s_i) \right )^2
\]

And here's the trick that justifies using matrices: while we can work with individual values using calculus, with matrices we can compute as many values as we make our matrices big, all at the "same time", We can replace the individual terms p<sub>i</sub> with the full **P** coordinate matrix, and we can replace Bézier(s<sub>i</sub>) with the matrix representation **T x M x C** we talked about before, which gives us:

\[
  E(C) = \left ( P - TMC \right )^2
\]

In which we can replace the rather cumbersome "squaring" operation with a more conventional matrix equivalent:

\[
  E(C) = \left ( P - TMC \right )^T \left ( P - TMC \right )
\]

Here, the letter `T` is used instead of the number 2, to represent the [matrix transpose](https://en.wikipedia.org/wiki/Transpose); each row in the original matrix becomes a column in the transposed matrix instead (row one becomes column one, row two becomes column two, and so on).

This leaves one problem: **T** isn't actually the matrix we want: we don't want symbolic `t` values, we want the actual numerical values that we computed for **S**, so we need to form a new matrix, which we'll call 𝕋, that makes use of those, and then use that 𝕋 instead of **T** in our error function:

\[
𝕋 = \begin{bmatrix}
 s^0_1 & s^1_1 & ... & s^{n-2}_1 & s^{n-1}_1 \\
       &       &     &     &        \\
\vdots &       & ... &     & \vdots \\
       &       &     &     &        \\
 s^0_n & s^1_n & ... & s^{n-2}_n &  s^{n-1}_n
\end{bmatrix}
\]

Which, because of the first and last values in **S**, means:

\[
𝕋 = \begin{bmatrix}
 1      &       0 & ... &             0 &             0 \\
 1      &     s_2 &    &     s^{n-2}_2 &     s^{n-1}_2 \\
 \vdots &         & ... &               &        \vdots \\
 1      & s_{n-1} &    & s^{n-2}_{n-1} & s^{n-1}_{n-1} \\
 1      &       1 & ... &             1 &             1
\end{bmatrix}
\]

Now we can properly write out the error function as matrix operations:

\[
  E(C) = \left ( P - 𝕋MC \right )^T \left ( P - 𝕋MC \right )
\]

So, we have our error function: we now need to figure out the expression for where that function has minimal value, e.g. where the error between the true coordinates and the coordinates generated by the curve fitting is smallest. Like in standard calculus, this requires taking the derivative, and determining where that derivative is zero:

\[
  \frac{\partial E}{\partial C} = 0 = -2𝕋^T \left ( P - 𝕋MC \right )
\]

<div class="note">

  ## Where did this derivative come from?

  That... is a good question. In fact, when trying to run through this approach, I ran into the same question! And you know what? I straight up had no idea. I'm decent enough at calculus, I'm decent enough at linear algebra, and I just don't know.

  So I did what I always do when I don't understand something: I asked someone to help me understand how things work. In this specific case, I [posted a question](https://math.stackexchange.com/questions/2825438/how-do-you-compute-the-derivative-of-a-matrix-algebra-expression) to [Math.stackexchange](https://math.stackexchange.com), and received a answer that goes into way more detail than I had hoped to receive.

  Is that answer useful to you? Probably: no. At least, not unless you like understanding maths on a recreational level. And I do mean maths in general, not just basic algebra. But it does help in giving us a reference in case you ever wonder "Hang on. Why was that true?". There are answers. They might just require some time to come to understand.

</div>

Now, given the above derivative, we can rearrange the terms (following the rules of matrix algebra) so that we end up with an expression for **C**:

\[
  C = M^{-1} \left ( 𝕋^T 𝕋 \right )^{-1} 𝕋^T P
\]

Here, the "to the power negative one" is the notation for the [matrix inverse](https://en.wikipedia.org/wiki/Invertible_matrix). But that's all we have to do: we're done. Starting with **P** and inventing some `t` values based on the polygon the coordinates in **P** define, we can compute the corresponding Bézier coordinates **C** that specify a curve that goes through our points. Or, if it can't go through them exactly, as near as possible.

So before we try that out, how much code is involved in implementing this? Honestly, that answer depends on how much you're going to be writing yourself. If you already have a matrix maths library available, then really not that much code at all. On the other hand, if you are writing this from scratch, you're going to have to write some utility functions for doing your matrix work for you, so it's really anywhere from 50 lines of code to maybe 200 lines of code. Not a bad price to pay for being able to fit curves to pre-specified coordinates.

So let's try it out! The following graphic lets you place points, and will start computing exact-fit curves once you've placed at least three. You can click for more points, and the code will simply try to compute an exact fit using a Bézier curve of the appropriate order. Four points? Cubic Bézier. Five points? Quartic. And so on. Of course, this does break down at some point: depending on where you place your points, it might become mighty hard for the fitter to find an exact fit, and things might actually start looking horribly off once there's enough points for compound [floating point rounding errors](https://en.wikipedia.org/wiki/Round-off_error#Floating-point_number_system) to start making a difference (which is around 10~11 points).

<graphics-element title="Fitting a Bézier curve" width="550" src="./curve-fitting.js" >
  <button class="toggle">toggle</button>
  <!-- additional sliders will get created on the fly -->
</graphics-element>

You'll note there is a convenient "toggle" buttons that lets you toggle between equidistant `t` values, and distance ratio along the polygon formed by the points. Arguably more interesting is that once you have points to abstract a curve, you also get <em>direct control</em> over the time values through sliders for each, because if the time values are our degree of freedom, you should be able to freely manipulate them and see what the effect on your curve is.
