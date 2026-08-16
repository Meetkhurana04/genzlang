import type { Question } from './types'

export default {
  id: 1,
  title: 'FizzBuzz',
  difficulty: 'easy',
  tags: ['conditionals', 'math'],
  statement:
    'Write a function fizzbuzz(n) that returns "FizzBuzz" when n is divisible by both 3 and 5, "Fizz" when divisible by 3, "Buzz" when divisible by 5, and n itself as text otherwise.',
  examples: [
    { input: 'fizzbuzz(3)', output: '"Fizz"' },
    { input: 'fizzbuzz(5)', output: '"Buzz"' },
    { input: 'fizzbuzz(15)', output: '"FizzBuzz"' },
  ],
  starter: `fun fizzbuzz(n) {
  // return "Fizz" / "Buzz" / "FizzBuzz" or n as text
  give ""
}`,
  fn: 'fizzbuzz',
  runCases: [
    { id: 1, args: '3', expected: 'Fizz' },
    { id: 2, args: '5', expected: 'Buzz' },
    { id: 3, args: '15', expected: 'FizzBuzz' },
  ],
  submitCases: [
    { id: 1, args: '1', expected: '1' },
    { id: 2, args: '2', expected: '2' },
    { id: 3, args: '6', expected: 'Fizz' },
    { id: 4, args: '10', expected: 'Buzz' },
    { id: 5, args: '30', expected: 'FizzBuzz' },
    { id: 6, args: '7', expected: '7' },
    { id: 7, args: '9', expected: 'Fizz' },
    { id: 8, args: '20', expected: 'Buzz' },
    { id: 9, args: '45', expected: 'FizzBuzz' },
    { id: 10, args: '99', expected: 'Fizz' },
  ],
  constraints: ['1 <= n <= 10^5'],
  hints: [
    'Check n % 15 first — numbers like 45 and 30 hit every rule at once.',
    'A number next to a string becomes text, so n + "" gives you the number as a string.',
  ],
  companies: ['Meta', 'Amazon', 'Apple'],
  solution: `fun fizzbuzz(n) {
  when (n % 15 == 0) { give "FizzBuzz" }
  orwhen (n % 3 == 0) { give "Fizz" }
  orwhen (n % 5 == 0) { give "Buzz" }
  give n + ""
}`,
  expectedOutput: ['Fizz', 'Buzz', 'FizzBuzz'],
} satisfies Question