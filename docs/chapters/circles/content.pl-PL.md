# Okręgi i kwadratowe krzywe Béziera

Okręgi i krzywe Béziera to zupełnie różne bestie, a okręgi są nieskończenie łatwiejsze w obróbce niż krzywe Béziera. Ich formuła jest znacznie prostsza i można je rysować wydajniej. Ale czasami nie masz luksusu używania okręgów, elips lub łuków. Czasami wszystko, co masz, to krzywe Béziera. Na przykład, jeśli projektujesz czcionki, czcionki nie mają pojęcia o kształtach geometrycznych, znają tylko linie proste i krzywe Béziera. Czcionki OpenType z konturami TrueType znają tylko kwadratowe krzywe Béziera, a czcionki OpenType z konturami Type 2 znają tylko sześcienne krzywe Béziera. Jak więc narysować okrąg, elipsę lub łuk?

Aproksymujesz.

Wiemy już, że krzywe Béziera nie mogą modelować wszystkich krzywych, jakie możemy sobie wyobrazić, i obejmuje to idealne koła, a także elipsy i ich odpowiedniki w postaci łuków. Jednak z pewnością możemy je przybliżyć w stopniu, który jest wizualnie akceptowalny. Krzywe kwadratowe i sześcienne oferują nam różne sterowanie krzywizną, więc aby przybliżyć okrąg, musimy najpierw dowiedzieć się, jaki jest błąd, jeśli spróbujemy przybliżyć łuki o rosnącym stopniu za pomocą krzywych kwadratowych i sześciennych, a nawet gdzie leżą współrzędne.

Ponieważ łuki są symetryczne w punkcie środkowym, potrzebujemy punktów kontrolnych, aby ustawić krzywą symetryczną. W przypadku krzywych kwadratowych oznacza to, że punkt kontrolny będzie gdzieś na linii przecinającej linię bazową pod kątem prostym. I nie mamy żadnego wyboru, gdzie to będzie, ponieważ pochodne w punkcie początkowym i końcowym muszą się pokrywać, więc nasz punkt kontrolny będzie leżał na przecięciu stycznych w punkcie początkowym i końcowym.

Najpierw spróbujmy dopasować krzywą kwadratową do łuku kołowego. Na poniższym szkicu możesz przesuwać mysz po okręgu jednostkowym, aby zobaczyć, jak dobrze lub źle krzywa kwadratowa może przybliżać łuk od (1,0) do miejsca, w którym znajduje się kursor myszy:

<graphics-element title="Przybliżenie łuku kwadratową krzywą Béziera" width="400" height="400" src="./arc-approximation.js">
  <input type="range" min="-3.1415" max="3.1415" step="0.01" value="-0.7854" class="slide-control">
</graphics-element>

Jak widać, dość szybko sprawy idą strasznie źle; nawet próba przybliżenia ćwiartki koła za pomocą krzywej kwadratowej jest złym pomysłem. Ósma część obrotu może wyglądać dobrze, ale jak dobrze jest w porządku? Zastosujmy trochę matematyki i dowiedzmy się. Interesuje nas, jak daleko znajdują się nasze współrzędne na krzywej w odniesieniu do łuku kołowego, mając określony kąt początkowy i końcowy. Przyjrzymy się, ile miejsca jest między łukiem kołowym a środkiem krzywej kwadratowej.

Zaczynamy od naszego punktu początkowego i końcowego i dla wygody umieścimy je na okręgu jednostkowym (okrąg wokół 0,0 o promieniu 1), pod pewnym kątem *φ*:

\[
  S = \begin{pmatrix} 1 \\ 0 \end{pmatrix} ~, ~\  E = \begin{pmatrix} cos(φ) \\ sin(φ) \end{pmatrix}
\]

Chcemy znaleźć punkt przecięcia stycznych, więc szukamy punktu C takiego, że:

\[
  C = S + a \cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix} ~, ~\ C = E + b \cdot \begin{pmatrix} -sin(φ) \\ cos(φ) \end{pmatrix}
\]

tzn. chcemy, aby punkt leżał na linii pionowej przechodzącej przez S (w pewnej odległości *a* od S), a także leżał na linii stycznej przechodzącej przez E (w pewnej odległości *b* od E). Rozwiązanie tego daje nam:

\[
  \left\{ \begin{array}{l}
    C_x = 1 = cos(φ) + b \cdot -sin(φ)\\
    C_y = a = sin(φ) + b \cdot cos(φ)
  \end{array} \right.
\]

Najpierw rozwiązujemy dla *b*:

\[
  \begin{array}{l}
    1 = cos(φ) + b \cdot -sin(φ) ~→ \
    1 - cos(φ) = -b \cdot sin(φ) ~→ \
    -1 + cos(φ) = b \cdot sin(φ)
  \end{array}
\]

co daje:

\[
  b = \frac{cos(φ)-1}{sin(φ)}
\]

które następnie możemy podstawić w wyrażeniu na *a*:

\[
  \begin{aligned}
    a &= sin(φ) + b \cdot cos(φ) \\
    .. &= sin(φ) + \frac{-1 + cos(φ)}{sin(φ)} \cdot cos(φ) \\
    .. &= sin(φ) + \frac{-cos(φ) + cos^2(φ)}{sin(φ)} \\
    .. &= \frac{sin^2(φ) + cos^2(φ) - cos(φ)}{sin(φ)} \\
    a &= \frac{1 - cos(φ)}{sin(φ)}
  \end{aligned}
\]

Szybkie sprawdzenie pokazuje, że wstawienie tych wartości dla *a* i *b* do wyrażeń dla C<sub>x</sub> i C<sub>y</sub> daje takie same współrzędne x/y dla obu "* a* od A” i "*b* od B”, więc kontynuujmy: teraz, gdy znamy wartości współrzędnych dla C, wiemy, gdzie znajduje się nasz punkt na krzywej T dla *t=0,5* (lub kąt φ/ 2) jest, ponieważ możemy po prostu obliczyć wielomian Béziera i wiemy, gdzie jest rzeczywisty punkt P łuku koła dla kąta φ/2:

\[
  P_x = cos(\frac{φ}{2}) ~, ~\  P_y = sin(\frac{φ}{2})
\]

Obliczamy T, zauważając, że jeśli *t=0,5*, wartości wielomianu (1-t)², 2(1-t)t i t² wynoszą odpowiednio 0,25, 0,5 i 0,25:

\[
  T = \frac{1}{4}S + \frac{2}{4}C + \frac{1}{4}E = \frac{1}{4}(S + 2C + E)
\]

Co, opracowane dla składowych x i y, daje:

\[
  \begin{array}{l}
    \left\{\begin{aligned}
    T_x &= \frac{1}{4}(3 + cos(φ))\\
    T_y &= \frac{1}{4}\left(\frac{2-2cos(φ)}{sin(φ)} + sin(φ)\right)
         = \frac{1}{4}\left(2tan\left(\frac{φ}{2}\right) + sin(φ)\right)
    \end{aligned}\right.
  \end{array}
\]

A odległość między nimi to standardowa odległość euklidesowa:

\[
  \begin{aligned}
    d_x(φ) &= T_x - P_x = \frac{1}{4}(3 + cos(φ)) - cos(\frac{φ}{2}) = 2sin^4\left(\frac{φ}{4}\right) ~, \\
    d_y(φ) &= T_y - P_y = \frac{1}{4}\left(2tan\left(\frac{φ}{2}\right) + sin(φ)\right) - sin(\frac{φ}{2}) ~, \\
    &⇓\\
    d(φ) &= \sqrt{d^2_x + d^2_y} = ~... ~ = 2sin^4(\frac{φ}{4})\sqrt{\frac{1}{cos^2(\frac{φ}{2})}}
  \end{aligned}
\]

Jak więc wygląda ta funkcja odległości, gdy wykreślimy ją dla pewnej liczby zakresów kąta φ, takich jak półkola, ćwiartki koła i ósmego koła?

<table><tbody><tr><td>
  <img src="images/arc-q-pi.gif" height="190"/>
  plotted for 0 ≤ φ ≤ π:
</td><td>
  <img src="images/arc-q-pi2.gif" height="187"/>
  plotted for 0 ≤ φ ≤ ½π:
</td><td>
  <a href="https://www.wolframalpha.com/input/?i=plot+sqrt%28%281%2F4+*+%28sin%28x%29+%2B+2tan%28x%2F2%29%29+-+sin%28x%2F2%29%29%5E2+%2B+%282sin%5E4%28x%2F4%29%29%5E2%29+for+0+%3C%3D+x+%3C%3D+pi%2F4">
    <img src="images/arc-q-pi4.gif" height="174"/>
  </a>
  plotted for 0 ≤ φ ≤ ¼π:
</td></tr></tbody></table>

Teraz widzimy, dlaczego łuk ósmego koła wygląda przyzwoicie, ale łuk ćwierćokręgu nie: błąd około 0,06 przy *t=0,5* oznacza, że brakuje nam 6% znaku... piksel na okręgu o promieniu piksela 17. Każdy przyzwoity łuk ćwiartki koła, powiedzmy o promieniu 100 pikseli, będzie daleko w tyle, jeśli zostanie przybliżony krzywą kwadratową! Jednak dla łuku ósmego okręgu błąd wynosi tylko około 0,003, czyli 0,3%, co wyjaśnia, dlaczego wygląda tak blisko rzeczywistego łuku ósmego koła. Faktycznie, jeśli chcemy naprawdę małego błędu, takiego jak 0,001, będziemy musieli zmagać się z kątem (w zaokrągleniu) 0,593667, co odpowiada mniej więcej 34 stopniom. Potrzebowalibyśmy 11 krzywych kwadratowych, aby utworzyć pełne koło z taką precyzją! (technicznie rzecz biorąc, 10 i dziesięć siedemnastych, ale nie możemy robić częściowych krzywych, więc musimy zaokrąglić w górę). To całe mnóstwo krzywych, aby uzyskać kształt, który można narysować za pomocą prostej funkcji!

Faktycznie odwróćmy funkcję tak, że jeśli wstawimy błąd precyzji, oznaczony ε, otrzymamy z powrotem maksymalny kąt dla tej precyzji:

\[
  φ = 4 \cdot arccos \left(\frac{\sqrt{2+ε-\sqrt{ε(2+ε)}}}{\sqrt{2}}\right)
\]

I szczerze mówiąc, w tym momencie sprawy zaczynają wyglądać trochę śmiesznie, wykonujemy o wiele więcej obliczeń niż kiedykolwiek wcześniej, ale na szczęście to wszystko, czego potrzebujemy, 
aby matematyka nas poprowadziła: jeśli podłączymy precyzje 0,1, 0,01, 0,001 i 0,0001 otrzymujemy wartości radianów 1,748, 1,038, 0,594 i 0,3356; w stopniach oznacza to, że możemy objąć około 100 stopni (wymagając czterech krzywych), 59,5 stopnia (wymagając sześciu krzywych), 34 stopnie (wymagając 11 krzywych) i 19,2 stopnia (wymagając aż dziewiętnastu krzywych).

Konkluzja? **Kwadratowe krzywe są trochę kiepskie**, jeśli chcesz krzywych okrągłych (lub eliptycznych, które są okręgami zgniecionymi w jednym wymiarze). Możemy zrobić to lepiej, nawet jeśli tylko raz podniesiemy rząd naszej krzywej. Spróbujmy więc tego samego dla krzywych sześciennych.