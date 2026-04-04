'use client';

import { useCallback } from 'react';
import { Lab } from '@/types';
import { KaTeXFormula } from '@/components/KaTeXFormula';

interface DefenseViewProps { lab: Lab; }

export function DefenseView({ lab }: DefenseViewProps) {

  const handlePrint = useCallback(async () => {
    try {
      const { default: html2pdf } = await import('html2pdf.js');
      const el = document.getElementById('defense-content');
      if (!el) return;
      html2pdf().set({
        margin:      [12, 14],
        filename:    `Bai-TN-${lab.labNumber}-${lab.title.replace(/\s+/g, '-')}.pdf`,
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(el).save();
    } catch {
      window.print();
    }
  }, [lab]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 no-print">
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--utc-gold)', boxShadow: '0 0 6px rgba(212,160,23,0.5)',
            }}
          />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Chế độ Bảo vệ — Tổng hợp học thuật đúng chuẩn hội đồng
          </p>
        </div>
        <button
          onClick={handlePrint}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 20px', borderRadius: 10, cursor: 'pointer',
            background: 'linear-gradient(135deg, var(--utc-gold), #b88a10)',
            border: 'none', color: '#111827',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700, fontSize: '0.85rem',
            boxShadow: '0 4px 20px rgba(212,160,23,0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,160,23,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,160,23,0.3)')}
        >
          🖨️ Xuất PDF
        </button>
      </div>

      {/* ─── A4 Printable Content ─── */}
      <div
        id="defense-content"
        style={{
          fontFamily: "'Inter', 'Outfit', sans-serif",
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {/* ══ HEADER ══════════════════════════════════════════ */}
        <div
          className="rounded-2xl mb-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #182338 0%, #1B3A6B 60%, #182338 100%)',
            border: '1px solid rgba(212,160,23,0.35)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,160,23,0.1)',
          }}
        >
          {/* Top gold line */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #D4A017, #EBB83A, #D4A017, transparent)' }} />

          <div className="flex items-center gap-5 p-5">
            {/* Logo with white background for clarity */}
            <div
              style={{
                width: 88, height: 88, borderRadius: 12, flexShrink: 0,
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 4,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3), 0 0 0 2px rgba(212,160,23,0.3)',
              }}
            >
              <img
                src="/utc-logo.png"
                alt="UTC Logo"
                style={{ width: 78, height: 78, objectFit: 'contain' }}
                onError={(e) => {
                  const div = e.currentTarget.parentElement!;
                  div.innerHTML = '<span style="font-size:2.5rem">🎓</span>';
                }}
              />
            </div>

            {/* Title block */}
            <div className="flex-1 min-w-0">
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.62rem', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(212,160,23,0.75)',
                marginBottom: 6,
              }}>
                Trường Đại Học Giao Thông Vận Tải &nbsp;·&nbsp; Bộ Môn Địa Kỹ Thuật &nbsp;·&nbsp; UTC
              </p>
              <h1 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.25,
                background: 'linear-gradient(135deg, #EBB83A 0%, #F5D878 50%, #EBB83A 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 6,
              }}>
                {lab.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '3px 12px', borderRadius: 999,
                  background: 'rgba(27,58,107,0.5)',
                  border: '1px solid rgba(52,104,184,0.4)',
                  fontSize: '0.72rem', color: '#93c5fd', fontWeight: 600,
                }}>
                  🔬 Thí nghiệm số {lab.labNumber}
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '3px 12px', borderRadius: 999,
                  background: 'rgba(212,160,23,0.1)',
                  border: '1px solid rgba(212,160,23,0.2)',
                  fontSize: '0.72rem', color: 'var(--utc-gold-light)', fontWeight: 600,
                }}>
                  📚 Cơ Học Đất — 2TC
                </span>
              </div>
            </div>

            {/* Lab number badge */}
            <div style={{
              width: 60, height: 60, borderRadius: 14, flexShrink: 0,
              background: 'rgba(212,160,23,0.12)',
              border: '2px solid rgba(212,160,23,0.35)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '0.5rem', color: 'rgba(212,160,23,0.6)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Bài</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--utc-gold-light)', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{lab.labNumber}</span>
            </div>
          </div>

          {/* Bottom gold line */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.4), transparent)' }} />
        </div>

        {/* ══ ROW 1: Mục đích + Nguyên lý ═══════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DefCard icon="🎯" title="Mục đích thí nghiệm" accentColor="#3468b8" accentBg="rgba(52,104,184,0.08)">
            <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
              {lab.objective}
            </p>
          </DefCard>
          <DefCard icon="📐" title="Nguyên lý thực nghiệm" accentColor="#D4A017" accentBg="rgba(212,160,23,0.05)">
            <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
              {lab.principle}
            </p>
          </DefCard>
        </div>

        {/* ══ ROW 2: Dụng cụ + Quy trình ════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DefCard icon="🔧" title="Dụng cụ · Thiết bị" accentColor="#22C55E" accentBg="rgba(34,197,94,0.05)">
            <ul className="space-y-2">
              {lab.apparatus.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: 'rgba(34,197,94,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', fontWeight: 700, color: '#86efac',
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </DefCard>
          <DefCard icon="📋" title="Quy trình thực hiện" accentColor="#8B5CF6" accentBg="rgba(139,92,246,0.05)">
            <ol className="space-y-2.5">
              {lab.steps.map((step) => (
                <li key={step.stepNumber} className="flex gap-3 items-start">
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: 'rgba(139,92,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.68rem', fontWeight: 800, color: '#c4b5fd',
                  }}>
                    {step.stepNumber}
                  </div>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: 'var(--text-secondary)', flex: 1 }}>
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </DefCard>
        </div>

        {/* ══ CÔNG THỨC KaTeX ════════════════════════════════ */}
        {lab.formulas.length > 0 && (
          <div
            className="mb-4 rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,23,0.05), rgba(27,58,107,0.08))',
              border: '1px solid rgba(212,160,23,0.2)',
              borderLeft: '4px solid var(--utc-gold)',
            }}
          >
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700, fontSize: '0.88rem', marginBottom: 16,
              color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 24, height: 24, borderRadius: 6,
                background: 'rgba(212,160,23,0.15)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', color: 'var(--utc-gold-light)',
              }}>Σ</span>
              Công thức tính toán — MathType
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: lab.formulas.length === 1 ? '1fr' : '1fr 1fr',
                gap: 16,
              }}
            >
              {lab.formulas.map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(24,35,56,0.7)', border: '1px solid rgba(212,160,23,0.12)' }}
                >
                  <p style={{
                    fontSize: '0.7rem', color: 'var(--utc-gold-light)', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    {f.name}
                  </p>
                  {f.latex ? (
                    <KaTeXFormula latex={f.latex} display size="md" />
                  ) : (
                    <div className="katex-display-wrapper">
                      <code style={{ fontSize: '1rem', color: '#93c5fd' }}>{f.expression}</code>
                    </div>
                  )}
                  {f.variables.length > 0 && (
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      gap: '2px 12px', marginTop: 10,
                      paddingTop: 10, borderTop: '1px solid rgba(212,160,23,0.1)',
                    }}>
                      {f.variables.map((v) => (
                        <p key={v.symbol} style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: '#93c5fd', fontWeight: 700 }}>{v.symbol}</span>
                          {' — '}{v.name}{v.unit ? ` (${v.unit})` : ''}
                        </p>
                      ))}
                    </div>
                  )}
                  {f.meaning && (
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>
                      ↳ {f.meaning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ CÂU HỎI BẢO VỆ ════════════════════════════════ */}
        {lab.questions.length > 0 && (
          <div
            className="mb-4 rounded-xl overflow-hidden"
            style={{
              border: '1px solid rgba(224,82,82,0.2)',
              borderLeft: '4px solid #E05252',
              background: 'rgba(224,82,82,0.04)',
            }}
          >
            <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid rgba(224,82,82,0.12)' }}>
              <span style={{ fontSize: '1rem' }}>❓</span>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700, fontSize: '0.88rem', color: '#fca5a5',
              }}>
                Câu hỏi bảo vệ hội đồng
              </p>
              <span style={{
                marginLeft: 'auto', padding: '2px 10px', borderRadius: 999,
                background: 'rgba(224,82,82,0.15)',
                border: '1px solid rgba(224,82,82,0.3)',
                fontSize: '0.65rem', color: '#fca5a5', fontWeight: 700,
              }}>
                {lab.questions.length} câu
              </span>
            </div>
            <div className="space-y-3 p-5">
              {lab.questions.map((q, i) => (
                <div key={q.id}>
                  <p style={{
                    fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)',
                    marginBottom: 5,
                  }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: 6,
                      background: 'rgba(224,82,82,0.15)', color: '#fca5a5',
                      fontSize: '0.7rem', fontWeight: 800, marginRight: 8,
                    }}>
                      {i + 1}
                    </span>
                    {q.question}
                  </p>
                  {q.suggestedAnswer && (
                    <p style={{
                      fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6,
                      paddingLeft: 30, paddingTop: 4,
                      borderLeft: '2px solid rgba(224,82,82,0.25)',
                      marginLeft: 10,
                    }}>
                      💡 {q.suggestedAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ FOOTER ══════════════════════════════════════════ */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid rgba(212,160,23,0.15)', marginTop: 8 }}
        >
          <div className="flex items-center gap-3">
            <img
              src="/utc-logo.png"
              alt="UTC"
              style={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.7 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em' }}>
                TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI
              </p>
              <p style={{ fontSize: '0.55rem', color: 'rgba(212,160,23,0.5)', letterSpacing: '0.04em' }}>
                Bộ Môn Địa Kỹ Thuật &nbsp;·&nbsp; CƠ HỌC ĐẤT
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
            📄 {lab.sourceRefs.map(r => r.fileName).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable card ─────────────────────────────────────── */
function DefCard({
  icon, title, accentColor, accentBg, children,
}: {
  icon: string; title: string; accentColor: string; accentBg: string; children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(24,35,56,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: accentBg, borderBottom: `1px solid ${accentColor}18` }}
      >
        <span style={{ fontSize: '0.95rem' }}>{icon}</span>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)',
        }}>
          {title}
        </p>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
