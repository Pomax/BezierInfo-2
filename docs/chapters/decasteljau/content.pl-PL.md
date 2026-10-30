# Algorytm de Casteljau

Jeśli chcemy narysować krzywe Béziera, możemy przejść przez wszystkie wartości `t` od 0 do 1, a następnie obliczyć ważoną funkcję bazową dla każdej wartości, uzyskując wartości `x/y`, które potrzebujemy do wykreślenia. Niestety, im bardziej złożona staje się krzywa, tym droższe staje się to obliczenie. Zamiast tego możemy użyć *algorytmu de Casteljau* do rysowania krzywych. Jest to geometryczne podejście do rysowania krzywych i jest naprawdę łatwe do wdrożenia. Tak łatwe, że można to zrobić ręcznie za pomocą ołówka i linijki.

Zamiast używać naszej funkcji rachunku różniczkowego do znajdowania wartości `x/y` dla `t`, zróbmy to:

- Traktuj `t` jako proporcję (którą jest). t=0 to 0% wzdłuż linii, t=1 to 100% wzdłuż linii.
- Weź wszystkie odcinki między punktami definiującymi krzywą. Dla krzywej rzędu `n` jest to `n` odcinków.
- Umieść znaczniki wzdłuż każdego z tych odcinków, w odległości `t`. Więc jeśli `t` wynosi 0,2, umieść znak na 20% od początku, 80% od końca.
- Teraz utwórz odcinki między "tymi” punktami. Daje to `n-1` odcinków.
- Umieść znaczniki wzdłuż każdego z tych odcinków w odległości `t`.
- Utwórz odcinki między "tymi” punktami. To będzie `n-2` odcinków.
- Umieść znaczniki, utwórz odcinki, umieść znaczniki itp.
- Powtarzaj to, aż pozostanie tylko jeden odcinek. Punkt `t` na tej linii pokrywa się z pierwotnym punktem krzywej w `t`.

Aby zobaczyć to w akcji, przesuń suwak dla następującego szkicu, aby zmienić punkt krzywej, który jest jawnie oszacowany za pomocą algorytmu de Casteljau.

<graphics-element title="Przechodzenie przez krzywą przy użyciu algorytmu de Casteljau" src="./decasteljau.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

<div class="howtocode">

### Jak zaimplementować algorytm de Casteljau

Po prostu użyjmy podanego algorytmu i zaimplementujmy go jako funkcję, która może pobrać listę punktów definiujących krzywą oraz wartość `t` i narysować powiązany punkt na krzywej dla tej wartości `t`:

```
function drawCurvePoint(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurvePoint(newpoints, t)
```

I zrobione, algorytm zaimplementowany. Chociaż: zwykle nie masz luksusu przeciążania operatora "+”, więc podajmy również kod, kiedy musisz pracować z wartościami `x` i `y` osobno:

```
function drawCurvePoint(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      x = (1-t) * points[i].x + t * points[i+1].x
      y = (1-t) * points[i].y + t * points[i+1].y
      newpoints[i] = new point(x,y)
    drawCurvePoint(newpoints, t)
```

Więc co to robi? Rysuje punkt, jeśli przerobiona lista punktów ma tylko 1 punkt. W przeciwnym razie utworzy nową listę punktów, które znajdują się w stosunkach <i>t</i> (tj. "znaczniki” opisane w powyższym algorytmie), a następnie wywoła funkcję rysowania dla tej nowej listy.

</div>

