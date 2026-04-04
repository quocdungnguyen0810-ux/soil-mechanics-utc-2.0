'use client';

import { useState } from 'react';
import { Chapter, Quiz } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { ContentRenderer } from '@/components/content/ContentRenderer';

interface Props {
  chapter: Chapter;
}

export function QuizSection({ chapter }: Props) {
  const { setQuizScore, progress } = useAppStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizzes = chapter.quizzes;
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-4xl mb-3">❓</p>
        <p className="text-dark-400">Chưa có câu hỏi trắc nghiệm cho chương này</p>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIdx];
  const previousScore = progress.quizScores[chapter.id];

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    if (selectedAnswer === currentQuiz.correctAnswer) {
      setScore((s) => s + 1);
    }
    setAnsweredCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentIdx < quizzes.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = selectedAnswer === currentQuiz.correctAnswer ? score : score;
      setQuizScore(chapter.id, Math.round((finalScore / quizzes.length) * 100));
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredCount(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percent = Math.round((score / quizzes.length) * 100);
    return (
      <div className="glass-card text-center py-10">
        <p className="text-6xl mb-4">{percent >= 70 ? '🎉' : percent >= 50 ? '👍' : '📚'}</p>
        <h3 className="font-display text-2xl font-bold mb-2">Kết quả trắc nghiệm</h3>
        <p className="text-4xl font-bold gradient-text mb-2">{score}/{quizzes.length}</p>
        <p className="text-dark-300 mb-6">
          {percent >= 70 ? 'Xuất sắc! Bạn đã nắm vững kiến thức.' :
           percent >= 50 ? 'Khá tốt. Cần ôn tập thêm một số phần.' :
           'Cần ôn tập lại chương này.'}
        </p>
        <button onClick={handleRestart} className="btn-primary">
          Làm lại
        </button>
      </div>
    );
  }

  const difficultyColors: Record<string, string> = {
    'nhận biết': 'badge-green',
    'thông hiểu': 'badge-amber',
    'vận dụng': 'badge-rose',
  };

  return (
    <div>
      {previousScore !== undefined && (
        <div className="mb-4 p-3 rounded-lg bg-primary-600/10 border border-primary-600/20">
          <p className="text-sm text-primary-300">Điểm trước đó: <span className="font-bold">{previousScore}%</span></p>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-400">Câu {currentIdx + 1}/{quizzes.length}</p>
        <span className={difficultyColors[currentQuiz.difficulty] || 'badge-blue'}>
          {currentQuiz.difficulty}
        </span>
      </div>
      <div className="progress-bar mb-6">
        <div className="progress-bar-fill" style={{ width: `${((currentIdx + 1) / quizzes.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="glass-card mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-purple text-xs">{currentQuiz.type === 'multiple-choice' ? 'Trắc nghiệm' : currentQuiz.type === 'true-false' ? 'Đúng/Sai' : 'Tự luận'}</span>
        </div>
        <div className="mb-6">
          <ContentRenderer content={currentQuiz.question} />
        </div>

        {/* Options */}
        {currentQuiz.type === 'multiple-choice' && currentQuiz.options && (
          <div className="space-y-2 mb-4">
            {currentQuiz.options.map((opt, i) => {
              let className = 'quiz-option';
              if (selectedAnswer === opt) className += ' selected';
              if (showResult) {
                if (opt === currentQuiz.correctAnswer) className = 'quiz-option correct';
                else if (selectedAnswer === opt) className = 'quiz-option incorrect';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={className}
                  disabled={showResult}
                >
                  <span className="font-medium text-dark-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  <span style={{ flex: 1, textAlign: 'left' }}><ContentRenderer content={opt} /></span>
                </button>
              );
            })}
          </div>
        )}

        {currentQuiz.type === 'true-false' && (
          <div className="flex gap-3 mb-4">
            {['Đúng', 'Sai'].map((opt) => {
              let className = 'quiz-option flex-1 text-center';
              if (selectedAnswer === opt) className += ' selected';
              if (showResult) {
                if (opt === currentQuiz.correctAnswer) className = 'quiz-option flex-1 text-center correct';
                else if (selectedAnswer === opt) className = 'quiz-option flex-1 text-center incorrect';
              }
              return (
                <button key={opt} onClick={() => handleSelect(opt)} className={className} disabled={showResult}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {currentQuiz.type === 'short-answer' && (
          <div className="mb-4">
            <input
              type="text"
              className="input-field"
              placeholder="Nhập câu trả lời..."
              value={selectedAnswer || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={showResult}
            />
            {showResult && (
              <p className="text-sm text-emerald-400 mt-2">
                Đáp án: {currentQuiz.correctAnswer}
              </p>
            )}
          </div>
        )}

        {/* Explanation */}
        {showResult && currentQuiz.explanation && (
          <div className="p-3 rounded-lg bg-primary-600/10 border border-primary-600/20 mb-4 animate-fade-in">
            <p className="text-xs text-primary-400 font-semibold mb-1">Giải thích:</p>
            <ContentRenderer content={currentQuiz.explanation} />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (
            <button onClick={handleSubmit} className="btn-primary" disabled={!selectedAnswer}>
              Kiểm tra
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              {currentIdx < quizzes.length - 1 ? 'Câu tiếp' : 'Xem kết quả'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
