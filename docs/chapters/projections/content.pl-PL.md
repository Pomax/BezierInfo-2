# Rzutowanie punktu na krzywą Béziera

Zanim przejdziemy do rzeczywistego formowania krzywych, dobrze będzie wiedzieć, jak znaleźć "jakiś punkt na krzywej”, w który próbujemy kliknąć. W końcu, jeśli wszystko, co mamy, to nasze współrzędne Béziera, to samo w sobie nie wystarczy, aby dowiedzieć się, który punkt na krzywej będzie najbliżej naszego kursora. Jak więc rzutować punkty na krzywą?

Jeśli krzywa Béziera ma wystarczająco niski rząd, być może uda 
nam się [opracować matematycznie, jak to zrobić](https://web.archive.org/web/20140713004709/http://jazzros.blogspot.com/2011/03/projecting-point-on-bezier-curve.html) 
i odzyskać idealną wartość `t`, ale ogólnie jest to niezwykle trudny problem, 
a najłatwiejszym rozwiązaniem jest ponownie podejście numeryczne. 
Będziemy znajdować naszą idealną wartość `t` za pomocą
[wyszukiwania binarnego](https://en.wikipedia.org/wiki/Binary_search_algorithm). 
Najpierw przeprowadzamy zgrubne sprawdzenie odległości na podstawie wartości `t` powiązanych ze współrzędnymi krzywej "do narysowania” (przy użyciu tabeli przeglądowej lub LUT). To jest całkiem szybko:
```
p = some point to project onto the curve
d = some initially huge value
i = 0
for (coordinate, index) in LUT:
  q = distance(coordinate, p)
  if q < d:
    d = q
    i = index
```

Po tym uruchomieniu wiemy, że `LUT[i]` jest współrzędną na krzywej _w naszej LUT_, która jest najbliższa punktowi, który chcemy rzutować, więc jest to całkiem dobre wstępne przypuszczenie, jakie jest najlepsze odwzorowanie na naszą krzywą . Aby to udoskonalić, zauważamy, że `LUT[i]` jest lepszym zgadywaniem niż zarówno `LUT[i-1]`, jak i `LUT[i+1]`, ale może istnieć jeszcze lepsza projekcja _gdzie indziej_ między tymi dwoma wartości, więc to właśnie będziemy testować, używając odmiany wyszukiwania binarnego.

1. zaczynamy od naszego punktu `p` i wartości `t` `t1=LUT[i-1].t` i `t2=LUT[i+1].t`, które obejmują przedział `v = t2-t1`.
2. testujemy ten przedział w pięciu miejscach: początkowym, środkowym i końcowym (które już mamy) oraz dwóch punktach pomiędzy środkiem a punktem początkowym/końcowym
3. następnie sprawdzamy, który z tych pięciu punktów jest najbliżej naszego pierwotnego punktu `p`, a następnie powtarzamy krok 1 z punktami przed i za najbliższym znalezionym punktem.

To sprawia, że przedział, który sprawdzamy, jest coraz mniejszy w każdej iteracji i możemy wykonywać trzy kroki, aż interwał stanie się tak mały, że doprowadzi do odległości, które są pod każdym względem takie same dla wszystkich punktów.

Zobaczmy więc, jak to działa: w tym przypadku zamierzam arbitralnie powiedzieć, że jeśli zamierzamy uruchomić pętlę, dopóki interwał nie będzie mniejszy niż 0,001, i pokazać, co to oznacza dla rzutowania kursora myszy lub czubka palca na dość złożoną krzywą Béziera (którą oczywiście można dowolnie przekształcać). Pokazane są również oryginalne trzy punkty znalezione przez nasze zgrubne sprawdzenie.

<graphics-element title="Rzutowanie punktu na krzywą Béziera" width="400" height="400" src="./project.js"></graphics-element>
