        <p>Now, if Catmull-Rom curves go through points, can't we just use those to do curve fitting, instead?
           As a matter of fact, we can, but there's a difference between the kind of curve fitting we did in the
           previous section, and the kind of curve fitting that we can do with Catmull-Rom curves. In the previous
           section we came up with a single curve that goes through three points. There was a decent amount of
           maths and computation involved, and the end result was four coordinates that described a single curve.</p>

        <p>Using Catmull-Rom curves, we need virtually no computation, but we're going to end up with two curves
           that together describe a single curvature from point 1 through point 2 to point 3. Rather than three points,
           we end up needing eight points, describing not one but two curves.</p>

        <p>Much like for Bézier curves, we'll have to "clamp" some free parameters, but there are some default values
          we can pick that lead to æsthetic curves.

        <p>In the following graphic, we see our three points to draw a curvature through on the left, with a
           triangle that connects them shown. In the second panel, we see some of our options: In order to
           draw the Catmull-Rom curves we want, we need to determine a "virtual" starting point and end point,
           so that at points p1 and p3 we have tangents based on the points before and after them. The naive
           choice would be to simply mirror p2 over p1 and p3, which are the lines that flare out from the
           triangle. However, if we follow those, the curve would be very weird: heading towards and away from
           p2 at p1 and p3 respectively, but parallel to the line p1-p3 at point p2.</p>

        <p>Another option would be to make sure our curve always departs from p1 and arrives at p3 perpendicular
           to the line p1-p3. To achieve this, we project P2 onto the line P1--P3. How we do this is freeform, so
           for this example let's project it based on "half the incidence angle":</p>

        <textarea class="sketch-code" data-sketch-preset="threepanel" data-sketch-title="Catmull-Rom curve fitting">
        Point p1, p2, p3;
        float f = 1.0,
              ratio = 0,
              st = -0.5,
              TAU = 2*PI;

        void setupCurve() {
          p1 = new Point(90, 265);
          p2 = new Point(95, 125);
          p3 = new Point(195, 80);
          Point[] pts = {p1, p2,p3};
          BezierCurve c = new BezierCurve(pts);
          curves.add(c);
        }

        float[] angle123(Point p, Point o1, Point o2) {
          float a1 = (atan2(o1.y-p.y, o1.x-p.x) + TAU) % TAU;
          float a2 = (atan2(o2.y-p.y, o2.x-p.x) + TAU) % TAU;
          return new float[] { a1, a2, abs(a2-a1) };
        }

        void drawCurve(BezierCurve curve) {
          Point[] pts = curve.points;
          p1 = pts[0];
          p2 = pts[1];
          p3 = pts[2];

          curve.drawPoints();

          stroke(0);
          line(dim,0,dim,dim);
          nextPanel();

          // visualise the angles

          Point[] points = {null, p1, p2, p3, null};
          float[] angles = {0,
                            angle123(p1,p2,p3),
                            angle123(p2,p3,p1),
                            angle123(p3,p1,p2),
                            0};

          stroke(127);
          fill(0,20);
          float start, end;
          boolean flip;
          Point m2;

					start = angles[2][0] < angles[2][1] ? angles[2][0] : angles[2][1],
					end   = start + angles[2][2];
					flip  = angles[2][2] > PI;
					if(flip) { float _tmp = start; start = end; end = _tmp + TAU; }
					arc(points[2].x, points[2].y, 40, 40, start, end);
  				float phi = start + (end-start)/2;
					m2 = new Point(100 * cos(phi) + p2.x, 100 * sin(phi) + p2.y);

          stroke(128);
          fill(0,5);
          triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
          m2 = lli(new Points[]{p2, m2, p1, p3});

          float dx = m2.x - p2.x,
                dy = m2.y - p2.y;

          Point  m = new Point( p2.x + dx + f*dx, p2.y + dy + f*dy);
          Point p0 = new Point( p1.x - f*(p2.x-p1.x), p1.y - f*(p2.y-p1.y));
          Point p4 = new Point( p3.x + f*(p3.x-p2.x), p3.y + f*(p3.y-p2.y));

          line(p2.x, p2.y, m.x, m.y);

          float x0 = ratio * p0.x + (1-ratio) * m.x,
                y0 = ratio * p0.y + (1-ratio) * m.y,
                x4 = ratio * p4.x + (1-ratio) * m.x,
                y4 = ratio * p4.y + (1-ratio) * m.y;


          stroke(200);
          line(x0, y0, p1.x, p1.y);
          line(p3.x, p3.y, x4, y4);

          stroke(0);
          line(dim,0,dim,dim);

          fill(0,0,200);
          m.draw("virtual p0 / p4\n");
          curve.drawPoints();

          nextPanel();

          curve.drawPoints();

          stroke(0,0,100);
          noFill();
          beginShape();
          curveTightness(st);
          curveVertex(  x0,   y0);
          curveVertex(p1.x, p1.y);
          curveVertex(p2.x, p2.y);
          curveVertex(p3.x, p3.y);
          curveVertex(  x4,   y4);
          endShape();
        }

				Point lli(Point[] pts) {
					float x1=pts[0].x, y1=pts[0].y,
								x2=pts[1].x, y2=pts[1].y,
								x3=pts[2].x,y3=pts[2].y,
								x4=pts[3].x,y4=pts[3].y,
								nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),
								ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),
								d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
					if(d==0) { return null; }
					return new Point(nx/d, ny/d);
				}
        </textarea>

        <p>In the right panel, we see the Catmull-Rom curvature, consisting of two curves (one from p1 to p2, one
           from p2 to p3, using the same virtual start as end point, where the grey lines meet), with several
           tweakable parameters fixed: the curve tension has been chosen, the tangent at p1 has been chosen,
           and the tangent at p3 has been chosen. Changing any of these three values will yield a different curve,
           and the art of curve fitting is, again, in finding appropriate values to make a decent looking curve.</p>

        <p>Now, can we no convert this to a Bézier curve? Short answer no. Longer answer: no, but we can convert this
           to <strong>two</strong> Bézier curves, since our curvature consists of two Catmull-Rom curves. Do we need to? Sometimes we do, but we already know how to convert between the two forms, so that's not all too problematic.</p>
