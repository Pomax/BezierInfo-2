# Forma kanoniczna (dla krzywych sześciennych)

Podczas gdy krzywe kwadratowe są stosunkowo prostymi do analizy krzywymi, nie można tego samego powiedzieć o krzywej sześciennej. Ponieważ krzywizna jest kontrolowana przez więcej niż jeden punkt kontrolny, wykazuje ona wszelkiego rodzaju cechy, takie jak pętle, wierzchołki, nieparzyste cechy współliniowe i aż dwa punkty przegięcia, ponieważ krzywizna może zmienić kierunek nawet trzykrotnie. Teraz, wiedząc, z jakim rodzajem krzywej mamy do czynienia, niektóre algorytmy mogą być uruchamiane wydajniej, niż gdybyśmy musieli je zaimplementować jako 
ogólnie rozwiązujące, więc czy istnieje sposób na określenie typu krzywej bez dużego nakładu pracy?

Tak się składa, że odpowiedź brzmi "tak”, a rozwiązanie, któremu się przyjrzymy, przedstawili Maureen C. Stone z Xerox PARC i Tony D. deRose z University of Washington we wspólnym artykule
["A Geometric Characterization of Parametric Cubic curves"](https://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf). 
Został opublikowany w 1989 roku i definiuje krzywe jako mające postać "kanoniczną” 
(tj. postać, do której można zredukować wszystkie krzywe), na podstawie której możemy od razu powiedzieć, jakie cechy będzie miała krzywa. Jak to działa?

Pierwszą obserwacją, która sprawia, że wszystko działa, jest to, że jeśli mamy krzywą sześcienną z czterema punktami, możemy zastosować transformację liniową do tych punktów, tak aby trzy punkty kończyły się na (0,0), (0,1) i ( 1,1), 
przy czym ostatni punkt jest "gdziekolwiek”. Po zastosowaniu tej transformacji położenie tego ostatniego punktu może nam powiedzieć, z jakim rodzajem krzywej mamy do czynienia. W szczególności widzimy następujący podział:

<graphics-element title="Mapa kanonicznej krzywej" width="400" height="400" src="./canonical.js"></graphics-element>

To dość zabawny obraz, więc zobaczmy, co oznaczają poszczególne jego części...

Widzimy trzy stałe punkty w (0,0), (0,1) i (1,1). Różne regiony i granice wskazują, jakie właściwości będzie miała pierwotna krzywa, jeśli czwarty punkt znajduje się w/na tym regionie lub granicy. W szczególności, jeśli czwartym punktem jest...

1. ...gdziekolwiek wewnątrz czerwonej strefy, ale nie na jej granicach, krzywa przecina się sama ze sobą (tworząc pętlę). Nie będziemy wiedzieć *gdzie* się przecina (pod względem wartości *t*), ale mamy gwarancję, że tak.

2. ...na lewej (czerwonej) krawędzi czerwonej strefy krzywa będzie miała wierzchołek. Znowu nie wiemy _gdzie_, ale wiemy, że jest. Ta krawędź jest opisana funkcją:

  \[
    y = \frac{-x^2 + 2x + 3}{4}, \{ x \leq 1 \}
  \]

3. ...na prawie okrągłej, dolnej prawej (różowej) krawędzi punkt końcowy krzywej dotyka krzywej, tworząc pętlę. Ta krawędź jest opisana funkcją:

  \[
    y = \frac{\sqrt{3(4x - x^2)} - x}{2}, \{ 0 \leq x \leq 1 \}
  \]

4. ... na górnej (niebieskiej) krawędzi punkt początkowy krzywej dotyka krzywej, tworząc pętlę. Ta krawędź jest opisana funkcją:

  \[
    y = \frac{-x^2 + 3x}{3}, \{ x \leq 0 \}
  \]

5. ...wewnątrz dolnej (zielonej) strefy, za `y=1`, krzywa będzie miała pojedyncze przegięcie (jednorazowe przełączenie wklęsłego/wypukłego).


6. ...pomiędzy lewą i dolną granicą (poniżej linii wierzchołka, ale powyżej linii pojedynczego załamania), krzywa będzie miała dwa przegięcia (przejście z wklęsłej do wypukłej, a następnie z powrotem, lub z wypukłej do wklęsłej, a następnie z powrotem).

7. ...gdziekolwiek na prawo od strefy samoprzecięcia, krzywa nie będzie miała przegięć. To będzie zwykły łuk.

Oczywiście ta mapa jest dość mała, ale regiony rozciągają się w nieskończoność, z dobrze określonymi granicami.

<div class="note">

### Czekaj, skąd się biorą te linie?

Bez powtarzania artykułu wspomnianego na początku tej sekcji, granice pętli pochodzą z przepisania krzywej do postaci kanonicznej, a następnie rozwiązania wzorów określających, które ograniczenia muszą być spełnione dla możliwych właściwości krzywej. 
W artykule funkcje te dają wzory na to, gdzie znajdziesz punkty wierzchołkowe lub pętle, w których wiemy, że t=0 lub t=1, ale funkcje te są wyprowadzane dla pełnego wyrażenia sześciennego, co oznacza, że mają zastosowanie do t=-∞ do t=∞.... 
W przypadku krzywych Béziera interesuje nas tylko "obcięty przedział" od t=0 do t=1, więc niektóre właściwości, które mają zastosowanie, gdy patrzysz na krzywą w nieskończonym przedziale, po prostu nie mają zastosowania do przedziału krzywej Béziera.

Prawa granica obszaru pętli, wskazująca miejsce, w którym krzywa zmienia się z "przegięcia” na "pętlę”, dla ogólnej krzywej sześciennej jest w rzeczywistości odzwierciedlona na x = 1, ale w przypadku krzywych Béziera ta prawa połowa nie ma zastosowania, więc nie musimy zwracać na to uwagi. Podobnie, granice dla pętli t=0 i t=1 są również ładnymi, czystymi krzywymi, ale zostają "odcięte”, gdy patrzymy tylko na to, co robi ogólna krzywa w przedziale od t=0 do t=1.

Aby uzyskać szczegółowe informacje, przejdź do artykułu i przeczytaj sekcje 3 i 4. Jeśli nadal pamiętasz swoje wstępne obliczenia z liceum, prawdopodobnie możesz śledzić ten artykuł, chociaż być może będziesz musiał przeczytać go kilka razy, zanim wszystkie bity "zaklikną”.

</div>

Teraz pojawia się pytanie: jak manipulować naszą krzywą, aby pasowała do tej formy kanonicznej, z trzema stałymi punktami i jednym "swobodnym” punktem? Wprowadź algebrę liniową. Nie martw się, wykonam za ciebie całą matematykę, a także pokażę, jaki jest wpływ na nasze krzywe, ale w zasadzie będziemy używać raczej algebry liniowej niż rachunku różniczkowego, ponieważ "jest o wiele łatwiejsza”. Czasami podejście oparte na rachunku różniczkowym jest bardzo trudne do zastosowania, gdy równoważne rozwiązanie geometryczne jest bardzo oczywiste.

Podejście rozpocznie się od krzywej, która nie ma całkowicie współliniowych punktów (musimy więc upewnić się, że wszystkie punkty nie leżą na linii prostej), a następnie zastosujemy trzy operacje graficzne, które prawdopodobnie słyszałeś z: translacji (przesuwania wszystkich punktów o pewną stałą odległość x i y), skalowania (mnożenia wszystkich punktów przez pewien współczynnik skali x i y) oraz ścinania (operacja, która zamienia prostokąty w równoległoboki).

Krok 1: przekształcamy dowolną krzywą o -p1.x i -p1.y, tak aby krzywa zaczynała się w punkcie (0,0). Zastosujemy tutaj interesującą sztuczkę, udając, że nasze współrzędne 2D są trójwymiarowe, przy czym współrzędna *z* po prostu zawsze wynosi 1. Jest to stara sztuczka stosowana w grafice, która ma na celu przezwyciężenie ograniczeń transformacji 2D: bez niej możemy tylko zamienić współrzędne (x,y) na nowe współrzędne postaci (ax + by, cx + dy), co oznacza, że nie możemy wykonać translacji, ponieważ wymaga to, abyśmy skończyli z jakimś rodzajem (x + a, y + b). Jeśli dodamy fałszywą współrzędną *z*, która zawsze wynosi 1, możemy nagle dodać dowolne wartości. Na przykład:

\[
\left [ \begin{array}{ccc}
    1 & 0 & a \\
    0 & 1 & b \\
    0 & 0 & 1
  \end{array} \right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    z=1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    1 \cdot x + 0 \cdot y + a \cdot z \\
    0 \cdot x + 1 \cdot y + b \cdot z \\
    0 \cdot x + 0 \cdot y + 1 \cdot z
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + a \cdot 1 \\
    y + b \cdot 1 \\
    1 \cdot z
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + a \\
    y + b \\
    z=1
  \end{matrix}
\right ]
\]

Słodko! `z` pozostaje równe 1, więc możemy go całkowicie zignorować, ale dodaliśmy kilka zwykłych wartości do naszych współrzędnych x i y. Tak więc, jeśli chcemy odjąć p1.x i p1.y, używamy:

\[
T_1 =
\left [ \begin{array}{ccc}
    1 & 0 & -{P_1}_x \\
    0 & 1 & -{P_1}_y \\
    0 & 0 & 1
  \end{array} \right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    1 \cdot x + 0 \cdot y - {P_1}_x \cdot 1 \\
    0 \cdot x + 1 \cdot y - {P_1}_y \cdot 1 \\
    0 \cdot x + 0 \cdot y + 1 \cdot 1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x - {P_1}_x \\
    y - {P_1}_y \\
    1
  \end{matrix}
\right ]
\]

Przepuszczenie wszystkich naszych współrzędnych przez to przekształcenie daje nowy zestaw współrzędnych, nazwijmy je **U**, gdzie pierwsza współrzędna leży na (0,0), a reszta jest nadal nieco wolna. Naszym następnym zadaniem jest upewnienie się, że punkt 2 leży na linii *x=0*, więc potrzebujemy macierzy transformacji, która po uruchomieniu odejmuje *x* od tego, co mamy obecnie. Nazywa się to [ścinaniem](https://en.wikipedia.org/wiki/Shear_matrix), a typowa macierz ścinania x i jej transformacja wygląda następująco:

\[
\left [
  \begin{matrix}
    1 & S & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + S \cdot y \\
    y \\
    1
  \end{matrix}
\right ]
\]

Potrzebujemy więc pewnej wartości ścinania, która po pomnożeniu przez *y* daje *-x*, więc nasza współrzędna x wynosi zero. 
Ta wartość to po prostu *-x/y*, ponieważ -x/y \* y = -x. Gotowe:

\[
T_2 =
\left [
  \begin{matrix}
    1 & -\frac{ {U_2}_x }{ {U_2}_y } & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]

Uruchomienie tego dla wszystkich naszych punktów generuje nowy zestaw współrzędnych, nazwijmy je **V**, które mają teraz punkt 1 na (0,0) i punkt 2 na (0, pewna-wartość), i chcieliśmy to na (0,1), 
więc musimy [zrobić trochę skalowania](https://en.wikipedia.org/wiki/Scaling_%28geometry%29), aby upewnić się, że kończy się na (0,1). 
Dodatkowo chcemy, aby punkt 3 kończył się na (1,1), więc możemy również przeskalować x, 
aby upewnić się, że jego współrzędna x będzie wynosić 1 po przeprowadzeniu transformacji. 
Oznacza to, że będziemy skalować x o 1/punkt3<sub>x</sub> i skalować y o punkt2<sub>y</sub>. To jest naprawdę łatwe:

\[
T_3 =
\left [
  \begin{matrix}
    \frac{1}{ {V_3}_x } & 0 & 0 \\
    0 & \frac{1}{ {V_2}_y } & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]

Następnie ostatecznie generuje to nowy zestaw współrzędnych, nazwijmy te W, z których punkt 1 leży na (0,0), punkt 2 leży na (0,1), a punkt trzeci leży na (1, ... ), więc pozostaje tylko upewnić się, że punkt 3 kończy się na (1,1) - ale nie możemy skalować! Punkt 2 jest już we właściwym miejscu, a skalowanie y ponownie przesunęłoby go z punktu (0,1), więc naszą jedyną opcją jest ścinanie y punktu trzeciego, tak jak wcześniej przecinaliśmy punkt 2. W tym przypadku robimy tę samą sztuczkę, ale z `y/x` zamiast `x/y`, ponieważ nie ścinamy x, ale ścinamy y. Dodatkowo, tak naprawdę nie chcemy skończyć na zero (co zrobiliśmy wcześniej), więc musimy ścinać w kierunku przesunięcia, w tym przypadku 1:

\[
T_4 =
\left [
  \begin{matrix}
    1 & 0 & 0 \\
    \frac{1 - {W_3}_y}{ {W_3}_x } & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]

I to generuje nasz ostateczny zestaw czterech współrzędnych. Spośród nich wiemy już, że punkty od 1 do 3 to (0,0), (0,1) i (1,1), a tylko ostatnia współrzędna jest "swobodna”. Faktycznie, biorąc pod uwagę dowolne cztery współrzędne początkowe, wynikowa współrzędna "odwzorowana na transformację” będzie miała postać:

\[
\textit{mapped}_4 = \left (
  \begin{matrix}
  x \\
  y
  \end{matrix}
\right ) = \left (
  \begin{matrix}
    \frac
    {
      -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2}
    }
    {
      -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
    }
\\
    \frac{(-y_1+y_4)}{-y_1+y_2}
    +
    \frac
    {
      \left ( 1 - \frac{-y_1+y_3}{-y_1+y_2} \right )
      \left ( -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2} \right )
    }
    {
      -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
    }
  \end{matrix}
\right )
\]

No dobrze, wygląda to po prostu śmiesznie, ale: zauważ, że każda wartość współrzędnej jest przesunięta o początkową translację, a także zauważ, że _dużo_ wyrazów w tym wyrażeniu jest powtórzonych. Nawet jeśli matematyka wygląda szalenie jako pojedyncze wyrażenie, możemy po prostu trochę to rozłożyć i otrzymać łatwy do obliczenia fragment kodu!

Najpierw zróbmy ten krok translacji jako operację "przetwarzania wstępnego”, abyśmy nie musieli cały czas odejmować wartości. Co to pozostawia?

\[
... = \left (
  \begin{matrix}
   x_4 - \frac{x_2 \cdot y_4}{y_2} / x_3-\frac{x_2 \cdot y_3}{y_2}
\\
\\
    \frac{y_4}{y_2}
    +
    \left ( 1 - \frac{y_3}{y_2} \right )
    \cdot
    \left (  x_4 - \frac{x_2 \cdot y_4}{y_2} / x_3-\frac{x_2 \cdot y_3}{y_2} \right )
  \end{matrix}
\right ) = \left (
  \begin{matrix}
   x_{43}
\\
\\
    \frac{y_4}{y_2}
    +
    x_{43}
    \left ( 1 - \frac{y_3}{y_2} \right )
  \end{matrix}
\right ),\textit{ where } x_{43} = \left (
  x_4 - \frac{x_2 \cdot y_4}{y_2} \middle / x_3-\frac{x_2 \cdot y_3}{y_2}
\right )
\]

Nagle wszystko wygląda o wiele prościej: zmapowany x jest dość prosty do obliczenia i widzimy, że zmapowany y faktycznie zawiera zmapowany x w całości, więc będziemy mieć tę część już dostępną, kiedy będziemy musieli ją oszacować. Faktycznie wyciągnijmy wszystkie te wspólne czynniki, aby zobaczyć, jakie to proste:

\[
... = \left (
  \begin{matrix}
   x_{43}
\\
\\
    y_{42}
    +
    x_{43}
    \left ( 1 - y_{32} \right )
  \end{matrix}
\right ), \textit{ where } x_{43} = \left (
  \frac{x_4 - x_2 \cdot y_{42}}{x_3 - x_2 \cdot y_{32}}
\right ), \textit{ } y_{42} = \frac{y_4}{y_2}, \textit{ and } y_{32} = \frac{y_3}{y_2}
\]

To bardzo proste do napisania w kodzie, myślę, że się zgodzisz. Kodowanie matematyki wydaje się być łatwiejsze niż wzory na pierwszy rzut oka!

<div class="note">

### Jak to wszystko śledzić?

Matematyka może być uciążliwa, więc kiedy tylko jest to możliwe, lubię zmuszać komputery do pracy za mnie. Specjalnie do takich rzeczy używam po prostu [Mathematica](https://www.wolfram.com/mathematica/). Ręczne śledzenie całej tej matematyki jest szalone, a my wymyśliliśmy komputery, dosłownie, aby robiły to za nas. Nie mam powodu, aby używać długopisu i papieru, kiedy mogę napisać, co chcę zrobić w programie i niech program zrobi to za mnie. I prawdziwa matematyka też, z symbolami, a nie z liczbami. Faktycznie [tutaj](https://pomax.github.io/gh-weblog-2/downloads/canonical-curve.nb) zeszyt Mathematica, jeśli chcesz zobaczyć, jak to działa.

Wiem, że myślisz "ale Mathematica jest super droga!” i to prawda, kosztuje [344 USD do użytku domowego, w porównaniu z 295 USD, kiedy to pisałem](https://www.wolfram.com/mathematica-home-edition/), ale jest **również** [bezpłatna, gdy kupisz Raspberry Pi za 35 USD](https://www.wolfram.com/raspberry-pi/). Oczywiście kupiłem raspberry pi i zachęcam do tego samego. Dzięki temu, o ile wiesz, co chcesz *zrobić*, Mathematica może to zrobić za Ciebie. I nie musimy być geniuszami, aby zrozumieć, jak wygląda matematyka. Od tego mamy komputery.

</div>

Napiszmy więc szkic, który pokaże nam postać kanoniczną dowolnej krzywej narysowanej na niebiesko, nałożonej na naszą mapę kanoniczną, abyśmy mogli od razu określić, jakie cechy musi mieć nasza krzywa, w oparciu o położenie czwartej współrzędnej Mapa:

<graphics-element title="Sześcienna krzywa mapowana do formy kanonicznej" width="800" height="400" src="./interactive.js"></graphics-element>
