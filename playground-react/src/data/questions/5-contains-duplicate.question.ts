import type { Question } from './types'

export default {
  id: 5,
  title: 'Contains Duplicate',
  difficulty: 'easy',
  tags: ['arrays', 'nested loops'],
  statement:
    'Write hasDup(nums) that returns nocap if any value appears more than once, and cap otherwise.',
  examples: [
    { input: 'hasDup([1, 2, 3, 1])', output: 'nocap' },
    { input: 'hasDup([1, 2, 3, 4])', output: 'cap' },
  ],
  starter: `fun hasDup(nums) {
  give cap
}`,
  fn: 'hasDup',
  runCases: [
    { id: 1, args: '[1, 2, 3, 1]', expected: 'nocap' },
    { id: 2, args: '[1, 2, 3, 4]', expected: 'cap' },
    { id: 3, args: '[]', expected: 'cap' },
  ],
  submitCases: [
    { id: 1, args: '[1, 1]', expected: 'nocap' },
    { id: 2, args: '[0]', expected: 'cap' },
    { id: 3, args: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', expected: 'cap' },
    { id: 4, args: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 1]', expected: 'nocap' },
    { id: 5, args: '[-1, -2, -3, -1]', expected: 'nocap' },
    { id: 6, args: '[1, 2, 2, 3]', expected: 'nocap' },
    { id: 7, args: '[2, 4, 6, 8, 10, 12, 14, 16]', expected: 'cap' },
    { id: 8, args: '[1]', expected: 'cap' },
    { id: 9, args: '[3, 3, 3, 3, 3]', expected: 'nocap' },
    { id: 10, args: '[5, 1, 5, 2, 5, 3]', expected: 'nocap' },
  ],
  constraints: ['0 <= howmany(nums) <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  hints: [
    'Compare every pair with nested loops — if any two are equal, give nocap right away.',
    'Finish both loops without a match and give cap.',
  ],
  companies: ['Meta', 'Amazon', 'Apple'],
  solution: `fun hasDup(nums) {
  manifest i = 0
  lockin (i < howmany(nums)) {
    manifest j = i + 1
    lockin (j < howmany(nums)) {
      when (nums[i] == nums[j]) { give nocap }
      j = j + 1
    }
    i = i + 1
  }
  give cap
}`,
  expectedOutput: ['nocap', 'cap', 'cap'],
} satisfies Question