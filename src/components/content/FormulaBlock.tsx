'use client';

import { useState } from 'react';
import { Formula } from '@/types';
import { renderLatex } from '@/lib/utils/katex';
import { useAppStore } from '@/store/useAppStore';

interface FormulaBlockProps {
  formula: Formula;
  compact?: boolean;
}

export function FormulaBlock({ formula, compact = false }: FormulaBlockProps) {
  const { progress, toggleBookmarkFormula } = useAppStore();
  const [copied, setCopied] = useState(false);
  const isBookmarked = progress.bookmarkedFormulas.includes(formula.id);

  const copyFormula = async () => {
    const text = formula.latex || formula.expression;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render LaTeX if available, fallback to expression text
  const latexHtml = formula.latex ? renderLatex(formula.latex) : null;

  return (
    <div className="formula-block group" id={`formula-${formula.id}`}>
      {/* Header: name + actions */}
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs text-dark-400 font-medium uppercase tracking-wider">
          {formula.name}
        </p>
        <div className="flex gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleBookmarkFormula(formula.id)}
            className={`w-7 h-7 rounded flex items-center justify-center transition-all text-sm ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 !opacity-100'
                : 'bg-white/5 text-dark-400 hover:text-amber-400'
            }`}
            title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
          >
            {isBookmarked ? '⭐' : '☆'}
          </button>
          <button
            onClick={copyFormula}
            className={`w-7 h-7 rounded flex items-center justify-center transition-all text-sm ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/5 text-dark-400 hover:text-white'
            }`}
            title={copied ? 'Đã sao chép!' : 'Sao chép công thức'}
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* Formula rendering — KaTeX or fallback */}
      <div className="formula-display my-3 py-2">
        {latexHtml ? (
          <div
            className="katex-display-wrapper text-center"
            dangerouslySetInnerHTML={{ __html: latexHtml }}
          />
        ) : (
          <p className="text-xl font-semibold text-cyan-300 font-mono text-center py-1">
            {formula.expression}
          </p>
        )}
      </div>

      {/* Variable table */}
      {formula.variables.length > 0 && (
        <div className="formula-variables mb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
            {formula.variables.map((v) => (
              <div key={v.symbol} className="flex items-baseline gap-2 py-1 text-xs border-b border-white/[0.03] last:border-0">
                <span className="text-cyan-400 font-mono font-semibold min-w-[2rem]">
                  {v.symbol}
                </span>
                <span className="text-dark-300">—</span>
                <span className="text-dark-200 flex-1">{v.name}</span>
                {v.unit && (
                  <span className="text-dark-500 shrink-0">({v.unit})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meaning & usage context */}
      {!compact && (
        <div className="space-y-1">
          {formula.meaning && (
            <p className="text-xs text-dark-300">
              <span className="text-dark-400 font-medium">Ý nghĩa: </span>
              {formula.meaning}
            </p>
          )}
          {formula.usageContext && (
            <p className="text-xs text-dark-300">
              <span className="text-dark-400 font-medium">Ứng dụng: </span>
              {formula.usageContext}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
