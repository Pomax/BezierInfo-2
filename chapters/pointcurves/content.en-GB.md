# Creating a curve from three points

Given the preceding section on curve manipulation, we can also generate quadratic and cubic curves from any three points. However, unlike circle-fitting, which requires just three points, Bézier curve fitting requires three points, as well as a *t* value, so we can figure out where point 'C' needs to be.

The following graphic lets you place three points, and will use the preceding sections on the ABC ratio and curve construction to form a quadratic curve through them. You can move the points you've placed around by click-dragging, or try a new curve by drawing new points with pure clicks. (There's some freedom here, so for illustrative purposes we clamped *t* to simply be 0.5, lets us bypass some maths, since a *t* value of 0.5 always puts C in the middle of the start--end line segment)

<Graphic title="Fitting a quadratic Bézier curve" setup={this.setup} draw={this.drawQuadratic} onClick={this.onClick} />

For cubic curves we also need some values to construct the "de Casteljau line through B" with, and that gives us quite a bit of choice. Since we've clamped *t* to 0.5, we'll set up a line through B parallel to the line start--end, with a length that is proportional to the length of the line B--C: the further away from the baseline B is, the wider its construction line will be, and so the more "bulby" the curve will look. This still gives us some freedom in terms of exactly how to scale the length of the construction line as we move B closer or further away from the baseline, so I simply picked some values that sort-of-kind-of look right in that if a circle through (start,B,end) forms a perfect hemisphere, the cubic curve constructed forms something close to a hemisphere, too, and if the points lie on a line, then the curve constructed has the control points very close to B, while still lying between B and the correct curve end point:

<Graphic title="Fitting a cubic Bézier curve" setup={this.setup} draw={this.drawCubic} onClick={this.onClick} />

In each graphic, the blue parts are the values that we "just have" simply by setting up our three points, combined with our decision on which *t* value to use (and construction line orientation and length for cubic curves). There are of course many ways to determine a combination of *t* and tangent values that lead to a more "æsthetic" curve, but this will be left as an exercise to the reader, since there are many, and æsthetics are often quite personal.
