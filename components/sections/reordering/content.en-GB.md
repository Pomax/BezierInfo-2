# Lowering and elevating curve order

One interesting property of Bézier curves is that an *n<sup>th</sup>* order curve can always be perfectly represented by an *(n+1)<sup>th</sup>* order curve, by giving the higher order curve specific control points.

If we have a curve with three points, then we can create a four point curve that exactly reproduce the original curve as long as we give it the same start and end points, and for its two control points we pick "1/3<sup>rd</sup> start + 2/3<sup>rd</sup> control" and "2/3<sup>rd</sup> control + 1/3<sup>rd</sup> end", and now we have exactly the same curve as before, except represented as a cubic curve, rather than a quadratic curve.

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

We can apply this to a (semi) random curve, as is done in the following graphic. Select the sketch and press your up and down arrow keys to elevate or lower the curve order.

<Graphic preset="simple" title={"A " + this.getOrder() + " order Bézier curve"} setup={this.setup} draw={this.draw} onKeyDown={this.props.onKeyDown} />

There is a good, if mathematical, explanation on the matrices necessary for optimal reduction over on [Sirver's Castle](http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves), which given time will find its way in a more direct description into this article.
