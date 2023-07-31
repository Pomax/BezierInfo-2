# Łuki kołowe i sześcienne krzywe Béziera

Przyjrzyjmy się aproksymacji okręgów i łuków kołowych za pomocą sześciennych krzywych Béziera. O ile lepiej to jest?

<graphics-element title="Aproksymacja łuku sześciennymi krzywymi Béziera" width="400" height="400" src="./arc-approximation.js">
  <input type="range" min="-3.1415" max="3.1415" step="0.01" value="1.4" class="slide-control">
</graphics-element>

Już na pierwszy rzut oka dużo lepiej, ale dowiedzmy się _o ile_ lepiej, przyglądając się, jak skonstruować krzywą Béziera.

![Diagram konstrukcyjny sześciennego przybliżenia łuku kołowego](images/chapter-assets/circles/image-20210417165543902.png)

Punkty początkowe i końcowe są trywialne, ale punkt środkowy wymaga trochę pracy, ale jest to głównie podstawowa trygonometria, gdy znamy kąt θ dla naszego łuku kołowego: jeśli przeskalujemy nasz łuk kołowy do okręgu jednostkowego, zawsze możemy rozpocząć łuk o promieniu 1 w punkcie (1,0), a następnie mając nasz kąt łuku θ, wiemy również, że łuk kołowy ma długość θ (ponieważ okręgi jednostkowe są w ten sposób ładne). Znamy również nasz punkt końcowy, ponieważ to jest po prostu (cos(θ), sin(θ)), więc wyzwaniem jest ustalenie, jakich punktów kontrolnych potrzebujemy, aby krzywa w punkcie _t_=0,5 dokładnie stykała się z łukiem kołowym pod kątem θ/2:

Więc jeszcze raz formalnie opiszmy to:

\[
\begin{aligned}
  P_1 &= (1, 0) \\
  P_2 &= (1, k) \\
  P_3 &= P_4 + k \cdot (sin(θ), -cos(θ)) \\
  P_4 &= (cos(θ), sin(θ))
\end{aligned}
\]

Tylko P<sub>3</sub> nie jest tutaj całkiem proste, a jego opis opiera się na fakcie, że trójkąt (pochodzenie, P<sub>4</sub>, P<sub>3</sub>) jest trójkątem prostokątnym, w którym odległość między początkiem a punktem P<sub>4</sub> wynosi 1 (ponieważ pracujemy z okręgiem jednostkowym), 
a odległość między punktem P<sub>4</sub> i P<sub>3</sub> to _k_, więc możemy przedstawić P<sub>3</sub> jako "Punkt P<sub>4</sub> plus wektor od początku do P <sub>4</sub>, 
ale potem obrócić ćwiartkę koła w kierunku przeciwnym do ruchu wskazówek zegara i przeskalować o _k_".

Dzięki temu możemy określić współrzędne _y_ dla A, B, e<sub>1</sub> i e<sub>2</sub>, 
po czym mamy wszystkie informacje potrzebne do określenia wartości _k_. Możemy znaleźć te wartości, używając (tutaj nie ma niespodzianki) interpolacji liniowej między znanymi punktami, ponieważ A jest w połowie drogi między P<sub>2</sub> a P<sub>3</sub>, e<sub>1</sub> znajduje się między A i "w połowie odległości między P<sub>1</sub> a P<sub>2</sub>” (czyli "połowa wysokości” P<sub>2</sub>) i tak dalej :

\[
\begin{aligned}
A_y &= \frac{P_{2_y} + P_{3_y}}{2} = \frac{k + sin(θ) - k \cdot cos(θ)}{2} \\
e_{1_y} &= \frac{A_y + \frac{1}{2}P_{2_y}}{2} = \frac{\frac{k + sin(θ) - k \cdot cos(θ)}{2} + \frac{}{2}}{2} = \frac{2k + sin(θ) + k \cdot cos(θ)}{4} \\
e_{2_y} &= \frac{A_y + \textit{mid}(P_4, P_3)}{2} = \frac{A_y + sin(θ) - \frac{k}{2} cos(θ)}{2} = \frac{k + 3sin(θ) 2k \cdot cos(θ)}{4} \\
B_y &= \frac{e_{1_y} + e_{2_y}}{2} = \frac{3k + 4sin(θ) - 3k \cdot cos(θ)}{8}
\end{aligned}
\]

Co teraz daje nam dwie tożsamości dla B, ponieważ oprócz określenia B poprzez interpolację liniową, wiemy również, że współrzędna _y_ punktu B to po prostu _sin(θ/2)_: rozpoczęliśmy to ćwiczenie od stwierdzenia, że zamierzamy przybliżyć łuk kołowy za pomocą krzywej Béziera, której punkt środkowy, czyli punkt B, dotyka okręgu jednostkowego w połowie kąta łuku, z definicji czyniąc B punktem w (cos(θ/2), sin(θ/2)).

Oznacza to, że możemy zrównać dwie tożsamości, które mamy teraz dla B<sub>y</sub> i rozwiązać dla _k_.

<div class="note">

## Wyprowadzanie _k_

Rozwiązanie dla _k_ jest dość proste, ale wymaga wykonania kilku kroków, a jeśli chodzi o natychmiastowy wynik: użycie narzędzia takiego jak [Wolfram Alpha](https://www.wolframalpha.com/) jest zdecydowanie najlepszym rozwiązaniem. To powiedziawszy, chodźmy:

\[
\begin{aligned}
\frac{3k + 4sin(θ)) - 3k \cdot cos(θ)}{8} &= sin(\frac{θ}{2}) \\
3k + 4sin(θ)) - 3k \cdot cos(θ)  &= 8sin\left(\frac{θ}{2}\right) \\
3k - 3k \cdot cos(θ) &= 8sin\left(\frac{θ}{2}\right) - 4sin(θ) \\
3k (1 - cos(θ)) &= 4 \left ( 2sin\left(\frac{θ}{2} \right) - sin(θ) \right ) \\
3k &= 4 \cdot \frac{2sin(\frac{θ}{2}) - sin(θ)}{1 - cos(θ)}  \\
k &= \frac{4}{3} \cdot \frac {2sin\left(\frac{θ}{2}\right) - sin(θ)}{1 - cos(θ)}
\end{aligned}
\]

I wreszcie, możemy skorzystać z kilku tożsamości trygonometrycznych, aby _drastycznie_ uprościć nasz wzór na _k_:

\[
\begin{aligned}
k &= \frac{4}{3} \cdot \frac {2sin\left(\frac{θ}{2}\right) - sin(θ)}{1 - cos(θ)}\\
k &= \frac{4}{3} \cdot \left ( \frac {2sin\left(\frac{θ}{2}\right)}{1 - cos(θ)} - \frac {sin(θ)}{1 - cos(θ)} \right )\\
k &= \frac{4}{3} \cdot \left (csc\left(\frac{θ}{2}\right)  - cot\left(\frac{θ}{2}\right) \right )\\
k &= \frac{4}{3} \cdot tan\left ( \frac{θ}{4} \right )\\
\end{aligned}
\]

I skończyliśmy.

</div>

Tak więc odległość naszych punktów kontrolnych od punktu początkowego/końcowego może być wyrażona jako liczba, którą otrzymujemy z prawie trywialnego wyrażenia obejmującego kąt łuku kołowego:

\[
k = f(θ) = \frac{4}{3} tan\left (\frac{θ}{4} \right )
\]

Co oznacza, że dla dowolnego łuku kołowego o kącie θ i promieniu _r_ nasze przybliżenie Béziera oparte na trzech punktach padania wynosi:

\[
\begin{aligned}
\textit{start} &= (r,~0) \\
\textit{control}_{~1} &= (r,~k) \\
\textit{control}_{~2} &= r\cdot(cos(θ) + k \cdot sin(θ), sin(θ) - k \cdot cos(θ)) \\
\textit{end} &= r \cdot (cos(θ),~sin(θ))
\end{aligned}
\]

Co również daje nam powszechnie spotykaną wartość 0,55228 dla ćwierćokręgów, w oparciu o ich kąt równy połowie π:

\[
f\left ( \frac{\pi}{2} \right ) = \frac{4}{3} \cdot tan\left(\frac{\pi}{8}\right) = \frac{4}{3}(\sqrt{2}-1)\approx 0.55228474983[...]
\]

Otrzymując w ten sposób następujące współrzędne Béziera dla ćwiartki koła o promieniu _r_:

\[
\begin{aligned}
\textit{start} &= (r,~0) \\
\textit{control}_{~1} &= (r,~0.55228 \cdot r) \\
\textit{control}_{~2} &= (0.55228 \cdot r,~r) \\
\textit{end} &= (0,~r)
\end{aligned}
\]

<div class="note">

## Jak dokładne to jest?

Inaczej niż w przypadku krzywej kwadratowej, nie możemy użyć punktu <i>t=0,5</i> jako punktu odniesienia, ponieważ z samej natury jest to jeden z trzech punktów, które z pewnością leżą na samym łuku kołowym. Zamiast tego potrzebujemy innej wartości <i>t</i>, która da nam maksymalne odchylenie - są dwie możliwości (ponieważ nasza krzywa 
nadal ściśle "przekracza” łuk kołowy i jest symetryczna), ale zamiast próbować użyć rachunku różniczkowego do znalezienia idealnej wartości _t_ - co udało nam się! matematyka jest całkowicie rozsądna, o ile korzystamy z komputerów - możemy też po prostu przeprowadzić binarne wyszukiwanie największego odchylenia i nie zawracać sobie głowy matematyką.

Więc zróbmy to zamiast tego: możemy przeprowadzić kontrolę maksymalnego ugięcia, która po prostu przechodzi przez _t_ od 0 do 1 w pewnym przybliżonym przedziale, znajduje wartość _t_, która ma "najwyższe odchylenie wiązki”, a następnie ponownie przeprowadza to samo sprawdzenie z dużo mniejszy przedział wokół tej wartości _t_, powtarzając tyle razy, ile potrzeba, aby uzyskać dowolnie dokładną wartość _t_:

```
getMostWrongT(radius, bezier, start, end, epsilon=1e-15):
  if end-start < epsilon:
    return (start+end)/2
  worst_t = 0
  max = 0
  stepsize = (end-start)/10
  for t=start to end, using stepsize:
    p = bezier.get(t)
    diff = p.magnitude() - radius
    if diff > max:
      worst_t = t
      max = diff
  return getMostWrongT(radius, bezier, worst_t - stepsize, worst_t + stepsize)
```

Poza tym, jak często udaje ci się napisać funkcję o tej nazwie?

Korzystając z tego kodu, stwierdzamy, że nasze wartości _t_ wynoszą w przybliżeniu 0,211325 i 0,788675, więc wybierzmy niższą z nich i zobaczmy, jakie jest maksymalne odchylenie w naszej dziedzinie kątów, z oryginalnym błędem kwadratowym pokazanym na zielono (najpierw rakieta do nieskończoności, a następnie powrót w dół, gdy zbliżamy się do 2π)

<table><tbody><tr><td>
  <img src="images/chapter-assets/circles/image-20210417173811587.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210417174019035.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210417174100036.png" width="95%"/>
</td></tr>
<tr><td>
  error plotted for 0 ≤ φ ≤ 2π
</td><td>
  error plotted for 0 ≤ φ ≤ π
</td><td>
  error plotted for 0 ≤ φ ≤ ½π
</td></tr>
</tbody></table>

Ten ostatni obraz prawdopodobnie nie jest wystarczająco wyraźny: przybliżenie sześcienne ćwiartki koła jest tak niewiarygodnie dużo lepsze, że nie możemy go nawet zobaczyć w tej samej skali naszej krzywej kwadratowej. Przeskalujmy nieco oś Y i spróbujmy ponownie:

<p style="text-align: center"><img src="images/chapter-assets/circles/image-20210417174215876.png" height="350px"></p>

Tak... błąd aproksymacji sześciennej dla ćwiartki koła okazuje się być _dwa rzędy wielkości_ lepszy. Przy około 0,00027 (lub: zaledwie o 2,7 piksela mniej dla okręgu o promieniu 10 000 pikseli) wzrost precyzji w stosunku do krzywych kwadratowych jest dość spektakularny - z pewnością na tyle dobry, że nikt przy zdrowych zmysłach nie powinien nigdy używać krzywych kwadratowych.

</div>

Więc to wszystko, kappa to _4/3 · tan(θ/4)_ , gotowe! ... lub czy jesteśmy?

## Czy możemy zrobić to lepiej?


Technicznie: tak, możemy. Ale poprzedzę tę sekcję słowami "możemy i powinniśmy zbadać tę możliwość, ale pozwólcie, że uprzedzę was, że wynik będzie _tylko_ lepszy, jeśli zamierzamy zakodować wartości na stałe”. Zaraz wejdziemy w gąszcz, a standardowa wartość trzech punktów zbieżności jest już tak dobra, że w przypadku większości zastosowań próba poprawy nie będzie miała żadnego sensu.

Powiedziawszy to: to, co obliczyliśmy powyżej, to _górna granica_ dla najlepiej dopasowanej krzywej Béziera dla łuku kołowego: gdziekolwiek nie dotkniemy łuku kołowego w naszym przybliżeniu, "przekroczyliśmy” łuk. Co by było, gdybyśmy obniżyli naszą wartość dla _k_ tylko trochę, tak że krzywa zaczyna się jako przeszacowanie, ale potem przecina łuk kołowy, dając obszar niedoszacowania, a następnie ponownie przecina łuk kołowy z innym obszarem przeszacowania. Może to dać nam niższy ogólny błąd, więc zobaczmy, co możemy zrobić.

Najpierw wyraźmy całkowity błąd (dany kąt łuku kołowego θ i trochę _k_) za pomocą standardowej notacji rachunku różniczkowego:

\[
\textit{erf}~(θ, k) = \int_0^1{\left \| \sqrt{B_x(t,θ,k)^2 + B_y(t,θ,k)^2} - r \right \|dt}
\]

Oznacza to, że funkcja błędu dla danego kąta i wartości _k_ jest równa "nieskończonej” sumie różnic między naszą krzywą a łukiem kołowym, gdy prowadzimy _t_ od 0 do 1, stosując nieskończenie mały krok. pomiędzy kolejnymi wartościami _t_.

Teraz, ponieważ chcemy znaleźć minimalny błąd, oznacza to, że chcemy wiedzieć, gdzie wzdłuż tej funkcji rzeczy przechodzą od "błąd jest coraz mniejszy” do "błąd ponownie rośnie”, co oznacza, że chcemy wiedzieć, gdzie jej pochodna wynosi zero , co jako wyrażenie matematyczne wygląda następująco:

\[
\left ( \int_0^1{\left \| \sqrt{B_x^2 + B_y^2} - r \right \|dt} \right ) \frac{d}{dt} = 0
\]

I tutaj mamy najbardziej bezpośrednie zastosowanie [podstawowego twierdzenia rachunku różniczkowego](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus): pochodna i całka są swoimi operacjami odwrotnymi, więc znoszą się, pozostawiając nas z naszą oryginalną funkcją:

\[
\left \| \sqrt{B_x^2 + B_y^2} - r \right \| = 0, ~~ t \in [0,1]
\]

A teraz po prostu rozwiązujemy to... och, czekaj. Widzieliśmy to już wcześniej. Aby rozwiązać ten problem, musielibyśmy rozwiązać to:


\[
B_x^2 + B_y^2 = r
\]

A oba wyrażenia po lewej stronie znaku równości to wielomiany 6<sup>th</sup> stopnia, co oznacza - jak omówiliśmy w części dotyczącej długości łuków - [nie ma symbolicznego rozwiązania tego równania](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem). 
Zamiast tego będziemy musieli użyć podejścia numerycznego, aby znaleźć tutaj rozwiązania, więc... do komputera!

<div class="note">

## Iteracja na rozwiązaniu

Przez co naprawdę mam na myśli "algorytm wyszukiwania binarnego”, ponieważ mamy do czynienia z dość dobrze zachowującą się funkcją: w zależności od wartości dla _k_ , albo skończymy z krzywą Béziera, która jest średnio "nie w odległość _r_ od środka łuku”, "dokładna odległość _r_ od środka łuku” lub "więcej niż odległość _r_ od środka łuku”, więc możemy po prostu przeszukać binarnie naszą drogę do najdokładniejszej wartości _c_, która daje nam środek sprawa.

Najpierw nasza konfiguracja, w której określamy nasze górne i dolne granice, zanim przejdziemy do wyszukiwania binarnego:


```
findBest(radius, angle, points[]):
  lowerBound = 0
  upperBound = 4.0/3.0 * Math.tan(abs(angle) / 4)
  return binarySearch(radius, angle, points, lowerBound, upperBound)
```

A potem algorytm wyszukiwania binarnego, który można znaleźć w prawie każdym podręczniku CS, a także w większej liczbie artykułów online, samouczków i postów na blogach, niż można przeczytać w ciągu całego życia:


```
binarySearch(radius, angle, points[], lowerBound, upperBound, epsilon=1e-15):
  value = (upperBound + lowerBound)/2

  if (upperBound - lowerBound < epsilon) return value

  // recompute the control points, based on our current "value"
  d = (points[3].y < 0 ? -1 : 1) * value * radius
  points[1] = new Point(radius, d)
  points[2] = new Point(
    points[3].x + d * sin(angle)
    points[3].y - d * cos(angle)
  )

  if radialError(radius, points) > 0:
    // our bezier curve is longer than we want it to be: reduce the upper bound
    return binarySearch(radius, angle, points, lowerBound, value)
  else:
    // our bezier curve is shorter than we want it to be: increase the lower bound
    return binarySearch(radius, angle, points, value, upperBound)
```

Używając następującej funkcji `radialError`, która próbkuje aproksymację krzywej łuku kołowego w kilku punktach (chociaż pierwszy i ostatni punkt nigdy niczego nie wnoszą, więc je pomijamy):


```
radialError(radius, points[]):
  err = 0
  steps = 5.0
  for (int i=1; i<steps; i++):
    Point p = getOnCurvePoint(points, i/steps)
    err += p.magnitude()/radius - 1
  return err
```

W tym przypadku `getOnCurvePoint` jest po prostu standardową funkcją oceny Béziera, dającą punkt. Traktując ten punkt jako wektor, możemy uzyskać jego długość do początku za pomocą wywołania `magnitude`.

## Badanie wyniku

Uruchamiając powyższy kod, możemy uzyskać listę wartości _k_ powiązanych z listą kątów θ od 0 do π i możemy użyć tego do wykreślenia dla każdego kąta, jak wygląda różnica między łukiem kołowym a przybliżeniem Béziera:

![image-20210419085430711](images/chapter-assets/circles/image-20210419085430711.png)

Tutaj widzimy różnicę między łukiem a jego aproksymacją Béziera wykreśloną w miarę przesuwania _t_ od 0 do 1. Patrząc na wykres, możemy stwierdzić, że maksymalne ugięcie występuje przy _t_ = 0,5, więc wykreślmy "funkcję" maksymalnego ugięcia dla kątów od 0 do θ:

Faktycznie wykreślmy maksymalne ugięcia dla obu podejść jako funkcje po θ:

<table><tbody><tr><td>
  <img src="images/chapter-assets/circles/image-20210418111929371.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210418112008676.png" width="95%"/>
</td><td>
  <img src="images/chapter-assets/circles/image-20210418112038613.png" width="95%"/>
</td></tr>
<tr><td>
  max deflection using unit scale
</td><td>
  max deflection at 10x scale
</td><td>
  max deflection at 100x scale
</td></tr>
</tbody></table>

Faktycznie nie wydaje się to dużo lepsze, więc spójrzmy na niektóre liczby, aby zobaczyć, na czym polega poprawa:

| angle | "improved" deflection | "upper bound" deflection | difference            |
| ----- | --------------------- | ------------------------ | --------------------- |
| 1/8 π | 6.202833502388927E-8  | 6.657161222278773E-8     | 4.5432771988984655E-9 |
| 1/4 π | 3.978021202111215E-6  | 4.246252911066506E-6     | 2.68231708955291E-7   |
| 3/8 π | 4.547652269037972E-5  | 4.8397483513262785E-5    | 2.9209608228830675E-6 |
| 1/2 π | 2.569196199214696E-4  | 2.7251652752280364E-4    | 1.559690760133403E-5  |
| 5/8 π | 9.877526288810667E-4  | 0.0010444175859711802    | 5.666495709011343E-5  |
| 3/4 π | 0.00298164978679627   | 0.0031455628414580605    | 1.6391305466179062E-4 |
| 7/8 π | 0.0076323182807019885 | 0.008047777909948373     | 4.1545962924638413E-4 |
| π     | 0.017362185964043708  | 0.018349016519545902     | 9.86830555502194E-4   |

Jak widać, wzrost precyzji nie jest szczególnie duży: dla ćwiartki koła (π/2) tradycyjne _k_ będzie się różnić o 2,75 piksela na okręgu o promieniu 10 000 pikseli, podczas gdy to "lepsze” dopasowanie będzie się różnić o 2,56 piksela. I chociaż jest to z pewnością poprawa o prawie 10%, 
nie jest to również poprawa na tyle wystarczająca, aby można było zauważyć zauważalną różnicę.

</div>

W tym momencie powinno być jasne, że chociaż tak, istnieją ulepszenia, które należy wprowadzić, są one zasadniczo nieistotne, a jednocześnie są _dużo_ bardziej kosztowne obliczeniowo.

## TL;DR: po prostu powiedz mi, jakiej wartości powinienem użyć

To zależy od tego, co musimy zrobić. Jeśli chcemy po prostu uzyskać najlepszą wartość dla ćwierćokręgów i zamierzamy zakodować na stałe wartość dla _k_, to nie ma powodu, aby na stałe zakodować stałą `k=4/3*tan(pi/8)` kiedy zamiast tego możesz równie łatwo zakodować stałą jako `k=0.551784777779014`.

**Jeśli potrzebujesz "tej" wartości dla ćwiartki koła, użyj 0,551785 zamiast 0,55228**.

Jednak w przypadku dynamicznego przybliżania łuków w kodzie, który próbuje dopasować ścieżki kołowe za pomocą ścieżek Béziera, powinno być dość oczywiste, że prosta funkcja obejmująca obliczenie stycznej, dwa dzielenie i jedno mnożenie jest znacznie bardziej wydajna niż wykonanie całego kodu zakończyliśmy pisanie tylko po to, aby uzyskać o 25% niższą wartość błędu i z całą pewnością warto przedłożyć ją nad uzyskanie "dokładniejszej” wartości.

**Jeśli chcesz dopasować Béziers do okrągłych łuków w locie, użyj `4/3 * tan(θ/4)`**

Zawsze jednak pamiętaj, że jeśli piszesz dla ludzi, zazwyczaj możesz wykorzystać to, co najlepsze z obu światów: gdy użytkownik wchodzi w interakcję z ich krzywymi, powinieneś rysować _ich krzywe_ zamiast rysować ich przybliżenia. Jeśli muszą narysować okręgi lub łuki kołowe, narysuj je i przybliż je krzywą Béziera tylko wtedy, gdy dane muszą zostać wyeksportowane do formatu, który ich nie obsługuje. Najlepiej z mechanizmem podglądu, który podkreśla, gdzie będą błędy i jak duże będą.

**Jeśli piszesz kod do projektowania grafiki przez ludzi, użyj okrągłych łuków dla okrągłych łuków**

I to wszystko. Ten temat już całkiem wyczerpaliśmy. Istnieją różne metryki, których możemy użyć do znalezienia "różnych najlepszych wartości _k_”, na przykład próba dopasowania długości łuku (np. gdy optymalizujemy koszt materiału) lub minimalizacja obszaru między łukiem kołowym a krzywą Béziera (np. gdy optymalizujemy pod kątem tuszu) lub minimalizujemy tempo zmian krzywizny Béziera (np. gdy optymalizujemy przechodzenie przez krzywą) i wszystkie one dają wartości, które są tak podobne, że prawie na pewno nie warto. (Na przykład dla przybliżeń ćwiartki koła wartości te wynoszą odpowiednio 0,551777, 0,5533344 i 0,552184. Podobnie jak 0,551785, które uzyskujemy z minimalizacji maksymalnego ugięcia, żadna z tych wartości nie jest wystarczająco lepsza, aby preferować je w stosunku do górnej granicy wartości).
