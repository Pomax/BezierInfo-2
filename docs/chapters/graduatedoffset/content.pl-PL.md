# Stopniowane otaczanie krzywej

Co jeśli chcemy wykonać stopniowane otaczanie, zaczynając od pewnej odległości `s`, ale kończąc na innej odległości `e`? Cóż, jeśli możemy obliczyć długość krzywej (co możemy zrobić, jeśli zastosujemy metodę kwadraturową Legendre-Gauss), możemy również określić, jak daleko "wzdłuż linii” znajduje się dowolny punkt na krzywej. Mając tę wiedzę, możemy otoczyć krzywą tak, aby jej otoczona krzywa nie była jednolicie szeroka, ale stopniowana pomiędzy dwiema różnymi szerokościami otoczenia na początku i na końcu.

Podobnie jak w przypadku normalnego otoczenia, tniemy naszą krzywą na podkrzywe, a następnie sprawdzamy, w jakiej odległości wzdłuż oryginalnej krzywej każda podkrzywa zaczyna się i kończy, a także do którego punktu na krzywej mapuje się każdy z punktów kontrolnych. Daje nam to odległość wzdłuż krzywej dla każdego interesującego punktu na krzywej podrzędnej. Jeśli nazwiemy całkowitą długość wszystkich krzywych podrzędnych widzianych przed zobaczeniem "bieżącej” podkrzywej "S” (i jeśli bieżąca podkrzywa jest pierwszą, "S” wynosi zero) i nazwiemy pełną długość naszej oryginalnej krzywej `L`, to otrzymamy następujące wartości stopniowania:

- start: odwzorowanie `S` od przedziału (`0,L`) do przedziału `(s,e)`
- c1: `map(<strong>S+d1</strong>, 0,L, s,e)`, d1 = odległość wzdłuż krzywej do rzutu c1
- c2: `map(<strong>S+d2</strong>, 0,L, s,e)`, d2 = odległość wzdłuż krzywej do rzutu c2
- ...
- koniec: `map(<strong>S+długość(krzywa podrzędna)</strong>, 0,L, s,e)`

W każdym z odpowiednich punktów (początku, końca i rzutów punktów kontrolnych na krzywą) znamy normalną krzywej, więc otoczenie jest po prostu kwestią wzięcia naszego pierwotnego punktu i przesunięcia go wzdłuż wektora normalnego o przesunięcie odległość dla każdego punktu. W ten sposób uzyskamy następujący wynik (mają one początkową szerokość 0 i końcową szerokość 40 pikseli, ale można nimi sterować za pomocą klawiszy strzałek w górę i w dół):

<graphics-element title="Przesuwanie kwadratowej krzywej Béziera" src="./offsetting.js" data-type="quadratic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>

<graphics-element title="Przesuwanie sześciennej krzywej Béziera" src="./offsetting.js" data-type="cubic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>
