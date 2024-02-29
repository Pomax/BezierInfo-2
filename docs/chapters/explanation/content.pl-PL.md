# Matematyka krzywych Béziera

Krzywe Béziera są formą funkcji "parametrycznych”. Z matematycznego punktu widzenia funkcje parametryczne są oszustwem: "funkcja” jest w rzeczywistości dobrze zdefiniowanym pojęciem reprezentującym odwzorowanie dowolnej liczby wejść na <strong>pojedyncze</strong> wyjście. Wchodzą liczby, wychodzi jedna liczba. Zmień liczby, które wchodzą, a liczba, która wychodzi, jest nadal pojedynczą liczbą.

Funkcje parametryczne oszukują. Zasadniczo mówią "w porządku, chcemy, aby pojawiło się wiele wartości, więc użyjemy więcej niż jednej funkcji”. Ilustracja: Powiedzmy, że mamy funkcję, która odwzorowuje pewną wartość, nazwijmy ją <i>x</i>, na inną wartość, używając pewnego rodzaju manipulacji liczbami:

\[
  f(x) = \cos(x)
\]

Notacja <i>f(x)</i> to standardowy sposób pokazania, że jest to funkcja (zgodnie z konwencją zwana <i>f</i>, jeśli wymieniamy tylko jedną) i jej wynik zmienia się w oparciu o jedną zmienną (w tym przypadku <i>x</i>). Zmień <i>x</i>, a wyjście dla <i>f(x)</i> się zmieni.

Jak na razie dobrze. Przyjrzyjmy się teraz funkcjom parametrycznym i sposobom, w jaki oszukują. Weźmy następujące dwie funkcje:

\[
\begin{matrix}
  f(a) = \cos(a) \\
  f(b) = \sin(b)
\end{matrix}
\]

Nie ma w nich nic szczególnego, to tylko funkcje sinus i cosinus, ale zauważysz, że wejścia mają różne nazwy. Jeśli zmienimy wartość dla <i>a</i>, nie zmienimy wartości wyjściowej dla <i>f(b)</i>, ponieważ <i>a</i> nie jest używany w tej funkcji. Funkcje parametryczne oszukują, zmieniając to. W funkcji parametrycznej wszystkie różne funkcje współdzielą zmienną, taką jak ta:

\[
\left \{ \begin{matrix}
  f_a(t) = \cos(t) \\
  f_b(t) = \sin(t)
\end{matrix} \right.
\]

Wiele funkcji, ale tylko jedna zmienna. Jeśli zmienimy wartość dla <i>t</i>, zmienimy wynik zarówno <i>f<sub>a</sub>(t)</i>, jak i <i>f<sub>b</sub>(t)</i>. Możesz się zastanawiać, jak to jest przydatne, a odpowiedź jest w rzeczywistości całkiem prosta: jeśli zmienimy etykiety <i>f<sub>a</sub>(t)</i> i <i>f<sub>b</sub>(t)</i> z tym, co zwykle rozumiemy przez krzywe parametryczne, sprawy mogą być o wiele bardziej oczywiste:

\[
\left \{ \begin{matrix}
  x = \cos(t) \\
  y = \sin(t)
\end{matrix} \right.
\]


No to jedziemy. Współrzędne <i>x</i>/<i>y</i> połączone tajemniczą wartością <i>t</i>.

Tak więc krzywe parametryczne nie definiują współrzędnej <i>y</i> jako zależnej od <i>x</i>, jak to robią normalne funkcje, ale zamiast tego łączą wartości ze zmienną "sterującą”. Jeśli zmienimy wartość <i>t</i>, to przy każdej zmianie otrzymamy <strong>dwie</strong> wartości, które możemy wykorzystać jako (<i>x</i>,<i>y </i>) współrzędne na wykresie. Powyższy zestaw funkcji, na przykład, generuje punkty na okręgu: możemy zmieniać zakres <i>t</i> od ujemnej do dodatniej nieskończoności, a wynikowy (<i>x</i>,<i>y</i>) współrzędne zawsze będą leżeć na okręgu o promieniu 1 wokół początku układu współrzędnych (0,0). Jeśli wykreślimy to dla <i>t</i> od 0 do 5, otrzymamy to:


<graphics-element title="Okrąg (częściowy): x=sin(t), y=cos(t)" src="./circle.js">
  <input type="range" min="0" max="10" step="0.1" value="5" class="slide-control">
</graphics-element>

Krzywe Béziera są tylko jedną z wielu klas funkcji parametrycznych i charakteryzują się wykorzystaniem tej samej funkcji podstawowej dla wszystkich wartości wyjściowych. W powyższym przykładzie wartości <i>x</i> i <i>y</i> zostały wygenerowane przez różne funkcje (jedna wykorzystuje sinus, druga cosinus); ale krzywe Béziera wykorzystują "wielomian dwumianowy” zarówno dla wyników <i>x</i> jak i <i>y</i>. Czym więc są wielomiany dwumianowe?

Być może pamiętasz wielomiany z liceum. Są to sumy, które wyglądają tak:

\[
  f(x) = a \cdot x^3 + b \cdot x^2 + c \cdot x + d
\]

Jeśli wyrazem najwyższego rzędu, jaki mają, jest <i>x³</i>, nazywamy je wielomianami "sześciennymi”; jeśli jest to <i>x²</i>, jest to wielomian "kwadratowy”; jeśli to tylko <i>x</i>, to jest to prosta (a jeśli nie ma nawet wyrazów z <i>x</i>, to nie jest to wielomian!)

Krzywe Béziera to wielomiany <i>t</i> zamiast <i>x</i>, przy czym wartość <i>t</i> jest ustalona między 0 a 1, a współczynniki <i>a</i>, <i>b</i> itd. przyjmują formę "dwumianową”, co brzmi fantazyjnie, ale w rzeczywistości jest dość prostym opisem mieszania wartości:

\[
\begin{aligned}
  \textit{linear} &= (1-t) + t \\
  \textit{square} &= (1-t)^2 + 2 \cdot (1-t) \cdot t + t^2 \\
  \textit{cubic} &= (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\end{aligned}
\]

Wiem, co myślisz: to nie wygląda na zbyt proste! Ale jeśli usuniemy <i>t</i> i dodamy "razy jeden”, wszystko nagle stanie się całkiem proste. Sprawdź te warunki dwumianowe:

\[
\begin{aligned}
  \textit{linear} &= \hspace{2.5em} 1 + 1 \\
  \textit{square} &= \hspace{1.7em} 1 + 2 + 1\\
  \textit{cubic} &= \hspace{0.85em} 1 + 3 + 3 + 1\\
  \textit{quartic} &= 1 + 4 + 6 + 4 + 1
\end{aligned}
\]

Zauważ, że 2 to to samo co 1+1, a 3 to 2+1 i 1+2, a 6 to 3+3... Jak widzisz, za każdym razem, gdy przechodzimy w wyższy wymiar, po prostu zaczynamy i kończymy na 1, a wszystko pomiędzy to tylko "dwie liczby powyżej dodane do siebie”, co daje nam prosty ciąg liczb znany jako [trójkąt Pascala](https://en.wikipedia.org/wiki/Pascal%27s_triangle). Teraz <i>jest to</i> łatwe do zapamiętania.

Istnieje równie prosty sposób, aby dowiedzieć się, jak działają wyrażenia wielomianowe: jeśli zmienimy nazwę <i>(1-t)</i> na <i>a</i> i <i>t</i> na <i >b</i> i zdejmujemy na chwilę ciężarki, otrzymujemy to:

\[
\begin{aligned}
  \textit{linear} &= BLUE[a] + RED[b] \\
  \textit{square} &= BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot RED[b] + RED[b] \cdot RED[b] \\
  \textit{cubic} &= BLUE[a] \cdot BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot BLUE[a] \cdot RED[b] + BLUE[a] \cdot RED[b] \cdot RED[b] + RED[b] \cdot RED[b] \cdot RED[b]\\
\end{aligned}
\]

Zasadniczo jest to po prostu suma "każdej kombinacji <i>a</i> i <i>b</i>”, stopniowo zastępująca znaki <i>a</i> przez <i>b</i> po każdym znaku +. Więc to też jest całkiem proste. Więc teraz znasz wielomiany dwumianowe i dla uzupełnienia pokażę ci ogólną funkcję dla tego:

\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n}
                \underset{\textit{binomial term}}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{\textit{polynomial term}}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
\]

I to jest pełny opis krzywych Béziera. Σ w tej funkcji wskazuje, że jest to szereg sumowania (za pomocą zmiennej wymienionej pod literą Σ, zaczynając od ...=&lt;wartość&gt; i kończąc na wartości wymienionej nad literą Σ).

<div class="howtocode">

### Jak zaimplementować funkcję bazową

Moglibyśmy naiwnie zaimplementować funkcję bazową jako konstrukcję matematyczną, używając funkcji jako przewodnika, jak poniżej:

```
function Bezier(n,t):
  sum = 0
  for(k=0; k<n; k++):
    sum += n!/(k!*(n-k)!) * (1-t)^(n-k) * t^(k)
  return sum
```

Mówię, że moglibyśmy, ponieważ nie zamierzamy: funkcja silnia jest *niewiarygodnie* droga. I, jak widać z powyższego wyjaśnienia, możemy dość łatwo stworzyć trójkąt Pascala bez niej: po prostu zacznij od [1], następnie [1,1], następnie [1,2,1], a następnie [1,3 ,3,1] i tak dalej, przy czym każdy następny wiersz dopasowuje o 1 liczbę więcej niż poprzedni, zaczynając i kończąc na "1”, przy czym wszystkie liczby pomiędzy są sumą elementów poprzedniego rzędu po obu stronach "powyżej" tego, który obliczamy.

Możemy to błyskawicznie wygenerować jako listę list, a potem nigdy nie musimy obliczać wyrazów dwumianowych, ponieważ mamy tabelę przeglądową:

```
lut = [      [1],           // n=0
            [1,1],          // n=1
           [1,2,1],         // n=2
          [1,3,3,1],        // n=3
         [1,4,6,4,1],       // n=4
        [1,5,10,10,5,1],    // n=5
       [1,6,15,20,15,6,1]]  // n=6

function binomial(n,k):
  while(n >= lut.length):
    s = lut.length
    nextRow = new array(size=s+1)
    nextRow[0] = 1
    for(i=1, prev=s-1; i<s; i++):
      nextRow[i] = lut[prev][i-1] + lut[prev][i]
    nextRow[s] = 1
    lut.add(nextRow)
  return lut[n][k]
```

Więc co się tutaj dzieje? Najpierw deklarujemy tabelę przeglądową o rozmiarze wystarczająco dużym, aby pomieścić większość wyszukiwań. Następnie deklarujemy funkcję, która dostarczy nam potrzebnych wartości, i upewniamy się, że jeśli wymagana jest para <i>n/k</i>, której jeszcze nie ma w LUT, najpierw ją rozszerzymy. Nasza funkcja bazowa wygląda teraz tak:

```
function Bezier(n,t):
  sum = 0
  for(k=0; k<=n; k++):
    sum += binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
```


Doskonale. Oczywiście możemy dalej optymalizować. Do większości zastosowań związanych z grafiką komputerową nie potrzebujemy dowolnych krzywych (chociaż w tym elementarzu udostępnimy również kod dla dowolnych krzywych); potrzebujemy krzywych kwadratowych i sześciennych, a to oznacza, że możemy drastycznie uprościć kod:
```
function Bezier(2,t):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return mt2 + 2*mt*t + t2

function Bezier(3,t):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return mt3 + 3*mt2*t + 3*mt*t2 + t3
```

A teraz wiemy, jak zaprogramować funkcję bazową. Wspaniale.

</div>

Skoro już wiemy, jak wygląda funkcja bazowa, czas dodać magię, która sprawia, że krzywe Béziera są tak wyjątkowe: punkty kontrolne.
