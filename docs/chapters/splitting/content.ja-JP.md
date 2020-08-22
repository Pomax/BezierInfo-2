# 曲線の分割

ベジエ曲線を分割して、繫ぎ合わせたときに元に戻るような小さい2曲線にしたい場合にも、ド・カステリョのアルゴリズムを使えば、これに必要な点をすべて求めることができます。ある値`t`に対してド・カステリョの骨格を組み立てると、その`t`で曲線を分割する際に必要になる点がすべて得られます。骨格内部の点のうち、曲線上の点から見て手前側にある点によって一方の曲線が定義され、向こう側にある点によってもう一方の曲線が定義されます。

<graphics-element title="曲線の分割" width="825" src="./splitting.js">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>

<div class="howtocode">

### 曲線分割の実装方法

ド・カステリョの関数の中に記録する処理を追加すれば、曲線の分割が実装できます。

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

ある値`t`に対してこの関数を実行すると、`left`と`right`に新しい2曲線の座標が入ります。一方は`t`の「左」側、もう一方は「右」側の曲線です。この2曲線は元の曲線と同じ次数になり、また元の曲線とぴったり重なります。

</div>
