# THIS SECTION IS CURRENTLY NOT PART OF THE MAIN DOCUMENT, AS IT DOES NOT ACTUALLY TEACH ANYTHING USEFUL.

# Boolean shape operations

We can apply the topics covered so far in this primer to effect boolean shape operations: getting the union, intersection, or exclusion, between two or more shapes that involve Bézier curves. For simplicity (well... sort of, more homogeneity), we'll be looking at poly-Bézier shapes only, but a shape that consists of a mix of lines and Bézier curves is technically a simplification. (Although it does mean we need to write a definition for the class of shapes that mix lines and Bézier curves. Since poly-Bézier curves are a superset, we'll be using those in the following examples.)

The procedure for performing boolean operations consists, broadly, of four steps:

1. Find the intersection points between both shapes,
2. cut up the shapes into multiple sections between these intersections,
3. discard any section that isn't part of the desired operation's resultant shape, and
4. link up the remaining sections to form the new shape.

Finding all intersections between two poly-Bézier curves, or any poly-line-section shape, is similar to the iterative algorithm discussed in the section on curve/curve intersection. For each segment in the poly-Bézier curve, we check whether its bounding box overlaps with any of the segment bounding boxes in the other poly-Bézier curve. If so, we run normal intersection detection.

After finding all intersection points, we split up our poly-Bézier curves, and make sure to record which of the newly formed poly-Bézier curves might potentially link up at the points we split the originals up at. This will let us quickly glue poly-Bézier curves back together after the next step.

Once we have all the new poly-Bézier curves, we run the first step of the desired boolean operation.

- Union: discard all poly-Bézier curves that lie "inside" our union of our shapes. E.g. if we want the union of two overlapping circles, the resulting shape is the outline.
- Intersection: discard all poly-Bézier curves that lie "outside" the intersection of the two shapes. E.g. if we want the intersection of two overlapping circles, the resulting shape is the tapered ellipse where they overlap.
- Exclusion: none of the sections are discarded, but we will need to link the shapes back up in a special way. Flip any section that would qualify for removal under "union" rules.

<div class="grid">
  <figure>
    <img src="images/op_base.gif" height="169"/>
    <figcaption>Two overlapping shapes</figcaption>
  </figure>
  <figure class="labeled-image">
    <img src="images/op_union.gif" height="169"/>
    <figcaption>Their union</figcaption>
  </figure>
  <figure class="labeled-image">
    <img src="images/op_intersection.gif" height="169"/>
    <figcaption>Their intersection</figcaption>
  </figure>
  <figure class="labeled-image">
    <img src="images/op_exclusion.gif" height="169"/>
    <figcaption>Their exclusion (union minus intersection)</figcaption>
  </figure>
</div>

The main complication in the outlined procedure here is determining how sections qualify in terms of being "inside" and "outside" of our shapes. For this, we need to be able to perform point-in-shape detection, for which we'll use a classic algorithm: getting the "crossing number" by using ray casting, and then testing for "insidedness" by applying the [even-odd rule](https://folk.uio.no/bjornw/doc/bifrost-ref/bifrost-ref-12.html): For any point and any shape, we can cast a ray from our point, to some point that we know lies outside of the shape (such as a corner of our drawing surface). We then count how many times that line crosses our shape (remember that we can perform line/curve intersection detection quite easily). If the number of times it crosses the shape's outline is even, the point did not actually lie inside our shape. If the number of intersections is odd, our point did lie inside out shape. With that knowledge, we can decide whether to treat a section that such a point lies on "needs removal" (under union rules), "needs preserving" (under intersection rules), or "needs flipping" (under exclusion rules).

These operations are expensive, and implementing your own code for this is generally a bad idea if there is already a geometry package available for your language of choice. In this case, for JavaScript the most excellent [Paper.js](https://paperjs.org) already comes with all the code in place to perform efficient boolean shape operations, so rather that implement an inferior version here, I can strongly recommend the Paper.js library if you intend to do any boolean shape work.

(Of course, as a general geometry library, Paper.js is also roughly the size of this entire primer, so for illustrative purposes the following graphic implements its own boolean operations, and may not do quite the right thing on all edge cases!)

<graphics-element title="Boolean shape operations" src="./boolean.js"></graphics-element>

