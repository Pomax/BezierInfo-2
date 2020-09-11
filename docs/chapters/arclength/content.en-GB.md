# Arc length

How long is a Bézier curve? As it turns out, that's not actually an easy question, because the answer requires maths that —much like root finding— cannot generally be solved the traditional way. If we have a parametric curve with *f<sub>x</sub>(t)* and *f<sub>y</sub>(t)*, then the length of the curve, measured from start point to some point *t = z*, is computed using the following seemingly straight forward (if a bit overwhelming) formula:

\[
  \int_{0}^{z}\sqrt{f_x'(t)^2+f_y'(t)^2} dt
\]

or, more commonly written using Leibnitz notation as:

\[
  length = \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
\]

This formula says that the length of a parametric curve is in fact equal to the **area** underneath a function that looks a remarkable amount like Pythagoras' rule for computing the diagonal of a straight angled triangle. This sounds pretty simple, right? Sadly, it's far from simple... cutting straight to after the chase is over: for quadratic curves, this formula generates an [unwieldy computation](https://www.wolframalpha.com/input/?i=antiderivative+for+sqrt((2*(1-t)*t*B+%2B+t%5E2*C)%27%5E2+%2B+(2*(1-t)*t*E)%27%5E2)&incParTime=true), and we're simply not going to implement things that way. For cubic Bézier curves, things get even more fun, because there is no "closed form" solution, meaning that due to the way calculus works, there is no generic formula that allows you to calculate the arc length. Let me just repeat this, because it's fairly crucial: ***for cubic and higher Bézier curves, there is no way to solve this function if you want to use it "for all possible coordinates"***.

Seriously: [It cannot be done](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem).

So we turn to numerical approaches again. The method we'll look at here is the [Gauss quadrature](https://www.youtube.com/watch?v=unWguclP-Ds&feature=BFa&list=PLC8FC40C714F5E60F&index=1). This approximation is a really neat trick, because for any *n<sup>th</sup>* degree polynomial it finds approximated values for an integral really efficiently. Explaining this procedure in length is way beyond the scope of this page, so if you're interested in finding out why it works, I can recommend the University of South Florida video lecture on the procedure, linked in this very paragraph. The general solution we're looking for is the following:

\[
  \int_{-1}^{1}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
  =
  \int_{-1}^{1}f(t) dt
  \simeq
  \left [
    \underset{strip\ 1}{ \underbrace{ C_1 \cdot f\left(t_1\right) }}
    \ +\ ...
    \ +\ \underset{strip\ n}{ \underbrace{ C_n \cdot f\left(t_n\right) }}
  \right ]
  =
  \underset{strips\ 1\ through\ n}{
    \underbrace{
      \sum_{i=1}^{n}{
        C_i \cdot f\left(t_i\right)
      }
    }
  }
\]

In plain text: an integral function can always be treated as the sum of an (infinite) number of (infinitely thin) rectangular strips sitting "under" the function's plotted graph. To illustrate this idea, the following graph shows the integral for a sinusoid function. The more strips we use (and of course the more we use, the thinner they get) the closer we get to the true area under the curve, and thus the better the approximation:

<div class="figure">
  <graphics-element title="A function's approximated integral" src="./draw-slices.js" data-steps="10"></graphics-element>
  <graphics-element title="A better approximation" src="./draw-slices.js" data-steps="24"></graphics-element>
  <graphics-element title="An even better approximation" src="./draw-slices.js" data-steps="99"></graphics-element>
</div>

Now, infinitely many terms to sum and infinitely thin rectangles are not something that computers can work with, so instead we're going to approximate the infinite summation by using a sum of a finite number of "just thin" rectangular strips. As long as we use a high enough number of thin enough rectangular strips, this will give us an approximation that is pretty close to what the real value is.

So, the trick is to come up with useful rectangular strips. A naive way is to simply create *n* strips, all with the same width, but there is a far better way using special values for *C* and *f(t)* depending on the value of *n*, which indicates how many strips we'll use, and it's called the Legendre-Gauss quadrature.

This approach uses strips that are *not* spaced evenly, but instead spaces them in a special way based on describing the function as a polynomial (the more strips, the more accurate the polynomial), and then computing the exact integral for that polynomial. We're essentially performing arc length computation on a flattened curve, but flattening it based on the intervals dictated by the Legendre-Gauss solution.

<div class="note">

Note that one requirement for the approach we'll use is that the integral must run from -1 to 1. That's no good, because we're dealing with Bézier curves, and the length of a section of curve applies to values which run from 0 to "some value smaller than or equal to 1" (let's call that value *z*). Thankfully, we can quite easily transform any integral interval to any other integral interval, by shifting and scaling the inputs. Doing so, we get the following:

\[
\begin{array}{l}
  \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
  \\
  \simeq \
  \frac{z}{2} \cdot \left [ C_1 \cdot f\left(\frac{z}{2} \cdot t_1 + \frac{z}{2}\right)
                            + ...
                            + C_n \cdot f\left(\frac{z}{2} \cdot t_n + \frac{z}{2}\right)
                    \right ]
  \\
  = \
  \frac{z}{2} \cdot \sum_{i=1}^{n}{C_i \cdot f\left(\frac{z}{2} \cdot t_i + \frac{z}{2}\right)}
\end{array}
\]

That may look a bit more complicated, but the fraction involving *z* is a fixed number, so the summation, and the evaluation of the *f(t)* values are still pretty simple.

So, what do we need to perform this calculation? For one, we'll need an explicit formula for *f(t)*, because that derivative notation is handy on paper, but not when we have to implement it. We'll also need to know what these *C<sub>i</sub>* and *t<sub>i</sub>* values should be. Luckily, that's less work because there are actually many tables available that give these values, for any *n*, so if we want to approximate our integral with only two terms (which is a bit low, really) then [these tables](./legendre-gauss.html) would tell us that for *n=2* we must use the following values:

\[
\begin{array}{l}
C_1 = 1 \\
C_2 = 1 \\
t_1 = - \frac{1}{\sqrt{3}} \\
t_2 = + \frac{1}{\sqrt{3}}
\end{array}
\]

Which means that in order for us to approximate the integral, we must plug these values into the approximate function, which gives us:

\[
\int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
≃
\frac{z}{2} \cdot \left [ f\left( \frac{z}{2} \cdot \frac{-1}{\sqrt{3}} + \frac{z}{2} \right)
              + f\left( \frac{z}{2} \cdot \frac{1}{\sqrt{3}} + \frac{z}{2} \right)
          \right ]
\]

We can program that pretty easily, provided we have that *f(t)* available, which we do, as we know the full description for the Bézier curve functions B<sub>x</sub>(t) and B<sub>y</sub>(t).

</div>

If we use the Legendre-Gauss values for our *C* values (thickness for each strip) and *t* values (location of each strip), we can determine the approximate length of a Bézier curve by computing the Legendre-Gauss sum. The following graphic shows a cubic curve, with its computed lengths; Go ahead and change the curve, to see how its length changes. One thing worth trying is to see if you can make a straight line, and see if the length matches what you'd expect. What if you form a line with the control points on the outside, and the start/end points on the inside?

<graphics-element title="Arc length for a Bézier curve" src="./arclength.js"></graphics-element>
