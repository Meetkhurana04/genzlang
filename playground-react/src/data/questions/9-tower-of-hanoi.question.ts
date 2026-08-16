import type { Question } from './types'

export default {
  id: 9,
  title: 'Tower of Hanoi',
  difficulty: 'hard',
  tags: ['recursion', 'simulation'],
  statement:
    'Write hanoi(n, from, to, via) that prints every move as "X -> Y" and returns the total number of moves needed to move n disks from the from peg to the to peg (using via as the helper).',
  examples: [
    { input: 'hanoi(1, "A", "C", "B")', output: '1' },
    { input: 'hanoi(3, "A", "C", "B")', output: '7' },
  ],
  starter: `fun hanoi(n, from, to, via) {
  when (n == 0) { give 0 }
  give 0
}`,
  fn: 'hanoi',
  runCases: [
    { id: 1, args: '1, "A", "C", "B"', expected: '1' },
    { id: 2, args: '2, "A", "C", "B"', expected: '3' },
    { id: 3, args: '3, "A", "C", "B"', expected: '7' },
  ],
  submitCases: [
    { id: 1, args: '0, "A", "C", "B"', expected: '0' },
    { id: 2, args: '4, "A", "C", "B"', expected: '15' },
    { id: 3, args: '5, "A", "C", "B"', expected: '31' },
    { id: 4, args: '6, "A", "C", "B"', expected: '63' },
    { id: 5, args: '7, "A", "C", "B"', expected: '127' },
    { id: 6, args: '8, "A", "C", "B"', expected: '255' },
    { id: 7, args: '9, "A", "C", "B"', expected: '511' },
    { id: 8, args: '10, "A", "C", "B"', expected: '1023' },
    { id: 9, args: '11, "A", "C", "B"', expected: '2047' },
    { id: 10, args: '12, "A", "C", "B"', expected: '4095' },
  ],
  constraints: ['0 <= n <= 12'],
  hints: [
    'Move n - 1 disks from -> via, print the from -> to move, then move n - 1 disks via -> to.',
    'The move count is 2^n - 1; accumulate it with recursion and give the total.',
  ],
  companies: ['Google', 'Microsoft'],
  solution: `fun hanoi(n, from, to, via) {
  when (n == 0) { give 0 }
  manifest a = hanoi(n - 1, from, via, to)
  yap(from + " -> " + to)
  manifest b = hanoi(n - 1, via, to, from)
  give a + 1 + b
}`,
  expectedOutput: ['1', '3', '7'],
} satisfies Question