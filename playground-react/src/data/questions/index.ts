import type { Question } from './types'

/**
 * Auto-discovers every question file. Adding a question = drop one new
 * `<id>-<slug>.question.ts` file in this folder — nothing else to wire up.
 */
const modules = import.meta.glob<{ default: Question }>('./*.question.ts', {
  eager: true,
})

export const QUESTIONS: Question[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.id - b.id)

export type { Question, Problem, TestCase, ProblemExample, Difficulty } from './types'