# Lowering and elevating curve order

One interesting property of Bézier curves is that an *n<sup>th</sup>* order curve can always be perfectly represented by an *(n+1)<sup>th</sup>* order curve, by giving the higher-order curve specific control points.

If we have a curve with three points, then we can create a curve with four points that exactly reproduces the original curve. First, we give it the same start and end points, and for its two control points we pick "1/3<sup>rd</sup> start + 2/3<sup>rd</sup> control" and "2/3<sup>rd</sup> control + 1/3<sup>rd</sup> end". Now we have exactly the same curve as before, except represented as a cubic curve rather than a quadratic curve.

The general rule for raising an *n<sup>th</sup>* order curve to an *(n+1)<sup>th</sup>* order curve is as follows (observing that the start and end weights are the same as the start and end weights for the old curve):

\[
  Bézier(k,t) = \sum_{i=0}^{k}
                \underset{binomial\ term}{\underbrace{\binom{k}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                \ \cdot \
                \underset{new\ weights}{\underbrace{\left ( \frac{(k-i) \cdot w_i + i \cdot w_{i-1}}{k} \right )}}
  \ ,\ with\ k = n+1\ and\ w_{i-1}=0\ when\ i = 0
\]

However, this rule also has as direct consequence that you **cannot** generally safely lower a curve from *n<sup>th</sup>* order to *(n-1)<sup>th</sup>* order, because the control points cannot be "pulled apart" cleanly. We can try to, but the resulting curve will not be identical to the original, and may in fact look completely different.

However, there is a surprisingly good way to ensure that a lower order curve looks "as close as reasonably possible" to the original curve: we can optimise the "least-squares distance" between the original curve and the lower order curve, in a single operation (also explained over on [Sirver's Castle](https://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/)). However, to use it, we'll need to do some calculus work and then switch over to linear algebra. As mentioned in the section on matrix representations, some things can be done much more easily with matrices than with calculus functions, and this is one of those things. So... let's go!

We start by taking the standard Bézier function, and condensing it a little:

\[
  Bézier(n,t)
  =
  \sum_{i=0}^{n} w_i B^n_i(t)
  \textit{, where }
  B^n_i(t)
  =
  \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i}
\]

Then, we apply one of those silly (actually, super useful) calculus tricks: since our `t` value is always between zero and one (inclusive), we know that `(1-t)` plus `t` always sums to 1. As such, we can express any value as a sum of `t` and `1-t`:

\[
  x = 1 x = \left ( (1-t) + t \right ) x = (1-t) x + t x = x (1-t) + x t
\]

So, with that seemingly trivial observation, we rewrite that Bézier function by splitting it up into a sum of a `(1-t)` and `t` component:

\[
  \begin{aligned}
    Bézier(n,t) &= (1-t) B(n,t) + t B(n,t) \\
                &= \sum_{i=0}^{n} w_i (1 - t) B^n_i(t) + \sum_{i=0}^{n} w_i t B^n_i(t)
  \end{aligned}
\]

So far so good. Now, to see why we did this, let's write out the `(1-t)` and `t` parts, and see what that gives us. I promise, it's about to make sense. We start with `(1-t)`:

\[
  \begin{aligned}
    (1 - t) B^n_i(t) &= (1-t) \frac{n!}{(n-i)!i!}  (1-t)^{n-i} t^i \\
                     &= \frac{n+1-i}{n+1} \frac{(n+1)!}{(n+1-i)!i!} (1-t)^{n+1-i} t^i \\
                     &= \frac{k-i}{k} \frac{k!}{(k-i)!i!} (1-t)^{k-i} t^i, \textit{where } k = n + 1 \\
                     &= \frac{k-i}{k} B^k_i(t)
  \end{aligned}
\]

So by using this seemingly silly trick, we can suddenly express part of our n<sup>th</sup> order Bézier function in terms of an (n+1)<sup>th</sup> order Bézier function. And that sounds a lot like raising the curve order! Of course we need to be able to repeat that trick for the `t` part, but that's not a problem:

\[
  \begin{aligned}
    t B^n_i(t) &= t \frac{n!}{(n-i)!i!} (1-t)^{n-i} t^i \\
               &= \frac{i+1}{n+1} \frac{(n+1)!}{((n+1)-(i+1))!(i+1)!} (1-t)^{(n+1)-(i+1)} t^{i+1} \\
               &= \frac{i+1}{k} \frac{k!}{(k-(i+1))!(i+1)!} (1-t)^{k-(i+1)} t^{i+1}, \textit{where } k = n + 1 \\
               &= \frac{i+1}{k} B^k_{i+1}(t)
  \end{aligned}
\]

So, with both of those changed from an order `n` expression to an order `(n+1)` expression, we can put them back together again. Now, where the order `n` function had a summation from 0 to `n`, the order `n+1` function uses a summation from 0 to `n+1`, but this shouldn't be a problem as long as we can add some new terms that "contribute nothing". In the next section on derivatives, there is a discussion about why "higher terms than there is a binomial for" and "lower than zero terms" both "contribute nothing". So as long as we can add terms that have the same form as the terms we need, we can just include them in the summation, they'll sit there and do nothing, and the resulting function stays identical to the lower order curve.

Let's do this:

\[
  \begin{aligned}
    Bézier(n,t) &= \sum_{i=0}^{n+1} w_i (1 - t) B^n_i(t) + \sum_{i=0}^{n+1} w_i t B^n_i(t) \\
                &= \sum_{i=0}^{n+1} w_i \frac{k-i}{k} B^k_i(t) + \sum_{i=0}^{n+1} w_i \frac{i+1}{k} B^k_{i+1}(t), \textit{where } k = n + 1 \\
                &= \sum_{i=0}^{n+1} w_i \frac{k-i}{k} B^k_i(t) + \sum_{i=0}^{n+1} p_{i-1} \frac{i}{k} B^k_i(t) \\
                &= \sum_{i=0}^{n+1} \left ( w_i \frac{k-i}{k} + p_{i-1} \frac{i}{k} \right ) B^k_i(t) \\
                &= \sum_{i=0}^{n+1} \left ( w_i (1-s) + p_{i-1} s \right ) B^k_i(t), \textit{where } s = \frac{i}{k}
  \end{aligned}
\]

And this is where we switch over from calculus to linear algebra, and matrices: we can now express this relation between Bézier(n,t) and Bézier(n+1,t) as a very simple matrix multiplication:

\[
  M B_n = B_k
\]

where the matrix **M** is an `n+1` by `n` matrix, and looks like:

\[
M =
\left [
\begin{matrix}
     1      &        0      &        .      &        .      &  .  &       .       &         .       & . \\
\frac{1}{k} & \frac{k-1}{k} &        0      &        .      &  .  &       .       &         0       & . \\
     0      & \frac{2}{k}   & \frac{k-2}{k} &        0      &  .  &       .       &         .       & . \\
     .      &        0      & \frac{3}{k}   & \frac{k-3}{k} &  0  &       .       &         .       & . \\
     .      &        .      &        0      &       ...     & ... &       0       &         .       & . \\
     .      &        .      &        .      &        0      & ... &      ...      &         0       & . \\
     .      &        .      &        .      &        .      &  0  & \frac{n-1}{k} & \frac{k-n+1}{k} & 0 \\
     .      &        0      &        .      &        .      &  .  &       0       & \frac{n}{k}     & \frac{k-n}{k} \\
     .      &        .      &        .      &        .      &  .  &       .       &         0       & 1
\end{matrix}
\right ]
\]

That might look unwieldy, but it's really just a mostly-zeroes matrix, with a very simply fraction on the diagonal, and an even simpler fraction to the left of it. Multiplying a list of coordinates with this matrix means we can plug the resulting transformed coordinates into the one-order-higher function and get an identical looking curve.

Not too bad!

Equally interesting, though, is that with this matrix operation established, we can now use an incredibly powerful and ridiculously simple way to find out a "best fit" way to reverse the operation, called [the normal equation](https://mathworld.wolfram.com/NormalEquation.html). What it does is minimize the sum of the square differences between one set of values and another set of values. Specifically, if we can express that as some function **A x = b**, we can use it. And as it so happens, that's exactly what we're dealing with, so:

\[
\begin{aligned}
  M B_n &= B_k \\
  (M^T M) B_n &= M^T B_k\\
  (M^T M)^{-1} (M^T M) B_n &= (M^T M)^{-1} M^T B_k \\
  I B_n &= (M^T M)^{-1} M^T B_k \\
  B_n &= (M^T M)^{-1} M^T B_k
\end{aligned}
\]

The steps taken here are:

1. We have a function in a form that the normal equation can be used with, so
2. apply the normal equation!
3. Then, we want to end up with just B<sub>n</sub> on the left, so we start by left-multiply both sides such that we'll end up with lots of stuff on the left that simplified to "a factor 1", which in matrix maths is the [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix).
4. In fact, by left-multiplying with the inverse of what was already there, we've effectively "nullified" (but really, one-inified) that big, unwieldy block into the identity matrix **I**. So we substitute the mess with **I**, and then
5. because multiplication with the identity matrix does nothing (like multiplying by 1 does nothing in regular algebra), we just drop it.

And we're done: we now have an expression that lets us approximate an `n+1`<sup>th</sup> order curve with a lower `n`<sup>th</sup> order curve. It won't be an exact fit, but it's definitely a best approximation. So, let's implement these rules for raising and lowering curve order to a (semi) random curve, using the following graphic. Select the sketch, which has movable control points, and press your up and down arrow keys to raise or lower the curve order.

<graphics-element title="A variable-order Bézier curve" src="./reorder.js">
  <button class="raise">raise</button>
  <button class="lower">lower</button>
</graphics-element>
