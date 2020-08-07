/**
 * Normalise an SVG path to absolute coordinates
 * and full commands, rather than relative coordinates
 * and/or shortcut commands.
 */
function normalizePath(d) {
  // preprocess "d" so that we have spaces between values
  d = d
    .replace(/,/g, " ") // replace commas with spaces
    .replace(/-/g, " - ") // add spacing around minus signs
    .replace(/-\s+/g, "-") // remove spacing to the right of minus signs.
    .replace(/([a-zA-Z])/g, " $1 ");

  // set up the variables used in this function
  var instructions = d.replace(/([a-zA-Z])\s?/g, "|$1").split("|"),
    instructionLength = instructions.length,
    i,
    instruction,
    op,
    lop,
    args = [],
    alen,
    a,
    sx = 0,
    sy = 0,
    x = 0,
    y = 0,
    cx = 0,
    cy = 0,
    cx2 = 0,
    cy2 = 0,
    normalized = "";

  // we run through the instruction list starting at 1, not 0,
  // because we split up "|M x y ...." so the first element will
  // always be an empty string. By design.
  for (i = 1; i < instructionLength; i++) {
    // which instruction is this?
    instruction = instructions[i];
    op = instruction.substring(0, 1);
    lop = op.toLowerCase();

    // what are the arguments? note that we need to convert
    // all strings into numbers, or + will do silly things.
    args = instruction
      .replace(op, "")
      .trim()
      .split(" ");
    args = args
      .filter(function(v) {
        return v !== "";
      })
      .map(parseFloat);
    alen = args.length;

    // we could use a switch, but elaborate code in a "case" with
    // fallthrough is just horrid to read. So let's use ifthen
    // statements instead.

    // moveto command (plus possible lineto)
    if (lop === "m") {
      normalized += "M ";
      if (op === "m") {
        x += args[0];
        y += args[1];
      } else {
        x = args[0];
        y = args[1];
      }
      // records start position, for dealing
      // with the shape close operator ('Z')
      sx = x;
      sy = y;
      normalized += x + " " + y + " ";
      if (alen > 2) {
        for (a = 0; a < alen; a += 2) {
          if (op === "m") {
            x += args[a];
            y += args[a + 1];
          } else {
            x = args[a];
            y = args[a + 1];
          }
          normalized += ["L",x,y,''].join(" ");
        }
      }
    } else if (lop === "l") {
      // lineto commands
      for (a = 0; a < alen; a += 2) {
        if (op === "l") {
          x += args[a];
          y += args[a + 1];
        } else {
          x = args[a];
          y = args[a + 1];
        }
        normalized += ["L",x,y,''].join(" ");
      }
    } else if (lop === "h") {
      for (a = 0; a < alen; a++) {
        if (op === "h") {
          x += args[a];
        } else {
          x = args[a];
        }
        normalized += ["L",x,y,''].join(" ");
      }
    } else if (lop === "v") {
      for (a = 0; a < alen; a++) {
        if (op === "v") {
          y += args[a];
        } else {
          y = args[a];
        }
        normalized += ["L",x,y,''].join(" ");
      }
    } else if (lop === "q") {
      // quadratic curveto commands
      for (a = 0; a < alen; a += 4) {
        if (op === "q") {
          cx = x + args[a];
          cy = y + args[a + 1];
          x += args[a + 2];
          y += args[a + 3];
        } else {
          cx = args[a];
          cy = args[a + 1];
          x = args[a + 2];
          y = args[a + 3];
        }
        normalized += ["Q",cx,cy,x,y,''].join(" ");
      }
    } else if (lop === "t") {
      for (a = 0; a < alen; a += 2) {
        // reflect previous cx/cy over x/y
        cx = x + (x - cx);
        cy = y + (y - cy);
        // then get real end point
        if (op === "t") {
          x += args[a];
          y += args[a + 1];
        } else {
          x = args[a];
          y = args[a + 1];
        }
        normalized += ["Q",cx,cy,x,y,''].join(" ");
      }
    } else if (lop === "c") {
      // cubic curveto commands
      for (a = 0; a < alen; a += 6) {
        if (op === "c") {
          cx = x + args[a];
          cy = y + args[a + 1];
          cx2 = x + args[a + 2];
          cy2 = y + args[a + 3];
          x += args[a + 4];
          y += args[a + 5];
        } else {
          cx = args[a];
          cy = args[a + 1];
          cx2 = args[a + 2];
          cy2 = args[a + 3];
          x = args[a + 4];
          y = args[a + 5];
        }
        normalized += ["C",cx,cy,cx2,cy2,x,y,''].join(" ");
      }
    } else if (lop === "s") {
      for (a = 0; a < alen; a += 4) {
        // reflect previous cx2/cy2 over x/y
        cx = x + (x - cx2);
        cy = y + (y - cy2);
        // then get real control and end point
        if (op === "s") {
          cx2 = x + args[a];
          cy2 = y + args[a + 1];
          x += args[a + 2];
          y += args[a + 3];
        } else {
          cx2 = args[a];
          cy2 = args[a + 1];
          x = args[a + 2];
          y = args[a + 3];
        }
        normalized +=["C",cx,cy,cx2,cy2,x,y,''].join(" ");
      }
    } else if (lop === "z") {
      normalized += "Z ";
      // not unimportant: path closing changes the current x/y coordinate
      x = sx;
      y = sy;
    }
  }
  return normalized.trim();
}

module.exports = normalizePath;
