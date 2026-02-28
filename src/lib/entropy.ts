import type { EntropyLabel, EntropyResult } from "@/types/analysis";

export function calculateEntropy(password: string): EntropyResult {
  if (!password) return { bits: 0, label: "Very Weak" };

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const bits = poolSize > 0 ? Math.floor(password.length * Math.log2(poolSize)) : 0;

  let label: EntropyLabel;
  if (bits < 28) label = "Very Weak";
  else if (bits < 36) label = "Weak";
  else if (bits < 60) label = "Moderate";
  else if (bits < 128) label = "Strong";
  else label = "Very Strong";

  return { bits, label };
}
