import { run } from '@yap/runner'
import type { TestCase } from '../data/problems'

export interface CaseVerdict {
  index: number
  args: string
  expected: string
  passed: boolean
  /** The value the function returned (the last printed line). */
  got: string
  /** Everything the user's own code printed (all lines except the driver). */
  stdout: string[]
  error: string | null
}

export interface Evaluation {
  verdicts: CaseVerdict[]
  passed: number
  total: number
  allPassed: boolean
}

/**
 * Evaluate a user's GenzLang program against a set of test cases.
 *
 * Each case is run separately: the user's code is concatenated with a driver
 * line `yap(<fn>(<args>))`. The driver's print is always the last line of
 * output — that's the returned value we compare against `expected`. Every line
 * before it is the user's own stdout, kept so they can see what their code
 * printed.
 */
export function evaluateCases(
  userCode: string,
  fn: string,
  cases: TestCase[],
): Evaluation {
  const verdicts: CaseVerdict[] = cases.map((tc) => {
    const source = userCode + `\nyap(${fn}(${tc.args}))`
    const lines: string[] = []
    const result = run(source, (t) => lines.push(t))
    const got = lines[lines.length - 1] ?? ''
    const stdout = lines.slice(0, -1)
    if (!result.ok) {
      return {
        index: tc.id,
        args: tc.args,
        expected: tc.expected,
        passed: false,
        got,
        stdout,
        error: got,
      }
    }
    return {
      index: tc.id,
      args: tc.args,
      expected: tc.expected,
      passed: got === tc.expected,
      got,
      stdout,
      error: null,
    }
  })

  const passed = verdicts.filter((v) => v.passed).length
  return {
    verdicts,
    passed,
    total: verdicts.length,
    allPassed: passed === verdicts.length,
  }
}