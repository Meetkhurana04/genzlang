import type { Question } from './types'

export default {
  id: 6,
  title: 'Climbing Stairs',
  difficulty: 'medium',
  tags: ['recursion', 'dp'],
  statement:
    'You climb a staircase taking 1 or 2 steps at a time. Write climb(n) that returns the number of distinct ways to reach the top.',
  examples: [
    { input: 'climb(3)', output: '3' },
    { input: 'climb(5)', output: '8' },
  ],
  starter: `fun climb(n) {
  give n
}`,
  fn: 'climb',
  runCases: [
    { id: 1, args: '2', expected: '2' },
    { id: 2, args: '3', expected: '3' },
    { id: 3, args: '5', expected: '8' },
  ],
  submitCases: [
    { id: 1, args: '1', expected: '1' },
    { id: 2, args: '4', expected: '5' },
    { id: 3, args: '6', expected: '13' },
    { id: 4, args: '7', expected: '21' },
    { id: 5, args: '8', expected: '34' },
    { id: 6, args: '9', expected: '55' },
    { id: 7, args: '10', expected: '89' },
    { id: 8, args: '12', expected: '233' },
    { id: 9, args: '15', expected: '987' },
    { id: 10, args: '20', expected: '10946' },
  ],
  constraints: ['1 <= n <= 20'],
  hints: [
    'The ways to reach step n = ways to n - 1 + ways to n - 2.',
    'Base cases: climb(1) = 1 and climb(2) = 2.',
  ],
  companies: ['Amazon', 'Google'],
  solution: `fun climb(n) {
  when (n <= 2) { give n }
  give climb(n - 1) + climb(n - 2)
}`,
  expectedOutput: ['2', '3', '8'],
} satisfies Question