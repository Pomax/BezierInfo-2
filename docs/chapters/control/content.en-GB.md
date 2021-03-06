# Controlling Bézier curvatures

Bézier curves are, like all "splines", interpolation functions. This means that they take a set of points, and generate values somewhere "between" those points. (One of the consequences of this is that you'll never be able to generate a point that lies outside the outline for the control points, commonly called the "hull" for the curve. Useful information!). In fact, we can visualize how each point contributes to the value generated by the function, so we can see which points are important, where, in the curve.

The following graphs show the interpolation functions for quadratic and cubic curves, with "S" being the strength of a point's contribution to the total sum of the Bézier function. Click-and-drag to see the interpolation percentages for each curve-defining point at a specific <i>t</i> value.

<div class="figure">
<graphics-element title="Quadratic interpolations" src="./lerp.js" data-degree="3">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="Cubic interpolations" src="./lerp.js" data-degree="4">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="15th degree interpolations" src="./lerp.js" data-degree="15">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
</div>

Also shown is the interpolation function for a 15<sup>th</sup> order Bézier function. As you can see, the start and end point contribute considerably more to the curve's shape than any other point in the control point set.

If we want to change the curve, we need to change the weights of each point, effectively changing the interpolations. The way to do this is about as straightforward as possible: just multiply each point with a value that changes its strength. These values are conventionally called "weights", and we can add them to our original Bézier function:

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{\textit{binomial term}}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{\textit{polynomial term}}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{\textit{weight}}{\underbrace{w_i}}
\]

That looks complicated, but as it so happens, the "weights" are actually just the coordinate values we want our curve to have: for an <i>n<sup>th</sup></i> order curve, w<sub>0</sub> is our start coordinate, w<sub>n</sub> is our last coordinate, and everything in between is a controlling coordinate. Say we want a cubic curve that starts at (110,150), is controlled by (25,190) and (210,250) and ends at (210,30), we use this Bézier curve:

\[
\left \{ \begin{matrix}
  x = DARKRED[110] \cdot (1-t)^3 + DARKGREEN[25] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[210] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[210] \cdot t^3 \\
  y = DARKRED[150] \cdot (1-t)^3 + DARKGREEN[190] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[250] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[30] \cdot t^3
\end{matrix} \right.
\]

Which gives us the curve we saw at the top of the article:

<graphics-element title="Our cubic Bézier curve" src="../introduction/cubic.js"></graphics-element>

What else can we do with Bézier curves? Quite a lot, actually. The rest of this article covers a multitude of possible operations and algorithms that we can apply, and the tasks they achieve.

<div class="howtocode">

### How to implement the weighted basis function

Given that we already know how to implement basis function, adding in the control points is remarkably easy:

```
function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k<=n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
```

And now for the optimized versions:

```
function Bezier(2,t,w[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return w[0]*mt2 + w[1]*2*mt*t + w[2]*t2

function Bezier(3,t,w[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3
```

And now we know how to program the weighted basis function.

</div>
