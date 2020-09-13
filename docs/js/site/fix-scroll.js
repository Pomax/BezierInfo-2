// Firefox seems to mess up on slider input immediately after navigating.
// Even weirder, forcing a scroll once the page is done loading fixes it...
if (navigator.userAgent.includes(`Firefox/`)) {
  window.onload = function () {
    window.scrollBy(0, 1);
    setTimeout(() => window.scrollBy(0, -1), 1);
  };
}
