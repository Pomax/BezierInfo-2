# ベジエ曲線の曲率の制御

ベジエ曲線は（すべての「スプライン」と同様に）補間関数です。これは点の集合を受け取って、それらの点のどこか「内側」の値を生成するということです。（このことから、制御点同士を結んで輪郭をつくったとき、その外側に位置する点は決して生成されないことがわかります。なお、この輪郭を曲線の「包」と呼びます。お役立ち情報でした！）実際に、補間関数によって生成された値に対する、各点の寄与の大きさを可視化することができますが、これを見れば、ベジエ曲線のどの場所でどの点が重要になるのかがわかります。

下のグラフは、2次ベジエ曲線や3次ベジエ曲線の補間関数を表しています。ここでSは、ベジエ関数全体に対しての、その点の寄与の大きさを示します。ある<i>t</i>において、ベジエ曲線を定義する各点の補間率がどのようになっているのか、クリックドラッグをして確かめてみてください。

<div class="figure">
<graphics-element title="2次の補間" src="./lerp.js" data-degree="3">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="3次の補間" src="./lerp.js" data-degree="4">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="15次の補間" src="./lerp.js" data-degree="15">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
</div>

あわせて、15次ベジエ関数における補間関数も示しています。始点と終点は他の制御点と比較して、曲線の形に対してかなり大きな影響を与えていることがわかります。

曲線を変更したい場合は、各点の重みを変える（実質的には補間率を変える）必要があります。これはとても単純で、寄与の大きさを変えるための値を、各点にただ掛ければいいのです。この値は「重み」と呼ばれていますが、これを元のベジエ関数に組み込めば、次のようになります。

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{二項係数部分の項}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{多項式部分の項}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{重み}{\underbrace{w_i}}
\]

複雑そうに見えますが、運がいいことに「重み」というのは実はただの座標値です。というのは<i>n</i>次の曲線の場合、w<sub>0</sub>が始点の座標、w<sub>n</sub>が終点の座標となり、その間はどれも制御点の座標になります。例えば、始点が(120,160)、制御点が(35,200)と(220,260)、終点が(220,40)となる3次ベジエ曲線は、次のようになります。

\[
\left \{ \begin{matrix}
  x = DARKRED[110] \cdot (1-t)^3 + DARKGREEN[25] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[210] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[210] \cdot t^3 \\
  y = DARKRED[150] \cdot (1-t)^3 + DARKGREEN[190] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[250] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[30] \cdot t^3
\end{matrix} \right.
\]

この式からは、記事の冒頭に出てきた曲線が得られます。

<Graphic title="あの3次ベジエ曲線" setup={this.drawCubic} draw={this.drawCurve}/>

ベジエ曲線で、他にはどんなことができるでしょうか？実は、非常にたくさんのことが可能です。この記事の残りの部分では、実現可能な各種操作や適用可能なアルゴリズム、そしてこれによって達成できるタスクについて扱います。

<div class="howtocode">

### 重みつき基底関数の実装方法

基底関数の実装方法はすでに知っていますし、これに制御点を組み込むのは非常に簡単です。

```
function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k<n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
```

そして、最適化を行ったバージョンは以下のようになります。

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

これで、重みつき基底関数をプログラムする方法がわかりました。

</div>
