# Ramki ograniczające

Jeśli mamy punkty ekstremalne i punkty początkowe/końcowe, prosta pętla for, która sprawdza wartości min/max dla x i y, oznacza, że mamy cztery wartości, które musimy umieścić w naszej krzywej:

*Obliczanie ramki ograniczającej dla krzywej Béziera*:

1. Znajdź wszystkie wartości *t* pierwiastków x i y pochodnej krzywej.
2. Odrzuć wszystkie wartości *t*, które są mniejsze niż 0 lub większe niż 1, ponieważ krzywe Béziera wykorzystują tylko przedział [0,1].
3. Wyznacz najniższą i najwyższą wartość podstawiając wartości *t=0*, *t=1* i każdy ze znalezionych pierwiastków do pierwotnych funkcji: najniższa wartość to dolna granica, a najwyższa to górna granica dla ramki ograniczającej, którą chcemy skonstruować.

Stosując to podejście do naszego poprzedniego ustalenia głównego, otrzymujemy następujące [ramki ograniczające wyrównane do osi](https://en.wikipedia.org/wiki/Bounding_volume#Common_types) (ze wszystkimi punktami końcowymi krzywej pokazanymi na krzywej):

<div class="figure">
<graphics-element title="Ramka ograniczająca kwadratową krzywą Béziera" src="./bbox.js" data-type="quadratic"></graphics-element>
<graphics-element title="Ramka ograniczająca sześcienną krzywą Béziera" src="./bbox.js" data-type="cubic"></graphics-element>
</div>

Możemy zbudować jeszcze ładniejsze ramki, wyrównując je wzdłuż naszej krzywej, a nie wzdłuż osi x i y, ale aby to zrobić, musimy najpierw przyjrzeć się, jak działa wyrównywanie.
