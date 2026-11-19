# Styczne i normalne

Jeśli chcesz przesuwać obiekty wzdłuż krzywej lub "z dala od” krzywej, dwa wektory, które najbardziej Cię interesują, to wektor styczny i wektor normalny do punktów krzywej. Są one naprawdę łatwe do znalezienia. Do poruszania się i orientowania po krzywej używamy stycznej, która wskazuje kierunek ruchu w określonych punktach i jest dosłownie pierwszą pochodną naszej krzywej:

\[
\begin{matrix}
  \textit{tangent}_x(t) = B'_x(t) \\
  \\
  \textit{tangent}_y(t) = B'_y(t)
\end{matrix}
\]

To daje nam żądany wektor kierunkowy. Możemy go znormalizować, aby uzyskać jednolite wektory kierunkowe (o długości 1) w każdym punkcie, a następnie zrobić, co chcemy, w oparciu o te kierunki:

\[
\begin{matrix}
  d = \left \| \textit{tangent}(t) \right \| = \sqrt{B'_x(t)^2 + B'_y(t)^2} \\
  \\
  \hat{x}(t) = \left \| \textit{tangent}_x(t) \right \|
             =\frac{\textit{tangent}_x(t)}{ \left \| \textit{tangent}(t) \right \| }
             = \frac{B'_x(t)}{d} \\
  \\
  \hat{y}(t) = \left \| \textit{tangent}_y(t) \right \|
             = \frac{\textit{tangent}_y(t)}{ \left \| \textit{tangent}(t) \right \| }
             = \frac{B'_y(t)}{d}
\end{matrix}
\]

Styczna jest bardzo przydatna do poruszania się wzdłuż linii, ale co, jeśli zamiast tego chcemy oddalić się od krzywej, prostopadle do krzywej w pewnym punkcie <i>t</i>? W takim przypadku potrzebujemy wektora *normalnego*. Ten wektor biegnie pod kątem prostym do kierunku krzywej i zwykle ma długość 1, więc wszystko, co musimy zrobić, to obrócić znormalizowany wektor kierunkowy i gotowe:

\[
\begin{array}{l}
  \textit{normal}_x(t) = \hat{x}(t) \cdot \cos{\frac{\pi}{2}} - \hat{y}(t) \cdot \sin{\frac{\pi}{2}} = - \hat{y}(t) \\
  \\
  \textit{normal}_y(t) = \underset{\textit{quarter circle rotation}} {\underbrace{ \hat{x}(t) \cdot \sin{\frac{\pi}{2}} + \hat{y}(t) \cdot \cos{\frac{\pi}{2}} }} = \hat{x}(t)
\end{array}
\]

<div class="note">

Obracanie współrzędnych jest w rzeczywistości bardzo łatwe, jeśli znasz zasadę. Może się okazać, że wyjaśniono to jako zastosowanie [macierzy rotacji](https://en.wikipedia.org/wiki/Rotation_matrix), czemu też się tutaj przyjrzymy. Zasadniczo chodzi o to, aby wziąć okręgi o które możemy się obracać, i po prostu "przesuwając współrzędne” po tych okręgach o pożądany
kąt. Jeśli chcemy zrobić ćwierć obrotu, bierzemy współrzędną, przesuwamy ją wzdłuż okręgu o ćwierć obrotu i gotowe.

Aby zamienić dowolny punkt <i>(x,y)</i> w punkt obrócony <i>(x',y')</i> (o więcej niż 0,0) o pewien kąt φ, stosujemy te ładne i łatwe obliczenie:

\[\begin{array}{l}
  x' = x \cdot \cos(\phi) - y \cdot \sin(\phi) \\
  y' = x \cdot \sin(\phi) + y \cdot \cos(\phi)
\end{array}\]

które są "długą” wersją następującej transformacji macierzowej:

\[
  \begin{bmatrix}
    x' \\ y'
  \end{bmatrix}
  =
  \begin{bmatrix}
   \cos(\phi) & -\sin(\phi) \\
   \sin(\phi) & \cos(\phi)
  \end{bmatrix}
  \begin{bmatrix}
    x \\ y
  \end{bmatrix}
\]

i to wszystko, czego potrzebujemy, aby obrócić dowolną współrzędną. Zauważ, że dla ćwierci, połówki i trzech czwartych obrotu funkcje te stają się jeszcze łatwiejsze, ponieważ *sin* i *cos* dla tych kątów wynoszą odpowiednio: 0 i 1, -1 i 0 oraz 0 i -1.

Ale ***dlaczego*** to działa? Po co to mnożenie macierzy? [Wikipedia](https://en.wikipedia.org/wiki/Rotation_matrix#Decomposition_into_shears) (technicznie, Thomas Herter i Klaus Lott) mówi nam, że macierz rotacji może być
traktowane jako sekwencja trzech (elementarnych) operacji ścinania. Kiedy połączymy to w jedną operację macierzową (ponieważ wszystkie mnożenia macierzy można zwinąć), otrzymamy macierz, którą widzisz powyżej. [DataGenetics](https://datagenetics.com/blog/august32013/index.html) ma doskonały artykuł na ten temat: jest naprawdę fajny i zdecydowanie polecam krótką przerwę od tego elementu podstawowego, aby przeczytać ten artykuł.

</div>

Poniższe dwie grafiki przedstawiają styczną i normalną wzdłuż krzywej kwadratowej i sześciennej, z wektorem kierunkowym w kolorze niebieskim i wektorem normalnym w kolorze czerwonym (znaczniki są rozmieszczone równomiernie w odstępach *t*, a nie w równych odstępach).

<div class="figure">
  <graphics-element title="Styczne i normalne kwadratowego Béziera" src="./pointvectors.js" data-type="quadratic"></graphics-element>
  <graphics-element title="Styczne i normalne sześciennego Béziera" src="./pointvectors.js" data-type="cubic"></graphics-element>
</div>
