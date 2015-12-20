        <p>We can apply the topics covered so far in this primer to effect boolean shape operations:
        getting the union, intersection, or exclusion, between two or more shapes that involve Bézier
        curves. For simplicity (well.. sort of, more homogeneity), we'll be looking at Poly-Bézier
        shapes only, but a shape that consists of a mix of lines and Bézier curves is technically a
        simplification (although it does mean we need to write a definition for the class of shapes
        that mix lines and Bézier curves. Since poly-Bézier curves are a superset, we'll be using
        those in the following examples)</p>

        <p>The procedure for performing boolean operations consists, broadly, of four steps:</p>

        <ol>
          <li>Find the intersection points between both shapes,</li>
          <li>cut up the shapes into multiple sections between these intersections,</li>
          <li>discard any section that isn't part of the desired operation's resultant shape, and</li>
          <li>link up the remaining sections to form the new shape.</li>
        </ol>

        <p>Finding all intersections between two poly-Bézier curves, or any poly-line-section shape,
        is similar to the iterative algorithm discussed in the section on curve/curve intersection.
        For each segment in the poly-Bézier curve we check whether its bounding box overlaps with
        any of the segment bounding boxes in the other poly-Bézier curve. If so, we run normal
        intersection detection.</p>

        <p>After we found all intersection points, we split up our poly-Bézier curves, making sure to
        record which of the newly formed poly-Bézier curves might potentially link up at the points
        we split the originals up at. This will let us quickly glue poly-Bézier curves back together
        after the next step.</p>

        <p>Once we have all the new poly-Bézier curves, we run the first step of the desired boolean
        operation.</p>

        <ul>
          <li>Union: discard all poly-Bézier curves that lie "inside" our union of our shapes. E.g. if
          we want the union of two overlapping circles, the resulting shape is the outline.</li>
          <li>Intersection: discard all poly-Bézier curves that lie "outside" the intersection of the
          two shapes. E.g. if we want the intersection of two overlapping circles, the resulting
          shape is the tapered ellipse where they overlap.</li>
          <li>Exclusion: none of the sections are discarded, but we will need to link the shapes back
          up in a special way. Flip any section that would qualify for removal under UNION rules.</li>
        </ul>

        <table class="sketch"><tr><td class="labeled-image">
          <img src="images/op_base.gif" height="169px">
          <p>Two overlapping shapes.</p>
        </td><td class="labeled-image">
          <img src="images/op_union.gif" height="169px">
          <p>The unified region.</p>
        </td><td class="labeled-image">
          <img src="images/op_intersection.gif" height="169px">
          <p >Their intersection.</p>
        </td><td class="labeled-image">
          <img src="images/op_exclusion.gif" height="169px">
          <p>Their exclusion regions.</p>
        </td></tr></table>

        <p>The main complication in the outlined procedure here is determining how sections qualify
        in terms of being "inside" and "outside" of our shapes. For this, we need to be able to
        perform point-in-shape detection, for which we'll use a classic algorithm: getting the
        "crossing number" by using ray casting, and then testing for "insidedness" by applying
        the <a href="http://folk.uio.no/bjornw/doc/bifrost-ref/bifrost-ref-12.html">even-odd
        rule</a>: For any point and any shape, we can cast a ray from our point, to some point that we know
        lies outside of the shape (such as a corner of our drawing surface). We then count how many
        times that line crosses our shape (remember that we can perform line/curve intersection
        detection quite easily). If the number of times it crosses the shape's outline is even,
        the point did not actually lie inside our shape. If the number of intersections is odd,
        our point did lie inside out shape. With that knowledge, we can decide whether to treat
        a section that such a point lies on "needs removal" (under union rules), "needs preserving"
        (under intersection rules), or "needs flipping" (under exclusion rules).</p>

        <p>Applying this rule in a simple setting, the following sketch shows whether your cursor's
        coordinate is considered "inside" or "outside" the given outline shape. Try changing the
        outline's shape to see what happens w.r.t. "insidedness", particularly by introducing
        enclosed regions or self-intersecting loops.</p>

        <textarea class="sketch-code" data-sketch-preset="poly" data-sketch-title="Testing 'insidedness'">
        void setupCurve() {
          setupDefaultCubicPoly();
          int pad = dim/3;
          float k = 0.55228;
          PolyBezierCurve p = polycurves.get(0);
          p.addCurve(new BezierCurve(new Point[]{
            ORIGIN,
            ORIGIN,
            new Point(dim/2-0.55228*pad, dim/2+pad),
            new Point(dim/2, dim/2+pad)
          }));
          p.close();
        }

        void handleMouseMoved(PolyBezierCurve p, int mx, int my) {
          int cross = p.getCrossingNumber(new Point(mx, my), new Point(0,0));
          background(255);
          stroke(0,50);
          line(mx,my,0,0);
          if(cross%2==0) {
            p.draw(color(255,0,0));
          } else {
            p.draw(color(0,255,0));
          }
        }

        void movePoint(PolyBezierCurve p, int pt, int mx, int my) {
          handleMouseMoved(p, mx, my);
          p.movePoint(pvt, mx, my);
        }
        </textarea>

        <p>So, using this approach we can easily detect which parts of a shape to keep, and which to reject.
        After pruning, we perform the last step: link up all the remaining sections. The following sketch
        shows two shapes as well as the result of applying a union (middle) and intersection (right) operation
        to the pair.</p>

        <textarea class="sketch-code" data-sketch-preset="shapes" data-sketch-title="Performing Boolean shape operations">
        void setupCurve() {
          setupDefaultShapes();
          fill(0);
          textAlign(CENTER);
        }

        void drawShapes() {
          p1.draw(color(200,0,0));
          p2.draw(color(0,200,0));
          text("shapes (took "+timeTaken()+"ms to set up)", dim/2, dim-10);

          nextPanel();
          stroke(0);
          line(0,0,0,dim);
          mark();
          PolyBezierCurve union = bcomp.getUnion();
          text("shape union (formed in "+timeTaken()+"ms)", dim/2, dim-10);
          union.draw(color(0,255,0), true);

          nextPanel();
          stroke(0);
          line(0,0,0,dim);
          mark();
          PolyBezierCurve intersection = bcomp.getIntersection();
          text("shape intersection (formed in "+timeTaken()+"ms)", dim/2, dim-10);
          intersection.draw(color(255,0,0), true);
        }</textarea>

        <div class="note">
          This sketch is still being fixed up so that it's interactive. While boolean operations are
          not inherently expensive operations (they scale linearly, so the more segments, the longer
          it'll take), but setting up the intersection resolver takes fairly long. I will try to bring
          it down to a reasonable amount of time (on my not-new-but-not-exactly-poor i7 950, it takes
          900ms to set up the intersection resolver... that's at least 4x too slow for interaction).
          So, for now, this sketch is —unfortunately, and with apologies— not interactive.
        </div>
