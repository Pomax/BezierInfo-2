const comments = document.getElementById(`disqus_thread`);

document.addEventListener("scroll", scrollHandler, { passive: true });

function scrollHandler() {
  var bbox = comments.getBoundingClientRect();
  var top = bbox.top;
  var limit = window.innerHeight;
  if (top < limit) {
    loadDisqus();
  }
}

let loadDisqus = () => {
  console.log(`loading Disqus comments`);

  globalThis.disqus_config = function () {
    this.page.url = "https://pomax.github.io/bezierinfo";
    this.page.identifier = "bezierinfo";
  };

  const script = document.createElement("script");
  script.src = "https://bezierinfo.disqus.com/embed.js";
  script.async = true;
  script.setAttribute("data-timestamp", Date.now());
  document.head.appendChild(script);

  loadDisqus = () => {};
  document.removeEventListener("scroll", scrollHandler);
};

scrollHandler();
