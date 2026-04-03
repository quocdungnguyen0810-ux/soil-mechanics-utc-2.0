'use client';

import { useState, useEffect, useCallback } from 'react';
import { allChapters } from '@/lib/data/chapters';
import { Quiz, DifficultyLevel } from '@/types';
import { fetchQuestionBank, bankQuestionsToQuiz } from '@/lib/services/questionBankService';

type FlashcardPhase = 'setup' | 'review' | 'summary';
type FlashcardSource = 'chapters' | 'bank' | 'both';

interface FlashcardConfig {
  source: FlashcardSource;
  chapters: string[];
  difficulty: string;
  count: number;
  shuffle: boolean;
}

interface FlashcardResult {
  questionId: string;
  correct: boolean;
}

export function FlashcardModule() {
  const [phase, setPhase] = useState<FlashcardPhase>('setup');
  const [config, setConfig] = useState<FlashcardConfig>({
    source: 'both',
    chapters: allChapters.map(c => c.id),
    difficulty: 'all',
    count: 15,
    shuffle: true,
  });
  const [cards, setCards] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<FlashcardResult[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const loadCards = useCallback(async () => {
    let pool: Quiz[] = [];

    // Get from chapter quizzes
    if (config.source === 'chapters' || config.source === 'both') {
      const chapterQuizzes = allChapters
        .filter(ch => config.chapters.includes(ch.id))
        .flatMap(ch => ch.quizzes);
      pool.push(...chapterQuizzes);
    }

    // Get from question bank (approved only)
    if (config.source === 'bank' || config.source === 'both') {
      const bankQuestions = await fetchQuestionBank({ status: 'approved' });
      const filtered = bankQuestions.filter(q => config.chapters.includes(q.chapterId));
      pool.push(...bankQuestionsToQuiz(filtered));
    }

    // Filter by difficulty
    if (config.difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === config.difficulty);
    }

    // Shuffle
    if (config.shuffle) {
      pool = pool.sort(() => Math.random() - 0.5);
    }

    // Limit
    pool = pool.slice(0, config.count);

    setCards(pool);
    setCurrentIndex(0);
    setResults([]);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setPhase('review');
  }, [config]);

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsFlipped(true);

    const correct = answer === currentCard.correctAnswer;
    setResults(prev => [...prev, { questionId: currentCard.id, correct }]);
  };

  const handleNext = () => {
    if (isLastCard) {
      setPhase('summary');
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleRestart = () => {
    setPhase('setup');
    setCards([]);
    setResults([]);
    setCurrentIndex(0);
  };

  const handleRetryWrong = async () => {
    const wrongIds = new Set(results.filter(r => !r.correct).map(r => r.questionId));
    const wrongCards = cards.filter(c => wrongIds.has(c.id));
    if (wrongCards.length === 0) return;

    setCards(wrongCards.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setResults([]);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setPhase('review');
  };

  const toggleChapter = (id: string) => {
    setConfig(prev => ({
      ...prev,
      chapters: prev.chapters.includes(id)
        ? prev.chapters.filter(c => c !== id)
        : [...prev.chapters, id],
    }));
  };

  const correctCount = results.filter(r => r.correct).length;
  const wrongCount = results.filter(r => !r.correct).length;

  // ===== SETUP =====
  if (phase === 'setup') {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="badge-purple">🃏 Ôn tập Flashcard</span>
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Ôn tập bằng Flashcard</h1>
          <p className="text-dark-400 text-sm">
            Lật thẻ để ôn lại kiến thức. Kết hợp câu hỏi từ giáo trình và ngân hàng câu hỏi do giáo viên tạo.
          </p>
        </div>

        <div className="glass-card p-6 space-y-5 max-w-2xl">
          {/* Source */}
          <div>
            <label className="block text-sm text-dark-300 mb-2">Nguồn câu hỏi</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'chapters' as FlashcardSource, label: '📖 Giáo trình', desc: 'Từ 7 chương' },
                { key: 'bank' as FlashcardSource, label: '📚 Ngân hàng', desc: 'GV/Admin upload' },
                { key: 'both' as FlashcardSource, label: '🔀 Kết hợp', desc: 'Cả hai nguồn' },
              ].map(s => (
                <button key={s.key} onClick={() => setConfig(prev => ({ ...prev, source: s.key }))}
                  className={`p-3 rounded-xl text-center transition-all ${
                    config.source === s.key
                      ? 'bg-primary-600/20 border-2 border-primary-500/40 text-white'
                      : 'bg-white/5 border border-white/10 text-dark-300 hover:bg-white/10'
                  }`}
                >
                  <div className="text-lg mb-1">{s.label.split(' ')[0]}</div>
                  <div className="text-xs">{s.label.split(' ').slice(1).join(' ')}</div>
                  <div className="text-xs text-dark-500 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div>
            <label className="block text-sm text-dark-300 mb-2">Chương</label>
            <div className="flex flex-wrap gap-2">
              {allChapters.map(ch => (
                <button key={ch.id} onClick={() => toggleChapter(ch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    config.chapters.includes(ch.id)
                      ? 'bg-primary-600/20 border border-primary-500/30 text-primary-300'
                      : 'bg-white/5 border border-white/10 text-dark-400 hover:bg-white/10'
                  }`}
                >
                  Ch.{ch.chapterNumber}
                </button>
              ))}
              <button onClick={() => setConfig(prev => ({ ...prev, chapters: allChapters.map(c => c.id) }))}
                className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-dark-400 hover:bg-white/10 transition-all">
                Chọn tất cả
              </button>
            </div>
          </div>

          {/* Difficulty & Count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-dark-300 mb-1">Độ khó</label>
              <select value={config.difficulty} onChange={e => setConfig(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                <option value="all">Tất cả</option>
                <option value="nhận biết">Nhận biết</option>
                <option value="thông hiểu">Thông hiểu</option>
                <option value="vận dụng">Vận dụng</option>
                <option value="vận dụng cao">Vận dụng cao</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-dark-300 mb-1">Số thẻ</label>
              <input type="number" value={config.count} min={5} max={50}
                onChange={e => setConfig(prev => ({ ...prev, count: parseInt(e.target.value) || 15 }))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none" />
            </div>
          </div>

          <button onClick={loadCards} disabled={config.chapters.length === 0}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-40 text-sm">
            🃏 Bắt đầu ôn tập ({config.count} thẻ)
          </button>
        </div>
      </div>
    );
  }

  // ===== REVIEW =====
  if (phase === 'review' && currentCard) {
    const chapter = allChapters.find(ch => ch.id === currentCard.chapterId);
    const progress = ((currentIndex + 1) / cards.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-400">Thẻ {currentIndex + 1} / {cards.length}</span>
            <div className="flex gap-3 text-sm">
              <span className="text-emerald-400">✓ {correctCount}</span>
              <span className="text-red-400">✕ {wrongCount}</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Flashcard */}
        <div className="glass-card p-8 min-h-[350px] flex flex-col">
          {/* Header line */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="badge-blue text-xs">Ch.{chapter?.chapterNumber || '?'}</span>
            <span className={`text-xs font-medium ${
              currentCard.difficulty === 'nhận biết' ? 'text-green-400' :
              currentCard.difficulty === 'thông hiểu' ? 'text-blue-400' :
              currentCard.difficulty === 'vận dụng' ? 'text-purple-400' : 'text-red-400'
            }`}>{currentCard.difficulty}</span>
            <span className="text-xs text-dark-500">
              {currentCard.type === 'true-false' ? 'Đúng/Sai' : 'Trắc nghiệm'}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-lg text-white mb-6 leading-relaxed flex-1">{currentCard.question}</h2>

          {/* Answer area */}
          {!isFlipped ? (
            <div className="space-y-2">
              {currentCard.type === 'multiple-choice' && currentCard.options && (
                currentCard.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-dark-200 text-sm hover:bg-white/10 hover:border-primary-500/30 transition-all">
                    <span className="font-semibold mr-2 text-dark-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))
              )}
              {currentCard.type === 'true-false' && (
                <div className="grid grid-cols-2 gap-3">
                  {['Đúng', 'Sai'].map(opt => (
                    <button key={opt} onClick={() => handleAnswer(opt)}
                      className="py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 hover:border-primary-500/30 transition-all">
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Flipped — show result
            <div className="animate-fade-in">
              <div className={`p-4 rounded-xl mb-4 ${
                selectedAnswer === currentCard.correctAnswer
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <p className={`text-lg font-bold mb-1 ${
                  selectedAnswer === currentCard.correctAnswer ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {selectedAnswer === currentCard.correctAnswer ? '✅ Chính xác!' : '❌ Sai rồi!'}
                </p>
                {selectedAnswer !== currentCard.correctAnswer && (
                  <p className="text-sm text-dark-300">
                    Bạn chọn: <span className="text-red-300">{selectedAnswer}</span>
                    <br />Đáp án đúng: <span className="text-emerald-300">{currentCard.correctAnswer}</span>
                  </p>
                )}
              </div>

              {currentCard.explanation && (
                <div className="mb-4">
                  <button onClick={() => setShowExplanation(!showExplanation)}
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    {showExplanation ? '▾ Ẩn giải thích' : '💡 Xem giải thích'}
                  </button>
                  {showExplanation && (
                    <div className="mt-2 p-3 rounded-lg bg-primary-500/5 border border-primary-500/15 animate-fade-in">
                      <p className="text-sm text-dark-200">{currentCard.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              <button onClick={handleNext}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all">
                {isLastCard ? '📊 Xem kết quả' : 'Thẻ tiếp theo →'}
              </button>
            </div>
          )}
        </div>

        {/* Skip button */}
        {!isFlipped && (
          <div className="text-center mt-4">
            <button onClick={handleNext} className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
              Bỏ qua thẻ này →
            </button>
          </div>
        )}
      </div>
    );
  }

  // ===== SUMMARY =====
  if (phase === 'summary') {
    const total = results.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = percentage >= 60;

    return (
      <div className="max-w-2xl mx-auto">
        <div className={`glass-card p-8 text-center mb-6 border-2 ${passed ? 'border-emerald-500/30' : 'border-amber-500/30'}`}>
          <div className="text-6xl mb-4">{passed ? '🎉' : '📖'}</div>
          <h1 className="font-display text-3xl font-bold mb-2">Kết quả ôn tập</h1>
          <div className={`text-5xl font-bold font-mono my-4 ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {correctCount}/{total}
          </div>
          <p className="text-xl text-dark-300 mb-2">
            Tỉ lệ đúng: <span className="font-bold text-white">{percentage}%</span>
          </p>
          <p className={`text-lg font-semibold ${passed ? 'text-emerald-300' : 'text-amber-300'}`}>
            {percentage >= 80 ? '🌟 Xuất sắc!' : passed ? '✅ Khá tốt!' : '⚠️ Cần ôn thêm!'}
          </p>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-card text-center py-4">
            <p className="text-2xl font-bold text-emerald-400">{correctCount}</p>
            <p className="text-xs text-dark-400">Đúng</p>
          </div>
          <div className="glass-card text-center py-4">
            <p className="text-2xl font-bold text-red-400">{wrongCount}</p>
            <p className="text-xs text-dark-400">Sai</p>
          </div>
          <div className="glass-card text-center py-4">
            <p className="text-2xl font-bold text-dark-300">{cards.length - total}</p>
            <p className="text-xs text-dark-400">Bỏ qua</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {wrongCount > 0 && (
            <button onClick={handleRetryWrong}
              className="flex-1 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-sm hover:bg-amber-500/20 transition-all">
              🔄 Ôn lại {wrongCount} câu sai
            </button>
          )}
          <button onClick={handleRestart}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all">
            🃏 Ôn tập mới
          </button>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="text-center py-12 text-dark-400">
      <p>Không có thẻ nào để ôn tập. Hãy thử chọn thêm chương hoặc nguồn câu hỏi.</p>
      <button onClick={handleRestart} className="mt-4 btn-secondary text-sm">← Quay lại</button>
    </div>
  );
}
