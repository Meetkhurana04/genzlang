import { QUESTIONS } from './questions'

export interface ProblemSolution {
  code: string
  expectedOutput: string[]
}

/**
 * Reference solutions for every problem, keyed by problem id — derived
 * automatically from the question files. Add a question and its solution
 * appears here with no extra wiring.
 */
export const SOLUTIONS: Record<number, ProblemSolution> = Object.fromEntries(
  QUESTIONS.map((q) => [
    q.id,
    { code: q.solution, expectedOutput: q.expectedOutput },
  ]),
)