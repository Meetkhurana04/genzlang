export const EXAMPLES: Record<string, string> = {
  '👋 hello': `manifest lang = "GenzLang"
manifest year = 2026
yap("yo, welcome to " + lang + " 🔥")
yap("it's giving " + year + " energy fr fr")`,

  '🔢 fizzbuzz': `run (manifest i = 1; i <= 20; i = i + 1) {
  when (i % 15 == 0) {
    yap("FizzBuzz")
  } orwhen (i % 3 == 0) {
    yap("Fizz")
  } orwhen (i % 5 == 0) {
    yap("Buzz")
  } nvm {
    yap(i)
  }
}`,

  '🌀 fibonacci': `fun fib(n) {
  when (n < 2) { give n }
  give fib(n - 1) + fib(n - 2)
}

run (manifest i = 0; i < 11; i = i + 1) {
  yap("fib(" + i + ") = " + fib(i))
}`,

  '🧠 logic + loops': `manifest a = nocap
manifest b = cap
when (a plus nah b) { yap("logic checks out") }

manifest i = 0
lockin (i < 10) {
  i = i + 1
  when (i == 3) { move }   // continue
  when (i == 7) { drop }   // break
  yap("count " + i)
}`,

  '📦 arrays': `manifest squad = ["zoomer", "boomer", "doomer"]
yap(squad[0])
squad[1] = "gamer"
slide(squad, "framer")
yap(squad)
yap("size: " + howmany(squad))`,

  '🪄 closures': `fun makeCounter() {
  manifest n = 0
  fun tick() { n = n + 1  give n }
  give tick
}
manifest c = makeCounter()
yap(c())   // 1
yap(c())   // 2
yap(c())   // 3`,
}