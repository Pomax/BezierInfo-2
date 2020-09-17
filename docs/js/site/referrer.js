/**
 * This script collects information on visitors, based
 * on their client session. It finds out which page they
 * were on when they go there, and by virtue of sending
 * that information to the logger, their IP. This is
 * information that you're sending already, anyway, but
 * I want you to know that this is what's going on.
 *
 * Which is why this script is not obfuscated. It simply
 * grabs your document.referrer value, which (unless Do
 * Not Track is enabled) will contain the location of
 * the page you were on before you clicked a link to this
 * page, and GETs that to my logger.
 *
 * If you want to know what gets logged, have a look
 * at the ./src/logger/logger.php file on github.
 *
 * If that's too much effort:
 * - the request URL
 * - the referrer URL (if there is one)
 * - the user agent
 *
 */
(function referrer(l) {
  var page = l.substring(l.lastIndexOf("/") + 1).replace(".html", "");
  page = page || "index.html";
  // we don't care about file or localhost, for obvious reasons
  var loc = window.location.toString();
  if (loc.indexOf("file:///") !== -1) return;
  if (loc.indexOf("localhost") !== -1) return;
  // right, continue
  var url = "https://pomax.nihongoresources.com/pages/bezierinfo/logger.php";
  fetch(`${url}?referrer=${encodeURIComponent(document.referrer)}&for=${page}`)
    .then((_) => {})
    .catch((_) => {});
})(window.location.toString());
