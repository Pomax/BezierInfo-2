/**
 * This file is responsible for making sure that the reddit, hn, twitter, etc. linkouts
 * are updated to reflect the section someone is reading, rather than always pointing to
 * base article itself.
 */
(function tryToBind() {
  if (!document.querySelector(`map[name="rhtimap"]`)) {
    return setTimeout(tryToBind, 300);
  }

  class Tracker {
    constructor() {
      this.section = false;
      this.hash = false;
      this.socials = ["rdt", "hn", "twt"];
    }

    update(data) {
      this.section = data.section;
      this.hash = data.hash;
      this.socials.forEach((social) => {
        var area = document.querySelector(`map area.sclnk-${social}`);
        area.href = this[`get_${social}`]();
      });
    }

    get url() {
      return encodeURIComponent(
        `https://pomax.github.io/bezierinfo${this.hash ? this.hash : ""}`
      );
    }

    getTitle() {
      var title = `A Primer on Bézier Curves`;
      if (this.section) {
        title = `${this.section}-${title}`;
      }
      return encodeURIComponent(title);
    }

    get_rdt() {
      var title = this.getTitle();
      var text = encodeURIComponent(
        `A free, online book for when you really need to know how to do Bézier things.`
      );
      return `https://www.reddit.com/submit?url=${this.url}&title=${title}&text=${text}`;
    }

    get_hn() {
      var title = this.getTitle();
      return `https://news.ycombinator.com/submitlink?u=${this.url}&t=${title}`;
    }

    get_twt() {
      var text =
        encodeURIComponent(
          `Reading "${this.section}" by @TheRealPomax over on `
        ) + this.url;
      return `https://twitter.com/intent/tweet?original_referer=${this.url}&text=${text}&hashtags=bezier,curves,maths`;
    }
  }

  // we set the section and fragmentid based on which ever section's heading is nearest
  // the top of the screen, either just off-screen or in-screen
  var tracker = new Tracker();
  var anchors = Array.from(document.querySelectorAll("section h2 a"));
  var sections = anchors.map((a) => a.parentNode);
  var sectionData = sections.map((section) => {
    return {
      section: section.textContent,
      hash: section.querySelector("a").hash,
    };
  });

  window.addEventListener(
    "scroll",
    function (evt) {
      var min = 99999999999999999;
      var element = false;
      sections.forEach((s, pos) => {
        var v = Math.abs(s.getBoundingClientRect().top);
        if (v < min) {
          min = v;
          element = pos;
        }
      });
      tracker.update(sectionData[element]);
    },
    { passive: true }
  );
})();
