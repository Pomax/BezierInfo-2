export default function markupCode(chunk, _num, _pathdata, _localStrings) {
  // First, we need to figure out what the global indent is,
  // and remove it from all lines if there is any.
  const indent = chunk.match(/^\s*/)[0];
  const regex = new RegExp(`^${indent}`);
  const lines = chunk.split("\n").map((v) => v.replace(regex, ``));

  // remove block start and end
  lines.shift();
  lines.pop();

  // Then we can build an enumerated table of code, because that's essentially
  // what code is. However, we want to put the code itself into a single
  // text block, because <textarea> is very special in that it will literally
  // allow *anything* until its closing tag. That means things nothing
  // needs to be "made safe". It also means we can't do syntax highlighting
  // in a textarea itself, but that's fine.
  const rowCount = lines.length;
  const HTML = `
    <table class="code">${lines
      .map(
        (_, pos) =>
          `<tr><td>${pos + 1}</td>${
            pos > 0
              ? ``
              : `<td rowspan="${rowCount}">
          <textarea disabled rows="${rowCount}" role="doc-example">${lines.join(`\n`)}</textarea>
        </td>`
          }</tr>`
      )
      .join(`\n`)}</table>
  `;

  return HTML;
}
