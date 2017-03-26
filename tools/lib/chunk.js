/**
 * fix the stupid nonsense inability for markdown parsers to see link
 * syntax with `)` in the links themselves.
 */
function fixMarkDownLinks(data, chunks, chunkMore) {
  var next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      fixes = [];

  data.replace(/\[[^\]]+\]\(/g, function(_match, pos, _fullstring) {
    // this is the start of a link. Find the offset at which the next `)`
    // is actually the link closer.
    var offset = 0;
    var start = pos + _match.length;
    var complex = false;
    for (let d=0, i=start; i<data.length; i++) {
      if (data[i] === '(') { d++; complex = true; }
      else if (data[i] === ')') { d--; }
      if (d<0) { offset = i - start; break; }
    }
    var end = start + offset;
    // we now know the *actual* link length. Safify it.
    if (complex) { fixes.push({ start, end, data: data.substring(start,end) }); }
    // and return the matched text because we don't want to replace right now.
    return _match
  });

  // let's safify this data, if there was a complex pattern that needs fixin'
  if (fixes.length>0) {
    fixes.forEach(fix => {
      let s = fix.start,
          e = fix.end,
          newdata = fix.data.replace(/\(/g, '%28').replace(/\)/g, '%29');
      // I can't believe I still have to do this in 2017...
      data = data.substring(0,s) + newdata + data.substring(e);
    });
  }

  // alright, let "the rest" deal with this data now.
  performChunking(data, chunks, next, otherChunkers);
}

/**
 * ...
 */
function chunkStyleTags(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      styleTag = '<style>',
      styleTagEnd = '</style>';

  while (p !== -1) {
    // Let's check a BSplineGraphic tag
    let style = data.indexOf(styleTag, p);
    if (style === -1) {
      // No <BSplineGraphic/> block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-<BSplineGraphic/> data for whatever else might be in there.
    performChunking(data.substring(p, style), chunks, next, otherChunkers);

    let tail = data.substring(style), eol, styledata;

    // Then capture the <BSplineGraphic>...</BSplineGraphic> or <BSplineGraphic .../> block and mark it as "don't convert".
    eol = data.indexOf(styleTagEnd, style) + styleTagEnd.length;
    styledata = data.substring(style, eol);
    styledata = styledata.replace(/([{}])/g,"{'$1'}");
    chunks.push({ convert: false, type: "style", s:style, e:eol, data: styledata });
    p = eol;
  }
}


/**
 * ...
 */
function chunkScriptTags(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      scriptTag = '<script',
      scriptTagEnd = '</script>';

  while (p !== -1) {
    // Let's check a BSplineGraphic tag
    let script = data.indexOf(scriptTag, p);
    if (script === -1) {
      // No <BSplineGraphic/> block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-<BSplineGraphic/> data for whatever else might be in there.
    performChunking(data.substring(p, script), chunks, next, otherChunkers);

    let tail = data.substring(script), eol, scriptdata;

    // Then capture the <BSplineGraphic>...</BSplineGraphic> or <BSplineGraphic .../> block and mark it as "don't convert".
    eol = data.indexOf(scriptTagEnd, script) + scriptTagEnd.length;
    scriptdata = data.substring(script, eol);
    scriptdata.replace(/\/\*[\w\s]+\*\//g,'');
    chunks.push({ convert: false, type: "script", s:script, e:eol, data:scriptdata });
    p = eol;
  }
}

/**
 * ...
 */
function chunkBSplineGraphicsJSX(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      bgfxTag = '<BSplineGraphic',
      bgfxEnd = '/>',
      bgfxEnd2 = '</BSplineGraphic>';

  while (p !== -1) {
    // Let's check a BSplineGraphic tag
    let bgfx = data.indexOf(bgfxTag, p);
    if (bgfx === -1) {
      // No <BSplineGraphic/> block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-<BSplineGraphic/> data for whatever else might be in there.
    performChunking(data.substring(p, bgfx), chunks, next, otherChunkers);

    let tail = data.substring(bgfx),
        noContent = !!tail.match(/^<BSplineGraphic[^>]+\/>/),
        eol;

    // Then capture the <BSplineGraphic>...</BSplineGraphic> or <BSplineGraphic .../> block and mark it as "don't convert".
    if (noContent) {
      eol = data.indexOf(bgfxEnd, bgfx) + bgfxEnd.length;
    } else {
      eol = data.indexOf(bgfxEnd2, bgfx) + bgfxEnd2.length;
    }

    chunks.push({ convert: false, type: "bgfx", s:bgfx, e:eol, data: data.substring(bgfx, eol) });
    p = eol;
  }
}


/**
 * ...
 */
function chunkGraphicJSX(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      gfxTag = '<Graphic',
      gfxEnd = '/>',
      gfxEnd2 = '</Graphic>';

  while (p !== -1) {
    // Let's check a Graphic tag
    let gfx = data.indexOf(gfxTag, p);
    if (gfx === -1) {
      // No <Graphic/> block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-<Graphic/> data for whatever else might be in there.
    performChunking(data.substring(p, gfx), chunks, next, otherChunkers);

    let tail = data.substring(gfx),
        noContent = !!tail.match(/^<Graphic[^>]+\/>/),
        eol;

    // Then capture the <Graphic>...</Graphic> or <Graphic .../> block and mark it as "don't convert".
    if (noContent) {
      eol = data.indexOf(gfxEnd, gfx) + gfxEnd.length;
    } else {
      eol = data.indexOf(gfxEnd2, gfx) + gfxEnd2.length;
    }

    chunks.push({ convert: false, type: "gfx", s:gfx, e:eol, data: data.substring(gfx, eol) });
    p = eol;
  }
}

/**
 * ...
 */
function chunkDivEnds(data, chunks, chunkMore) {
  var next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false;

  var splt = data.split('</div>');
  var dlen = splt.length;
  splt.forEach( function(segment, pos) {
    performChunking(segment, chunks, next, otherChunkers);
    if (pos < dlen-1) {
      chunks.push({ convert: false, type: '</div>', s:-1, e:-1, data: '</div>' });
    }
  });
}


/**
 * ...
 */
function chunkTable(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      tableMatch = '\n<table',
      tableClosingTag = '</table>\n';

  while (p !== -1) {
    // Let's check for a <table> tag
    let table = data.indexOf(tableMatch, p);
    if (table === -1) {
      // No tables found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-table data for whatever else might be in there.
    performChunking(data.substring(p, table), chunks, next, otherChunkers);

    // then mark the table code as no-convert
    let eod = data.indexOf(tableClosingTag, table) + tableClosingTag.length;
    chunks.push({ convert: false, type: "table", s:table, e:eod, data: data.substring(table, eod) });
    p = eod;
  }
}

/**
 * ...
 */
function chunkDivs(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      divMatch = '\n<div className="',
      divEnd = '">\n',
      divClosingTag = '</div>\n';

  while (p !== -1) {
    // Let's check for a <div className="..."> tag
    let div = data.indexOf(divMatch, p);
    if (div === -1) {
      // No div tags found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-div data for whatever else might be in there.
    performChunking(data.substring(p, div), chunks, next, otherChunkers);

    // Now, if we have a div, there's a few options:
    //
    // - "figure" contains HTML content, not to be converted
    // - "note" contains markdown content, to be converted
    // - "howtocode" contains markdown content, to be converted
    let className = data.substring(div).match(/className="([^"]+)"/);
    if (className !== null) { className = className[1]; }

    let eod, type="div";
    if (className === "figure" || className === "two-column") {
      eod = data.indexOf(divClosingTag, div) + divClosingTag.length;
      type += "." + className;
    } else {
      eod = data.indexOf(divEnd, div) + divEnd.length;
    }
    chunks.push({ convert: false, type: type, s:div, e:eod, data: data.substring(div, eod) });
    p = eod;
  }
}

/**
 * Split data up into "latex" and "not latex".
 * Anything that is not latex might still be "not markdown"
 * though, so we hand that data off to additional chunkers
 */
function chunkLatex(data, chunks, chunkMore) {
  var p = 0,
      next = chunkMore ? chunkMore[0] : false,
      otherChunkers = chunkMore ? chunkMore.slice(1) : false,
      latexEnd = '\\]';

  while (p !== -1) {
    // Let's check a LaTeX block
    let latex = data.indexOf('\\[', p);
    if (latex === -1) {
      // No LaTeX block found: we're done here. Parse the remaining
      // data for whatever else might be in there.
      performChunking(data.substring(p), chunks, next, otherChunkers);
      break;
    }

    // First parse the non-LaTeX data for whatever else might be in there.
    performChunking(data.substring(p, latex), chunks, next, otherChunkers);

    // Then capture the LaTeX block and mark it as "don't convert"
    let eol = data.indexOf(latexEnd, latex) + latexEnd.length;
    chunks.push({ convert: false, type: "latex", s:latex, e:eol, data: data.substring(latex, eol) });
    p = eol;
  }
}

// in-place chunking
function performChunking(data, chunks, chunker, moreChunkers) {
  // If there's no further chunking function to run, just
  // record this data as a chunk of convertible data.
  if (!chunker) {
    if (data.trim()!=='') {
      chunks.push({ convert: true, data: data });
    }
    return "early";
  }

  // otherwise, perform more chunking.
  chunker(data, chunks, moreChunkers);
}

/**
 * Split data up into "markdown" and "not markdown" parts.
 * We'll only run markdown conversion on the markdown parts.
 */
module.exports = function chunk(data) {
  var chunks = [];
  var chunkers = [
    chunkDivs,
    chunkDivEnds,
    chunkTable,
    chunkGraphicJSX,
    chunkBSplineGraphicsJSX,
    chunkScriptTags,
    chunkStyleTags,
    fixMarkDownLinks
  ];

  performChunking(data, chunks, chunkLatex,chunkers);

  return chunks;
};
