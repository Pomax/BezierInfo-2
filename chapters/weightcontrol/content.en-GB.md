# Controlling Bézier curvatures, part 2: Rational Béziers

We can further control Bézier curves by "rationalising" them: that is, adding a "ratio" value in addition to the weight value discussed in the previous section, thereby gaining control over "how strongly" each coordinate influences the curve.

Adding these ratio values to the regular Bézier curve function is fairly easy. Where the regular function is the following:

\[
  Bézier(n,t) = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i
\]

The function for rational Bézier curves has two more terms:

\[
  Rational\ Bézier(n,t) = \left ( \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i \cdot BLUE[ratio_i] \right ) \cdot BLUE[\frac{ 1 }{ Basis_{(n,t)} }]
\]

In this, the first new term represents the ratio for each coordinate, as a multiplication factor. If our ratio values are [1, 0.5, 0.5, 1] then <code>ratio<sub>0</sub> = 1</code>, <code>ratio<sub>1</sub> = 0.5</code>, and so on. The second term then corrects for all those multiplications by dividing the total value by the "basis" value of the Bézier curve, i.e. the value we get by computing the curve without any weighting at (but _with_ ratios):

\[
  Basis_{n,t} = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot ratio_i
\]

So what does this actually do?

Let's look at the effect of "rationalising" our Bézier curves by interacting with the curve and ratios. The following graphic shows the curve from the previous section, enriched with ratio factors: the closer to zero we set one or more terms, the less relative influence the associated coordinates exert on the curve (and of course the higher we set them, the more influence they have).

<Graphic title="Our rational cubic Bézier curve" setup={this.drawCubic} draw={this.drawCurve} sliders={[
  {min:0, max:2, value:1, step:0.01, label:`ratio 1`},
  {min:0, max:2, value:1, step:0.01, label:`ratio 2`},
  {min:0, max:2, value:1, step:0.01, label:`ratio 3`},
  {min:0, max:2, value:1, step:0.01, label:`ratio 4`}
]} setSliders={this.setRatio} onSlide={this.changeRatio} context={this}/>

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
