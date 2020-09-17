<?php
  /**
   * Alright, what does this do: it gets the client's IP and the
   * referring URL they communicated. Then it logs those, timestamped,
   * to a gzipped file. That's it. Why would I log anything else...?
   *
   * This lets me see roughly where in the world people are reading
   * the article (which tells me where it might make sense to tell
   * people about its existence), and it lets me see which other pages
   * on the web link to it, so I can check those pages out and maybe
   * find information that lets me improve it (like forum comments
   * about the article that people left in that forum, rather than
   * as a comment on my article).
   *
   * Lastly, it tells me how many people visit the page at all.
   * Github's gh-pages system does not do any kind of stats, so the
   * only way to find out how many daily visitors I get is by using
   * a tracking service. I don't know about you, but I'd rather have
   * a website do that itself than rely on google analytics (or
   * another third party 'you have no idea what happens with the
   * data we collect' company).
   *
   * - Pomax
   */

  // Allow the bezier article and legendre-gauss table page to call us.
  header('Access-Control-Allow-Origin: https://pomax.github.io');
  header('Access-Control-Allow-Headers: *');

  echo "accepted\n";
  // Form timestamps
  $time = microtime(true);
  $stamp = date("Y-m-d H:i:s");

  // Get the original page. This'll be a string like 'bezier' or 'legendre'.
  $for = isset($_GET["for"]) ? $_GET["for"] : '';

  // Get referrer URL.
  $ref = isset($_GET["referrer"]) ? $_GET["referrer"] : '';

  // Get the User Agent
  $ua = isset($_SERVER["HTTP_USER_AGENT"]) ? $_SERVER["HTTP_USER_AGENT"] : '';

  // Convert the data to a single line of JSON
  $json_line = '{"for": "'.$for.'",'.
             ' "time": '.$time.','.
             ' "stamp": "'.$stamp.'",'.
             ' "referrer": "'.$ref.'",'.
             ' "ua": "'.$ua.'"}' . "\n";

  // Finally, write the data to the log file.
  // (there's an .htaccess rule that prevents public access to the log files)
  $gz = gzopen('referral_log_' . date("Y-m-d") . '.gz','a9');
  gzwrite($gz, $json_line);
  gzclose($gz);

  // That's all there is.

  echo "success";
