# Aligning curves

While there are an incredible number of curves we can define by varying the x- and y-coordinates for the control points, not all curves are actually distinct. For instance, if we define a curve, and then rotate it 90 degrees, it's still the same curve, and we'll find its extremities in the same spots, just at different draw coordinates. As such, one way to make sure we're working with a "unique" curve is to "axis-align" it.

Aligning also simplifies a curve's functions. We can translate (move) the curve so that the first point lies on (0,0), which turns our *n* term polynomial functions into *n-1* term functions. The order stays the same, but we have less terms. Then, we can rotate the curves so that the last point always lies on the x-axis, too, making its coordinate (...,0). This further simplifies the function for the y-component to an *n-2* term function. For instance, if we have a cubic curve such as this:

\[
\left \{ \begin{matrix}
  x = BLUE[120] \cdot (1-t)^3 BLUE[+ 35] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 220] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 220] \cdot t^3 \\
  y = BLUE[160] \cdot (1-t)^3 BLUE[+ 200] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 260] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 40] \cdot t^3
\end{matrix} \right.
\]

Then translating it so that the first coordinate lies on (0,0), moving all *x* coordinates by -120, and all *y* coordinates by -160, gives us:

\[
\left \{ \begin{matrix}
  x = BLUE[0] \cdot (1-t)^3 BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 100] \cdot t^3 \\
  y = BLUE[0] \cdot (1-t)^3 BLUE[+ 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 120] \cdot t^3
\end{matrix} \right.
\]

If we then rotate the curve so that its end point lies on the x-axis, the coordinates (integer-rounded for illustrative purposes here) become:

\[
\left \{ \begin{matrix}
  x = BLUE[0] \cdot (1-t)^3 BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 12] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 156] \cdot t^3 \\
  y = BLUE[0] \cdot (1-t)^3 BLUE[- 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 140] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 0] \cdot t^3
\end{matrix} \right.
\]

If we drop all the zero-terms, this gives us:

\[
\left \{ \begin{array}{l}
  x = BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 12] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 156] \cdot t^3 \\
  y = BLUE[- 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 140] \cdot 3 \cdot (1-t) \cdot t^2
\end{array} \right.
\]

We can see that our original curve definition has been simplified considerably. The following graphics illustrate the result of aligning our example curves to the x-axis, with the cubic case using the coordinates that were just used in the example formulae:

<graphics-element title="Aligning a quadratic curve" width="550" src="./aligning.js" data-type="quadratic"></graphics-element>

&nbsp;

<graphics-element title="Aligning a cubic curve" width="550" src="./aligning.js" data-type="cubic"></graphics-element>
