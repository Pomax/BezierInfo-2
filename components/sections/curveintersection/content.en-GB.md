# Curve/curve intersection

Using de Casteljau's algorithm to split the curve we can now implement curve/curve intersection finding using a "divide and conquer" technique:

- Take two curves *C<sub>1</sub>* and *C<sub>2</sub>*, and treat them as a pair.
- If their bounding boxes overlap, split up each curve into two sub-curves
- With *C<sub>1.1</sub>*, *C<sub>1.2</sub>*, *C<sub>2.1</sub>* and *C<sub>2.2</sub>*, form four new pairs (*C<sub>1.1</sub>*,*C<sub>2.1</sub>*), (*C<sub>1.1</sub>*, *C<sub>2.2</sub>*), (*C<sub>1.2</sub>*,*C<sub>2.1</sub>*), and (*C<sub>1.2</sub>*,*C<sub>2.2</sub>*).
- For each pair, check whether their bounding boxes overlap.
  - If their bounding boxes do not overlap, discard the pair, as there is no intersection between this pair of curves.
  - If there <em>is</em> overlap, rerun all steps for this pair.
- Once the sub-curves we form are so small that they effectively occupy sub-pixel areas, we consider an intersection found.

This algorithm will start with a single pair, "balloon" until it runs in parallel for a large number of potential sub-pairs, and then taper back down as it homes in on intersection coordinates, ending up with as many pairs as there are intersections.

The following graphic applies this algorithm to a pair of cubic curves, one step at a time, so you can see the algorithm in action. Click the button to run a single step in the algorithm, after setting up your curves in some creative arrangement. The algorithm resets once it's found a solution, so you can try this with lots of different curves (can you find the configuration that yields the maximum number of intersections between two cubic curves? Nine intersections!)

<Graphic preset="clipping" title="Curve/curve intersections" setup={this.setup} draw={this.draw}>
	<button onClick={this.stepUp}>advance one step</button>
</Graphic>

Self-intersection is dealt with in the same way, except we turn a curve into two or more curves first based on the inflection points. We then form all possible curve pairs with the resultant segments, and run exactly the same algorithm. All non-overlapping curve pairs will be removed after the first iteration, and the remaining steps home in on the curve's self-intersection points.
