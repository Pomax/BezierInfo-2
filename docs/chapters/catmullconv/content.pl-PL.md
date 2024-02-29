# Krzywe Béziera i krzywe Catmull-Rom

Jeśli chodzi o różne splajny, inną popularną krzywą projektową jest [splajn Catmull-Rom](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline), która w przeciwieństwie do krzywych Béziera przechodzi przez 
każdy punkt kontrolny, więc oferuje coś w rodzaju "wbudowanego” dopasowania krzywej.

Faktycznie zacznijmy od zabawy z jednym: poniższa grafika ma wstępnie zdefiniowaną krzywą, dla której manipulujesz punktami, i pozwala dodawać punkty, klikając/dotykając tła, a także pozwala kontrolować "jak szybko” krzywa przechodzi przez jego punkt za pomocą suwaka naprężenia. Im bardziej napięta krzywa, tym bardziej krzywa zmierza w kierunku linii prostych od jednego punktu do drugiego.

<graphics-element title="Krzywa Catmull-Rom" src="./catmull-rom.js">
  <input type="range" min="0.1" max="1" step="0.01" value="0.5" class="slide-control tension">
</graphics-element>

Teraz może wyglądać na to, że krzywe Catmull-Rom bardzo różnią się od krzywych Béziera, ponieważ te krzywe mogą być naprawdę bardzo długie, 
ale to, co wygląda na pojedynczą krzywą Catmull-Rom, jest w rzeczywistości [splajnem](https://en.wikipedia.org/wiki/Spline_(mathematics)): pojedyncza krzywa zbudowana z wielu identycznie obliczonych elementów, podobnie jak gdybyś wziął całą masę krzywych Béziera, umieścił je od końca do końca i ustawił ich punkty kontrolne tak, że rzeczy wyglądają jak pojedyncza krzywa. W przypadku krzywej Catmull-Rom każdy "kawałek” między dwoma punktami jest zdefiniowany przez współrzędne punktu i styczną dla tych punktów, z których ten ostatni [można trywialnie wyprowadzić](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull%E2%80%93Rom_spline) ze znajomości poprzedniego i następnego punktu:


\[
  \begin{bmatrix}
    P_1 \\
    P_2 \\
    P_3 \\
    P_4
  \end{bmatrix}_{points}
  =
  \left [
    \begin{array}{rl}
      V_1 &= P_2 \\
      V_2 &= P_3 \\
      V'_1 &= \frac{P_3 - P_1}{2} \\
      V'_2 &= \frac{P_4 - P_2}{2}
    \end{array}
  \right ]_{\textit{point-tangent}}
\]

Wadą tego jest to, że - jak być może zauważyłeś na grafice - pierwszy i ostatni punkt całej krzywej tak naprawdę nie łączą się z resztą krzywej: nie mają odpowiednio poprzedniego/następnego punktu, więc nie ma sposobu, aby obliczyć, jaka powinna być ich styczna. Co również sprawia, że dopasowanie krzywej Catmull-Rom do trzech punktów jest dość trudne, tak jak udało nam się to zrobić dla krzywych Béziera. Więcej na ten temat w [następnej sekcji](#catmullfitting).

Faktycznie, zanim przejdziemy dalej, przyjrzyjmy się, jak właściwie narysować podstawowe formy tych krzywych (mówię podstawowe, ponieważ istnieje wiele odmian, które sprawiają, że rzeczy są [znacząco](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline#Definition) 
bardziej [złożone](https://en.wikipedia.org/wiki/Kochanek%E2%80%93Bartels_spline)):

```
tension = pewna wartość większa niż 0, domyślnie 1
points = lista co najmniej 4 współrzędnych

for p = 1 to points.length-3 (inclusive):
       p0 = points[p-1]
  v1 = p1 = points[p]
  v2 = p2 = points[p+1]
       p3 = points[p+2]

  s = 2 * tension
  dv1 = (p2-p0) / s
  dv2 = (p3-p1) / s

  for t = 0 to 1 (inclusive):
    c0 = 2*t^3 - 3*t^2 + 1,
    c1 = t^3 - 2*t^2 + t,
    c2 = -2*t^3 + 3*t^2,
    c3 = t^3 - t^2
    point(c0 * v1 + c1 * dv1 + c2 * v2 + c3 * dv2)
```

Teraz, ponieważ krzywa Catmulla-Roma jest formą [sześciennej splajnu Hermite'a](https://en.wikipedia.org/wiki/Cubic_Hermite_spline), a ponieważ sześcienne krzywe Béziera są również formą sześciennej splajnu Hermite'a, napotkamy interesujący kawałek programowania matematycznego: możemy konwertować jedno na drugie i z powrotem, a matematyka do tego jest zaskakująco prosta!

Główna różnica między krzywymi Catmull-Rom a krzywymi Béziera polega na tym, "co oznaczają punkty”:

- Sześcienna krzywa Béziera jest zdefiniowana przez punkt początkowy, punkt kontrolny, który implikuje styczną na początku, punkt kontrolny, który implikuje styczną na końcu, i punkt końcowy oraz macierz charakteryzującą, którą możemy pomnożyć przez ten punkt vector, aby uzyskać współrzędne na krzywej.
- Krzywa Catmull-Rom jest zdefiniowana przez punkt początkowy, styczną dla tego punktu początkowego, punkt końcowy i styczną dla tego punktu końcowego oraz macierz charakteryzującą, 
którą możemy pomnożyć przez wektor punktów, aby uzyskać współrzędne krzywej.

Są _bardzo_ podobne, więc zobaczmy dokładnie _jak_ są podobne. Widzieliśmy już macierz dla krzywych Béziera, więc czym różni się forma macierzowa dla krzywych Catmull-Rom?:

\[
  \textit{CatmullRom}(t) =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
\]

To jest cholernie podobne. Więc pytanie brzmi: jak możemy przekonwertować to wyrażenie z macierzą i wektorem Catmulla-Roma na wyrażenie z macierzy i wektora Béziera? Krótka odpowiedź brzmi oczywiście "przy użyciu algebry liniowej”, ale dłuższa odpowiedź to pozostała część tej sekcji i obejmuje matematykę, na którą możesz nawet nie zwracać uwagi: jeśli chcesz tylko poznać (niewiarygodnie proste) 
konwersje między dwiema formami krzywych, nie krępuj się przejść do końca poniższego wyjaśnienia, ale jeśli chcesz _jak_ możemy otrzymać jedną z drugiej... zajmijmy się matematyką!

<div class="note">

## Wyprowadzanie formuł konwersji

Aby dokonać konwersji między krzywymi Catmulla-Roma i krzywymi Béziera, musimy znać dwie rzeczy. Po pierwsze, jak wyrazić krzywą Catmull-Rom za pomocą "zestawu czterech współrzędnych”, 
zamiast kombinacji współrzędnych i stycznych, a po drugie, jak przekonwertować 
te współrzędne Catmull-Rom na i z postaci Béziera.

Zaczynamy od pierwszej części, aby dowiedzieć się, jak możemy przejść ze 
współrzędnych Catmull-Rom **V** do współrzędnych Béziera **P**, 
stosując "jakąś macierz **T**”. Nie wiemy jeszcze, co to jest **T**, 
ale do tego dojdziemy:

\[
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
  =
  T
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2} \\ \frac{P_4 - P_2}{2}
  \end{bmatrix}
\]

To odwzorowanie mówi, że aby odwzorować wektor Catmull-Rom "punkt + styczna” 
na coś opartego na wektorze "wszystkich współrzędnych”, musimy określić 
macierz odwzorowania w taki sposób, aby zastosowanie <em>T</em> dało P2 
jako punkt początkowy, P3 jako punkt końcowy i dwie styczne b na liniach odpowiednio 
P1 i P3 oraz P2 i P4.

Obliczanie <em>T</em> to bardziej "układanie liczb”:

\[
  T
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2} \\ \frac{P_4 - P_2}{2}
  \end{bmatrix}
  =
  \begin{bmatrix}
   0 \cdot P1 &+ 1 \cdot P2 &+ 0 \cdot P3 &+ 0 \cdot P4 \\
   0 \cdot P1 &+ 0 \cdot P2 &+ 1 \cdot P3 &+ 0 \cdot P4 \\
  \frac{-1}{2} \cdot P1 &+ 0 \cdot P2 &+ \frac{1}{2} \cdot P3 &+ 0 \cdot P4 \\
   0 \cdot P1 & \frac{-1}{2} \cdot P2 &+ 0 \cdot P3 &+ \frac{1}{2} \cdot P4
  \end{bmatrix}
  =
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2} &  0 & \frac{1}{2} & 0 \\
   0 & \frac{-1}{2} & 0 & \frac{1}{2}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Zatem:

\[
  T
  =
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2} &  0 & \frac{1}{2} & 0 \\
   0 & \frac{-1}{2} & 0 & \frac{1}{2}
  \end{bmatrix}
\]

Jednak <em>nie skończyliśmy</em>, ponieważ krzywe Catmull-Rom mają ten 
parametr "napięcia”, zapisany jako τ (mała litera "tau”), 
który jest współczynnikiem skalowania dla wektorów stycznych: większe napięcie, 
tym mniejsze styczne, a im mniejsze napięcie, tym większe styczne. 
W związku z tym współczynnik naprężenia trafia do mianownika stycznych i zanim 
przejdziemy dalej, dodajmy ten współczynnik zarówno do naszej reprezentacji 
wektorów współrzędnych, jak i do macierzy odwzorowania <em>T</em>:

\[
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2τ} \\ \frac{P_4 - P_2}{2τ}
  \end{bmatrix}
  ,\
  T
  =
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2τ} &  0 & \frac{1}{2τ} & 0 \\
   0 & \frac{-1}{2τ} & 0 & \frac{1}{2τ}
  \end{bmatrix}
\]

Po prawidłowym wykonaniu macierzy mapowania przepiszmy formę macierzy 
Catmull-Rom "punkt + styczna” na postać macierzy wyrażoną w czterech współrzędnych
i zobaczmy, co otrzymamy:

\[
  \textit{CatmullRom}(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
\]

Zastąp wektor punktowy/styczny wyrażeniem dla wszystkich współrzędnych:

\[
  \textit{CatmullRom}(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2τ} &  0 & \frac{1}{2τ} & 0 \\
   0 & \frac{-1}{2τ} & 0 & \frac{1}{2τ}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

i połącz macierze:

\[
  \textit{CatmullRom}(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Wygląda to bardzo podobnie do postaci macierzy Béziera, która, jak widzieliśmy w rozdziale 
o krzywych Béziera, powinna wyglądać tak:

\[
  \textit{Bézier}(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
  3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Jeśli więc chcemy wyrazić krzywą Catmull-Rom za pomocą krzywej Béziera, musimy 
obrócić nieco ten Catmull-Rom:

\[
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

W coś, co wygląda tak:

\[
  \begin{bmatrix}
  1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
  3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Sposób, w jaki to robimy, polega na dość prostym przepisaniu macierzy. 
Zaczynamy od równości, którą musimy zapewnić:

\[
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
  \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
  \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
  \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
  3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  V
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Następnie usuwamy wektor współrzędnych z obu stron bez wpływu na równość:

\[
    \begin{bmatrix}
      0 &    1 &       0 &  0 \\
    \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
    \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
    \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
    \end{bmatrix}
  =
    \begin{bmatrix}
    1 &  0 &  0 & 0 \\
    -3 &  3 &  0 & 0 \\
    3 & -6 &  3 & 0 \\
    -1 &  3 & -3 & 1
    \end{bmatrix}
    \cdot
    V
\]

Wtedy możemy "pozbyć się” macierzy Béziera po prawej przez lewą – pomnóż 
obie przez odwrotność macierzy Béziera:

\[
  {
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  }^{-1}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  =
  {
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  }^{-1}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  V
\]

Macierz pomnożona przez jej odwrotność jest macierzowym odpowiednikiem 1, 
a ponieważ "coś razy 1” to to samo co "coś”, możemy po prostu usunąć dowolną 
parę macierz/odwrotność:

\[
  {
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  }^{-1}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  =
  V
\]

A teraz <em>w zasadzie</em> skończyliśmy. Po prostu mnożymy te dwie macierze i już wiemy, czym jest <em>V</em>:

\[
  \begin{bmatrix}
  0 & 1 & 0 & 0 \\
  \frac{-1}{6τ} & 1 & \frac{1}{6τ} & 0 \\
  0 & \frac{1}{6τ} & 1 & \frac{-1}{6τ} \\
  0 & 0 & 1 & 0
  \end{bmatrix}
  =
  V
\]

Mamy teraz ostatni element naszej układanki funkcji. Przejdźmy przez każdy krok.

1. Zacznij od funkcji Catmull-Rom:

\[
  \textit{CatmullRom}(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
\]

2. przepisz do czystej postaci współrzędnych:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2τ} \\ \frac{P_4 - P_2}{2τ}
  \end{bmatrix}
\]

3. przepisz na "normalny” wektor współrzędnych:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2τ} &  0 & \frac{1}{2τ} & 0 \\
   0 & \frac{-1}{2τ} & 0 & \frac{1}{2τ}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

4. połącz macierze wewnętrzne:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

5. przepisz na macierz Béziera:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  0 & 1 & 0 & 0 \\
  \frac{-1}{6τ} & 1 & \frac{1}{6τ} & 0 \\
  0 & \frac{1}{6τ} & 1 & \frac{-1}{6τ} \\
  0 & 0 & 1 & 0
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

6. i przekształć współrzędne tak, aby otrzymać "czyste” wyrażenie Béziera:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_2 \\
  P_2 + \frac{P_3-P_1}{6 \cdot τ} \\
  P_3 - \frac{P_4-P_2}{6 \cdot τ} \\
  P_3
  \end{bmatrix}
\]

I gotowe: w końcu wiemy, jak przekonwertować te dwie krzywe!

</div>

Jeśli mamy krzywą Catmulla-Roma zdefiniowaną przez cztery współrzędne od P<sub>1</sub> do P<sub>4</sub>, 
możemy narysować tę krzywą za pomocą krzywej Béziera, która ma wektor:

\[
  \begin{bmatrix}
  P_1 \\
  P_2 \\
  P_3 \\
  P_4
  \end{bmatrix}_{\textit{CatmullRom}}
  \Rightarrow
  \begin{bmatrix}
  P_2 \\
  P_2 + \frac{P_3-P_1}{6 \cdot τ} \\
  P_3 - \frac{P_4-P_2}{6 \cdot τ} \\
  P_3
  \end{bmatrix}_{\textit{Bézier}}
\]

Podobnie, jeśli mamy krzywą Béziera zdefiniowaną przez cztery współrzędne od P<sub>1</sub> do P<sub>4</sub>, 
możemy ją narysować za pomocą standardowej krzywej Catmull-Rom z napięciami o następujących wartościach współrzędnych:

\[
  \begin{bmatrix}
  P_1 \\
  P_2 \\
  P_3 \\
  P_4
  \end{bmatrix}_{\textit{Bézier}}
  \Rightarrow
  \begin{bmatrix}
  P_1 \\
  P_4 \\
  P_4 + 3(P_1 - P_2) \\
  P_1 + 3(P_4 - P_3)
  \end{bmatrix}_{\textit{CatmullRom}}
\]

Lub, jeśli twoje API umożliwia określenie krzywych Catmull-Rom przy użyciu zwykłych współrzędnych:

\[
  \begin{bmatrix}
  P_1 \\
  P_2 \\
  P_3 \\
  P_4
  \end{bmatrix}_{\textit{Bézier}}
  \Rightarrow
  \begin{bmatrix}
  P_4 + 6(P_1 - P_2) \\
  P_1 \\
  P_4 \\
  P_1 + 6(P_4 - P_3)
  \end{bmatrix}_{\textit{CatmullRom}}
\]
