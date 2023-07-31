# Dopasowanie krzywej

Biorąc poprzednią sekcję, jedno pytanie, które możesz zadać, brzmi: "a co, jeśli nie chcę zgadywać wartości `t`?”. W końcu wiele pakietów graficznych automatycznie dopasowuje krzywe, więc jak możemy to zaimplementować w sposób, który sam znajdzie dla nas rozsądne wartości `t`?

I tak naprawdę jest to tylko wariacja na temat pytania "jak uzyskać krzywą przechodzącą przez te punkty X?", więc spójrzmy na to. W szczególności spójrzmy na odpowiedź: "dopasowanie krzywej”. Jest to w rzeczywistości dość bogata dziedzina geometrii, mająca zastosowanie do wszystkiego, od modelowania danych, przez abstrakcję ścieżek, po "rysowanie”, więc istnieje wiele sposobów dopasowania krzywej, ale przyjrzymy się jednemu z najczęstszych podejść: coś, co nazywa się
[metodą najmniejszych kwadratów](https://en.wikipedia.org/wiki/Least_squares) 
i [regresją wielomianową](https://en.wikipedia.org/wiki/Polynomial_regression). 
W tym podejściu patrzymy na liczbę punktów, które mamy w naszym zbiorze danych, 
z grubsza określamy, jaka byłaby odpowiednia kolejność dla krzywej, 
która pasowałaby do tych punktów, a następnie zajmujemy się pytaniem 
"biorąc pod uwagę, że chcemy n-tego rzędu krzywą, jakie współrzędne możemy znaleźć, 
aby nasza krzywa była jak najmniej "odchylona”?”.

Teraz, istnieje wiele sposobów określenia, jak "daleko od" krzywej są punkty, 
i tam właśnie pojawia się termin "najmniejszych kwadratów”. 
Najpopularniejszym narzędziem w przyborniku jest minimalizowanie kwadratowej 
odległości między każdym punktem, który mamy, 
a odpowiadającym mu punktem na krzywej, który ostatecznie "wymyślamy”. 
Krzywa z dopasowanym dopasowaniem będzie miała zerową odległość między tymi dwoma, 
a źle dopasowana będzie miała niezerowe odległości między każdą taką parą. 
To wykonalna metryka. Możesz się zastanawiać, dlaczego musielibyśmy podnieść do kwadratu, 
zamiast po prostu upewnić się, że odległość jest wartością dodatnią 
(tak, że całkowity błąd można łatwo obliczyć, po prostu sumując odległości), 
a odpowiedź naprawdę brzmi "ponieważ tak jest nieco lepiej". 
W sieci jest mnóstwo literatury, jeśli chcesz zgłębić konkretne zalety metryki 
błędu najmniejszych kwadratów w porównaniu z metryką najmniejszego błędu bezwzględnego, 
ale to <em>znacznie</em> wykracza poza zakres tego materiału.

Przyjrzyjmy się więc, co otrzymamy pod względem dopasowania krzywej, 
jeśli zaczniemy od pomysłu wykonania dopasowania Béziera metodą najmniejszych kwadratów. 
Zamierzamy postępować zgodnie z procedurą podobną do tej opisanej przez 
Jima Herolda w jego ["Dopasowanie Béziera metodą najmniejszych kwadratów”](https://web.archive.org/web/20180403213813/http://jimherold.com/2012/04/20/least-squares-bezier-fit/https://web.archive.org/web/20180403213813/http://jimherold.com/2012/04/20/least-squares-bezier-fit/)
i zakończyć ładnymi interaktywnymi grafikami do dopasowania krzywej.

Zanim zaczniemy, użyjemy krzywej w postaci macierzowej. W [sekcji o macierzach](#matrix) wspomniałem, że niektóre rzeczy są łatwiejsze, jeśli użyjemy reprezentacji macierzowej krzywej Béziera zamiast jej postaci rachunku różniczkowego, i to jest jedna z tych rzeczy.

W związku z tym pierwszym krokiem w procesie jest wyrażenie naszej krzywej Béziera jako macierzy potęg/współczynników/współrzędnych **T x M x C** poprzez rozwinięcie funkcji Béziera.

<div class="note">

## Powrót do reprezentacji macierzowej

Przepisanie funkcji Béziera do postaci macierzowej jest dość łatwe, jeśli najpierw rozwiniesz funkcję, a następnie ułożysz je w postać wielowierszową, gdzie każda linia odpowiada potędze t, a każda kolumna odpowiada określonemu współczynnikowi. Najpierw rozwijamy funkcję:

\[
  \begin{aligned}
    B_{\textit{quadratic}} & = a (1-t)^2 + 2 b (1-t) t + c t^2 \\
                  & = a - 2at + at^2 + 2bt - 2bt^2 + ct^2
  \end{aligned}
\]

A potem (trywialnie) zmieniamy kolejność wyrazów w wielu wierszach:

\[
  \begin{aligned}
    B_{\textit{quadratic}} &=& a      &         &     \\
                  & & - 2at  & + 2bt   &     \\
                  & & + at^2 & - 2bt^2 & + ct^2
  \end{aligned}
\]

Ta reorganizacja ma "czynniki t” w każdym wierszu (pierwszy wiersz to t czyli "1”, drugi wiersz to t¹ czyli "t”, 
trzeci wiersz to t²) i "współczynnik” w każdej kolumnie 
(pierwsza kolumna to wszystkie wyrazy zawierające "a”, 
druga trzecia wszystkie wyrazy zawierające "b”, wszystkie wyrazy zawierające "c”).

Przy takim układzie możemy łatwo rozłożyć to jako mnożenie macierzy:

\[
  \begin{aligned}
    B_{\textit{quadratic}} &= T \cdot M \cdot C
      =
      \begin{bmatrix}1 & t & t^2 \end{bmatrix}
      \cdot
      \begin{bmatrix}
         a &+&  0 &+& 0 \\
       -2a &+& 2b &+& 0 \\
         a &+&-2b &+& c
      \end{bmatrix}
      =
      \begin{bmatrix}1 & t & t^2 \end{bmatrix}
      \cdot
      \begin{bmatrix}
         1 & 0 & 0 \\
        -2 & 2 & 0 \\
         1 &-2 & 1
      \end{bmatrix}
      \cdot
      \begin{bmatrix}a  \\ b \\ c \end{bmatrix}
  \end{aligned}
\]

Oczywiście możemy zrobić to samo dla krzywej sześciennej. Znamy funkcję bazową dla sześciennych:

\[
  \begin{aligned}
    B_{\textit{cubic}} & = & a(1-t)^3 + 3b(1-t)^2 t + 3c(1-t)t^2 + dt^3
  \end{aligned}
\]

Więc piszemy rozwinięcie i przestawiamy:

\[
  \begin{aligned}
    B_{\textit{cubic}} & = & a        &          &          &   \\
              &   & - 3at    & + 3bt    &          &   \\
              &   & + 3at^2  & - 6bt^2  & +3ct^2   &   \\
              &   & - at^3   & + 3bt^3  & -3ct^3   & + dt^3
  \end{aligned}
\]

Które możemy następnie rozłożyć:

\[
  \begin{aligned}
    B_{\textit{cubic}} &= T \cdot M \cdot C =
      \begin{bmatrix}1 & t & t^2 & t^3 \end{bmatrix}
      \cdot
      \begin{bmatrix}
        1 & 0 & 0 & 0 \\
       -3 & 3 & 0 & 0 \\
        3 &-6 & 3 & 0 \\
       -1 & 3 &-3 & 1
      \end{bmatrix}
      \cdot
      \begin{bmatrix}a  \\ b \\ c \\ d \end{bmatrix}
  \end{aligned}
\]

i oczywiście możemy to zrobić również dla krzywych kwartycznych 
(pomijając krok rozwinięcia):

\[
  \begin{aligned}
    B_{\textit{quartic}} &= T \cdot M \cdot C =
      \begin{bmatrix}1 & t & t^2 & t^3 & t^4 \end{bmatrix}
      \cdot
      \begin{bmatrix}
        1 &   0 &   0 &  0 & 0 \\
       -4 &   4 &   0 &  0 & 0 \\
        6 & -12 &   6 &  0 & 0 \\
       -4 &  12 & -12 &  4 & 0 \\
        1 &  -4 &   6 & -4 & 1
      \end{bmatrix}
      \cdot
      \begin{bmatrix}a  \\ b \\ c \\ d \\ e \end{bmatrix}
  \end{aligned}
\]

I tak i tak dalej. Zobaczmy teraz, jak użyć tych **T**, **M** i **C**, aby dopasować krzywą.

</div>

Zacznijmy: założymy, że wybraliśmy właściwą krzywą kolejności: dla `n` punktów dopasowujemy krzywą `n-1`-szego rzędu, 
więc "zaczynamy” od wektora **P** reprezentującego współrzędne, które już znamy 
i dla których chcemy dopasować krzywą:

\[
  P = \begin{bmatrix} p_1 \\ p_2 \\ ... \\ p_n \end{bmatrix}
\]

Następnie musimy znaleźć odpowiednie wartości `t` dla każdego punktu na krzywej, 
ponieważ potrzebujemy czegoś, co pozwoli nam powiązać "rzeczywistą współrzędną” 
z "jakimś punktem na krzywej”. Można to zrobić na wiele różnych sposobów (a duża część optymalizacji "idealnego dopasowania” polega na wybraniu odpowiednich wartości `t`), ale w tym przypadku przyjrzyjmy się dwóm "oczywistym” wyborom:

1. równomiernie rozmieszczone wartości `t` i
2. wartości `t`, które są wyrównane z odległością wzdłuż wielokąta.

Pierwszy jest naprawdę prosty: jeśli mamy `n` punktów, przypiszemy każdemu punktowi `i` wartość `t` `(i-1)/(n-1)`. Więc jeśli mamy cztery punkty, pierwszy punkt będzie miał `t=(1-1)/(4-1)=0/3`, drugi punkt będzie miał `t=(2-1)/(4-1)=1/3`, trzeci punkt będzie miał `t=2/3`, a ostatni punkt będzie miał `t=1`. Po prostu ustawiamy odstępy między wartościami `t`, aby dopasować liczbę punktów, które mamy.

Drugi jest nieco bardziej interesujący: ponieważ wykonujemy regresję wielomianową, równie dobrze możemy wykorzystać fakt, że nasze współrzędne bazowe stanowią po prostu zbiór odcinków linii. W pierwszym punkcie ustalamy t=0, w ostatnim punkcie chcemy t=1, a gdziekolwiek pomiędzy, po prostu powiemy, że `t` jest równe odległości wzdłuż wielokąta, przeskalowanej do domena [0,1].

Aby uzyskać te wartości, najpierw obliczamy ogólną macierz "odległości wzdłuż wielokąta”:

\[
  D = \begin{bmatrix}d_1 & d_2 & ... & d_n \end{bmatrix}, \textit{ where }
  \left \{
  \begin{matrix}
    d_1 = 0 \\
    d_i = d_{i-1} + \textit{length}(p_{i-1}, p_i)
  \end{matrix}
  \right.
\]

Gdzie `length()` jest dosłownie tym: długością odcinka między punktem, na który patrzymy, a poprzednim punktem. To oczywiście nie wystarczy: nadal musimy upewnić się, że wszystkie wartości między `i=1` a `i=n` mieszczą się w przedziale [0,1], więc musimy przeskalować wszystkie wartości w dół o dowolną całkowitą długość wielokąta:

\[
  \begin{aligned}
    S = \begin{bmatrix}s_1 & s_2 & ... & s_n \end{bmatrix}, \textit{ where }
  \left \{
  \begin{matrix}
    s_1 = 0 \\
    s_i = d_i / d_n \\
    s_n = 1
  \end{matrix}
  \right.
  \end{aligned}
\]

A teraz możemy przejść do faktycznej części "dopasowywania krzywej”: potrzebujemy funkcji, która pozwoli nam obliczyć "idealne” wartości punktów kontrolnych, tak że jeśli zbudujemy z nich krzywą Béziera, krzywa ta przejdzie przez wszystkie nasze oryginalne punkty. Lub, jeśli to się nie powiedzie, mieć całkowitą odległość błędu tak bliską zeru, jak to tylko możliwe. 
Napiszmy więc, jak wygląda błąd odległości.

Jak wspomniano wcześniej, ta funkcja to tak naprawdę "odległość między rzeczywistą współrzędną a współrzędną, którą oblicza krzywa dla powiązanej wartości `t`”, którą podniesiemy do kwadratu, aby pozbyć się wszelkich brzydkich znaków ujemnych:

\[
  E(C)_i = \left ( p_i - \textit{Bézier}(s_i) \right )^2
\]

Ponieważ ta funkcja dotyczy tylko pojedynczych współrzędnych, będziemy musieli zsumować wszystkie współrzędne, aby uzyskać pełną funkcję błędu. Więc dosłownie po prostu to robimy; funkcja całkowitego błędu jest po prostu sumą wszystkich tych pojedynczych błędów:

\[
  E(C) = \sum^n_{i=1} \left ( p_i - \textit{Bézier}(s_i) \right )^2
\]

A oto trik, który uzasadnia używanie macierzy: 
podczas gdy możemy pracować z poszczególnymi wartościami za pomocą rachunku różniczkowego, 
z macierzami możemy obliczyć tyle wartości, jak duże uczynimy nasze macierze,
a wszystko to "w tym samym czasie”. Możemy zastąpic poszczególne wyrazy p<sub>i</sub> 
pełną macierzą współrzędnych **P** i Béziera(s<sub>i</sub>) reprezentacją macierzową **T x M x C* * o którym mówiliśmy wcześniej, co daje nam:

\[
  E(C) = \left ( P - TMC \right )^2
\]

W którym możemy zastąpić dość uciążliwą operację "podniesienia do kwadratu” bardziej konwencjonalnym odpowiednikiem macierzy:

\[
  E(C) = \left ( P - TMC \right )^T \left ( P - TMC \right )
\]

Tutaj litera `T` jest używana zamiast cyfry 2, aby przedstawić [transpozycję macierzy](https://en.wikipedia.org/wiki/Transpose); zamiast tego każdy wiersz w oryginalnej macierzy staje się kolumną w transponowanej macierzy (wiersz pierwszy staje się kolumną pierwszą, wiersz drugi staje się kolumną drugą itd.).


Pozostawia to jeden problem: **T** nie jest w rzeczywistości macierzą, której potrzebujemy: nie chcemy symbolicznych wartości `t`, chcemy rzeczywistych wartości liczbowych, które obliczyliśmy dla **S**, więc musimy utworzyć nową macierz, którą nazwiemy 𝕋, która z nich korzysta, a następnie użyć tego 𝕋 zamiast **T** w naszej funkcji błędu:

\[
𝕋 = \begin{bmatrix}
 s^0_1 & s^1_1 & ... & s^{n-2}_1 & s^{n-1}_1 \\
       &       &     &     &        \\
\vdots &       & ... &     & \vdots \\
       &       &     &     &        \\
 s^0_n & s^1_n & ... & s^{n-2}_n &  s^{n-1}_n
\end{bmatrix}
\]

Co ze względu na pierwszą i ostatnią wartość w **S** oznacza:

\[
𝕋 = \begin{bmatrix}
 1      &       0 & ... &             0 &             0 \\
 1      &     s_2 &    &     s^{n-2}_2 &     s^{n-1}_2 \\
 \vdots &         & ... &               &        \vdots \\
 1      & s_{n-1} &    & s^{n-2}_{n-1} & s^{n-1}_{n-1} \\
 1      &       1 & ... &             1 &             1
\end{bmatrix}
\]

Teraz możemy poprawnie zapisać funkcję błędu jako operacje macierzowe:

\[
  E(C) = \left ( P - 𝕋MC \right )^T \left ( P - 𝕋MC \right )
\]

Mamy więc naszą funkcję błędu: teraz musimy znaleźć wyrażenie określające, gdzie ta funkcja ma minimalną wartość, np. gdzie błąd między współrzędnymi rzeczywistymi a współrzędnymi wygenerowanymi przez dopasowanie krzywej jest najmniejszy. Podobnie jak w rachunku standardowym, wymaga to wzięcia pochodnej i określenia, gdzie ta pochodna wynosi zero:

\[
  \frac{\partial E}{\partial C} = 0 = -2𝕋^T \left ( P - 𝕋MC \right )
\]

<div class="note">

   ## Skąd pochodzi ta pochodna?

   To jest dobre pytanie. Faktycznie, próbując przejść przez to podejście, natknąłem się na to samo pytanie! I wiesz co? Od razu nie miałem pojęcia. Jestem dość przyzwoity z rachunku różniczkowego, 
   jestem dość przyzwoity z algebry liniowej i po prostu nie wiem.

  Zrobiłem więc to, co zawsze robię, gdy czegoś nie rozumiem: poprosiłem kogoś, aby pomógł mi zrozumieć, jak to działa. W tym konkretnym przypadku [wysłałem pytanie](https://math.stackexchange.com/questions/2825438/how-do-you-compute-the-derivative-of-a-matrix-algebra-expression) do [ Math.stackexchange](https://math.stackexchange.com) i otrzymałem odpowiedź zawierającą znacznie więcej szczegółów, niż się spodziewałem.

   Czy ta odpowiedź jest dla Ciebie przydatna? Prawdopodobnie nie. Przynajmniej nie, chyba że lubisz rozumieć matematykę na poziomie rekreacyjnym. I mam na myśli matematykę w ogóle, nie tylko podstawową algebrę. Ale to pomaga w udzieleniu nam referencji na wypadek, gdybyś kiedykolwiek zastanawiał się "Chwila. Dlaczego to była prawda?”. Są odpowiedzi. Mogą zrozumieć, że po prostu potrzebują trochę czasu, aby dojść do siebie.

</div>

Teraz, biorąc pod uwagę powyższą pochodną, ​​możemy zmienić kolejność wyrazów (zgodnie z zasadami algebry macierzowej) tak, że otrzymamy wyrażenie dla **C**:

\[
  C = M^{-1} \left ( 𝕋^T 𝕋 \right )^{-1} 𝕋^T P
\]

Tutaj "do potęgi minus jeden" jest notacją dla [odwrotności macierzy](https://en.wikipedia.org/wiki/Invertible_matrix). Ale to wszystko, co musimy zrobić: skończyliśmy. Zaczynając od **P** i wymyślając pewne wartości `t` w oparciu o wielokąt, który definiują współrzędne w **P**, możemy obliczyć odpowiednie współrzędne Béziera **C**, które określają krzywą przechodzącą przez nasze punkty. Lub, jeśli nie może przejść przez nie dokładnie, tak blisko, jak to możliwe.

Więc zanim to wypróbujemy, ile kodu jest potrzebne do wdrożenia tego? Szczerze mówiąc, ta odpowiedź zależy od tego, ile sam zamierzasz pisać. Jeśli masz już dostępną bibliotekę matematyczną macierzy, to naprawdę nie tak dużo kodu. Z drugiej strony, jeśli piszesz to od zera, będziesz musiał napisać kilka funkcji użytkowych, które wykonają dla ciebie pracę z macierzą, więc tak naprawdę jest to od 50 do 200 linii kodu. Niezła cena za możliwość dopasowania krzywych do wcześniej określonych współrzędnych.

Więc spróbujmy! Poniższa grafika umożliwia umieszczanie punktów i rozpoczyna obliczanie krzywych dokładnego dopasowania po umieszczeniu co najmniej trzech. Możesz kliknąć, aby uzyskać więcej punktów, a kod po prostu spróbuje obliczyć dokładne dopasowanie przy użyciu krzywej Béziera w odpowiedniej kolejności. cztery punkty? Sześcienny Béziera. pięć punktów? kwartalny. I tak dalej. Oczywiście w pewnym momencie to się psuje: w zależności od tego, gdzie umieścisz swoje punkty, instalatorowi może być bardzo trudno znaleźć dokładne dopasowanie, a rzeczy mogą faktycznie zacząć wyglądać okropnie, gdy będzie wystarczająco dużo punktów do złożenia
[zmiennoprzecinkowych błędów zaokrąglania](https://en.wikipedia.org/wiki/Round-off_error#Floating-point_number_system), aby zacząć robić różnicę (około 10–11 punktów).

<graphics-element title="Dopasowanie krzywej Béziera" width="550" src="./curve-fitting.js" >
  <button class="toggle">toggle</button>
  <!-- additional sliders will get created on the fly -->
</graphics-element>

Zauważysz, że istnieje wygodny przycisk "przełącz”, który umożliwia przełączanie między 
równoodległymi wartościami `t` i stosunkiem odległości wzdłuż wielokąta utworzonego
przez punkty. Prawdopodobnie bardziej interesujące jest to, że mając punkty 
do wyabstrahowania krzywej, uzyskujesz również <em>bezpośrednią kontrolę</em> 
nad parametrami t za pomocą suwaków dla każdego z nich, ponieważ jeśli 
te parametry są naszym stopniem swobody, powinieneś być w stanie swobodnie nimi
manipulować i zobaczyć, jaki jest wpływ na twoją krzywą.