'use client';

import { useCallback } from 'react';
import { Lab } from '@/types';
import { KaTeXFormula } from '@/components/KaTeXFormula';

interface DefenseViewProps { lab: Lab; }

export function DefenseView({ lab }: DefenseViewProps) {

  const handlePrint = useCallback(async () => {
    // Use html2pdf if available, else browser print
    try {
      const { default: html2pdf } = await import('html2pdf.js');
      const el = document.getElementById('defense-content');
      if (!el) return;
      html2pdf().set({
        margin:      [10, 12],
        filename:    `Bai-${lab.labNumber}-${lab.title.replace(/\s+/g, '-')}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:   { mode: 'avoid-all' },
      }).from(el).save();
    } catch {
      window.print();
    }
  }, [lab]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 no-print">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          🎓 Chế độ bảo vệ — tổng hợp đầy đủ thông tin
        </p>
        <button
          onClick={handlePrint}
          className="btn-primary flex items-center gap-2 text-sm"
          style={{ padding: '8px 18px' }}
        >
          🖨️ Xuất PDF
        </button>
      </div>

      {/* Printable content */}
      <div id="defense-content" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <div
          className="rounded-2xl p-6 mb-5 flex items-center gap-5"
          style={{
            background: 'linear-gradient(135deg, #182338 0%, #1B3A6B 100%)',
            border: '1px solid rgba(212,160,23,0.3)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
          }}
        >
          {/* Logo */}
          <img
            src="/utc-logo.png"
            alt="UTC Logo"
            style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(212,160,23,0.8)', textTransform: 'uppercase' }}>
              Trường Đại Học Giao Thông Vận Tải · Bộ Môn Địa Kỹ Thuật
            </p>
            <h1
              className="font-display font-bold leading-tight"
              style={{ fontSize: '1.4rem', background: 'linear-gradient(135deg,#EBB83A,#F5D878)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {lab.title}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'rgba(176,187,204,0.7)', marginTop: 4 }}>
              Thí nghiệm số {lab.labNumber} · Cơ Học Đất
            </p>
          </div>
          <div
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(212,160,23,0.15)',
              border: '2px solid rgba(212,160,23,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', flexShrink: 0,
            }}
          >
            🔬
          </div>
        </div>

        {/* Row 1: Mục đích + Nguyên lý */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DefCard icon="🎯" title="Mục đích thí nghiệm" accent="#3468b8">
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {lab.objective}
            </p>
          </DefCard>
          <DefCard icon="📐" title="Nguyên lý" accent="#D4A017">
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {lab.principle}
            </p>
          </DefCard>
        </div>

        {/* Row 2: Dụng cụ + Quy trình */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DefCard icon="🔧" title="Dụng cụ · Thiết bị" accent="#22C55E">
            <ul className="space-y-1.5">
              {lab.apparatus.map((item, i) => (
                <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </DefCard>
          <DefCard icon="📋" title="Quy trình thực hiện" accent="#8B5CF6">
            <ol className="space-y-2">
              {lab.steps.map((step) => (
                <li key={step.stepNumber} className="flex gap-3">
                  <span
                    style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(139,92,246,0.2)', color: '#c4b5fd',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 700,
                    }}
                  >
                    {step.stepNumber}
                  </span>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </DefCard>
        </div>

        {/* Formulas */}
        {lab.formulas.length > 0 && (
          <div className="mb-4">
            <div
              className="rounded-xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(212,160,23,0.06), rgba(27,58,107,0.08))',
                border: '1px solid rgba(212,160,23,0.2)',
                borderLeft: '4px solid var(--utc-gold)',
              }}
            >
              <p className="font-display font-semibold mb-3 flex items-center gap-2" style={{ fontSize: '0.9rem' }}>
                <span>∑</span> Công thức tính toán
              </p>
              <div className="grid gap-4" style={{ gridTemplateColumns: lab.formulas.length > 1 ? '1fr 1fr' : '1fr' }}>
                {lab.formulas.map((f) => (
                  <div key={f.id} className="space-y-2">
                    <p style={{ fontSize: '0.72rem', color: 'var(--utc-gold-light)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-2">
                        {f.variables.map((v) => (
                          <p key={v.symbol} style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            <span style={{ color: '#93c5fd', fontWeight: 600 }}>{v.symbol}</span>
                            {' — '}{v.name}{v.unit ? ` (${v.unit})` : ''}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Row 3: Câu hỏi bảo vệ */}
        {lab.questions.length > 0 && (
          <DefCard icon="❓" title="Câu hỏi bảo vệ" accent="#E05252">
            <div className="space-y-3">
              {lab.questions.map((q, i) => (
                <div key={q.id}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                    <span style={{ color: '#fca5a5' }}>Q{i + 1}.</span> {q.question}
                  </p>
                  {q.suggestedAnswer && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: 16, borderLeft: '2px solid rgba(224,82,82,0.3)' }}>
                      ▶ {q.suggestedAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </DefCard>
        )}

        {/* Footer */}
        <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid rgba(212,160,23,0.12)' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            📄 Tài liệu: {lab.sourceRefs.map(r => r.fileName).join(', ')} · Bộ Môn Địa Kỹ Thuật · Trường ĐHGTVT
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Small reusable card ─────────────────────── */
function DefCard({
  icon, title, accent, children,
}: {
  icon: string; title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'rgba(24,35,56,0.7)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: `3px solid ${accent}`,
      }}
    >
      <p className="font-display font-semibold mb-3 flex items-center gap-2" style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
        <span>{icon}</span> {title}
      </p>
      {children}
    </div>
  );
}
