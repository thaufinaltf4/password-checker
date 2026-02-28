interface StrengthMeterProps {
  score: 0 | 1 | 2 | 3 | 4;
  crackOnline: string;
  crackOffline: string;
}

const LEVELS = [
  { color: "#FF3366", label: "VERY WEAK" },
  { color: "#FF6B35", label: "WEAK" },
  { color: "#FFAD00", label: "FAIR" },
  { color: "#88CC00", label: "STRONG" },
  { color: "#00CC6A", label: "VERY STRONG" },
];

export default function StrengthMeter({
  score,
  crackOnline,
  crackOffline,
}: StrengthMeterProps) {
  const level = LEVELS[score];

  return (
    <div
      className="border border-edge bg-panel px-5 py-4"
      style={{ borderLeftWidth: 3, borderLeftColor: level.color }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-mono text-[10px] font-bold tracking-[0.2em]"
          style={{ color: level.color }}
        >
          {level.label}
        </span>
      </div>

      {/* Segmented bars */}
      <div className="flex gap-1.5 mb-5">
        {Array.from({ length: 5 }, (_, i) => {
          const active = i <= score;
          return (
            <div
              key={i}
              className="h-8 flex-1 transition-all duration-500"
              style={{
                backgroundColor: active ? level.color : "#192030",
                boxShadow: active ? `0 0 12px ${level.color}70` : "none",
                transitionDelay: `${i * 55}ms`,
              }}
            />
          );
        })}
      </div>

      {/* Crack times */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-edge">
        <div>
          <p className="eyebrow mb-1">online attack</p>
          <p className="font-mono text-xs text-ink capitalize">{crackOnline}</p>
        </div>
        <div>
          <p className="eyebrow mb-1">offline attack</p>
          <p className="font-mono text-xs text-ink capitalize">{crackOffline}</p>
        </div>
      </div>
    </div>
  );
}
