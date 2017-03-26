module.exports = {
  componentDidMount() {
    if (typeof document !== "undefined") {
      var script = document.createElement("script");
      script.src = "lib/site/disqus.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }
};
