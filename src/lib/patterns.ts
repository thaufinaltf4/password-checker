import type { PatternFlag } from "@/types/analysis";

const KEYBOARD_ROWS = [
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
  "1234567890",
  "!@#$%^&*()",
];

const LEET_MAP: Record<string, string> = {
  "@": "a",
  "4": "a",
  "3": "e",
  "1": "i",
  "!": "i",
  "0": "o",
  $: "s",
  "5": "s",
  "7": "t",
  "+": "t",
  "9": "g",
  "8": "b",
  "6": "g",
};

function findKeyboardWalk(password: string): string | null {
  const lower = password.toLowerCase();
  let longest: string | null = null;

  for (const row of KEYBOARD_ROWS) {
    for (let len = row.length; len >= 4; len--) {
      for (let i = 0; i <= row.length - len; i++) {
        const seq = row.slice(i, i + len);
        const rev = seq.split("").reverse().join("");
        if (lower.includes(seq)) {
          if (!longest || seq.length > longest.length) longest = seq;
        }
        if (lower.includes(rev)) {
          if (!longest || rev.length > longest.length) longest = rev;
        }
      }
    }
  }
  return longest;
}

function findRepeat(password: string): string | null {
  const match = password.match(/(.)\1{3,}/);
  return match ? match[0] : null;
}

function hasSequentialRun(password: string): boolean {
  let asc = 0;
  let desc = 0;
  for (let i = 1; i < password.length; i++) {
    const diff = password.charCodeAt(i) - password.charCodeAt(i - 1);
    if (diff === 1) {
      asc++;
      desc = 0;
    } else if (diff === -1) {
      desc++;
      asc = 0;
    } else {
      asc = 0;
      desc = 0;
    }
    if (asc >= 3 || desc >= 3) return true;
  }
  return false;
}

function findLeet(password: string): string[] {
  return Object.keys(LEET_MAP).filter((ch) => password.includes(ch));
}

export function detectPatterns(password: string): PatternFlag[] {
  if (!password) return [];

  const flags: PatternFlag[] = [];

  const walk = findKeyboardWalk(password);
  if (walk) {
    flags.push({
      type: "keyboard-walk",
      description: `Contains keyboard sequence "${walk}"`,
      severity: walk.length >= 5 ? "high" : "medium",
    });
  }

  const repeat = findRepeat(password);
  if (repeat) {
    flags.push({
      type: "repeated-chars",
      description: `Contains "${repeat}", ${repeat.length} repeated characters`,
      severity: "high",
    });
  }

  if (hasSequentialRun(password)) {
    flags.push({
      type: "sequential",
      description: "Contains sequential character run (e.g. abcd, 1234, zyxw)",
      severity: "medium",
    });
  }

  const leetChars = findLeet(password);
  if (leetChars.length > 0) {
    flags.push({
      type: "leet-substitution",
      description: `Contains l33t substitutions (${leetChars.join(", ")}), these patterns are well known to crackers`,
      severity: "medium",
    });
  }

  if (/^\d+$/.test(password) && password.length <= 8) {
    flags.push({
      type: "numeric-only",
      description: `${password.length}-digit numeric code, all-number passwords are trivially brute-forced`,
      severity: "high",
    });
  }

  return flags;
}
