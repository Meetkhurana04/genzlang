import type { Question } from './types'

export default {
  id: 8,
  title: 'Rotate Array',
  difficulty: 'medium',
  tags: ['arrays', 'modulo'],
  statement:
    'Write rotate(nums, k) that returns the array rotated to the right by k steps. Rotating [1, 2, 3, 4, 5, 6, 7] right by 3 gives [5, 6, 7, 1, 2, 3, 4].',
  examples: [
    { input: 'rotate([1, 2, 3, 4, 5, 6, 7], 3)', output: '[5, 6, 7, 1, 2, 3, 4]' },
    { input: 'rotate([1, 2, 3], 1)', output: '[3, 1, 2]' },
  ],
  starter: `fun rotate(nums, k) {
  give nums
}`,
  fn: 'rotate',
  runCases: [
    { id: 1, args: '[1, 2, 3, 4, 5, 6, 7], 3', expected: '[5, 6, 7, 1, 2, 3, 4]' },
    { id: 2, args: '[1, 2, 3], 1', expected: '[3, 1, 2]' },
    { id: 3, args: '[1, 2], 2', expected: '[1, 2]' },
  ],
  submitCases: [
    { id: 1, args: '[1, 2, 3, 4], 1', expected: '[4, 1, 2, 3]' },
    { id: 2, args: '[1, 2, 3, 4], 2', expected: '[3, 4, 1, 2]' },
    { id: 3, args: '[1, 2, 3, 4, 5], 4', expected: '[2, 3, 4, 5, 1]' },
    { id: 4, args: '[1], 100', expected: '[1]' },
    { id: 5, args: '[1, 2, 3], 4', expected: '[3, 1, 2]' },
    { id: 6, args: '[5, 6, 7, 8], 3', expected: '[6, 7, 8, 5]' },
    { id: 7, args: '[10, 20, 30, 40, 50], 5', expected: '[10, 20, 30, 40, 50]' },
    { id: 8, args: '[1, 2, 3, 4, 5, 6], 6', expected: '[1, 2, 3, 4, 5, 6]' },
    { id: 9, args: '[9, 8, 7, 6, 5], 2', expected: '[6, 5, 9, 8, 7]' },
    { id: 10, args: '[1, 2, 3, 4, 5], 7', expected: '[4, 5, 1, 2, 3]' },
  ],
  constraints: ['1 <= howmany(nums) <= 10^5', '0 <= k <= 10^5'],
  hints: [
    'Build a new array: result[i] = nums[(i - k + n) % n].',
    'The % n handles k bigger than the array length for free.',
  ],
  companies: ['Microsoft', 'Amazon'],
  solution: `fun rotate(nums, k) {
  manifest res = []
  manifest n = howmany(nums)
  manifest i = 0
  lockin (i < n) {
    manifest idx = ((i - k) % n + n) % n
    slide(res, nums[idx])
    i = i + 1
  }
  give res
}`,
  expectedOutput: ['[5, 6, 7, 1, 2, 3, 4]', '[3, 1, 2]', '[1, 2]'],
} satisfies Question