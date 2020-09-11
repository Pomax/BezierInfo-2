# Intersections

Let's look at some more things we will want to do with Bézier curves. Almost immediately after figuring out how to get bounding boxes to work, people tend to run into the problem that even though the minimal bounding box (based on rotation) is tight, it's not sufficient to perform true collision detection. It's a good first step to make sure there *might* be a collision (if there is no bounding box overlap, there can't be one), but in order to do real collision detection we need to know whether or not there's an intersection on the actual curve.

We'll do this in steps, because it's a bit of a journey to get to curve/curve intersection checking. First, let's start simple, by implementing a line-line intersection checker. While we can solve this the traditional calculus way (determine the functions for both lines, then compute the intersection by equating them and solving for two unknowns), linear algebra actually offers a nicer solution.

### Line-line intersections

If we have two line segments with two coordinates each, segments A-B and C-D, we can find the intersection of the lines these segments are an intervals on by linear algebra, using the procedure outlined in this [top coder](https://www.topcoder.com/community/competitive-programming/tutorials/geometry-concepts-line-intersection-and-its-applications/) article. Of course, we need to make sure that the intersection isn't just on the lines our line segments lie on, but actually on our line segments themselves. So after we find the intersection, we need to verify that it lies without the bounds of our original line segments.

The following graphic implements this intersection detection, showing a red point for an intersection on the lines our segments lie on (thus being a virtual intersection point), and a green point for an intersection that lies on both segments (being a real intersection point).

<graphics-element title="Line/line intersections" src="./line-line.js"></graphics-element>

<div class="howtocode">

### Implementing line-line intersections

Let's have a look at how to implement a line-line intersection checking function. The basics are covered in the article mentioned above, but sometimes you need more function signatures, because you might not want to call your function with eight distinct parameters. Maybe you're using point structs for the line. Let's get coding:

```
lli8 = function(x1,y1,x2,y2,x3,y3,x4,y4):
  var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),
      ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),
      d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
  if d=0:
    return false
  return point(nx/d, ny/d)

lli4 = function(p1, p2, p3, p4):
  var x1 = p1.x, y1 = p1.y,
      x2 = p2.x, y2 = p2.y,
      x3 = p3.x, y3 = p3.y,
      x4 = p4.x, y4 = p4.y;
  return lli8(x1,y1,x2,y2,x3,y3,x4,y4)

lli = function(line1, line2):
  return lli4(line1.p1, line1.p2, line2.p1, line2.p2)
```

</div>

### What about curve-line intersections?

Curve/line intersection is more work, but we've already seen the techniques we need to use in order to perform it: first we translate/rotate both the line and curve together, in such a way that the line coincides with the x-axis. This will position the curve in a way that makes it cross the line at points where its y-function is zero. By doing this, the problem of finding intersections between a curve and a line has now become the problem of performing root finding on our translated/rotated curve, as we already covered in the section on finding extremities.

<div class="figure">
<graphics-element title="Quadratic curve/line intersections" src="./curve-line.js" data-type="quadratic"></graphics-element>
<graphics-element title="Cubic curve/line intersections" src="./curve-line.js" data-type="cubic"></graphics-element>
</div>

Curve/curve intersection, however, is more complicated. Since we have no straight line to align to, we can't simply align one of the curves and be left with a simple procedure. Instead, we'll need to apply two techniques we've met before: de Casteljau's algorithm, and curve splitting.
