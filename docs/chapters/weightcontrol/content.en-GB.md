# Controlling Bézier curvatures, part 2: Rational Béziers

We can further control Bézier curves by "rationalising" them: that is, adding a "ratio" value in addition to the weight value discussed in the previous section, thereby gaining control over "how strongly" each coordinate influences the curve.

Adding these ratio values to the regular Bézier curve function is fairly easy. Where the regular function is the following:

\[
  Bézier(n,t) = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i
\]

The function for rational Bézier curves has two more terms:

\[
  Rational\ Bézier(n,t) = \frac{ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i \cdot BLUE[ratio_i] }{ BLUE[ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot ratio_i ] }
\]

In this, the first new term represents an additional weight for each coordinate. For example, if our ratio values are [1, 0.5, 0.5, 1] then <code>ratio<sub>0</sub> = 1</code>, <code>ratio<sub>1</sub> = 0.5</code>, and so on, and is effectively identical as if we were just using different weight. So far, nothing too special.

However, the second new term is what makes the difference: every point on the curve isn't just a "double weighted" point, it is a _fraction_ of the "doubly weighted" value we compute by introducing that ratio. When computing points on the curve, we compute the "normal" Bézier value and then _divide_ that by the Bézier value for the curve that only uses ratios, not weights.

This does something unexpected: it turns our polynomial into something that _isn't_ a polynomial anymore. It is now a kind of curve that is a super class of the polynomials, and can do some really cool things that Bézier curves can't do "on their own", such as perfectly describing circles (which we'll see in a later section is literally impossible using standard Bézier curves).

But the best way to show what this does is to do literally that: let's look at the effect of "rationalising" our Bézier curves using an interactive graphic for a rationalised curves. The following graphic shows the Bézier curve from the previous section, "enriched" with ratio factors for each coordinate. The closer to zero we set one or more terms, the less relative influence the associated coordinate exerts on the curve (and of course the higher we set them, the more influence they have). Try to change the values and see how it affects what gets drawn:

<graphics-element title="Our rational cubic Bézier curve" src="./rational.js">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-1">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-2">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-3">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-4">
</graphics-element>

You can think of the ratio values as each coordinate's "gravity": the higher the gravity, the closer to that coordinate the curve will want to be. You'll also notice that if you simply increase or decrease all the ratios by the same amount, nothing changes... much like with gravity, if the relative strengths stay the same, nothing really changes. The values define each coordinate's influence _relative to all other points_.

<div class="howtocode">

### How to implement rational curves

Extending the code of the previous section to include ratios is almost trivial:

```
function RationalBezier(2,t,w[],r[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  f = [
    r[0] * mt2,
    2 * r[1] * mt * t,
    r[2] * t2
  ]
  basis = f[0] + f[1] + f[2]
  return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2])/basis

function RationalBezier(3,t,w[],r[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  f = [
    r[0] * mt3,
    3 * r[1] * mt2 * t,
    3 * r[2] * mt * t2,
    r[3] * t3
  ]
  basis = f[0] + f[1] + f[2] + f[3]
  return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2] + f[3] * w[3])/basis
```

And that's all we have to do.

</div>
