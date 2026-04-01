'use client';

import { Formula } from '@/types';
import { useAppStore } from '@/store/useAppStore';

export function FormulaCard({ formula }: { formula: Formula }) {
  const { progress, toggleBookmarkFormula } = useAppStore();
  const isBookmarked = progress.bookmarkedFormulas.includes(formula.id);

  const copyFormula = () => { navigator.clipboard.writeText(formula.expression); };

  return (
    <div className="formula-block">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-xs text-dark-400 font-medium uppercase tracking-wider mb-1">{formula.name}</p>
          <p className="text-lg font-semibold text-cyan-300 font-mono">{formula.expression}</p>
        </div>
        <div className="flex gap-1 ml-3 shrink-0">
          <button onClick={() => toggleBookmarkFormula(formula.id)}
            className={`w-7 h-7 rounded flex items-center justify-center transition-all text-sm ${isBookmarked ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-dark-400 hover:text-amber-400'}`}
            title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}>
            {isBookmarked ? '⭐' : '☆'}
          </button>
          <button onClick={copyFormula}
            className="w-7 h-7 rounded bg-white/5 text-dark-400 hover:text-white flex items-center justify-center transition-all text-sm"
            title="Sao chép">📋</button>
        </div>
      </div>

      {formula.variables.length > 0 && (
        <div className="mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
            {formula.variables.map((v) => (
              <p key={v.symbol} className="text-xs text-dark-300">
                <span className="text-cyan-400 font-semibold">{v.symbol}</span> — {v.name}
                {v.unit && <span className="text-dark-500"> ({v.unit})</span>}
              </p>
            ))}
          </div>
        </div>
      )}

      {formula.meaning && (
        <p className="text-xs text-dark-300 mb-1"><span className="text-dark-400 font-medium">Ý nghĩa:</span> {formula.meaning}</p>
      )}
      {formula.usageContext && (
        <p className="text-xs text-dark-300"><span className="text-dark-400 font-medium">Ứng dụng:</span> {formula.usageContext}</p>
      )}
    </div>
  );
}
