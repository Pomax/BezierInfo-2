# バッとした導入

まずは良い例から始めましょう。ベジエ曲線というのは、下の図に表示されているもののことです。ベジエ曲線はある始点からある終点へと延びており、その曲率は1個以上の「中間」制御点に左右されています。さて、このページの図はどれもインタラクティブになっていますので、ここで曲線をちょっと操作してみましょう。点をドラッグしたとき、曲線の形がそれに応じてどう変化するのか、確かめてみてください。

<div class="figure">
  <graphics-element title="2次のベジエ曲線" src="./quadratic.js"></graphics-element>
  <graphics-element title="3次のベジエ曲線" src="./cubic.js"></graphics-element>
</div>

ベジエ曲線は、CAD（computer aided designやCAM（computer aided manufacturing）のアプリケーションで多用されています。もちろん、Adobe Illustrator・Photoshop・Inkscape・Gimp などのグラフィックデザインアプリケーションや、SVG（scalable vector graphics）・OpenTypeフォント（otf/ttf）のようなグラフィック技術でも利用されています。ベジエ曲線はたくさんのものに使われていますので、これについてもっと詳しく学びたいのであれば……さあ、準備しましょう！
