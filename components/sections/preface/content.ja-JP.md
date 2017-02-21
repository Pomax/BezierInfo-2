# まえがき

2次元上になにかを描くとき、普通は線を使いますが、これは直線と曲線の2つに分類することができます。直線を描くのはとても簡単で、これをコンピュータに描かせるのも容易です。直線の始点と終点をコンピュータに与えてやれば、ポン！直線が描けました。疑問の余地もありません。

しかしながら、曲線の方はもっと大きな問題です。私たちはフリーハンドでいとも簡単に曲線を描くことができますが、コンピュータの方は少し不利です。曲線の描き方を表した数学的な関数が与えられないと、コンピュータは曲線を描くことができないのです。実際には、直線でさえも関数が必要になります。直線の関数はとても簡単なので、わたしたちはよく無視してしまいますが、コンピュータにとっては直線であれ曲線であれ、線はすべて「関数」なのです。しかしこれは、コンピュータで速く計算できて、きれいな曲線が得られるような関数を見つける必要がある、ということになります。そのような関数はたくさんありますが、多くの関心を集め続け、そしてどんな場面でも使われている、ある特定の関数に対してこの記事では焦点を絞ります。この関数は「ベジエ」曲線を描きます。

ベジエ曲線は[Pierre Bézier](https://ja.wikipedia.org/wiki/%E3%83%94%E3%82%A8%E3%83%BC%E3%83%AB%E3%83%BB%E3%83%99%E3%82%B8%E3%82%A7)から名付けられました。この曲線がデザイン作業に適していることを世界に知らしめたのが、彼なのです（ルノーに勤務し、1962年にその研究を発表しました）。ただし、この曲線を「発明」したのは彼が最初で唯一というわけではありません。数学者[Paul de Casteljau](https://en.wikipedia.org/wiki/Paul_de_Casteljau)はシトロエンで働いていた1959年、この曲線の性質について研究し、ベジエ曲線の非常にエレガントな描き方を発見しました。これが最初だと言う人もいます。しかしながら、de Casteljauは自分の成果を発表しなかったため、「誰が最初か？」という問いに答えるのがとても難しくなっています。またベジエ曲線は、核心的には[Sergei Natanovich Bernstein](https://ja.wikipedia.org/wiki/%E3%82%BB%E3%83%AB%E3%82%B2%E3%82%A4%E3%83%BB%E3%83%99%E3%83%AB%E3%83%B3%E3%82%B7%E3%83%A5%E3%83%86%E3%82%A4%E3%83%B3)が研究した「ベルンシュタイン多項式」という数学関数の一種ですが、こちらの公刊に関しては少なくとも1912年まで遡ることができます。いずれにせよ、これらはほとんど瑣末なことです。より注目すべきなのは、ベジエ曲線は取り扱いに便利だいうことです。たとえば複数のベジエ曲線を繋いで、1つの曲線に見えるようにすることができます。もしあなたがPhotoshopで「パス」を描いたり、FlashやIllustrator、Inkscapeのようなベクタードローイングソフトを使ったことがあるのであれば、そこで描いてきた曲線はベジエ曲線です。

では、これを自分でプログラムしなければならないとなったらどうでしょう？ハマりどころは何でしょうか？どうやってベジエ曲線を描くのでしょう？バウンディングボックスとは何で、どうやって交点を求め、どうやったら曲線を押し出せるのでしょうか？つまるところ、ベジエ曲線に対して行いたいあらゆる操作は、どのようにすればいいのでしょう？このページはそれに答えるためにあります。数学にとりかかりましょう！

—Pomax (Twitter上では[@TheRealPomax](https://twitter.com/TheRealPomax))

<div className="note">

## Note: virtually all Bézier graphics are interactive.

This page uses interactive examples, relying heavily on [Bezier.js](http://pomax.github.io/bezierjs), as well as "real" maths (in LaTeX form) which is typeset using the most excellent [MathJax](http://MathJax.org) library. The page is generated offline as a React application, using Webpack, which has made adding "view source" options considerably more challenging. I'm still trying to figure out how to add them back in, but it didn't feel like it should hold up deploying this update compared to the previous years' version.

## This book is open source.

This book is an open source software project, and lives on two github repositorites. The first is [https://github.com/pomax/bezierinfo](https://github.com/pomax/bezierinfo) and is the purely-for-presentation version you are viewing right now. The other repository is [https://github.com/pomax/BezierInfo-2](https://github.com/pomax/BezierInfo-2), which is the development version, housing all the html, javascript, and css. You can fork either of these, and pretty much do with them as you please, except for passing it off as your own work wholesale, of course =)

## How complicated is the maths going to be?

Most of the mathematics in this Primer are early high school maths. If you understand basic arithmetic, and you know how to read English, you should be able to get by just fine. There will at times be *far* more complicated maths, but if you don't feel like digesting them, you can safely skip over them by either skipping over the "detail boxes" in section or by just jumping to the end of a section with maths that looks too involving. The end of sections typically simply list the conclusions so you can just work with those values directly.

## Questions, comments:

If you have suggestions for new sections, hit up the [Github issue tracker](https://github.com/pomax/BezierInfo-2/issues) (also reachable from the repo linked to in the upper right). If you have questions about the material, there's currently no comment section while I'm doing the rewrite, but you can use the issue tracker for that as well. Once the rewrite is done, I'll add a general comment section back in, and maybe a more topical "select this section of text and hit the 'question' button to ask a question about it" system. We'll see.

## Buy me a coffee?

If you enjoyed this book, or you simply found it useful for something you were trying to get done, and you were wondering how to let me know you appreciated this book, you can always [buy me a coffee](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW), however-much a coffee is where you live. This work has grown over the years, from a small primer to a 70ish print-page-equivalent reader on the subject of Bézier curves, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing!

</div>
