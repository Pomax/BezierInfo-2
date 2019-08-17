# Rational Bézier curves

We can further control Bézier curves by "rationalising" them: that is, adding a "ratio" value in addition to the weight value discussed in the previous section.

Where, for plain Bézier curves, we saw the function:

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{weight}{\underbrace{w_i}}
\]

For Rational Bézier this function has one more term:

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{weight}{\underbrace{w_i}}
                \cdot\
                \underset{ratio}{\underbrace{r_i}}
\]

That may, again, looks complicated, but as before things are much simpler than the maths makes them look: the weights are just our curve points, and the ratios are simply numbers that will increase or decrease the influence of each point on the final curve. In order to make sure the curve always starts and ends on the start and end points, the first and last ratio value are typically set to 1 (because multiplying by 1 does not change a number), with values that are typically between 0 and 1 for each control point.

Taking the same curve as the previous section:

\[
\left \{ \begin{matrix}
  x = BLUE[120] \cdot (1-t)^3 + BLUE[35] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[220] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[220] \cdot t^3 \\
  y = BLUE[160] \cdot (1-t)^3 + BLUE[200] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[260] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[40] \cdot t^3
\end{matrix} \right.
\]

We can make this a rational curve by adding in some ratio values:

\[
\left \{ \begin{matrix}
  x = RED[1.0] \cdot BLUE[120] \cdot (1-t)^3 + BLUE[35] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[220] \cdot 3 \cdot (1-t) \cdot t^2 + RED[1.0] \cdot BLUE[220] \cdot t^3 \\
  y = RED[1.0] \cdot BLUE[160] \cdot (1-t)^3 + BLUE[200] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[260] \cdot 3 \cdot (1-t) \cdot t^2 + RED[1.0] \cdot BLUE[40] \cdot t^3
\end{matrix} \right.
\]

Which gives us the following curve:

<Graphic title="Our rational cubic Bézier curve" setup={this.drawCubic} draw={this.drawCurve} sliders={[
  {min:0,max:1,value:1,step:0.01},
  {min:0,max:1,value:1,step:0.01},
  {min:0,max:1,value:1,step:0.01},
  {min:0,max:1,value:1,step:0.01}
]} onSlide={this.changeRatio} context={this}/>

<div className="howtocode">

### How to implement rational curves

Extending the code of the previous section to include ratios is almost trivial:

```
function Bezier(2,t,w[],r[]):
  ...
  return r[0]*w[0]*mt2 + r[1]*w[1]*2*mt*t + r[2]*w[2]*t2

function Bezier(3,t,w[],r[]):
  ...
  return r[0]*w[0]*mt3 + 3*r[1]*w[1]*mt2*t + 3*r[2]*w[2]*mt*t2 + r[3]*w[3]*t3
```

And that's all we have to do.

</div>
