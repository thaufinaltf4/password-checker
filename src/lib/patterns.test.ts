import { detectPatterns } from "./patterns";

test("returns empty array for empty string", () => {
  expect(detectPatterns("")).toHaveLength(0);
});

test("clean password has no flags", () => {
  const flags = detectPatterns("correcthorsebatterystaple");
  expect(flags).toHaveLength(0);
});

test("qwerty triggers keyboard walk", () => {
  const flags = detectPatterns("qwerty");
  expect(flags.some((f) => f.type === "keyboard-walk")).toBe(true);
});

test("keyboard walk is reversed too", () => {
  const flags = detectPatterns("ytrewq");
  expect(flags.some((f) => f.type === "keyboard-walk")).toBe(true);
});

test("aaaa triggers repeated chars", () => {
  const flags = detectPatterns("aaaa");
  expect(flags.some((f) => f.type === "repeated-chars")).toBe(true);
});

test("1234 triggers sequential", () => {
  const flags = detectPatterns("1234");
  expect(flags.some((f) => f.type === "sequential")).toBe(true);
});

test("descending sequence is also flagged", () => {
  const flags = detectPatterns("dcba");
  expect(flags.some((f) => f.type === "sequential")).toBe(true);
});

test("p@ssw0rd triggers leet substitution", () => {
  const flags = detectPatterns("p@ssw0rd");
  expect(flags.some((f) => f.type === "leet-substitution")).toBe(true);
});

test("all numbers under 9 chars triggers numeric only", () => {
  const flags = detectPatterns("12345678");
  expect(flags.some((f) => f.type === "numeric-only")).toBe(true);
});

test("long number doesnt trigger numeric only flag", () => {
  const flags = detectPatterns("123456789");
  expect(flags.some((f) => f.type === "numeric-only")).toBe(false);
});

test("keyboard walk over 5 chars is high severity", () => {
  const flags = detectPatterns("qwerty");
  const flag = flags.find((f) => f.type === "keyboard-walk");
  expect(flag?.severity).toBe("high");
});
