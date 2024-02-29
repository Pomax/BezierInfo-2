# Praca z normalnymi 3D

Zanim przejdziemy do następnej sekcji, musimy poświęcić trochę czasu na różnicę między 2D a 3D. Podczas gdy dla wielu rzeczy ta różnica jest nieistotna, a procedury są identyczne (na przykład uzyskiwanie stycznej 3D to po prostu robienie tego, co robimy dla 2D, ale dla x, y i z, zamiast tylko dla x i y), kiedy idziemy do normalnych, sprawy są trochę bardziej złożone, a co za tym idzie, więcej pracy. Pamiętaj, że nie jest to "super trudne”, ale wymaga więcej kroków i powinniśmy się im przyjrzeć.

Uzyskanie normalnych w 3D jest w zasadzie takie samo jak w 2D: bierzemy znormalizowany wektor styczny, a następnie obracamy go o ćwierć obrotu. Jednak w tym miejscu sprawy stają się trochę bardziej skomplikowane: możemy obracać się w kilku kierunkach, ponieważ "normalna” w 3D to płaszczyzna, a nie pojedynczy wektor, więc zasadniczo musimy zdefiniować, czym jest "normalna” przypadku 3D.

Podejście "naiwne” polega na skonstruowaniu tak zwanej [normalnej Freneta](https://en.wikipedia.org/wiki/Frenet%E2%80%93Serret_formulas), w której stosujemy prosty przepis, który działa w wielu przypadkach (ale robi super dziwaczne rzeczy w niektórych innych).
Pomysł polega na tym, że nawet jeśli istnieje nieskończenie wiele wektorów prostopadłych do stycznej (tj. tworzących z nią kąt 90 stopni), sama styczna leży już w pewnym sensie na własnej płaszczyźnie: ponieważ każdy punkt na krzywej (bez względu na to, jak blisko siebie są rozmieszczone) ma swój własny wektor styczny, możemy powiedzieć, że każdy punkt leży w tej samej płaszczyźnie co lokalna styczna, a także styczne "tuż obok niego".

Nawet jeśli ta różnica w wektorach stycznych jest niewielka, "jakakolwiek różnica” wystarczy, aby dowiedzieć się, jaka jest ta płaszczyzna - a raczej, jaki jest wektor prostopadły do tej płaszczyzny. To jest to, czego potrzebujemy: jeśli możemy obliczyć ten wektor i mamy wektor styczny, o którym wiemy, że leży na płaszczyźnie, możemy obrócić wektor styczny nad prostopadłą i presto. Obliczyliśmy normalną, używając tej samej logiki, której użyliśmy w przypadku 2D: "po prostu obróć ją o 90 stopni”.

Więc zróbmy to! I niespodzianka, możemy to zrobić w czterech linijkach:

- **a** = normalizuj(B'(t))
- **b** = normalizuj(**a** + B''(t))
- **r** = normalizuj(**b** × **a**)
- **normalna** = normalizuj(**r** × **a**)

Rozpakujmy to nieco:

- Zaczynamy od obliczenia [wektora znormalizowanego](https://en.wikipedia.org/wiki/Unit_vector) dla pochodnej w pewnym punkcie krzywej. Normalizujemy go, aby matematyka była mniej pracochłonna. Mniej pracy to dobra rzecz.
- Następnie obliczamy **b**, które reprezentuje styczną następnego punktu, gdyby krzywa przestała się zmieniać w naszym punkcie i po prostu miała tę samą pochodną i drugą pochodną od tego punktu.
- To pozwala nam znaleźć dwa wektory (pochodna i druga pochodna dodana do pochodnej), które leżą na tej samej płaszczyźnie, co oznacza, że możemy ich użyć do obliczenia wektora prostopadłego do tej płaszczyzny, używając elementarnej operacji wektorowej zwanej [produktem krzyżowym](https://en.wikipedia.org/wiki/Cross_product).
(Zauważ, że chociaż ta operacja używa operatora ×, z całą pewnością nie jest to mnożenie!) 
Wynik daje nam wektor, którego możemy użyć jako "osi obrotu” do obrócenia stycznej o ćwiartkę koła, aby uzyskać naszą normalną, tak jak zrobiliśmy to w przypadku 2D.
- Ponieważ iloczyn krzyżowy pozwala znaleźć wektor prostopadły do pewnej płaszczyzny wyznaczonej przez dwa inne wektory, a wektor normalny powinien być prostopadły do płaszczyzny, w której leży styczna i oś obrotu, możemy użyć iloczynu krzyżowego drugi raz i natychmiast otrzymamy nasz wektor normalny.

I gotowe, znaleźliśmy wektor "normalny" dla krzywej 3D. Zobaczmy, jak to wygląda dla przykładowej krzywej, dobrze? 
Możesz przesuwać kursor po grafice od lewej do prawej, aby pokazać normalną w punkcie o wartości t, która jest oparta na pozycji kursora: cała droga po lewej to 0, cała droga po prawej = 1, w połowie to t = 0,5 itd:

<graphics-element title="Niektóre znane i nieznane wektory" width="350" height="300" src="./frenet.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

Jeśli jednak trochę pobawiłeś się tą grafiką, być może zauważyłeś coś dziwnego. Wydaje się, że normalna "nagle zakręca wokół krzywej” między t=0,65 a t=0,75... Dlaczego tak się dzieje?

Jak się okazuje, robi to, ponieważ tak działa matematyka i to jest problem z normalnymi Freneta:
chociaż są "matematycznie poprawne", są "praktycznie problematyczne", więc dla każdego rodzaju grafiki to, czego naprawdę chcemy, to sposób na obliczenie normalnych, które po prostu... wyglądają dobrze.

Na szczęście normalne Freneta nie są naszą jedyną opcją.

Inną opcją jest przyjęcie nieco bardziej algorytmicznego podejścia i obliczenie zamiast tego formy [Rotation Minimising Frame](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/Computation-of-rotation-minimizing-frames.pdf) (znanej również jako "równoległa rama transportowa" lub "rama Bishopa"), gdzie "rama" to zbiór składający się ze stycznej, osi obrotu i wektora normalnego, wyśrodkowany w punkcie na krzywej.

Tego typu ramki są obliczane na podstawie "poprzedniej ramki”, więc nie możemy po prostu obliczyć tych "na żądanie” dla pojedynczych punktów, tak jak moglibyśmy to zrobić w przypadku ramek Freneta; musimy je obliczyć dla całej krzywej. Na szczęście procedura jest dość prosta i można ją wykonać w tym samym czasie, gdy budujesz tabele przeglądowe dla swojej krzywej.

Chodzi o to, aby wziąć początkową ramkę "styczna/oś obrotu/normalna” w t=0, a następnie obliczyć, jak "powinna” wyglądać następna ramka, stosując pewne reguły, które dają dobrze wyglądającą następną ramkę. W przypadku artykułu RMF, do którego link znajduje się powyżej, tymi zasadami są:

- weź punkt na krzywej, dla którego znasz już układ RM,
- weź kolejny punkt na krzywej, dla którego nie znasz jeszcze układu RM, i
- odbij znaną ramkę na następny punkt, traktując płaszczyznę przechodzącą przez krzywą w punkcie dokładnie pomiędzy następnym a poprzednim punktem jako "lustro".
- daje to następnemu punktowi wektor styczny, który zasadniczo wskazuje w kierunku przeciwnym do tego, jaki powinien być, oraz normalną, która jest nieco chybiona, więc:
- odbij wektory naszej "lustrzanej ramki” po raz drugi, ale tym razem używając płaszczyzny przechodzącej przez sam "następny punkt” jako "lustra”.
- zrobione: styczna i normalna zostały naprawione i mamy dobrze wyglądającą ramkę do pracy.

Więc napiszmy trochę kodu do tego!

<div class="howtocode">

### Wdrażanie ramek minimalizujących obrót

Najpierw zakładamy, że mamy funkcję do obliczania układu Freneta w punkcie, który omówiliśmy już powyżej, w taki sposób, że daje układ o właściwościach:

```
{
  o: origin of all vectors, i.e. the on-curve point,
  t: tangent vector,
  r: rotational axis vector,
  n: normal vector
}
```

Następnie możemy napisać funkcję generującą sekwencję ramek RM w następujący sposób:

```
generateRMFrames(steps) -> frames:
  step = 1.0/steps

  // Start off with the standard tangent/axis/normal frame
  // associated with the curve at t=0:
  frames.add(getFrenetFrame(0))

  // start constructing RM frames:
  for t0 = 0, t0 < 1.0, t0 += step:
    // start with the previous, known frame
    x0 = frames.last

    // get the next frame: we're going to keep its position and tangent,
    // but we're going to recompute the axis and normal.
    t1 = t0 + step
    x1 = { o: getPoint(t1), t: getDerivative(t) }

    // First we reflect x0's tangent and axis of rotation onto x1,
    // through/ the plane of reflection at the point between x0 x1
    v1 = x1.o - x0.o
    c1 = v1 · v1
    riL = x0.r - v1 * 2/c1 * v1 · x0.r
    tiL = x0.t - v1 * 2/c1 * v1 · x0.t

    // note that v1 is a vector, but 2/c1 and (v1 · ...) are just
    // plain numbers, so we're just scaling v1 by some constant.

    // Then we reflect a second time, over a plane at x1, so that
    // the frame tangent is aligned with the curve tangent again:
    v2 = x1.t - tiL
    c2 = v2 · v2

    // and we're done here:
    x1.r = riL - v2 * 2/c2 * v2 · riL
    x1.n = x1.r × x1.t
    frames.add(x1)
```

Ignorując komentarze, jest to z pewnością więcej kodu niż wtedy, gdy obliczaliśmy tylko pojedynczą ramkę Freneta, ale nie jest to szalona ilość więcej kodu, aby uzyskać znacznie lepiej wyglądające normalne.

</div>

Mówiąc o lepszym wyglądzie, jak to właściwie wygląda? Wróćmy do tej wcześniejszej krzywej, ale tym razem użyjmy ramek minimalizujących rotację zamiast ramek Freneta:

<graphics-element title="Niektóre znane i nieznane wektory" width="350" height="300"  src="./rotation-minimizing.js">
  <input type="range" min="0" max="1" step="0.01" value="0" class="slide-control">
</graphics-element>

To wygląda o wiele lepiej!

Dla tych, którzy czytają razem z kodem: nawet ściśle mówiąc, nie potrzebujemy
na początek ramki Freneta: moglibyśmy na przykład potraktować oś `z` jako naszą początkową oś 
obrotu, więc nasza początkowa normalna byłaby **(0,0,1) × styczna**, 
a następnie przejść od tego miejsca, ale posiadanie tej początkowej "matematycznie poprawnej"
ramki, w której początkowa normalna wydaje się być wyrównana w oparciu o orientację krzywej
w przestrzeni 3D, jest po prostu miłe.