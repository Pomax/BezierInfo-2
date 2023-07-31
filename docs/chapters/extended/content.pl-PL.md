# Przedział Béziera [0,1]

Teraz, gdy znamy matematykę kryjącą się za krzywymi Béziera, jest jedna ciekawa rzecz, którą być może zauważyłeś: zawsze przebiegają one od `t=0` do `t=1`. Dlaczego właśnie ten przedział?

Wszystko to ma związek z tym, jak biegniemy od "początku” naszej krzywej do "końca” naszej krzywej. Jeśli mamy wartość, która jest mieszanką dwóch innych wartości, to ogólny wzór na to jest następujący:

\[
  \textit{mixture} = a \cdot \textit{value}_1 + b \cdot \textit{value}_2
\]

Oczywistymi wartościami początkowymi i końcowymi muszą być tutaj `a=1, b=0`, aby wartość mieszana wynosiła 100% wartość 1 i 0% wartość 2 oraz `a=0, b=1`, aby wartość mieszana to 0% wartości 1 i 100% wartości 2. Ponadto nie chcemy, aby "a” i "b” były niezależne: jeśli tak, moglibyśmy po prostu wybrać dowolne wartości i otrzymać wartość mieszana, na przykład 100% wartość 1 **i** 100% wartość 2. Zasadniczo jest to w porządku, ale w przypadku krzywych Béziera zawsze chcemy wartości mieszanych *pomiędzy* punktem początkowym i końcowym, więc musimy upewnij się, że nigdy nie możemy ustawić "a” i "b” na pewne wartości, które prowadzą do wartości miksu, która sumuje się do ponad 100%. A to prosto:


\[
  m = a \cdot \textit{value}_1 + (1 - a) \cdot \textit{value}_2
\]

Dzięki temu możemy zagwarantować, że nigdy nie sumujemy powyżej 100%. Ograniczając `a` do wartości z przedziału [0,1], zawsze będziemy gdzieś pomiędzy naszymi dwiema wartościami (włącznie) i zawsze będziemy sumować do 100% miksu.

Ale... co jeśli użyjemy tej formy, która opiera się na założeniu, że będziemy używać tylko wartości między 0 a 1, a zamiast tego używać wartości spoza tego przedziału? Czy sprawy potoczą się bardzo źle? Cóż... raczej nie, ale możemy "zobaczyć więcej”.

W przypadku krzywych Béziera wydłużenie przedziału po prostu sprawia, że nasza krzywa "biegnie dalej”. Krzywe Béziera to po prostu segmenty pewnej krzywej wielomianowej, więc jeśli wybierzemy szerszy przedział, po prostu zobaczymy więcej krzywej. Więc jak wyglądają?

Poniższe dwie grafiki pokazują krzywe Béziera renderowane "w zwykły sposób”, a także krzywe, na których "leżą”, gdybyśmy znacznie rozszerzyli wartości `t`. Jak widać, w pozostałej części krzywej jest ukrytych znacznie więcej "kształtów”, a my możemy modelować te części, przesuwając punkty krzywej.

<div class="figure">
<graphics-element title="Kwadratowa nieskończona przedziałowo krzywa Béziera" src="./extended.js" data-type="quadratic"></graphics-element>
<graphics-element title="Sześcienna nieskończona przedziałowo krzywa Béziera" src="./extended.js" data-type="cubic"></graphics-element>
</div>

Faktycznie istnieją krzywe używane w projektowaniu graficznym i modelowaniu komputerowym, które działają odwrotnie niż krzywe Béziera; zamiast ustalać interwał i dając ci swobodę wyboru współrzędnych, ustalają współrzędne, ale dają ci swobodę w interwale. Doskonałym tego przykładem jest [krzywa "Spiro”](https://levien.com/phd/phd.html), która jest krzywą opartą na części [spirali Cornu, znanej również jako spirala Eulera](https://en.wikipedia.org/wiki/Euler_spiral). Jest to bardzo estetyczna krzywa i można ją znaleźć w kilku pakietach graficznych, takich jak [FontForge](https://fontforge.org/en-US/) i [Inkscape](https://inkscape.org). Był nawet używany w projektowaniu czcionek, na przykład w kroju pisma Inconsolata.
