        <p>Using de Casteljau's algorithm to split the curve we can now implement curve/curve intersection
        finding using a "divide and conquer" technique: take two curves <i>C<sub>1</sub></i> and <i>C<sub>2</sub></i>,
        and treat them as a pair. If their bounding boxes overlap, split up each curve into two sub-curves,
        <i>C<sub>1.1</sub></i>, <i>C<sub>1.2</sub></i>, <i>C<sub>2.1</sub></i> and <i>C<sub>2.2</sub></i>,
        and form four new pairs (<i>C<sub>1.1</sub></i>,<i>C<sub>2.1</sub></i>), (<i>C<sub>1.1</sub></i>,
        <i>C<sub>2.2</sub></i>), (<i>C<sub>1.2</sub></i>,<i>C<sub>2.1</sub></i>), and (<i>C<sub>1.2</sub></i>,
        <i>C<sub>2.2</sub></i>). If their bounding boxes do not overlap, discard the pair, as there is no
        intersection between this pair of curves. If there was overlap, for each of the newly formed pairs,
        perform the same evaluation. Once the sub-curves we form are so small that they effectively occupy
        sub-pixel areas, we consider an intersection found.</p>

        <p>This algorithm will start with a single pair, "balloon" until it runs in parallel for a large
        number of potential sub-pairs, and then taper back down as it homes in on intersection coordinates,
        ending up with as many pairs as there are intersections.</p>

        <p>The following graphic applies this algorithm to a pair of cubic curves, slowed down so that
        you can see the algorithm in action. Click the button to run the algorithm, after setting up
        your curves in some creative arrangement: <button id="clippingButton">detect</button></p>

        <textarea class="sketch-code" data-sketch-preset="clipping" data-sketch-title="Curve/curve intersections">
        void iterate() {
          if(pairs.size()==0) {
            iterated = false;
            drawResult();
            noAnimate();
            return; }

          fill(0);
          text("iteration "+(iterationCount++), 10,20);

          newPairs.clear();
          for(CurvePair cp: pairs) {
            cp.draw(getColor(random(999)));
            if(cp.hasOverlap()) {
              if(cp.smallEnough()) { finals.add(cp); }
              else {
                CurvePair[] expanded = cp.splitAndCombine();
                for(CurvePair ncp: expanded) {
                  newPairs.add(ncp);
                }
              }
            }
          }
          pairs.clear();
          for(CurvePair cp: newPairs) { pairs.add(cp); }
        }
        </textarea>

        <p>Self-intersection is dealt with in the same way, except we turn a curve into two or more curves first
        based on the inflection points. We then form all possible curve pairs with the resultant segments, and
        run exactly the same algorithm. All non-overlapping curve pairs will be removed after the first iteration,
        and the remaining steps home in on the curve's self-intersection points.</p>
