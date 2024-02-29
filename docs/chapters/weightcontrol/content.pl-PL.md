# Kontrolowanie krzywych Béziera, część 2: wymierne krzywe Béziera

Możemy dodatkowo kontrolować krzywe Béziera, "czyniąc je wymiernymi”: to znaczy dodając wartość "współczynnika” oprócz wartości wagi omówionej w poprzedniej sekcji, uzyskując w ten sposób kontrolę nad tym "jak silnie” każda współrzędna wpływa na krzywą.

Dodanie tych wartości stosunków do zwykłej funkcji krzywej Béziera jest dość łatwe. Gdzie funkcja regularna jest następująca:


\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i
\]

Funkcja dla wymiernych krzywych Béziera ma jeszcze dwa wyrazy:

\[
  \textit{Rational Bézier}(n,t) = \frac{ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot w_i \cdot BLUE[ratio_i] }{ BLUE[ \sum_{i=0}^{n} \binom{n}{i} \cdot (1-t)^{n-i} \cdot t^{i} \cdot ratio_i ] }
\]

W tym przypadku pierwszy nowy wyraz oznacza dodatkową wagę dla każdej współrzędnej. Na przykład, jeśli nasze wartości współczynnika to [1, 0,5, 0,5, 1], to <code>ratio<sub>0</sub> = 1</code>, <code>ratio<sub>1</sub> = 0.5</code> i tak dalej, i jest faktycznie identyczny, jakbyśmy używali tylko innej wagi. Jak dotąd nic szczególnego.

Jednak drugi nowy wyraz robi różnicę: każdy punkt na krzywej nie jest tylko punktem "podwójnie ważonym”, ale jest ułamkiem "podwójnie ważonej” wartości, którą obliczamy, wprowadzając ten współczynnik. Podczas obliczania punktów na krzywej obliczamy "normalną” wartość Béziera, a następnie dzielimy ją przez wartość Béziera dla krzywej, która używa tylko współczynników, a nie wag.

Robi to coś nieoczekiwanego: zmienia nasz wielomian w coś, co _nie_ jest już wielomianem. Jest to teraz rodzaj krzywej, która jest superklasą wielomianów i może robić naprawdę fajne rzeczy, których krzywe Béziera nie mogą robić "same z siebie", takie jak idealne opisywanie okręgów (co, jak zobaczymy w późniejszej sekcji, jest dosłownie niemożliwe przy użyciu standardowych krzywych Béziera).

Ale najlepszym sposobem pokazania, tego co robi, jest zrobienie tego dosłownie: spójrzmy na efekt "uczynienia wymiernymi” naszych krzywych Béziera za pomocą interaktywnej grafiki dla wymiernych krzywych. Poniższy rysunek przedstawia krzywą Béziera z poprzedniej sekcji "wzbogaconą” współczynnikami proporcji dla każdej współrzędnej. Im bliżej zera ustawimy jeden lub więcej składników, tym mniejszy względny wpływ wywiera powiązana współrzędna na krzywą (i oczywiście im wyżej je ustawimy, tym większy mają wpływ). Spróbuj zmienić wartości i zobacz, jak wpływa to na to, co zostanie narysowane:

<graphics-element title="Our rational cubic Bézier curve" src="./rational.js">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-1">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-2">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-3">
  <input type="range" min="0.01" max="2" value="1" step="0.01" class="ratio-4">
</graphics-element>

Możesz myśleć o wartościach współczynnika jako o "grawitacji” każdej współrzędnej: im wyższa grawitacja, tym bliżej tej współrzędnej będzie krzywa. Zauważysz również, że jeśli po prostu zwiększysz lub zmniejszysz wszystkie współczynniki o tę samą wartość, nic się nie zmieni... podobnie jak w przypadku grawitacji, jeśli względne siły pozostaną takie same, tak naprawdę nic się nie zmieni. Wartości określają wpływ każdej współrzędnej _względem wszystkich innych punktów_.

<div class="howtocode">

### Jak zaimplementować krzywe wymierne

Rozszerzenie kodu z poprzedniej sekcji o współczynniki jest prawie trywialne:

```
function RationalBezier(2,t,w[],r[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  f = [
    r[0] * mt2,
    2 * r[1] * mt * t,
    r[2] * t2
  ]
  basis = f[0] + f[1] + f[2]
  return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2])/basis

function RationalBezier(3,t,w[],r[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  f = [
    r[0] * mt3,
    3 * r[1] * mt2 * t,
    3 * r[2] * mt * t2,
    r[3] * t3
  ]
  basis = f[0] + f[1] + f[2] + f[3]
  return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2] + f[3] * w[3])/basis
```

I to wszystko, co musimy zrobić.

</div>
