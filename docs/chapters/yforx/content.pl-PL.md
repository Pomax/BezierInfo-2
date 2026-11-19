# Znalezienie Y, mając X

Jedno typowe zadanie, które pojawia się w takich rzeczach, jak CSS, korektory parametryczne, wyrównywanie obrazu lub inne aplikacje, 
w których krzywe Béziera są używane jako krzywe kontrolne w taki sposób, 
że tak naprawdę jest powiązana tylko jedna wartość `y` z jedną wartością `x`, 
możesz chcieć wyciąć pośrednika i obliczyć `y` bezpośrednio na podstawie `x`.
W końcu funkcja wygląda na dość prostą, znalezienie wartości `y` też powinno być proste, prawda? Niestety, nie do końca. Jednak _jest_ możliwe i tak długo, jak masz trochę kodu, który może pomóc, nie jest to również dużo pracy.

Zajmiemy się tym problemem w dwóch etapach: pierwszy, który jest najtrudniejszy, 
polega na ustaleniu, która wartość `t` należy do danej wartości `x`.
Na przykład spójrz na poniższą grafikę. Po lewej stronie mamy krzywą Béziera, 
która wygląda tak, jakby spełniała nasze kryteria: 
każdy `x` ma jedną i tylko jedną powiązaną wartość `y`. 
Po prawej stronie widzimy funkcję tylko dla wartości `x`: 
to jest krzywa sześcienna, ale nie naprawdę szalona krzywa sześcienna. 
Jeśli przesuniesz suwak grafiki, zobaczysz narysowaną czerwoną linię, 
która odpowiada współrzędnej `x`: jest to linia pionowa na lewej grafice i pozioma linia
x na prawej.

<graphics-element title="Znajdowanie t, mając x=x(t). Po lewej: nasza krzywa, po prawej: funkcja x=f(t)" width="550" src="./basics.js">
  <input type="range" min="0" max="1" step="0.01" class="slide-control">
</graphics-element>

Teraz, jeśli przyjrzysz się dokładniej tej prawej grafice, zauważysz coś interesującego: jeśli potraktujemy czerwoną linię jako "oś x”, to punkt, w którym funkcja przecina naszą linię, jest tak naprawdę pierwiastkiem funkcji sześciennej x(t) przez przesuniętą "oś x”... i [już widzieliśmy](#extremities), jak obliczyć pierwiastki, więc po prostu uruchommy wyszukiwanie pierwiastka sześciennego - i nawet nie skomplikowany przypadek sześcienny: ponieważ tego rodzaju krzywej, od której zaczynamy, _wiemy_ że jest tylko pierwiastek, upraszczając potrzebny nam kod!

Najpierw spójrzmy na funkcję dla x(t):

\[
    x(t) = a(1-t)^3 + 3b(1-t)^2t + 3c(1-t)t^2 + dt^3
\]

Możemy przepisać to do zwykłej postaci wielomianu, po prostu wypisując w pełni rozwinięcie, a następnie zbierając czynniki wielomianu, jak:

\[
    x(t) = (-a + 3b- 3c + d)t^3 + (3a - 6b + 3c)t^2 + (-3a + 3b)t + a
\]

Nic tu specjalnego: to standardowy wielomian sześcienny w postaci "potęg” (tzn. wszystkie wyrazy są uporządkowane według ich potęgi `t`). Więc biorąc pod uwagę, że `a`, `b`, `c`, `d`, *i* `x(t)` są znanymi stałymi, możemy to w prosty sposób przepisać (przesuwając `x(t)` znak równości) jako:

\[
    (-a + 3b - 3c + d)t^3 + (3a - 6b + 3c)t^2 + (-3a + 3b)t + (a-x) = 0
\]

Być może zastanawiasz się, "gdzie podziały się wszystkie inne" minus x ”dla wszystkich innych wartości a, b, c i d?” a odpowiedź jest taka, że wszystkie się znoszą, więc jedyne, co musimy odjąć, xto to na końcu.
Poręcznie! Teraz po prostu rozwiązujemy to równanie za pomocą algorytmu Cardano i zostaje nam dość krótki kod:

```
// przygotuj nasze wartości do znalezienia pierwiastka
x = a value we already know
xcoord = our set of Bézier curve's x coordinates
foreach p in xcoord: p.x -= x

// znajdź nasz pierwiastek, o którym wiemy, że jest dokładnie jeden:
t = getRoots(p[0], p[1], p[2], p[3])[0]

// znajdź naszą odpowiedź:
y = curve.get(t).y
```

Procedura jest więc dość prosta: wybierz `x`, znajdź powiązaną wartość `t`, oblicz naszą krzywą _dla_ tej wartości `t`, która daje nam współrzędną krzywej {x,y}, co oznacza, że znamy `y ` za to `x`. Przesuń suwak dla poniższej grafiki, aby zobaczyć to w akcji:

<graphics-element title="Wyszukiwanie według(t), poprzez znajdowanie t dla danego x" src="./yforx.js">
  <input type="range" min="0" max="1" step="0.01" class="slide-control">
</graphics-element>

