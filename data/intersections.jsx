        <p>Let's look at some more things we will want to do with Bézier curves. Almost immediately after figuring out how to
        get bounding boxes to work, people tend to run into the problem that even though the minimal bounding box (based on
        rotation) is tight, it's not sufficient to perform collision detection ("<i>does curve C touch, or pass through, curve
        or line L?</i>"). In order to do this, we need to know whether or not there's an intersection on the actual curve.</p>

        <p>We'll do this in steps, because it's a bit of a journey to get to curve/curve intersection checking. First, let's
        start simple, by implementing a line-line intersection checker. While we can solve this the traditional calculus way
        (determine the functions for both lines, then compute the intersection by equating them and solving for two unknowns),
        linear algebra actually offers a nicer solution:</p>

        <p id="intersection_ll">if we have two line segments with two coordinates each, segments A-B and C-D, we can find the
        intersection of the lines these segments are an intervals on by linear algebra, using the procedure outlined in this
        <a href="http://www.topcoder.com/tc?module=Static&d1=tutorials&d2=geometry2#line_line_intersection">top coder</a> article.
        Of course, we need to make sure that the intersection isn't just on the lines our line segments lie on, but also on our
        line segments themselves, so after we find the intersection we need to verify it lies without the bounds of our original
        line segments.</p>

        <p>The following graphic implements this intersection detection, showing a red point for an intersection on the lines
        our segments lie on (thus being a virtual intersection point), and a green point for an intersection that lies on
        both segments (being a real intersection point).</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Line/line intersections">
        Point p1, p2, p3, p4;

        void setupCurve() {
          p1 = new Point(50,50);
          p2 = new Point(150,110);
          curves.add(new BezierCurve(new Point[]{p1,p2}, false));
          p3 = new Point(50,250);
          p4 = new Point(170,170);
          curves.add(new BezierCurve(new Point[]{p3,p4}, false));
        }

        void drawCurve(BezierCurve curve) {
          // draw the lines through p1/p2 and p3/p4
          stroke(0,50);
          float dx = 10*(p2.x-p1.x), dy = 10*(p2.y-p1.y);
          line(p1.x-dx,p1.y-dy,p2.x+dx,p2.y+dy);
          dx = 10*(p4.x-p3.x); dy = 10*(p4.y-p3.y);
          line(p3.x-dx,p3.y-dy,p4.x+dx,p4.y+dy);

          // show the line segments
          curves.get(0).draw();
          curves.get(1).draw();

          // show the intersection point
          Point ntr = comp.getProjection(p1,p2,p3,p4);

          // red if virtual intersection, green if real
          boolean oncurves = true;
          if(min(p1.x,p2.x) > ntr.x || ntr.x > max(p1.x,p2.x) ||
             min(p1.y,p2.y) > ntr.y || ntr.y > max(p1.y,p2.y)) oncurves = false;
          if(oncurves) {
            if(min(p3.x,p4.x) > ntr.x || ntr.x > max(p3.x,p4.x) ||
              min(p3.y,p4.y) > ntr.y || ntr.y > max(p3.y,p4.y)) oncurves = false; }

          stroke(oncurves?0:255, oncurves?255:0, 0);
          ellipse(ntr.x,ntr.y,5,5);
        }</textarea>

        <p>Curve/line intersection is more work, but we've already seen the techniques we need to use in order
        to perform it: first we translate/rotate both the line and curve together, in such a way that the line
        coincides with the x-axis. This will position the curve in a way that makes it cross the line at
        points where its y-function is zero. By doing this, the problem of finding intersections between a
        curve and a line has now become the problem of performing root finding on our translated/rotated curve.
        One Newton-Raphson root finding round later and the intersections have been found:</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Quadratic curve/line intersections">
        Point p1, p2;

        void setupCurve() {
          p1 = new Point(40,60);
          p2 = new Point(260,200);
          curves.add(new BezierCurve(new Point[]{
            p1, p2
          }, false));
          curves.add(new BezierCurve(new Point[]{
            new Point(25,150),
            new Point(180,30),
            new Point(230,250)
          }));
        }

        void drawCurve(BezierCurve curve) {
          curves.get(0).draw();
          curves.get(1).draw();

          BezierCurve aligned = curves.get(1).align(p1,p2);
          float[] roots = comp.findAllRoots(0, aligned.y_values);
          fill(150,0,150);
          float x, y;
          for(float t: roots) {
            if(t<0 || t>1) continue;
            x = curves.get(1).getXValue(t);
            y = curves.get(1).getYValue(t);
            ellipse(x,y,5,5);
            text(""+round(1000*t)/1000,x+10,y);
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Cubic curve/line intersections">
        Point p1, p2;

        void setupCurve() {
          p1 = new Point(100,20);
          p2 = new Point(195,255);
          curves.add(new BezierCurve(new Point[]{
            p1, p2
          }, false));
          curves.add(new BezierCurve(new Point[]{
            new Point(150,125),
            new Point(40,30),
            new Point(270,115),
            new Point(145,200)
          }));
        }

        void drawCurve(BezierCurve curve) {
          curves.get(0).draw();
          curves.get(1).draw();

          BezierCurve aligned = curves.get(1).align(p1,p2);
          float[] roots = comp.findAllRoots(0, aligned.y_values);
          fill(150,0,150);
          float x, y;
          for(float t: roots) {
            if(t<0 || t>1) continue;
            x = curves.get(1).getXValue(t);
            y = curves.get(1).getYValue(t);
            ellipse(x,y,5,5);
            text(""+round(1000*t)/1000,x+10,y);
          }
        }</textarea>

        <p>Curve/curve intersection, however, is more complicated. Since we have no straight line to align to, we
        can't simply align one of the curves and be left with a simple procedure. Instead, we'll need to apply two
        techniques we've not covered yet: de Casteljau's algorithm, and curve splitting.</p>