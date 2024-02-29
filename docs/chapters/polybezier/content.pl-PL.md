# Formowanie krzywych poli-Béziera

Podobnie jak linie można łączyć ze sobą, tworząc wielokąty, krzywe Béziera można łączyć ze sobą, tworząc wielokąty Béziera, a jedyną wymaganą sztuczką jest upewnienie się, że:

1. punkt końcowy każdej sekcji jest punktem początkowym następnej sekcji, oraz
2. pochodne przez ten podwójny punkt są wyrównane.

Chyba że chcesz ostrych rogów, oczywiście. Wtedy nie potrzebujesz nawet 2.

W tej sekcji omówimy trzy formy krzywych poli-Béziera. Najpierw przyjrzymy się rodzajowi, 
który spełnia punkt 1, gdzie punkt końcowy segmentu jest tym samym punktem, co punkt początkowy następnego segmentu. 
Prowadzi to do poli-Béziers, z którymi trudno jest pracować, ale są najłatwiejsze do wdrożenia:

<graphics-element title="Niepołączony kwadratowy poli-Bézier" src="./poly.js" data-type="quadratic" data-link="coordinate"></graphics-element>
<graphics-element title="Niepołączony sześcienny poli-Bézier" src="./poly.js" data-type="cubic" data-link="coordinate"></graphics-element>

Przeciąganie punktów kontrolnych wokół wpływa tylko na segmenty krzywej, do których należy punkt kontrolny, a przesuwanie punktu na krzywej pozostawia punkty kontrolne tam, gdzie się znajdują, co nie jest najbardziej przydatne do praktycznych celów modelowania. Dodajmy więc logikę, której potrzebujemy, aby wszystko było trochę lepsze. Zaczniemy od połączenia punktów kontrolnych, upewniając się, że "przychodząca” pochodna w punkcie na krzywej jest taka sama jak pochodna "wychodząca”:

\[
  B'(1)_n = B'(0)_{n+1}
\]

Możemy to zrobić dość łatwo, ponieważ wiemy, 
że wektor od ostatniego punktu kontrolnego krzywej do jej ostatniego punktu na krzywej jest równy wektorowi pochodnej.
Jeśli chcemy mieć pewność, że pierwszy punkt kontrolny następnej krzywej pasuje do tego, wszystko, co musimy zrobić, to odbić ostatni punkt kontrolny przez ostatni punkt na krzywej. Odbicie lustrzane dowolnego punktu A przez dowolny punkt B jest naprawdę proste:

\[
  \textit{Mirrored} = \left [
    \begin{matrix} B_x + (B_x - A_x) \\  B_y + (B_y - A_y) \end{matrix}
  \right ] = \left [
    \begin{matrix} 2B_x - A_x \\  2B_y - A_y \end{matrix}
  \right ]
\]

Zaimplementujmy to i zobaczmy, co nam to da. Poniższe dwie grafiki pokazują ponownie kwadratową i sześcienną krzywą poli-Béziera, ale tym razem przesuwanie punktów kontrolnych powoduje również przesuwanie innych. Jednak w przypadku krzywych kwadratowych można zauważyć coś nieoczekiwanego...

<graphics-element title="Połączony kwadratowy poli-Bézier" src="./poly.js" data-type="quadratic" data-link="derivative"></graphics-element>
<graphics-element title="Połączony sześcienny poli-Bézier" src="./poly.js" data-type="cubic" data-link="derivative"></graphics-element>

Jak widać, krzywe kwadratowe są szczególnie nieodpowiednie dla krzywych poli-Béziera, ponieważ wszystkie punkty kontrolne są skutecznie połączone. Przesuń jedną z nich, a poruszysz wszystkie. Nie tylko to, ale jeśli przesuniemy punkty na krzywej, możliwe jest uzyskanie sytuacji, w której punkt kontrolny nie może spełnić ograniczenia, że jest odbiciem dwóch sąsiednich punktów kontrolnych... Oznacza to, że nie możemy użyć kwadratowych poli-Béziers do czegoś innego 
niż naprawdę, naprawdę proste kształty. A nawet wtedy prawdopodobnie są złym wyborem. Krzywe sześcienne są całkiem przyzwoite, ale fakt, że pochodne są połączone, oznacza, że nie możemy manipulować krzywymi tak dobrze, jak moglibyśmy, gdybyśmy trochę złagodzili ograniczenia.

Więc: złagodźmy trochę wymagania.

Możemy zmienić ograniczenie, aby nadal zachowywać *kąt* pochodnych w sekcjach (więc przejścia z jednej sekcji do drugiej będą nadal wyglądać naturalnie), ale zrezygnować z wymogu, aby miały one również taką samą *długość wektora*. W ten sposób otrzymamy znacznie bardziej użyteczny rodzaj krzywej poli-Béziera:

<graphics-element title="Kątowo połączony kwadratowy poli-Bézier" src="./poly.js" data-type="quadratic" data-link="direction"></graphics-element>
<graphics-element title="Kątowo połączony sześcienny poli-Bézier" src="./poly.js" data-type="cubic" data-link="direction"></graphics-element>

Krzywe sześcienne zachowują się teraz lepiej, jeśli chodzi o przeciąganie punktów kontrolnych, ale kwadratowy poli-Bézier nadal ma problem, że przesunięcie jednego punktu kontrolnego spowoduje przesunięcie punktów kontrolnych i może zakończyć się zdefiniowaniem "następnego” punktu kontrolnego w sposób, który nie działa. Krzywe kwadratowe naprawdę nie są zbyt przydatne do pracy z ...

Na koniec chcemy również upewnić się, że przesunięcie współrzędnych na krzywej zachowuje względne pozycje powiązanych punktów kontrolnych. Dzięki temu uzyskujemy kontrolę nad krzywą, którą możesz znać z aplikacji takich jak Photoshop, Inkscape, Blender itp.

<graphics-element title="Standardowo połączony kwadratowy poli-Bézier" src="./poly.js" data-type="quadratic" data-link="conventional"></graphics-element>
<graphics-element title="Standardowo połączony sześcienny poli-Bézier" src="./poly.js" data-type="cubic"  data-link="conventional"></graphics-element>

Ponownie widzimy, że krzywe sześcienne są teraz całkiem przyjemne w użyciu, ale krzywe kwadratowe mają nowy, bardzo poważny problem: możemy przesunąć punkt na krzywej w taki sposób, że nie możemy obliczyć, co musi "stać się dalej” ". Przesuń górny punkt w dół, na przykład poniżej lewego i prawego punktu. Nie ma możliwości zachowania prawidłowych punktów kontrolnych bez załamania w dolnym punkcie. Krzywe kwadratowe: po prostu nie tak dobrze ...

Ostatecznym ulepszeniem jest zaoferowanie precyzyjnej kontroli nad tym, które punkty zachowują się w jaki sposób, dzięki czemu można mieć "załamania" lub indywidualnie kontrolowane segmenty, gdy są potrzebne, z ładnie zachowanymi krzywymi dla reszty ścieżki. Wdrożenie tego pozostawiamy jako ćwiczenie dla czytelnika.
