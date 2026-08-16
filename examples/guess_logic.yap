// guess_logic.yap — a tiny "is this guess right?" demo using logic + functions
// (no real input — we simulate a few guesses so it runs anywhere)

manifest secret = 7

fun checkGuess(guess) {
  when (guess == secret) {
    give "you ate that — " + guess + " is it!"
  } orwhen (guess < secret) {
    give guess + " is lowkey too small"
  } nvm {
    give guess + " is highkey too big"
  }
}

manifest guesses = [3, 10, 7]
run (manifest i = 0; i < howmany(guesses); i = i + 1) {
  yap(checkGuess(guesses[i]))
}

// logical operators: short-circuit AND / OR / NOT
manifest a = nocap
manifest b = cap
when (a plus nah b) {
  yap("logic checks out")
}

when (b alt a) {
  yap("at least one of them is nocap")
}

// break + continue inside a while loop
manifest i = 0
lockin (i < 10) {
  i = i + 1
  when (i == 3) { move }   // skip 3
  when (i == 7) { drop }    // stop at 7
  yap("count " + i)
}
