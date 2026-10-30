# Przybliżanie krzywych Béziera łukami kołowymi

Przyjrzyjmy się działaniu dokładnie odwrotnemu niż w poprzedniej sekcji: zamiast przybliżać łuk kołowy za pomocą krzywych Béziera, przybliżamy krzywe Béziera za pomocą łuków kołowych.

Widzieliśmy już w sekcji dotyczącej aproksymacji okręgu, że to nigdy nie da idealnego odpowiednika, ale czasami potrzebne są łuki kołowe, na przykład podczas pracy z maszynami produkcyjnymi lub prostymi językami wektorowymi, które rozumieją linie i okręgi, ale niewiele więcej.

Podejście jest dość proste: wybierz punkt początkowy na krzywej i wybierz dwa punkty, które znajdują się dalej wzdłuż krzywej. Określ okrąg przechodzący przez te trzy punkty i sprawdź, czy pasuje on do części krzywej, którą próbujemy przybliżyć. Przyzwoite dopasowanie? Spróbuj rozstawić punkty dalej od siebie. Złe dopasowanie? Spróbuj rozmieścić punkty bliżej siebie. Postępuj tak, aż znajdziesz granicę "dobrego przybliżenia / złego przybliżenia", zapisz "dobry" łuk, a następnie przesuń punkt początkowy w górę, aby pokrył się z punktem końcowym, który wcześniej znaleźliśmy. Powtarzaj tę czynność, aż pokryjesz całą krzywą.

Widzieliśmy już, jak dopasować okrąg do trzech punktów w sekcji [tworzenie krzywej z trzech punktów](#pointcurves), a znalezienie łuku przechodzącego przez te punkty jest proste: wybierz jeden z trzech punktów jako punkt początkowy, wybierz inny jako punkt końcowy, a łuk musi koniecznie przejść od punktu początkowego do punktu końcowego przez pozostały punkt.

Jak więc możemy przekształcić krzywą Béziera w (sekwencję) łuków kołowych?

- Zacznij z `t=0`
- Wybierz dwa punkty dalej w dół krzywej o pewnej wartości `m = t + n` i `e = t + 2n`.
- Znajdź łuk, który definiują te punkty
- Określ, jak blisko krzywej znajduje się znaleziony łuk:
  - Wybierz dwa dodatkowe punkty `e1 = t + n/2` i `e2 = t + n + n/2`.
  - Punkty te, jeśli łuk jest dobrym przybliżeniem wybranego przedziału krzywej, powinny
      leżeć `na` okręgu, więc ich odległość od środka okręgu powinna być
      taka sama jak odległość od dowolnego z trzech pozostałych punktów do środka.
  - W przypadku punktów, określ błąd (bezwzględny) między promieniem okręgu a
    "rzeczywistą" odległością od środka okręgu do punktu na krzywej.   
  - Jeśli ten błąd jest zbyt wysoki, uznajemy łuk za zły i próbujemy zastosować mniejszy interwał.

Wynik tego jest pokazany na następnej grafice: zaczynamy od gwarantowanego niepowodzenia: s=0, e=1. To jest cała krzywa. Punkt środkowy znajduje się po prostu przy `t=0,5`, 
a następnie zaczynamy wykonywać [wyszukiwanie binarne](https://en.wikipedia.org/wiki/Binary_search_algorithm).

1. Zaczynamy od `low=0`, `mid=0.5` i `high=1`
2. To się nie powiedzie, więc spróbujemy ponownie z interwałem zmniejszonym o połowę: `{0, 0.25, 0.5}`
  - Jeśli łuk jest dobry, cofamy się o połowę odległości: `{0, 0.375, 0.75}`.
  - Jeśli jednak łuk nadal był zły, przesuwamy się _w dół_ o połowę odległości: `{0, 0.125, 0.25}`.
3. Robimy to w kółko, aż uzyskamy dwa łuki, z których pierwszy jest dobry, a drugi zły. Gdy znajdziemy taką parę, oznacza to, że znaleźliśmy granicę między dobrym a złym przybliżeniem i wybieramy dobry łuk.

Poniższa grafika pokazuje wynik tego podejścia, z domyślnym progiem błędu wynoszącym 0,5, co oznacza, że jeśli łuk jest odchylony o <em>łącznie</em> pół piksela w obu punktach weryfikacji, to traktujemy go jako zły. Jest to niezwykle prosta polityka błędów, ale działa naprawdę dobrze. Zwróć uwagę, że grafika jest nadal interaktywna i możesz użyć klawiszy strzałek w górę i w dół, aby zwiększyć lub zmniejszyć próg błędu, aby zobaczyć, jaki jest efekt mniejszego lub większego progu błędu.

<graphics-element title="Przybliżenie pierwszego łuku krzywej Béziera" src="./arc.js">
  <input type="range" min="0.1" max="5" step="0.1" value="0.5" class="slide-control">
</graphics-element>

Mając to na uwadze, wszystko, co teraz pozostało, to "ponowne uruchomienie” procedury, traktując znaleziony punkt końcowy łuku jako nowy punkt początkowy łuku, który ma zostać określony, i używając punktów znajdujących się dalej na krzywej. Próbujemy tego, aż znaleziony punkt końcowy będzie wynosił <em>t=1</em>, w którym to momencie skończymy. Ponownie, poniższa grafika pozwala na wprowadzanie klawiszy strzałek w górę i w dół w celu zwiększenia lub zmniejszenia progu błędu, dzięki czemu można zobaczyć, jak wybranie innego progu zmienia liczbę łuków niezbędnych do rozsądnego przybliżenia krzywej:

<graphics-element title="Przybliżenie łukiem krzywej Béziera" src="./arcs.js">
  <input type="range" min="0.1" max="5" step="0.1" value="0.5" class="slide-control">
</graphics-element>

Więc... do czego to służy? Oczywiście, jeśli pracujesz z technologiami, które nie potrafią tworzyć krzywych, ale mogą tworzyć linie i okręgi, odpowiedź jest całkiem prosta, ale co jeszcze? Istnieje kilka powodów, dla których możesz potrzebować tej techniki: używanie łuków kołowych oznacza, że możesz łatwo określić czy współrzędna leży "na" twojej krzywej (wystarczy obliczyć odległość do każdego środka łuku kołowego i jeśli którykolwiek z nich znajduje się blisko łuku promienie, pod kątem między początkiem a końcem łuku, bingo, punkt ten można traktować jako leżący "na krzywej”). Kolejną korzyścią jest to, że to przybliżenie jest "liniowe”: można niemal trywialnie podróżować wzdłuż łuków ze stałą prędkością. Możesz także w prosty sposób obliczyć długość łuku przybliżonej krzywej (to trochę jak spłaszczanie krzywej). Jedyną rzeczą, o której należy pamiętać, jest to, że jest to równoważność stratna: rzeczy, które obliczasz na podstawie przybliżenia, są gwarantowane "wyłączone” przez jakąś niewielką wartość, a w zależności od wymaganej precyzji przybliżenie łuku będzie albo super przydatne lub zupełnie bezużyteczne. To Ty decydujesz, które, na podstawie Twojej aplikacji!
