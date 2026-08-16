import { QUESTIONS } from './questions'
import type { Problem, Difficulty } from './questions'

/** Everything the app renders, minus reference solutions. */
export const PROBLEMS: Problem[] = QUESTIONS.map(
  ({ solution: _solution, expectedOutput: _expectedOutput, ...problem }) => problem,
)

export const DIFFICULTY_COUNTS = {
  easy: PROBLEMS.filter((p) => p.difficulty === 'easy').length,
  medium: PROBLEMS.filter((p) => p.difficulty === 'medium').length,
  hard: PROBLEMS.filter((p) => p.difficulty === 'hard').length,
  total: PROBLEMS.length,
}

export const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; color: string; dot: string }
> = {
  easy: { label: 'Easy', color: 'text-success', dot: 'bg-success' },
  medium: { label: 'Medium', color: 'text-warning', dot: 'bg-warning' },
  hard: { label: 'Hard', color: 'text-error', dot: 'bg-error' },
}

export type {
  Problem,
  Difficulty,
  TestCase,
  ProblemExample,
} from './questions'