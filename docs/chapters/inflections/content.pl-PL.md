# Przegięcia krzywej

Teraz, gdy wiemy, jak wyrównać krzywą, możemy obliczyć jeszcze jedną rzecz: punkty przegięcia. Wyobraź sobie, że mamy okrąg o zmiennej wielkości, który możemy przesuwać po naszej krzywej. Umieszczamy go na krzywej i dostosowujemy jego promień tak, aby w miejscu styku z krzywą krzywizny krzywej i okręgu były takie same, a następnie zaczynamy przesuwać okrąg wzdłuż krzywej - w przypadku krzywych kwadratowych 
zawsze możemy to zrobić bez dziwnego zachowania się koła: być może będziemy musieli zmienić promień okręgu podczas przesuwania go, ale zawsze będzie on znajdował się po tej samej stronie krzywej.

Ale co się dzieje z krzywymi sześciennymi? Wyobraź sobie, że mamy krzywą S i umieszczamy nasz okrąg na początku krzywej i zaczynamy go przesuwać. Przez chwilę możemy po prostu dostosować promień i wszystko będzie dobrze, ale kiedy dojdziemy do środka tego S, dzieje się coś dziwnego: okrąg "przeskakuje” z jednej strony krzywej na drugą, aby zachować dopasowanie krzywizny.
Nazywa się to przegięciem i możemy stosunkowo łatwo dowiedzieć się, gdzie to się dzieje.

Musimy rozwiązać proste równanie:

\[
  C(t) = 0
\]

Mówimy tutaj, że biorąc funkcję krzywizny *C(t)*, chcemy wiedzieć, dla jakich wartości *t* ta funkcja wynosi zero, co oznacza, że nie ma "krzywizny”, która będzie dokładnie w punkcie między naszym kołem znajdującym się po jednej stronie krzywej, a naszym kołem po drugiej stronie krzywej. Więc jak wygląda *C(t)*? Właściwie coś, co nie wydaje się zbyt trudne:

\[
  C(t) = \textit{Bézier}_x\prime(t) \cdot \textit{Bézier}_y{\prime\prime}(t) - \textit{Bézier}_y\prime(t) \cdot \textit{Bézier}_x{\prime\prime}(t)
\]

Funkcja *C(t)* jest iloczynem krzyżowym pierwszej i drugiej funkcji pochodnej dla wymiarów parametrycznych naszej krzywej. Jak już pokazano, pochodne krzywych Béziera są po prostu prostszymi krzywymi Béziera, z bardzo łatwymi do obliczenia nowymi współczynnikami, więc powinno to być całkiem łatwe.

Jednak, jak widzieliśmy w części dotyczącej wyrównywania, wyrównywanie pozwala nam *dużo* uprościć rzeczy, całkowicie usuwając wkład pierwszej współrzędnej z większości obliczeń matematycznych, a także usuwając ostatnią współrzędną *y* dzięki czemu ostatni punkt leży na osi x. Tak więc, chociaż możemy oszacować *C(t) = 0* dla naszej krzywej, znacznie łatwiej będzie najpierw wyrównać krzywą w osiach, a następnie *wyliczyć funkcję krzywizny.

<div class="note">

### Mimo wszystko wyprowadźmy pełny wzór

Oczywiście, zanim sprawdzimy wyrównanie, zobaczmy, co się stanie, jeśli obliczymy funkcję krzywizny bez wyrównania osi. Zaczynamy od pierwszej i drugiej pochodnej, biorąc pod uwagę nasze funkcje bazowe:

\[
\begin{aligned}
  & \textit{Bézier}(t) = x_1(1-t)^3 + 3x_2(1-t)^2t + 3x_3(1-t)t^2 + x_4t^3 \\
  & \textit{Bézier}^\prime(t) = a(1-t)^2 + 2b(1-t)t + ct^2~ \left\{ a=3(x_2-x_1),b=3(x_3-x_2),c=3(x_4-x_3) \right\} \\
  & \textit{Bézier}^{\prime\prime}(t) = u(1-t) + vt~\left\{ u=2(b-a),v=2(c-b) \right\}\
\end{aligned}
\]

I oczywiście te same funkcje dla *y*:

\[
\begin{aligned}
  & \textit{Bézier}(t) = y_1(1-t)^3 + 3y_2(1-t)^2t + 3y_3(1-t)t^2 + y_4t^3 \\
  & \textit{Bézier}^\prime(t) = d(1-t)^2 + 2e(1-t)t + ft^2\\
  & \textit{Bézier}^{\prime\prime}(t) = w(1-t) + zt
\end{aligned}
\]

Poproszenie komputera o ułożenie teraz dla nas funkcji *C(t)* (i rozwinięcie jej do czytelnej postaci prostych wyrazów) daje nam ten dość skomplikowany zestaw wyrażeń arytmetycznych:

\[
\begin{array}{lclclclclcl}
-18 t^2 x_2 y_1 &+& 36 t^2 x_3 y_1 &-& 18 t^2 x_4 y_1 &+& 18 t^2 x_1 y_2 &-& 54 t^2 x_3 y_2 &&\\
+36 t^2 x_4 y_2 &-& 36 t^2 x_1 y_3 &+& 54 t^2 x_2 y_3 &-& 18 t^2 x_4 y_3 &+& 18 t^2 x_1 y_4 &&\\
-36 t^2 x_2 y_4 &+& 18 t^2 x_3 y_4 &+& 36 t x_2 y_1   &-& 54 t x_3 y_1   &+& 18 t x_4 y_1 &-& 36 t x_1 y_2 \\
+54 t x_3 y_2   &-& 18 t x_4 y_2   &+& 54 t x_1 y_3   &-& 54 t x_2 y_3   &-& 18 t x_1 y_4 &+& 18 t x_2 y_4 \\
-18 x_2 y_1     &+& 18 x_3 y_1     &+& 18 x_1 y_2     &-& 18 x_3 y_2     &-& 18 x_1 y_3   &+& 18 x_2 y_3
\end{array}
\]

To znaczy... nieporęczne. Zauważmy więc, że istnieje wiele wyrazów, które obejmują mnożenia obejmujące x1, y1 i y4, które wszystkie zniknęłyby, gdybyśmy wyrównali naszą krzywą do osi, dlatego wyrównanie jest świetnym pomysłem.

</div>

Wyrównując naszą krzywą tak, aby trzy z ośmiu współczynników stały się zerowe i obserwując, że skala nie wpływa na znajdowanie wartości `t`, otrzymujemy następującą prostą funkcję wyrazową dla *C(t)*:

\[
  \left ( 3 x_3 y_2+2 x_4 y_2+3 x_2 y_3-x_4 y_3 \right ) t^2 + \left ( 3 x_3 y_2-x_4 y_2-3 x_2 y_3 \right ) t + \left ( x_2 y_3-x_3 y_2 \right )
\]

O wiele łatwiej jest z tym pracować: widzimy sporą liczbę warunków, które możemy obliczyć, a następnie zapisać w pamięci podręcznej, co daje nam następujące uproszczenie:


\[
  \left.\begin{matrix}
    a = x_3 \cdot y_2 \\
    b = x_4 \cdot y_2 \\
    c = x_2 \cdot y_3 \\
    d = x_4 \cdot y_3
  \end{matrix}\right\}
  ~C(t) = (-3a + 2b + 3c - d)t^2 + (3a - b - 3c)t + (c - a)
\]

To jest zwykła krzywa kwadratowa i wiemy, jak rozwiązać *C(t) = 0*; korzystamy ze wzoru kwadratowego:

\[
  \left.\begin{matrix}
    x =& -3a + 2b + 3c - d \\
    y =& 3a - b - 3c \\
    z =& c - a
  \end{matrix}\right\}
  ~C(t) = 0 ~\Rightarrow~t = \frac{-y \pm \sqrt{y^2 - 4 x z}}{2x}
\]


Możemy łatwo obliczyć tę wartość *jeśli* dyskryminator nie jest liczbą ujemną (ponieważ chcemy tylko pierwiastków rzeczywistych, a nie pierwiastków zespolonych) oraz *jeśli* *x* nie jest zerem, ponieważ dzielenie przez zero jest raczej bezużyteczne.

Biorąc to pod uwagę, obliczamy *t*, pomijamy każdą wartość *t*, która nie mieści się w przedziale Béziera [0,1], i wiemy teraz, przy jakich wartościach *t* przekształci się nasza krzywa.

<graphics-element title="Znajdowanie przegięć sześciennej krzywej Béziera" src="./inflection.js"></graphics-element>
