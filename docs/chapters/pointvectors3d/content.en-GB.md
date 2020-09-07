# Working with 3D normals

Before we move on to the next section we need to spend a little bit of time on the difference between 2D and 3D. While for many things this difference is irrelevant and the procedures are identical (for instance, getting the 3D tangent is just doing what we do for 2D, but for x, y, and z, instead of just for x and y), when it comes to normals things are a little more complex, and thus more work. Mind you, it's not "super hard", but there are more steps involved and we should have a look at those.

Getting normals in 3D is in principle the same as in 2D: we take the normalised tangent vector, and then rotate it by a quarter turn. However, this is where things get that little more complex: we can turn in quite a few directions, since "the normal" in 3D is a plane, not a single vector, so we basically need to define what "the" normal is in the 3D case.

The "naïve" approach is to construct what is known as the [Frenet normal](https://en.wikipedia.org/wiki/Frenet%E2%80%93Serret_formulas), where we follow a simple recipe that works in many cases (but does super bizarre things in some others). The idea is that even though there are infinitely many vectors that are perpendicular to the tangent (i.e. make a 90 degree angle with it), the tangent itself sort of lies on its own plane already: since each point on the curve (no matter how closely spaced) has its own tangent vector, we can say that each point lies in the same plane as the local tangent, as well as the tangents "right next to it".

Even if that difference in tangent vectors is minute, "any difference" is all we need to find out what that plane is - or rather, what the vector perpendicular to that plane is. Which is what we need: if we can calculate that vector, and we have the tangent vector that we know lies on a plane, then we can rotate the tangent vector over the perpendicular, and presto. We have computed the normal using the same logic we used for the 2D case: "just rotate it 90 degrees".

So let's do that! And in a twist surprise, we can do this in four lines:

- **a** = normalize(B'(t))
- **b** = normalize(**a** + B''(t))
- **r** = normalize(**b** × **a**)
- **normal** = normalize(**r** × **a**)

Let's unpack that a little:

- We start by taking the [normalized vector](https://en.wikipedia.org/wiki/Unit_vector) for the derivative at some point on the curve. We normalize it so the maths is less work. Less work is good.
- Then, we compute **b** which represents what a next point's tangent would be if the curve stopped changing at our point and just had the same derivative and second derivative from that point on.
- This lets us find two vectors (the derivative, and the second derivative added to the derivative) that lie on the same plane, which means we can use them to compute a vector perpendicular to that plane, using an elementary vector operation called the [cross product](https://en.wikipedia.org/wiki/Cross_product). (Note that while that operation uses the × operator, it's most definitely not a multiplication!) The result of that gives us a vector that we can use as the "axis of rotation" for turning the tangent a quarter circle to get our normal, just like we did in the 2D case.
- Since the cross product lets us find a vector that is perpendicular to some plane defined by two other vectors, and since the normal vector should be perpendicular to the plane that the tangent and the axis of rotation lie in, we can use the cross product a second time, and immediately get our normal vector.

And then we're done, we found "the" normal vector for a 3D curve. Let's see what that looks like for a sample curve, shall we? You can move your cursor across the graphic from left to right, to show the normal at a point with a t value that is based on your cursor position: all the way on the left is 0, all the way on the right = 1, midway is t=0.5, etc:

<graphics-element title="Some known and unknown vectors" width="350" height="300" src="./frenet.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

However, if you've played with that graphic a bit, you might have noticed something odd. The normal seems to "suddenly twist around the curve" between t=0.65 and t=0.75... Why is it doing that?

As it turns out, it's doing that because that's how the maths works, and that's the problem with Frenet normals: while they are "mathematically correct", they are "practically problematic", and so for any kind of graphics work what we really want is a way to compute normals that just... look good.

Thankfully, Frenet normals are not our only option.

Another option is to take a slightly more algorithmic approach and compute a form of [Rotation Minimising Frame](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/Computation-of-rotation-minimizing-frames.pdf) (also known as "parallel transport frame" or "Bishop frame") instead, where a "frame" is a set made up of the tangent, the rotational axis, and the normal vector, centered on an on-curve point.

These type of frames are computed based on "the previous frame", so we cannot simply compute these "on demand" for single points, as we could for Frenet frames; we have to compute them for the entire curve. Thankfully, the procedure is pretty simple, and can be performed at the same time that you're building lookup tables for your curve.

The idea is to take a starting "tangent/rotation axis/normal" frame at t=0, and then compute what the next frame "should" look like by applying some rules that yield a good looking next frame. In the case of the RMF paper linked above, those rules are:

- Take a point on the curve for which we know the RM frame already,
- take a next point on the curve for which we don't know the RM frame yet, and
- reflect the known frame onto the next point, by treating the plane through the curve at the point exactly between the next and previous points as a "mirror".
- This gives the next point a tangent vector that's essentially pointing in the opposite direction of what it should be, and a normal that's slightly off-kilter, so:
- reflect the vectors of our "mirrored frame" a second time, but this time using the plane through the "next point" itself as "mirror".
- Done: the tangent and normal have been fixed, and we have a good looking frame to work with.

So, let's write some code for that!

<div class="howtocode">

### Implementing Rotation Minimising Frames

We first assume we have a function for calculating the Frenet frame at a point, which we already discussed above, inn a way that it yields a frame with properties:

```
{
  o: origin of all vectors, i.e. the on-curve point,
  t: tangent vector,
  r: rotational axis vector,
  n: normal vector
}
```

Then, we can write a function that generates a sequence of RM frames in the following manner:

```
generateRMFrames(steps) -> frames:
  step = 1.0/steps

  // Start off with the standard tangent/axis/normal frame
  // associated with the curve at t=0:
  frames.add(getFrenetFrame(0))

  // start constructing RM frames:
  for t0 = 0, t0 < 1.0, t0 += step:
    // start with the previous, known frame
    x0 = frames.last

    // get the next frame: we're going to keep its position and tangent,
    // but we're going to recompute the axis and normal.
    t1 = t0 + step
    x1 = { o: getPoint(t1), t: getDerivative(t) }

    // First we reflect x0's tangent and axis of rotation onto x1,
    // through/ the plane of reflection at the point between x0 x1
    v1 = x1.o - x0.o
    c1 = v1 · v1
    riL = x0.r - v1 * 2/c1 * v1 · x0.r
    tiL = x0.t - v1 * 2/c1 * v1 · x0.t

    // note that v1 is a vector, but 2/c1 and (v1 · ...) are just
    // plain numbers, so we're just scaling v1 by some constant.

    // Then we reflect a second time, over a plane at x1, so that
    // the frame tangent is aligned with the curve tangent again:
    v2 = x1.t - tiL
    c2 = v2 · v2

    // and we're done here:
    x1.r = riL - v2 * 2/c2 * v2 · riL
    x1.n = x1.r × x1.t
    frames.add(x1)
```

Ignoring comments, this is certainly more code than when we were just computing a single Frenet frame, but it's not a crazy amount more code to get much better looking normals.

</div>

Speaking of better looking, what does this actually look like? Let's revisit that earlier curve, but this time use rotation minimising frames rather than Frenet frames:

<graphics-element title="Some known and unknown vectors" width="350" height="300"  src="./rotation-minimizing.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

That looks so much better!

For those reading along with the code: we don't even strictly speaking need a Frenet frame to start with: we could, for instance, treat the z-axis as our initial axis of rotation, so that our initial normal is **(0,0,1) × tangent**, and then take things from there, but having that initial "mathematically correct" frame so that the initial normal seems to line up based on the curve's orientation in 3D space is just nice.
