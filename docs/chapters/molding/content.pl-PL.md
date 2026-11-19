# Formowanie krzywej

Uzbrojeni w wiedzę na temat relacji "ABC”, rzutowania punkt na krzywej i gościnnych wartości pomocniczych dla konstrukcji krzywej sześciennej, możemy w końcu zająć się formowaniem krzywej: interaktywną aktualizacją kształtu krzywej, przeciągając punkty na krzywej.

W przypadku krzywej kwadratowej jest to naprawdę prosta sztuczka: rzutujemy kursor na krzywą, co daje nam wartość "t” i początkową współrzędną "B”. Nie potrzebujemy nawet tego drugiego: z naszą wartością `t` i "gdziekolwiek jest kursor" jako celem `B`, możemy obliczyć powiązane `C`:

\[
  C = u(t)_{q} \cdot \textit{Start} + \left ( 1-u(t)_{q} \right ) \cdot \textit{End}
\]

A następnie powiązane `A`:

\[
  A = B - \frac{C - B}{\textit{ratio}(t)_{q}} = B + \frac{B - C}{\textit{ratio}(t)_{q}}
\]

I skończyliśmy, bo to nasz nowy kwadratowy punkt kontrolny!

<graphics-element title="Molding a quadratic Bézier curve" width="825" src="./molding.js" data-type="quadratic"></graphics-element>

Tak jak poprzednio, krzywe sześcienne wymagają nieco więcej pracy, ponieważ o ile łatwo jest znaleźć naszą początkową wartość `t` i wartości ABC, uzyskanie tych wszystkich ważnych współrzędnych `e1` i `e2` 
będzie stanowiło pewien problem... w części dotyczącej tworzenia krzywych mogliśmy sami wybrać odpowiednią wartość `t`, co pozwoliło nam znaleźć odpowiednie współrzędne `e1` i `e2`. To świetnie, ale kiedy formujemy krzywą, nie mamy tego luksusu: jakikolwiek punkt, w którym zdecydujemy się zacząć się poruszać, ma już swoją własną wartość `t` oraz własne wartości `e1` i `e2`, a te mogą nie ma sensu dla reszty krzywej.

Na przykład zobaczmy, co się stanie, jeśli po prostu "pójdziemy za tym, co otrzymamy”, gdy wybierzemy punkt i zaczniemy go przesuwać, zachowując jego wartość `t` i współrzędne `e1/e2`:

<graphics-element title="Formowanie sześciennej krzywej Béziera" width="825" src="./molding.js" data-type="cubic"></graphics-element>

Wygląda to rozsądnie, blisko pierwotnego punktu, ale im dalej przeciągamy nasz punkt, tym mniej "użyteczne” stają się rzeczy. Zwłaszcza jeśli przeciągniemy nasz punkt przez linię bazową, zamiast zamieniać się w ładną krzywą.

Jednym ze sposobów walki z tym może być połączenie powyższego podejścia z podejściem z sekcji [tworzenie krzywych](#pointcurves): wygenerowanie zarówno niezmienionej krzywej `t/e1/e2`, jak i "wyidealizowanej” krzywej przechodzącej przez punkty początkowe/kursor/końcowe, z wyidealizowaną wartością `t`, a następnie interpolując między tymi dwiema krzywymi:

<graphics-element title="Formowanie sześciennej krzywej Béziera" width="825" src="./molding.js" data-type="cubic" data-interpolated="true">
  <input type="range" min="10" max="200" step="1" value="100" class="slide-control">
</graphics-element>

Suwak kontroluje "odległość opadania” w stosunku do pierwotnego punktu na krzywej, więc gdy przeciągamy nasz punkt dookoła, interpoluje on z odchyleniem w kierunku "zachowania `t/e1/e2`” bliżej pierwotny punkt i odchylenie w kierunku "wyidealizowanego” tworzą się, im dalej odsuwamy nasz punkt, przy czym wszystko, co jest dalej niż nasza odległość zaniku, po prostu _jest_ wyidealizowaną krzywą. W tym momencie nawet nie próbujemy interpolować.

Bardziej zaawansowanym sposobem wygładzenia rzeczy jest zaimplementowanie _ciągłego_ formowania, w którym stale aktualizujemy krzywą, gdy się poruszamy, i stale zmieniamy, jaki jest nasz punkt `B`, w oparciu o ciągłe rzutowanie kursora na krzywą _jak ją aktualizujemy_ - nie będziesz zaskoczony, gdy dowiesz się, że jest to trudne i wykracza poza zakres tej sekcji: interpolacja (z rozsądną odległością) na razie wystarczy!
