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
 * page, and GETs that to my logger. That GET operation
 * comes from your computer, so will have your IP as part
 * of the HTTP headers.
 *
 * And that's all I really care about, because I want to
 * know how many people visit this page, and roughly where
 * they're from (gasp! IPs can be turned into rough
 * geographical location O_O).
 *
 * If you want to know what logger.php looks like, hit up
 * github. It's in referrer/logger.php
 *
 */
(function referrer(l) {
  var page = l.substring(l.lastIndexOf('/')+1).replace(".html",'');
  page = page || "index.html";
  // we don't care about file or localhost, for obvious reasons
  var loc = window.location.toString();
  if(loc.indexOf("file:///")!==-1) return;
  if(loc.indexOf("localhost")!==-1) return;
  // right, continue
  var url = "http://pomax.nihongoresources.com/pages/bezierinfo/logger.php";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url + "?" + "referrer=" + encodeURIComponent(document.referrer) + "&for=" + page, true);
  try { xhr.send(null); }
  catch(e) { /* you don't care about this error, and I can't see it, so why would we do anything with it? */ }
}(window.location.toString()));
