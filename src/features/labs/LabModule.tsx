'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { allLabs, getLabById } from '@/lib/data/labs';
import { FormulaCard } from '@/components/FormulaCard';
import { Lab } from '@/types';
import { calculateLabResults } from '@/lib/labCalculations';
import { DefenseView } from './DefenseView';
import { PresentView } from './PresentView';

type ViewMode = 'lab' | 'defense' | 'present';
type LabTab  = 'info' | 'procedure' | 'data' | 'results' | 'questions' | 'videos';

/* ── View Mode Switcher ─────────────────────────────────── */
function ViewModeSwitcher({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  const modes: { key: ViewMode; icon: string; label: string; sub: string; color: string }[] = [
    { key: 'lab',     icon: '🔬', label: 'Lab',       sub: 'Thực hành & tính toán',     color: '#3468b8' },
    { key: 'defense', icon: '🎓', label: 'Bảo vệ',    sub: 'Tổng quan học thuật',        color: '#D4A017' },
    { key: 'present', icon: '📊', label: 'Trình bày', sub: 'Slide toàn màn hình',        color: '#8B5CF6' },
  ];

  return (
    <div
      className="flex gap-2 mb-6 p-1 rounded-xl no-print"
      style={{ background: 'rgba(24,35,56,0.7)', border: '1px solid rgba(212,160,23,0.12)', width: 'fit-content' }}
    >
      {modes.map(({ key, icon, label, sub, color }) => {
        const active = mode === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: active ? `1px solid ${color}40` : '1px solid transparent',
              background: active ? `${color}18` : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
              textAlign: 'left',
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              <div>
                <p style={{
                  fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2,
                  color: active ? (color === '#D4A017' ? '#EBB83A' : color === '#8B5CF6' ? '#c4b5fd' : '#93c5fd') : 'var(--text-secondary)',
                }}>
                  {label}
                </p>
                <p style={{ fontSize: '0.65rem', color: active ? 'var(--text-muted)' : 'rgba(107,122,153,0.6)', lineHeight: 1 }}>
                  {sub}
                </p>
              </div>
            </div>
            {active && (
              <div style={{ height: 2, borderRadius: 1, background: color, marginTop: 6 }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main Module ───────────────────────────────────────── */
export function LabModule() {
  const { selectedLabId, setSelectedLab } = useAppStore();
  const [activeTab, setActiveTab] = useState<LabTab>('info');
  const [viewMode, setViewMode] = useState<ViewMode>('lab');

  const lab = selectedLabId ? getLabById(selectedLabId) : allLabs[0];

  if (!lab) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🔬</p>
        <h2 className="text-xl font-display font-semibold mb-2">Chọn bài thí nghiệm</h2>
        <p style={{ color: 'var(--text-muted)' }}>Sử dụng thanh bên trái để chọn bài thí nghiệm.</p>
      </div>
    );
  }

  if (!selectedLabId && lab) setSelectedLab(lab.id);

  // Fullscreen present mode — renders outside normal layout
  if (viewMode === 'present') {
    return <PresentView lab={lab} onExit={() => setViewMode('lab')} />;
  }

  const tabs: { key: LabTab; label: string }[] = [
    { key: 'info',      label: 'Thông tin' },
    { key: 'procedure', label: 'Quy trình' },
    { key: 'data',      label: 'Nhập dữ liệu' },
    { key: 'results',   label: 'Kết quả' },
    { key: 'questions', label: 'Câu hỏi' },
    { key: 'videos',    label: 'Video' },
  ];

  return (
    <div>
      {/* Lab header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="badge-blue">Bài {lab.labNumber}</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">{lab.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lab.objective}</p>
      </div>

      {/* View Mode Switcher */}
      <ViewModeSwitcher mode={viewMode} onChange={setViewMode} />

      {/* Defense View */}
      {viewMode === 'defense' && <DefenseView lab={lab} />}

      {/* Lab View (tabs) */}
      {viewMode === 'lab' && (
        <>
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2 no-print">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`tab-btn whitespace-nowrap ${activeTab === key ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="animate-fade-in">
            {activeTab === 'info'      && <LabInfoTab      lab={lab} />}
            {activeTab === 'procedure' && <LabProcedureTab lab={lab} />}
            {activeTab === 'data'      && <LabDataTab      lab={lab} />}
            {activeTab === 'results'   && <LabResultsTab   lab={lab} />}
            {activeTab === 'questions' && <LabQuestionsTab lab={lab} />}
            {activeTab === 'videos'    && <LabVideosTab    lab={lab} />}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Lab Tabs (unchanged) ───────────────────────────────── */
function LabInfoTab({ lab }: { lab: Lab }) {
  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-3">🎯 Mục đích</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{lab.objective}</p>
      </div>
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-3">📐 Nguyên lý</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{lab.principle}</p>
      </div>
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-3">🔧 Dụng cụ - Thiết bị</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {lab.apparatus.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--utc-navy-light)', flexShrink: 0, display: 'inline-block' }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {lab.formulas.length > 0 && (
        <div>
          <h3 className="font-display font-semibold text-lg mb-3">📐 Công thức</h3>
          {lab.formulas.map((formula) => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>
      )}
      <div className="text-xs flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
        📄 Nguồn: {lab.sourceRefs.map(r => r.fileName).join(', ')}
      </div>
    </div>
  );
}

function LabProcedureTab({ lab }: { lab: Lab }) {
  return (
    <div className="glass-card">
      <h3 className="font-display font-semibold text-lg mb-4">📋 Quy trình thí nghiệm</h3>
      <div className="space-y-4">
        {lab.steps.map((step) => (
          <div key={step.stepNumber} className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: 'rgba(52,104,184,0.15)', color: '#93c5fd' }}>
              {step.stepNumber}
            </div>
            <div className="flex-1 pt-2">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              {step.note && <p className="text-xs mt-1" style={{ color: 'var(--utc-gold-light)' }}>📌 {step.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LabDataTab({ lab }: { lab: Lab }) {
  const { labInputData, setLabInput, clearLabData } = useAppStore();
  const data = labInputData[lab.id] || {};

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg">📝 Nhập dữ liệu thí nghiệm</h3>
          <button onClick={() => clearLabData(lab.id)} className="btn-secondary text-xs">🗑️ Xóa dữ liệu</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lab.inputFields.map((field) => (
            <div key={field.id}>
              <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>
                {field.label}
                {field.required && <span className="ml-1" style={{ color: '#E05252' }}>*</span>}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}`}
                  value={data[field.id] ?? ''}
                  onChange={(e) => setLabInput(lab.id, field.id, field.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value)}
                  className="input-field pr-12"
                  min={field.min} max={field.max}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'var(--text-muted)' }}>{field.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LabResultsTab({ lab }: { lab: Lab }) {
  const { labInputData } = useAppStore();
  const data = labInputData[lab.id] || {};
  const calculations = useMemo(() => calculateLabResults(lab.id, data), [lab.id, data]);

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-4">📊 Bảng kết quả</h3>
        {Object.keys(data).length === 0 ? (
          <p className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Vui lòng nhập dữ liệu trong tab &quot;Nhập dữ liệu&quot; trước.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {lab.resultTableSchema.map((col) => (
                    <th key={col.key} className="text-left py-3 px-4 text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calculations.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {lab.resultTableSchema.map((col) => (
                      <td key={col.key} className="py-3 px-4">
                        <span style={{ color: col.isInput ? 'var(--text-secondary)' : '#67e8f9', fontWeight: col.isInput ? 400 : 600 }}>
                          {row[col.key] !== undefined ? (typeof row[col.key] === 'number' ? (row[col.key] as number).toFixed(3) : row[col.key]) : '—'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function LabQuestionsTab({ lab }: { lab: Lab }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    const next = new Set(revealed);
    next.has(id) ? next.delete(id) : next.add(id);
    setRevealed(next);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-lg mb-4">❓ Câu hỏi thí nghiệm</h3>
      {lab.questions.length === 0 ? (
        <p className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Thiếu dữ liệu nguồn</p>
      ) : (
        lab.questions.map((q, i) => (
          <div key={q.id} className="glass-card">
            <p className="text-sm font-medium mb-3">
              <span style={{ color: '#93c5fd' }}>Câu {i + 1}:</span> {q.question}
            </p>
            {q.suggestedAnswer && (
              <>
                <button onClick={() => toggle(q.id)} className="btn-secondary text-sm">
                  {revealed.has(q.id) ? '🔽 Ẩn gợi ý' : '▶ Xem gợi ý trả lời'}
                </button>
                {revealed.has(q.id) && (
                  <div className="mt-3 p-3 rounded-lg animate-fade-in" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{q.suggestedAnswer}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

function LabVideosTab({ lab }: { lab: Lab }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-lg mb-4">🎬 Video thí nghiệm</h3>
      {lab.youtubeVideos.length === 0 ? (
        <p className="text-center py-8" style={{ color: 'var(--text-muted)' }}>Chưa có video cho bài thí nghiệm này.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lab.youtubeVideos.map((video) => {
            const videoId = extractYouTubeId(video.url);
            return (
              <div key={video.id} className="glass-card p-0 overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium">{video.title}</p>
                  <span className={`text-xs ${video.sourceType === 'provided' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {video.sourceType === 'provided' ? '📌 Nguồn giáo viên cung cấp' : '🔗 Nguồn tham khảo YouTube'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/);
  return match ? match[1] : '';
}
