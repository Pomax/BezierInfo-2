# Simplified drawing

We can also simplify the drawing process by "sampling" the curve at certain points, and then joining those points up with straight lines. This process is known as "flattening", because we are reducing a curve to a simple sequence of straight, "flat" lines.

We can do this is by saying "we want X segments", and then sampling the curve at intervals that are spaced such that we end up with the number of segments we wanted. The advantage of this method is that it's fast: instead of evaluating 100 or even 1000 curve coordinates, we can sample a much lower number and still end up with a curve that sort-of-kind-of looks good enough. The disadvantage, of course, is that we lose the precision of working with "the real curve", so we usually can't use the flattened form for doing things like true intersection detection, or curvature alignment.

<Graphic title="Flattening a quadratic curve" setup={this.setupQuadratic} draw={this.drawFlattened} onKeyDown={this.onKeyDown}/>
<Graphic title="Flattening a cubic curve" setup={this.setupCubic} draw={this.drawFlattened} onKeyDown={this.onKeyDown} />

Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You'll notice that for certain curvatures, a low number of segments works quite well, but for more complex curvatures (try this for the cubic curve), a higher number is required to capture the curvature changes properly.

<div className="howtocode">

### How to implement curve flattening

Let's just use the algorithm we just specified, and implement that:

```
function flattenCurve(curve, segmentCount):
  step = 1/segmentCount
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for(i=1; i <= segmentCount; i++):
    t = i*step
    coordinates.push[curve.getXValue(t), curve.getYValue(t)]
  return coordinates;
```

And done, that's the algorithm implemented. That just leaves drawing the resulting "curve" as a sequence of lines:

```
function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  coord = coordinates[0], _coord
  for(i=1; i < coordinates.length; i++):
    _coord = coordinates[i]
    line(coord, _coord)
    coord = _coord
```

We start with the first coordinate as our reference point, and then just draw lines between each point and its next point.

</div>
