var LaTeX = "\\[ {\\color{blue}E} = mc^2 \\]";
var execSync = require("child_process").execSync;
var cmd = "node mathjax.js --latex " + LaTeX;
var result = execSync(cmd);
var string = result.toString();
