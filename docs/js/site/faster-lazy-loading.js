/**
 * This file takes any <img> with loading="lazy" and rewrites it
 * so that it starts to load much earlier than browsers would load
 * them, so that they're already done by the time the user gets to
 * them. This prevents the ridiculous "don't start loading the img
 * until we're already looking at the empty bounding box".
 */

const images = Array.from(
  document.querySelectorAll(`img.LaTeX.SVG[loading=lazy]`)
);

// First, make images inert. As this happens before the document
// becomes active, this prevents images from loading anything.
//
// Also, by having JS deactivate the images, anyone running with
// JS disabled will still see images load in properly. In fact,
// the "lazy" attribute gets ignored when JS is disabled and all
// images will just load in immediately.

images.forEach((img) => {
  // non-negotiable order of operations:
  img.dataset.src = img.src;
  img.src = ``;
  img.removeAttribute(`loading`);
});

// Then tack on the functionality that reactivates them based on viewport distance.

let lock = false;
let retry = false;

/**
 * Test all images during scroll, in a way that doesn't hang the browser.
 */
function testImages() {
  if (lock) {
    if (retry) retry = clearTimeout(retry);
    retry = setTimeout(testImages, 200);
  }

  lock = true;

  let height = document.documentElement.clientHeight;

  for (let pos = images.length - 1; pos >= 0; pos--) {
    test(images[pos], pos, height);
  }

  if (images.length === 0) {
    window.removeEventListener("scroll", testImages);
    if (retry) clearTimeout(retry);
  }

  lock = false;
}

/**
 * Test individual images for whether or not they should load.
 */
function test(img, pos, height) {
  let top = img.getBoundingClientRect().top;
  top = top < height;

  let bottom = img.getBoundingClientRect().bottom;
  bottom = bottom > -height;

  if (top || bottom) {
    img.src = img.dataset.src;
    images.splice(pos, 1);
  }
}

/**
 * Remember to listen for scroll passively. If you don't, bad things happen.
 */
window.addEventListener("scroll", testImages, { passive: true });
