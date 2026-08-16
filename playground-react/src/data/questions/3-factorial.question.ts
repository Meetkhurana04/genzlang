import type { Question } from './types'

export default {
  id: 3,
  title: 'Factorial',
  difficulty: 'easy',
  tags: ['recursion', 'math'],
  statement:
    'Write a recursive function fact(n) that returns n! — the product 1 × 2 × … × n.',
  examples: [
    { input: 'fact(0)', output: '1' },
    { input: 'fact(5)', output: '120' },
  ],
  starter: `fun fact(n) {
  give 1
}`,
  fn: 'fact',
  runCases: [
    { id: 1, args: '0', expected: '1' },
    { id: 2, args: '1', expected: '1' },
    { id: 3, args: '5', expected: '120' },
  ],
  submitCases: [
    { id: 1, args: '2', expected: '2' },
    { id: 2, args: '3', expected: '6' },
    { id: 3, args: '4', expected: '24' },
    { id: 4, args: '6', expected: '720' },
    { id: 5, args: '7', expected: '5040' },
    { id: 6, args: '8', expected: '40320' },
    { id: 7, args: '9', expected: '362880' },
    { id: 8, args: '10', expected: '3628800' },
    { id: 9, args: '11', expected: '39916800' },
    { id: 10, args: '12', expected: '479001600' },
  ],
  constraints: ['0 <= n <= 12'],
  hints: [
    'fact(0) and fact(1) are both 1 — that is your base case.',
    'n! = n × (n - 1)! — call fact(n - 1) and multiply the result by n.',
  ],
  companies: ['Google', 'Amazon'],
  solution: `fun fact(n) {
  when (n <= 1) { give 1 }
  give n * fact(n - 1)
}`,
  expectedOutput: ['1', '1', '120'],
} satisfies Question