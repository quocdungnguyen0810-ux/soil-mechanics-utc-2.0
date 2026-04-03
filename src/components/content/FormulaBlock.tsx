'use client';

import { useState } from 'react';
import { Formula } from '@/types';
import { renderLatex, renderSymbol } from '@/lib/utils/katex';
import { useAppStore } from '@/store/useAppStore';

interface FormulaBlockProps {
  formula: Formula;
  compact?: boolean;
}

const difficultyColor: Record<string, string> = {
  'nhận biết': 'text-emerald-400 bg-emerald-400/10',
  'thông hiểu': 'text-sky-400 bg-sky-400/10',
  'vận dụng': 'text-amber-400 bg-amber-400/10',
  'vận dụng cao': 'text-rose-400 bg-rose-400/10',
};

export function FormulaBlock({ formula, compact = false }: FormulaBlockProps) {
  const { progress, toggleBookmarkFormula } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(!compact);
  const isBookmarked = progress.bookmarkedFormulas.includes(formula.id);

  const copyFormula = async () => {
    const text = formula.latex || formula.expression;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render the LaTeX formula
  const latexHtml = formula.latex ? renderLatex(formula.latex, true) : null;

  return (
    <div
      className="formula-block group relative overflow-hidden"
      id={`formula-${formula.id}`}
      style={{
        background: 'linear-gradient(135deg, rgba(15,20,40,0.9), rgba(10,15,30,0.95))',
        border: '1px solid rgba(59,143,246,0.12)',
        borderRadius: '0.875rem',
        padding: compact ? '0.875rem 1rem' : '1.25rem 1.5rem',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Subtle gradient accent top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, rgba(59,143,246,0.4), rgba(168,85,247,0.3), transparent)',
        borderRadius: '0.875rem 0.875rem 0 0',
      }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span style={{
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(148,163,184,0.7)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {formula.id.toUpperCase()}
          </span>
          <span style={{
            fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0',
          }} className="truncate">
            {formula.name}
          </span>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => toggleBookmarkFormula(formula.id)}
            className="transition-all"
            style={{
              width: 28, height: 28, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isBookmarked ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isBookmarked ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`,
              fontSize: '0.85rem',
            }}
            title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
          <button
            onClick={copyFormula}
            className="transition-all"
            style={{
              width: 28, height: 28, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.06)'}`,
              fontSize: '0.75rem', color: copied ? '#34d399' : '#94a3b8',
            }}
            title={copied ? 'Đã sao chép!' : 'Sao chép LaTeX'}
          >
            {copied ? '✓' : '⎘'}
          </button>
          {compact && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                width: 28, height: 28, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontSize: '0.75rem', color: '#94a3b8',
                transform: showDetails ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s',
              }}
            >
              ▾
            </button>
          )}
        </div>
      </div>

      {/* ===== FORMULA DISPLAY — MathType-quality ===== */}
      <div style={{
        margin: '0.5rem 0 1rem',
        padding: '1rem 1.5rem',
        background: 'rgba(6,182,212,0.02)',
        border: '1px solid rgba(99,102,241,0.15)',
        borderRadius: '0.625rem',
        textAlign: 'center',
        overflowX: 'auto',
        transition: 'all 0.3s ease',
      }}
        className="formula-display"
      >
        {latexHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: latexHtml }}
            style={{ display: 'inline-block', maxWidth: '100%' }}
          />
        ) : (
          /* Fallback: render expression as styled math */
          <p style={{
            fontFamily: "'KaTeX_Math', 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', serif",
            fontSize: '1.4rem',
            fontStyle: 'italic',
            color: '#f1f5f9',
            letterSpacing: '0.03em',
            margin: 0,
          }}>
            {formula.expression}
          </p>
        )}
      </div>

      {/* ===== VARIABLE TABLE ===== */}
      {showDetails && formula.variables.length > 0 && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '0.75rem',
          marginBottom: '0.75rem',
        }}>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,163,184,0.5)', marginBottom: '0.4rem', fontWeight: 600 }}>
            Ký hiệu
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.25rem 1.5rem' }}>
            {formula.variables.map((v) => (
              <div key={v.symbol} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.025)' }}>
                {/* Render symbol with KaTeX if applicable */}
                <span style={{ minWidth: '2.5rem', flexShrink: 0 }}>
                  <span
                    dangerouslySetInnerHTML={{ __html: renderSymbol(v.symbol) }}
                    style={{ fontSize: '0.9rem', color: '#67e8f9' }}
                  />
                </span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.5)' }}>—</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', flex: 1 }}>{v.name}</span>
                {v.unit && (
                  <span style={{
                    fontSize: '0.65rem', color: 'rgba(99,102,241,0.7)',
                    fontFamily: 'monospace',
                    background: 'rgba(99,102,241,0.08)',
                    padding: '0.1em 0.4em', borderRadius: 4,
                    flexShrink: 0,
                  }}>
                    {v.unit}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== MEANING & CONTEXT ===== */}
      {showDetails && (formula.meaning || formula.usageContext) && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {formula.meaning && (
            <div style={{
              flex: 1, minWidth: 160,
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.1)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
            }}>
              <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(99,102,241,0.7)', fontWeight: 700, marginBottom: 2 }}>
                Ý nghĩa
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>{formula.meaning}</p>
            </div>
          )}
          {formula.usageContext && (
            <div style={{
              flex: 1, minWidth: 160,
              background: 'rgba(6,182,212,0.04)',
              border: '1px solid rgba(6,182,212,0.1)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
            }}>
              <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(6,182,212,0.7)', fontWeight: 700, marginBottom: 2 }}>
                Ứng dụng
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>{formula.usageContext}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
