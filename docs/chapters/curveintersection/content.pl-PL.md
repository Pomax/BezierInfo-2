# Przecięcie krzywej/krzywej

Korzystając z algorytmu de Casteljau do podziału krzywej, możemy teraz zaimplementować znajdowanie przecięcia krzywej/krzywej przy użyciu techniki "dziel i zwyciężaj”:

1. Weź dwie krzywe *C<sub>1</sub>* i *C<sub>2</sub>*, i potraktuj je jako parę.
2. Jeśli ich ramki ograniczające zachodzą na siebie, podziel każdą krzywą na dwie krzywe podrzędne
3. Z *C<sub>1.1</sub>*, *C<sub>1.2</sub>*, *C<sub>2.1</sub>* and *C<sub>2.2</sub>*, utwórz cztery nowe pary (*C<sub>1.1</sub>*,*C<sub>2.1</sub>*), (*C<sub>1.1</sub>*, *C<sub>2.2</sub>*), (*C<sub>1.2</sub>*,*C<sub>2.1</sub>*), i (*C<sub>1.2</sub>*,*C<sub>2.2</sub>*).
4. Dla każdej pary sprawdź, czy ich ramki ograniczające zachodzą na siebie.
  1. Jeśli ich ramki ograniczające nie zachodzą na siebie, odrzuć parę, ponieważ nie ma przecięcia między tą parą krzywych.
  2. Jeśli <em>się nakładają</em>, wykonaj ponownie wszystkie kroki dla tej pary.
5. Kiedy tworzone przez nas krzywe podrzędne są tak małe, że efektywnie zajmują obszary 
subpikselowe, rozważamy znalezione przecięcie, zauważając, że możemy mieć klaster wielu 
przecięć na poziomie subpikselowym, z których wybieramy jedno jako "znalezioną” 
wartość `t` (możemy albo wyrzucić wszystkie oprócz jednej, możemy 
uśrednić wartości `t` klastra, albo możesz zrobić coś jeszcze bardziej kreatywnego).

Algorytm ten rozpocznie się od pojedynczej pary, "rozdyma się”, aż będzie działał równolegle dla dużej liczby potencjalnych par podrzędnych, a następnie zwęża się w dół, gdy dociera do współrzędnych przecięcia, kończąc na tylu parach, ile jest przecięć.

Poniższa grafika stosuje ten algorytm do pary krzywych sześciennych, krok po kroku, dzięki czemu można zobaczyć algorytm w działaniu. Kliknij przycisk, aby uruchomić pojedynczy krok w algorytmie, po ustawieniu krzywych w jakimś kreatywnym układzie. Można również zmienić wartość używaną w kroku 5 w celu określenia, czy krzywe są wystarczająco małe. Manipulowanie krzywymi lub zmiana progu spowoduje zresetowanie algorytmu, więc możesz wypróbować to z wieloma różnymi krzywymi.

(czy potrafisz znaleźć konfigurację, która daje maksymalną liczbę przecięć między dwiema krzywymi sześciennymi? Dziewięć przecięć!)

<graphics-element title="Krzywe/przecięcia krzywych" width="825" src="./curve-curve.js">
  <button class="next">Advance one step</button>
  <input type="range" min="0.01" max="5" step="0.01" value="1" class="slide-control">
</graphics-element>

Znajdowanie samoprzecięć jest właściwie tą samą procedurą, z tą różnicą, że zaczynamy od pojedynczej krzywej, więc musimy najpierw przekształcić ją w dwie oddzielne krzywe. Osiąga się to w prosty sposób, dzieląc w punkcie przegięcia lub, jeśli go nie ma, po prostu dzieląc najpierw przy `t=0.5`, a następnie uruchamiając dokładnie ten sam algorytm, co powyżej, przy czym wszystkie nienakładające się pary krzywych są usuwane przy każdej iteracji, a każdy kolejny krok naprowadza się na punkty samoprzecięcia krzywej.

