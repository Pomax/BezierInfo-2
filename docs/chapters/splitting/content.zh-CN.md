# 分割曲线

使用 de Casteljau 算法我们也可以将一条贝塞尔曲线分割成两条更小的曲线，二者拼接起来即可形成原来的曲线。当采用某个 `t` 值构造 de Casteljau 算法时，该过程会给到我们在 `t` 点分割曲线的所有点: 一条曲线包含该曲线上点之前的所有点，另一条曲线包含该曲线上点之后的所有点。

<graphics-element title="分割一条曲线" width="825" src="./splitting.js">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>

<div class="howtocode">

### 分割曲线的代码实习

通过在 de Casteljau 函数里插入一些额外的输出代码，我们就可以实现曲线的分割：

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

对某个给定 `t` 值，该函数执行后，数组 `left` 和 `right` 将包含两条曲线的所有点的坐标 -- 一条是`t`值左侧的曲线，一条是`t`值右侧的曲线， 与原始曲线同序且完全重合。

</div>
