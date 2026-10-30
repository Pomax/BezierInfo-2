# Co zatem tworzy krzywą Béziera?

Zabawa z punktami krzywych mogła dać ci wyobrażenie o tym, jak zachowują się krzywe Béziera, ale czym tak naprawdę one są? Istnieją dwa sposoby wyjaśnienia, czym jest krzywa Béziera i okazują się one całkowicie równoważne, ale jeden z nich wykorzystuje skomplikowaną matematykę, a drugi naprawdę prostą matematykę. A więc... zacznijmy od prostego wyjaśnienia:

Krzywe Béziera są wynikiem [interpolacji liniowej](https://en.wikipedia.org/wiki/Linear_interpolation). Brzmi to skomplikowanie, ale interpolacją liniową zajmowałeś się od najmłodszych lat: za każdym razem, gdy musiałeś wskazać coś pomiędzy dwiema innymi rzeczami, stosowałeś interpolację liniową. To po prostu "wybranie punktu między dwoma punktami”.

Jeśli znamy odległość między tymi dwoma punktami i chcemy nowy punkt, który jest, powiedzmy, 20% odległości od pierwszego punktu (a więc 80% odległości od drugiego punktu), możemy to naprawdę łatwo obliczyć :

\[
\textit{Given} \left (
  \begin{aligned}
    p_1 &= \textit{some point} \\
    p_2 &= \textit{some other point} \\
    \textit{distance} &= (p_2 - p_1) \\
    \textit{ratio} &= \frac{\textit{percentage}}{100} \\
  \end{aligned}
\right ),~\textit{our new point} = p_1 + \textit{distance} \cdot \textit{ratio}
\]

Spójrzmy więc na to w akcji: poniższa grafika jest interaktywna, ponieważ możesz użyć klawiszy strzałek w górę i w dół, aby zwiększyć lub zmniejszyć współczynnik interpolacji, aby zobaczyć, co się stanie. Zaczynamy od trzech punktów, co daje nam dwie linie. Interpolacja liniowa po tych liniach daje nam dwa punkty, między którymi możemy ponownie wykonać interpolację liniową, uzyskując pojedynczy punkt. I ten punkt - i wszystkie punkty, które możemy w ten sposób utworzyć dla wszystkich stosunków razem wziętych - tworzą naszą krzywą Béziera:

<graphics-element title="Interpolacja liniowa prowadząca do krzywych Béziera" width="825" src="./interpolation.js">
  <input type="range" min="10" max="90" step="1" value="25" class="slide-control">
</graphics-element>

A to prowadzi nas do skomplikowanej matematyki: rachunku różniczkowego.

Chociaż nie wygląda na to, że właśnie to zrobiliśmy, w rzeczywistości właśnie narysowaliśmy krzywą kwadratową, w krokach, a nie za jednym razem. Jedną z fascynujących części krzywych Béziera jest to, że można je opisać zarówno za pomocą funkcji wielomianowych, jak i za pomocą bardzo prostych interpolacji interpolacji [...]. To z kolei oznacza, że możemy przyjrzeć się, co te krzywe mogą zrobić, opierając się zarówno na "rzeczywistej matematyce” (poprzez badanie funkcji, ich pochodnych i tak dalej), jak i patrząc na "mechaniczną” kompozycję (która mówi nam na przykład, że krzywa nigdy nie wyjdzie poza punkty, których użyliśmy do jej zbudowania).

Przyjrzyjmy się zatem krzywym Béziera nieco bardziej dogłębnie: ich wyrażeniom matematycznym, właściwościom, które możemy z nich wyprowadzić oraz różnym rzeczom, które możemy zrobić z krzywymi Béziera.
