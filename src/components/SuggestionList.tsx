interface SuggestionListProps {
  warning: string;
  suggestions: string[];
}

export default function SuggestionList({ warning, suggestions }: SuggestionListProps) {
  if (!warning && suggestions.length === 0) return null;

  return (
    <div className="border border-edge border-l-[3px] border-l-warn bg-panel px-5 py-4">

      {warning && (
        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-edge">
          <span className="font-mono text-warn text-xs shrink-0 mt-px">!</span>
          <p className="font-mono text-xs text-warn leading-relaxed">{warning}</p>
        </div>
      )}

      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="font-mono text-accent text-xs shrink-0 mt-px">→</span>
            <span className="font-mono text-xs text-ink-muted leading-relaxed">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
