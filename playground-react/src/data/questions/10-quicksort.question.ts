import type { Question } from './types'

export default {
  id: 10,
  title: 'Quicksort',
  difficulty: 'hard',
  tags: ['recursion', 'sorting', 'arrays'],
  statement:
    'Write sortArray(nums) that sorts the array in ascending order (quicksort) and returns it. Pick the last element as pivot, partition, and recurse.',
  examples: [
    { input: 'sortArray([4, 2, 9, 1, 5, 6])', output: '[1, 2, 4, 5, 6, 9]' },
    { input: 'sortArray([3, 2, 1])', output: '[1, 2, 3]' },
  ],
  starter: `fun sortArray(nums) {
  give nums
}`,
  fn: 'sortArray',
  runCases: [
    { id: 1, args: '[4, 2, 9, 1, 5, 6]', expected: '[1, 2, 4, 5, 6, 9]' },
    { id: 2, args: '[1]', expected: '[1]' },
    { id: 3, args: '[3, 2, 1]', expected: '[1, 2, 3]' },
  ],
  submitCases: [
    { id: 1, args: '[]', expected: '[]' },
    { id: 2, args: '[1, 2, 3, 4, 5]', expected: '[1, 2, 3, 4, 5]' },
    { id: 3, args: '[5, 4, 3, 2, 1]', expected: '[1, 2, 3, 4, 5]' },
    { id: 4, args: '[2, 1]', expected: '[1, 2]' },
    { id: 5, args: '[9, 5, 7, 3, 1]', expected: '[1, 3, 5, 7, 9]' },
    { id: 6, args: '[10, -1, 2, 0, 5]', expected: '[-1, 0, 2, 5, 10]' },
    { id: 7, args: '[3, 3, 1, 2, 3]', expected: '[1, 2, 3, 3, 3]' },
    { id: 8, args: '[8, 6, 7, 5, 3, 0, 9]', expected: '[0, 3, 5, 6, 7, 8, 9]' },
    { id: 9, args: '[4, 4, 4]', expected: '[4, 4, 4]' },
    { id: 10, args: '[7, 2, 9, 2, 7, 1]', expected: '[1, 2, 2, 7, 7, 9]' },
  ],
  constraints: ['0 <= howmany(nums) <= 10^5'],
  hints: [
    'Partition around the last element: smaller values go left, bigger go right.',
    'Then recurse on both halves until each piece is a single element.',
  ],
  companies: ['Google', 'Microsoft'],
  solution: `fun part(nums, lo, hi) {
  manifest p = nums[hi]
  manifest i = lo
  manifest j = lo
  lockin (j < hi) {
    when (nums[j] < p) {
      manifest t = nums[i]
      nums[i] = nums[j]
      nums[j] = t
      i = i + 1
    }
    j = j + 1
  }
  manifest t = nums[i]
  nums[i] = nums[hi]
  nums[hi] = t
  give i
}
fun qs(nums, lo, hi) {
  when (lo >= hi) { give 0 }
  manifest p = part(nums, lo, hi)
  qs(nums, lo, p - 1)
  qs(nums, p + 1, hi)
  give 0
}
fun sortArray(nums) {
  qs(nums, 0, howmany(nums) - 1)
  give nums
}`,
  expectedOutput: ['[1, 2, 4, 5, 6, 9]', '[1]', '[1, 2, 3]'],
} satisfies Question