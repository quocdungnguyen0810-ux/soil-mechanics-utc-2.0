'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuestionBankStore } from '@/store/useQuestionBankStore';
import { allChapters } from '@/lib/data/chapters';
import { canManageQuestionBank, canApproveContent, ROLE_CONFIG } from '@/types/auth';
import { DifficultyLevel, QuestionType } from '@/types';
import { BankQuestion, QuestionStatus } from '@/lib/services/questionBankService';

type ViewMode = 'list' | 'create' | 'review';

export function QuestionBankModule() {
  const { user } = useAuthStore();
  const {
    questions, isLoading, error,
    fetchQuestions, createQuestion, editQuestion, removeQuestion,
    approve, reject, setFilter, resetFilter, filter, clearError,
  } = useQuestionBankStore();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingQuestion, setEditingQuestion] = useState<BankQuestion | null>(null);

  // Form state
  const [formChapter, setFormChapter] = useState('ch1');
  const [formType, setFormType] = useState<QuestionType>('multiple-choice');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('thông hiểu');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState(['', '', '', '']);
  const [formCorrectAnswer, setFormCorrectAnswer] = useState('');
  const [formExplanation, setFormExplanation] = useState('');
  const [formTags, setFormTags] = useState('');
  const [reviewNote, setReviewNote] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (!user || !canManageQuestionBank(user.role)) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🔒</p>
        <h2 className="text-xl font-display font-semibold mb-2">Không có quyền truy cập</h2>
        <p className="text-dark-400">Chỉ Giáo viên, Người kiểm duyệt và Admin mới có thể quản lý ngân hàng câu hỏi.</p>
      </div>
    );
  }

  const canReview = canApproveContent(user.role);
  const pendingCount = questions.filter(q => q.status === 'pending').length;
  const approvedCount = questions.filter(q => q.status === 'approved').length;

  const resetForm = () => {
    setFormChapter('ch1'); setFormType('multiple-choice'); setFormDifficulty('thông hiểu');
    setFormQuestion(''); setFormOptions(['', '', '', '']); setFormCorrectAnswer('');
    setFormExplanation(''); setFormTags(''); setEditingQuestion(null); clearError();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const options = formType === 'multiple-choice' ? formOptions.filter(o => o.trim()) : undefined;
    if (formType === 'multiple-choice' && (!options || options.length < 2)) {
      return alert('Cần ít nhất 2 đáp án cho câu hỏi trắc nghiệm.');
    }

    try {
      if (editingQuestion) {
        await editQuestion(editingQuestion.id, {
          chapterId: formChapter,
          type: formType,
          difficulty: formDifficulty,
          question: formQuestion,
          options,
          correctAnswer: formCorrectAnswer,
          explanation: formExplanation,
          tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
        });
      } else {
        await createQuestion({
          chapterId: formChapter,
          type: formType,
          difficulty: formDifficulty,
          question: formQuestion,
          options,
          correctAnswer: formCorrectAnswer,
          explanation: formExplanation,
          tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
        }, user.id, user.name);
      }
      resetForm();
      setViewMode('list');
    } catch { }
  };

  const startEdit = (q: BankQuestion) => {
    setEditingQuestion(q);
    setFormChapter(q.chapterId); setFormType(q.type); setFormDifficulty(q.difficulty);
    setFormQuestion(q.question); setFormOptions(q.options || ['', '', '', '']);
    setFormCorrectAnswer(q.correctAnswer); setFormExplanation(q.explanation || '');
    setFormTags(q.tags.join(', ')); setViewMode('create');
  };

  const handleApprove = async (qId: string) => {
    if (!user) return;
    await approve(qId, user.id, reviewNote || undefined);
    setReviewNote('');
  };

  const handleReject = async (qId: string) => {
    if (!user) return;
    const note = reviewNote || prompt('Lý do từ chối:') || 'Không đạt yêu cầu.';
    await reject(qId, user.id, note);
    setReviewNote('');
  };

  const statusConfig: Record<QuestionStatus, { label: string; cls: string; icon: string }> = {
    draft: { label: 'Nháp', cls: 'badge-blue', icon: '📝' },
    pending: { label: 'Chờ duyệt', cls: 'badge-amber', icon: '⏳' },
    approved: { label: 'Đã duyệt', cls: 'badge-green', icon: '✅' },
    rejected: { label: 'Từ chối', cls: 'badge-rose', icon: '❌' },
  };

  const difficultyColors: Record<DifficultyLevel, string> = {
    'nhận biết': 'text-green-400',
    'thông hiểu': 'text-blue-400',
    'vận dụng': 'text-purple-400',
    'vận dụng cao': 'text-red-400',
  };

  // ===== CREATE/EDIT FORM =====
  if (viewMode === 'create') {
    return (
      <div>
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => { resetForm(); setViewMode('list'); }} className="text-dark-400 hover:text-white transition-colors">
            ← Quay lại
          </button>
          <h1 className="font-display text-2xl font-bold">
            {editingQuestion ? '✏️ Sửa câu hỏi' : '➕ Thêm câu hỏi mới'}
          </h1>
        </div>

        <form onSubmit={handleCreate} className="glass-card p-6 space-y-5 max-w-3xl">
          {/* Chapter & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-dark-300 mb-1">Chương *</label>
              <select value={formChapter} onChange={e => setFormChapter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                {allChapters.map(ch => (
                  <option key={ch.id} value={ch.id}>Ch.{ch.chapterNumber}: {ch.shortTitle}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-dark-300 mb-1">Loại *</label>
              <select value={formType} onChange={e => setFormType(e.target.value as QuestionType)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                <option value="multiple-choice">Trắc nghiệm nhiều lựa chọn</option>
                <option value="true-false">Đúng/Sai</option>
                <option value="short-answer">Trả lời ngắn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-dark-300 mb-1">Độ khó *</label>
              <select value={formDifficulty} onChange={e => setFormDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                <option value="nhận biết">Nhận biết</option>
                <option value="thông hiểu">Thông hiểu</option>
                <option value="vận dụng">Vận dụng</option>
                <option value="vận dụng cao">Vận dụng cao</option>
              </select>
            </div>
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm text-dark-300 mb-1">Câu hỏi *</label>
            <textarea value={formQuestion} onChange={e => setFormQuestion(e.target.value)} required rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none"
              placeholder="Nhập nội dung câu hỏi..." />
          </div>

          {/* Options (for multiple-choice) */}
          {formType === 'multiple-choice' && (
            <div>
              <label className="block text-sm text-dark-300 mb-2">Các đáp án (ít nhất 2) *</label>
              <div className="space-y-2">
                {formOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-dark-300 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const newOpts = [...formOptions];
                        newOpts[i] = e.target.value;
                        setFormOptions(newOpts);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
                      placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
                    />
                    <button type="button"
                      onClick={() => setFormCorrectAnswer(opt)}
                      className={`px-2 py-1.5 rounded-lg text-xs transition-all ${
                        formCorrectAnswer === opt && opt
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-white/5 text-dark-400 hover:bg-white/10'
                      }`}
                      title="Chọn đáp án đúng"
                    >
                      ✓
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setFormOptions([...formOptions, ''])}
                className="mt-2 text-xs text-primary-400 hover:text-primary-300">
                + Thêm đáp án
              </button>
            </div>
          )}

          {/* True/False correct answer */}
          {formType === 'true-false' && (
            <div>
              <label className="block text-sm text-dark-300 mb-2">Đáp án đúng *</label>
              <div className="grid grid-cols-2 gap-3">
                {['Đúng', 'Sai'].map(opt => (
                  <button key={opt} type="button" onClick={() => setFormCorrectAnswer(opt)}
                    className={`py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                      formCorrectAnswer === opt
                        ? 'bg-primary-600/20 border-2 border-primary-500/50 text-white'
                        : 'bg-white/5 border border-white/10 text-dark-300 hover:bg-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Short answer */}
          {formType === 'short-answer' && (
            <div>
              <label className="block text-sm text-dark-300 mb-1">Đáp án đúng *</label>
              <input type="text" value={formCorrectAnswer} onChange={e => setFormCorrectAnswer(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" />
            </div>
          )}

          {/* Explanation */}
          <div>
            <label className="block text-sm text-dark-300 mb-1">Giải thích (tùy chọn)</label>
            <textarea value={formExplanation} onChange={e => setFormExplanation(e.target.value)} rows={2}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none"
              placeholder="Giải thích tại sao đáp án đúng..." />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm text-dark-300 mb-1">Tags (phân cách bằng dấu phẩy)</label>
            <input type="text" value={formTags} onChange={e => setFormTags(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
              placeholder="vd: Terzaghi, sức chịu tải, móng nông" />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-300">⚠️ {error}</p>
            </div>
          )}

          <div className="p-3 rounded-lg bg-primary-500/5 border border-primary-500/15">
            <p className="text-xs text-primary-300">💡 Câu hỏi sẽ ở trạng thái "Chờ duyệt" cho đến khi Người kiểm duyệt hoặc Admin phê duyệt.</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => { resetForm(); setViewMode('list'); }}
              className="flex-1 py-2.5 rounded-xl bg-white/5 text-dark-300 text-sm hover:bg-white/10 transition-all">
              Hủy
            </button>
            <button type="submit" disabled={isLoading || !formQuestion || !formCorrectAnswer}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50">
              {isLoading ? '⏳...' : editingQuestion ? '💾 Cập nhật' : '➕ Thêm câu hỏi'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ===== LIST VIEW =====
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="badge-purple">📚 Ngân hàng câu hỏi</span>
          {pendingCount > 0 && canReview && (
            <span className="badge-amber">⏳ {pendingCount} chờ duyệt</span>
          )}
          <span className="badge-green">✅ {approvedCount} đã duyệt</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Ngân hàng Câu hỏi</h1>
        <p className="text-dark-400 text-sm">
          Upload, quản lý và kiểm duyệt câu hỏi trắc nghiệm. Câu hỏi đã duyệt sẽ xuất hiện trong Thi thử & Ôn tập.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button onClick={() => { resetForm(); setViewMode('create'); }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all">
          ➕ Thêm câu hỏi
        </button>

        <select value={filter.chapterId || ''} onChange={e => setFilter({ chapterId: e.target.value || undefined })}
          className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
          <option value="">Tất cả chương</option>
          {allChapters.map(ch => (
            <option key={ch.id} value={ch.id}>Ch.{ch.chapterNumber}: {ch.shortTitle}</option>
          ))}
        </select>

        <select value={filter.status || ''} onChange={e => setFilter({ status: (e.target.value || undefined) as any })}
          className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Từ chối</option>
        </select>

        <select value={filter.difficulty || ''} onChange={e => setFilter({ difficulty: (e.target.value || undefined) as any })}
          className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
          <option value="">Tất cả độ khó</option>
          <option value="nhận biết">Nhận biết</option>
          <option value="thông hiểu">Thông hiểu</option>
          <option value="vận dụng">Vận dụng</option>
          <option value="vận dụng cao">Vận dụng cao</option>
        </select>

        {Object.keys(filter).some(k => (filter as any)[k]) && (
          <button onClick={resetFilter} className="text-xs text-dark-400 hover:text-white transition-colors">
            ✕ Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Questions List */}
      {isLoading ? (
        <div className="text-center py-12 text-dark-400">⏳ Đang tải...</div>
      ) : questions.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <p className="text-5xl mb-4">📝</p>
          <h3 className="text-xl font-display font-semibold mb-2">Chưa có câu hỏi nào</h3>
          <p className="text-dark-400 mb-4">Bắt đầu bằng cách thêm câu hỏi vào ngân hàng.</p>
          <button onClick={() => { resetForm(); setViewMode('create'); }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm">
            ➕ Thêm câu hỏi đầu tiên
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map(q => {
            const chapter = allChapters.find(ch => ch.id === q.chapterId);
            const sc = statusConfig[q.status];

            return (
              <div key={q.id} className={`glass-card p-5 ${q.status === 'pending' ? 'border-l-4 border-l-amber-500' : q.status === 'rejected' ? 'border-l-4 border-l-red-500' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Meta badges */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="badge-blue text-xs">Ch.{chapter?.chapterNumber || '?'}</span>
                      <span className={`text-xs font-medium ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
                      <span className={sc.cls}>{sc.icon} {sc.label}</span>
                      <span className="text-xs text-dark-500">{q.type === 'multiple-choice' ? 'Trắc nghiệm' : q.type === 'true-false' ? 'Đúng/Sai' : 'Trả lời ngắn'}</span>
                    </div>

                    {/* Question text */}
                    <p className="text-sm text-white mb-2 leading-relaxed">{q.question}</p>

                    {/* Options preview */}
                    {q.options && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {q.options.map((opt, i) => (
                          <span key={i} className={`text-xs px-2 py-1 rounded-lg ${opt === q.correctAnswer ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-dark-400'}`}>
                            {String.fromCharCode(65 + i)}. {opt}
                          </span>
                        ))}
                      </div>
                    )}

                    {q.type === 'true-false' && (
                      <p className="text-xs text-emerald-400 mb-2">✓ Đáp án: {q.correctAnswer}</p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-dark-500">
                      <span>Tạo bởi: {q.createdByName}</span>
                      <span>{new Date(q.createdAt).toLocaleDateString('vi-VN')}</span>
                      {q.tags.length > 0 && (
                        <span className="flex gap-1">
                          {q.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 text-dark-400">{t}</span>
                          ))}
                        </span>
                      )}
                    </div>

                    {q.reviewNote && (
                      <div className="mt-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/15">
                        <p className="text-xs text-amber-300">💬 Ghi chú kiểm duyệt: {q.reviewNote}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 shrink-0">
                    {q.status === 'pending' && canReview && (
                      <>
                        <button onClick={() => handleApprove(q.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-500/20 transition-all">
                          ✅ Duyệt
                        </button>
                        <button onClick={() => handleReject(q.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs hover:bg-red-500/20 transition-all">
                          ❌ Từ chối
                        </button>
                      </>
                    )}
                    {(q.createdBy === user.id || canReview) && (
                      <>
                        <button onClick={() => startEdit(q)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-dark-400 text-xs hover:bg-white/10 transition-all">
                          ✏️ Sửa
                        </button>
                        <button onClick={() => { if (confirm('Xóa câu hỏi này?')) removeQuestion(q.id); }}
                          className="px-3 py-1.5 rounded-lg bg-red-500/5 text-red-400 text-xs hover:bg-red-500/15 transition-all">
                          🗑️ Xóa
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
