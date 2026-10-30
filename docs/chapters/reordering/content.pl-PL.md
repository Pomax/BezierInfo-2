# Obniżanie i podnoszenie rzędu krzywej

Jedną z interesujących właściwości krzywych Béziera jest to, że krzywą rzędu *n-tego* zawsze można doskonale przedstawić za pomocą krzywej *(n+1)-szego* rzędu, podając punkty kontrolne specyficzne dla krzywej wyższego rzędu.

Jeśli mamy krzywą z trzema punktami, możemy utworzyć krzywą z czterema punktami, która dokładnie odwzorowuje pierwotną krzywą. Najpierw nadajemy mu te same punkty początkowe i końcowe, a dla dwóch punktów kontrolnych wybieramy `1/3 startowego + 2/3 kontrolnego` i `2/3 kontrolnego + 1/3 końcowego`. Teraz mamy dokładnie taką samą krzywą jak poprzednio, z wyjątkiem tego, że jest ona reprezentowana jako krzywa sześcienna, a nie kwadratowa.

Ogólna zasada podnoszenia *krzywej rzędu *n* do krzywej rzędu *n+1* jest następująca (zauważmy, że wagi początkowe i końcowe są takie same jak wagi początkowe i końcowe dla starej krzywej):

\[
  \textit{Bézier}(k,t) = \sum_{i=0}^{k}
                \underset{\textit{binomial term}}{\underbrace{\binom{k}{i}}}
                \cdot\
                \underset{\textit{polynomial term}}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                ~\cdot \
                \underset{\textit{new weights}}{\underbrace{\left ( \frac{(k-i) \cdot w_i + i \cdot w_{i-1}}{k} \right )}}
  ~,~\textit{with}~k = n+1~\textit{and}~w_{i-1}=0~when~i = 0
\]

Jednak ta reguła ma również bezpośrednią konsekwencję, że **nie można** ogólnie bezpiecznie obniżyć krzywej od *n-tego* rzędu do *(n-1)-szego* rzędu, ponieważ punktów kontrolnych nie da się "rozerwać” na czysto. Możemy spróbować, ale uzyskana krzywa nie będzie identyczna z oryginalną, a w rzeczywistości może wyglądać zupełnie inaczej.

Istnieje jednak zaskakująco dobry sposób na zapewnienie, że krzywa niższego rzędu wygląda "tak blisko, jak to możliwe” oryginalnej krzywej: możemy zoptymalizować "odległość najmniejszych kwadratów” między oryginalną krzywą a krzywą niższego rzędu, w pojedynczą operację (również wyjaśniona na [Sirver's Castle](https://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/)). Jednak, aby ją użyć, będziemy musieli wykonać trochę obliczeń, a następnie przełączyć się na algebrę liniową. Jak wspomniano w części dotyczącej reprezentacji macierzowych, niektóre rzeczy można wykonać znacznie łatwiej za pomocą macierzy niż za pomocą funkcji rachunku różniczkowego i to jest jedna z tych rzeczy. Więc chodźmy!

Zaczynamy od wzięcia standardowej funkcji Béziera i lekkiego jej skondensowania:

\[
  \textit{Bézier}(n,t)
  =
  \sum_{i=0}^{n} w_i B^n_i(t)
  \textit{, where }
  B^n_i(t)
  =
  \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i}
\]

Następnie stosujemy jedną z tych głupich (właściwie bardzo przydatnych) sztuczek z rachunku różniczkowego: ponieważ nasza wartość `t` jest zawsze między zerem a jedynką (włącznie), wiemy, że `(1-t)` plus `t` zawsze sumuje się do 1. W związku z tym możemy wyrazić dowolną wartość jako sumę `t` i `1-t`:

\[
  x = 1 x = \left ( (1-t) + t \right ) x = (1-t) x + t x = x (1-t) + x t
\]

Tak więc, z tą pozornie trywialną obserwacją, przepisujemy tę funkcję Béziera, dzieląc ją na sumę składowych `(1-t)` i `t`:

\[
  \begin{aligned}
    \textit{Bézier}(n,t) &= (1-t) B(n,t) + t B(n,t) \\
                &= \sum_{i=0}^{n} w_i (1 - t) B^n_i(t) + \sum_{i=0}^{n} w_i t B^n_i(t)
  \end{aligned}
\]

Jak na razie dobrze. Teraz, aby zobaczyć, dlaczego to zrobiliśmy, wypiszmy części `(1-t)` i `t` i zobaczmy, co nam to da. Obiecuję, to nabierze sensu. Zaczynamy od `(1-t)`:

\[
  \begin{aligned}
    (1 - t) B^n_i(t) &= (1-t) \frac{n!}{(n-i)!i!}  (1-t)^{n-i} t^i \\
                     &= \frac{n+1-i}{n+1} \frac{(n+1)!}{(n+1-i)!i!} (1-t)^{n+1-i} t^i \\
                     &= \frac{k-i}{k} \frac{k!}{(k-i)!i!} (1-t)^{k-i} t^i, \textit{where } k = n + 1 \\
                     &= \frac{k-i}{k} B^k_i(t)
  \end{aligned}
\]

Więc używając tej pozornie głupiej sztuczki, możemy nagle wyrazić część naszej funkcji Béziera n-tego rzędu za pomocą funkcji Béziera (n+1)-szego rzędu. A to brzmi jak podniesienie rzędu krzywej! Oczywiście musimy być w stanie powtórzyć tę sztuczkę dla części `t`, ale to nie problem:

\[
  \begin{aligned}
    t B^n_i(t) &= t \frac{n!}{(n-i)!i!} (1-t)^{n-i} t^i \\
               &= \frac{i+1}{n+1} \frac{(n+1)!}{((n+1)-(i+1))!(i+1)!} (1-t)^{(n+1)-(i+1)} t^{i+1} \\
               &= \frac{i+1}{k} \frac{k!}{(k-(i+1))!(i+1)!} (1-t)^{k-(i+1)} t^{i+1}, \textit{where } k = n + 1 \\
               &= \frac{i+1}{k} B^k_{i+1}(t)
  \end{aligned}
\]

Tak więc, po zmianie obu wyrażeń z wyrażenia rzędu `n` na wyrażenie rzędu `(n+1)`, możemy je ponownie złożyć. Teraz, gdy funkcja rzędu `n` miała sumowanie od 0 do `n`, funkcja rzędu `n+1` używa sumowania od 0 do `n+1`, ale nie powinno to stanowić problemu tak długo, jak możemy dodać kilka nowych wyrazów, które "nic nie wnoszą”. W następnej sekcji dotyczącej pochodnych omówiono, dlaczego "wyrazy wyższe niż ma dwumian” i "wyrazy niższe od zera” "nic nie wnoszą”. Tak długo, jak możemy dodawać wyrazy, które mają taką samą postać jak wyrazy, których potrzebujemy, możemy po prostu uwzględnić je w sumowaniu, będą tam siedzieć i nic nie robić, a wynikowa funkcja pozostaje identyczna z krzywą niższego rzędu.

Zróbmy to:

\[
  \begin{aligned}
    Bézier(n,t) &= \sum_{i=0}^{n+1} w_i (1 - t) B^n_i(t) + \sum_{i=0}^{n+1} w_i t B^n_i(t) \\
                &= \sum_{i=0}^{n+1} w_i \frac{k-i}{k} B^k_i(t) + \sum_{i=0}^{n+1} w_i \frac{i+1}{k} B^k_{i+1}(t), \textit{where } k = n + 1 \\
                &= \sum_{i=0}^{n+1} w_i \frac{k-i}{k} B^k_i(t) + \sum_{i=0}^{n+1} p_{i-1} \frac{i}{k} B^k_i(t) \\
                &= \sum_{i=0}^{n+1} \left ( w_i \frac{k-i}{k} + p_{i-1} \frac{i}{k} \right ) B^k_i(t) \\
                &= \sum_{i=0}^{n+1} \left ( w_i (1-s) + p_{i-1} s \right ) B^k_i(t), \textit{where } s = \frac{i}{k}
  \end{aligned}
\]

I tu przechodzimy od rachunku różniczkowego do algebry liniowej i macierzy: możemy teraz wyrazić tę zależność między Bézier(n,t) i Bézier(n+1,t) jako bardzo proste mnożenie macierzy:

\[
  M B_n = B_k
\]

gdzie macierz **M** jest macierzą `n+1` na `n` i wygląda następująco:

\[
M =
\left [
\begin{matrix}
     1      &        0      &        .      &        .      &  .  &       .       &         .       & . \\
\frac{1}{k} & \frac{k-1}{k} &        0      &        .      &  .  &       .       &         0       & . \\
     0      & \frac{2}{k}   & \frac{k-2}{k} &        0      &  .  &       .       &         .       & . \\
     .      &        0      & \frac{3}{k}   & \frac{k-3}{k} &  0  &       .       &         .       & . \\
     .      &        .      &        0      &       ...     & ... &       0       &         .       & . \\
     .      &        .      &        .      &        0      & ... &      ...      &         0       & . \\
     .      &        .      &        .      &        .      &  0  & \frac{n-1}{k} & \frac{k-n+1}{k} & 0 \\
     .      &        0      &        .      &        .      &  .  &       0       & \frac{n}{k}     & \frac{k-n}{k} \\
     .      &        .      &        .      &        .      &  .  &       .       &         0       & 1
\end{matrix}
\right ]
\]

To może wyglądać nieporęcznie, ale tak naprawdę to tylko macierz z większością zer, z bardzo prostym ułamkiem na przekątnej i jeszcze prostszym ułamkiem na lewo od niego. Pomnożenie listy współrzędnych przez tę macierz oznacza, że możemy wstawić wynikowe przekształcone współrzędne do funkcji o jeden rząd wyższej i otrzymać identycznie wyglądającą krzywą.

Nieźle!

Równie interesujące jest jednak to, że po ustaleniu tej operacji macierzowej możemy teraz użyć niewiarygodnie potężnego i absurdalnie prostego sposobu, aby znaleźć "najlepiej dopasowany” sposób odwrócenia operacji, zwany [równaniem normalnym](https://mathworld.wolfram.com/NormalEquation.html). Minimalizuje sumę kwadratów różnic między jednym zestawem wartości a innym zestawem wartości. W szczególności, jeśli możemy to wyrazić jako pewną funkcję **A x = b**, możemy jej użyć. A tak się składa, że właśnie z tym mamy do czynienia, więc:

\[
\begin{aligned}
  M B_n &= B_k \\
  (M^T M) B_n &= M^T B_k\\
  (M^T M)^{-1} (M^T M) B_n &= (M^T M)^{-1} M^T B_k \\
  I B_n &= (M^T M)^{-1} M^T B_k \\
  B_n &= (M^T M)^{-1} M^T B_k
\end{aligned}
\]

Podjęte tutaj kroki to:

1. Mamy funkcję w postaci, z którą można zastosować równanie normalne, więc
2. zastosuj równanie normalne!
3. Następnie chcemy skończyć z B<sub>n</sub> po lewej stronie, więc zaczynamy od lewej - mnożymy obie strony tak, że skończymy z dużą ilością rzeczy po lewej stronie, które upraszczają się do "czynnika 1”, który w matematyce macierzowej jest [macierzą tożsamości](https://en.wikipedia.org/wiki/Identity_matrix).
4. Faktycznie, mnożąc w lewo przez odwrotność tego, co już tam było, skutecznie "sprowadziliśmy do zera” (ale tak naprawdę do jedności) ten duży, nieporęczny blok w macierzy tożsamości **I**. Więc zastępujemy bałagan przez **I**, a następnie
5. ponieważ mnożenie przez macierz tożsamości nic nie daje (podobnie jak mnożenie przez 1 nic nie daje w algebrze regularnej), po prostu je odrzucamy.

I gotowe: mamy teraz wyrażenie, które pozwala nam aproksymować krzywą `n+1-szego1` rzędu krzywą niższego rzędu `n`. Nie będzie to dokładne dopasowanie, ale zdecydowanie najlepsze przybliżenie. Zaimplementujmy więc te zasady podnoszenia i obniżania kolejności krzywej do (pół)losowej krzywej, korzystając z poniższej grafiki. Wybierz szkic, który ma ruchome punkty kontrolne, i naciskaj klawisze strzałek w górę lub w dół, aby zwiększyć lub zmniejszyć kolejność krzywych.


<graphics-element title="Krzywa Béziera o zmiennego rzędu" src="./reorder.js">
  <button class="raise">raise</button>
  <button class="lower">lower</button>
</graphics-element>
