export type Difficulty = 'easy' | 'medium' | 'hard'

export interface ProblemExample {
  input: string
  output: string
}

/**
 * A single test case. The problem page evaluates it by appending a driver
 * line to the user's code: `yap(<fn>(<args>))` — the function's returned
 * value (the last printed line) is compared against `expected`.
 */
export interface TestCase {
  id: number
  args: string
  expected: string
}

/**
 * Full content of one question. Each question lives in its own file under
 * src/data/questions/ — to add a question just drop one new file in that
 * folder (named `<id>-<slug>.question.ts`), and the index auto-discovers it.
 * No other wiring needed: the page fetches, runs and verifies automatically.
 */
export interface Question {
  id: number
  title: string
  difficulty: Difficulty
  tags: string[]
  statement: string
  examples: ProblemExample[]
  /** Skeleton the editor starts with. */
  starter: string
  /** Name of the function the test harness calls. */
  fn: string
  /** Visible cases shown when you hit Run (3). */
  runCases: TestCase[]
  /** Hidden cases used when you hit Submit (10). */
  submitCases: TestCase[]
  constraints: string[]
  hints: string[]
  companies: string[]
  /** Reference / optimal solution in GenzLang. */
  solution: string
  /** Expected output lines of the reference solution. */
  expectedOutput: string[]
}

/** A question without its reference solution — what the app renders. */
export type Problem = Omit<Question, 'solution' | 'expectedOutput'>