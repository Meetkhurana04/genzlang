import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { run } from "../src/runner.js";

const here = dirname(fileURLToPath(import.meta.url));
const exampleDir = resolve(here, "../examples");

/** Runs source and returns the lines yapped (and any error message). */
function exec(source: string): { lines: string[]; ok: boolean; error?: string } {
  const lines: string[] = [];
  const result = run(source, (t) => lines.push(t));
  return { lines, ok: result.ok, error: result.error };
}

/** Runs source, asserting success, and returns the printed lines. */
function lines(source: string): string[] {
  const r = exec(source);
  expect(r.error, r.error).toBeUndefined();
  expect(r.ok).toBe(true);
  return r.lines;
}

describe("interpreter — section 3.4 examples", () => {
  it("variables + output (string/number concat)", () => {
    expect(
      lines('manifest lang = "GenzLang"\nmanifest year = 2026\nyap("yo, welcome to " + lang + ", year " + year)'),
    ).toEqual(["yo, welcome to GenzLang, year 2026"]);
  });

  it("if / orwhen / nvm", () => {
    const program = `
      manifest score = 85
      when (score >= 90) {
        yap("you ate that")
      } orwhen (score >= 60) {
        yap("mid but passing")
      } nvm {
        yap("it's giving fail")
      }
    `;
    expect(lines(program)).toEqual(["mid but passing"]);
  });

  it("while loop with break (dip) and continue (move)", () => {
    const program = `
      manifest i = 0
      lockin (i < 10) {
        i = i + 1
        when (i == 3) { move }
        when (i == 7) { dip }
        yap(i)
      }
    `;
    expect(lines(program)).toEqual(["1", "2", "4", "5", "6"]);
  });

  it("run (for) loop", () => {
    const program = `run (manifest j = 0; j < 5; j = j + 1) { yap("rep " + j) }`;
    expect(lines(program)).toEqual([
      "rep 0",
      "rep 1",
      "rep 2",
      "rep 3",
      "rep 4",
    ]);
  });

  it("functions, return, and recursion", () => {
    const program = `
      fun add(a, b) { bet a + b }
      fun fib(n) {
        when (n < 2) { bet n }
        bet fib(n - 1) + fib(n - 2)
      }
      yap(add(2, 3))
      yap(fib(10))
    `;
    expect(lines(program)).toEqual(["5", "55"]);
  });

  it("arrays: index access, assignment, howmany", () => {
    const program = `
      manifest squad = ["zoomer", "boomer", "doomer"]
      yap(squad[0])
      squad[1] = "gamer"
      yap(squad[1])
      yap(howmany(squad))
    `;
    expect(lines(program)).toEqual(["zoomer", "gamer", "3"]);
  });

  it("logical operators with short-circuit + nah (not)", () => {
    const program = `
      manifest a = nocap
      manifest b = cap
      when (a plus nah b) { yap("logic checks out") }
    `;
    expect(lines(program)).toEqual(["logic checks out"]);
  });
});

describe("interpreter — built-ins", () => {
  it("vibecheck reports types", () => {
    expect(
      lines(
        `yap(vibecheck(5))
         yap(vibecheck("hi"))
         yap(vibecheck(nocap))
         yap(vibecheck(dead))
         yap(vibecheck([1,2]))
         fun f() { bet 1 }
         yap(vibecheck(f))`,
      ),
    ).toEqual(["number", "string", "boolean", "dead", "array", "function"]);
  });

  it("howmany counts strings and arrays", () => {
    expect(lines('yap(howmany("hello"))\nyap(howmany([1,2,3]))')).toEqual([
      "5",
      "3",
    ]);
  });

  it("glowup / chill change case", () => {
    expect(lines('yap(glowup("yap"))\nyap(chill("LOUD"))')).toEqual([
      "YAP",
      "loud",
    ]);
  });

  it("slide pushes and yoink pops", () => {
    const program = `
      manifest a = [1, 2]
      yap(slide(a, 3))
      yap(a)
      yap(yoink(a))
      yap(a)
    `;
    expect(lines(program)).toEqual(["3", "[1, 2, 3]", "3", "[1, 2]"]);
  });

  it("numify parses numbers", () => {
    expect(lines('yap(numify("42") + 8)')).toEqual(["50"]);
  });
});

describe("interpreter — semantics", () => {
  it("treats 0 and empty string as truthy, cap and dead as falsy", () => {
    const program = `
      when (0) { yap("zero truthy") }
      when ("") { yap("empty truthy") }
      when (cap) { yap("nope") } nvm { yap("cap falsy") }
      when (dead) { yap("nope") } nvm { yap("dead falsy") }
    `;
    expect(lines(program)).toEqual([
      "zero truthy",
      "empty truthy",
      "cap falsy",
      "dead falsy",
    ]);
  });

  it("supports closures", () => {
    const program = `
      fun makeCounter() {
        manifest n = 0
        fun tick() { n = n + 1\n bet n }
        bet tick
      }
      manifest c = makeCounter()
      yap(c())
      yap(c())
      yap(c())
    `;
    expect(lines(program)).toEqual(["1", "2", "3"]);
  });

  it("modulo and division work", () => {
    expect(lines("yap(17 % 5)\nyap(10 / 4)")).toEqual(["2", "2.5"]);
  });
});

describe("interpreter — error handling", () => {
  it("reports undefined variables with a line number, no crash", () => {
    const r = exec("yap(squadd)");
    expect(r.ok).toBe(false);
    expect(r.error).toContain("squadd");
    expect(r.error).toMatch(/line 1/);
  });

  it("reports division by zero", () => {
    const r = exec("yap(1 / 0)");
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/divide by zero/);
  });

  it("reports out-of-bounds array access", () => {
    const r = exec("manifest a = [1]\nyap(a[5])");
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/out of bounds/);
  });

  it("reports calling a non-function", () => {
    const r = exec("manifest x = 5\nyap(x())");
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/not a bestie/);
  });

  it("reports wrong argument count", () => {
    const r = exec("fun add(a, b) { bet a + b }\nyap(add(1))");
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/wants 2 args but got 1/);
  });

  it("syntax errors do not throw out of run()", () => {
    const r = exec("when (x { }");
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/sus syntax/);
  });
});

describe("example programs (definition of done)", () => {
  function runFile(name: string): string[] {
    const src = readFileSync(resolve(exampleDir, name), "utf8");
    return lines(src);
  }

  it("hello.yap", () => {
    expect(runFile("hello.yap")[0]).toBe("yo, welcome to GenzLang 🔥");
  });

  it("fizzbuzz.yap prints correct FizzBuzz 1–20", () => {
    expect(runFile("fizzbuzz.yap")).toEqual([
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
      "16",
      "17",
      "Fizz",
      "19",
      "Buzz",
    ]);
  });

  it("fibonacci.yap prints fib(10) = 55", () => {
    const out = runFile("fibonacci.yap");
    expect(out[0]).toBe("fib(10) = 55");
    expect(out[1]).toBe("[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]");
  });

  it("guess_logic.yap runs end to end", () => {
    const out = runFile("guess_logic.yap");
    expect(out).toEqual([
      "3 is lowkey too small",
      "10 is highkey too big",
      "you ate that — 7 is it!",
      "logic checks out",
      "at least one of them is nocap",
      "count 1",
      "count 2",
      "count 4",
      "count 5",
      "count 6",
    ]);
  });
});
