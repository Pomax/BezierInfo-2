# 用矩阵分割曲线

分割曲线的另一种方式是利用贝塞尔曲线的矩阵表示。在<a href="#matrix">矩阵章节</a>中，我们看到可以用矩阵乘法来表示曲线。具体来说，我们分别看到了二次曲线和三次曲线的这两种形式:(为了便于阅读，我们将反转贝塞尔系数向量)

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

以及

\[
  B(t) = \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0\\
  -3 &  3 &  0 & 0\\
   3 & -6 &  3 & 0\\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

假设我们想要在某一点`t = z`分割曲线，形成两条新的(显然更小的)贝塞尔曲线。为了找到这两条贝塞尔曲线的坐标，我们可以使用矩阵表示和一些线性代数。首先，我们将实际的“曲线上的点”信息分离出来，放入一个新的矩阵乘法中:

\[
  B(t) =
  \begin{bmatrix}
  1 & (z \cdot t) & (z \cdot t)^2
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
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
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

以及

\[
  B(t) =
  \begin{bmatrix}
  1 & (z \cdot t) & (z \cdot t)^2 & (z \cdot t)^3
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
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0   & 0\\
  0 & z & 0   & 0\\
  0 & 0 & z^2 & 0\\
  0 & 0 & 0   & z^3
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

如果我们可以把这些矩阵重构回**[t值]·[贝塞尔矩阵]·[列矩阵]**的形式,与前两个矩阵表示保持一致,那么右边的列矩阵将是第一段从`t = 0`到`t = z`的新贝塞尔曲线的坐标。事实证明，我们可以很容易地做到这一点，通过利用一些简单的线性代数规则(如果你不关心导数，直接跳到结果框的最后!)

<div class="note">

## 推导新的曲线外形坐标

在把曲线分割成两段的推导过程需要一些步骤，曲线的阶数越高，需要做的工作就越多，所以让我们先看看二次曲线:

\[
  B(t) =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
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

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \underset{\textit{we turn this...}}{\underbrace{\kern 2.25em Z \cdot M \kern 2.25em}}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \underset{\textit{into this...}}{\underbrace{ M \cdot M^{-1} \cdot Z \cdot M }}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  M
  \underset{\textit{...to get this!}}{\underbrace{ \kern 1.25em \cdot \kern 1.25em Q \kern 1.25em \cdot \kern 1.25em}}
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]

我们可以这样做，因为[*M·M-1*]是单位矩阵。这有点像在微积分中乘以x/x：它对函数没有任何影响，但它允许你把它重写成更容易处理的东西，或者可以用不同的方式分解。同样地，将矩阵乘以[*M·M-1*]对总的公式没有影响，但它允许我们将矩阵序列[*something·M*]更改为序列[*M·something*]，这将产生极大的不同：如果我们知道[*M-1·Z·M*],我们可以应用到我们的坐标中，并保留一个适当的矩阵表示的二次贝塞尔曲线([*T·M·P*])，用一套新的坐标表示的从`t=0`到`t=z`这段曲线。让我们来计算一下:

\[
  Q = M^{-1} \cdot Z \cdot M =
  \begin{bmatrix}
  1 & 0 & 0 \\
  1 & \frac{1}{2} & 0 \\
  1 & 1 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & 0 & 0 \\
  -(z-1) & z & 0 \\
  (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
  \end{bmatrix}
\]

太好了!现在我们可以形成新的二次曲线:

\[
  B(t) =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot M \cdot Q \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  M
  \cdot
  \left (
  Q
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \left (
  \begin{bmatrix}
  1 & 0 & 0 \\
  -(z-1) & z & 0 \\
  (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]

\[
  =
  \begin{bmatrix}
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
    P_1 \\
    z \cdot P_2 - (z-1) \cdot P_1 \\
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z - 1)^2 \cdot P_1
  \end{bmatrix}
\]

***巧妙的地方***：如果我们想要得到从` t = 0 `到`t = z` 的子曲线，我们可以保持第一个坐标不变(这是有意义的)，我们的控制点变成了原始控制点和起始点的z比例混合体，新的端点是一个看起来有些奇怪的混合体，类似于2次的[伯恩斯坦多项式](https://en.wikipedia.org/wiki/Bernstein_polynomial)。这些新的坐标实际上很容易直接计算!

当然，这只是两条曲线中的一条。要获取从`t = z`获取到` t = 1 `这一段我们需要再次这样做。我们首先观察到，在前面的计算中，我们实际上计算了通用区间[0，` z `]。由于0的存在，我们能够以更简单的形式写下它，但我们*实际*计算时，使0显式的代入，是这样子的:

\[
  B(t) =
  \begin{bmatrix}
  1 & ( 0 + z \cdot t) & ( 0 + z \cdot t)^2
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

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
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

如果我们想要计算区间[*z*，1]，我们将可以这么计算:

\[
  B(t) =
  \begin{bmatrix}
  1 & ( z + (1-z) \cdot t) & ( z + (1-z) \cdot t)^2
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

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & z & z^2 \\
  0 & 1-z & 2 \cdot z \cdot (1-z) \\
  0 & 0 & (1-z)^2
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

我们将用同样的方法乘以单位矩阵，把` [something·M] `变成` [M·something] `：

\[
  Q' = M^{-1} \cdot Z' \cdot M =
  \begin{bmatrix}
  1 & 0 & 0 \\
  1 & \frac{1}{2} & 0 \\
  1 & 1 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & z & z^2 \\
  0 & 1-z & 2 \cdot z \cdot (1-z) \\
  0 & 0 & (1-z)^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
  (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
  0 & -(z-1) & z \\
  0 & 0 & 1
  \end{bmatrix}
\]

于是，我们最终的第二条曲线形式是这样的：

\[
  B(t) =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot M \cdot Q \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  M
  \cdot
  \left (
  Q'
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]

\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \left (
  \begin{bmatrix}
  (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
  0 & -(z-1) & z \\
  0 & 0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]

\[
  =
  \begin{bmatrix}
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
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
    z \cdot P_3  - (z-1) \cdot P_2 \\
    P_3
  \end{bmatrix}
\]

***很好！***我们看到与之前相同的事情：我们可以保持最后一个坐标不变(这是有意义的)；我们的控制点变成了原始控制点和结束点的z比例混合体，而新的起始点是一个看起来有些奇怪的混合体，它类似于Bernstein的二次多项式，只不过这次它使用的是(z-1)而不是(1-z)。这些新的坐标*同样*很容易直接计算!

</div>

因此，使用线性代数而不是de Casteljau的算法，我们已经确定，对于任何在某值`t = z`处分割二次曲线，我们得到了两个子曲线，它们被表示为容易推导出坐标的贝塞尔曲线：

\[
  \begin{bmatrix}
  1 & 0 & 0 \\
  -(z-1) & z & 0 \\
  (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
    P_1 \\
    z \cdot P_2 - (z-1) \cdot P_1 \\
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z - 1)^2 \cdot P_1
  \end{bmatrix}
\]

以及

\[
  \begin{bmatrix}
  (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
  0 & -(z-1) & z \\
  0 & 0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
    z \cdot P_3  - (z-1) \cdot P_2 \\
    P_3
  \end{bmatrix}
\]

我们可以对三次曲线做同样的处理。但是，我将省去实际的推导过程(尽管如此，不要让它阻止您自己写出它)，并简单地向您展示生成的新坐标集：

\[
  \begin{bmatrix}
    1 & 0 & 0 & 0 \\
    -(z-1) & z & 0 & 0 \\
    (z-1)^2 & -2 \cdot (z-1) \cdot z & z^2 & 0 \\
    -(z-1)^3 & 3 \cdot (z-1)^2 \cdot z & -3 \cdot (z-1) \cdot z^2 & z^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
    P_1 \\
    z \cdot P_2 - (z-1) \cdot P_1 \\
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
    z^3 \cdot P_4 - 3 \cdot z^2 \cdot (z-1) \cdot P_3 + 3 \cdot z \cdot (z-1)^2 \cdot P_2 - (z-1)^3 \cdot P_1
  \end{bmatrix}
\]

以及

\[
  \begin{bmatrix}
    -(z-1)^3 & 3 \cdot (z-1)^2 \cdot z & -3 \cdot (z-1) \cdot z^2 & z^3 \\
    0 & (z-1)^2 & -2 \cdot (z-1) \cdot z & z^2 \\
    0 & 0 & -(z-1) & z \\
    0 & 0 & 0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
    z^3 \cdot P_4 - 3 \cdot z^2 \cdot (z-1) \cdot P_3 + 3 \cdot z \cdot (z-1)^2 \cdot P_2 - (z-1)^3 \cdot P_1 \\
    z^2 \cdot P_4 - 2 \cdot z \cdot (z-1) \cdot P_3 + (z-1)^2 \cdot P_2 \\
    z \cdot P_4 - (z-1) \cdot P_3 \\
    P_4
  \end{bmatrix}
\]

那么，看看我们的矩阵，我们真的需要计算第二段曲线的矩阵吗？不，我们不需要。实际上，已经得到其中一段的矩阵就意味着我们隐式地得到了另一段：将矩阵***Q***中每一行的值向右推，0从右边递推到左边，然后垂直翻转矩阵。很快，你就“计算”出了***Q'***。

以这种方式实现曲线分割只需要更少的递归，而且只是直接使用缓存值进行算术运算，因此在递归开销较大的系统上可以降低成本。如果您使用擅长矩阵乘法的设备进行计算，使用这种方法分割贝塞尔曲线将比使用de Casteljau要快得多。
