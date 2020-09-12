# Curve/curve intersection

Using de Casteljau's algorithm to split the curve we can now implement curve/curve intersection finding using a "divide and conquer" technique:

1. Take two curves *C<sub>1</sub>* and *C<sub>2</sub>*, and treat them as a pair.
2. If their bounding boxes overlap, split up each curve into two sub-curves
3. With *C<sub>1.1</sub>*, *C<sub>1.2</sub>*, *C<sub>2.1</sub>* and *C<sub>2.2</sub>*, form four new pairs (*C<sub>1.1</sub>*,*C<sub>2.1</sub>*), (*C<sub>1.1</sub>*, *C<sub>2.2</sub>*), (*C<sub>1.2</sub>*,*C<sub>2.1</sub>*), and (*C<sub>1.2</sub>*,*C<sub>2.2</sub>*).
4. For each pair, check whether their bounding boxes overlap.
  1. If their bounding boxes do not overlap, discard the pair, as there is no intersection between this pair of curves.
  2. If there <em>is</em> overlap, rerun all steps for this pair.
5. Once the sub-curves we form are so small that they effectively occupy sub-pixel areas, we consider an intersection found, noting that we might have a cluster of multiple intersections at the sub-pixel level, out of which we pick one to act as "found" `t` value (we can either throw all but one away, we can average the cluster's `t` values, or you can do something even more creative).

This algorithm will start with a single pair, "balloon" until it runs in parallel for a large number of potential sub-pairs, and then taper back down as it homes in on intersection coordinates, ending up with as many pairs as there are intersections.

The following graphic applies this algorithm to a pair of cubic curves, one step at a time, so you can see the algorithm in action. Click the button to run a single step in the algorithm, after setting up your curves in some creative arrangement. You can also change the value that is used in step 5 to determine whether the curves are small enough. Manipulating the curves or changing the threshold will reset the algorithm, so you can try this with lots of different curves.

(can you find the configuration that yields the maximum number of intersections between two cubic curves? Nine intersections!)

<graphics-element title="Curve/curve intersections" width="825" src="./curve-curve.js">
  <button class="next">Advance one step</button>
  <input type="range" min="0.01" max="5" step="0.01" value="1" class="slide-control">
</graphics-element>

Finding self-intersections is effectively the same procedure, except that we're starting with a single curve, so we need to turn that into two separate curves first. This is trivially achieved by splitting at an inflection point, or if there are none, just splitting at `t=0.5` first, and then running the exact same algorithm as above, with all non-overlapping curve pairs getting removed at each iteration, and each successive step homing in on the curve's self-intersection points.
