# Długość łuku

Jak długa jest krzywa Béziera? Jak się okazuje, nie jest to łatwe pytanie, ponieważ odpowiedź wymaga matematyki, której - podobnie jak znajdowanie pierwiastków - generalnie nie można rozwiązać w tradycyjny sposób. Jeśli mamy krzywą parametryczną z *f<sub>x</sub>(t)* i *f<sub>y</sub>(t)*, 
to długość krzywej mierzona od punktu początkowego do pewnego punktu *t = z* 
jest obliczana przy użyciu następującego, pozornie prostego (choć nieco przytłaczającego) wzoru:

\[
  \int_{0}^{z}\sqrt{f_x'(t)^2+f_y'(t)^2} dt
\]

lub, częściej zapisywany przy użyciu notacji Leibnitza jako:

\[
  \textit{length} = \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
\]

Wzór ten mówi, że długość krzywej parametrycznej jest w rzeczywistości równa **obszarowi** pod funkcją, która wygląda bardzo podobnie do reguły Pitagorasa do obliczania przekątnej trójkąta prostokątnego. Brzmi to całkiem prosto, prawda? Niestety, nie jest to proste... przechodząc od razu do sedna: dla krzywych kwadratowych wzór ten generuje [nieporęczne obliczenia](https://www.wolframalpha.com/input/?i=antiderivative+for+sqrt((2*(1-t)*t*B+%2B+t%5E2*C)%27%5E2+%2B+(2*(1-t)*t*E)%27%5E2)&incParTime=true), a my po prostu nie będziemy implementować rzeczy w ten sposób. W przypadku sześciennych krzywych Béziera sprawy stają się jeszcze bardziej zabawne, ponieważ nie ma rozwiązania "w postaci zamkniętej", co oznacza, że ze względu na sposób działania rachunku różniczkowego nie ma ogólnej formuły, która pozwala obliczyć długość łuku. Pozwolę sobie to powtórzyć, ponieważ jest to dość istotne: ***Dla sześciennych i wyższych krzywych Béziera nie ma sposobu na rozwiązanie tej funkcji, jeśli chcesz jej użyć "dla wszystkich możliwych współrzędnych"***.

Serio: [To nie może być zrobione](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem).

Więc ponownie zwracamy się do metod numerycznych. Metodą, której się tutaj przyjrzymy, jest [kwadratura Gaussa](https://www.youtube.com/watch?v=unWguclP-Ds&feature=BFa&list=PLC8FC40C714F5E60F&index=1). To przybliżenie jest naprawdę sprytną sztuczką, ponieważ dla dowolnego wielomianu *n-tego* stopnia bardzo skutecznie znajduje przybliżone wartości całki. Szczegółowe wyjaśnienie tej procedury znacznie wykracza poza zakres tej strony, więc jeśli chcesz dowiedzieć się, dlaczego to działa, mogę polecić wykład wideo na temat procedury z University of South Florida, do którego link znajduje się w tym akapicie. Ogólne rozwiązanie, którego szukamy, jest następujące:

\[
  \int_{-1}^{1}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
  =
  \int_{-1}^{1}f(t) dt
  \simeq
  \left [
    \underset{\textit{strip 1}}{ \underbrace{ C_1 \cdot f\left(t_1\right) }}
    ~+~...
    ~+~\underset{\textit{strip n}}{ \underbrace{ C_n \cdot f\left(t_n\right) }}
  \right ]
  =
  \underset{\textit{strips 1 through n}}{
    \underbrace{
      \sum_{i=1}^{n}{
        C_i \cdot f\left(t_i\right)
      }
    }
  }
\]

Mówiąc zwykłym tekstem: funkcję całkową można zawsze traktować jako sumę (nieskończonej) liczby (nieskończenie cienkich) prostokątnych pasków znajdujących się "pod” wykreślonym wykresem funkcji. Aby zilustrować tę ideę, poniższy wykres przedstawia całkę dla funkcji sinusoidalnej. Im więcej pasków użyjemy (i oczywiście im więcej użyjemy, tym będą cieńsze), tym bardziej zbliżymy się do rzeczywistego obszaru pod krzywą, a tym samym lepsze przybliżenie:

<div class="figure">
  <graphics-element title="A function's approximated integral" src="./draw-slices.js" data-steps="10"></graphics-element>
  <graphics-element title="A better approximation" src="./draw-slices.js" data-steps="24"></graphics-element>
  <graphics-element title="An even better approximation" src="./draw-slices.js" data-steps="99"></graphics-element>
</div>

Teraz, nieskończenie wiele wyrazów do zsumowania i nieskończenie cienkie prostokąty nie są czymś, z czym komputery mogą pracować, więc zamiast tego przybliżymy nieskończone sumowanie, używając sumy skończonej liczby "tylko cienkich” prostokątnych pasków. Tak długo, jak używamy wystarczająco dużej liczby wystarczająco cienkich prostokątnych pasków, da nam to przybliżenie, które jest bardzo zbliżone do rzeczywistej wartości.

Sztuczka polega więc na wymyśleniu użytecznych prostokątnych pasków. Naiwnym sposobem jest po prostu utworzenie *n* pasków, wszystkie o tej samej szerokości, ale jest o wiele lepszy sposób, używając specjalnych wartości dla *C* i *f(t)* w zależności od wartości *n*, co wskazuje ile pasków użyjemy i nazywa się to kwadraturą Legendre-Gaussa.

To podejście wykorzystuje paski, które *nie* są rozmieszczone równomiernie, ale zamiast tego rozmieszcza je w specjalny sposób oparty na opisie funkcji jako wielomianu (im więcej pasków, tym dokładniejszy wielomian), a następnie obliczeniu dokładnej całki dla tego wielomianu. Zasadniczo wykonujemy obliczenia długości łuku na spłaszczonej krzywej, ale spłaszczamy ją w oparciu o interwały narzucone przez rozwiązanie Legendrea-Gaussa.

<div class="note">

Zauważ, że jednym z wymagań dla podejścia, którego użyjemy, jest to, że całka musi przebiegać od -1 do 1. To nie jest dobre, ponieważ mamy do czynienia z krzywymi Béziera, a długość odcinka krzywej dotyczy wartości, które biegną od 0 do "jakiejś wartości mniejszej lub równej 1” (nazwijmy tę wartość *z*). Na szczęście możemy dość łatwo przekształcić dowolny przedział całkowy w dowolny inny przedział całkowy, przesuwając i skalując dane wejściowe. W ten sposób otrzymujemy:

\[
\begin{array}{l}
  \int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
  \\
  \simeq \
  \frac{z}{2} \cdot \left [ C_1 \cdot f\left(\frac{z}{2} \cdot t_1 + \frac{z}{2}\right)
                            + ...
                            + C_n \cdot f\left(\frac{z}{2} \cdot t_n + \frac{z}{2}\right)
                    \right ]
  \\
  = \
  \frac{z}{2} \cdot \sum_{i=1}^{n}{C_i \cdot f\left(\frac{z}{2} \cdot t_i + \frac{z}{2}\right)}
\end{array}
\]

Może to wyglądać na nieco bardziej skomplikowane, ale ułamek obejmujący *z* jest liczbą stałą, więc sumowanie i szacowanie wartości *f(t)* są nadal dość proste.

Czego zatem potrzebujemy do wykonania tego obliczenia? 
Po pierwsze, będziemy potrzebować jawnego wzoru na *f(t)*, ponieważ ta notacja pochodna 
jest przydatna na papierze, ale nie wtedy, gdy musimy ją zaimplementować. 
Musimy również wiedzieć, jakie powinny być wartości *C<sub>i</sub>* i *t<sub>i</sub>*. 
Na szczęście jest to mniej pracy, ponieważ w rzeczywistości dostępnych jest wiele tabel, 
które podają te wartości dla dowolnego *n*, więc jeśli chcemy przybliżyć naszą całkę 
za pomocą tylko dwóch składników (co jest naprawdę trochę niską wartością), 
to [te tabele](./legendre-gauss.html) powiedzą nam, że dla *n=2* musimy użyć 
następujących wartości:

\[
\begin{array}{l}
C_1 = 1 \\
C_2 = 1 \\
t_1 = - \frac{1}{\sqrt{3}} \\
t_2 = + \frac{1}{\sqrt{3}}
\end{array}
\]

Co oznacza, że aby aproksymować całkę, musimy podstawić te wartości do funkcji przybliżonej, która daje nam:

\[
\int_{0}^{z}\sqrt{ \left (dx/dt \right )^2+\left (dy/dt \right )^2} dt
≃
\frac{z}{2} \cdot \left [ f\left( \frac{z}{2} \cdot \frac{-1}{\sqrt{3}} + \frac{z}{2} \right)
              + f\left( \frac{z}{2} \cdot \frac{1}{\sqrt{3}} + \frac{z}{2} \right)
          \right ]
\]

Możemy to łatwo zaprogramować, pod warunkiem, że mamy dostępne *f(t)*, co robimy, ponieważ znamy pełny opis funkcji krzywej Béziera B<sub>x</sub>(t) i B<sub>y</sub>(t).

</div>

Jeśli użyjemy wartości Legendrea-Gaussa dla naszych wartości *C* (grubość każdego paska) i *t* (położenie każdego paska), możemy określić przybliżoną długość krzywej Béziera, obliczając sumę Legendrea-Gaussa. 
Poniższa grafika przedstawia krzywą sześcienną z obliczonymi długościami.
Śmiało zmień krzywą, aby zobaczyć, jak zmienia się jej długość. Jedną rzeczą, którą warto spróbować, jest sprawdzenie, czy możesz zrobić linię prostą i sprawdzić, czy długość odpowiada oczekiwaniom. Co jeśli utworzysz linię z punktami kontrolnymi na zewnątrz i punktami początkowymi/końcowymi po wewnętrznej stronie?

<graphics-element title="Długość łuku dla krzywej Béziera" src="./arclength.js"></graphics-element>
