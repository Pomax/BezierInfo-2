# Podział krzywych

Korzystając z algorytmu de Casteljau, możemy również znaleźć wszystkie punkty potrzebne do podzielenia krzywej Béziera na dwie mniejsze krzywe, które razem tworzą pierwotną krzywą. Kiedy konstruujemy szkielet de Casteljau dla pewnej wartości `t`, procedura daje nam wszystkie punkty potrzebne do podzielenia krzywej przy tej wartości `t`: jedna krzywa jest zdefiniowana przez wszystkie wewnętrzne punkty szkieletu znalezione przed naszym punktem na krzywej, podczas gdy druga krzywa jest zdefiniowana przez wszystkie wewnętrzne punkty szkieletu po naszym punkcie na krzywej.

<graphics-element title="Podział krzywej" width="825" src="./splitting.js">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>

<div class="howtocode">

### implementacja podziału krzywej

Możemy zaimplementować dzielenie krzywych, dołączając dodatkowe zbieranie punktów do funkcji de Casteljau:
```
left=[]
right=[]
function drawCurvePoint(points[], t):
  if(points.length==1):
    left.add(points[0])
    right.add(points[0])
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      if(i==0):
        left.add(points[i])
      if(i==newpoints.length-1):
        right.add(points[i+1])
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurvePoint(newpoints, t)
```

Po uruchomieniu tej funkcji dla pewnej wartości `t` tablice `left` i `right` będą zawierały wszystkie współrzędne dla dwóch nowych krzywych - jednej po "lewej" od naszej wartości `t`, drugiej po "prawej". Te nowe krzywe będą miały taką samą kolejność jak oryginalna krzywa i będą mogły być dokładnie nałożone na oryginalną krzywą.

</div>
