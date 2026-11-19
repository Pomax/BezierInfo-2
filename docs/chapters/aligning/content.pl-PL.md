# Wyrównanie krzywych

Chociaż istnieje niewiarygodna liczba krzywych, które możemy zdefiniować, zmieniając współrzędne x i y punktów kontrolnych, nie wszystkie krzywe są w rzeczywistości różne. Na przykład, jeśli zdefiniujemy krzywą, a następnie obrócimy ją o 90 stopni, nadal będzie to ta sama krzywa, a jej końce znajdziemy w tych samych miejscach, tylko w innych współrzędnych rysowania. W związku z tym jednym ze sposobów upewnienia się, że pracujemy z "unikalną" krzywą, jest "wyrównanie osi".

Wyrównanie upraszcza również funkcje krzywych. Możemy przetranslować (przesunąć) krzywą tak, aby pierwszy punkt leżał na (0,0), co zamienia nasze *n*-wyrazowe funkcje wielomianowe w funkcje *n-1*-wyrazowe. Kolejność pozostaje taka sama, ale mamy mniej wyrazów. Następnie możemy obrócić krzywe tak, aby ostatni punkt również zawsze leżał na osi x, przyjmując współrzędną (...,0). To dodatkowo upraszcza funkcję dla składnika y do funkcji *n-2*-wyrazowej. Na przykład, jeśli mamy krzywą sześcienną taką jak ta:

\[
\left \{ \begin{matrix}
  x = BLUE[120] \cdot (1-t)^3 BLUE[+ 35] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 220] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 220] \cdot t^3 \\
  y = BLUE[160] \cdot (1-t)^3 BLUE[+ 200] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 260] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 40] \cdot t^3
\end{matrix} \right.
\]

wtedy wykonując translację tak, aby pierwsza współrzędna leżała na (0,0), przesuwając wszystkie 
współrzędne `x`o -120 i wszystkie współrzędne `y` o -160, otrzymujemy:

\[
\left \{ \begin{matrix}
  x = BLUE[0] \cdot (1-t)^3 BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 100] \cdot t^3 \\
  y = BLUE[0] \cdot (1-t)^3 BLUE[+ 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 120] \cdot t^3
\end{matrix} \right.
\]

Jeśli następnie obrócimy krzywą tak, aby jej punkt końcowy leżał na osi x, współrzędne (tutaj zaokrąglone do liczb całkowitych dla celów ilustracyjnych) staną się:

\[
\left \{ \begin{matrix}
  x = BLUE[0] \cdot (1-t)^3 BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 12] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 156] \cdot t^3 \\
  y = BLUE[0] \cdot (1-t)^3 BLUE[- 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 140] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 0] \cdot t^3
\end{matrix} \right.
\]

Jeśli odrzucimy wszystkie wyrazy zerowe, otrzymamy:

\[
\left \{ \begin{array}{l}
  x = BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 12] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 156] \cdot t^3 \\
  y = BLUE[- 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 140] \cdot 3 \cdot (1-t) \cdot t^2
\end{array} \right.
\]

Widzimy, że nasza oryginalna definicja krzywej została znacznie uproszczona. Poniższa grafika ilustruje wynik wyrównania naszych przykładowych krzywych do osi x, z przypadkiem sześciennym przy użyciu współrzędnych, które zostały właśnie użyte w przykładowych wzorach:

<graphics-element title="Wyrównanie krzywej kwadratowej" width="550" src="./aligning.js" data-type="quadratic"></graphics-element>

&nbsp;

<graphics-element title="Wyrównanie krzywej sześciennej" width="550" src="./aligning.js" data-type="cubic"></graphics-element>
