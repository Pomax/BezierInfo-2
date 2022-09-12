# 控制贝塞尔的曲率，第二部分：有理贝塞尔曲线

我们可以通过“合理化”它们来进一步控制Bézier曲线：也就是说，在上一节讨论的权重值之外再添加一个“比率”值，从而控制每个坐标对曲线的“影响程度”。

将这些比率值添加到普通的Bézier曲线函数是相当容易的。正则函数是这样的：

\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i
\]

有理Bézier曲线的函数还有两项:

\[
  \textit{Rational Bézier}(n,t) = \frac{ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i \cdot BLUE[ratio_i] }{ BLUE[ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot ratio_i ] }
\]

在这里，第一个新项表示每个坐标的额外权重。例如，如果我们的比率值是[1,0.5,0.5,1]，那么 <code>ratio<sub>0</sub> = 1</code>, <code>ratio<sub>1</sub> = 0.5</code>, 以此类推，这实际上是相同的，就好像我们只是使用了不同的权重。到目前为止，没有什么特别的.

然而，第二个新术语是造成差异的原因是：曲线上的每个点不仅仅是一个“双加权”点， 它是我们通过引入该比率计算的“双加权”值的 _一部分_ 。当计算曲线上的点时，我们计算“正常”的Bézier值，然后 _除以_ 只使用比率而不是权重的曲线的Bézier值。

这做了一些意想不到的事情:它把我们的多项式变成了 _不再是_ 多项式的东西。它现在是一种曲线，是多项式的超类，可以做一些非常酷的事情，这是Bézier曲线“自己”做不到的，比如完美地描述圆(我们将在后面的部分看到，这实际上是不可能使用标准Bézier曲线的)。

但最好的方式来展示它的作用是从字面上做到这一点：让我们看看使用交互式图形“合理化”我们的贝塞尔曲线的效果，以获得合理化的曲线。 下图显示了上一节中的贝塞尔曲线，“丰富”了每个坐标的比率因子。 我们设置一个或多个项越接近零，相关坐标对曲线施加的相对影响就越小（当然，我们设置的越高，它们的影响就越大）。 尝试更改值并查看它如何影响绘制的内容：

<graphics-element title="Our rational cubic Bézier curve" src="./rational.js">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-1">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-2">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-3">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-4">
</graphics-element>

你可以将比率值视为每个坐标的“重力”：重力越高，曲线就越接近该坐标。你还会注意到，如果你只是简单地增加或减少所有比率相同的数量，将不会发生任何变化……就像重力一样，如果相对强度保持不变，那么什么都不会改变。这些值定义了每个坐标 _相对于所有其他点_ 的影响。

<div class="howtocode">

### 如何实现有理曲线

扩展上一节的代码以包含比率是很容易的：

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

这就是我们所要做的。

</div>
