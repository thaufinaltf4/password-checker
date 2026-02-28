export type EntropyLabel = "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong";

export type PatternType =
  | "keyboard-walk"
  | "repeated-chars"
  | "sequential"
  | "leet-substitution"
  | "numeric-only";

export interface PatternFlag {
  type: PatternType;
  description: string;
  severity: "high" | "medium";
}

export interface EntropyResult {
  bits: number;
  label: EntropyLabel;
}

export interface ZxcvbnResult {
  score: 0 | 1 | 2 | 3 | 4;
  crackTimesDisplay: {
    offlineFastHashing1e10PerSecond: string;
    onlineNoThrottling10PerSecond: string;
  };
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export interface AnalysisResult {
  zxcvbn: ZxcvbnResult | null;
  entropy: EntropyResult | null;
  isCommon: boolean | null;
  breachCount: number | null;
  breachLoading: boolean;
  patterns: PatternFlag[];
}
