import type { Question } from './types'

export default {
  id: 4,
  title: 'Prime Check',
  difficulty: 'easy',
  tags: ['loops', 'math'],
  statement:
    'Write isPrime(n) that returns nocap when n is prime and cap otherwise. Numbers below 2 are not prime.',
  examples: [
    { input: 'isPrime(2)', output: 'nocap' },
    { input: 'isPrime(4)', output: 'cap' },
  ],
  starter: `fun isPrime(n) {
  give nocap
}`,
  fn: 'isPrime',
  runCases: [
    { id: 1, args: '2', expected: 'nocap' },
    { id: 2, args: '4', expected: 'cap' },
    { id: 3, args: '17', expected: 'nocap' },
  ],
  submitCases: [
    { id: 1, args: '1', expected: 'cap' },
    { id: 2, args: '3', expected: 'nocap' },
    { id: 3, args: '9', expected: 'cap' },
    { id: 4, args: '23', expected: 'nocap' },
    { id: 5, args: '25', expected: 'cap' },
    { id: 6, args: '97', expected: 'nocap' },
    { id: 7, args: '100', expected: 'cap' },
    { id: 8, args: '49', expected: 'cap' },
    { id: 9, args: '2', expected: 'nocap' },
    { id: 10, args: '121', expected: 'cap' },
  ],
  constraints: ['1 <= n <= 10^5'],
  hints: [
    'Numbers below 2 are not prime.',
    'Check divisors from 2 up to √n — if n % d == 0 it is not prime.',
  ],
  companies: ['Meta', 'Apple'],
  solution: `fun isPrime(n) {
  when (n < 2) { give cap }
  manifest d = 2
  lockin (d * d <= n) {
    when (n % d == 0) { give cap }
    d = d + 1
  }
  give nocap
}`,
  expectedOutput: ['nocap', 'cap', 'nocap'],
} satisfies Question