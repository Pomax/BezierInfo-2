# Tworzenie krzywej z trzech punktów

Biorąc pod uwagę poprzednią sekcję, możesz się zastanawiać, czy możemy wykorzystać tę wiedzę do "tworzenia” krzywych, umieszczając kilka punktów i zlecając komputerowi resztę, na co odpowiedź brzmi: dokładnie to możemy teraz zrobić!

W przypadku krzywych kwadratowych wszystko jest całkiem proste. 
Technicznie rzecz biorąc, będziemy potrzebować wartości `t`, aby obliczyć funkcję ilorazu używaną do obliczania współrzędnych ABC, ale równie łatwo możemy ją przybliżyć, traktując odległość między punktem początkowym a punktem `B` i `B` i punkt końcowy jako stosunek, używając

\[
  \left \{ \begin{aligned}
    d_1 &= ||\textit{Start} - B||\\
    d_2 &= ||\textit{End} - B||\\
    t &= \frac{d_1}{d_1+d_2}
  \end{aligned} \right .
\]

Z tym kodem, tworzenie krzywej kwadratowej z trzech punktów jest dosłownie obliczaniem wartości ABC i używaniem `A` jako punktu kontrolnego naszej krzywej:

<graphics-element title="Dopasowanie kwadratowej krzywej Béziera" src="./quadratic.js"></graphics-element>

W przypadku krzywych sześciennych musimy wykonać trochę więcej pracy, ale tak naprawdę tylko trochę. Najpierw założymy, że przyzwoita krzywa przechodząca przez trzy punkty powinna być zbliżona do łuku kołowego, co najpierw wymaga wiedzy, jak dopasować okrąg do trzech punktów. Być może pamiętasz (jeśli kiedykolwiek się tego nauczyłeś!), 
że linia między dwoma punktami na okręgu nazywa się [cięciwą](https://en.wikipedia.org/wiki/Chord_%28geometry%29) 
i że jedna z właściwości cięciw polega na tym, że linia ze środka dowolnej cięciwy, 
prostopadła do tej cięciwy, przechodzi przez środek okręgu.

Oznacza to, że jeśli mamy trzy punkty na okręgu, mamy trzy (różne) cięciwy, a co za tym idzie, trzy (różne) linie, które przechodzą od tych cięciw przez środek koła: jeśli znajdziemy dwie z tych linii, to ich punkt przecięcia będzie środkiem naszego okręgu, a promień okręgu - z definicji! - będzie odległością od środka do dowolnego z naszych trzech punktów:

<graphics-element title="Znajdowanie okręgu na podstawie trzech punktów" src="./circle.js"></graphics-element>

Mając to na uwadze, znamy teraz również linię styczną do naszego punktu `B`, 
ponieważ styczna do dowolnego punktu na okręgu jest linią przechodzącą przez ten punkt, 
prostopadłą do linii biegnącej od tego punktu do środka. 
Pozostaje nam zaznaczenie odpowiednich punktów `e1` i `e2` na tej stycznej, abyśmy mogli
skonstruować nową powłokę krzywej sześciennej. Używamy tego podejścia, tak jak w przypadku krzywych kwadratowych, 
aby automatycznie określić rozsądną wartość `t`, a następnie nasze współrzędne `e1` i `e2` muszą być zgodne ze standardową regułą de Casteljau dla interpolacji liniowej:

\[
  \left \{ \begin{aligned}
    e_1 &= B + t \cdot d\\
    e_2 &= B - (1-t) \cdot d
  \end{aligned} \right .
\]

Gdzie `d` to całkowita długość odcinka linii od `e1` do `e2`. 
Więc jak długo to robimy? Znowu mamy do wyboru różne podejścia, a prostym, ale skutecznym sposobem jest ustawienie długości tego segmentu na "jedną trzecią długości linii bazowej”. Wymusza to, aby `e1` i `e2` zawsze były oddalone od siebie o "krzywą liniową", co oznacza, że jeśli umieścimy nasze trzy punkty na linii, będzie ona faktycznie _wyglądała_ jak linia. 
Ładnie! Ostatnią rzeczą, którą musimy zrobić, to odwrócić znak `d` w zależności od tego, po której stronie linii bazowej znajduje się nasze `B`, aby nie stworzyć funkowej krzywej z pętlą . W tym celu możemy użyć funkcji [atan2](https://en.wikipedia.org/wiki/Atan2):

\[
  \phi = \left ( atan2(E_y-S_y, E_x-S_x) - atan2(B_y-S_y, B_x-S_x) + 2 \pi \right ) \textit{ mod } 2 \pi
\]

Ten kąt φ będzie mieścił się w przedziale od 0 do π, jeśli `B` znajduje się "powyżej” linii bazowej (obracając wszystkie trzy punkty tak, aby początek znajdował się po lewej stronie, a koniec po prawej), więc możemy użyć względnie prostego sprawdzenia do przodu upewnij się, że używamy właściwego znaku dla naszej wartości `d`:

\[
  d = \left \{ \begin{aligned}
     d & \textit{ if } 0 \leq \phi \leq \pi \\
    -d & \textit{ if } \phi < 0 \lor \phi > \pi
  \end{aligned} \right .
\]

Wynik takiego podejścia wygląda następująco:

<graphics-element title="Znajdowanie sześciennych e₁ i e₂ dla danych trzech punktów" src="./circle.js" data-show-curve="true"></graphics-element>

Należy pamiętać, że nawet jeśli używamy łuku kołowego do uzyskania przyzwoitych wyrazów `e1` i `e2`, _nie_ próbujemy idealnie stworzyć łuku kołowego z krzywą sześcienną (co jest dobre, ponieważ nie możemy; [więcej o tym później](#arcapproximation)), _tylko_ próbujemy wymyślić rozsądne punkty `e1` i `e2`, 
abyśmy mogli skonstruować nową krzywą sześcienną... mamy je: zobaczmy, jaki rodzaj sześciennej krzywej daje nam:

<graphics-element title="Dopasowanie sześciennej krzywej Béziera" src="./cubic.js"></graphics-element>

To wygląda na idealnie nadające się do użytku!

Oczywiście możemy pójść o krok dalej: możemy nie tylko "tworzyć" krzywe, ale mamy również (prawie!) wszystkie dostępne narzędzia do "formowania" krzywych, w których możemy zmienić kształt krzywej, przeciągając punkt na krzywej, pozostawiając początek i koniec ustalony, skutecznie formując kształt, jakby to była glina lub coś podobnego. Zobaczymy ostatnie narzędzie potrzebne do tego w następnej sekcji, a następnie przyjrzymy się implementacji formowania krzywych w sekcji następnej, więc czytaj dalej!
