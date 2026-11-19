# Przecięcia

Przyjrzyjmy się jeszcze kilku rzeczom, które będziemy chcieli zrobić z krzywymi Béziera. Niemal natychmiast po ustaleniu, jak sprawić, by ramki ograniczające działały, ludzie mają tendencję do napotykania problemu, że chociaż minimalna ramka ograniczająca (oparta na obrocie) jest ciasna, nie wystarcza do przeprowadzenia prawdziwego wykrywania kolizji. To dobry pierwszy krok, aby upewnić się, że *może* wystąpić kolizja 
(jeśli nie ma nakładania się ramek, nie może być), ale aby przeprowadzić prawdziwe wykrywanie kolizji, musimy wiedzieć, czy istnieje przecięcie na rzeczywistej krzywej.

Zrobimy to krok po kroku, ponieważ sprawdzanie przecięć krzywa/krzywa jest trochę trudne. 
Najpierw zacznijmy od prostej implementacji sprawdzania przecięć linia-linia. Chociaż możemy rozwiązać to tradycyjnym sposobem rachunku różniczkowego (wyznacz funkcje dla obu prostych, a następnie oblicz przecięcie, zrównując je i rozwiązując dwie niewiadome), algebra liniowa faktycznie oferuje lepsze rozwiązanie.

### Przecięcia linii z liniami

Jeśli mamy dwa odcinki linii z dwoma współrzędnymi każdy, odcinki A-B i C-D, możemy znaleźć przecięcie linii, w których te odcinki są odstępami, za pomocą algebry liniowej, stosując procedurę opisaną 
w [topcoder](https://www.topcoder.com/community/competitive-programming/tutorials/geometry-concepts-line-intersection-and-its-applications/). Oczywiście musimy się upewnić, że przecięcie nie jest tylko na liniach, na których leżą nasze odcinki linii, ale faktycznie na samych naszych odcinkach linii. Więc po znalezieniu przecięcia musimy sprawdzić, czy leży ono poza granicami naszych oryginalnych segmentów linii.

Poniższa grafika implementuje to wykrywanie przecięcia, pokazując czerwony punkt przecięcia na liniach, na których leżą nasze segmenty (będąc tym samym wirtualnym punktem przecięcia), oraz zielony punkt przecięcia leżącego na obu segmentach (będący prawdziwym punktem przecięcia).

<graphics-element title="Przecięcia linii/linii" src="./line-line.js"></graphics-element>

<div class="howtocode">

### Implementacja przecięć linia-linia

Przyjrzyjmy się, jak zaimplementować funkcję sprawdzania przecięcia linia-linia. Podstawy zostały omówione we wspomnianym artykule, ale czasami potrzebujesz więcej sygnatur funkcji, ponieważ możesz nie chcieć wywoływać swojej funkcji z ośmioma odrębnymi parametrami. Może używasz struktur punktowych dla linii. Zajmijmy się kodowaniem:

```
lli8 = function(x1,y1,x2,y2,x3,y3,x4,y4):
  var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),
      ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),
      d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
  if d=0:
    return false
  return point(nx/d, ny/d)

lli4 = function(p1, p2, p3, p4):
  var x1 = p1.x, y1 = p1.y,
      x2 = p2.x, y2 = p2.y,
      x3 = p3.x, y3 = p3.y,
      x4 = p4.x, y4 = p4.y;
  return lli8(x1,y1,x2,y2,x3,y3,x4,y4)

lli = function(line1, line2):
  return lli4(line1.p1, line1.p2, line2.p1, line2.p2)
```

</div>

### A co z przecięciami krzywych z liniami?

Przecięcie krzywej/linii to więcej pracy, ale widzieliśmy już techniki, których musimy użyć, aby to wykonać: najpierw przesuwamy/obracamy zarówno linię, jak i krzywą razem, w taki sposób, że linia pokrywa się z x- oś. Spowoduje to ustawienie krzywej w taki sposób, że przecina linię w punktach, w których jej funkcja y wynosi zero. W ten sposób problem znajdowania przecięć między krzywą a linią stał się teraz problemem znajdowania pierwiastków na naszej przesuniętej/obróconej krzywej, jak już omówiliśmy w części dotyczącej znajdowania końców.

<div class="figure">
<graphics-element title="Przecięcia kwadratowych krzywych/linii" src="./curve-line.js" data-type="quadratic"></graphics-element>
<graphics-element title="Przecięcia sześciennych krzywych/linii" src="./curve-line.js" data-type="cubic"></graphics-element>
</div>

Przecięcie krzywej/krzywej jest jednak bardziej skomplikowane. Ponieważ nie mamy linii prostej, do której moglibyśmy się wyrównać, nie możemy po prostu wyrównać jednej z krzywych i pozostać z prostą procedurą. Zamiast tego będziemy musieli zastosować dwie techniki, które poznaliśmy wcześniej: algorytm de Casteljau i dzielenie krzywych.
