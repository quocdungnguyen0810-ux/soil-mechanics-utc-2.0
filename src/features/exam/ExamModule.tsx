'use client';

import { useState, useEffect, useCallback } from 'react';
import { allChapters } from '@/lib/data/chapters';
import {
  ExamConfig, GeneratedExam, ExamResult,
  defaultExamConfig, examTemplates,
  generateExam, gradeExam,
} from '@/lib/services/examGenerator';
import { ContentRenderer } from '@/components/content/ContentRenderer';

type ExamPhase = 'setup' | 'taking' | 'result';

export function ExamModule() {
  const [phase, setPhase] = useState<ExamPhase>('setup');
  const [config, setConfig] = useState<ExamConfig>({ ...defaultExamConfig });
  const [exam, setExam] = useState<GeneratedExam | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer
  useEffect(() => {
    if (phase !== 'taking' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const handleGenerate = async () => {
    const generated = await generateExam(config);
    setExam(generated);
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(config.duration * 60);
    setPhase('taking');
  };

  const handleSubmit = useCallback(() => {
    if (!exam) return;
    const graded = gradeExam(exam, answers);
    graded.timeSpent = config.duration * 60 - timeLeft;
    setResult(graded);
    setPhase('result');
  }, [exam, answers, config.duration, timeLeft]);

  const handleReset = () => {
    setPhase('setup');
    setExam(null);
    setAnswers({});
    setResult(null);
    setCurrentQ(0);
  };

  const toggleChapter = (id: string) => {
    setConfig(prev => ({
      ...prev,
      chapters: prev.chapters.includes(id)
        ? prev.chapters.filter(c => c !== id)
        : [...prev.chapters, id],
    }));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // ========== SETUP PHASE ==========
  if (phase === 'setup') {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="badge-blue">📝 Thi thử</span>
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Tạo đề thi tự động</h1>
          <p className="text-dark-400 text-sm">
            Chọn cấu hình đề thi hoặc sử dụng mẫu có sẵn. Hệ thống sẽ tự động tạo đề từ ngân hàng câu hỏi.
          </p>
        </div>

        {/* Templates */}
        <div className="mb-6">
          <p className="text-xs text-dark-400 uppercase tracking-wider mb-3">Mẫu đề thi nhanh</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {examTemplates.map((t, i) => (
              <button
                key={i}
                onClick={() => setConfig({ ...t.config })}
                className="glass-card text-left hover:border-primary-500/30 transition-all group"
              >
                <div className="text-lg mb-1">{t.name}</div>
                <div className="text-xs text-dark-400">
                  {t.config.totalQuestions} câu • {t.config.duration} phút • {t.config.chapters.length} chương
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Config */}
        <div className="glass-card p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg">Cấu hình đề thi</h3>

          {/* Title */}
          <div>
            <label className="block text-sm text-dark-300 mb-1.5">Tên đề</label>
            <input
              type="text"
              value={config.title}
              onChange={e => setConfig(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
            />
          </div>

          {/* Questions & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Số câu hỏi</label>
              <input
                type="number"
                value={config.totalQuestions}
                min={5}
                max={50}
                onChange={e => setConfig(prev => ({ ...prev, totalQuestions: parseInt(e.target.value) || 10 }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Thời gian (phút)</label>
              <input
                type="number"
                value={config.duration}
                min={5}
                max={120}
                onChange={e => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
              />
            </div>
          </div>

          {/* Chapter Selection */}
          <div>
            <label className="block text-sm text-dark-300 mb-2">Phạm vi chương</label>
            <div className="flex flex-wrap gap-2">
              {allChapters.map(ch => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => toggleChapter(ch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    config.chapters.includes(ch.id)
                      ? 'bg-primary-600/20 border border-primary-500/30 text-primary-300'
                      : 'bg-white/5 border border-white/10 text-dark-400 hover:bg-white/10'
                  }`}
                >
                  Ch.{ch.chapterNumber}: {ch.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Mix */}
          <div>
            <label className="block text-sm text-dark-300 mb-2">Tỷ lệ độ khó (%)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'nhận biết' as const, label: 'Nhận biết', color: 'text-green-400' },
                { key: 'thông hiểu' as const, label: 'Thông hiểu', color: 'text-blue-400' },
                { key: 'vận dụng' as const, label: 'Vận dụng', color: 'text-purple-400' },
                { key: 'vận dụng cao' as const, label: 'VD Cao', color: 'text-red-400' },
              ].map(d => (
                <div key={d.key}>
                  <p className={`text-xs mb-1 ${d.color}`}>{d.label}</p>
                  <input
                    type="number"
                    value={config.difficultyMix[d.key]}
                    min={0}
                    max={100}
                    onChange={e => setConfig(prev => ({
                      ...prev,
                      difficultyMix: { ...prev.difficultyMix, [d.key]: parseInt(e.target.value) || 0 },
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-primary-500/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Include Question Bank */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <button
              type="button"
              onClick={() => setConfig(prev => ({ ...prev, includeBank: !prev.includeBank }))}
              className={`w-10 h-6 rounded-full transition-all relative ${
                config.includeBank ? 'bg-primary-600' : 'bg-white/10'
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                config.includeBank ? 'left-4' : 'left-0.5'
              }`} />
            </button>
            <div>
              <p className="text-sm text-white">📚 Kết hợp Ngân hàng câu hỏi</p>
              <p className="text-xs text-dark-400">Lấy thêm câu hỏi do giáo viên upload (đã duyệt)</p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={config.chapters.length === 0}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 disabled:opacity-40 text-sm"
          >
            🚀 Tạo đề thi ({config.totalQuestions} câu, {config.duration} phút)
          </button>
        </div>
      </div>
    );
  }

  // ========== TAKING PHASE ==========
  if (phase === 'taking' && exam) {
    const q = exam.questions[currentQ];
    const answered = Object.keys(answers).length;
    const timeWarning = timeLeft < 120;

    return (
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 glass-card p-4">
          <div>
            <h2 className="font-display font-bold text-lg">{exam.config.title}</h2>
            <p className="text-xs text-dark-400">{answered}/{exam.questions.length} đã trả lời</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-2xl font-mono font-bold ${timeWarning ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-600/30 transition-all"
            >
              Nộp bài
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {exam.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                i === currentQ
                  ? 'bg-primary-600 text-white shadow-lg'
                  : answers[exam.questions[i].id]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-dark-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Current Question */}
        {q && (
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-primary-600/20 text-primary-400 flex items-center justify-center text-sm font-bold">
                {currentQ + 1}
              </span>
              <span className="badge-blue text-xs">{q.difficulty}</span>
              {q.type === 'true-false' && <span className="badge-green text-xs">Đúng/Sai</span>}
            </div>

            <div className="mb-6 text-base text-white leading-relaxed">
              <ContentRenderer content={q.question} />
            </div>

            {/* Options */}
            {q.type === 'multiple-choice' && q.options && (
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm ${
                      answers[q.id] === opt
                        ? 'bg-primary-600/20 border-2 border-primary-500/50 text-white'
                        : 'bg-white/5 border border-white/10 text-dark-200 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                    <ContentRenderer content={opt} />
                  </button>
                ))}
              </div>
            )}

            {q.type === 'true-false' && (
              <div className="grid grid-cols-2 gap-3">
                {['Đúng', 'Sai'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                    className={`py-4 rounded-xl text-center transition-all text-sm font-semibold ${
                      answers[q.id] === opt
                        ? 'bg-primary-600/20 border-2 border-primary-500/50 text-white'
                        : 'bg-white/5 border border-white/10 text-dark-200 hover:bg-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {(q.type === 'short-answer' || q.type === 'fill-blank') && (
              <input
                type="text"
                value={answers[q.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                placeholder="Nhập câu trả lời..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="px-4 py-2 rounded-lg bg-white/5 text-dark-300 text-sm hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                ← Câu trước
              </button>
              <button
                onClick={() => setCurrentQ(Math.min(exam.questions.length - 1, currentQ + 1))}
                disabled={currentQ === exam.questions.length - 1}
                className="px-4 py-2 rounded-lg bg-primary-600/20 text-primary-300 text-sm hover:bg-primary-600/30 transition-all disabled:opacity-30"
              >
                Câu sau →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========== RESULT PHASE ==========
  if (phase === 'result' && exam && result) {
    const passed = result.percentage >= 50;

    return (
      <div>
        {/* Score Card */}
        <div className={`glass-card p-8 text-center mb-6 border-2 ${passed ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
          <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h1 className="font-display text-3xl font-bold mb-2">{exam.config.title}</h1>
          <div className={`text-5xl font-bold font-mono my-4 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {result.score}/{result.total}
          </div>
          <p className="text-xl text-dark-300 mb-2">
            Tỉ lệ đúng: <span className="font-bold text-white">{result.percentage}%</span>
          </p>
          <p className="text-sm text-dark-400">
            Thời gian: {formatTime(result.timeSpent)} / {config.duration} phút
          </p>
          <p className={`mt-3 text-lg font-semibold ${passed ? 'text-emerald-300' : 'text-amber-300'}`}>
            {passed ? '✅ Đạt yêu cầu' : '⚠️ Cần ôn tập thêm'}
          </p>
        </div>

        {/* Review */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg">Xem lại đáp án</h3>
          {exam.questions.map((q, i) => {
            const userAns = result.answers[q.id];
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div key={q.id} className={`glass-card p-4 border-l-4 ${isCorrect ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold">{i + 1}.</span>
                  <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>{isCorrect ? '✅' : '❌'}</span>
                  <span className="badge-blue text-xs">{q.difficulty}</span>
                </div>
                <div className="mb-2 text-sm text-white">
                  <ContentRenderer content={q.question} />
                </div>
                <div className="text-xs space-y-1">
                  {!isCorrect && userAns && (
                    <p className="text-red-300">Bạn chọn: {userAns}</p>
                  )}
                  <p className="text-emerald-300">Đáp án đúng: {q.correctAnswer}</p>
                  {q.explanation && (
                    <p className="text-dark-400 mt-1 italic">💡 {q.explanation}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all"
          >
            🔄 Tạo đề mới
          </button>
        </div>
      </div>
    );
  }

  return null;
}
