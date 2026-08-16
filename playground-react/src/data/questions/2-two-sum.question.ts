import type { Question } from './types'

export default {
  id: 2,
  title: 'Two Sum',
  difficulty: 'easy',
  tags: ['arrays', 'nested loops'],
  statement:
    'Write twoSum(nums, target) that returns an array with the indices of the two numbers that add up to target. There is exactly one valid pair.',
  examples: [
    { input: 'twoSum([2, 7, 11, 15], 9)', output: '[0, 1]' },
    { input: 'twoSum([3, 2, 4], 6)', output: '[1, 2]' },
  ],
  starter: `fun twoSum(nums, target) {
  give [0, 0]
}`,
  fn: 'twoSum',
  runCases: [
    { id: 1, args: '[2, 7, 11, 15], 9', expected: '[0, 1]' },
    { id: 2, args: '[3, 2, 4], 6', expected: '[1, 2]' },
    { id: 3, args: '[3, 3], 6', expected: '[0, 1]' },
  ],
  submitCases: [
    { id: 1, args: '[1, 2, 3], 5', expected: '[1, 2]' },
    { id: 2, args: '[2, 5, 5, 11], 10', expected: '[1, 2]' },
    { id: 3, args: '[10, 20, 30], 50', expected: '[1, 2]' },
    { id: 4, args: '[4, 8, 12, 16], 20', expected: '[0, 3]' },
    { id: 5, args: '[1, 9, 2, 8], 10', expected: '[0, 1]' },
    { id: 6, args: '[5, 1, 6, 2], 7', expected: '[0, 3]' },
    { id: 7, args: '[0, 4, 3, 0], 0', expected: '[0, 3]' },
    { id: 8, args: '[-1, -2, -3, -4], -3', expected: '[0, 1]' },
    { id: 9, args: '[7, 2, 9], 11', expected: '[1, 2]' },
    { id: 10, args: '[3, 1, 4, 2], 5', expected: '[0, 3]' },
  ],
  constraints: ['2 <= howmany(nums) <= 10^4', '-10^9 <= nums[i] <= 10^9'],
  hints: [
    'Loop i from 0 and j from i + 1 — try every pair until one sums to target.',
    'The moment nums[i] + nums[j] == target, give [i, j].',
  ],
  companies: ['Meta', 'Amazon', 'Google'],
  solution: `fun twoSum(nums, target) {
  manifest i = 0
  lockin (i < howmany(nums)) {
    manifest j = i + 1
    lockin (j < howmany(nums)) {
      when (nums[i] + nums[j] == target) { give [i, j] }
      j = j + 1
    }
    i = i + 1
  }
  give [0, 0]
}`,
  expectedOutput: ['[0, 1]', '[1, 2]', '[0, 1]'],
} satisfies Question