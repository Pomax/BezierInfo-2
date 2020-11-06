// TODO: FIXME: finish writing out this functionality

/**

Scope 0:

  check for variable declaration/assignment, as well as function
  declarations _without_ the `function` keyword

Scope 1+:

  check any not-namespaced function calls to see whether they map
  to any API functions. If they do, they should be prefixed with
  `this.`

  check any not-namespaced var references to see whether they map
  to any predefined API vars. If they do, they should be prefixed
  with `this.`

**/

function splitSymbols(v) {
  if (v.match(/\w/)) return v;
  return v.split(``);
}

class Lexer {
  constructor(code) {
    this.scope = 0;
    this.pos = 0;
    this.tokens = code.split(/\b/).map(splitSymbols).flat();
    this.scopes = [];
    console.log(this.tokens);
  }

  parse() {
    while (this.pos < this.tokens.length) {
      let token = this.tokens[this.pos++];

      if ([`const`, `let`, "var"].includes(token)) {
        this.parseVariable(token);
      }

      // skip over strings so we don't treat them as active content
      else if ([`'`, `"`, "`"].includes(token)) {
        this.parseString(token);
      }

      // figure out if
      else if (token === `(`) {
        let functor,
          i = 2;
        do {
          functor = this.tokens[this.pos - i++];
        } while (functor.match(/\s+/));

        // TODO: maths is fun?

        console.log(`[${this.scope}]: ${functor}(...`);
      } else if (token === `)`) {
      }

      // ...
      else if (token === `{`) {
        this.scopes[this.pos] = ++this.scope;
      }

      // ...
      else if (token === `}`) {
        this.scopes[this.pos] = --this.scope;
      }
    }

    console.log(this.scopes);
  }

  parseVariable(type) {
    let name;
    do {
      name = this.tokens[this.pos++];
    } while (name.match(/\s+/));
    console.log(`[${this.scope}]: ${type} ${name}`);
  }

  parseString(symbol) {
    // we technically don't really care about the contents
    // of strings, as they don't introduce new variables
    // or functions that we need to care about.
    let token;
    let buffer = [symbol];
    let blen = 1;
    do {
      token = this.tokens[this.pos++];
      buffer.push(token);
      blen++;
    } while (token !== symbol && buffer[blen - 2] !== `\\` && this.pos < this.tokens.length);
    //    buffer = buffer.join(``);
    //    if (symbol === "`") {
    //      this.parseTemplateString(buffer);
    //    }
  }

  //  parseTemplateString(buffer) {
  //    // console.log(buffer);
  //  }
}

export { Lexer };
