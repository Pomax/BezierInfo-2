# Splitting curves

Using de Casteljau's algorithm, we can also find all the points we need to split up a Bézier curve into two, smaller curves, which taken together form the original curve. When we construct de Casteljau's skeleton for some value `t`, the procedure gives us all the points we need to split a curve at that `t` value: one curve is defined by all the inside skeleton points found prior to our on-curve point, with the other curve being defined by all the inside skeleton points after our on-curve point.

<Graphic title="Splitting a curve" setup={this.setupCubic} draw={this.drawSplit} />

<div class="howtocode">

### implementing curve splitting

We can implement curve splitting by bolting some extra logging onto the de Casteljau function:

```
left=[]
right=[]
function drawCurve(points[], t):
  if(points.length==1):
    left.add(points[0])
    right.add(points[0])
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      if(i==0):
        left.add(points[i])
      if(i==newpoints.length-1):
        right.add(points[i+1])
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)
```

After running this function for some value `t`, the `left` and `right` arrays will contain all the coordinates for two new curves - one to the "left" of our `t` value, the other on the "right". These new curves will have the same order as the original curve, and can be overlaid exactly on the original curve.

</div>

This is best illustrated with an animated graphic (click to play/pause):

<Graphic title="Bézier curve splitting" setup={this.setupCubic} draw={this.drawAnimated} onClick={this.togglePlay} />
