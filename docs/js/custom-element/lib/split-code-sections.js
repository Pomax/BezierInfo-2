/**
 * Get all code that isn't contained in functions.
 * We're going to regexp our way to flawed victory here.
 */
export default function splitCodeSections(code) {
  // removs comments and superfluous white space.
  code = code.replace(/\\\*[\w\s\r\n]+?\*\\/, ``);
  code = code.replace(/\r?\n(\r?\n)+/, `\n`);

  const re = /\b[\w\W][^\s]*?\([^)]*\)[\r\n\s]*{/;
  const cuts = [];
  for (let result = code.match(re); result; result = code.match(re)) {
    result = result[0];

    let start = code.indexOf(result);
    let end = start + result.length;
    let depth = 0;
    let slice = Array.from(code).slice(start + result.length);

    slice.some((c, pos) => {
      if (c === `{`) {
        depth++;
        return false;
      }
      if (c === `}`) {
        if (depth > 0) {
          depth--;
          return false;
        }
        end += pos + 1;
        return true;
      }
    });

    let cut = code.slice(start, end);
    cuts.push(cut);
    code = code.replace(cut, ``);
  }
  return {
    quasiGlobal: code,
    classCode: cuts.join(`\n`),
  };
}
