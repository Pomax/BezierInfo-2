# Circular arcs and cubic Béziers

Let's look at approximating circles and circular arcs using cubic Béziers. How much better is that?

<graphics-element title="Cubic Bézier arc approximation" width="400" height="400" src="./arc-approximation.js">
  <input type="range" min="-3.1415" max="3.1415" step="0.01" value="1.4" class="slide-control">
</graphics-element>

At cursory glance, a fair bit better, but let's find out _how much_ better by looking at how to construct the Bézier curve.

![A construction diagram for a cubic approximation of a circular arc](images/chapter-assets/circles/image-20210417165543902.png)

The start and end points are trivial, but the mid point requires a bit of work, but it's mostly basic trigonometry once we know the angle θ for our circular arc: if we scale our circular arc to a unit circle, we can always start our arc, with radius 1, at (1,0) and then given our arc angle θ, we also know that the circular arc has length θ (because unit circles are nice that way). We also know our end point, because that's just (cos(θ), sin(θ)), and so the challenge is to figure out what control points we need in order for the curve at _t_=0.5 to exactly touch the circular arc at the angle θ/2:

So let's again formally describe this:

\[
\begin{aligned}
  P_1 &= (1, 0) \\
  P_2 &= (1, c) \\
  P_3 &= P_4 + k \cdot (sin(θ), -cos(θ)) \\
  P_4 &= (cos(θ), sin(θ))
\end{aligned}
\]

Only P<sub>3</sub> isn't quite straight-forward here, and its description is based on the fact that the triangle (origin, P<sub>4</sub>, P<sub>3</sub>) is a right angled triangle, with the distance between the origin and P<sub>4</sub> being 1 (because we're working with a unit circle), and the distance between P<sub>4</sub> and P<sub>3</sub> being _c , so that we can represent P<sub>3</sub> as "The point P<sub>4</sub> plus the vector from the origin to P<sub>4</sub> but then rotated a quarter circle, counter-clockwise, and scaled by _c_".

With that, we can determine the _y_-coordinates for A, B, e<sub>1</sub>, and e<sub>2</sub>, after which we have all the information we need to determine what the value of _k_ is. We can find these values by using (no surprise here) linear interpolation between known points, as A is midway between P<sub>2</sub> and P<sub>3</sub>, e<sub>1</sub> is between A and "midway between P<sub>1</sub> and P<sub>2</sub>" (which is "half height" P<sub>2</sub>), and so forth:

\[
\begin{aligned}
A_y &= \frac{P_{2_y} + P_{3_y}}{2} = \frac{k + sin(θ) - k \cdot cos(θ)}{2} \\
e_{1_y} &= \frac{A_y + \frac{1}{2}P_{2_y}}{2} = \frac{\frac{k + sin(θ) - k \cdot cos(θ)}{2} + \frac{}{2}}{2} = \frac{2k + sin(θ) + k \cdot cos(θ)}{4} \\
e_{2_y} &= \frac{A_y + \textit{mid}(P_4, P_3)}{2} = \frac{A_y + sin(θ) - \frac{k}{2} cos(θ)}{2} = \frac{k + 3sin(θ) 2k \cdot cos(θ)}{4} \\
B_y &= \frac{e_{1_y} + e_{2_y}}{2} = \frac{3k + 4sin(θ) - 3k \cdot cos(θ)}{8}
\end{aligned}
\]

Which now gives us two identities for B, because in addition to determining B through linear interpolation, we also know that B's _y_ coordinate is just _sin(θ/2)_: we started this exercise by saying we were going to approximate the circular arc using a Bézier curve that had its midpoint, which is point B,  touching the unit circle at the arc's half-angle, by definition making B the point at (cos(θ/2), sin(θ/2)).

This means we can equate the two identities we now have for B<sub>y</sub>  and solve for _k_.

<div class="note">

## Deriving _k_

Solving for _k_ is fairly straight forward, but it's a fair few steps, and if you just the immediate result: using a tool like [Wolfram Alpha](https://www.wolframalpha.com/) is definitely the way to go. That said, let's get going:

\[
\begin{aligned}
\frac{3c + 4sin(θ)) - 3k \cdot cos(θ)}{8} &= sin(\frac{θ}{2}) \\
3k + 4sin(θ)) - 3k \cdot cos(θ)  &= 8sin\left(\frac{θ}{2}\right) \\
3k - 3k \cdot cos(θ) &= 8sin\left(\frac{θ}{2}\right) - 4sin(θ) \\
3k (1 - cos(θ)) &= 4 \left ( 2sin\left(\frac{θ}{2} \right) - sin(θ) \right ) \\
3k &= 4 \cdot \frac{2sin(\frac{θ}{2}) - sin(θ)}{1 - cos(θ)}  \\
k &= \frac{4}{3} \cdot \frac {2sin\left(\frac{θ}{2}\right) - sin(θ)}{1 - cos(θ)}
\end{aligned}
\]

And finally, we can take further advantage of several trigonometric identities to _drastically_ simplify our formula for _k_:

\[
\begin{aligned}
k &= \frac{4}{3} \cdot \frac {2sin\left(\frac{θ}{2}\right) - sin(θ)}{1 - cos(θ)}\\
k &= \frac{4}{3} \cdot \left ( \frac {2sin\left(\frac{θ}{2}\right)}{1 - cos(θ)} - \frac {sin(θ)}{1 - cos(θ)} \right )\\
k &= \frac{4}{3} \cdot \left (csc\left(\frac{θ}{2}\right)  - cot\left(\frac{θ}{2}\right) \right )\\
k &= \frac{4}{3} \cdot tan\left ( \frac{θ}{4} \right )\\
\end{aligned}
\]

And we're done.

</div>

So, the distance of our control points to the start/end points can be expressed as a number that we get from an almost trivial expression involving the circular arc's angle:

\[
k = f(θ) = \frac{4}{3} tan\left (\frac{θ}{4} \right )
\]

Which means that for any circular arc with angle θ and radius _r_, our Bézier approximation based on three points of incidence is:

\[
\begin{aligned}
\textit{start} &= (r,~0) \\
\textit{control}_{~1} &= (r,~k) \\
\textit{control}_{~2} &= r\cdot(cos(θ) + k \cdot sin(θ), sin(θ) - k \cdot cos(θ)) \\
\textit{end} &= r \cdot (cos(θ),~sin(θ))
\end{aligned}
\]

Which also gives us the commonly found value of 0.55228 for quarter circles, based on them having an angle of half π:

\[
f\left ( \frac{\pi}{2} \right ) = \frac{4}{3} \cdot tan\left(\frac{\pi}{8}\right) = \frac{4}{3}(\sqrt{2}-1)\approx 0.55228474983[...]
\]

And thus giving us the following Bézier coordinates for a quarter circle of radius _r_:

\[
\begin{aligned}
\textit{start} &= (r,~0) \\
\textit{control}_{~1} &= (r,~0.55228 \cdot r) \\
\textit{control}_{~2} &= (0.55228 \cdot r,~r) \\
\textit{end} &= (0,~r)
\end{aligned}
\]

<div class="note">

## So, how accurate is this?

Unlike for the quadratic curve, we can't use <i>t=0.5</i> as our reference point because by its very nature it's one of the three points that are actually guaranteed to be on the circular arc itself. Instead, we need a different <i>t</i> value that will give us the maximum deflection - there are two possible choices (as our curve is still strictly "overshoots" the circular arc, and it's symmetrical) but rather than trying to use calculus to find the perfect _t_ value—which we could! the maths is perfectly reasonable as long as we get to use computers—we can also just perform a binary search for the biggest deflection and not bother with all this maths stuff.

So let's do that instead: we can run a maximum deflection check that just runs through _t_ from 0 to 1 at some coarse interval, finds a _t_ value that has "the highest deflection of the bunch", then reruns the same check with a much smaller interval around that _t_ value, repeating as many times as necessary to get us an arbitrarily precise value of _t_:

```
getMostWrongT(radius, bezier, start, end, epsilon=1e-15):
  if end-start < epsilon:
    return (start+end)/2
  worst_t = 0
  max = 0
  stepsize = (end-start)/10
  for t=start to end, using stepsize:
    p = bezier.get(t)
    diff = p.magnitude() - radius
    if diff > max:
      worst_t = t
      max = diff
  return getMostWrongT(radius, bezier, worst_t - stepsize, worst_t + stepsize)
```

Plus, how often do you get to write a function with that name?

Using this code, we find that our _t_ values are approximately 0.211325 and 0.788675, so let's pick the lower of the two and see what the maximum deflection is across our domain of angles, with the original quadratic error show in green (rocketing off to infinity first, and then coming back down as we approach 2π)

<table><tbody><tr><td>
  <img src="images/chapter-assets/circles/image-20210417173811587.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210417174019035.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210417174100036.png" width="95%"/>
</td></tr>
<tr><td>
  error plotted for 0 ≤ φ ≤ 2π
</td><td>
  error plotted for 0 ≤ φ ≤ π
</td><td>
  error plotted for 0 ≤ φ ≤ ½π
</td></tr>
</tbody></table>

That last image is probably not quite clear enough: the cubic approximation of a quarter circle is so incredibly much better that we can't even really see it at the same scale of our quadratic curve. Let's scale the y-axis a little, and try that again:

<p style="text-align: center"><img src="images/chapter-assets/circles/image-20210417174215876.png" height="350px"></p>

Yeah... the error of a cubic approximation for a quarter circle turns out to be _two orders of magnitude_ better. At approximately 0.00027 (or: just shy of being 2.7 pixels off for a circle with a radius of 10,000 pixels) the increase in precision over quadratic curves is quite spectacular - certainly good enough that no one in their right mind should ever use quadratic curves.

</div>

So that's it, kappa is _4/3 · tan(θ/4)_ , we're done! ...or are we?

## Can we do better?

Technically: yes, we can. But I'm going to prefix this section with "we can, and we should investigate that possibility, but let me warn you up front that the result is _only_ better if we're going to hard-code the values". We're about to get into the weeds and the standard three-points-of-incidence value is so good already that for most applications, trying to do better won't make any sense at all.

So with that said: what we calculated above is an _upper bound_ for a best fit Bézier curve for a circular arc: anywhere we don't touch the circular arc in our approximation, we've "overshot" the arc. What if we dropped our value for _k_ just a little, so that the curve starts out as an over-estimation, but then crosses the circular arc, yielding an region of underestimation, and then crosses the circular arc again, with another region of overestimation. This might give us a lower overall error, so let's see what we can do.

First, let's express the total error (given circular arc angle θ, and some _k_) using standard calculus notation:

\[
\textit{erf}~(θ, k) = \int_0^1{\left \| \sqrt{B_x(t,θ,k)^2 + B_y(t,θ,k)^2} - r \right \|dt}
\]

This says that the error function for a given angle and value of _k_ is equal to the "infinite" sum of differences between our curve and the circular arc, as we run _t_ from 0 to 1, using an infinitely small step size. between subsequent _t_ values.

Now, since we want to find the minimal error, that means we want to know where along this function things go from "error is getting progressively less" to "error is increasing again", which means we want to know where its derivative is zero, which as mathematical expression looks like:

\[
\left ( \int_0^1{\left \| \sqrt{B_x^2 + B_y^2} - r \right \|dt} \right ) \frac{d}{dt} = 0
\]

And here we have the most direct application of the [Fundamental Theorem of Calculus](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus): the derivative and integral are each other's inverse operations, so they cancel out, leaving us with our original function:

\[
\left \| \sqrt{B_x^2 + B_y^2} - r \right \| = 0, ~~ t \in [0,1]
\]

And now we just solve for that... oh wait. We've seen this before. In order to solve this, we'd end up needing to solve this:

\[
B_x^2 + B_y^2 = r
\]

And both of those terms on the left of the equal sign are 6<sup>th</sup> degree polynomials, which means—as we've covered in the section on arc lengths—[there is no symbolic solution for this equasion](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem).  Instead, we'll have to use a numerical approach to find the solutions here, so... to the computer!

<div class="note">

## Iterating on a solution

By which I really mean "to the binary search algorithm", because we're dealing with a reasonably well behaved function: depending on the value for _k_ , we're either going to end up with a Bézier curve that's on average "not at distance _r_ from the arc's center", "exactly distance _r_ from the arc's center", or "more than distance _r_ from the arc's center", so we can just binary search our way to the most accurate value for _c_ that gets us that middle case.

First our setup, where we determine our upper and lower bounds, before entering our binary search:

```
findBest(radius, angle, points[]):
  lowerBound = 0
  upperBound = 4.0/3.0 * Math.tan(abs(angle) / 4)
  return binarySearch(radius, angle, points, lowerBound, upperBound)
```

And then the binary search algorithm, which can be found in pretty much any CS textbook, as well as more online articles, tutorials, and blog posts than you can ever read in a life time:

```
binarySearch(radius, angle, points[], lowerBound, upperBound, epsilon=1e-15):
  value = (upperBound + lowerBound)/2

  if (upperBound - lowerBound < epsilon) return value

  // recompute the control points, based on our current "value"
  d = (points[3].y < 0 ? -1 : 1) * value * radius
  points[1] = new Point(radius, d)
  points[2] = new Point(
    points[3].x + d * sin(angle)
    points[3].y - d * cos(angle)
  )

  if radialError(radius, points) > 0:
    // our bezier curve is longer than we want it to be: reduce the upper bound
    return binarySearch(radius, angle, points, lowerBound, value)
  else:
    // our bezier curve is shorter than we want it to be: increase the lower bound
    return binarySearch(radius, angle, points, value, upperBound)
```

Using the following `radialError` function, which samples the curve's approximation of the circular arc over several points (although the first and last point will never contribute anything, so we skip them):

```
radialError(radius, points[]):
  err = 0
  steps = 5.0
  for (int i=1; i<steps; i++):
    Point p = getOnCurvePoint(points, i/steps)
    err += p.magnitude()/radius - 1
  return err
```

In this, `getOnCurvePoint` is just the standard Bézier evaluation function, yielding a point. Treating that point as a vector, we can get its length to the origin using a `magnitude` call.

## Examining the result

Running the above code we can get a list of _k_ values associated with a list of angles θ from 0 to π, and we can use that to, for each angle, plot what the difference between the circular arc and the Bézier approximation looks like:

![image-20210419085430711](images/chapter-assets/circles/image-20210419085430711.png)

Here we see the difference between an arc and its Bézier approximation plotted as we run _t_ from 0 to 1. Just by looking at the plot we can tell that there is maximum deflection at _t_ = 0.5, so let's plot the maximum deflection "function", for angles from 0 to θ:

In fact, let's plot the maximum deflections for both approaches as a functions over θ:

<table><tbody><tr><td>
  <img src="images/chapter-assets/circles/image-20210418111929371.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210418112008676.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210418112038613.png" width="95%"/>
</td></tr>
<tr><td>
  max deflection using unit scale
</td><td>
  max deflection at 10x scale
</td><td>
  max deflection at 100x scale
</td></tr>
</tbody></table>

That doesn't actually appear to be all that much better, so let's look at some numbers, to see what the improvement actually is:

| angle | "improved" deflection | "upper bound" deflection | difference            |
| ----- | --------------------- | ------------------------ | --------------------- |
| 1/8 π | 6.202833502388927E-8  | 6.657161222278773E-8     | 4.5432771988984655E-9 |
| 1/4 π | 3.978021202111215E-6  | 4.246252911066506E-6     | 2.68231708955291E-7   |
| 3/8 π | 4.547652269037972E-5  | 4.8397483513262785E-5    | 2.9209608228830675E-6 |
| 1/2 π | 2.569196199214696E-4  | 2.7251652752280364E-4    | 1.559690760133403E-5  |
| 5/8 π | 9.877526288810667E-4  | 0.0010444175859711802    | 5.666495709011343E-5  |
| 3/4 π | 0.00298164978679627   | 0.0031455628414580605    | 1.6391305466179062E-4 |
| 7/8 π | 0.0076323182807019885 | 0.008047777909948373     | 4.1545962924638413E-4 |
| π     | 0.017362185964043708  | 0.018349016519545902     | 9.86830555502194E-4   |

As we can see, the increase in precision is not particularly big: for a quarter circle (π/2) the traditional _k_ will be off by 2.75 pixels on a circle with radius 10,000 pixels, whereas this "better" fit will be off by 2.56 pixels. And while that's certainly an almost 10% improvement, it's also nowhere near enough of an improvement to make a discernible difference.

</div>

At this point it should be clear that while, yes, there are improvement to be had, they're essentially insignificant while also being _much_ more computationally expensive.

## TL;DR: just tell me which value I should be using

It depends on what we need to do. If we just want the best value for quarter circles, and we're going to hard code the value for _k_, then there is no reason to hard-code the constant `k=4/3*tan(pi/8)` when you can just as easily hard-code the constant as `k=0.551784777779014` instead.

**If you need "the" value for quarter circles, use 0.551785 instead of 0.55228**

However, for dynamic arc approximation, in code that tries to fit circular paths using Bézier paths instead, it should be fairly obvious that the simple function involving a tangent computation, two divisions, and one multiplication, is vastly more performant than running all the code we ended writing just to get a 25% lower error value, and most certainly worth preferring over getting the "more accurate" value.

**If you need to fit Béziers to circular arcs on the fly, use `4/3 * tan(θ/4)`**

However, always remember that if you're writing for humans, you can typically use the best of both worlds: as the user interacts with their curves, you should draw _their curves_ instead of drawing approximations of them. If they need to draw circles or circular arcs, draw those, and only approximate them with a Bézier curve when the data needs to be exported to a format that doesn't support those. Ideally with a preview mechanism that highlights where the errors will be, and how large they will be.

**If you're writing code for graphics design by humans, use circular arcs for circular arcs**

And that's it. We have pretty well exhausted this subject. There are different metrics we could use to find "different best _k_ values", like trying to match arc length (e.g. when we're optimizing for material cost), or minimizing the area between the circular arc and the Bézier curve (e.g. when we're optimizing for inking), or minimizing the rate of change of the Bézier's curvature (e.g. when we're optimizing for curve traversal) and they all yield values that are so similar that it's almost certainly not worth it. (For instance, for quarter circle approximations those values are 0.551777, 0.5533344, and 0.552184 respectively. Much like the 0.551785 we get from minimizing the maximum deflection, none of these values are significantly better enough to prefer them over the upper bound value).