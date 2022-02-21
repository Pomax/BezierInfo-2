# 切线与法线

如果要将物体沿曲线移动或者从曲线附近“移向远处”，那么与之最相关的两个向量为曲线的切向量和法向量，而这两者都非常容易求得。切向量用于沿曲线移动或者对准曲线方向，它标志着曲线在指定点的行进方向，而且就是曲线函数的一阶导数：

\[
\begin{matrix}
  \textit{tangent}_x(t) = B'_x(t) \\
  \\
  \textit{tangent}_y(t) = B'_y(t)
\end{matrix}
\]

此即所需的方向向量。可以在每一点将方向向量规范化后得到单位方向向量（即长度为1.0），再根据这些方向进行所需的操作：

\[
\begin{matrix}
  d = \left \| \textit{tangent}(t) \right \| = \sqrt{B'_x(t)^2 + B'_y(t)^2} \\
  \\
  \hat{x}(t) = \left \| \textit{tangent}_x(t) \right \|
             =\frac{\textit{tangent}_x(t)}{ \left \| \textit{tangent}(t) \right \| }
             = \frac{B'_x(t)}{d} \\
  \\
  \hat{y}(t) = \left \| \textit{tangent}_y(t) \right \|
             = \frac{\textit{tangent}_y(t)}{ \left \| \textit{tangent}(t) \right \| }
             = \frac{B'_y(t)}{d}
\end{matrix}
\]

切向量对于沿曲线移动很有用，但如果要从曲线附近“移向远处”，而且移动方向与曲线在某点*t*处垂直，那该怎么办？这时需要的是*法*向量。这一向量与曲线的方向保持垂直，且长度通常为1.0，因此只需旋转单位方向向量即可：

\[
\begin{array}{l}
  \textit{normal}_x(t) = \hat{x}(t) \cdot \cos{\frac{\pi}{2}} - \hat{y}(t) \cdot \sin{\frac{\pi}{2}} = - \hat{y}(t) \\
  \\
  \textit{normal}_y(t) = \underbrace{ \hat{x}(t) \cdot \sin{\frac{\pi}{2}} + \hat{y}(t) \cdot \cos{\frac{\pi}{2}} }_{90^\circ \textit{旋转}} = \hat{x}(t)
\end{array}
\]

<div class="note">

其实旋转坐标只要知道方法就非常简单——“施加[旋转矩阵](https://mathworld.wolfram.com/RotationMatrix.html)”，以下即采用这种方法。本质上这一做法是先选取用于旋转的圆，再将坐标沿着圆“滑动所需的角度”。如果需要转动90度，那么将坐标沿着圆滑动90度即可。

为了将点(*x*,*y*)（绕(0,0)）旋转*φ*度得到点(*x'*,*y'*)，可以使用以下简洁的计算式：

\[\begin{array}{l}
  x' = x \cdot \cos(\phi) - y \cdot \sin(\phi) \\
  y' = x \cdot \sin(\phi) + y \cdot \cos(\phi)
\end{array}\]

对应“短”版本的矩阵变换为：

\[
  \begin{bmatrix}
    x' \\ y'
  \end{bmatrix}
  =
  \begin{bmatrix}
   \cos(\phi) & -\sin(\phi) \\
   \sin(\phi) & \cos(\phi)
  \end{bmatrix}
  \begin{bmatrix}
    x \\ y
  \end{bmatrix}
\]

注意对于90度、180度和270度旋转，因为这些角度的*正弦*和*余弦*分别为0和1、-1和0、0和-1，所以上式可以更简。

但是***为什么***可以这样做？为什么用这一矩阵乘法？这是因为旋转变换可以表示为三个（初等）剪切变换的复合，而将三个变换合成一个变换（因为所有矩阵变换都可以复合）即得上述矩阵表示。[DataGenetics](https://datagenetics.com/blog/august32013/index.html)对此进行了很好的解释，非常推荐读者一读。

</div>

以下两图展示了二次和三次贝塞尔曲线在各点的切线和法线，其中蓝色的为方向向量，红色的为法向量（标记按*t*值的等分区间放置，并非等距放置）。

<div class="figure">
  <graphics-element title="二次贝塞尔曲线的切线和法线" src="./pointvectors.js" data-type="quadratic"></graphics-element>
  <graphics-element title="三次贝塞尔曲线的切线和法线" src="./pointvectors.js" data-type="cubic"></graphics-element>
</div>
