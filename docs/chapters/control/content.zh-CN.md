# 控制贝塞尔的曲率

贝塞尔曲线是插值方程（就像所有曲线一样），这表示它们取一系列的点，生成一些处于这些点之间的值。（一个推论就是你永远无法生成一个位于这些控制点轮廓线外面的点，更普遍是称为曲线的外壳。这信息很有用！）实际上，我们可以将每个点对方程产生的曲线做出的贡献进行可视化，因此可以看出曲线上哪些点是重要的，它们处于什么位置。

下面的图形显示了二次曲线和三次曲线的差值方程，“S”代表了点对贝塞尔方程总和的贡献。点击拖动点来看看在特定的<i>t</i>值时，每个曲线定义的点的插值百分比。

<div class="figure">
<graphics-element title="二次插值" src="./lerp.js" data-degree="3">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="三次插值" src="./lerp.js" data-degree="4">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="15次插值" src="./lerp.js" data-degree="15">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
</div>

上面有一张是15<sup>th</sup>阶的插值方程。如你所见，在所有控制点中，起点和终点对曲线形状的贡献比其他点更大些。

如果我们要改变曲线，就需要改变每个点的权重，有效地改变插值。可以很直接地做到这个：只要用一个值乘以每个点，来改变它的强度。这个值照惯例称为“权重”，我们可以将它加入我们原始的贝塞尔函数：

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{weight}{\underbrace{w_i}}
\]

看起来很复杂，但实际上“权重”只是我们想让曲线所拥有的坐标值：对于一条n<sup>th</sup>阶曲线，w<sup>0</sup>是起始坐标，w<sup>n</sup>是终点坐标，中间的所有点都是控制点坐标。假设说一条曲线的起点为（120，160），终点为（220，40），并受点（35，200）和点（220，260）的控制，贝塞尔曲线方程就为：

\[
\left \{ \begin{matrix}
  x = DARKRED[110] \cdot (1-t)^3 + DARKGREEN[25] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[210] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[210] \cdot t^3 \\
  y = DARKRED[150] \cdot (1-t)^3 + DARKGREEN[190] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[250] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[30] \cdot t^3
\end{matrix} \right.
\]

这就是我们在文章开头看到的曲线：

<Graphic title="我们的三次贝塞尔曲线" setup={this.drawCubic} draw={this.drawCurve}/>

我们还能对贝塞尔曲线做些什么？实际上还有很多。文章接下来涉及到我们可能运用到的一系列操作和算法，以及它们可以完成的任务。

<div class="howtocode">

### 如何实现权重基本函数

鉴于我们已经知道怎样实现基本函数，在其加入控制点是非常简单的：

```
function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k<n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
```

下面是优化过的版本：

```
function Bezier(2,t,w[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return w[0]*mt2 + w[1]*2*mt*t + w[2]*t2

function Bezier(3,t,w[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3
```

现在我们知道如何编程实现基本权重函数了。

</div>
