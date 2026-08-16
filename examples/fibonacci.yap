// fibonacci.yap — recursion with fun + bet

fun fib(n) {
  when (n < 2) { give n }
  give fib(n - 1) + fib(n - 2)
}

yap("fib(10) = " + fib(10))   // 55

// ...and the whole sequence with a loop
manifest seq = []
run (manifest i = 0; i < 11; i = i + 1) {
  slide(seq, fib(i))
}
yap(seq)
