/**
 * This file is responsible for making sure that the reddit, hn, twitter, etc. linkouts
 * are updated to reflect the section someone is reading, rather than always pointing to
 * base article itself.
 */
class Tracker {
  constructor() {
    this.name = `A Primer on Bézier Curves`;
    this.sectionTitle = false;
    this.hash = false;
    this.socials = ["rdt", "hn", "twt"];
  }

  update(section) {
    let a = section.querySelector(`h1 > a`);
    this.hash = a.hash;
    this.sectionTitle = a.textContent;
    this.socials.forEach((social) => {
      var area = document.querySelector(`map[name=rhtimap] area.sclnk-${social}`);
      area.href = this[`get_${social}`]();
    });
  }

  get url() {
    return encodeURIComponent(`https://pomax.github.io/bezierinfo${this.hash ? this.hash : ""}`);
  }

  getTitle() {
    let title = ``;
    if (this.sectionTitle) {
      title = `${this.name} — ${this.sectionTitle}`;
    }
    return encodeURIComponent(title);
  }

  get_rdt() {
    var title = this.getTitle();
    var text = encodeURIComponent(`A free, online book for when you really need to know how to do Bézier things.`);
    return `https://www.reddit.com/submit?url=${this.url}&title=${title}&text=${text}`;
  }

  get_hn() {
    var title = this.getTitle();
    return `https://news.ycombinator.com/submitlink?u=${this.url}&t=${title}`;
  }

  get_twt() {
    var text = encodeURIComponent(`Reading “${this.sectionTitle}” by @TheRealPomax over on `) + this.url;
    return `https://twitter.com/intent/tweet?original_referer=${this.url}&text=${text}&hashtags=bezier,curves,maths`;
  }
}

// we set the section and fragmentid based on which ever section's heading is nearest
// the top of the screen, either just off-screen or in-screen
const tracker = new Tracker();
const sections = Array.from(document.querySelectorAll("#chapters section"));
let prevScroll = 0;
window.addEventListener(
  `scroll`,
  (evt) => {
    // which direction are we scrolling?
    const diff = window.scrollY - prevScroll;
    prevScroll = window.scrollY;
    const vh = window.innerHeight,
      t = 0.33,
      vht = t * vh,
      vhb = (1 - t) * vh;
    for (let s = 0, e = sections.length; s < e; s++) {
      let section = sections[s];
      let bbox = section.getBoundingClientRect();
      if (bbox.top < vht && bbox.bottom > vhb) {
        tracker.update(section);
      }
    }
  },
  { passive: true }
);
