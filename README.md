# GenzLang 🔥

> A tiny, beginner-friendly programming language whose keywords are Gen-Z slang.
> Real lexer → parser → tree-walking interpreter. No regex hacks, no magic.

```yap
fun fib(n) {
  when (n < 2) { give n }
  give fib(n - 1) + fib(n - 2)
}

run (manifest i = 0; i < 11; i = i + 1) {
  yap("fib(" + i + ") = " + fib(i))
}
```

GenzLang (`.yap`) is dynamically typed and interpreted. It's small enough to read
in an afternoon, so it's a nice way to *see* how a language actually works under
the hood.

---

## Why this exists

Most "learn how interpreters work" projects are either toy regex tricks (not
real) or huge and intimidating. GenzLang is a genuine pipeline — lexer, recursive
descent parser, tree-walking evaluator with closures — kept deliberately tiny
and friendly. The slang keywords are just a fun coat of paint over a normal
little language.

> Want to re-skin it? Every keyword spelling lives in **one file**
> (`src/keywords.ts`). Change the table (and `LANGUAGE_NAME`) and you've made
> your own language — nothing in the lexer/parser/interpreter hard-codes a word.

---

## Install & run

**Requires Node.js 18+.**

```bash
# install the CLI globally from npm
npm i -g yaplang
```

Verify it's available anywhere (from any directory, in any shell):

```bash
yap --version    # -> 0.1.0
yap --help       # usage
```

Don't have npm publish access / want the latest from git? Install straight from
the repo, or from a local clone:

```bash
npm i -g github:xOAviOx/yap-lang   # from GitHub

# …or from a clone (also the dev setup)
git clone https://github.com/xOAviOx/yap-lang.git
cd yap-lang
npm install
npm run build
npm install -g .                   # symlinks `yap`; after edits just re-run `npm run build`
```

### Running your own `.yap` files

Create a file anywhere on disk — it doesn't need to live inside this repo:

```bash
# hello.yap (put it wherever you like)
yap("yo, I'm running GenzLang 🔥")
```

Run it with the global command, from that file's folder or via a full path:

```bash
yap hello.yap                 # relative to your current directory
yap C:\Users\you\hello.yap    # or an absolute path (Windows)
yap /home/you/hello.yap       # or an absolute path (macOS/Linux)
```

The repo ships a `mycode.yap` scratchpad and an `examples/` folder to copy from:

```bash
yap examples/fizzbuzz.yap
yap examples/fibonacci.yap
yap mycode.yap
```

> **No-install option:** to run without a global install, use the dev runner
> from inside the repo: `npm run dev -- path/to/file.yap`.

### From a clone (development)

```bash
npm install
npm run build        # bundles dist/ (CLI + lib) and the playground bundle
npm test             # vitest: lexer, parser, interpreter, examples
npm run dev -- examples/hello.yap   # run without building (via tsx)
```

### The playground (zero install, runs in your browser)

**▶ Try it live: https://xoaviox.github.io/yap-lang/** — no install, runs entirely
in your browser.

Or serve it locally:

```bash
npm run playground   # builds, then serves playground/ at a local URL
```

Then open the printed URL. Paste code on the left, hit **Run it 🔥**, see output
on the right. Everything runs client-side — there's no backend. (Press
`Ctrl`/`Cmd` + `Enter` to run.)

---

## Keywords

| Concept            | GenzLang keyword |
| ------------------ | --------------- |
| declare variable   | `manifest`      |
| print to console   | `yap` *(built-in fn)* |
| boolean true       | `nocap`         |
| boolean false      | `cap`           |
| null / empty       | `dead`          |
| if                 | `when`          |
| else if            | `orwhen`        |
| else               | `nvm`           |
| while loop         | `lockin`        |
| for loop           | `run`           |
| define function    | `fun`           |
| return             | `give`          |
| logical AND        | `plus`          |
| logical OR         | `alt`           |
| logical NOT        | `nah`           |
| break              | `drop`          |
| continue           | `move`          |

Comments are `//` to end of line. Statements end with a newline **or** a `;`
(both fine). Blocks use `{ }`.

---

## Language tour

### Variables + output

```yap
manifest lang = "GenzLang"
manifest year = 2026
yap("yo, welcome to " + lang + " 🔥")
yap("it's giving " + year + " energy fr fr")   // number coerced to text
```

Strings use double quotes and support `\n`, `\t`, `\"`, `\\`. `+` concatenates;
a number next to a string is coerced to text.

### If / else if / else

```yap
manifest score = 85
when (score >= 90) {
  yap("you ate that")
} orwhen (score >= 60) {
  yap("mid but passing")     // <- this one
} nvm {
  yap("it's giving fail")
}
```

### While loop (`lockin`) with break / continue

```yap
manifest i = 0
lockin (i < 10) {
  i = i + 1
  when (i == 3) { move }   // continue
  when (i == 7) { drop }   // break
  yap(i)                   // 1 2 4 5 6
}
```

### For loop (`run`) — C-style

```yap
run (manifest j = 0; j < 5; j = j + 1) {
  yap("rep " + j)
}
```

### Functions (`fun`), return (`give`), recursion, closures

```yap
fun add(a, b) {
  give a + b
}

fun fib(n) {
  when (n < 2) { give n }
  give fib(n - 1) + fib(n - 2)
}

yap(add(2, 3))   // 5
yap(fib(10))     // 55
```

Functions are first-class values and close over their defining scope:

```yap
fun makeCounter() {
  manifest n = 0
  fun tick() { n = n + 1  give n }
  give tick
}
manifest c = makeCounter()
yap(c())  // 1
yap(c())  // 2
```

### Arrays

```yap
manifest squad = ["zoomer", "boomer", "doomer"]
yap(squad[0])           // zoomer
squad[1] = "gamer"      // assignable by index
yap(howmany(squad))     // 3
```

### Logical operators (short-circuit)

```yap
manifest a = nocap
manifest b = cap
when (a plus nah b) { yap("logic checks out") }
```

### Truthiness (kept simple on purpose)

`cap` (false) and `dead` (null) are **falsy**. *Everything* else is
**truthy** — including `0` and `""`. No surprises for beginners.

---

## Built-in functions

| Function          | What it does                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| `yap(...args)`    | print args joined by a space, then a newline. Returns `dead`.           |
| `vibecheck(x)`    | the type as a string: `"number"`, `"string"`, `"boolean"`, `"dead"`, `"array"`, `"function"`. |
| `howmany(x)`      | length of a string or array.                                            |
| `glowup(s)`       | uppercase a string.                                                     |
| `chill(s)`        | lowercase a string.                                                     |
| `slide(arr, x)`   | push `x` onto `arr`; returns the new length.                            |
| `yoink(arr)`      | pop and return the last element (`dead` if empty).                      |
| `numify(s)`       | parse a string to a number (errors if it isn't one).                    |

---

## Errors that actually help

GenzLang never dumps a raw stack trace at users. Every error is line-numbered and
written in the language's own dialect:

```
💀 sus syntax at line 4: expected ')' after condition
💀 fr real? at line 9: 'squadd' is not defined
💀 that ain't it at line 2: can't divide by zero
```

The CLI exits non-zero on error; the playground prints the message in red.

---

## How it works

GenzLang is a classic three-stage interpreter pipeline. Source text flows through:

1. **Lexer** (`src/lexer.ts`) — scans the raw string into a flat list of
   **tokens** (numbers, strings, identifiers, keywords, operators), tagging each
   with a line and column. Newlines are significant (they end statements) but are
   suppressed inside `( )` and `[ ]` so expressions can wrap.
2. **Parser** (`src/parser.ts`) — a hand-written **recursive descent** parser
   turns tokens into an **AST** (`src/ast.ts`), following a strict precedence
   ladder: `assignment → or → and → equality → comparison → term → factor →
   unary → call/index → primary`.
3. **Interpreter** (`src/interpreter.ts`) — a **tree-walking evaluator** walks
   the AST and executes it. Variable scopes live in `src/environment.ts`;
   functions capture their environment to form closures; `return`/`break`/
   `continue` are implemented as thrown control-flow signals caught by the
   relevant node.

`src/runner.ts` glues the three together and exports `run(source, output)` — the
same function the CLI (`src/cli.ts`) and the browser playground both call. The
interpreter prints through an injectable `output` callback, which is why the
playground can capture `yap` output instead of it going to a terminal.

```
source ──▶ Lexer ──▶ tokens ──▶ Parser ──▶ AST ──▶ Interpreter ──▶ output
```

---

## Project layout

```
src/
  token.ts        Token type + TokenType enum
  keywords.ts     THE central slang keyword map (single source of truth)
  lexer.ts        source string -> tokens
  ast.ts          AST node definitions
  parser.ts       tokens -> AST (recursive descent)
  values.ts       runtime value model + helpers (stringify, truthiness, ...)
  environment.ts  variable scopes with a parent chain
  builtins.ts     the standard library (yap, howmany, ...)
  interpreter.ts  tree-walking evaluator
  errors.ts       YapError classes with line info
  runner.ts       run(source, output) — public entry point
  cli.ts          the `yap` command
playground/       single-page in-browser editor + runner
examples/         hello, fizzbuzz, fibonacci, guess_logic
tests/            vitest suites for lexer, parser, interpreter
```

---

## Contributing: add a built-in or keyword

**A new built-in function** — edit `src/builtins.ts`. Add a `BuiltinFunction`
inside `createBuiltins()`:

```ts
new BuiltinFunction("clamp", 3, (_ctx, args) => {
  // args are already evaluated YapValues; throw BuiltinError on bad input.
  const [x, lo, hi] = args as [number, number, number];
  return Math.max(lo as number, Math.min(hi as number, x as number));
}),
```

It's instantly available in every program (and the playground) as `clamp(...)`.

**A new / renamed keyword** — edit `src/keywords.ts` only. Add or change an entry
in `KEYWORDS` mapping a spelling to a `TokenType`. Because the rest of the
compiler speaks in concept-level `TokenType`s, you don't touch the lexer, parser,
or interpreter. To introduce a brand-new *concept* (say, a `switch`), you'd add a
`TokenType`, a keyword entry, an AST node, a parser rule, and an interpreter
case — in that order. Run `npm test` and add a case to the relevant suite.

---

## License

MIT
