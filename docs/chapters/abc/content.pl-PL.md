# Tożsamość rzutowania

Algorytm De Casteljau jest kluczowym algorytmem, jeśli chodzi o krzywe Béziera. Można go używać nie tylko do dzielenia krzywych, ale także do ich wydajnego rysowania (szczególnie w przypadku krzywych Béziera wysokiego rzędu), a także do tworzenia krzywych opartych na trzech punktach i stycznej.
Szczególnie ta ostatnia rzecz jest bardzo przydatna, ponieważ pozwala nam "uformować" krzywą, podnosząc ją w pewnym punkcie i przeciągając ten punkt, aby zmienić kształt krzywej.

Jak to działa? Zwięźle: uruchamiamy algorytm de Casteljau w odwrotnej kolejności!

Aby uruchomić algorytm de Casteljau w odwrotnej kolejności, potrzebujemy kilku podstawowych rzeczy: punktu startowego i końcowego, punktu na krzywej, po której chcemy się poruszać, który jest związany z wartością *t*, oraz punktu, o którym wcześniej nie mówiliśmy, i o ile wiem, nie ma on określonej nazwy, ale znajduje się o jedną iterację wyżej w procesie de Casteljau niż nasz punkt na krzywej. Lubię nazywać go "A" z powodów, które staną się oczywiste.

Użyjmy więc grafiki zamiast tekstu, aby zobaczyć, gdzie jest to "A", ponieważ tekst prowadzi nas tylko tak daleko: przesuń suwaki poniższej grafiki, aby zobaczyć, jaka jest nasza współrzędna "A", dająca określoną wartość "t". Jak również niektóre inne współrzędne, które razem pozwalają nam wyprowadzić wartość, którą grafika nazywa "proporcją": jeśli przesuniesz punkty krzywej, przesuną się A, B i C, co stanie się z tą wartością?

<div class="figure">

<graphics-element inline={true} title="Projekcje na kwadratową krzywą Béziera" src="./abc.js" data-type="quadratic">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>
<graphics-element inline={true} title="Projekcje na sześcienną krzywą Béziera" src="./abc.js" data-type="cubic">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>

</div>

Te grafiki pokazują nam więc kilka rzeczy:

1. punkt na czubku "kapelusza" konstrukcji krzywej: nazwijmy go `A`, a także
2. nasz punkt na krzywej daje wybraną przez nas wartość `t`: nazwijmy ją `B` i na koniec,
3. punkt, który otrzymamy rzutując A, przez B, na linię pomiędzy punktem początkowym i końcowym krzywej: nazwijmy go `C`.
4. zarówno dla krzywych kwadratowych jak i sześciennych, dwa punkty `e1` i `e2`, które reprezentują przedostatni krok w algorytmie de Casteljau: w ostatnim kroku znajdujemy `B` w `(1-t) * e1 + t * e2`.
5. dla krzywych sześciennych również punkty `v1` i `v2`, które razem z `A` reprezentują pierwszy krok w algorytmie de Casteljau: w następnym kroku znajdujemy `e1` i `e2`.

Te trzy wartości A, B i C pozwalają nam wyprowadzić ważny wzór tożsamości dla kwadratowych i sześciennych krzywych Béziera: dla dowolnego punktu na krzywej o pewnej wartości `t`, stosunek odległości od A do B i od B do C jest stały: jeśli pewna wartość `t` ustawia C, które jest oddalone 20% od początku i 80% od końca, to _nie ma znaczenia, gdzie są punkty początkowe, końcowe lub kontrolne_; dla tej wartości `t`, `C` *zawsze* będzie leżeć 20% od początku i 80% od punktu końcowego. Śmiało, wybierz punkt na krzywej w dowolnej grafice, a następnie przesuń wszystkie inne punkty: jeśli przesuniesz tylko punkty kontrolne, początek i koniec nie przesuną się, a podobnie jak C, a jeśli przesuniesz punkt początkowy lub końcowy, C przesunie się, ale jego względna pozycja nie zmieni się.

Jak więc możemy obliczyć `C`? Zaczynamy od naszej obserwacji, że `C` zawsze leży gdzieś pomiędzy punktem początkowym i końcowym, więc logicznie `C` będzie określone funkcją, która interpoluje pomiędzy tymi dwoma współrzędnymi:

\[
  C = u(t) \cdot P_{\textit{start}} + (1-u(t)) \cdot P_{\textit{end}}
\]

Jeśli uda nam się dowiedzieć, jak wygląda funkcja `u(t)`, to skończymy. Musimy jednak pamiętać, że ta funkcja `u(t)` będzie miała różną postać w zależności od tego, czy pracujemy z krzywymi kwadratowymi czy sześciennymi. [Przechodząc przez matematykę](https://mathoverflow.net/questions/122257/finding-the-formula-for-bezier-curve-ratios-hull-point-point-baseline) (z podziękowaniami dla Borisa Zbarskyego) pokazuje nam następujące dwa wzory:

\[
  u(t)_{\textit{quadratic}} = \frac{(1-t)^2}{t^2 + (1-t)^2}
\]

i

\[
  u(t)_{\textit{cubic}} = \frac{(1-t)^3}{t^3 + (1-t)^3}
\]

Tak więc, jeśli znamy współrzędne początku i końca oraz wartość *t*, znamy C bez konieczności obliczania współrzędnych `A` lub nawet `B`. Faktycznie możemy zrobić to samo dla funkcji proporcji. Jako kolejna funkcja `t`, technicznie nie musimy wiedzieć, czym są `A`, `B` lub `C`. Ona również może być wyrażona jako czysta funkcja `t`.

Zacznijmy od obserwacji, że że dla danych `A`, `B` i `C`, zawsze zachodzi co następuje:

\[
  \textit{ratio}(t) = \frac{\textit{distance}(B,C)}{\textit{distance}(A,B)} = \textit{Constant}
\]

Działając matematycznie na tym, widzimy następujące dwa wzory dla krzywych kwadratowych i sześciennych:

\[
  ratio(t)_{\textit{quadratic}} = \left | \frac{t^2 + (1-t)^2 - 1}{t^2 + (1-t)^2} \right |
\]

i

\[
  ratio(t)_{\textit{cubic}} = \left | \frac{t^3 + (1-t)^3 - 1}{t^3 + (1-t)^3} \right |
\]

To daje nam kilka potężnych narzędzi: mając trzy punkty (początkowy, końcowy i "jakiś punkt na krzywej"), a także wartość `t`, możemy _konstruować_ krzywe. Możemy obliczyć `C` używając punktów początkowego i końcowego oraz naszej funkcji `u(t)`, a gdy już mamy `C`, możemy użyć naszego punktu na krzywej (`B`) i funkcji `ratio(t)`, aby znaleźć `A`:

\[
  A = B - \frac{C - B}{\textit{ratio}(t)} = B + \frac{B - C}{\textit{ratio}(t)}
\]

Po znalezieniu `A`, znalezienie `e1` i `e2` dla krzywych kwadratowych jest kwestią wykonania interpolacji liniowej z `t` między punktem startowym i `A`, aby uzyskać `e1`, oraz między `A` i punktem końcowym, aby uzyskać `e2`. Dla krzywych sześciennych, nie ma pojedynczej pary punktów, które mogą działać jako `e1` i `e2` (jest ich nieskończenie wiele, ponieważ styczna w B jest parametrem wolnym dla krzywych sześciennych), więc tak długo, jak stosunek odległości między `e1` a `B` i `B` a `e2` jest stosunkiem Béziera `(1-t):t`, możemy wybrać dowolną parę, po czym możemy odwrócić `v1` i `v2`:

\[
  \left \{ \begin{aligned}
    e_1 &= (1-t) \cdot v_1 + t \cdot A \\
    e_2 &= (1-t) \cdot A + t \cdot v_2
  \end{aligned} \right .

  \Rightarrow

  \left \{  \begin{aligned}
    v_1 &= \frac{e_1 - t \cdot A}{1-t} \\
    v_2 &= \frac{e_2 - (1-t) \cdot A}{t}
  \end{aligned} \right .
\]

A następnie przeprowadźmy inżynierię wsteczną punktów kontrolnych krzywej:

\[
  \left \{ \begin{aligned}
    v_1 &= (1-t) \cdot \textit{start} + t \cdot C_1 \\
    v_2 &= (1-t) \cdot C_2 + t \cdot \textit{end}
  \end{aligned} \right .

  \Rightarrow

  \left \{  \begin{aligned}
    C_1 &= \frac{v_1 - (1-t) \cdot \textit{start}}{t} \\
    C_2 &= \frac{v_2 - t \cdot \textit{end}}{1-t}
  \end{aligned} \right .
\]

Tak więc: jeśli mamy punkt początkowy i końcowy krzywej a także jakiś trzeci punkt B, 
przez który chcemy, aby przechodziła krzywa , to dla dowolnej wartości `t` 
domyślnie znamy wszystkie wartości ABC, co (w połączeniu z wykształconym domyśłem 
na temat odpowiednich współrzędnych `e1` i `e2` dla krzywych sześciennych) 
daje nam niezbędne informacje do zrekonstruowania "szkieletu de Casteljau" krzywej. 
Oznacza to, że możemy teraz zrobić kilka rzeczy: możemy "dopasować" krzywe przy użyciu tylko trzech punktów, co oznacza, że możemy również "formować" krzywe, przesuwając punkt na krzywej, ale pozostawiając jego punkt początkowy i końcowy, a następnie zrekonstruować krzywą w oparciu o miejsce, w którym przesunęliśmy punkt na krzywej. Są to bardzo przydatne rzeczy i przyjrzymy się im w kilku następnych sekcjach.
