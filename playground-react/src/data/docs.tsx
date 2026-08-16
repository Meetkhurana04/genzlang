export interface DocSnippet {
  cap?: string
  code: string
}

export interface DocBlock {
  p?: string
  ul?: string[]
  table?: { head: string[]; rows: string[][] }
  snippet?: DocSnippet
}

export interface DocSection {
  h: string
  blocks: DocBlock[]
}

export const DOC_SECTIONS: DocSection[] = [
  {
    h: 'What is GenzLang?',
    blocks: [
      {
        p: 'A tiny, dynamically-typed language whose keywords are Gen-Z slang. Everything you type runs fully in your browser — there is no server. Below is the whole language; hit <b>▶ Run</b> on any snippet to drop it into the editor and run it.',
      },
      {
        p: 'Comments are <code>//</code> to the end of the line. A statement ends with a newline <em>or</em> a <code>;</code> (either works). Blocks use <code>{ }</code>.',
      },
    ],
  },
  {
    h: 'Keywords',
    blocks: [
      {
        table: {
          head: ['Concept', 'Keyword'],
          rows: [
            ['declare variable', '<code>manifest</code>'],
            ['print', '<code>yap(...)</code> <em>(built-in)</em>'],
            ['true / false', '<code>nocap</code> / <code>cap</code>'],
            ['null / empty', '<code>dead</code>'],
            ['if / else-if / else', '<code>when</code> / <code>orwhen</code> / <code>nvm</code>'],
            ['while loop', '<code>lockin</code>'],
            ['for loop', '<code>run</code>'],
            ['define function', '<code>fun</code>'],
            ['return', '<code>give</code>'],
            ['and / or / not', '<code>plus</code> / <code>alt</code> / <code>nah</code>'],
            ['break / continue', '<code>drop</code> / <code>move</code>'],
          ],
        },
      },
    ],
  },
  {
    h: 'Types & truthiness',
    blocks: [
      {
        ul: [
          `<b>number</b> — one numeric type: <code>5</code>, <code>3.14</code>, <code>-2</code>`,
          `<b>string</b> — double quotes only, with <code>\\n</code> <code>\\t</code> <code>\\"</code> <code>\\\\</code> escapes. <code>+</code> concatenates (a number next to a string becomes text).`,
          `<b>boolean</b> — <code>nocap</code> (true) / <code>cap</code> (false)`,
          `<b>dead</b> — the null / empty value`,
          `<b>array</b> — <code>[1, "two", nocap]</code>, zero-indexed, assignable: <code>arr[0] = 9</code>`,
        ],
      },
      {
        p: `<b>Truthiness:</b> only <code>cap</code> and <code>dead</code> are falsy. <em>Everything</em> else is truthy — including <code>0</code> and <code>""</code>.`,
      },
    ],
  },
  {
    h: 'Operators',
    blocks: [
      {
        ul: [
          `<b>Arithmetic:</b> <code>+ - * / %</code>`,
          `<b>Comparison:</b> <code>== != &lt; &gt; &lt;= &gt;=</code>`,
          `<b>Logical (short-circuit):</b> <code>plus</code> (and), <code>alt</code> (or), <code>nah</code> (not)`,
          `<b>Unary:</b> <code>-x</code>, <code>nah x</code>`,
        ],
      },
      {
        p: 'Precedence, low → high: or → and → equality → comparison → <code>+ -</code> → <code>* / %</code> → unary → call/index. Group with <code>( )</code>.',
      },
    ],
  },
  {
    h: 'Variables — manifest',
    blocks: [
      {
        snippet: {
          cap: 'variables',
          code: `manifest lang = "GenzLang"
manifest level = 1
level = level + 1          // reassign (no manifest needed)
yap(lang + " level " + level)`,
        },
      },
    ],
  },
  {
    h: 'Conditionals — when / orwhen / nvm',
    blocks: [
      {
        snippet: {
          cap: 'if / else-if / else',
          code: `manifest score = 85
when (score >= 90) {
  yap("you ate that")
} orwhen (score >= 60) {
  yap("mid but passing")
} nvm {
  yap("it's giving fail")
}`,
        },
      },
    ],
  },
  {
    h: 'Loops — lockin & run',
    blocks: [
      {
        p: `<code>lockin</code> is a while loop; <code>run</code> is a C-style for loop: <code>run (init; cond; update)</code>. Use <code>drop</code> to break and <code>move</code> to continue.`,
      },
      {
        snippet: {
          cap: 'lockin (while) + drop / move',
          code: `manifest i = 0
lockin (i < 10) {
  i = i + 1
  when (i == 3) { move }   // continue
  when (i == 7) { drop }   // break
  yap(i)
}`,
        },
      },
      {
        snippet: {
          cap: 'run (for)',
          code: `run (manifest j = 0; j < 5; j = j + 1) {
  yap("rep " + j)
}`,
        },
      },
    ],
  },
  {
    h: 'Functions — fun & give',
    blocks: [
      {
        p: 'Declare with <code>fun</code>, return with <code>give</code>. Functions are first-class values and support recursion.',
      },
      {
        snippet: {
          cap: 'recursion',
          code: `fun add(a, b) {
  give a + b
}

fun fib(n) {
  when (n < 2) { give n }
  give fib(n - 1) + fib(n - 2)
}

yap(add(2, 3))   // 5
yap(fib(10))     // 55`,
        },
      },
      {
        p: 'They also close over their defining scope (closures):',
      },
      {
        snippet: {
          cap: 'closures',
          code: `fun makeCounter() {
  manifest n = 0
  fun tick() { n = n + 1  give n }
  give tick
}
manifest c = makeCounter()
yap(c())   // 1
yap(c())   // 2`,
        },
      },
    ],
  },
  {
    h: 'Arrays',
    blocks: [
      {
        snippet: {
          cap: 'arrays',
          code: `manifest squad = ["zoomer", "boomer", "doomer"]
yap(squad[0])         // zoomer
squad[1] = "gamer"      // assign by index
slide(squad, "framer")  // push
yap(howmany(squad))   // 4
yap(yoink(squad))     // framer (pop)`,
        },
      },
    ],
  },
  {
    h: 'Built-in functions',
    blocks: [
      {
        table: {
          head: ['Function', 'What it does'],
          rows: [
            ['<code>yap(...args)</code>', 'print args joined by a space; returns <code>dead</code>'],
            ['<code>vibecheck(x)</code>', 'the type as a string: <code>"number"</code>, <code>"string"</code>, <code>"boolean"</code>, <code>"dead"</code>, <code>"array"</code>, <code>"function"</code>'],
            ['<code>howmany(x)</code>', 'length of a string or array'],
            ['<code>glowup(s)</code>', 'uppercase a string'],
            ['<code>chill(s)</code>', 'lowercase a string'],
            ['<code>slide(arr, x)</code>', 'push <code>x</code> onto <code>arr</code>; returns new length'],
            ['<code>yoink(arr)</code>', 'pop &amp; return the last element (<code>dead</code> if empty)'],
            ['<code>numify(s)</code>', 'parse a string into a number'],
          ],
        },
      },
    ],
  },
  {
    h: 'Errors',
    blocks: [
      {
        p: `Errors never crash the page — they're line-numbered and written in GenzLang's own dialect, and show up red in the output:`,
      },
      {
        ul: [
          `<code>💀 sus syntax at line 4: expected ')' after condition</code>`,
          `<code>💀 fr real? at line 9: 'squadd' is not defined</code>`,
          `<code>💀 that ain't it at line 2: can't divide by zero</code>`,
        ],
      },
    ],
  },
]