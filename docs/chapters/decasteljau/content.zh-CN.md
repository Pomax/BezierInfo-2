# de Casteljau's 算法

要绘制贝塞尔曲线，我们可以从`0`到`1`遍历`t`的所有值，计算权重函数，得到需要画的`x/y`值。但曲线越复杂，计算量也变得越大。我们可以利用“de Casteljau算法"，这是一种几何画法，并且易于实现。实际上，你可以轻易地用笔和尺画出曲线。

我们用以下步骤来替代用`t`计算`x/y`的微积分算法：

- 把`t`看做一个比例（实际上它就是），`t=0`代表线段的0%，`t=1`代表线段的100%。
- 画出所有点的连线，对`n`阶曲线来说可以画出`n`条线。
- 在每条线的`t`处做一个记号。比如`t`是0.2，就在离起点20%（离终点80%）的地方做个记号。
- 连接`这些`点，得到`n-1`条线。
- 在这些新得到的线上同样用`t`为比例标记。
- 把相邻的`那些`点连线，得到`n-2`条线。
- 取记号，连线，取记号，等等。
- 重复这些步骤，直到剩下一条线。这条线段上的`t`点就是原始曲线在`t`处的点。

我们通过实际操作来观察这个过程。在以下的图表中，移动鼠标来改变用de Casteljau算法计算得到的曲线点，左右移动鼠标，可以实时看到曲线是如何生成的。

<graphics-element title="用de Casteljau算法来遍历曲线" src="./decasteljau.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

<div class="howtocode">

### 如何实现de Casteljau算法

让我们使用刚才描述过的算法，并实现它：

```
function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)
```

好了，这就是算法的实现。一般来说你不能随意重载“+”操作符，因此我们给出计算`x`和`y`坐标的实现：

```
function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      x = (1-t) * points[i].x + t * points[i+1].x
      y = (1-t) * points[i].y + t * points[i+1].y
      newpoints[i] = new point(x,y)
    drawCurve(newpoints, t)
```

以上算法做了什么？如果参数points列表只有一个点， 就画出一个点。如果有多个点，就生成以<i>t</i>为比例的一系列点（例如，以上算法中的"标记点"），然后为新的点列表调用绘制函数。

</div>
