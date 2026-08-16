// fizzbuzz.yap — FizzBuzz 1 through 20

run (manifest i = 1; i <= 20; i = i + 1) {
  when (i % 15 == 0) {
    yap("FizzBuzz")
  } orwhen (i % 3 == 0) {
    yap("Fizz")
  } orwhen (i % 5 == 0) {
    yap("Buzz")
  } nvm {
    yap(i)
  }
}
