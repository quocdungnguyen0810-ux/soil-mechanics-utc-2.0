'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lab } from '@/types';
import { KaTeXFormula } from '@/components/KaTeXFormula';

interface PresentViewProps { lab: Lab; onExit: () => void; }

type Slide = { id: string; title: string; icon: string; content: React.ReactNode };

export function PresentView({ lab, onExit }: PresentViewProps) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right'>('right');

  // Build slides
  const slides: Slide[] = [
    // 0 — Title
    {
      id: 'title', icon: '🔬', title: 'Tiêu đề',
      content: (
        <div className="flex flex-col items-center justify-center h-full gap-8 text-center px-16">
          <img src="/utc-logo.png" alt="UTC" style={{ width: 120, height: 120, objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.18em', color: 'rgba(212,160,23,0.7)', textTransform: 'uppercase', marginBottom: 16 }}>
              Trường Đại Học Giao Thông Vận Tải · Bộ Môn Địa Kỹ Thuật
            </p>
            <h1
              className="font-display font-bold mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                background: 'linear-gradient(135deg,#EBB83A,#F5D878)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1.2,
              }}
            >
              {lab.title}
            </h1>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '8px 24px', borderRadius: 999,
                background: 'rgba(27,58,107,0.4)',
                border: '1px solid rgba(212,160,23,0.3)',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#93c5fd' }}>Thí nghiệm số {lab.labNumber}</span>
              <span style={{ color: 'rgba(212,160,23,0.4)' }}>·</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cơ Học Đất</span>
            </div>
          </div>
          <div
            className="rounded-xl p-5 max-w-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,160,23,0.15)' }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
              {lab.objective}
            </p>
          </div>
        </div>
      ),
    },
    // 1 — Nguyên lý + Dụng cụ
    {
      id: 'setup', icon: '📐', title: 'Nguyên lý & Dụng cụ',
      content: (
        <div className="grid grid-cols-2 gap-8 h-full px-12 py-6">
          <SlidePanel title="Nguyên lý thực nghiệm" icon="📐" color="#D4A017">
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{lab.principle}</p>
            {lab.formulas[0]?.latex && (
              <div className="mt-6">
                <KaTeXFormula latex={lab.formulas[0].latex} display size="lg" />
              </div>
            )}
          </SlidePanel>
          <SlidePanel title="Dụng cụ · Thiết bị" icon="🔧" color="#22C55E">
            <ul className="space-y-3">
              {lab.apparatus.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    style={{
                      width: 28, height: 28, borderRadius: 8, background: 'rgba(34,197,94,0.15)',
                      color: '#86efac', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </SlidePanel>
        </div>
      ),
    },
    // 2 — Quy trình
    {
      id: 'steps', icon: '📋', title: 'Quy trình thực hiện',
      content: (
        <div className="px-14 py-6 h-full flex flex-col">
          <h2 className="font-display font-bold mb-6 text-center" style={{ fontSize: '1.6rem', color: 'var(--utc-gold-light)' }}>
            📋 Các bước thực hiện
          </h2>
          <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-fr">
            {lab.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl p-4 flex gap-4 items-start"
                style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(139,92,246,0.25)', color: '#c4b5fd',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', fontWeight: 800,
                  }}
                >
                  {step.stepNumber}
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', paddingTop: 4 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 3 — Công thức
    {
      id: 'formula', icon: '∑', title: 'Công thức',
      content: (
        <div className="px-14 py-6 h-full flex flex-col justify-center items-center gap-8">
          <h2 className="font-display font-bold" style={{ fontSize: '1.6rem', color: 'var(--utc-gold-light)' }}>
            Công thức tính toán
          </h2>
          {lab.formulas.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl p-8 w-full max-w-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(27,58,107,0.25), rgba(212,160,23,0.06))',
                border: '1px solid rgba(212,160,23,0.25)',
                borderLeft: '5px solid var(--utc-gold)',
              }}
            >
              <p className="text-center mb-2 font-display font-semibold" style={{ color: 'var(--utc-gold-light)', fontSize: '0.9rem', letterSpacing: '0.08em' }}>
                {f.name}
              </p>
              {f.latex ? (
                <KaTeXFormula latex={f.latex} display size="xl" />
              ) : (
                <p className="text-center font-mono" style={{ fontSize: '1.6rem', color: '#93c5fd' }}>{f.expression}</p>
              )}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {f.variables.map((v) => (
                  <div key={v.symbol} className="flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#93c5fd', fontWeight: 700, fontSize: '1rem', minWidth: 24 }}>{v.symbol}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>— {v.name}{v.unit ? ` (${v.unit})` : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    // 4 — Câu hỏi
    ...( lab.questions.length > 0 ? [{
      id: 'questions', icon: '❓', title: 'Câu hỏi bảo vệ',
      content: (
        <div className="px-14 py-6 h-full flex flex-col">
          <h2 className="font-display font-bold mb-6 text-center" style={{ fontSize: '1.6rem', color: '#fca5a5' }}>
            ❓ Câu hỏi bảo vệ
          </h2>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {lab.questions.map((q, i) => (
              <div
                key={q.id}
                className="rounded-xl p-5"
                style={{ background: 'rgba(224,82,82,0.06)', border: '1px solid rgba(224,82,82,0.2)', borderLeft: '4px solid #E05252' }}
              >
                <p className="font-semibold mb-3" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: '#fca5a5' }}>Câu {i + 1}:</span> {q.question}
                </p>
                {q.suggestedAnswer && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', paddingLeft: 12, borderLeft: '2px solid rgba(224,82,82,0.3)' }}>
                    💡 {q.suggestedAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    }] : []),
  ];

  const total = slides.length;
  const go = useCallback((dir: 1 | -1) => {
    setAnimDir(dir > 0 ? 'right' : 'left');
    setCurrent(c => Math.max(0, Math.min(total - 1, c + dir)));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1);
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onExit]);

  const slide = slides[current];

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'linear-gradient(135deg, #0d1829 0%, #111827 60%, #0a1525 100%)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Decorative glow */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'rgba(27,58,107,0.12)', filter: 'blur(120px)', top: -200, right: -100, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(212,160,23,0.05)', filter: 'blur(100px)', bottom: -100, left: -100, pointerEvents: 'none' }} />

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-8 shrink-0"
        style={{ height: 56, borderBottom: '1px solid rgba(212,160,23,0.1)', background: 'rgba(17,24,39,0.9)', backdropFilter: 'blur(12px)', position: 'relative', zIndex: 2 }}
      >
        <div className="flex items-center gap-4">
          <img src="/utc-logo.png" alt="UTC" style={{ height: 32, objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--utc-gold-light)', fontWeight: 700, letterSpacing: '0.08em' }}>
              BÀI {lab.labNumber} · CƠ HỌC ĐẤT
            </p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              {slide.icon} {slide.title}
            </p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setAnimDir(i > current ? 'right' : 'left'); setCurrent(i); }}
              style={{
                width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                background: i === current ? 'var(--utc-gold)' : 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
              }}
              title={s.title}
            />
          ))}
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 8 }}>
            {current + 1}/{total}
          </span>
        </div>

        <button
          onClick={onExit}
          style={{
            padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(224,82,82,0.3)',
            background: 'rgba(224,82,82,0.08)', color: '#fca5a5', fontSize: '0.8rem', cursor: 'pointer',
          }}
        >
          ✕ Thoát (Esc)
        </button>
      </div>

      {/* Slide content */}
      <div
        key={`${slide.id}-${current}`}
        style={{
          flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1,
          animation: `slideIn${animDir === 'right' ? 'Right' : 'Left'} 0.35s cubic-bezier(.4,0,.2,1)`,
        }}
      >
        {slide.content}
      </div>

      {/* Bottom nav */}
      <div
        className="flex items-center justify-between px-10 shrink-0"
        style={{ height: 60, borderTop: '1px solid rgba(212,160,23,0.08)', background: 'rgba(17,24,39,0.7)', position: 'relative', zIndex: 2 }}
      >
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 10,
            background: current === 0 ? 'transparent' : 'rgba(27,58,107,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: current === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text-secondary)',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem', transition: 'all 0.2s',
          }}
        >
          ← Trước
        </button>

        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          ← → Di chuyển bằng phím mũi tên · ESC Thoát
        </p>

        <button
          onClick={() => current === total - 1 ? onExit() : go(1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 10,
            background: current === total - 1 ? 'rgba(212,160,23,0.15)' : 'rgba(27,58,107,0.4)',
            border: `1px solid ${current === total - 1 ? 'rgba(212,160,23,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: current === total - 1 ? 'var(--utc-gold-light)' : 'var(--text-secondary)',
            cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
          }}
        >
          {current === total - 1 ? '✓ Kết thúc' : 'Tiếp →'}
        </button>
      </div>

      {/* Slide animations */}
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: none; } }
        @keyframes slideInLeft  { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}

function SlidePanel({ title, icon, color, children }: { title: string; icon: string; color: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col h-full"
      style={{
        background: 'rgba(24,35,56,0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: `4px solid ${color}`,
      }}
    >
      <p className="font-display font-bold mb-5 flex items-center gap-2" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
        <span>{icon}</span> {title}
      </p>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
