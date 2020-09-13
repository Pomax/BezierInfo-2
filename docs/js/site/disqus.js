new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadDisqus();
    }
  });
}).observe(document.getElementById(`disqus_thread`));

let loadDisqus = () => {
  loadDisqus = () => {};
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
};
