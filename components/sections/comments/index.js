var React = require("react");

var style = {
  width: 'calc(960px + 2em)',
  marginTop: 0,
  borderTop: '1px solid rgba(255, 0, 0, 0.5)',
  paddingTop: '3em'
};

var sectionHTML = (
  <section id="comments" style={style}>
    <h2>Comments and questions</h2>

    <p>If you enjoyed this book, or you simply found it useful for something you were trying to
    get done, and you were wondering how to let me know you appreciated this book, you can
    always <a className="link" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW"
    >buy me a coffee</a>, however much a coffee is where you live. This work has grown over the
    years, from a small primer to a 70ish print-page-equivalent reader on the subject of Bézier
    curves, and a lot of coffee went into the making of it. I don't regret a minute I spent
on writing it, but I can always do with some more coffee to keep on writing!</p>

    <div id="disqus_thread"/>
  </section>
);

var CommentsAndQuestions = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Comments and Questions"
    };
  },
  componentDidMount: function() {
    if (typeof document !== "undefined") {
      var disqusScript = document.createElement("script");
      disqusScript.setAttribute("async", "async");
      disqusScript.src = "lib/site/disqus.js";
      document.head.appendChild(disqusScript);
    }
  },
  render: function() { return sectionHTML; }
});

module.exports = CommentsAndQuestions;
