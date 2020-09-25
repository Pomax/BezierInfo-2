# 简化绘图

我们可以简化绘制的过程，先在具体的位置“采样”曲线，然后用线段把这些点连接起来。由于我们是将曲线转换成一系列“平整的”直线，故将这个过程称之为“拉平(flattening)”。

我们可以先确定“想要X个分段”，然后在间隔的地方采样曲线，得到一定数量的分段。这种方法的优点是速度很快：比起遍历100甚至1000个曲线坐标，我们可以采样比较少的点，仍然得到看起来足够好的曲线。这么做的缺点是，我们失去了“真正的曲线”的精度，因此不能用此方法来做真实的相交检测或曲率对齐。

<div class="figure">
<graphics-element title="拉平一条二次曲线" src="./flatten.js" data-type="quadratic">
  <input type="range" min="1" max="16" step="1" value="4" class="slide-control">
</graphics-element>
<graphics-element title="拉平一条三次曲线" src="./flatten.js" data-type="cubic">
  <input type="range" min="1" max="24" step="1" value="8" class="slide-control">
</graphics-element>
</div>

试着点击图形，并用上下键来降低二次曲线和三次曲线的分段数量。你会发现对某些曲率来说，数量少的分段也能做的很好，但对于复杂的曲率（在三次曲线上试试），足够多的分段才能很好地满足曲率的变化。

<div class="howtocode">

### 如何实现曲线的拉平

让我们来实现刚才简述过的算法：

```
function flattenCurve(curve, segmentCount):
  step = 1/segmentCount;
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for(i=1; i <= segmentCount; i++):
    t = i*step;
    coordinates.push[curve.getXValue(t), curve.getYValue(t)]
  return coordinates;
```

好了，这就是算法的实现。它基本上是画出一系列的线段来模拟“曲线”。

```
function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  coord = coordinates[0], _coord;
  for(i=1; i < coordinates.length; i++):
    _coord = coordinates[i]
    line(coord, _coord)
    coord = _coord
```

我们将第一个坐标作为参考点，然后在相邻两个点之间画线。

</div>
