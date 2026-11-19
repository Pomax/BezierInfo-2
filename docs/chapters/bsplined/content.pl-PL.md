# Pochodne B-splajnu


Ostatnia sekcja specyficzna dla B-splajnów: aby zastosować te same procedury do B-splajnów, jak przyjrzeliśmy się krzywym Béziera, musimy znać pierwszą i drugą pochodną. Ale... jaka jest pochodna B-splajne?

Na szczęście, podobnie jak w przypadku krzywych Béziera, pochodna B-splajnu sama w sobie jest (niższego rzędu) B-splajnem. Poniższe dwie funkcje określają ogólny wzór B-splajnu dla B-splajnu stopnia <em>d</em> z <em>n</em> punktów i wektorem węzłów o długości <em>d+n+1 </em> i jego pochodna:

\[
  C(t) = \sum_{i=0}^n P_i \cdot N_{i,k}(t)
\]

\[
  C'(t) = \sum_{i=0}^{n-1} P_i \prime \cdot N_{i+1,k-1}(t)
\]

where

\[
  P_i \prime = \frac{d}{\textit{knot}_{i+d+1} - \textit{knot}_{i+1}} (P_{i+1} - P_i)
\]


Tak więc, podobnie jak w przypadku pochodnych Béziera, widzimy funkcję pochodnej, która jest po prostu nową funkcją interpolacji z interpolowanymi wagami. Dzięki tym informacjom możemy robić takie rzeczy, jak rysowanie stycznych i normalnych, a także określać funkcję krzywizny, rysować punkty przegięcia i wszystkie te cudowne rzeczy.

Jako konkretny przykład spójrzmy na sześcienny (= stopień 3) B-splajne z pięcioma współrzędnymi i z jednolitym wektorem węzłów o długości 3 + 5 + 1 = 9:

\[
  \begin{array}{l}
    d = 3, \\
    P = {(50,240), (185,30), (320,135), (455,25), (560,255)}, \\
    \textit{knots} = {0,1,2,3,4,5,6,7,8}
  \end{array}
\]

<BsplajneGraphic sketch={require('./demonstrator')} />

Stosując powyższą wiedzę, otrzymamy nowy B-splajne stopnia <em>d-1</em>, z czterema punktami <em>P'</em>:

\[
  \begin{array}{l}
    P_0 \prime = \frac{d}{\textit{knot}_{i+d+1} - \textit{knot}_{i+1}} (P_{i+1} - P_i)
    = \frac{3}{\textit{knot}_{4} - \textit{knot}_{1}} (P_1 - P_0)
    = \frac{3}{3} (P_1 - P_0)
    = (135, -210) \\
    P_1 \prime = \frac{d}{\textit{knot}_{i+d+1} - \textit{knot}_{i+1}} (P_{i+1} - P_i)
    = \frac{3}{\textit{knot}_{5} - \textit{knot}_{2}} (P_2 - P_1)
    = \frac{3}{3} (P_2 - P_1)
    = (135, 105) \\
    P_2 \prime = \frac{d}{\textit{knot}_{i+d+1} - \textit{knot}_{i+1}} (P_{i+1} - P_i)
    = \frac{3}{\textit{knot}_{6} - \textit{knot}_{3}} (P_3 - P_2)
    = \frac{3}{3} (P_3 - P_2)
    = (135, -110) \\
    P_3 \prime = \frac{d}{\textit{knot}_{i+d+1} - \textit{knot}_{i+1}} (P_{i+1} - P_i)
    = \frac{3}{\textit{knot}_{7} - \textit{knot}_{4}} (P_4 - P_3)
    = \frac{3}{3} (P_4 - P_3)
    = (105, 230) \\
  \end{array}
\]

Tak więc otrzymujemy pochodną, która ma jako parametry:

\[
  \begin{array}{l}
    d = 3, \\
    P = {(50,240), (185,30), (320,135), (455,25), (560,255)}, \\
    \textit{knots} = {0,1,2,3,4,5,6,7,8}
  \end{array}
\]

<BsplajneGraphic sketch={require('./derived')} />
