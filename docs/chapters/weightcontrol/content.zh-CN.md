# 控制贝塞尔曲率，第二部分：有理贝塞尔

我们可以通过“有理化”它们来进一步控制贝塞尔曲线：也就是说，在上一节讨论的权重值之外添加一个“比率”值，从而控制每个坐标对曲线的“影响程度”。

将这些比率值添加到普通的贝塞尔曲线函数是相当容易的。其中普通的贝塞尔函数如下：

\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i
\]

有理贝塞尔曲线的函数多出两项内容:

\[
  \textit{Rational Bézier}(n,t) = \frac{ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i \cdot BLUE[ratio_i] }{ BLUE[ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot ratio_i ] }
\]

在这里，第一个新增项表示每个坐标的附加权重。例如，如果我们的比率值是[1,0.5,0.5,1]，那么<code>ratio<sub>0</sub> = 1</code>, <code>ratio<sub>1</sub> = 0.5</code>，等等，并且实际上是相同的，就好像我们只是使用了不同的权值。到目前为止，还没有什么特别的。

然而，第二个新增项是造成差异的原因：曲线上的每个点不仅仅是一个“双加权”点，它是我们通过引入该比率计算的“双加权”值的_比值分数_。当计算曲线上的点时，我们计算“正常”的贝塞尔值，然后将其_除以_仅使用比率而不含权重的曲线的贝塞尔值。

这做了一些意想不到的事情：它把我们的多项式变成了不再是多项式的东西。它现在是一类曲线，是多项式的超类，可以做一些非常酷的事情，这是贝塞尔曲线“自己”做不到的，比如完美地描述圆(我们将在后面的部分看到，这实际上是不可能使用标准贝塞尔曲线做到的)。

但展示这个功能的最好方法就是按字面意思来做：让我们通过一个有理化曲线的交互式图形，看看“有理化”我们的贝塞尔曲线的效果。下图显示了上一节中的贝塞尔曲线，为每个坐标添加了比率因子。我们设置的一个或多个项越接近于零，相关坐标对曲线的相对影响就越小(当然，设置的项越高，它们的影响就越大)。试着改变这些值，看看它是如何影响绘制结果的：

<graphics-element title="Our rational cubic Bézier curve" src="./rational.js">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-1">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-2">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-3">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-4">
</graphics-element>

你可以将这些比值视为每个坐标的“重力”：重力越大，曲线就越接近该坐标。你还能注意到，如果你只是简单地增加或减少所有比率相同的数量，则没有什么变化……就像重力一样，如果相对强度保持不变，什么都不会改变。这些值定义了每个坐标相对于所有其他点的影响。

<div class="howtocode">

### 如何实现有理化曲线

扩展上一节的代码以包含比率几乎是毫不费力的:

```
function RationalBezier(2,t,w[],r[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  f = [
    r[0] * mt2,
    2 * r[1] * mt * t,
    r[2] * t2
  ]
  basis = f[0] + f[1] + f[2]
  return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2])/basis

function RationalBezier(3,t,w[],r[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  f = [
    r[0] * mt3,
    3 * r[1] * mt2 * t,
    3 * r[2] * mt * t2,
    r[3] * t3
  ]
  basis = f[0] + f[1] + f[2] + f[3]
  return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2] + f[3] * w[3])/basis
```

以上这就是我们要做的事情。

</div>
