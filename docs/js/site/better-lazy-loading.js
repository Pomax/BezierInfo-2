/**
 * This file takes any <img> with loading="lazy" and rewrites it
 * so that it starts to load much earlier than browsers would load
 * them, so that they're already done by the time the user gets to
 * them. This (mostly) prevents the whole "you can see the image
 * loading in", which is super shitty UX.
 */

const images = Array.from(document.querySelectorAll(`img.LaTeX.SVG[loading=lazy]`));

// Deactivate the images
images.forEach((img) => {
  img.dataset.src = img.src;
  img.src = ``;
  img.removeAttribute(`loading`);
});

// Then make their activation conditional on whether
// they're close to being on-screen or not.
let observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        const pos = images.indexOf(img);
        images.splice(pos, 1);
      }
    });
  },
  { rootMargin: `100%` }
);

images.forEach((image) => {
  observer.observe(image);
});
