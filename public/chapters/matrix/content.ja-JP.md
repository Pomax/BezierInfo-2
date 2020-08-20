# 行列演算としてのベジエ曲線の曲率

ベジエ曲線は、行列演算の形でも表現することができます。ベジエ曲線の式を多項式基底と係数行列で表し、実際の座標も行列として表現するのです。これがどういうことを意味しているのか、3次ベジエ曲線について見てみましょう。

\[
B(t) = P_1 \cdot (1-t)^3 + P_2 \cdot 3 \cdot (1-t)^2 \cdot t + P_3 \cdot 3 \cdot (1-t) \cdot t^2 + P_4 \cdot t^3
\]

実際の座標を一旦無視すると、次のようになります。

\[
B(t) = (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\]

これは、4つの項の和になっています。

\[
  \begin{matrix}
   ... & = & (1-t)^3 \\
     & + & 3 \cdot (1-t)^2 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t^2 \\
     & + & t^3 \\
  \end{matrix}
\]

それぞれの項を展開します。

\[
  \begin{matrix}
   ... & = & (1-t) \cdot (1-t) \cdot (1-t) & = & -t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & 3 \cdot (1-t) \cdot (1-t) \cdot t & = & 3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t \cdot t & = & -3 \cdot t^3 + 3 \cdot t^2 \\
     & + & t \cdot t \cdot t & = & t^3 \\
  \end{matrix}
\]

その上で、係数の0や1もすべて明示的に書けば、このようになります。

\[
  \begin{matrix}
   ... & = & -1 \cdot t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & +3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t + 0 \\
     & + & -3 \cdot t^3 + 3 \cdot t^2 + 0 \cdot t + 0 \\
     & + & +1 \cdot t^3 + 0 \cdot t^2 + 0 \cdot t + 0 \\
  \end{matrix}
\]

*さらに*、これは4つの行列演算の和として見ることができます。

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-1 \\ 3 \\ -3 \\ 1\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}3 \\ -6 \\ 3 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-3 \\ 3 \\ 0 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}1 \\ 0 \\ 0 \\ 0\end{bmatrix}
\]

これを1つの行列演算にまとめると、以下のようになります。

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}
      -1 &  3 & -3 & 1 \\
       3 & -6 &  3 & 0 \\
      -3 &  3 &  0 & 0 \\
       1 &  0 &  0 & 0
    \end{bmatrix}
\]

多項式基底をこのような形で表現する場合、通常はその基底を昇冪の順に並べます。したがって、`t`の行列を左右反転させ、大きな「混合」行列は上下に反転させる必要があります。

\[
  \begin{bmatrix}1 & t & t^2 & t^3\end{bmatrix} \cdot \begin{bmatrix}
       1 &  0 &  0 & 0 \\
      -3 &  3 &  0 & 0 \\
       3 & -6 &  3 & 0 \\
      -1 &  3 & -3 & 1
    \end{bmatrix}
\]

そして最後に、もともとあった座標を3番目の行列として付け加えます。

\[
  B(t) = \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

2次ベジエ曲線の場合も同様に変形することができ、最終的には以下のようになります。

\[
  B(t) = \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]

`t`の値を代入して行列の乗算を行えば、もともとの多項式関数から計算したときの値や、線形補間によって順次求めたときの値と、まったく同じものが得られます。

**では、なぜわざわざ行列を使うのでしょう？** 行列表現を使うことによって、他の表現ではわからなかった関数の性質を発見できるようになります。ベジエ曲線は[三角行列](https://ja.wikipedia.org/wiki/三角行列)の形になり、その行列式は実際の座標の積に等しくなることがわかります。また、この行列には逆行列が存在しますが、これは[さまざまな性質](https://ja.wikipedia.org/wiki/正則行列#.E7.89.B9.E5.BE.B4.E3.81.A5.E3.81.91)が満たされることを意味します。もっとも、疑問の中心は「それでなぜこれが役に立つのか？」という点でしょうが、「ただちには役に立たない」というのが回答です。しかしながら、この先に出てくる曲線のプロパティの中には、関数を操作して求めることも、また行列をうまいこと利用して求めることも、どちらでも可能な例があります。そしてときには、行列による手法の方が（劇的に）速くなる場合があるのです。

というわけで、現時点では「ベジエ曲線は行列で表現可能」ということだけを覚えて、次に進みましょう。
