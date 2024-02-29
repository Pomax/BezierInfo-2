# Znajdowanie krańców: znajdowanie pierwiastków

Teraz, gdy rozumiemy już (przynajmniej powierzchownie) funkcje składowe, możemy znaleźć krańce naszej krzywej Béziera, znajdując maksima i minima na funkcjach składowych, rozwiązując równanie B'(t) = 0. Widzieliśmy już, że pochodna krzywej Béziera jest prostszą krzywą Béziera, ale jak rozwiązać równość? Właściwie dość łatwo, dopóki nasze pochodne nie są czwartego rzędu lub wyższego... wtedy sprawy stają się naprawdę trudne. Ale zacznijmy prosto:

### Krzywe kwadratowe: pochodne liniowe.


Pochodna kwadratowej krzywej Béziera jest liniową krzywą Béziera, interpolującą tylko między dwoma kresami, co oznacza, że znalezienie rozwiązania dla "gdzie ta prosta ma 0” jest faktycznie trywialne przez przepisanie jej na funkcję `t` i rozwiązanie. Najpierw zamieniamy naszą kwadratową funkcję Béziera na liniową, postępując zgodnie z regułą wymienioną na końcu [sekcji dotyczącej pochodnych](#derivatives):

\[
\begin{aligned}
  B'(t) = a(1-t) + b(t) &= 0,\\
  a - at + bt &= 0,\\
  (b-a)t + a &= 0\\
\end{aligned}
\]

Następnie przekształcamy to w nasze rozwiązanie dla `t` przy użyciu podstawowych działań arytmetycznych:

\[
\begin{aligned}
  (b-a)t + a &= 0,\\
  (b-a)t &= -a,\\
  t &= \frac{-a}{b-a}\\
\end{aligned}
\]

Zrobione.

Chociaż z [zastrzeżeniem](https://en.wikipedia.org/wiki/Caveat_emptor#Caveat_lector), że jeśli `b-a` wynosi zero, nie ma rozwiązania i prawdopodobnie nie powinniśmy próbować wykonywać tego dzielenia.

### Krzywe sześcienne: wzór kwadratowy.

Pochodna sześciennej krzywej Béziera jest kwadratową krzywą Béziera, a znalezienie pierwiastków wielomianu kwadratowego oznacza, że możemy zastosować [wzór kwadratowy](https://en.wikipedia.org/wiki/Quadratic_formula). Jeśli widziałeś go wcześniej, pamiętasz go, a jeśli nie, wygląda to tak:

\[
  \textit{Given}~f(t) = at^2 + bt + c,~f(t)=0 ~\textit{when}~ t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]

Tak więc, jeśli możemy przepisać funkcję składowej Béziera jako zwykły wielomian, gotowe: po prostu podstawiamy wartości do wzoru kwadratowego, sprawdzamy, czy wyrażenie pod pierwiastkiem jest ujemne, czy nie (jeśli tak, to nie ma pierwiastków) a następnie po prostu obliczamy dwie wartości, które wychodzą (z powodu tego znaku plus/minus otrzymujemy dwie). Każda wartość między 0 a 1 jest pierwiastkiem, który ma znaczenie dla krzywych Béziera, wszystko poniżej lub powyżej jest nieistotne (ponieważ krzywe Béziera są definiowane tylko w przedziale [0,1]). Więc jak przekształcimy?

Najpierw zamieniamy naszą sześcienną funkcję Béziera na kwadratową, postępując zgodnie z regułą wymienioną na końcu [sekcji dotyczącej pochodnych](#derivatives):

\[
\begin{array}{l}
  B(t)~\textit{uses}~\{ p_1,p_2,p_3,p_4 \} \\
  B'(t)~\textit{uses}~\{ v_1,v_2,v_3 \},~\textit{where}~v_1 = 3(p_2-p_1),~v_2 = 3(p_3-p_2),~v_3 = 3(p_4-p_3)
\end{array}
\]

A następnie, używając tych wartości *v*, możemy dowiedzieć się, jakie powinny być nasze *a*, *b* i *c*:

\[
\begin{aligned}
  B'(t) &= v_1(1-t)^2 + 2v_2(1-t)t + v_3t^2 \\
  ... &= v_1(t^2 - 2t + 1) + 2v_2(t-t^2) + v_3t^2 \\
  ... &= v_1t^2 - 2v_1t + v_1 + 2v_2t - 2v_2t^2 + v_3t^2 \\
  ... &= v_1t^2 - 2v_2t^2 + v_3t^2 - 2v_1t + v_1 + 2v_2t \\
  ... &= (v_1-2v_2+v_3)t^2 + 2(v_2-v_1)t + v_1
\end{aligned}
\]

To daje nam trzy współczynniki {a, b, c}, które są wyrażone jako wartości `v`, gdzie wartości `v` są wyrażeniami naszych oryginalnych wartości współrzędnych, więc możemy dokonać pewnych podstawień, aby uzyskać:

\[
\begin{aligned}
  a &= v_1-2v_2+v_3 = 3(-p_1 + 3p_2 - 3p_3 + p_4) \\
  b &= 2(v_2-v_1) = 6(p_1 - 2p_2 + p_3) \\
  c &= v_1 = 3(p_2-p_1)
\end{aligned}
\]

Bułka z masłem. Możemy teraz niemal trywialnie znaleźć pierwiastki, podstawiając te wartości do wzoru kwadratowego.

I jako krzywa sześcienna, istnieje również znacząca druga pochodna, którą możemy obliczyć po prostu biorąc pochodną pochodnej.

### Krzywe kwartyczne: algorytm Cardano.

Tak naprawdę nie przyglądaliśmy się im wcześniej, ale następnym krokiem byłaby krzywa Quartic, krzywa Béziera czwartego stopnia. Zgodnie z oczekiwaniami, mają one pochodną, która jest funkcją sześcienną, a teraz sprawy stają się znacznie trudniejsze. Funkcje sześcienne nie mają "prostej” reguły znajdowania pierwiastków, takiej jak formuła kwadratowa, i zamiast tego wymagają sporo przepisywania do postaci, którą możemy nawet zacząć próbować rozwiązać.

Jeszcze w XVI wieku, zanim pojawiły się krzywe Béziera, a nawet zanim pojawił się sam rachunek różniczkowy, [Gerolamo Cardano](https://en.wikipedia.org/wiki/Gerolamo_Cardano) odkrył, że nawet jeśli ogólna funkcja sześcienna jest naprawdę trudna do rozwiązania, można ją przepisać do postaci, dla której znajdowanie pierwiastków jest "łatwiejsze" (nawet jeśli nie "łatwe"):

\[
  \begin{aligned}
    \textit{very hard: solve } & at^3 + bt^2 + ct + d = 0 \\
    \textit{easier: solve } & t^3 + pt + q = 0
  \end{aligned}
\]

Widzimy, że łatwiejsza formuła ma tylko dwie stałe zamiast czterech i tylko dwa wyrażenia zawierające `t` zamiast trzech: znacznie ułatwia to rozwiązanie, ponieważ pozwala nam użyć [rachunku regularnego](https://www.wolframalpha.com/input/?i=t^3+%2B+pt+%2B+q), aby znaleźć wartości spełniające równanie.

Teraz jest jeden mały problem: jako funkcja sześcienna rozwiązaniami mogą być [liczby zespolone](https://en.wikipedia.org/wiki/numer_zespolony) zamiast zwykłych liczb... I Cardano zdał sobie z tego sprawę wieki wcześniej niż liczby zespolone były dobrze rozumianą i ugruntowaną częścią teorii liczb. Jego interpretacja tych liczb brzmiała: "te liczby są niemożliwe, ale to w porządku, ponieważ znikają ponownie w późniejszych krokach”, pozwalając mu nie myśleć o nich za dużo, ale mamy to jeszcze łatwiejsze: ponieważ próbujemy znaleźć pierwiastki do wyświetlenia dla celów, nawet _troszczymy się_ o liczby zespolone: zamierzamy uprościć podejście Cardano tylko odrobinę dalej, odrzucając wszelkie rozwiązania, które nie są zwykłymi liczbami.


Jak więc przepisać trudny wzór na łatwiejszy wzór?
Jest to szczegółowo wyjaśnione na [stronie Kena J. Warda](https://trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm) dotyczącej rozwiązywania równania sześciennego, więc zamiast pokazywać matematykę, po prostu pokażę kod programu do rozwiązywania równania sześciennego, z całkowitym zignorowaniem pierwiastków zespolonych, ale eśli jesteś zainteresowany, zdecydowanie powinieneś udać się na stronę Kena i zapoznać się z procedurą.

<div class="howtocode">

### Implementacja algorytmu Cardano do znajdowania wszystkich pierwiastków rzeczywistych

Część "rzeczywistych pierwiastków" jest dość ważna, ponieważ podczas gdy nie można wziąć kwadratu, sześcianu itp. pierwiastka z liczby ujemnej w przestrzeni liczb "rzeczywistych" (oznaczonej przez ℝ), jest to całkowicie w porządku w przestrzeni [liczb "zespolonych"](https://en.wikipedia.org/wiki/Complex_number) (oznaczonej przez ℂ). Tak się składa, że Cardano jest również przypisywany jako pierwszy matematyk w historii, który wykorzystał liczby zespolone w swoich obliczeniach. Właśnie z powodu tego algorytmu!

```
// A helper function to filter for values in the [0,1] interval:
function accept(t) {
  return 0<=t && t <=1;
}

// A real-cuberoots-only function:
function cuberoot(v) {
  if(v<0) return -pow(-v,1/3);
  return pow(v,1/3);
}

// Now then: given cubic coordinates {pa, pb, pc, pd} find all roots.
function getCubicRoots(pa, pb, pc, pd) {
  var   a = (3*pa - 6*pb + 3*pc),
        b = (-3*pa + 3*pb),
        c = pa,
        d = (-pa + 3*pb - 3*pc + pd);

  // do a check to see whether we even need cubic solving:
  if (approximately(d,0)) {
    // this is not a cubic curve.
    if (approximately(a,0)) {
      // in fact, this is not a quadratic curve either.
      if (approximately(b,0)) {
        // in fact in fact, there are no solutions.
        return [];
      }
      // linear solution
      return [-c / b].filter(accept);
    }
    // quadratic solution
    var q = sqrt(b*b - 4*a*c), 2a = 2*a;
    return [(q-b)/2a, (-b-q)/2a].filter(accept)
  }

  // at this point, we know we need a cubic solution.

  a /= d;
  b /= d;
  c /= d;

  var p = (3*b - a*a)/3,
      p3 = p/3,
      q = (2*a*a*a - 9*a*b + 27*c)/27,
      q2 = q/2,
      discriminant = q2*q2 + p3*p3*p3;

  // and some variables we're going to use later on:
  var u1, v1, root1, root2, root3;

  // three possible real roots:
  if (discriminant < 0) {
    var mp3  = -p/3,
    mp33 = mp3*mp3*mp3,
    r    = sqrt( mp33 ),
    t    = -q / (2*r),
    cosphi = t<-1 ? -1 : t>1 ? 1 : t,
    phi  = acos(cosphi),
    crtr = cuberoot(r),
    t1   = 2*crtr;
    root1 = t1 * cos(phi/3) - a/3;
    root2 = t1 * cos((phi+2*pi)/3) - a/3;
    root3 = t1 * cos((phi+4*pi)/3) - a/3;
    return [root1, root2, root3].filter(accept);
  }

  // three real roots, but two of them are equal:
  if(discriminant === 0) {
    u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
    root1 = 2*u1 - a/3;
    root2 = -u1 - a/3;
    return [root1, root2].filter(accept);
  }

  // one real root, two complex roots
  var sd = sqrt(discriminant);
  u1 = cuberoot(sd - q2);
  v1 = cuberoot(sd + q2);
  root1 = u1 - v1 - a/3;
  return [root1].filter(accept);
}
```

</div>

I to wszystko. Matematyka jest skomplikowana, ale kod to po prostu "postępuj zgodnie z matematyką, jednocześnie buforując jak najwięcej wartości, 
aby zapobiec ich ponownemu obliczeniu”, a teraz mamy sposób na znalezienie wszystkich pierwiastków dla funkcji sześciennej i może po prostu przejdź do używania tego, aby znaleźć końce naszych krzywych.

I oczywiście, ponieważ krzywa kwartyczna ma również sensowną drugą i trzecią pochodną, możemy dość łatwo je obliczyć, używając pochodnej pochodnej (pochodnej), tak jak w przypadku krzywych sześciennych.


### Krzywe kwintyczne i krzywe wyższego rzędu: znajdowanie rozwiązań numerycznych

I na tym rzecz się kończy, ponieważ nie możemy znaleźć pierwiastków wielomianów stopnia 5 lub wyższego za pomocą algebry 
(fakt znany jako [twierdzenie Abela-Ruffiniego](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem)).
Zamiast tego, w takich sytuacjach, gdy algebra po prostu nie może dać odpowiedzi, zwracamy się do [analizy numerycznej](https://en.wikipedia.org/wiki/Numerical_analysis).

To fantazyjne określenie na powiedzenie: "zamiast próbować znaleźć dokładne odpowiedzi poprzez manipulowanie symbolami, znajdź przybliżone odpowiedzi, opisując leżący u ich podstaw proces jako kombinację kroków, 
z których każdemu _można_ przypisać liczbę za pomocą symbolicznej manipulacji”. 
Na przykład próba matematycznego obliczenia, ile wody mieści się w całkowicie szalonym trójwymiarowym kształcie, jest bardzo trudna, nawet jeśli daje idealną, precyzyjną odpowiedź. 
Znacznie łatwiejszym podejściem, które byłoby mniej doskonałe, ale nadal całkowicie przydatne, byłoby po prostu złapanie wiadra i rozpoczęcie napełniania kształtu, aż będzie pełny: po prostu policz liczbę zużytych wiader wody. A jeśli chcemy uzyskać bardziej precyzyjną odpowiedź, możemy użyć mniejszych wiader.

Więc to też tutaj zrobimy: potraktujemy problem jako sekwencję kroków, a im mniejszy krok wykonamy, tym bliżej będziemy tej "doskonałej, precyzyjnej” odpowiedzi. I jak się okazuje, istnieje naprawdę fajny numeryczny algorytm znajdowania pierwiastków, 
zwany metodą znajdowania pierwiastków [Newtona-Raphsona](https://en.wikipedia.org/wiki/Newton-Raphson) (tak, *[tego](https://en.wikipedia.org/wiki/Isaac_Newton)* Newtona), z którego możemy skorzystać. Podejście Newtona-Raphsona polega na wzięciu naszej niemożliwej do rozwiązania funkcji `f(x)`, wybraniu pewnej wartości początkowej `x` (dosłownie każda wartość wystarczy) i obliczeniu `f(x)`. Możemy myśleć o tej wartości jako o "wysokości” funkcji w punkcie `x`. Jeśli ta wysokość wynosi zero, to koniec, znaleźliśmy pierwiastek. Jeśli nie, obliczamy styczną w punkcie `f(x)` i obliczamy, przy której wartości `x` jej wysokość wynosi zero (co, jak już widzieliśmy, jest bardzo łatwe). To da nam nowy `x` i powtarzamy proces, aż znajdziemy pierwiastek.

Matematycznie oznacza to, że dla pewnego `x` w kroku `n=1` wykonujemy następujące obliczenia, aż `f<sub>y</sub>(x)` będzie równe zeru, więc następne `t` to taki sam jak ten, który już mamy:


\[
  x_{n+1} = x_n - \frac{f_y(x_n)}{f'_y(x_n)}
\]

(Artykuł w Wikipedii zawiera przyzwoitą animację tego procesu, więc nie dodam tutaj grafiki)

Działa to dobrze tylko wtedy, gdy możemy wybrać dobre punkty początkowe, a nasza krzywa jest [ciągle różniczkowalna](https://en.wikipedia.org/wiki/Continuous_function) i nie ma [oscylacji](https://en.wikipedia.org/wiki/Oscillation_(mathematics)). Przybliżając dokładne znaczenie tych terminów, krzywe, z którymi mamy do czynienia, są zgodne z tymi ograniczeniami, więc dopóki wybierzemy dobre punkty startowe, to zadziała. Pytanie więc brzmi: jakie punkty startowe wybieramy?

Jak się okazuje, algorytm Newtona-Raphsona jest tak oślepiająco szybki, że moglibyśmy po prostu nie wybierać: po prostu uruchamiamy algorytm od *t=0* do *t=1* małymi krokami (powiedzmy 1/200), 
a wynikiem będą wszystkie pierwiastki, które chcemy. Oczywiście może to stwarzać problemy w przypadku krzywych Béziera wysokiego rzędu: 
200 kroków dla 200-nej krzywej Béziera pójdzie nie tak, ale to w porządku: nie ma powodu (przynajmniej takiego, dla którego o których wiem) _kiedykolwiek_ używać krzywych Béziera szalenie wysokich rzędów. 
Możesz użyć krzywej piątego rzędu, aby uzyskać "najładniejsze, wciąż zdalnie działające” przybliżenie 
pełnego koła z pojedynczą krzywą Béziera, ale to właściwie tyle, ile kiedykolwiek będziesz potrzebował.

### Podsumowując:

Więc teraz, gdy wiemy, jak szukać pierwiastków, możemy określić pierwiastki pierwszej i drugiej pochodnej dla naszych krzywych Béziera i pokazać te pierwiastki nałożone na poprzednią grafikę. Dla krzywej kwadratowej oznacza to tylko pierwszą pochodną, zaznaczoną na czerwono:

<graphics-element title="Ekstrema kwadratowej krzywej Béziera" width="825" src="./extremities.js" data-type="quadratic"></graphics-element>

A dla krzywych sześciennych oznacza to pierwszą i drugą pochodną, odpowiednio na czerwono i fioletowo:

<graphics-element title="Ekstrema sześciennej krzywej Béziera" width="825" src="./extremities.js" data-type="cubic"></graphics-element>
