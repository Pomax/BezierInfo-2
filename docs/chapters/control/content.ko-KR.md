# 곡선의 모양 조절하기

여느 스플라인 곡선과 같이 베지에 곡선 역시 보간 함수입니다. 즉, 여러 점을 받아서 그 점들 "사이" 어딘가의 값을 내놓는다는 의미입니다. [이 성질 때문에 이 함수로는 조절점 바깥에 있는 점을 내놓을 수 없습니다(흔히 곡선의 "포"라고 합니다). 유용하죠!] 그뿐만 아니라, 각 점이 함수에서 내놓은 값에 얼마나 기여하는지 시각화하면 곡선에서 어떤 점이 어디에서, 얼마나 중요한지 눈으로 볼 수 있습니다.

아래 그래프는 이차와 삼차 곡선의 보간 함수를 그린 것으로, 세로축인 <i>S</i>가 베지에 곡선의 합에서 그 점의 기여도를 나타냅니다. 아래 슬라이더를 움직여서 원하는 <i>t</i> 값에서 곡선을 구성하는 각 점의 기여도를 퍼센트로 확인할 수 있습니다.

<div class="figure">
<graphics-element title="이차 보간" src="./lerp.js" data-degree="3">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="삼차 보간" src="./lerp.js" data-degree="4">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="15차 보간" src="./lerp.js" data-degree="15">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
</div>

2차와 3차 이외에도 15차 베지에 함수의 그래프를 추가했습니다. 조절점 중에 다른 점보다도 시작점과 끝점이 특히 곡선의 모양에 큰 영향을 미치는 것을 위 그래프에서 볼 수 있습니다.

곡선의 모양을 바꾸고 싶다면, 각 점의 가중치를 바꿈으로써 전체적인 보간 함수를 바꾸어야 합니다. 어떻게 하냐면, 각 점마다 값을 하나씩 곱해서 기여도를 바꾸기만 하면 됩니다! 이보다 더 간단할 수 있을까요? 이 곱해지는 값을 보통 "가중치"라 하고, 위에서 살펴본 원본 베지에 함수에는 이렇게 넣을 수 있습니다.

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{\textit{이항계수 부분}}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{\textit{문자 부분}}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{\textit{가중치}}{\underbrace{w_i}}
\]

얼핏 복잡해 보일 수 있지만, 놀랍게도 여기서 곱한 "가중치" 값이 사실은 곡선을 만들 때 쓴 좌표였습니다. <i>n</i>차 곡선에 대해 w<sub>0</sub>이 시작점의 좌표, w<sub>n</sub>이 끝점의 좌표이고, 나머지는 모두 조절점의 좌표입니다. (110,150)에서 시작하고, 조절점이 (25,190), (210,250)이며 끝점이 (210,30)인 삼차 곡선이 필요하다면 아래의 베지에 곡선 식을 쓰면 됩니다.

\[
\left \{ \begin{matrix}
  x = DARKRED[110] \cdot (1-t)^3 + DARKGREEN[25] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[210] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[210] \cdot t^3 \\
  y = DARKRED[150] \cdot (1-t)^3 + DARKGREEN[190] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[250] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[30] \cdot t^3
\end{matrix} \right.
\]

이 곡선을 그리면 첫 장에서 보았던 바로 그 곡선이 됩니다.

<graphics-element title="위 식으로 그린 삼차 베지에 곡선" src="../introduction/cubic.js"></graphics-element>

베지에 곡선으로 또 뭘 할 수 있을까요? 생각보다 많습니다. 이 책의 나머지 분량은 이 베지에 곡선에 가할 수 있는 여러 가지 연산과 알고리즘, 그리고 이를 통해 무엇을 할 수 있는지를 다룹니다.

<div class="howtocode">

### 가중 기저 함수를 구현하는 방법

기저 함수를 구현하는 법은 알고 있으니, 조절점을 추가하는 것쯤은 일도 아닙니다.

```
function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k<=n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
```

최적화된 코드가 필요한가요?

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

이제 가중 기저 함수를 프로그래밍하는 법도 모두 배웠습니다.

</div>
