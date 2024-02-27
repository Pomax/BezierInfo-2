# 控制贝塞尔曲线的曲率，第二部分：有理贝塞尔

我们可以通过“有理化”来进一步控制贝塞尔曲线，即，除了在上一小节中讨论的权重外，还通过添加“比率”参数来调节每个控制点对曲线影响的“强度”。

常规的贝塞尔曲线函数表达式如下：

\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i
\]

将比率添加到其中非常容易，只需要添加两项。有理贝塞尔曲线函数表达式如下：

\[
  \textit{Rational Bézier}(n,t) = \frac{ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i \cdot BLUE[ratio_i] }{ BLUE[ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot ratio_i ] }
\]

这里，第一个新添项表示的是每个控制点的一个“额外的”权重。例如，如果比率为[1,0.5,0.5,1]，那么<code>ratio<sub>0</sub> = 1</code>, <code>ratio<sub>1</sub> = 0.5</code>，以此类推。可见，这就好比使用了“双重加权”，并没有什么特别之处。

特别之处在于第二个新添项：曲线上的每个点不仅仅是一个“双重加权”点，它是通过引入比率计算的“双重加权”值的一个分数。当计算曲线上的点时，我们先计算“常规的”贝塞尔值，然后除以用比率，而不是权重计算出来的新曲线的贝塞尔值。

这会产生一些意想不到的结果：它把多项式变成了非多项式的表达式。它现在是一种由多项式的超类表示的曲线，能够实现一些贝塞尔曲线本身无法实现的很酷的事情，例如准确地描述圆形(稍后会看到，这是贝塞尔曲线无法做到的。)

展示贝塞尔曲线有理化作用的最佳方法还是使用交互式图片来查看效果。下方图片显示的是前序小节中使用的贝塞尔曲线的每个控制点添加了比率的结果。比率值越接近于0，相关控制点对曲线的相对影响就越小，反之亦然。请尝试更改这些比率值并观察它们如何影响曲线：

<graphics-element title="Our rational cubic Bézier curve" src="./rational.js">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-1">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-2">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-3">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-4">
</graphics-element>

你可以把比率想象为每个控制点的“重力”：重力越大，曲线就越接近该控制点。你还会注意到，如果只是将所有比率都增加或减少相同的值，则曲线不会发生任何变化。就像重力一样，如果相对强度保持不变，则不会发生任何真正的变化。这些值决定了每个控制点对其他点的影响。

<div class="howtocode">

### 如何实现有理化曲线

给前序小节的代码添加比率非常简单：

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

这就是我们需要做的全部。

</div>
