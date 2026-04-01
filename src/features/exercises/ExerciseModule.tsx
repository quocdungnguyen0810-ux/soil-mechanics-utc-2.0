'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { allExercises, getExercisesByChapter, chaptersWithExercises, chaptersMissingExercises } from '@/lib/data/exercises';
import { allChapters } from '@/lib/data/chapters';

export function ExerciseModule() {
  const { selectedChapterId } = useAppStore();
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());

  const chapter = allChapters.find(ch => ch.id === selectedChapterId) || allChapters[0];
  const exercises = getExercisesByChapter(chapter.id);
  const hasMissing = chaptersMissingExercises.includes(chapter.id);

  const toggleAnswer = (id: string) => {
    const next = new Set(revealedAnswers);
    next.has(id) ? next.delete(id) : next.add(id);
    setRevealedAnswers(next);
  };

  const toggleHint = (id: string) => {
    const next = new Set(revealedHints);
    next.has(id) ? next.delete(id) : next.add(id);
    setRevealedHints(next);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="badge-blue">Chương {chapter.chapterNumber}</span>
          <span className="badge-purple">{exercises.length} bài tập</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Bài tập: {chapter.title}</h1>
        {hasMissing && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-3">
            <p className="text-sm text-amber-300">⚠️ Thiếu dữ liệu nguồn bài tập cho chương này. Cần bổ sung tài liệu.</p>
          </div>
        )}
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">✏️</p>
          <h3 className="text-xl font-display font-semibold mb-2">Chưa có bài tập</h3>
          <p className="text-dark-400">Thiếu dữ liệu nguồn cho chương {chapter.chapterNumber}.</p>
          <p className="text-xs text-dark-500 mt-1">Missing exercise source data</p>
        </div>
      ) : (
        <div className="space-y-6">
          {exercises.map((ex, idx) => (
            <div key={ex.id} className="glass-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-primary-600/20 text-primary-400 flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <h3 className="font-semibold">{ex.title}</h3>
                {ex.hasDetailedSolution && <span className="badge-green text-xs">Có đáp án</span>}
              </div>

              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 mb-4">
                <p className="text-sm text-dark-200 leading-relaxed whitespace-pre-line">{ex.prompt}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {ex.hint && (
                  <button onClick={() => toggleHint(ex.id)} className="btn-secondary text-sm">
                    {revealedHints.has(ex.id) ? '🔽 Ẩn gợi ý' : '💡 Gợi ý'}
                  </button>
                )}
                {ex.answer && (
                  <button onClick={() => toggleAnswer(ex.id)} className="btn-secondary text-sm">
                    {revealedAnswers.has(ex.id) ? '🔽 Ẩn đáp án' : '📌 Đáp án'}
                  </button>
                )}
              </div>

              {revealedHints.has(ex.id) && ex.hint && (
                <div className="mt-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 animate-fade-in">
                  <p className="text-xs font-medium text-amber-400 mb-1">💡 Gợi ý:</p>
                  <p className="text-sm text-dark-300">{ex.hint}</p>
                </div>
              )}

              {revealedAnswers.has(ex.id) && ex.answer && (
                <div className="mt-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 animate-fade-in">
                  <p className="text-xs font-medium text-emerald-400 mb-1">📌 Đáp án:</p>
                  <p className="text-sm text-dark-200 whitespace-pre-line">{ex.answer}</p>
                  {ex.explanation && (
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <p className="text-xs text-dark-400">{ex.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-3 text-xs text-dark-500">
                📄 {ex.sourceRefs.map(r => r.fileName).join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
