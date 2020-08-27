# 簡略化した描画

曲線を複数点で「サンプリング」し、さらにそれを直線で繫げてしまえば、描画の手順を簡略化することができます。単なる一連の直線、つまり「平坦」な線へと曲線を単純化するので、この処理は「平坦化」という名前で知られています。

例えば「X個の線分がほしい」場合には、分割数がそうなるようにサンプリング間隔を選び、曲線をサンプリングします。この方法の利点は速さです。曲線の座標を100個だの1000個だの計算するのではなく、ずっと少ない回数のサンプリングでも、十分きれいに見えるような曲線を作ることができるのです。欠点はもちろん、「本物の曲線」に比べて精度が損なわれてしまうことです。したがって、交点の検出や曲線の位置揃えを正しく行いたい場合には、平坦化した曲線は普通利用できません。

<div class="figure">
  <graphics-element title="2次ベジエ曲線の平坦化" src="./flatten.js" data-type="quadratic">
    <input type="range" min="1" max="16" step="1" value="4" class="slide-control">
  </graphics-element>

  <graphics-element title="3次ベジエ曲線の平坦化" src="./flatten.js" data-type="cubic">
    <input type="range" min="1" max="24" step="1" value="8" class="slide-control">
  </graphics-element>
</div>

2次ベジエ曲線も3次ベジエ曲線も、図をクリックして上下キーを押すと曲線の分割数が増減しますので、試してみてください。ある曲線では分割数が少なくてもうまくいきますが、曲線が複雑になればなるほど、曲率の変化を正確に捉えるためにはより多くの分割数が必要になることがわかります（3次ベジエ曲線で試してみてください）。

<div class="howtocode">

### 曲線平坦化の実装方法

上でいま解説したアルゴリズムを使って実装するだけです。

```
function flattenCurve(curve, segmentCount):
  step = 1/segmentCount;
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for(i=1; i <= segmentCount; i++):
    t = i*step;
    coordinates.push[curve.getXValue(t), curve.getYValue(t)]
  return coordinates;
```

これで完了です。実装できました。あとは、一連の直線で結果の「曲線」を描画するだけです。

```
function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  coord = coordinates[0], _coord;
  for(i=1; i < coordinates.length; i++):
    _coord = coordinates[i]
    line(coord, _coord)
    coord = _coord
```

先頭の座標を参照点にしてスタートし、あとはそれぞれの点からその次の点へと、直線を引いていくだけです。

</div>
