function scrollToHash() {
  window.location = window.location.hash;
}

module.exports = function() {
  if (typeof window === "undefined") return;

  if (window.location) {
    var h = window.location.hash;
    if (h) {
      // is this a comment hash, or a section hash?
      if (h.match(/comment-\d+/)) {
        var MutationObserver =
          window.MutationObserver || window.WebKitMutationObserver;

        div = document.getElementById("disqus_thread");

        var mObject = new MutationObserver(function(changes, observer) {
          var limit = 10;
          (function waitForCommentToLoad() {
            if (document.querySelector(h)) {
              return scrollToHash();
            }
            if (limit-- < 0) return;
            setTimeout(waitForCommentToLoad, 200);
          })();
          mObject.disconnect();
        });

        mObject.observe(div, { childList: true, subtree: true });

        // kick off disqus loading
        comments = document.getElementById("comments");
        comments.scrollIntoView();
      } else {
        scrollToHash();
      }
    }
  }
};
