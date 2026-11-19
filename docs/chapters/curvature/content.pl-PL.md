# Krzywizna krzywej

Jeśli mamy dwie krzywe i chcemy je ustawić tak, aby "wyglądały dobrze”, jakiej miary użylibyśmy, aby komputer zdecydował, co oznacza "wygląda dobrze”?

Na przykład możemy zacząć od upewnienia się, że dwie krzywe mają wspólną współrzędną końcową, tak aby nie było "przerwy” między końcem jednej a początkiem następnej krzywej, ale to nie gwarantuje, że wszystko będzie wyglądać dobrze: obie krzywe mogą przebiegać w bardzo różnych kierunkach, a wynikowa połączona geometria będzie zawierała narożnik, a nie płynne przejście od jednej krzywej do drugiej.

Chcemy mieć pewność, że [krzywizna](https://en.wikipedia.org/wiki/Curvature) na przejściu z jednej krzywej do następnej "wygląda dobrze”. Zaczynamy więc od wspólnej współrzędnej, a następnie wymagamy, aby pochodne dla obu krzywych były zgodne na tej współrzędnej. W ten sposób mamy pewność, że ich styczne są wyrównane, co musi oznaczać, że przejście krzywej jest idealnie gładkie. Możemy nawet dopasować drugie, trzecie itd. pochodne, aby uzyskać coraz lepsze przejścia.

Problem rozwiązany!

Jest jednak problem z tym podejściem: jeśli zastanowimy się nad tym trochę, zdamy sobie sprawę, że "jak wygląda krzywa” i jej wartości pochodne są prawie całkowicie niezależne. W końcu sekcja o [zmianie kolejności krzywych](#reordering) pokazała nam, że ta sama wyglądająca krzywa może mieć nieskończoną liczbę wyrażeń krzywych o dowolnie wysokim stopniu Béziera, a każda z nich będzie miała _szalenie_ różne wartości pochodnej.

Więc tak naprawdę chcemy jakiegoś wyrażenia, które nie jest oparte na żadnym konkretnym wyrażeniu `t`, ale jest oparte na czymś, co jest niezmienne w stosunku do _rodzaju_ funkcji, których używamy do narysowania naszej krzywej. A głównym kandydatem na to jest nasze wyrażenie krzywej, przeparametryzowane dla odległości: bez względu na to, jakiej kolejności krzywej Béziera użyjemy, gdybyśmy byli w stanie przepisać ją jako funkcję odległości wzdłuż krzywej, wszystkie te różne stopnie funkcji Béziera skończyłoby się na _tej samej_ funkcji dla "współrzędnej w pewnej odległości D wzdłuż krzywej”.

Widzieliśmy to już wcześniej... to jest funkcja długości łuku.

Możesz więc pomyśleć, że aby znaleźć krzywiznę krzywej, musimy teraz rozwiązać samą funkcję długości łuku i że byłoby to sporym problemem, ponieważ właśnie zobaczyliśmy, że nie ma sposobu, aby to zrobić. Na szczęście nie. Musimy tylko znać _formę_ funkcji długości łuku, którą widzieliśmy powyżej i która jest dość prosta, zamiast _rozwiązywać_ funkcję długości łuku. Jeśli zaczniemy od wyrażenia długości łuku i [przeprowadzimy niezbędne kroki](https://mathworld.wolfram.com/Curvature.html) w celu określenia _jej_ pochodnej (z alternatywnym, krótszym pokazem, jak to zrobić, znalezionym [ na Stackexchange](https://math.stackexchange.com/questions/275248/deriving-curvature-formula/275324#275324)), wtedy całka, która sprawiała nam tak wiele problemów w rozwiązaniu funkcji długości łuku, znika całkowicie (z powodu [fundamentalnego twierdzenia rachunku różniczkowego](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus)) i tego, co nam zostało z zaskakująco prostej matematyki, która odnosi się do krzywizny (oznaczonej jako κ, "kappa”) do - i to jest naprawdę zaskakujący fragment - do określonej kombinacji pochodnych naszej pierwotnej funkcji.

Pozwólcie, że podkreślę to, co się właśnie wydarzyło, ponieważ jest to dość wyjątkowe:

1. Chcieliśmy wyrównać krzywe i początkowo myśleliśmy, że pasują do pochodnych krzywych, ale
2. to okazało się naprawdę złym wyborem, więc zamiast tego
3. wybraliśmy funkcję, z którą zasadniczo nie da się pracować, a następnie _pracowaliśmy z nią_, która
4. daje nam prosty wzór, który jest _i wyrażeniem z pochodnych krzywych_.

*To szalone!*

Ale to także jedna z rzeczy, które sprawiają, że matematyka jest tak potężna: nawet jeśli twoje początkowe pomysły są nietrafione, możesz być znacznie bliżej niż myślałeś, a podróż od "myślenia, że ​​całkowicie się mylimy” do "faktycznego bycia niezwykle blisko prawdy” jest miejscem, w którym możemy znaleźć wiele spostrzeżeń.

Jak zatem wygląda ta funkcja? Tak:

\[
  \kappa = \frac{{x}'{y}'' - {x}''{y}'}{({x}'^2+{y}'^2)^{\frac{3}{2}}}
\]

Co jest tak naprawdę tylko "krótką formą”, która pomija fakt, że mamy do czynienia z funkcjami `t`, więc rozwińmy to trochę:

\[
  \kappa(t) = \frac{{B_x}'(t){B_y}''(t) - {B_x}''(t){B_y}'(t)}{({B_x}'(t)^2+{B_y}'(t)^2)^{\frac{3}{2}}}
\]

I chociaż jest to trochę bardziej szczegółowe, nadal jest tak samo proste w użyciu jak pierwsza funkcja: krzywizna w pewnym punkcie dowolnej (nie można tego przecenić: _dowolnej_) krzywej to stosunek iloczynu krzyżowego pierwszej i drugiej pochodnej, i coś, co wygląda dziwnie podobnie do standardowej euklidesowej funkcji odległości. I nic w tych funkcjach nie jest trudne do obliczenia: w przypadku krzywych Béziera po prostu znając współrzędne naszej krzywej oznacza [wiemy, jaka jest pierwsza i druga pochodna](#derivatives), a więc obliczenie tej funkcji dla dowolnej wartości **t** jest tylko kwestią podstawowej arytmetyki.

Faktycznie po prostu zaimplementujmy to teraz:

```
function kappa(t, B):
  d = B.getDerivative(t)
  dd = B.getSecondDerivative(t)
  numerator = d.x * dd.y - dd.x * d.y
  denominator = pow(d.x*d.x + d.y*d.y, 3/2)
  if denominator is 0: return NaN;
  return numerator / denominator
```

To było łatwe! (Cóż, w porządku, ta wartość "nie liczba” będzie musiała zostać wzięta pod uwagę przez dalszy kod, ale to jest kwestia jakości programowania)

Mając to wszystko omówione, ustawmy kilka krzywych! Poniższy rysunek przedstawia dwie krzywe, które wyglądają identycznie, ale wykorzystują odpowiednio funkcje kwadratowe i sześcienne. Jak widać, pomimo tego, że ich pochodne są z konieczności różne, ich krzywizna (dzięki wyprowadzeniu na podstawie matematyki, która "ignoruje” pochodną określonej funkcji, a zamiast tego podaje wzór, który wygładza wszelkie różnice) jest dokładnie taka sama. Dzięki temu możemy połączyć je w taki sposób, że punkt, w którym się nakładają, ma taką samą krzywiznę dla obu krzywych, co daje nam najbardziej płynne przejście.

<graphics-element title="Dopasowywanie krzywizn dla kwadratowej i sześciennej krzywej Béziera" width="825" src="./curvature.js"></graphics-element>

Jedną rzecz, które mogłeś zauważyć na tym szkicu, jest to, że czasami krzywizna wygląda dobrze, ale wydaje się być skierowana w złym kierunku, co utrudnia prawidłowe wyrównanie krzywych. Sposobem obejścia tego jest oczywiście pokazanie krzywizny po obu stronach krzywej, więc zróbmy to. Ale pójdźmy o krok dalej: możemy również obliczyć powiązany "promień krzywizny”, który daje nam domniemany okrąg, który "pasuje” do krzywizny krzywej w dowolnym punkcie, używając prawdopodobnie najprostszego fragmentu matematyki znalezionego w całym tym Elementarzu:


\[
  R(t) = \frac{1}{\kappa(t)}
\]

Wróćmy więc do poprzedniej grafiki z krzywizną zwizualizowaną po obu stronach naszych krzywych, a także pokazując okrąg, który "pasuje” do naszej krzywej w pewnym punkcie, który możemy kontrolować za pomocą suwaka:

<graphics-element title="(Łatwiejsze) dopasowanie krzywizny dla kwadratowej i sześciennej krzywej Béziera" width="825" src="./curvature.js" data-omni="true">
  <input type="range" min="0" max="2" step="0.0005" value="0" class="slide-control">
</graphics-element>
