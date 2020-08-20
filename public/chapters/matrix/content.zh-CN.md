# 用矩阵运算来表示贝塞尔曲率

通过将贝塞尔公式表示成一个多项式基本方程、系数矩阵以及实际的坐标，我们也可以用矩阵运算来表示贝塞尔。让我们看一下这对三次曲线来说有什么含义：

\[
B(t) = P_1 \cdot (1-t)^3 + P_2 \cdot 3 \cdot (1-t)^2 \cdot t + P_3 \cdot 3 \cdot (1-t) \cdot t^2 + P_4 \cdot t^3
\]

暂时不用管我们具体的坐标，现在有：

\[
B(t) = (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\]

可以将它写成四个表达式之和：

\[
  \begin{matrix}
   ... & = & (1-t)^3 \\
     & + & 3 \cdot (1-t)^2 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t^2 \\
     & + & t^3 \\
  \end{matrix}
\]

我们可以扩展这些表达式：

\[
  \begin{matrix}
   ... & = & (1-t) \cdot (1-t) \cdot (1-t) & = & -t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & 3 \cdot (1-t) \cdot (1-t) \cdot t & = & 3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t \cdot t & = & -3 \cdot t^3 + 3 \cdot t^2 \\
     & + & t \cdot t \cdot t & = & t^3 \\
  \end{matrix}
\]

更进一步，我们可以加上所有的1和0系数，以便看得更清楚：

\[
  \begin{matrix}
   ... & = & -1 \cdot t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & +3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t + 0 \\
     & + & -3 \cdot t^3 + 3 \cdot t^2 + 0 \cdot t + 0 \\
     & + & +1 \cdot t^3 + 0 \cdot t^2 + 0 \cdot t + 0 \\
  \end{matrix}
\]

*现在*，我们可以将它看作四个矩阵运算：

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-1 \\ 3 \\ -3 \\ 1\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}3 \\ -6 \\ 3 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-3 \\ 3 \\ 0 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}1 \\ 0 \\ 0 \\ 0\end{bmatrix}
\]

如果我们将它压缩到一个矩阵操作里，就能得到：

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}
      -1 &  3 & -3 & 1 \\
       3 & -6 &  3 & 0 \\
      -3 &  3 &  0 & 0 \\
       1 &  0 &  0 & 0
    \end{bmatrix}
\]

这种多项式表达式一般是以递增的顺序来写的，所以我们应该将`t`矩阵水平翻转，并将大的那个“混合”矩阵上下颠倒：

\[
  \begin{bmatrix}1 & t & t^2 & t^3\end{bmatrix} \cdot \begin{bmatrix}
       1 &  0 &  0 & 0 \\
      -3 &  3 &  0 & 0 \\
       3 & -6 &  3 & 0 \\
      -1 &  3 & -3 & 1
    \end{bmatrix}
\]

最终，我们可以加入原始的坐标，作为第三个单独矩阵：

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

我们可以对二次曲线运用相同的技巧，可以得到：

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

如果我们代入`t`值并乘以矩阵来计算，得到的值与解原始多项式方程或用逐步线性插值计算的结果一样。

**因此：为什么我们要用矩阵来计算？** 用矩阵形式来表达曲线可以让我们去探索函数的一些很难被发现的性质。可以证明的是曲线构成了[三角矩阵](https://en.wikipedia.org/wiki/Triangular_matrix)，并且它与我们用在曲线中的实际坐标的求积相同。它还是可颠倒的，这说明可以满足[大量特性](https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem)。当然，主要问题是：“现在，为什么这些对我们很有用？”，答案就是这些并不是立刻就很有用，但是以后你会看到在一些例子中，曲线的一些属性可以用函数式来计算，也可以巧妙地用矩阵运算来得到，有时候矩阵方法要快得多。

所以，现在只要记着我们可以用这种形式来表示曲线，让我们接着往下看看。
