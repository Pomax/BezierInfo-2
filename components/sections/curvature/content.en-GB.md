# Curvature of a curve

Obvious, curves are curvier than straight lines, but _how much curvier_ are they? To answer this question, calculus has a relatively straight forward formula for determining [the curvature of a curve](https://en.wikipedia.org/wiki/Curvature): obviously a straight line has a curvature of zero, but for anything that isn't straight, we can calculate the curvature at some point using a relatively straight forward function:

\[
  \kappa(t) = \frac{{B_x}'(t){B_y}''(t) - {B_x}''(t){B_y}'(t)}{({B_x}'(t)^2+{B_y}'(t)^2)^{\frac{2}{3}}}
\]

So, to compute the curvature, we compute the first and second derivatives, and then plug those into this formula. We can also get the _radius of curvature_ in what is truly the simplest function:

\[
  R(t) = \frac{1}{\kappa(t)}
\]

Why is this function useful? Principally, it lets us decide on the smoothest possible curves by looking at the curvature along a curve and making sure it's nice and smooth, rather than having odd clips and bumps in it. For instance, play with the following two curves, and see whether you can make a curve look "smoother" than it already is. Clearly, just because a curve looks smooth doesn't mean it can't be made smoother, and a smoother curve makes for smoother travel along it in things like animation, games, but also makes for more "predicatable" curves in things like graphic design or typography.

<Graphic title="Quadratic curvature" setup={this.setupQuadratic} draw={this.draw} />
<Graphic title="Cubic curvature" setup={this.setupCubic} draw={this.draw} />

You may have noticed that in the cubic case, the curvature at an inflection in the curve is zero. I'm going to be talking about that some more this weekend.