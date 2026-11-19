# Krzywizny Béziera jako operacje macierzowe

Możemy również przedstawić krzywe Béziera jako operacje macierzowe, wyrażając wzór Béziera jako wielomianową funkcję bazową i macierz współczynników, a rzeczywiste współrzędne jako macierz. Przyjrzyjmy się, co to oznacza dla krzywej sześciennej, używając P<sub>...</sub> w odniesieniu do wartości współrzędnych "w jednym lub kilku wymiarach”:

\[
B(t) = P_1 \cdot (1-t)^3 + P_2 \cdot 3 \cdot (1-t)^2 \cdot t + P_3 \cdot 3 \cdot (1-t) \cdot t^2 + P_4 \cdot t^3
\]

Pomijając na chwilę nasze rzeczywiste współrzędne, mamy:

\[
B(t) = (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\]

Możemy to zapisać jako sumę czterech wyrażeń:

\[
  \begin{matrix}
   ... & = & (1-t)^3 \\
     & + & 3 \cdot (1-t)^2 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t^2 \\
     & + & t^3 \\
  \end{matrix}
\]

I możemy rozwinąć te wyrażenia:

\[
  \begin{matrix}
   ... & = & (1-t) \cdot (1-t) \cdot (1-t) & = & -t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & 3 \cdot (1-t) \cdot (1-t) \cdot t & = & 3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t \cdot t & = & -3 \cdot t^3 + 3 \cdot t^2 \\
     & + & t \cdot t \cdot t & = & t^3 \\
  \end{matrix}
\]

Ponadto możemy jasno określić wszystkie czynniki 1 i 0:

\[
  \begin{matrix}
   ... & = & -1 \cdot t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & +3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t + 0 \\
     & + & -3 \cdot t^3 + 3 \cdot t^2 + 0 \cdot t + 0 \\
     & + & +1 \cdot t^3 + 0 \cdot t^2 + 0 \cdot t + 0 \\
  \end{matrix}
\]

I *to*, możemy postrzegać jako serię czterech operacji macierzowych:

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-1 \\ 3 \\ -3 \\ 1\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}3 \\ -6 \\ 3 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-3 \\ 3 \\ 0 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}1 \\ 0 \\ 0 \\ 0\end{bmatrix}
\]

Jeśli skompaktujemy to do pojedynczej operacji macierzowej, otrzymamy:

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}
      -1 &  3 & -3 & 1 \\
       3 & -6 &  3 & 0 \\
      -3 &  3 &  0 & 0 \\
       1 &  0 &  0 & 0
    \end{bmatrix}
\]

Ten rodzaj reprezentacji w bazie wielomianowej jest zwykle zapisywany z podstawami w porządku rosnącym, co oznacza, że musimy odwrócić naszą macierz `t` w poziomie, a naszą dużą macierz "mieszającą” do góry nogami:

\[
  \begin{bmatrix}1 & t & t^2 & t^3\end{bmatrix} \cdot \begin{bmatrix}
       1 &  0 &  0 & 0 \\
      -3 &  3 &  0 & 0 \\
       3 & -6 &  3 & 0 \\
      -1 &  3 & -3 & 1
    \end{bmatrix}
\]

I na koniec możemy dodać nasze oryginalne współrzędne jako pojedynczą trzecią macierz:

\[
  B(t) = \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Możemy wykonać tę samą sztuczkę dla krzywej kwadratowej, w którym to przypadku otrzymamy:

\[
  B(t) = \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]

Jeśli wstawimy wartość `t`, a następnie pomnożymy macierze, otrzymamy dokładnie takie same wartości, jak przy obliczaniu oryginalnej funkcji wielomianowej lub przy obliczaniu krzywej za pomocą progresywnej interpolacji liniowej.

**Więc po co mielibyśmy zawracać sobie głowę macierzami?** Reprezentacje macierzowe pozwalają nam odkryć rzeczy o funkcjach, które inaczej trudno byłoby stwierdzić. Okazuje się, że krzywe tworzą [macierze trójkątne](https://en.wikipedia.org/wiki/Triangular_matrix) i mają wyznacznik równy iloczynowi rzeczywistych współrzędnych, których używamy dla naszej krzywej. Są również odwracalne, co oznacza, że istnieje [mnóstwo właściwości](https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem), które są spełnione. Oczywiście główne pytanie brzmi: "dlaczego jest to dla nas teraz przydatne?”, a odpowiedź brzmi, że nie jest to *natychmiast* przydatne, ale zobaczysz kilka przypadków, w których pewne właściwości krzywej można obliczyć za pomocą funkcji manipulacji lub poprzez sprytne użycie macierzy, a czasami podejście matrycowe może być (drastycznie) szybsze.

Więc na razie pamiętajmy, że możemy w ten sposób reprezentować krzywe i przejdźmy dalej.
