# Przecięcia z okręgiem

Może wydawać się dziwne, że temat ten został poruszony znacznie później 
niż tematy przecięć linia/linia, linia/krzywa i krzywa/krzywa z kilku wcześniejszych sekcji, 
ale powodem, dla którego nie omawiamy przecięć okrąg/krzywa, jest to, że tak naprawdę
nie możemy omawiać przecięć okrąg/krzywa, dopóki nie omówimy rodzaju tabeli 
przeglądowej (LUT), z której korzysta sekcja dotycząca rzutowania punktu na krzywą. 
Aby zrozumieć dlaczego, spójrzmy na to, co musielibyśmy zrobić, gdybyśmy chcieli 
znaleźć przecięcia między krzywą a okręgiem za pomocą rachunku różniczkowego.

Po pierwsze, zauważamy, że "znajdowanie przecięć" w tym przypadku oznacza, że biorąc 
pod uwagę okrąg zdefiniowany przez punkt środkowy `c = (x,y)` i promień `r`, 
chcemy znaleźć wszystkie punkty na krzywej Beziera, dla których odległość od punktu
środkowego okręgu jest równa promieniowi okręgu, co z definicji oznacza, że punkty te 
leżą na okręgu, a więc liczą się jako przecięcia. W matematyce oznacza to, 
że próbujemy rozwiązać:

\[
  \textit{dist}(B(t), c) = r
\]

Co wydaje się dość proste. Niestety, kiedy rozwiniemy tę funkcję `dist`, sprawy stają się o wiele bardziej problematyczne:

\[
  \begin{aligned}
    r &= \textit{dist}(B(t), c) \\
    &= \sqrt{ \left ( B_x{t} - c_x \right )^2 + \left ( B_y{t} - c_y \right )^2} \\
    &= \sqrt{ \left (
      x_1 (1-t)^3 + 3 x_2 (1-t)^2 t + 2 x_3 (1-t) t^2 + x_4 t^3 - c_x
    \right )^2
    +
    \left (
      y_1 (1-t)^3 + 3 y_2 (1-t)^2 t + 2 y_3 (1-t) t^2 + y_4 t^3 - c_y
    \right )^2}
  \end{aligned}
\]

A teraz mamy problem, bo to jest wielomian szóstego stopnia wewnątrz pierwiastka kwadratowego.
Tak więc, dzięki [twierdzeniu Abela-Ruffiniego](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem), które widzieliśmy wcześniej, 
nie możemy tego rozwiązać, po prostu "podnosząc do kwadratu obie strony ponieważ nie dbamy o znak”...
nie możemy rozwiązać wielomianu szóstego stopnia. 
Tak więc będziemy musieli faktycznie oszacować to wyrażenie. 
Możemy to "uprościć” poprzez translację wszystkich naszych współrzędnych tak, 
że środek okręgu będzie wynosił (0,0) i wszystkie nasze współrzędne są odpowiednio przesunięte, 
co sprawia, że wyrazy c<sub>x</sub> i c<sub>y</sub> odpadają, 
ale wciąż pozostaje nam do rozwiązania potworna funkcja.

Zamiast tego zwracamy się do tego samego rodzaju "chodzenia po LUT”, 
który widzieliśmy do rzutowania punktów na krzywą, 
z pewnym zwrotem: zamiast znajdować punkt na krzywej w najmniejszej odległości 
od naszego punktu projekcji, chcemy znaleźć punkt na krzywej, który ma 
dokładną odległość `r` od naszego punktu projekcji (mianowicie środka naszego okręgu). 
Oczywiście może istnieć więcej niż jeden taki punkt, więc jest też trochę więcej kodu, 
aby mieć pewność, że znajdziemy je wszystkie, ale spójrzmy na wymagane kroki:

```
p = środek naszego okręgu
r = prmień naszego okręgu
d = pewna wartość ogromna na początku
i = 0
for (coordinate, index) in LUT:
  q = abs(distance(coordinate, p) - r)
  if q < d:
    d = q
    i = index
```

Jest to _bardzo__ podobne do kodu z poprzedniej sekcji, z dodatkowym wejściem `r` 
dla promienia okręgu i niewielką zmianą w "odległości dla tej współrzędnej": 
zamiast tylko `odległość(współrzędna, p)` chcemy znać różnicę między tą odległością
a promieniem okręgu. W końcu, jeśli ta różnica wynosi zero, 
to odległość od współrzędnej do środka okręgu jest dokładnie promieniem, 
więc współrzędna leży zarówno na krzywej, jak i na okręgu.

Jak na razie dobrze.

Jednak chcemy również upewnić się, że znaleźliśmy _wszystkie_ punkty, 
a nie tylko jeden, więc potrzebujemy trochę więcej kodu:

```
p = środek naszego okręgu
r = prmień naszego okręgu
d = pewna wartość ogromna na początku
start = 0
values = []
do:
    i = findClosest(start, p, r, LUT)
    if i < start, or i>0 but the same as start: stop
    values.add(i);
    start = i + 2;
```

Po uruchomieniu tego kodu `values` będą listą wszystkich współrzędnych LUT, 
które są najbliższe odległości `r`: możemy użyć tych wartości do uruchomienia 
tego samego rodzaju wyszukiwania uściślającego, którego użyliśmy do 
odwzorowania punktu (z zastrzeżeniem, że 'teraz _nie_ sprawdzamy najmniejszej odległości, 
ale "odległość najbliższa `r`), i będziemy mieli wszystkie nasze punkty przecięcia. 
Oczywiście wymaga to wyjaśnienia, co robi polecenie `findClosest`: 
zamiast szukać globalnego minimum, jesteśmy teraz zainteresowani 
znalezieniem _lokalnego_ minimum, więc zamiast sprawdzać pojedynczy punkt
i patrzeć na wartość jego odległości, sprawdzamy _trzy_ punkty 
("obecny”, "poprzedni” i "przed poprzedni”), 
a następnie sprawdzamy, czy tworzą one minimum lokalne:

```
findClosest(start, p, r, LUT):
    minimizedDistance = some very large number
    pd2 = LUT[start-2], if it exists. Otherwise use minimizedDistance
    pd1 = LUT[start-1], if it exists. Otherwise use minimizedDistance
    slice = LUT.subset(start, LUT.length)
    epsilon = the largest point-to-point distance in our LUT
    i = -1;

    for (coordinate, index) in slice:
        q = abs(dist(coordinate, p) - r);
        if pd1 less than all three values epsilon, pd2, and q:
            i = index - 1
            break

        minimizedDistance = min(q, minimizedDistance)
        pd2 = pd1
        pd1 = q

  return start + i
```

Słownie: mając indeks `start`, środek i promień okręgu oraz naszą tablicę LUT, 
sprawdzamy, gdzie (najbliżej naszego indeksu `start`) możemy znaleźć lokalne 
minimum dla różnicy między "odległością od krzywej do środka okręgu” i promień okręgu. 
Śledzimy to, patrząc na trzy wartości (powiązane z indeksami `index-2`, `index-1` i `index`) 
i wiemy, że znaleźliśmy lokalne minimum, jeśli te trzy wartości pokazują, że środkowa wartość (`pd1`) 
jest mniejsze niż jedna z wartości obok niego. 
Kiedy to zrobimy, możemy ustawić nasze "najlepsze przypuszczenie względem `start`” 
jako `index-1`. Oczywiście, ponieważ teraz sprawdzamy wartości względem pewnej wartości `start`, 
możemy w ogóle nie znaleźć innej wartości kandydującej, w którym to przypadku 
zwracamy `start - 1`, więc proste "czy wynik jest mniejszy niż `start`?" 
pozwala nam określić, że nie ma więcej przecięć do znalezienia.

Wreszcie, chociaż nie jest to konieczne do projekcji punktowej, jest jeszcze jeden krok, który musimy wykonać, gdy uruchamiamy funkcję udoskonalania binarnego na naszych kandydujących indeksach LUT, ponieważ do tej pory testowaliśmy tylko przy użyciu odległości "najbliższych promieniowi okręgu ", a to właściwie nie wystarczy... potrzebujemy odległości, które _są_ promieniem okręgu. 
Tak więc po przeprowadzeniu udoskonalania dla każdego z tych indeksów musimy odrzucić każdą wartość końcową, która nie jest promieniem okręgu.
A ponieważ pracujemy z liczbami zmiennoprzecinkowymi, tak naprawdę oznacza to, że musimy odrzucić każdą wartość, która jest oddalona o piksel lub więcej. Lub, jeśli chcemy być naprawdę fantazyjni, "jakąś małą wartość `epsilon`".

Opierając się na tym wszystkim, poniższa grafika pokazuje to dla standardowej krzywej sześciennej (dla której można oczywiście przesuwać współrzędne) i okręgu o kontrolowanym promieniu wyśrodkowanym na środku grafiki, przy użyciu kodu opisanego powyżej.


<graphics-element title="przecinanie okręgu" src="./circle.js">
  <input type="range" min="1" max="150" step="1" value="70" class="slide-control">
</graphics-element>

I oczywiście, aby uzyskać szczegółowe informacje, kliknij link "wyświetl źródło”.
