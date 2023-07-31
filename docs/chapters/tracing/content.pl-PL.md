# Przechodzenie krzywej w ustalonych odstępach odległości

Załóżmy, że chcesz narysować krzywą linią przerywaną, a nie linią ciągłą, lub chcesz przesuwać coś wzdłuż krzywej w ustalonych odstępach czasu, na przykład pociąg wzdłuż toru, i chcesz użyć krzywych Béziera.

Teraz masz problem.

Powodem, dla którego masz problem, jest to, że krzywe Béziera są funkcjami parametrycznymi o nieliniowym zachowaniu, podczas gdy poruszanie się pociągu po torze jest tak blisko praktycznego przykładu zachowania liniowego, jak to tylko możliwe. Problem polega na tym, że nie możemy po prostu wybrać wartości `t` w jakimś ustalonym przedziale i oczekiwać, że funkcje Béziera wygenerują punkty oddalone od siebie o stałą odległość. Faktycznie przyjrzyjmy się relacji między "odległością wzdłuż krzywej” a "wartością `t`”, porównując je ze sobą.

Poniższa grafika przedstawia szczególnie ilustracyjną krzywą i jej wykres odległości dla t. W przypadku przechodzenia liniowego linia ta musi być prosta i przebiegać od (0,0) do (długość,1). To znaczy, można śmiało powiedzieć, że nie to, co zobaczymy: zamiast tego zobaczymy coś bardzo chwiejnego. Co gorsza, funkcja odległości dla t jest również znacznie wyższego rzędu niż nasza krzywa: podczas gdy krzywa, której używamy w tym ćwiczeniu, jest krzywą sześcienną, która w najlepszym przypadku może zmieniać formę wklęsłą/wypukłą , funkcją odległości jest nasza stara przyjaciółka, funkcja długości łuku, która może mieć więcej punktów przegięcia.

<graphics-element title="Funkcja t-dla-odległości" width="550" src="./distance-function.js"></graphics-element>

Jak więc "pociąć” funkcję długości łuku w regularnych odstępach, skoro tak naprawdę nie możemy z nią pracować? Zasadniczo oszukujemy: przebiegamy przez krzywą używając wartości `t`, określamy odległość dla tej wartości `t` w każdym punkcie wygenerowanym podczas biegu, a następnie znajdujemy "najbliższą wartość `t`, która pasuje pewną wymaganą odległość”, używając zamiast tego tych wartości. Jeśli mamy małą liczbę próbkowanych punktów, możemy nawet uściślić, która wartość "t” "powinna” działać dla żądanej odległości, interpolując między dwoma punktami, ale jeśli mamy wystarczająco dużą liczbę próbek, nawet nie trzeba się męczyć.

Zróbmy więc dokładnie to: poniższy wykres jest podobny do poprzedniego i pokazuje, jak musielibyśmy "pociąć” naszą krzywą odległości na t, aby uzyskać regularnie rozmieszczone punkty na krzywej. Pokazuje również, jak wygląda użycie tych wartości `t` na rzeczywistej krzywej, kolorując inaczej każdy odcinek krzywej między dwoma znacznikami odległości:

<graphics-element title="Kolorowanie krzywej ze stałym interwałem" width="825" src="./tracing.js">
  <input type="range" min="2" max="24" step="1" value="8" class="slide-control">
</graphics-element>

Użyj suwaka, aby zwiększyć lub zmniejszyć liczbę równoodległych segmentów użytych do pokolorowania krzywej.

Czy są jednak lepsze sposoby? Jeden taki sposób jest omówiony w "[Moving Along a Curve with Specified Speed](https://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf)” Davida Eberly'ego z Geometric Tools, LLC, ale zasadniczo dlatego, że nie mamy wyraźnych funkcji długości (a raczej takiej, której nie musimy stale obliczać dla różnych przedziałów), może być po prostu lepiej z tradycyjną tabelą przeglądową (LUT).