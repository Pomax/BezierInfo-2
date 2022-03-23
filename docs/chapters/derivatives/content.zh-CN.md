# 导数

利用贝塞尔函数的导数可以对贝塞尔曲线做一些有用的事，而贝塞尔函数较为有趣的一个性质是其导数也为贝塞尔函数。其实贝塞尔函数的求导相对而言比较直接，只是需要一点数学运算。

首先观察贝塞尔函数的求导法则，即：

\[
  \textit{Bézier}'(n,t) = n \cdot \sum_{i=0}^{n-1} (b_{i+1}-b_i) \cdot \textit{Bézier}(n-1,t)_i
\]

上式可改写为（注意式中的*b*即权重*w*，且*n*乘以一个和式等于每个求和项乘以*n*再求和）：

\[
  \textit{Bézier}'(n,t) = \sum_{i=0}^{n-1} \textit{Bézier}(n-1,t)_i \cdot n \cdot (w_{i+1}-w_i)
\]

直白地说，*n*次贝塞尔函数的导数为*n*-1次贝塞尔函数，少了一项，而且新的权重*w'*<sub>0</sub>、……、*w'*<sub>*n*-1</sub>可用旧的权重通过*n*(*w*<sub>*i*+1</sub> - *w*<sub>*i*</sub>)求得。对于带四个权重的三次函数，其导数的三个新权重为：*w'*<sub>0</sub> = 3(*w*<sub>1</sub>-*w*<sub>0</sub>)，*w'*<sub>1</sub> = 3(*w*<sub>2</sub>-*w*<sub>1</sub>)和*w'*<sub>2</sub> = 3(*w*<sub>3</sub>-*w*<sub>2</sub>)。

<div class="note">

### “慢着，为什么这是对的？”

虽然有时候有人告诉说“这是导数”就行，但还是可能想一探究竟。既然如此，就来看看这个导数的证明。首先，因为权重不影响完整的贝塞尔函数的求导，所以求导只涉及多项式基函数的导数。基函数的导数为：

\[
  \frac{\mathrm{d}}{\mathrm{d}t} B_{n,k}(t) = \frac{\mathrm{d}}{\mathrm{d}t} \left( \mathrm{C}_n^k t^k (1-t)^{n-k} \right)
\]

使用[乘积求导法则](https://en.wikipedia.org/wiki/Product_rule)和[复合函数求导法则](https://en.wikipedia.org/wiki/Chain_rule)得到：

\[
  \cdots = \mathrm{C}_n^k \left (
    k \cdot t^{k-1} (1-t)^{n-k} + t^k \cdot (1-t)^{n-k-1} \cdot (n-k) \cdot -1
  \right )
\]

上式不易处理，因此打开括号：

\[
  \cdots = \frac{kn!}{k!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k}
\]

现在技巧性的一步是将上式再次化为含二项式系数的形式，需要得到形如“x!/y!(x-y)!”的项。如果得到关于*n*-1和*k*-1的项，那么说明方向是对的。

\[
\begin{array}{l}
  \cdots = \frac{n!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k} \\
  \cdots = n \left (
    \frac{(n-1)!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)(n-1)!}{k!(n-k)!} t^k (1-t)^{n-1-k}
  \right ) \\
  \cdots = n \left (
    \frac{(n-1)!}{(k-1)!((n-1)-(k-1))!} t^{k-1} (1-t)^{(n-1)-(k-1)} - \frac{(n-1)!}{k!((n-1)-k)!} t^k (1-t)^{(n-1)-k}
  \right )
\end{array}
\]

这是第一步。上式括号里的两项其实为标准的、低一次的贝塞尔函数：

\[\begin{array}{l}
  \cdots = n \left (
    \frac{x!}{y!(x-y)!} t^{y} (1-t)^{x-y} - \frac{x!}{k!(x-k)!} t^k (1-t)^{x-k}
  \right )
  \textit{，其中}\ x=n-1 \textit{，} y=k-1
  \\
  \cdots = n \left ( B_{n-1,k-1}(t) - B_{n-1,k}(t) \right )
\end{array}
\]

现在将上式应用于已有的加权贝塞尔函数。先写出之前所见的平面曲线公式，再逐步求出导数：

\[\begin{array}{lcl}
  \textit{Bézier}_{n,k}(t) &=& B_{n,0}(t) \cdot w_0 + B_{n,1}(t) \cdot w_1 + B_{n,2}(t) \cdot w_2 + B_{n,3}(t) \cdot w_3 + \cdots \\
  \frac{\mathrm{d}}{\mathrm{d}t} \textit{Bézier}_{n,k}(t) &=& n \cdot (B_{n-1,-1}(t) - B_{n-1,0}(t)) \cdot w_0 + {}\\
                               & & n \cdot (B_{n-1,0}(t) - B_{n-1,1}(t)) \cdot w_1 + {}\\
                               & & n \cdot (B_{n-1,1}(t) - B_{n-1,2}(t)) \cdot w_2 + {}\\
                               & & n \cdot (B_{n-1,2}(t) - B_{n-1,3}(t)) \cdot w_3 + {}\\
                               & & \cdots
\end{array}\]

如果打开上式的括号（用颜色表示相匹配的项），再按递增的*k*值重排各项，那么有：

\[\begin{array}{lclc}
  n \cdot B_{n-1,-1}(t) \cdot w_0 &+& & \\
  n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 & + \\
  n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& n \cdot B_{n-1,RED[1]}(t) \cdot w_1 & + \\
  n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 & + \\
  \cdots &-& n \cdot B_{n-1,3}(t) \cdot w_3 & + \\
  \cdots & & &
\end{array}\]

上式中有两项会消失掉：因为任意和式都没有第-1项，所以上式第一项消失。既然这一项总是贡献为零，那么求导时就可以放心地将其完全无视。消失的另外一项为展开式的最后一项——包含*B*<sub>*n*-1,*n*</sub>的一项。这一项含有二项式系数C<sub>*i*</sub><sup>*i*+1</sup>，而这一系数通常约定等于0。因此这一项贡献为零，也可被略去。这意味着剩下的项为：

\[\begin{array}{lclc}
  n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 &+ \\
  n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& n \cdot B_{n-1,RED[1]}(t) \cdot w_1 &+ \\
  n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 &+ \\
  \cdots
\end{array}\]

此即低次函数之和：

\[
  \frac{\mathrm{d}}{\mathrm{d}t} \textit{Bézier}_{n,k}(t) = n \cdot B_{n-1,BLUE[0]}(t) \cdot (w_1 - w_0)
                            + n \cdot B_{n-1,RED[1]}(t) \cdot (w_2 - w_1)
                            + n \cdot B_{n-1,MAGENTA[2]}(t) \cdot (w_3 - w_2)
                            + \cdots
\]

将上式改写为正常的和式即可：

\[
  \frac{\mathrm{d}}{\mathrm{d}t} \textit{Bézier}_{n,k}(t) = \sum_{k=0}^{n-1} n \cdot B_{n-1,k}(t) \cdot (w_{k+1} - w_k)
                               = \sum_{k=0}^{n-1} B_{n-1,k}(t) \cdot \underbrace{n \cdot (w_{k+1} - w_k)}_{\textit{导数的权重}}
\]

</div>

将上式改写为与原式相似的形式有助于看出它们的区别。先写出原式，再写出导数：

\[
  \textit{Bézier}(n,t) = \sum_{i=0}^{n}
                \underbrace{\mathrm{C}_n^i}_{\textit{二项式系数项}}
                \cdot\
                \underbrace{(1-t)^{n-i} \cdot t^{i}}_{\textit{多项式项}}
                \cdot\
                \underbrace{w_i}_{\textit{权重}}
\]

\[
  \textit{Bézier}'(n,t) = \sum_{i=0}^{k}
                \underbrace{\mathrm{C}_k^i}_{\textit{二项式系数项}}
                \cdot\
                \underbrace{(1-t)^{k-i} \cdot t^{i}}_{\textit{多项式项}}
                \cdot\
                \underbrace{n \cdot (w_{i+1} - w_i)}_{\textit{导数的权重}}
                \textit{，其中}\ k=n-1
\]


有什么区别？对于实际的贝塞尔曲线而言几乎没有区别！虽然次数降低了（从*n*次变为*n*-1次），但是贝塞尔函数没有改变。唯一的真正的区别在于推导表示曲线的函数时权重如何变化。如果有A、B、C、D四个点，那么导数有三个点，二阶导数有两个点，三阶导数有一个点：

\[ \begin{array}{lllll}
  B(n,t)，    &        & w &= \{A,B,C,D\} \\
  B'(n,t)，   & n = 3， & w' &= \{A',B',C'\}    &= \{3 \cdot (B-A),\ 3 \cdot (C-B),\ 3 \cdot (D-C)\} \\
  B''(n,t)，  & n = 2， & w'' &= \{A'',B''\}    &= \{2 \cdot (B'-A'),\ 2 \cdot (C'-B')\} \\
  B'''(n,t)， & n = 1， & w''' &= \{A'''\} &= \{1 \cdot (B''-A'')\}
\end{array} \]

只要有多于一个权重即可运用这一方法。只剩一个权重时，下一步会出现*k*=0，而贝塞尔函数的和式因为无项可加而化为零。因此二次函数没有二阶导数，三次函数没有三阶导数，更一般地有*n*次函数有*n*-1阶（有意义的）导数，其更高阶导数为零。
