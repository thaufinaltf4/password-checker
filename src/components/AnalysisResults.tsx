import type { AnalysisResult } from "@/types/analysis";
import StrengthMeter from "./StrengthMeter";
import EntropyDisplay from "./EntropyDisplay";
import BreachBadge from "./BreachBadge";
import SuggestionList from "./SuggestionList";
import PatternFlags from "./PatternFlags";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const { zxcvbn, entropy, isCommon, breachCount, breachLoading, patterns } = result;

  return (
    <div className="space-y-2.5">
      {zxcvbn && (
        <div className="animate-reveal" style={{ animationDelay: "0ms" }}>
          <StrengthMeter
            score={zxcvbn.score}
            crackOnline={zxcvbn.crackTimesDisplay.onlineNoThrottling10PerSecond}
            crackOffline={zxcvbn.crackTimesDisplay.offlineFastHashing1e10PerSecond}
          />
        </div>
      )}

      {entropy && (
        <div className="animate-reveal" style={{ animationDelay: "70ms" }}>
          <EntropyDisplay entropy={entropy} />
        </div>
      )}

      {patterns.length > 0 && (
        <div className="animate-reveal" style={{ animationDelay: "110ms" }}>
          <PatternFlags patterns={patterns} />
        </div>
      )}

      {isCommon !== null && (
        <div className="animate-reveal" style={{ animationDelay: "30ms" }}>
          <div
            className="border border-edge bg-panel px-5 py-3.5 flex items-center justify-between"
            style={{
              borderLeftWidth: 3,
              borderLeftColor: isCommon ? "#FFAD00" : "#253045",
            }}
          >
            <div
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em]"
              style={{ color: isCommon ? "#FFAD00" : "#00CC6A" }}
            >
              <span>{isCommon ? "!" : "✓"}</span>
              <span>{isCommon ? "FOUND IN BREACH WORDLIST" : "NOT IN WORDLIST"}</span>
            </div>
          </div>
        </div>
      )}

      {(breachLoading || breachCount !== null) && (
        <div className="animate-reveal" style={{ animationDelay: "30ms" }}>
          <BreachBadge breachCount={breachCount} loading={breachLoading} />
        </div>
      )}

      {zxcvbn &&
        (zxcvbn.feedback.warning || zxcvbn.feedback.suggestions.length > 0) && (
          <div className="animate-reveal" style={{ animationDelay: "140ms" }}>
            <SuggestionList
              warning={zxcvbn.feedback.warning}
              suggestions={zxcvbn.feedback.suggestions}
            />
          </div>
        )}
    </div>
  );
}
