# de Casteljau 算法

要计算贝塞尔曲线，我们必须遍历 `t` 的所有值，从 `0` 到 `1`，计算权重函数，得到 `x/y` 的值。当曲线很复杂时，计算量变得非常巨大。利用 `de Casteljau` 算法（一种几何画法），你可以轻易地用笔和尺画出曲线。

我们用以下算法来替代微积分算法：

- 把 `t` 看做一个比例，`t=0` 代表线段的 `0%`，`t=1` 代表线段的 `100%`。

- 画出所有点的连线，对 `n` 阶曲线来说可以画出 `n` 条线。

- 在每条线上一定比例长度处做一个记号。比如 `t` 是 `0.2`，就在开始处 `20%` 的地方做个记号。

- 把相邻的记号连线，得到 `n-1` 条线。

- 在这些新得到的线上同样用 `t` 为比例标记。

- 把相邻标记连成线，得到 `n-2` 根线。

- 标记，连线，这样重复下去。

- 直到剩下一根线。这根线上 `t` 的位置就是曲线 `t` 的位置。

<div className="howtocode">

### 如何实现 `de Casteljau` 算法

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

算法完成。一般来说你不能随意重载 `+` 操作符，因此我们给出用 `x` 和 `y` 坐标计算的实现：

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

以上算法做了什么? 如果参数 `points` 只有一个点， 就画出一个点。如果有多个点，就生成以 `t` 为比例的一系列点（例如，以上算法中的 `markers`），然后用新的点列表画出图像。

</div>

在以下的图表中，拖拽鼠标移动用来计算 `de Casteljau` 算法的基点， 左右移动鼠标，可以实时看到曲线是如何生成的。

<Graphic preset="simple"title="Traversing a curve using de Casteljau's algorithm" setup={this.setup} draw={this.draw}/>
