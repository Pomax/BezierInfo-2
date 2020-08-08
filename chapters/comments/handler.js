/**
 * We REALLY don't want disqus to load unless the user
 * is actually looking at the comments section, because it
 * tacks on 2.5+ MB in network transfers...
 */
module.exports = {
  componentDidMount() {
    if (typeof document === "undefined") {
      return this.silence();
    }
    this.heading = document.getElementById(this.props.page);
    document.addEventListener("scroll", this.scrollHandler, {passive:true});
  },

  scrollHandler(evt) {
    var bbox = this.heading.getBoundingClientRect();
    var top = bbox.top;
    var limit = window.innerHeight;
    if (top<limit) { this.loadDisqus(); }
  },

  loadDisqus() {
    var script = document.createElement("script");
    script.src = "lib/site/disqus.js";
    script.async = true;
    document.head.appendChild(script);
    this.silence();
    this.unlisten();
  },

  silence() {
    this.loadDisqus = () => {};
  },

  unlisten() {
    document.removeEventListener("scroll", this.scrollHandler);
  }
};
