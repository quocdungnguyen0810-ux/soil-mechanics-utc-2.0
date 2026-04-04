import React, { useState } from 'react';
import { Exercise } from '@/types';
import { ContentRenderer } from '@/components/content/ContentRenderer';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [revealedAnswers, setRevealedAnswers] = useState(false);
  const [revealedHints, setRevealedHints] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(false);

  const toggleAnswer = () => setRevealedAnswers(!revealedAnswers);
  const toggleHint = () => setRevealedHints(!revealedHints);
  const toggleSteps = () => setRevealedSteps(!revealedSteps);

  const getDifficultyBadge = (difficulty?: string) => {
    switch (difficulty) {
      case 'nhận biết':
        return <span className="badge-green mr-2">{difficulty}</span>;
      case 'thông hiểu':
        return <span className="badge-blue mr-2">{difficulty}</span>;
      case 'vận dụng':
        return <span className="badge-purple mr-2">{difficulty}</span>;
      case 'vận dụng cao':
        return <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border border-red-500/30 mr-2">{difficulty}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-8 rounded-lg bg-primary-600/20 text-primary-400 flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        <h3 className="font-semibold text-lg">{exercise.title}</h3>
        {getDifficultyBadge(exercise.difficulty)}
      </div>

      <div className="p-5 rounded-lg bg-white/[0.02] border border-white/5 mb-4 shadow-inner">
        <ContentRenderer content={exercise.prompt} />
      </div>

      <div className="flex gap-3 flex-wrap">
        {exercise.hint && (
          <button onClick={toggleHint} className="btn-secondary text-sm">
            {revealedHints ? '🔽 Ẩn gợi ý' : '💡 Gợi ý'}
          </button>
        )}
        {exercise.answer && (
          <button onClick={toggleAnswer} className="btn-primary text-sm flex items-center gap-2">
            {revealedAnswers ? '🔽 Ẩn đáp án' : '📌 Xem đáp án'}
          </button>
        )}
        {exercise.solutionSteps && exercise.solutionSteps.length > 0 && (
          <button onClick={toggleSteps} className="btn-outline text-sm">
            {revealedSteps ? '🔽 Ẩn lời giải' : '📝 Xem lời giải chi tiết'}
          </button>
        )}
      </div>

      {/* Conditional rendering for Hint */}
      {revealedHints && exercise.hint && (
        <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 animate-fade-in">
          <p className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">💡 Gợi ý tư duy:</p>
          <ContentRenderer content={exercise.hint} />
        </div>
      )}

      {/* Conditional rendering for Answer */}
      {revealedAnswers && exercise.answer && (
        <div className="mt-4 p-5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 animate-fade-in">
          <p className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">📌 Đáp án cuối cùng:</p>
          <div className="bg-emerald-950/50 p-3 rounded text-base font-medium">
            <ContentRenderer content={exercise.answer!} />
          </div>
          {exercise.explanation && (
            <div className="mt-3 pt-3 border-t border-emerald-500/20">
              <p className="text-xs text-emerald-300 font-medium mb-1">Giải thích vắn tắt:</p>
              <ContentRenderer content={exercise.explanation} />
            </div>
          )}
        </div>
      )}

      {/* Conditional rendering for Solution Steps */}
      {revealedSteps && exercise.solutionSteps && exercise.solutionSteps.length > 0 && (
        <div className="mt-4 p-5 rounded-lg bg-blue-500/10 border border-blue-500/30 animate-fade-in shadow-xl">
          <p className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">📝 Bước giải chi tiết:</p>
          <div className="space-y-3">
            {exercise.solutionSteps.map((step, stepIndex) => (
              <div key={stepIndex} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs font-bold border border-blue-500/30">
                  {stepIndex + 1}
                </div>
                <div className="text-sm text-dark-100 flex-1 pt-0.5 leading-relaxed bg-blue-950/20 px-3 py-2 rounded">
                  <ContentRenderer content={step} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags & Sources */}
      <div className="mt-5 pt-3 border-t border-dark-700/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {exercise.tags?.map((tag, tagIndex) => (
            <span key={tagIndex} className="px-2 py-1 rounded bg-dark-700 text-dark-300 border border-dark-600 text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-dark-400 italic">
          Nguồn: {exercise.sourceRefs.map((r) => r.fileName).join(', ')}
        </div>
      </div>
    </div>
  );
}
