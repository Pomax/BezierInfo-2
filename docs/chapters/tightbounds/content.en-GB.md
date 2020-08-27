# Tight bounding boxes

With our knowledge of bounding boxes, and curve alignment, We can now form the "tight" bounding box for curves. We first align  our curve, recording the translation we performed, "T", and the rotation angle we used, "R". We then determine the aligned curve's normal bounding box. Once we have that, we can map that bounding box back to our original curve by rotating it by -R, and then translating it by -T.

We now have nice tight bounding boxes for our curves:

<div class="figure">
<graphics-element title="Aligning a quadratic curve" src="./tightbounds.js" data-type="quadratic"></graphics-element>
<graphics-element title="Aligning a cubic curve" src="./tightbounds.js" data-type="cubic"></graphics-element>
</div>

These are, strictly speaking, not necessarily the tightest possible bounding boxes. It is possible to compute the optimal bounding box by determining which spanning lines we need to effect a minimal box area, but because of the parametric nature of Bézier curves this is actually a rather costly operation, and the gain in bounding precision is often not worth it.
