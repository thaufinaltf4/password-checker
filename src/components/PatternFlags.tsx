import type { PatternFlag } from "@/types/analysis";

interface PatternFlagsProps {
  patterns: PatternFlag[];
}

const TYPE_LABELS: Record<string, string> = {
  "keyboard-walk": "KEYBOARD WALK",
  "repeated-chars": "REPEATED CHARS",
  sequential: "SEQUENTIAL",
  "leet-substitution": "L33T SPEAK",
  "numeric-only": "NUMERIC ONLY",
};

export default function PatternFlags({ patterns }: PatternFlagsProps) {
  if (patterns.length === 0) return null;

  return (
    <div className="border border-edge border-l-[3px] border-l-warn bg-panel px-5 py-4">

      <ul className="space-y-3">
        {patterns.map((flag, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Severity chip */}
            <span
              className="shrink-0 font-mono text-[9px] tracking-[0.15em] px-1.5 py-0.5 mt-px border"
              style={{
                color: flag.severity === "high" ? "#FF3366" : "#FFAD00",
                borderColor:
                  flag.severity === "high"
                    ? "rgba(255,51,102,0.3)"
                    : "rgba(255,173,0,0.3)",
                backgroundColor:
                  flag.severity === "high"
                    ? "rgba(255,51,102,0.08)"
                    : "rgba(255,173,0,0.08)",
              }}
            >
              {TYPE_LABELS[flag.type] ?? flag.type.toUpperCase()}
            </span>

            {/* Description */}
            <span className="font-mono text-xs text-ink-muted leading-relaxed">
              {flag.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
