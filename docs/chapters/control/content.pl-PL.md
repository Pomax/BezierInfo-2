# Kontrolowanie krzywych Béziera

Krzywe Béziera, podobnie jak wszystkie "krzywe”, są funkcjami interpolacyjnymi. Oznacza to, że biorą zestaw punktów i generują wartości gdzieś "pomiędzy” tymi punktami. (Jedną z konsekwencji tego jest to, że nigdy nie będziesz w stanie wygenerować punktu leżącego poza obrysem punktów kontrolnych, powszechnie nazywaną "powłoką” krzywej. Przydatna informacja!). Faktycznie możemy zwizualizować, w jaki sposób każdy punkt przyczynia się do wartości generowanej przez funkcję, dzięki czemu możemy zobaczyć, które punkty są ważne i gdzie są na krzywej.

Poniższe wykresy przedstawiają funkcje interpolacji dla krzywych kwadratowych i sześciennych, gdzie "S” oznacza siłę udziału punktu w całkowitej sumie funkcji Béziera. Kliknij i przeciągnij, aby zobaczyć wartości procentowe interpolacji dla każdego punktu definiującego krzywą przy określonej wartości <i>t</i>.

<div class="figure">
<graphics-element title="Quadratic interpolations" src="./lerp.js" data-degree="3">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="Cubic interpolations" src="./lerp.js" data-degree="4">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
<graphics-element title="15th degree interpolations" src="./lerp.js" data-degree="15">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>
</div>

Pokazano również funkcję interpolacji dla funkcji Béziera rzędu 15-tego. Jak widać, punkt początkowy i końcowy mają znacznie większy wpływ na kształt krzywej niż jakikolwiek inny punkt w zestawie punktów kontrolnych.

Jeśli chcemy zmienić krzywą, musimy zmienić wagi każdego punktu, skutecznie zmieniając interpolacje. Sposób na to jest tak prosty, jak to tylko możliwe: po prostu pomnóż każdy punkt przez wartość, która zmienia jego siłę. Te wartości są umownie nazywane "wagami” i możemy je dodać do naszej oryginalnej funkcji Béziera:

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{\textit{binomial term}}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{\textit{polynomial term}}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{\textit{weight}}{\underbrace{w_i}}
\]

Wygląda to na skomplikowane, ale tak się składa, że "wagi” są w rzeczywistości tylko wartościami współrzędnych, które chcemy, aby nasza krzywa miała: dla <i>n-tej</i> krzywej rzędu, w<sub>0</sub> to nasza współrzędna początkowa, w<sub>n</sub> to nasza ostatnia współrzędna, a wszystko pomiędzy to współrzędne kontrolne. Powiedzmy, że chcemy krzywej sześciennej, która zaczyna się w (110,150), jest kontrolowana przez (25,190) i (210,250) i kończy się w (210,30), używamy tej krzywej Béziera:

\[
\left \{ \begin{matrix}
  x = DARKRED[110] \cdot (1-t)^3 + DARKGREEN[25] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[210] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[210] \cdot t^3 \\
  y = DARKRED[150] \cdot (1-t)^3 + DARKGREEN[190] \cdot 3 \cdot (1-t)^2 \cdot t + DARKBLUE[250] \cdot 3 \cdot (1-t) \cdot t^2 + AMBER[30] \cdot t^3
\end{matrix} \right.
\]

Co daje nam krzywą, którą widzieliśmy na początku artykułu:

<graphics-element title="Nasza sześcienna krzywa Béziera" src="../introduction/cubic.js"></graphics-element>

Co jeszcze możemy zrobić z krzywymi Béziera? Właściwie całkiem sporo. W dalszej części tego artykułu omówiono wiele możliwych operacji i algorytmów, które możemy zastosować, oraz zadania, które wykonują.


<div class="howtocode">

### Jak zaimplementować ważoną funkcję bazową

Biorąc pod uwagę, że wiemy już, jak zaimplementować funkcję bazową, dodanie punktów kontrolnych jest niezwykle łatwe:

```
function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k<=n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
```

A teraz zoptymalizowane wersje:

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

A teraz wiemy, jak zaprogramować ważoną funkcję bazową.

</div>
