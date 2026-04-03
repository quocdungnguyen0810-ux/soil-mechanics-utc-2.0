'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getChapterById, allChapters } from '@/lib/data/chapters';
import { getExercisesByChapter } from '@/lib/data/exercises';
import { FormulaBlock } from '@/components/content/FormulaBlock';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { QuizSection } from '@/components/QuizSection';
import { Chapter, ChapterSection } from '@/types';
import { SlideViewer } from '@/components/lectures/SlideViewer';
import { ChapterIllustration } from '@/components/illustrations/ChapterIllustrations';

type Tab = 'overview' | 'content' | 'formulas' | 'examples' | 'quiz' | 'exercises' | 'lecture';

interface TheoryModuleProps {
  chapterId: string;
}

export function TheoryModule({ chapterId }: TheoryModuleProps) {
  const { progress, markChapterCompleted } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const chapter = getChapterById(chapterId) || allChapters[0];
  if (!chapter) return <NoChapter />;

  const exercises = getExercisesByChapter(chapter.id);
  const isCompleted = progress.completedChapters.includes(chapter.id);

  const tabs: { key: Tab; label: string; icon: string; count?: number }[] = [
    { key: 'overview',  label: 'Tổng quan',    icon: '🏠' },
    { key: 'content',   label: 'Nội dung',     icon: '📖', count: chapter.detailedSummary.length },
    { key: 'lecture',   label: 'Bài giảng',    icon: '📽️' },
    { key: 'formulas',  label: 'Công thức',    icon: 'Σ',  count: chapter.formulas.length },
    { key: 'examples',  label: 'Ví dụ giải',  icon: '📝', count: chapter.workedExamples.length },
    { key: 'quiz',      label: 'Trắc nghiệm', icon: '❓', count: chapter.quizzes.length },
    { key: 'exercises', label: 'Bài tập',     icon: '✏️', count: exercises.length },
  ];

  return (
    <div>
      {/* Chapter header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="badge-utc">
            🏛️ Chương {chapter.chapterNumber}
          </span>
          {isCompleted && <span className="badge-green">✓ Hoàn thành</span>}
          <span className="badge-amber">
            🎯 Phủ: {Math.round(chapter.sourceCoverageOverall * 100)}%
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-3">{chapter.title}</h1>
        <p className="text-dark-300 leading-relaxed max-w-3xl">{chapter.overview}</p>
        {!isCompleted && (
          <button
            onClick={() => markChapterCompleted(chapter.id)}
            className="btn-secondary mt-4 text-sm"
          >
            ✓ Đánh dấu hoàn thành
          </button>
        )}
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 mb-6 overflow-x-auto pb-1 no-print"
        style={{
          borderBottom: '1px solid rgba(59,100,200,0.12)',
          paddingBottom: '1px',
        }}
      >
        {tabs.map(({ key, label, icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`tab-btn whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === key ? 'active' : ''
            }`}
          >
            <span style={{ fontSize: '0.8em' }}>{icon}</span>
            {label}
            {count !== undefined && count > 0 && (
              <span
                className="ml-0.5 text-xs"
                style={{
                  opacity: activeTab === key ? 0.8 : 0.5,
                  background: activeTab === key ? 'rgba(200,150,12,0.15)' : 'transparent',
                  padding: '0 4px', borderRadius: 8,
                }}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {activeTab === 'overview' && <OverviewTab chapter={chapter} />}
        {activeTab === 'content' && <ContentTab chapter={chapter} />}
        {activeTab === 'formulas' && <FormulasTab chapter={chapter} />}
        {activeTab === 'examples' && <ExamplesTab chapter={chapter} />}
        {activeTab === 'quiz' && <QuizSection chapter={chapter} />}
        {activeTab === 'exercises' && (
          <ExercisesTab exercises={exercises} chapterNumber={chapter.chapterNumber} />
        )}
        {activeTab === 'lecture' && (
          <div className="space-y-6">
            <SlideViewer
              chapterId={chapter.id}
              chapterNumber={chapter.chapterNumber}
              chapterTitle={chapter.title}
              slideFile={`ch${chapter.chapterNumber}.pdf`}
            />
            {/* Illustration reference */}
            <div className="glass-card">
              <h3 className="font-display font-semibold text-base mb-3 flex items-center gap-2">
                📐 Hình vẽ kỹ thuật tham khảo
              </h3>
              <ChapterIllustration chapterId={chapter.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NoChapter() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">📖</p>
      <h2 className="text-xl font-display font-semibold mb-2">
        Chọn một chương để bắt đầu
      </h2>
      <p className="text-dark-400">Sử dụng thanh bên trái để chọn chương học.</p>
    </div>
  );
}

function OverviewTab({ chapter }: { chapter: Chapter }) {
  return (
    <div className="space-y-6">
      {/* Technical Illustration */}
      <ChapterIllustration chapterId={chapter.id} />

      {/* Learning objectives */}
      <div className="glass-card">
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          🎯 Mục tiêu học tập
        </h3>
        <ul className="space-y-2">
          {chapter.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-dark-200">
              <span className="w-5 h-5 rounded-full bg-primary-600/20 text-primary-400 flex items-center justify-center text-xs mt-0.5 shrink-0">
                {i + 1}
              </span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Mục', value: chapter.detailedSummary.length, icon: '📑', color: 'text-blue-400' },
          { label: 'Khái niệm', value: chapter.keyConcepts.length, icon: '💡', color: 'text-emerald-400' },
          { label: 'Công thức', value: chapter.formulas.length, icon: '📐', color: 'text-cyan-400' },
          { label: 'Ví dụ', value: chapter.workedExamples.length, icon: '📝', color: 'text-amber-400' },
          { label: 'Trắc nghiệm', value: chapter.quizzes.length, icon: '❓', color: 'text-purple-400' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="glass-card text-center py-3">
            <p className="text-xl mb-1">{icon}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-dark-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Key concepts */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-lg">💡 Khái niệm trọng tâm</h3>
        {chapter.keyConcepts.map((c) => (
          <div key={c.id} className="concept-card">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm">{c.title}</h4>
              <span
                className={`badge ${
                  c.importance === 'critical'
                    ? 'badge-rose'
                    : c.importance === 'important'
                      ? 'badge-amber'
                      : 'badge-blue'
                }`}
              >
                {c.importance === 'critical'
                  ? 'Quan trọng'
                  : c.importance === 'important'
                    ? 'Cần nắm'
                    : 'Bổ sung'}
              </span>
            </div>
            <p className="text-xs text-dark-300 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>

      {/* Important notes */}
      {chapter.importantNotes.length > 0 && (
        <div className="glass-card" style={{ borderLeft: '3px solid #06b6d4' }}>
          <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
            📌 Ghi nhớ quan trọng
          </h3>
          <ul className="space-y-2">
            {chapter.importantNotes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-200">
                <span className="text-cyan-400 mt-0.5 shrink-0">▸</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common mistakes */}
      {chapter.commonMistakes.length > 0 && (
        <div className="warning-card">
          <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
            ⚠️ Lỗi thường gặp
          </h3>
          <ul className="space-y-2">
            {chapter.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-200">
                <span className="text-amber-400 mt-0.5">✕</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Review questions */}
      {chapter.reviewQuestions.length > 0 && (
        <div className="glass-card">
          <h3 className="font-display font-semibold text-lg mb-3">
            💬 Câu hỏi ôn tập
          </h3>
          <div className="space-y-2">
            {chapter.reviewQuestions.map((q, i) => (
              <div key={q.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <p className="text-sm text-dark-200">
                  <span className="text-primary-400 font-medium">Câu {i + 1}:</span>{' '}
                  {q.question}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-dark-500">
        📄 Nguồn: {chapter.sourceRefs.map((r) => r.fileName).join(', ')}
      </div>
    </div>
  );
}

// ===== DETAILED CONTENT TAB =====
function ContentTab({ chapter }: { chapter: Chapter }) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(chapter.detailedSummary.map((s) => s.id))
  );

  const toggle = (id: string) => {
    const next = new Set(expandedSections);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedSections(next);
  };

  if (chapter.detailedSummary.length === 0) {
    return (
      <p className="text-dark-400 text-center py-10">
        Thiếu dữ liệu nguồn — Missing source data
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display font-semibold text-lg">📑 Nội dung chi tiết</h3>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setExpandedSections(new Set(chapter.detailedSummary.map((s) => s.id)))
            }
            className="btn-secondary text-xs"
          >
            Mở tất cả
          </button>
          <button
            onClick={() => setExpandedSections(new Set())}
            className="btn-secondary text-xs"
          >
            Thu gọn
          </button>
        </div>
      </div>

      {chapter.detailedSummary.map((section, index) => (
        <SectionBlock
          key={section.id}
          section={section}
          expanded={expandedSections.has(section.id)}
          onToggle={() => toggle(section.id)}
          chapterId={chapter.id}
          sectionIndex={index}
        />
      ))}
    </div>
  );
}

function SectionBlock({
  section,
  expanded,
  onToggle,
  chapterId,
  sectionIndex,
}: {
  section: ChapterSection;
  expanded: boolean;
  onToggle: () => void;
  chapterId?: string;
  sectionIndex?: number;
}) {
  return (
    <div
      className="glass-card"
      style={{
        borderLeft: '2px solid rgba(200,150,12,0.35)',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            style={{
              width: 24, height: 24,
              borderRadius: 6,
              background: 'rgba(200,150,12,0.12)',
              border: '1px solid rgba(200,150,12,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 700, color: 'rgba(240,180,40,0.8)',
              flexShrink: 0,
            }}
          >
            {(sectionIndex ?? 0) + 1}
          </span>
          <h4 className="font-display font-semibold text-base truncate">{section.title}</h4>
        </div>
        <span style={{ color: 'rgba(200,150,12,0.6)', fontSize: '1rem', flexShrink: 0 }}>
          {expanded ? '▾' : '▸'}
        </span>
      </button>

      {expanded && (
        <div className="mt-4 animate-fade-in space-y-4">
          {/* Illustration for first 2 sections of each chapter */}
          {chapterId && sectionIndex !== undefined && sectionIndex < 2 && (
            <ChapterIllustration chapterId={chapterId} compact />
          )}

          {/* Content */}
          <ContentRenderer content={section.content} />

          {/* Inline formulas */}
          {section.formulas && section.formulas.length > 0 && (
            <div className="space-y-3">
              {section.formulas.map((f) => (
                <FormulaBlock key={f.id} formula={f} compact />
              ))}
            </div>
          )}

          {/* Notes */}
          {section.notes && section.notes.length > 0 && (
            <div
              className="p-3 rounded-lg space-y-1"
              style={{
                background: 'rgba(200,150,12,0.04)',
                border: '1px solid rgba(200,150,12,0.15)',
                borderLeft: '3px solid rgba(200,150,12,0.5)',
              }}
            >
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(200,150,12,0.6)', fontWeight: 700, marginBottom: 4 }}>
                📌 Ghi chú
              </p>
              {section.notes.map((n, i) => (
                <p key={i} className="text-xs" style={{ color: '#c8960c' }}>
                  ▸ {n}
                </p>
              ))}
            </div>
          )}

          {/* Source reference */}
          {section.sourceRef && (
            <p style={{ fontSize: '0.65rem', color: 'rgba(91,110,153,0.6)', marginTop: 4 }}>
              📄 {section.sourceRef.fileName}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function FormulasTab({ chapter }: { chapter: Chapter }) {
  const { progress } = useAppStore();
  const [showBookmarked, setShowBookmarked] = useState(false);

  const bookmarkedIds = new Set(progress.bookmarkedFormulas);
  const filtered = showBookmarked
    ? chapter.formulas.filter(f => bookmarkedIds.has(f.id))
    : chapter.formulas;
  const bookmarkedCount = chapter.formulas.filter(f => bookmarkedIds.has(f.id)).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-semibold text-lg">📐 Công thức</h3>
          <p className="text-xs text-dark-400 mt-0.5">
            {chapter.formulas.length} công thức • Chuẩn MathType / KaTeX
          </p>
        </div>
        {bookmarkedCount > 0 && (
          <button
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showBookmarked
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 text-dark-400 border border-white/10 hover:text-white'
            }`}
          >
            ⭐ Đã đánh dấu ({bookmarkedCount})
          </button>
        )}
      </div>

      {chapter.formulas.length === 0 ? (
        <p className="text-dark-400 text-center py-10">Thiếu dữ liệu nguồn</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-2xl mb-2">☆</p>
          <p className="text-dark-400 text-sm">Chưa đánh dấu công thức nào trong chương này.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((f) => <FormulaBlock key={f.id} formula={f} />)}
        </div>
      )}
    </div>
  );
}


function ExamplesTab({ chapter }: { chapter: Chapter }) {
  const [openExamples, setOpenExamples] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    const n = new Set(openExamples);
    n.has(id) ? n.delete(id) : n.add(id);
    setOpenExamples(n);
  };

  if (chapter.workedExamples.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-4xl mb-3">📝</p>
        <p className="text-dark-400">Thiếu dữ liệu nguồn — Chưa có ví dụ minh họa</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chapter.workedExamples.map((ex) => (
        <div key={ex.id} className="glass-card">
          <h4 className="font-semibold mb-2">{ex.title}</h4>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 mb-3">
            <p className="text-sm font-medium text-primary-300 mb-1">Đề bài:</p>
            <p className="text-sm text-dark-200 whitespace-pre-line">{ex.problem}</p>
          </div>
          <button onClick={() => toggle(ex.id)} className="btn-secondary text-sm">
            {openExamples.has(ex.id) ? '▾ Ẩn lời giải' : '▸ Xem lời giải'}
          </button>
          {openExamples.has(ex.id) && (
            <div className="mt-4 animate-fade-in">
              <p className="text-sm font-medium text-emerald-400 mb-2">Lời giải:</p>
              <ol className="space-y-1.5">
                {ex.steps.map((step, i) => (
                  <li key={i} className="text-sm text-dark-200 flex gap-2">
                    <span className="text-primary-400 font-mono text-xs mt-0.5">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-sm text-dark-200 whitespace-pre-line">{ex.solution}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ExercisesTab({
  exercises,
  chapterNumber,
}: {
  exercises: any[];
  chapterNumber: number;
}) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const toggleAnswer = (id: string) => {
    const n = new Set(revealedAnswers);
    n.has(id) ? n.delete(id) : n.add(id);
    setRevealedAnswers(n);
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-4xl mb-3">✏️</p>
        <p className="text-dark-400">Chưa có bài tập cho chương {chapterNumber}</p>
        <p className="text-xs text-dark-500 mt-1">Thiếu dữ liệu nguồn</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {exercises.map((ex: any, idx: number) => (
        <div key={ex.id} className="glass-card">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-primary-600/20 text-primary-400 flex items-center justify-center text-sm font-bold">
              {idx + 1}
            </span>
            <h3 className="font-semibold">{ex.title}</h3>
            {ex.hasDetailedSolution && (
              <span className="badge-green text-xs">Có đáp án</span>
            )}
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 mb-4">
            <p className="text-sm text-dark-200 leading-relaxed whitespace-pre-line">
              {ex.prompt}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {ex.hint && (
              <button
                onClick={() => toggleAnswer(ex.id + '-hint')}
                className="btn-secondary text-sm"
              >
                {revealedAnswers.has(ex.id + '-hint') ? '▾ Ẩn gợi ý' : '💡 Gợi ý'}
              </button>
            )}
            {ex.answer && (
              <button
                onClick={() => toggleAnswer(ex.id)}
                className="btn-secondary text-sm"
              >
                {revealedAnswers.has(ex.id) ? '▾ Ẩn đáp án' : '📌 Đáp án'}
              </button>
            )}
          </div>
          {revealedAnswers.has(ex.id + '-hint') && ex.hint && (
            <div className="mt-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 animate-fade-in">
              <p className="text-sm text-dark-300">{ex.hint}</p>
            </div>
          )}
          {revealedAnswers.has(ex.id) && ex.answer && (
            <div className="mt-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 animate-fade-in">
              <p className="text-sm text-dark-200 whitespace-pre-line">{ex.answer}</p>
              {ex.explanation && (
                <p className="text-xs text-dark-400 mt-2 border-t border-white/5 pt-2">
                  {ex.explanation}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
