# B-splajny

Żadna dyskusja na temat krzywych Béziera nie jest kompletna bez wzmianki o innej bestii w przestrzeni projektowania krzywych: B-Splajnach. Łatwo pomylić, że oznaczają krzywe Béziera, tak naprawdę to nie to, czym są; są to splajny "funkcji bazowej”, co robi dużą różnicę i przyjrzymy się tym różnicom w tej sekcji. Nie będziemy zagłębiać się w B-splajny tak głęboko, jak w przypadku krzywych Béziera (to byłby sam elementarz), ale przyjrzymy się, jak działają B-splajny, jakiego rodzaju matematyka jest zaangażowana w obliczanie ich i jak je rysować w oparciu o szereg parametrów, które można wybrać dla poszczególnych B-splajnów.

Po pierwsze: B-Splajny to [fragmentami](https://en.wikipedia.org/wiki/Piecewise), [krzywe interpolacji wielomianowej](https://en.wikipedia.org/wiki/Spline_(matematyka)), gdzie "pojedyncza krzywa” jest budowana przez wykonanie interpolacji wielomianowej na zbiorze punktów, przy użyciu przesuwanego okna o ustalonej liczbie punktów. Na przykład "sześcienny” B-Spline zdefiniowany przez dwanaście punktów będzie miał krzywą zbudowaną przez ocenę interpolacji wielomianowej czterech punktów, a krzywa może być traktowana jako wiele różnych sekcji, z których każda jest kontrolowana przez cztery punkty na raz, tak, że pełna krzywa składa się z płynnie połączonych odcinków określonych przez punkty {1,2,3,4}, {2,3,4,5}, ..., {8,9,10,11} i wreszcie { 9,10,11,12}, na osiem sekcji.

Jak one wyglądają? Wyglądają tak! Stuknij w grafikę, aby dodać więcej punktów, i przesuwaj punkty, aby zobaczyć, jak odwzorowują narysowaną krzywą splajnu.

<graphics-element title="Przykład B-Splajnu" width="600" height="300" src="./basic.js"></graphics-element>

Ważna część do zauważania tu jest to, że **nie** robimy tego samego z B-Splajnami, co robimy z krzywymi poli-Béziers lub Catmull-Rom: obie te ostatnie po prostu definiują nowe sekcje jako dosłownie "oparte na nowych sekcjach w nowych punktach”, więc 12-punktowa sześcienna krzywa poli-Béziera jest w rzeczywistości niemożliwa, ponieważ zaczynamy od krzywej czteropunktowej, a następnie dodajemy kolejne trzy punkty dla każdej następnej sekcji, więc możemy mieć tylko 4, 7, 10, 13, 16 itd. Punkt Poly-Béziers. Podobnie, podczas gdy krzywe Catmull-Rom mogą rosnąć poprzez dodawanie pojedynczych punktów, to dodanie jednego punktu wprowadza trzy ukryte punkty Béziera. Z drugiej strony sześcienne b-splajny to płynne interpolacje *każdej możliwej krzywej obejmującej cztery kolejne punkty*, tak że w dowolnym punkcie wzdłuż krzywej, 
z wyjątkiem naszych punktów początkowych i końcowych, nasza współrzędna na krzywej jest definiowana przez cztery punkty kontrolne.

Rozważ różnicę jako taką:

- dla krzywych Béziera krzywa jest zdefiniowana jako interpolacja punktów, ale:
- dla B-Splajnów krzywa jest zdefiniowana jako interpolacja *krzywych*.

Faktycznie spójrzmy na to ponownie, ale tym razem z pokazanymi krzywymi bazowymi. Każde kolejne cztery punkty definiują jedną krzywą:

<graphics-element title="The components of a B-Spline " width="600" height="300" src="./basic.js" data-show-curves="true">
  <!-- basis curve highlighter goes here -->
</graphics-element>

Aby ta interpolacja krzywych działała, matematyka jest z konieczności bardziej złożona niż matematyka dla krzywych Béziera, więc przyjrzyjmy się, jak to działa.

## Jak obliczyć krzywą B-splajn: trochę matematyki

Biorąc B-splajn stopnia `d`, a więc rzędu `k=d+1` (tak więc kwadratowy B-splajn ma stopień 2 i rząd 3, sześcienny B-splajn ma stopień 3 i rząd 4 itd.) oraz ` n` punktów kontrolnych od `P<sub>0</sub>` do `P<sub>n-1</sub>`, możemy obliczyć punkt na krzywej dla pewnej wartości `t` w przedziale [0, 1] (gdzie 0 to początek krzywej, a 1 koniec, podobnie jak w przypadku krzywych Béziera), szacując następującą funkcję:

\[
  Point(t) = \sum^n_{i=0} P_i \cdot N_{i,k}(t)
\]

o, szczerze mówiąc, niewiele nam mówi. Widzimy tylko, że punkt na krzywej B-splajn jest zdefiniowany jako "mieszanka wszystkich punktów kontrolnych, w jakiś sposób ważonych”, gdzie ważenie jest osiągane za pomocą funkcji *N(...)*, z indeksem dolnym oczywisty parametr `i`, który pochodzi z naszego sumowania, oraz jakiś magiczny parametr `k`. Musimy więc wiedzieć dwie rzeczy: 1. co robi N(t) i 2. co to jest to `k`? Omówmy oba, w odwrotnej kolejności.

Parametr `k` reprezentuje "interwał węzłów", w którym definiowany jest odcinek krzywej. Jak dowiedzieliśmy się wcześniej, krzywa B-splajn sama w sobie jest interpolacją krzywych i możemy traktować każde przejście, w którym punkt kontrolny zaczyna lub przestaje wpływać na całkowitą krzywiznę, jako "węzeł na krzywej”.
Zrobienie tego dla stopnia `d` B-Spline z punktem kontrolnym `n` daje nam węzły `d + n + 1`, definiując odstępy `d + n` wzdłuż krzywej i to właśnie te odstępy, o których mowa powyżej `k` dotyczy indeksu dolnego funkcji N().

Następnie sama funkcja N(). Jak wygląda?

\[
  N_{i,k}(t) =
    \left ( \frac{t-\textit{knot}_i}{\textit{knot}_{(i+k-1)} - \textit{knot}_i}\right )
    \cdot
    N_{i,k-1}(t) +
    \left ( \frac{\textit{knot}_{(i+k)}-t}{\textit{knot}_{(i+k)} - \textit{knot}_{(i+1)}} \right )
    \cdot
    N_{i+1,k-1}(t)
\]

Oto, gdzie widzimy interpolację: N(t) dla pary `(i,k)` (to znaczy dla kroku w powyższym sumowaniu, w określonym przedziale węzła) jest mieszanką N(t) dla `(i,k-1)` i N(t) dla `(i+1,k-1)`, więc widzimy, że jest to iteracja rekurencyjna, w której `i` idzie w górę, a `k` spada, więc rozsądne wydaje się oczekiwanie, że ta rekurencja musi się w pewnym momencie zatrzymać; oczywiście tak, a w szczególności dla następujących wartości `i`/`k`:

\[
  N_{i,1}(t) = \left\{\begin{matrix}
               1 & \textit{if } t \in [\textit{knot}_i,\textit{knot}_{i+1}) \\
               0 & \textit{otherwise}
               \end{matrix}\right.
\]

I ta funkcja ma wreszcie proste oszacowanie: jeśli wartość `t` mieści się w przedziale specyficznym dla węzła, gdy osiągniemy wartość `k=1`, to "liczy się”, w przeciwnym razie nie. Trochę jednak oszukiwaliśmy, ponieważ dla wszystkich tych wartości musimy najpierw przeskalować naszą wartość `t`, tak aby mieściła się w przedziale ograniczonym przez `węzły[d]` i `węzły[n]`, które są punkt początkowy i punkt końcowy, w którym krzywizna jest kontrolowana przez punkty kontrolne dokładnie "porządku”. Na przykład dla stopnia 3 (= rząd 4) i 7 punktów kontrolnych, z wektorem węzłów [1,2,3,4,5,6,7,8,9,10,11], odwzorowujemy `t` z [ interwał 0,1] do przedziału [4,8], a następnie zamiast tego użyj tej wartości w powyższych funkcjach.

## Czy możemy to uprościć?

Możemy, tak.

Ludzie o wiele mądrzejsi od nas przyjrzeli się tej pracy, 
a zwłaszcza dwóch - [Maurice Cox](https://www.npl.co.uk/people/maurice-cox) i [Carl de Boor](https://en.wikipedia.org/wiki/Carl_R._de_Boor) - doszli do matematycznego rozwiązania: aby obliczyć punkt P(t), możemy obliczyć ten punkt, szacując *d(t)* na odcinku krzywej między węzłami `i ` i `i+1`:

\[
  d^k_i(t) = \alpha_{i,k} \cdot d^{k-1}_i(t) + (1-\alpha_{i,k}) \cdot d^{k-1}_{i-1}(t)
\]

Jest to kolejna funkcja rekurencyjna, w której wartości *k* maleją od rzędu krzywej do 1, a wartość *α* (alfa) jest zdefiniowana przez:

\[
  \alpha_{i,k} = \frac{t - \textit{knots}[i]}{\textit{knots}[i+1+n-k] - \textit{knots}[i]}
\]

Wygląda na skomplikowane, ale takie nie jest. Obliczanie alfa to tylko ułamek obejmujący znane, zwykłe liczby. A kiedy już mamy naszą wartość alfa, mamy również `(1-alpha)`, ponieważ jest to trywialne odejmowanie. Obliczanie funkcji `d()` jest zatem głównie kwestią obliczania całkiem prostych instrukcji arytmetycznych, z pewnym buforowaniem wyników, dzięki czemu możemy się do nich odwoływać podczas recurve. Chociaż rekurencja może wydawać się kosztowna obliczeniowo, cały algorytm jest tani, ponieważ każdy krok obejmuje tylko bardzo proste obliczenia matematyczne.

Oczywiście rekurencja wymaga warunku stop:

\[
  d^k_0(t) = 0, ~d^0_i(t) = N_{i,1}(t) =
  \left\{\begin{matrix}
    1 & \textit{if } t \in [\textit{knot}_i,\textit{knot}_{i+1}) \\
    0 & \textit{otherwise}
  \end{matrix}\right.
\]

Faktycznie widzimy więc dwa warunki zatrzymania: albo `i` staje się 0, w którym to przypadku `d()` jest równe zero, albo `k` staje się zerem, w którym to przypadku otrzymujemy to samo "1 albo 0”, które widzieliśmy w powyższej funkcji N().

Dzięki Coxowi i de Boorowi możemy dość łatwo obliczyć punkty na B-splajnie, używając tego samego rodzaju interpolacji liniowej, którą widzieliśmy w algorytmie de Casteljau. Na przykład, jeśli wypiszemy `d()` dla `i=3` i `k=3`, otrzymamy następujący diagram rekurencji:

\[
  d^3_3 = \left \{
    \begin{aligned}
      \alpha^3_3 \times d^2_3, & ~\textit{ with } d^2_3 = \left \{
        \begin{aligned}
          \alpha^2_3 \times d^1_3, & ~\textit{ with } d^1_3 =
            \left \{
              \begin{aligned}
                \alpha^1_3 \times d^0_3, & ~\textit{ with } d^0_3 \textit{ either 0 or 1} \\
                + & \\
                \left ( 1 - \alpha^1_3 \right ) \times d^0_2, & ~\textit{ with } d^0_2 \textit{ either 0 or 1} \\
              \end{aligned}
            \right . \\
          + & \\
          \left ( 1 - \alpha^2_3 \right ) \times d^1_2, & ~\textit{ with } d^1_2 =
            \left \{
              \begin{aligned}
                \alpha^1_2 \times d^0_2 & \\
                + & \\
                \left ( 1 - \alpha^1_2 \right ) \times d^0_1, & ~\textit{ with } d^0_1 \textit{ either 0 or 1} \\
              \end{aligned}
            \right . \\
        \end{aligned}
      \right . \\
      + & \\
      \left ( 1 - \alpha^3_3 \right ) \times d^2_2, & ~\textit{ with } d^2_2 = \left \{
        \begin{aligned}
          \alpha^2_2 \times d^1_2 & \\
          & \\
          + & \\
          \left ( 1 - \alpha^2_2 \right ) \times d^1_1, & ~\textit{ with } d^1_1 =
            \left \{
              \begin{aligned}
                \alpha^1_1 \times d^0_1 \\
                + & \\
                \left ( 1 - \alpha^1_1 \right ) \times d^0_0, & ~\textit{ with } d^0_0 \textit{ either 0 or 1} \\
              \end{aligned}
            \right . \\
        \end{aligned}
      \right .
    \end{aligned}
  \right .
\]

Oznacza to, że obliczamy `d(3,3)` jako mieszaninę `d(2,3)` i `d(2,2)`, gdzie te dwa same są mieszaniną `d(1,3) odpowiednio ` i `d(1,2)` oraz `d(1,2)` i `d(1,1)`, które same są mieszaniną itd. itd. Po prostu rozszerzamy nasze wyrazy, aż osiągnąć warunki zatrzymania, a następnie zsumować wszystko z powrotem. 
Jest naprawdę bardzo elegancko.

Należy pamiętać, że pracujemy ze splajnem, który jest ograniczony punktami kontrolnymi, więc nawet jeśli wartości `d(..., k)` wynoszą zero lub jeden na najniższym poziomie, są naprawdę "zero lub jeden, razy ich odpowiedni punkt kontrolny”, więc w następnej sekcji zobaczysz algorytm przeprowadzania obliczeń w sposób, który zaczyna się od kopii wektora punktu kontrolnego, a następnie działa aż do tego pojedynczego punktu, zamiast zaczynać najpierw "od lewej”, przesuwając się "w prawo”, a następnie podsumowując "w lewo”. Możemy po prostu zacząć od prawej i natychmiast kierować się w lewo.

## Uruchamianie obliczeń

W przeciwieństwie do algorytmu de Casteljau, w którym wartość `t` pozostaje taka sama w każdej iteracji, w przypadku B-sklejanych tak nie jest, więc kończymy z koniecznością (dla każdego szacowanego punktu) przeprowadzenia dość angażującego fragmentu obliczeń rekurencyjnych. 
Algorytm jest omówiony na stronie [Michigan Tech](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/de-Boor.html), ale łatwiejsza do odczytania wersja jest implementowana przez [ b-spline.js](https://github.com/thibauts/b-spline/blob/master/index.js#L59-L71), więc przyjrzymy się jej kodowi.

Biorąc pod uwagę wartość wejściową `t`, najpierw odwzorowujemy dane wejściowe na wartość z dziedziny `[0,1]` na dziedzinę `[węzły[stopień], węzły[węzły.długość - 1 - stopień]`. Następnie znajdujemy sekcję o numerze `s`, na której znajduje się odwzorowana wartość `t`:

```
for(s=domain[0]; s < domain[1]; s++) {
  if(knots[s] <= t && t <= knots[s+1]) break;
}
```

po uruchomieniu tego kodu `s` jest indeksem sekcji, na której będzie leżeć punkt. Następnie uruchamiamy algorytm wspomniany na stronie MU (zaktualizowany, aby używał nazw zmiennych tego opisu):

```
let v = copy of control points

for(let L = 1; L <= order; L++) {
  for(let i=s; i > s + L - order; i--) {
    let numerator = t - knots[i]
    let denominator = knots[i - L + order] - knots[i]
    let alpha = numerator / denominator
    let v[i] = alpha * v[i] + (1-alpha) * v[i-1]
  }
}
```

(Dobrym zachowaniem w tym kodzie jest to, że wykonujemy interpolację "wstecz”, zaczynając od `i=s` na każdym poziomie interpolacji i zatrzymujemy się, gdy `i = s - kolejność + poziom`, więc zawsze kończy się wartością `i` taką, że te `v[i-1]` nie próbują użyć indeksu tablicy, który nie istnieje)


## Ścieżki otwarte a zamknięte

Podobnie jak poli-Béziers, B-splajny mogą być otwarte, biegnące od pierwszego do ostatniego punktu, lub zamknięte, gdzie pierwszy i ostatni punkt mają te same współrzędne. Jednakże, ponieważ B-splajny są interpolacją krzywych, a nie tylko punktów, nie możemy po prostu sprawić, by pierwszy i ostatni punkt były takie same, 
musimy połączyć tyle punktów, ile konieczne jest do utworzenia "krzywej”, z którą splajn wykonuje interpolację. W związku z tym, dla zamówienia `d` B-Spline, musimy sprawić, aby pierwszy i ostatni punkt `d` były takie same. To oczywiście niewiele więcej pracy niż poprzednio (po prostu dodaj `points.splice(0,d)` do `points`), ale ważne jest, aby pamiętać, że potrzebujesz więcej niż tylko jednego punktu.

Oczywiście, jeśli chcemy manipulować tego rodzaju krzywymi, musimy upewnić się, że oznaczymy je jako "zamknięte”, abyśmy znali współrzędne dla `punktów [0]` i `punktów [n-k]` itd. mieć te same wartości x/y, ale tak naprawdę to te same współrzędne, więc manipulowanie jedną będzie w równym stopniu manipulować drugą, ale programowanie generalnie sprawia, że jest to naprawdę łatwe dzięki przechowywaniu odniesień do punktów, a nie kopii (lub innych połączonych wartości, takich jak współrzędne wagi, omówione w sekcji NURBS), zamiast oddzielnych obiektów współrzędnych.


## Manipulowanie krzywą za pomocą wektora węzła

Najważniejszą rzeczą do zrozumienia, jeśli chodzi o B-Splajny, jest to, że działają one *z powodu* koncepcji wektora węzła. Jak wspomniano powyżej, węzły reprezentują "miejsca, w których poszczególne punkty kontrolne zaczynają/przestają wpływać na krzywą”, ale nigdy nie patrzyliśmy na *wartości*, które wchodzą w wektor węzłów. Jeśli spojrzysz wstecz na funkcje N() i a(), zobaczysz, że interpolacje są oparte na odstępach w wektorze węzłów, a nie na rzeczywistych wartościach wektora węzłów, i możemy to wykorzystać do zrobienia kilku całkiem interesujących rzeczy ze sprytna manipulacja wektorem węzła. W szczególności są cztery rzeczy, które możemy zrobić i warto się im przyjrzeć:

1. możemy użyć jednolitego wektora węzłów, z jednakowo rozmieszczonymi odstępami,
2. możemy użyć niejednorodnego wektora węzłów, bez wymuszania równych odstępów,
3. możemy zwinąć kolejne węzły do tej samej wartości, lokalnie zmniejszając złożoność krzywej za pomocą "zerowych” interwałów, oraz
4. możemy utworzyć niejednorodny wektor szczególnego przypadku, łącząc (1) i (3), aby uzyskać wektor ze zwiniętymi węzłami początkowymi i końcowymi, z wektorem jednolitym pomiędzy nimi.

### Jednolite b-splajny

Najprostszym typem B-splajnu jest jednolity splajn. W jednolitym splajnie węzły są rozmieszczone równomiernie na całym odcinku krzywej. Na przykład, jeśli mamy wektor węzłów o długości dwunastu, to jednolity wektor węzłów będzie miał postać [0,1,2,3,...,9,10,11]. Lub [4,5,6,...,13,14,15], które definiuje *te same przedziały*, lub nawet [0,2,3,...,18,20,22], które również definiuje *te same odstępy*, tylko przeskalowane przez stały współczynnik, który zostaje znormalizowany podczas interpolacji i nie ma wpływu na krzywiznę.

<graphics-element title="Jednolity B-Splajn" width="400" height="400" src="./uniform.js">
  <!-- knot sliders go here -->
</graphics-element>

To ważny punkt: przedziały, które definiuje wektor węzła, są przedziałami *względnymi*, więc nie ma znaczenia, czy każdy przedział ma rozmiar 1, czy 100 - względne różnice między przedziałami kształtują każdą konkretną krzywą.

Problem z jednolitymi wektorami węzłów polega na tym, że potrzebujemy punktów kontrolnych "porządku”, zanim uzyskamy jakąkolwiek krzywą, za pomocą której będziemy mogli przeprowadzić interpolację, krzywa nie "zaczyna się” w pierwszym punkcie ani nie "kończy się” w ostatnim punkcie. Zamiast tego są "luki”. Możemy się ich pozbyć, będąc sprytnym, jak zamiast tego zastosować następujące podejście łamiące jednolitość...

### Zmniejszenie złożoności krzywej lokalnej przez zwijanie interwałów

Zwijanie interwałów między węzłami, dzięki czemu dwa lub więcej kolejnych węzłów ma tę samą wartość, pozwala nam zmniejszyć złożoność krzywej w sekcjach, na które wpływają zaangażowane węzły. Może to mieć drastyczne skutki: przy każdym załamaniu interwału porządek krzywej spada, a ciągłość krzywej maleje, do punktu, w którym zapadające się węzły "porządku” tworzą sytuację, w której cała ciągłość zostaje utracona, a krzywa "załamuje się”.

<graphics-element title="A reduced uniform B-Spline" width="400" height="400" src="./reduced.js">
  <!-- knot sliders go here -->
</graphics-element>


### Otwarte jednorodne b-splajny

Łącząc zwijanie interwału węzłów na początku i końcu krzywej, z jednolitymi węzłami pomiędzy nimi, możemy przezwyciężyć problem z krzywą, która nie zaczyna się i nie kończy tam, gdzie byśmy tego chcieli:

Dla dowolnej krzywej stopnia `D` z punktami kontrolnymi `N` możemy zdefiniować wektor węzłów o długości `N+D+1`, w którym wartości `0 ... D+1` są takie same, wartości ` D+1 ... N+1` są zgodne z "jednolitym” wzorcem, a wartości `N+1 ... N+D+1` są znowu takie same. Na przykład sześcienny B-Spline z 7 punktami kontrolnymi może mieć wektor węzła [0,0,0,0,1,2,3,4,4,4,4] 
lub może mieć "identyczny” wektor węzłów [0,0,0,0,2,4,6,8,8,8,8] itd. Ponownie, to względne różnice określają kształt krzywej.

<graphics-element title="Otwarty jednorodny B-Splajn" width="400" height="400" src="./uniform.js" data-open="true">
  <!-- knot sliders go here -->
</graphics-element>


### Niejednorodne B-splajny

Jest to w zasadzie "swobodna” wersja B-Spline, a także najmniej interesująca, ponieważ nie ma żadnego konkretnego 
powodu, aby wybrać określone interwały węzłów, nie dzieje się nic szczególnie interesującego. Istnieje jedno ograniczenie wektora węzłów, poza tym, że każda wartość `knots[k+1]` powinna być większa lub równa `knots[k]`.

## Ostatnia rzecz: wymierne B-Splajny

Chociaż prawdą jest, że ta sekcja dotycząca B-splajnów jest już dość długa, jest jeszcze jedna rzecz, o której musimy porozmawiać, a mianowicie "wymierne” splajny, w przypadku których wymierność 
odnosi się do "stosunku” lub względnych wag samych punktów kontrolnych. 
Wprowadzając wektor proporcji z wagami do zastosowania do każdego punktu kontrolnego, znacznie zwiększamy nasz wpływ na ostateczny kształt krzywej: 
im większą wagę ma punkt kontrolny, tym bliżej tego punktu będzie leżeć krzywa splajnu, trochę jak podkręcenie grawitacji punktu kontrolnego, 
podobnie jak w przypadku wymiernych krzywych Béziera.

<graphics-element title="A (closed) rational, uniform B-Spline" width="400" height="400" src="rational-uniform.js">
  <!-- knot sliders go here -->
</graphics-element>

Oczywiście prowadzi nas to do ostatniego tematu, który każdy tekst o B-splajnach musi poruszyć przed zakończeniem dnia: [NURBS](https://en.wikipedia.org/wiki/Non-uniform_rational_B-splajn) lub Non-Uniform Rational B-Spline (NURBS nie jest liczbą mnogą, duże S w rzeczywistości oznacza po prostu "splajn”, ale wiele osób błędnie traktuje to tak, jakby tak było, więc teraz wiesz lepiej). NURBS to ważny typ krzywej w projektowaniu wspomaganym komputerowo, często używany w modelowaniu 3D (zwykle jako powierzchnie NURBS), a także w projektach 2D o dowolnej precyzji ze względu na poziom kontroli, jaki zapewnia projektantom krzywa NURBS.

Podczas gdy prawdziwy niejednolity wymierny B-splajn byłby trudny do pracy, kiedy mówimy o NURBS, zwykle mamy na myśli wymierny B-splajn otwarty-uniform lub OURBS, 
ale to nie schodzi z języka tak ładnie, pamiętaj więc, że kiedy ludzie mówią o NURBS, 
zwykle mają na myśli otwarty-jednolity, który ma użyteczną właściwość rozpoczynania krzywej w pierwszym punkcie kontrolnym 
i kończenia jej w ostatnim.

## Rozszerzenie naszej implementacji tak, aby obejmowała wymierne splajny

Algorytm działający z Wymiernymi B-Splajnami jest praktycznie identyczny ze zwykłym algorytmem, a rozszerzenie do działania z wagami punktów kontrolnych jest dość proste: rozciągamy każdy punkt kontrolny od punktu w jego pierwotnej liczbie wymiarów (2D, 3D, itd.) do jednego wymiaru wyżej, skalując oryginalne wymiary według wagi punktu kontrolnego, a następnie przypisując tę wagę jako wartość dla wymiaru rozszerzonego.

Na przykład punkt 2D `(x,y)` o wadze `w` staje się punktem 3D `(w * x, w * y, w)`.

Następnie uruchamiamy ten sam algorytm, co poprzednio, który oprócz zwykłej interpolacji współrzędnych automatycznie wykona interpolację wagową, ponieważ wszystko, co zrobiliśmy, to udawanie, że mamy współrzędne w wyższym wymiarze. Algorytm tak naprawdę nie dba o to, ile wymiarów potrzebuje do interpolacji.

Aby odzyskać nasz "rzeczywisty” punkt krzywej, bierzemy końcowy wynik algorytmu generowania punktów i "odważamy” go: bierzemy pochodną wagę `w'` końcowego punktu i dzielimy przez nią wszystkie regularne wymiary współrzędnych, by następnie wyrzucić informacje o wadze.

Bazując na naszym poprzednim przykładzie, bierzemy końcowy punkt 3D `(x', y', w')`, który następnie zamieniamy z powrotem w punkt 2D, obliczając `(x'/w', y'/w') `. I to wszystko, skończyliśmy!
