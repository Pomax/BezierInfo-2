# Pochodne

Jest wiele przydatnych rzeczy, które można zrobić z krzywymi Béziera w oparciu o ich pochodne, a jedną z bardziej zabawnych obserwacji dotyczących krzywych Béziera jest to, że ich pochodne są w rzeczywistości również krzywymi Béziera. Faktycznie różniczkowanie krzywej Béziera jest stosunkowo proste, chociaż potrzebujemy trochę matematyki.

Najpierw spójrzmy na regułę pochodnej dla krzywych Béziera, która brzmi:

\[
  \textit{Bézier}'(n,t) = n \cdot \sum_{i=0}^{n-1} (b_{i+1}-b_i) \cdot \textit{Bézier}(n-1,t)_i
\]

którą możemy również zapisać (zauważając, że <i>b</i> w tym wzorze jest takie samo jak nasze wagi <i>w</i> i że <i>n</i> razy sumowanie jest takie samo jako suma, gdzie każdy wyraz jest mnożony przez <i>n</i>) jako:

\[
  \textit{Bézier}'(n,t) = \sum_{i=0}^{n-1} \textit{Bézier}(n-1,t)_i \cdot n \cdot (w_{i+1}-w_i)
\]

Lub, mówiąc zwykłym tekstem: pochodna krzywej Béziera n-tego stopnia to krzywa Béziera (n-1)-szego stopnia, z jednym wyrazem mniej i nowymi wagami w '<sub>0</sub>...w'<sub>n-1</sub> pochodzi z pierwotnych wag jako n(w<sub>i+1</sub> - w<sub>i</sub>). Zatem dla krzywej trzeciego stopnia z czterema wagami pochodna ma trzy nowe wagi: w'<sub>0</sub> = 3(w<sub>1</sub>-w <sub>0</sub>), w'<sub>1</sub> = 3(w<sub>2</sub>-w<sub>1</sub>) i w'<sub>2 </sub> = 3(w<sub>3</sub>-w<sub>2</sub>).

<div class="note">

### "Zwolnij, dlaczego to prawda?”

Czasami po prostu powiedzenie "to jest pochodna” jest miłe, ale możesz chcieć zobaczyć, dlaczego tak jest. W związku z tym spójrzmy na dowód tej pochodnej. Po pierwsze, wagi są niezależne od pełnej funkcji Béziera, więc pochodna obejmuje tylko pochodną wielomianowej funkcji bazowej. Więc znajdźmy jąstępnie przejdziemy do jej pocho:

\[
  B_{n,k}(t) \frac{d}{dt} = {n \choose k} t^k (1-t)^{n-k} \frac{d}{dt}
\]

Zastosowanie reguł [product](https://en.wikipedia.org/wiki/Product_rule) i [chain](https://en.wikipedia.org/wiki/Chain_rule) daje nam:

\[
\begin{array}{l}
  ... = {n \choose k} \left (
    k \cdot t^{k-1} (1-t)^{n-k} + t^k \cdot (1-t)^{n-k-1} \cdot (n-k) \cdot -1
  \right )
\end{array}
\]

Z czym trudno jest działać, więc rozwińmy to odpowiednio:

\[
\begin{array}{l}
  ... = \frac{kn!}{k!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k}
\end{array}
\]

Sztuką jest teraz zamienić to wyrażenie na coś, co ma współczynniki dwumianowe, więc chcemy skończyć z rzeczami, które wyglądają jak "x! przez y!(x-y)!". Jeśli uda nam się to zrobić w sposób uwzględniający wyrażenia <i>n-1</i> i <i>k-1</i>, będziemy na dobrej drodze.

\[
\begin{array}{l}
  ... = \frac{n!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k} \\

  ... = n \left (
    \frac{(n-1)!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)(n-1)!}{k!(n-k)!} t^k (1-t)^{n-1-k}
  \right ) \\

  ... = n \left (
    \frac{(n-1)!}{(k-1)!((n-1)-(k-1))!} t^{(k-1)} (1-t)^{(n-1)-(k-1)} - \frac{(n-1)!}{k!((n-1)-k)!} t^k (1-t)^{(n-1)-k}
  \right )
\end{array}
\]

I to jest pierwsza część wykonana: dwa komponenty w nawiasach są w rzeczywistości regularnymi wyrażeniami Béziera niższego rzędu:

\[\begin{array}{l}
  ... = n \left (
    \frac{x!}{y!(x-y)!} t^{y} (1-t)^{x-y} - \frac{x!}{k!(x-k)!} t^k (1-t)^{x-k}
  \right )
  ~,~with~x=n-1,~y=k-1
  \\
  ... = n \left ( B_{(n-1),(k-1)}(t) - B_{(n-1),k}(t) \right )
\end{array}
\]

Teraz zastosujemy to do naszych ważonych krzywych Béziera. Wypiszemy prosty wzór na krzywą, który widzieliśmy wcześniej, a następnie przejdziemy do jego pochodnej:

\[\begin{array}{lcl}
  \textit{Bézier}_{n,k}(t) &=& B_{n,0}(t) \cdot w_0 + B_{n,1}(t) \cdot w_1 + B_{n,2}(t) \cdot w_2 + B_{n,3}(t) \cdot w_3 + ... \\
  \textit{Bézier}_{n,k}(t) \frac{d}{dt} &=& n \cdot (B_{n-1,-1}(t) - B_{n-1,0}(t)) \cdot w_0 + \\
                               & & n \cdot (B_{n-1,0}(t) - B_{n-1,1}(t)) \cdot w_1 + \\
                               & & n \cdot (B_{n-1,1}(t) - B_{n-1,2}(t)) \cdot w_2 + \\
                               & & n \cdot (B_{n-1,2}(t) - B_{n-1,3}(t)) \cdot w_3 + \\
                               & & ...
\end{array}\]

Jeśli rozszerzymy to (z pewnym kolorem, aby pokazać, w jaki sposób wyrazy są wyrównane) i zmienimy kolejność wyrazów, zwiększając wartości dla <i>k</i>, zobaczymy, co następuje:

\[\begin{array}{lclc}
  n \cdot B_{n-1,-1}(t) \cdot w_0 &+& & \\
  n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 & + \\
  n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& n \cdot B_{n-1,RED[1]}(t) \cdot w_1 & + \\
  n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 & + \\
  ... &-& n \cdot B_{n-1,3}(t) \cdot w_3 & + \\
  ... & & &
\end{array}\]

Dwa z tych wyrazów odpadają: pierwszy wyraz odpada, ponieważ w podsumowaniu nie ma -1-szego wyrazu. Jako taki zawsze "nic nie wnosi”, więc możemy go bezpiecznie całkowicie zignorować w celu znalezienia funkcji pochodnej. Drugi wyraz jest ostatnim wyrazem w tym rozwinięciu: zawiera <i>B<sub>n-1,n</sub></i>. Ten wyraz miałby współczynnik dwumianowy [<i>i</i> wybierz <i>i+1</i>], który jest nieistniejącym współczynnikiem dwumianowym. Ponownie, ten wyraz nie wniósłby "nic”, więc możemy go również zignorować. Oznacza to, że pozostaje nam:

\[\begin{array}{lclc}
  n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 &+ \\
  n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& ~n \cdot B_{n-1,RED[1]}(t) \cdot w_1 &+ \\
  n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 &+ \\
  ...
\end{array}\]

A to tylko suma krzywych niższego rzędu:

\[
  \textit{Bézier}_{n,k}(t) \frac{d}{dt} = n \cdot B_{(n-1),BLUE[0]}(t) \cdot (w_1 - w_0)
                            + n \cdot B_{(n-1),RED[1]}(t) \cdot (w_2 - w_1)
                            + n \cdot B_{(n-1),MAGENTA[2]}(t) \cdot (w_3 - w_2)
                            ~+ ~...
\]

Możemy przepisać to jako normalne sumowanie i gotowe:

\[
  \textit{Bézier}_{n,k}(t) \frac{d}{dt} = \sum_{k=0}^{n-1} n \cdot B_{n-1,k}(t) \cdot (w_{k+1} - w_k)
                               = \sum_{k=0}^{n-1} B_{n-1,k}(t) \cdot \underset{\textit{derivative weights}}
                                 {\underbrace{n \cdot (w_{k+1} - w_k)}}
\]

</div>

Przepiszmy to w formie podobnej do naszej pierwotnej formuły, abyśmy mogli zobaczyć różnicę. Najpierw wymienimy nasz oryginalny wzór na krzywe Béziera, a następnie pochodną:

\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n}
                \underset{\textit{binomial term}}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{\textit{polynomial term}}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{\textit{weight}}{\underbrace{w_i}}
\]

\[
  \textit{Bézier}'(n,t) = \sum_{i=0}^{k}
                \underset{\textit{binomial term}}{\underbrace{\binom{k}{i}}}
                \cdot\
                \underset{\textit{polynomial term}}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                \cdot\
                \underset{\textit{derivative weight}}{\underbrace{n \cdot (w_{i+1} - w_i)}}
                ~,~\textit{with } k=n-1
\]


Jakie są różnice? Jeśli chodzi o rzeczywistą krzywą Béziera, praktycznie nic! Obniżyliśmy kolejność (zamiast <i>n</i>, teraz jest to <i>n-1</i>), ale to wciąż ta sama funkcja Béziera. Jedyna prawdziwa różnica polega na tym, jak zmieniają się wagi, gdy wyprowadzamy funkcję krzywej. Jeśli mamy cztery punkty A, B, C i D, to pochodna będzie miała trzy punkty, druga pochodna dwa, a trzecia pochodna jeden:

\[ \begin{array}{llll}
  B(n,t),    &        & w = \{A,B,C,D\} \\
  B'(n,t),   & n = 3, & w' = \{A',B',C'\}    &= \{3 \cdot (B-A), {~} 3 \cdot (C-B), {~} 3 \cdot (D-C)\} \\
  B''(n,t),  & n = 2, & w'' = \{A'',B''\}    &= \{2 \cdot (B'-A'), {~} 2 \cdot (C'-B')\} \\
  B'''(n,t), & n = 1, & w''' = \{A'''\} &= \{1 \cdot (B''-A'')\}
\end{array} \]

Możemy wykonywać tę sztuczkę tak długo, jak długo mamy więcej niż jedną wagę. Gdy zostanie nam jedna waga, w następnym kroku zobaczymy <i>k = 0</i>, a wynik naszego sumowania "funkcji Béziera” wynosi zero, ponieważ w ogóle nic nie dodajemy. Jako taka krzywa kwadratowa nie ma drugiej pochodnej, krzywa sześcienna nie ma trzeciej pochodnej i uogólniając: krzywa <i>n-tego</i> rzędu ma <i>n-1</i> (znaczące) pochodne, przy czym każda kolejna pochodna wynosi zero.
