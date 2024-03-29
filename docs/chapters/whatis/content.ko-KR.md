# 베지에 곡선은 어떻게 만드나요?

곡선의 점들을 이리저리 옮겨보고 나면 베지에 곡선이 어떤 모양을 하는지 어느 정도 감이 올 것입니다. 그런데 베지에 곡선이라는 게 정말 *무엇*일까요? 베지에 곡선의 정체는 두 가지 방법으로 설명할 수 있고, 알고 보면 둘 다 완전히 동일하지만, 하나는 복잡한 수식을 쓰고 다른 하나는 정말 쉬운 수식을 씁니다. 그러니까... 일단 쉬운 설명부터 들어 봅시다.

베지에 곡선은 [선형 보간](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95_%EB%B3%B4%EA%B0%84%EB%B2%95)의 결과물입니다. 말로만 들으면 어려워 보이지만 사실은 독자 여러분도 어릴 때부터 선형 보간을 한 적이 있을 것입니다. 무언가 둘 사이에 있는 것을 가리킬 때 했던 것이 바로 선형 보간, 즉 "두 점 사이에 점을 하나 찍는 것"입니다.

이 두 점 사이의 거리를 알고 있고, 예를 들어서 새로운 점을 한 점에서 20% 거리에(즉, 다른 점에서 80% 거리에) 찍으려고 한다면 이 점의 위치는 정말 쉽게 계산할 수 있습니다.

\[
\left (
  \begin{aligned}
    p_1 &= \textit{한 점} \\
    p_2 &= \textit{다른 점} \\
    \textit{거리} &= (p_2 - p_1) \\
    \textit{비율} &= \frac{\textit{퍼센트}}{100} \\
  \end{aligned}
\right ) \textit{이라 할 때},~\textit{새 점의 위치} = p_1 + \textit{거리} \cdot \textit{비율}
\]

눈으로도 직접 확인해 봅시다. 아래 그림은 상하 방향키로 보간 비율을 늘리거나 줄이면서 어떻게 바뀌는지 확인할 수 있는 인터랙티브 그래픽입니다. 우선 세 점으로 시작해서 선분을 두 개 그립니다. 이 두 선분에 선형 보간을 해서 두 점을 얻을 수 있고, 이 두 점 사이에 다시 선형 보간을 하면 한 점이 됩니다. 바로 이 점(과 모든 비율에 대해 같은 방법으로 취한 모든 점)이 베지에 곡선이 됩니다.

<graphics-element title="선형 보간으로 베지에 곡선을 얻는 과정" width="825" src="./interpolation.js">
  <input type="range" min="10" max="90" step="1" value="25" class="slide-control">
</graphics-element>

바로 여기서 복잡한 수학... 미적분이 등장합니다.

전혀 그렇게 느껴지지는 않겠지만, 우리가 여기서 한 것이 바로 이차곡선을 (한 획이 아니라 여러 단계에 걸쳐) 그리는 작업입니다. 베지에 곡선의 신기한 점 중 하나가 같은 대상을 다항함수로도, 혹은 간단하게 보간의 보간의 ... 보간으로도 나타낼 수 있다는 것입니다. 다시 말하자면, 우리는 이 곡선의 성질을 "진짜 수학"을 통해서든(곡선의 함수와 도함수 따위를 이용해서), "기계적" 구성을 통해서든(예를 들어, 베지에 곡선은 곡선을 그리는 데 사용한 점 밖으로 빠져나가지 않음을 알 수 있습니다) 탐구할 수 있습니다.

이제부터는 베지에 곡선을 조금 더 자세히 ― 수식으로 어떻게 표현하는지, 어떤 성질을 가지고 있는지, 어떻게 변형하고 어떻게 쓸 수 있는지 ― 알아보도록 하겠습니다.
