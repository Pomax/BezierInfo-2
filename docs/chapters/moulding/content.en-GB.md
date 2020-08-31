# Manipulating a curve

Armed with knowledge of the "ABC" relation, we can now update a curve interactively, by letting people click anywhere on the curve, find the <em>t</em>-value matching that coordinate, and then letting them drag that point around. With every drag update we'll have a new point "B", which we can combine with the fixed point "C" to find our new point A. Once we have those, we can reconstruct the de Casteljau skeleton and thus construct a new curve with the same start/end points as the original curve, passing through the user-selected point B, with correct new control points.

<graphics-element title="Moulding a quadratic Bézier curve" width="825" src="./mould-quadratic.js"></graphics-element>

**Click-dragging the curve itself** shows what we're using to compute the new coordinates: while dragging you will see the original point B and its corresponding <i>t</i>-value, the original point C for that <i>t</i>-value, as well as the new point B' based on the mouse cursor. Since we know the <i>t</i>-value for this configuration, we can compute the ABC ratio for this configuration, and we know that our new point A' should like at a distance:

\[
  A' = B' - \frac{C - B'}{ratio} = B' + \frac{B' - C}{ratio}
\]

For quadratic curves, this means we're done, since the new point A' is equivalent to the new quadratic control point. For cubic curves, we need to do a little more work:

<Graphic title="Moulding a cubic Bézier curve" setup={this.setupCubic} draw={this.drawMould} onClick={this.placeMouldPoint} onMouseDown={this.markCB} onMouseDrag={this.dragCB} onMouseUp={this.saveCurve}/>

To help understand what's going on, the cubic graphic shows the full de Casteljau construction "hull" when repositioning point B. We compute A' in exactly the same way as before, but we also record the final strut line that forms B in the original curve. Given A', B', and the endpoints e1 and e2 of the strut line relative to B', we can now compute where the new control points should be. Remember that B' lies on line e1--e2 at a distance <i>t</i>, because that's how Bézier curves work. In the same manner, we know the distance A--e1 is only line-interval [0,t] of the full segment, and A--e2 is only line-interval [t,1], so constructing the new control points is fairly easy.

First, we construct the one-level-of-de-Casteljau-up points:

\[
    \left \{ \begin{aligned}
    v1 &= e1 - \frac{e1 - A'}{t} \\
    v2 &= e2 + \frac{e2 - A'}{1 - t}
    \end{aligned} \right .
\]

And then we can compute the new control points:

\[
    \left \{ \begin{aligned}
    C1' &= v1 + \frac{v1 - start}{t} \\
    C2' &= v2 + \frac{v2 - end}{1 - t}
    \end{aligned} \right .
\]

And that's cubic curve manipulation.
