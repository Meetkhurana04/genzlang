import type { Question } from './types'

export default {
  id: 7,
  title: 'Max Subarray Sum',
  difficulty: 'medium',
  tags: ['arrays', 'kadane'],
  statement:
    'Write maxSub(nums) that returns the largest sum of any contiguous subarray (Kadane’s algorithm).',
  examples: [
    { input: 'maxSub([-2, 1, -3, 4, -1, 2, 1, -5, 4])', output: '6' },
    { input: 'maxSub([1])', output: '1' },
  ],
  starter: `fun maxSub(nums) {
  give 0
}`,
  fn: 'maxSub',
  runCases: [
    { id: 1, args: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expected: '6' },
    { id: 2, args: '[1]', expected: '1' },
    { id: 3, args: '[5, 4, -1, 7, 8]', expected: '23' },
  ],
  submitCases: [
    { id: 1, args: '[-1]', expected: '-1' },
    { id: 2, args: '[-2, -1]', expected: '-1' },
    { id: 3, args: '[1, 2, 3, 4]', expected: '10' },
    { id: 4, args: '[-1, 2, -3, 4]', expected: '4' },
    { id: 5, args: '[2, -1, 2]', expected: '3' },
    { id: 6, args: '[-5, -2, -3]', expected: '-2' },
    { id: 7, args: '[1, -2, 3, -1, 2]', expected: '4' },
    { id: 8, args: '[0, 0, 0]', expected: '0' },
    { id: 9, args: '[-2, 3, 2, -1]', expected: '5' },
    { id: 10, args: '[1, 2, -5, 4]', expected: '4' },
  ],
  constraints: ['1 <= howmany(nums) <= 10^5'],
  hints: [
    'Keep a running sum — whenever it drops below 0, reset it to 0.',
    'Track the largest running sum you have seen; that is the answer.',
  ],
  companies: ['Amazon', 'Microsoft'],
  solution: `fun maxSub(nums) {
  manifest best = nums[0]
  manifest cur = nums[0]
  manifest i = 1
  lockin (i < howmany(nums)) {
    when (cur < 0) { cur = 0 }
    cur = cur + nums[i]
    when (cur > best) { best = cur }
    i = i + 1
  }
  give best
}`,
  expectedOutput: ['6', '1', '23'],
} satisfies Question