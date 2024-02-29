# Uproszczone rysowanie

Możemy również uprościć proces rysowania, "próbkując” krzywą w określonych punktach, a następnie łącząc te punkty liniami prostymi, proces znany jest jako "spłaszczanie”, ponieważ redukujemy krzywą do prostej sekwencji prostych, "płaskich" linii.

Możemy to zrobić, mówiąc "chcemy X segmentów”, a następnie próbkując krzywą w odstępach, które są rozmieszczone w taki sposób, że kończymy z liczbą segmentów, które chcieliśmy. Zaletą tej metody jest to, że jest szybka: zamiast liczyć 100 lub nawet 1000 współrzędnych krzywej, możemy pobrać próbkę znacznie mniejszej liczby i nadal otrzymać krzywą, która w pewnym sensie wygląda wystarczająco dobrze. Wadą jest oczywiście to, że tracimy precyzję pracy z "prawdziwą krzywą”, więc zwykle nie możemy użyć spłaszczenia do wykrywania prawdziwego przecięcia lub wyrównania krzywizny.

<div class="figure">
<graphics-element title="Spłaszczanie krzywej kwadratowej" src="./flatten.js" data-type="quadratic">
  <input type="range" min="1" max="16" step="1" value="4" class="slide-control">
</graphics-element>
<graphics-element title="Spłaszczanie krzywej sześciennej" src="./flatten.js" data-type="cubic">
  <input type="range" min="1" max="24" step="1" value="8" class="slide-control">
</graphics-element>
</div>

Spróbuj kliknąć szkic i użyć klawiszy strzałek w górę i w dół, aby zmniejszyć liczbę segmentów krzywej kwadratowej i sześciennej. Zauważysz, że w przypadku niektórych krzywizn mała liczba segmentów działa całkiem dobrze, ale w przypadku bardziej złożonych krzywizn (wypróbuj to dla krzywej sześciennej) wymagana jest większa liczba, aby prawidłowo uchwycić zmiany krzywizny.

<div class="howtocode">

### Jak zaimplementować spłaszczanie krzywej

Po prostu użyjmy algorytmu, który właśnie określiliśmy i zaimplementujmy go:

```
function flattenCurve(curve, segmentCount):
  step = 1/segmentCount;
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for(i=1; i <= segmentCount; i++):
    t = i*step;
    coordinates.push[curve.getXValue(t), curve.getYValue(t)]
  return coordinates;
```

I gotowe, algorytm zaimplementowany. To po prostu pozostawia narysowanie wynikowej "krzywej” jako sekwencji odcinków:

```
function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  coord = coordinates[0], _coord;
  for(i=1; i < coordinates.length; i++):
    _coord = coordinates[i]
    line(coord, _coord)
    coord = _coord
```

Zaczynamy od pierwszej współrzędnej jako punktu odniesienia, a następnie po prostu rysujemy linie między każdym punktem a jego następnym punktem.

</div>
