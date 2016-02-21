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
