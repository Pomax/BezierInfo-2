# Otaczanie krzywej

Być może jesteś podobny do mnie i pisałeś różne małe programy, które w taki czy inny sposób wykorzystują krzywe Béziera, i w pewnym momencie zrobiłeś krok w kierunku implementacji wyciągania ścieżek. Ale nie chcesz tego robić w oparciu o piksele; chcesz pozostać w świecie wektorów. Przekonujesz się, że wyciąganie linii jest stosunkowo łatwe, a obrysowywanie konturów idzie dobrze (chociaż zaślepki połączeń i zaokrąglenia są trochę kłopotliwe), a potem decydujesz się zrobić wszystko poprawnie i dodać krzywe Béziera do miksu. Teraz masz problem.

W przeciwieństwie do linii, nie można po prostu wyciągnąć krzywej Béziera, biorąc kopię i przesuwając ją dookoła, ze względu na krzywizny; zamiast jednolitej grubości, otrzymujesz tłoczenie, które wygląda na zbyt cienkie miejscami, jeśli masz szczęście, ale bardziej prawdopodobne jest, że samo się przetnie. Sztuką jest więc skalowanie krzywej, a nie tylko jej kopiowanie. Ale jak skalować krzywą Béziera?

Konkluzja: **nie możesz**. Więc oszukujesz. Nie będziemy robić prawdziwego skalowania krzywej, a raczej otaczania krzywej, ponieważ jest to niemożliwe. Zamiast tego spróbujemy wygenerować krzywe otaczania "wystarczająco dobrze”.

<div class="note">

### "Co masz na myśli mówiąc, że nie możesz? Udowodnij to”.

Po pierwsze, kiedy mówię "nie możesz”, tak naprawdę mam na myśli "nie możesz zrównoważyć krzywej Béziera inną krzywą Béziera”, nawet używając krzywej naprawdę wysokiego rzędu. Możesz znaleźć funkcję opisującą krzywą otaczania, ale nie będzie to wielomian i jako taka nie może być reprezentowana jako krzywa Béziera, która **musi** być wielomianem. Przyjrzyjmy się, dlaczego tak jest:

Z matematycznego punktu widzenia, krzywa otaczania `O(t)` jest taką krzywą, która biorąc pod uwagę naszą pierwotną krzywą `B(t)`, dowolny punkt na `O(t)` znajduje się w ustalonej odległości `d` od współrzędnej `B(t)`. Obliczmy więc, że:

\[
  O(t) = B(t) + d
\]

Jednak pracujemy w 2D, a `d` jest pojedynczą wartością, więc chcemy przekształcić ją w wektor. Jeśli chcemy, aby punkt znajdował się w odległości `d` "oddalonej” od krzywej `B(t)`, to tak naprawdę chcemy mieć na myśli punkt w odległości `d` razy "wektor normalny” od punktu `B(t)` , gdzie "normalna” to wektor biegnący prostopadle ("pod kątem prostym”) do stycznej w punkcie "B(t)”. Wystarczająco łatwe:

\[
  O(t) = B(t) + d \cdot N(t)
\]

Teraz to nadal nie jest zbyt przydatne, chyba że wiemy, jaki jest wzór na `N(t)`, więc dowiedzmy się. `N(t)` biegnie prostopadle do oryginalnej stycznej krzywej i wiemy, że styczna to po prostu `B'(t)`, więc moglibyśmy po prostu obrócić to o 90 stopni i gotowe. Musimy jednak upewnić się, że `N(t)` ma taką samą wielkość dla każdego `t`, w przeciwnym razie krzywa otaczania nie będzie w jednakowej odległości, a zatem w ogóle nie będzie krzywą otaczania. Najłatwiejszym sposobem zagwarantowania tego jest upewnienie się, że `N(t)` ma zawsze długość 1, co możemy osiągnąć dzieląc `B'(t)` przez jego wielkość:


\[
  N(t) \bot \left ( \frac{B'(t)}{\left || B'(t) \right || } \right )
\]

Określenie długości wymaga obliczenia długości łuku, a tutaj sprawy stają się trudne przez duże T. Po pierwsze, aby obliczyć długość łuku od pewnego początku "a” do końca "b”, musimy użyć wzoru, który widzieliśmy wcześniej. Zauważając, że "długość” jest zwykle oznaczana podwójnymi pionowymi kreskami:


\[
  \left || f(x,y) \right || = \int^b_a \sqrt{ f_x'^2 + f_y'^2}
\]

Więc jeśli chcemy długość stycznej, wstawiamy `B'(t)`, z `t = 0` jako początkiem i
`t = 1` jako koniec:

\[
  \left || B'(t) \right || = \int^1_0 \sqrt{ B_x''(t)^2 + B_y''(t)^2}
\]

I właśnie tam dzieje się źle. Nie ma nawet znaczenia, jaka jest druga pochodna dla `B(t)`, ten pierwiastek kwadratowy wszystko psuje, ponieważ zamienia nasze ładne wielomiany w rzeczy, które już nie są wielomianami.

Istnieje niewielka klasa wielomianów, w których pierwiastek kwadratowy jest również wielomianem, ale są one dla nas całkowicie bezużyteczne: każdy wielomian z nieważonymi współczynnikami dwumianowymi ma pierwiastek kwadratowy, który również jest wielomianem. Teraz możesz pomyśleć, że krzywe Béziera są w porządku, ponieważ tak jest, ale tak nie jest; pamiętaj, że tylko funkcja **podstawowa** ma współczynniki dwumianowe. To zanim weźmiemy pod uwagę nasze współrzędne, które zamieniają go w niedwumianowy wielokąt. Jedynym sposobem, aby upewnić się, że funkcje pozostają dwumianowe, jest sprawienie, aby wszystkie nasze współrzędne miały tę samą wartość. I to nie jest krzywa, to jest punkt. Możemy już tworzyć krzywe otaczania dla punktów, nazywamy je okręgami i mają one znacznie prostsze funkcje niż krzywe Béziera.

Tak więc, ponieważ długość stycznej nie jest wielomianem, znormalizowana styczna również nie będzie wielomianem, co oznacza, że `N(t)` nie będzie wielomianem, co oznacza, że `d` razy `N(t) ` nie będzie wielomianem, co oznacza, że ostatecznie `O(t)` nie będzie wielomianem, co oznacza, że nawet jeśli możemy wyznaczyć funkcję dla `O(t)` dobrze (a to daleko od trywialnego!), po prostu nie może być reprezentowana jako krzywa Béziera.

I to jest jeden z powodów, dla których krzywe Béziera są trudne: w rzeczywistości istnieje *dużo* krzywych, których w ogóle nie można przedstawić jako krzywych Béziera. Nie mogą nawet modelować własnych krzywych otaczania.
One są dziwne w ten sposób. Jak więc robią to wszystkie inne programy? Cóż, podobnie jak my zamierzamy to zrobić, one oszukują. Zamierzamy przybliżyć krzywą otaczania w sposób, który będzie wyglądał stosunkowo blisko tego, jak wyglądałaby rzeczywista krzywa otaczania, gdybyśmy mogli to obliczyć.

</div>

Nie można więc idealnie skompensować krzywej Béziera inną krzywą Béziera, bez względu na to, jak wysokiego rzędu jest ta druga krzywa Béziera. Możemy jednak podzielić krzywą na "bezpieczne" podkrzywe (gdzie "bezpieczne" oznacza, że wszystkie punkty kontrolne są zawsze po jednej stronie linii bazowej, a punkt środkowy krzywej przy `t=0,5` znajduje się mniej więcej w środku wielokąta zdefiniowanego przez współrzędne krzywej), a następnie przeskalować punktowo każdą podkrzywą w odniesieniu do jej początku skalowania (który jest przecięciem normalnych punktów w punktach początkowych i końcowych).

Dobrym sposobem na dokonanie tej redukcji jest najpierw znalezienie skrajnych punktów krzywej, jak wyjaśniono we wcześniejszej części dotyczącej końców krzywej, i użycie ich jako początkowych punktów podziału. Po tym początkowym podziale możemy sprawdzić każdy pojedynczy segment, aby zobaczyć, czy jest "wystarczająco bezpieczny” w oparciu o to, gdzie znajduje się środek krzywej. Jeśli punkt na krzywej dla `t=0,5` jest zbyt daleko od środka, po prostu dzielimy segment na środku. Ogólnie rzecz biorąc, jest to więcej niż wystarczające, aby uzyskać bezpieczne segmenty.

Poniższa grafika przedstawia otaczanie krzywej, a suwakiem można sterować odległością, o jaką krzywa ma zostać otoczona. Krzywa zostaje najpierw zredukowana do bezpiecznych segmentów, z których każdy jest następnie przesunięty o żądaną odległość. Szczególnie w przypadku prostych krzywych, szczególnie łatwych do ustawienia dla krzywych kwadratowych, redukcja nie jest konieczna, ale im bardziej krzywa się zakręca, tym bardziej trzeba ją zmniejszyć, aby uzyskać segmenty, które można bezpiecznie skalować.

<graphics-element title="Otaczanie kwadratowej krzywej Béziera" src="./offsetting.js" data-type="quadratic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>

<graphics-element title="Otaczanie sześciennej krzywej Béziera" src="./offsetting.js" data-type="cubic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>

Możesz zauważyć, że może to nadal prowadzić do małych 'skoków' na krzywych podrzędnych podczas przesuwania krzywej. Jest to spowodowane faktem, że nadal wykonujemy naiwną formę otaczania, przesuwając punkty kontrolne na taką samą odległość, jak punkty początkowe i końcowe. Jeśli krzywa jest wystarczająco duża, może to nadal prowadzić do nieprawidłowych otaczań.