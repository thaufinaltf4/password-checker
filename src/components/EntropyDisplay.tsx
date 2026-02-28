import type { EntropyResult } from "@/types/analysis";

interface EntropyDisplayProps {
  entropy: EntropyResult;
}

const MAX_BITS = 128;

const LABEL_COLORS: Record<string, string> = {
  "Very Weak": "#FF3366",
  Weak: "#FF6B35",
  Moderate: "#FFAD00",
  Strong: "#88CC00",
  "Very Strong": "#00CC6A",
};

export default function EntropyDisplay({ entropy }: EntropyDisplayProps) {
  const pct = Math.min((entropy.bits / MAX_BITS) * 100, 100);
  const color = LABEL_COLORS[entropy.label] ?? "#546280";

  return (
    <div className="border border-edge border-l-[3px] border-l-accent bg-panel px-5 py-4">
      <div className="flex items-start justify-between mb-4">
        <div className="text-right">
          <span className="font-mono text-3xl font-bold text-ink leading-none">
            {entropy.bits}
          </span>
          <span className="font-mono text-xs text-ink-muted ml-1.5">bits</span>
        </div>
      </div>

      {/* Track */}
      <div className="h-[3px] bg-edge mb-3 overflow-hidden">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}90`,
          }}
        />
      </div>

      {/* Label row */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] font-bold tracking-[0.18em]"
          style={{ color }}
        >
          {entropy.label.toUpperCase()}
        </span>
        <span className="font-mono text-[10px] text-ink-dim">
          {pct.toFixed(0)}% OF MAX
        </span>
      </div>
    </div>
  );
}
