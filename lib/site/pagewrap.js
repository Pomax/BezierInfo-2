module.exports = function(title, html) {
  return [
    "<!doctype html>",
    "<html>",
      "<head>",
        "<meta charset='utf-8'>",
        "<title>",
          title,
        "</title>",
        "<base href='..'>",
      "</head>",
      "<body>",
        html,
      "</body>",
    "</html>"
  ].join('\n');
};

