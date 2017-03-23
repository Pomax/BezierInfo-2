# de Casteljau 算法

要绘制贝塞尔曲线，我们可以从0到1遍历`t`的所有值，计算权重函数，得到`x/y`的值。但曲线越复杂，计算量也越大。我们也可以用“de Casteljau算法”绘制曲线这是一种几何画法，并且易于实现。实际上，你可以轻易地用笔和尺画出曲线。

我们用以下算法来替代用`t`计算`x/y`的微积分算法：

- 把`t`看做一个比例（实际上它就是），t=0代表线段的0%，t=1代表线段的100%。

- 画出所有点的连线，对`n`阶曲线来说可以画出`n`条线。

- 在每条线上`t`处做一个记号。比如`t`是0.2，就在离起始20%的位置，离终点80%的位置做个记号。

- 连接`那些`点，得到`n-1`条线。

- 在这些新得到的线上同样用`t`为比例标记。

- 把相邻的`那些`点连线，得到`n-2`根线。

- 标记，连线，这样重复下去。

- 重复这些步骤，直到剩下一条线。这根线上`t`的位置就是曲线在`t`处的点。

<div className="howtocode">

### 如何实现de Casteljau算法

让我们来实现刚才的算法：

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

算法完成。一般来说你不能随意重载“+”操作符，因此我们给出用`x`和`y`坐标计算的实现：

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

以上算法做了什么？如果参数points只有一个点，就画出一个点。如果有多个点，就生成以<i>t</i>为比例的一系列点（例如，以上算法中的“markers”），然后用新的点列表画出图像。

</div>

我们通过实际操作观察这个过程。在以下的图表中，移动鼠标来改变用de Casteljau算法计算得到的曲线点，左右移动鼠标，可以实时看到曲线是如何生成的。

<Graphic preset="simple"title="Traversing a curve using de Casteljau's algorithm" setup={this.setup} draw={this.draw}/>
