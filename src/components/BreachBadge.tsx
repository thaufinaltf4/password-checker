interface BreachBadgeProps {
  breachCount: number | null;
  loading: boolean;
}

export default function BreachBadge({ breachCount, loading }: BreachBadgeProps) {
  if (loading) {
    return (
      <div className="border border-edge border-l-[3px] border-l-edge-bright bg-panel px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-3.5 h-3.5 border-[1.5px] border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-ink-muted tracking-[0.15em]">
            QUERYING HIBP DATABASE
          </span>
        </div>
      </div>
    );
  }

  if (breachCount === null) return null;

  if (breachCount === 0) {
    return (
      <div className="border border-edge border-l-[3px] border-l-safe bg-panel px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-4xl font-bold text-safe leading-none">0</p>
            <p className="font-mono text-[10px] text-ink-muted mt-1 tracking-[0.15em]">
              KNOWN EXPOSURES
            </p>
          </div>
          <div className="flex items-center gap-2 border border-safe/30 bg-safe-dim px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-safe" />
            <span className="font-mono text-[10px] text-safe tracking-[0.2em]">CLEAR</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-edge border-l-[3px] border-l-danger bg-panel px-5 py-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-4xl font-bold text-danger leading-none">
            {breachCount.toLocaleString()}
          </p>
          <p className="font-mono text-[10px] text-ink-muted mt-1 tracking-[0.15em]">
            KNOWN EXPOSURES
          </p>
        </div>
        <div className="flex items-center gap-2 border border-danger/30 bg-danger-dim px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-danger animate-blink" />
          <span className="font-mono text-[10px] text-danger tracking-[0.2em]">EXPOSED</span>
        </div>
      </div>
    </div>
  );
}
