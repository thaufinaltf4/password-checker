import { calculateEntropy } from "./entropy";

test("empty password returns 0 bits", () => {
  const result = calculateEntropy("");
  expect(result.bits).toBe(0);
  expect(result.label).toBe("Very Weak");
});

test("longer password has more entropy than shorter one", () => {
  const short = calculateEntropy("abc");
  const long = calculateEntropy("abcabcabcabc");
  expect(long.bits).toBeGreaterThan(short.bits);
});

test("adding uppercase increases entropy", () => {
  const lower = calculateEntropy("password");
  const mixed = calculateEntropy("Password");
  expect(mixed.bits).toBeGreaterThan(lower.bits);
});

test("adding symbols increases entropy", () => {
  const noSymbols = calculateEntropy("Password1");
  const withSymbols = calculateEntropy("Password1!");
  expect(withSymbols.bits).toBeGreaterThan(noSymbols.bits);
});

test("hello is very weak", () => {
  const result = calculateEntropy("hello");
  expect(result.label).toBe("Very Weak");
});

test("long random password is strong", () => {
  const result = calculateEntropy("kX9#mP2$nQ7@vL4!rZ3^");
  expect(result.bits).toBeGreaterThan(60);
  expect(["Strong", "Very Strong"]).toContain(result.label);
});
