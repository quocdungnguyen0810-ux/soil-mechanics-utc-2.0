'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { allLabs, getLabById } from '@/lib/data/labs';
import { FormulaCard } from '@/components/FormulaCard';
import { Lab } from '@/types';
import { calculateLabResults } from '@/lib/labCalculations';

type LabTab = 'info' | 'procedure' | 'data' | 'results' | 'questions' | 'videos';

export function LabModule() {
  const { selectedLabId, setSelectedLab, labInputData, setLabInput, clearLabData } = useAppStore();
  const [activeTab, setActiveTab] = useState<LabTab>('info');

  const lab = selectedLabId ? getLabById(selectedLabId) : allLabs[0];

  if (!lab) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🔬</p>
        <h2 className="text-xl font-display font-semibold mb-2">Chọn bài thí nghiệm</h2>
        <p className="text-dark-400">Sử dụng thanh bên trái để chọn bài thí nghiệm.</p>
      </div>
    );
  }

  // Make sure lab is selected
  if (!selectedLabId && lab) setSelectedLab(lab.id);

  const tabs: { key: LabTab; label: string }[] = [
    { key: 'info', label: 'Thông tin' },
    { key: 'procedure', label: 'Quy trình' },
    { key: 'data', label: 'Nhập dữ liệu' },
    { key: 'results', label: 'Kết quả' },
    { key: 'questions', label: 'Câu hỏi' },
    { key: 'videos', label: 'Video' },
  ];

  return (
    <div>
      {/* Lab header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="badge-blue">Bài {lab.labNumber}</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-3">{lab.title}</h1>
        <p className="text-dark-300 leading-relaxed">{lab.objective}</p>
      </div>

      {/* Tabs */}
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
        {activeTab === 'info' && <LabInfoTab lab={lab} />}
        {activeTab === 'procedure' && <LabProcedureTab lab={lab} />}
        {activeTab === 'data' && <LabDataTab lab={lab} />}
        {activeTab === 'results' && <LabResultsTab lab={lab} />}
        {activeTab === 'questions' && <LabQuestionsTab lab={lab} />}
        {activeTab === 'videos' && <LabVideosTab lab={lab} />}
      </div>
    </div>
  );
}

function LabInfoTab({ lab }: { lab: Lab }) {
  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-3">🎯 Mục đích</h3>
        <p className="text-sm text-dark-200">{lab.objective}</p>
      </div>

      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-3">📐 Nguyên lý</h3>
        <p className="text-sm text-dark-200 leading-relaxed">{lab.principle}</p>
      </div>

      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-3">🔧 Dụng cụ - Thiết bị</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {lab.apparatus.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-dark-200">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulas */}
      {lab.formulas.length > 0 && (
        <div>
          <h3 className="font-display font-semibold text-lg mb-3">📐 Công thức</h3>
          {lab.formulas.map((formula) => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>
      )}

      <div className="text-xs text-dark-500 flex items-center gap-2">
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
            <div className="w-10 h-10 rounded-full bg-primary-600/20 text-primary-400 flex items-center justify-center text-sm font-bold shrink-0">
              {step.stepNumber}
            </div>
            <div className="flex-1 pt-2">
              <p className="text-sm text-dark-200 leading-relaxed">{step.description}</p>
              {step.note && (
                <p className="text-xs text-amber-400 mt-1">📌 {step.note}</p>
              )}
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
          <button onClick={() => clearLabData(lab.id)} className="btn-secondary text-xs">
            🗑️ Xóa dữ liệu
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lab.inputFields.map((field) => (
            <div key={field.id}>
              <label className="text-xs text-dark-400 mb-1 block">
                {field.label}
                {field.required && <span className="text-rose-400 ml-1">*</span>}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}`}
                  value={data[field.id] ?? ''}
                  onChange={(e) => setLabInput(lab.id, field.id, field.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value)}
                  className="input-field pr-12"
                  min={field.min}
                  max={field.max}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dark-500">{field.unit}</span>
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

  // Simple calculation engine based on lab type
  const calculations = useMemo(() => {
    return calculateLabResults(lab.id, data);
  }, [lab.id, data]);

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-4">📊 Bảng kết quả</h3>

        {Object.keys(data).length === 0 ? (
          <p className="text-dark-400 text-center py-8">Vui lòng nhập dữ liệu trong tab &quot;Nhập dữ liệu&quot; trước.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {lab.resultTableSchema.map((col) => (
                    <th key={col.key} className="text-left py-3 px-4 text-xs text-dark-400 uppercase tracking-wider">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calculations.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    {lab.resultTableSchema.map((col) => (
                      <td key={col.key} className="py-3 px-4">
                        <span className={col.isInput ? 'text-dark-200' : 'text-cyan-400 font-semibold'}>
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
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(revealedAnswers);
    next.has(id) ? next.delete(id) : next.add(id);
    setRevealedAnswers(next);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-lg mb-4">❓ Câu hỏi thí nghiệm</h3>
      {lab.questions.length === 0 ? (
        <p className="text-dark-400 text-center py-8">Thiếu dữ liệu nguồn - Missing question data</p>
      ) : (
        lab.questions.map((q, i) => (
          <div key={q.id} className="glass-card">
            <p className="text-sm font-medium mb-3">
              <span className="text-primary-400">Câu {i + 1}:</span> {q.question}
            </p>
            {q.suggestedAnswer && (
              <>
                <button onClick={() => toggle(q.id)} className="btn-secondary text-sm">
                  {revealedAnswers.has(q.id) ? '🔽 Ẩn gợi ý' : '▶ Xem gợi ý trả lời'}
                </button>
                {revealedAnswers.has(q.id) && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 animate-fade-in">
                    <p className="text-sm text-dark-200">{q.suggestedAnswer}</p>
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
        <p className="text-dark-400 text-center py-8">Chưa có video cho bài thí nghiệm này.</p>
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

// Utility: extract YouTube video ID
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/);
  return match ? match[1] : '';
}



