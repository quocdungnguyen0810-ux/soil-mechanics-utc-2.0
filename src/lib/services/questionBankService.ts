// ============================================================
// Question Bank Service — Ngân hàng câu hỏi tùy chỉnh
// Teachers/Admin upload câu hỏi, duyệt bởi Moderator/Admin
// ============================================================

import { Quiz, DifficultyLevel, QuestionType } from '@/types';

export type QuestionStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface BankQuestion {
  id: string;
  // Content
  chapterId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  tags: string[];
  // Metadata
  createdBy: string;       // user ID
  createdByName: string;   // display name
  createdAt: string;
  updatedAt: string;
  status: QuestionStatus;
  reviewedBy?: string;     // moderator/admin who approved/rejected
  reviewNote?: string;     // feedback from reviewer
}

export interface CreateQuestionData {
  chapterId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  tags?: string[];
}

export interface QuestionBankFilter {
  chapterId?: string;
  difficulty?: DifficultyLevel;
  type?: QuestionType;
  status?: QuestionStatus;
  createdBy?: string;
  searchQuery?: string;
}

// ---- Storage ----

const BANK_KEY = 'co-hoc-dat-question-bank';

function getStoredQuestions(): BankQuestion[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BANK_KEY);
    return raw ? JSON.parse(raw) : getDefaultQuestions();
  } catch {
    return getDefaultQuestions();
  }
}

function saveQuestions(questions: BankQuestion[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BANK_KEY, JSON.stringify(questions));
  }
}

function getDefaultQuestions(): BankQuestion[] {
  // Seed with some sample custom questions
  const seed: BankQuestion[] = [
    {
      id: 'bq-1',
      chapterId: 'ch1',
      type: 'multiple-choice',
      difficulty: 'thông hiểu',
      question: 'Đất sét so với đất cát có tính thấm nước như thế nào?',
      options: ['Thấm tốt hơn', 'Thấm kém hơn', 'Thấm bằng nhau', 'Không thấm'],
      correctAnswer: 'Thấm kém hơn',
      explanation: 'Sét có hạt nhỏ, lỗ rỗng nhỏ → hệ số thấm k rất nhỏ (10⁻⁸ ~ 10⁻¹⁰ m/s), trong khi cát k = 10⁻³ ~ 10⁻⁵ m/s.',
      tags: ['tính thấm', 'đất sét', 'so sánh'],
      createdBy: 'user-teacher-01',
      createdByName: 'GV. Nguyễn Văn A',
      createdAt: '2024-10-01T08:00:00Z',
      updatedAt: '2024-10-01T08:00:00Z',
      status: 'approved',
      reviewedBy: 'user-mod-01',
    },
    {
      id: 'bq-2',
      chapterId: 'ch2',
      type: 'true-false',
      difficulty: 'nhận biết',
      question: 'Thí nghiệm cắt trực tiếp cho phép xác định đồng thời hai thông số c và φ.',
      correctAnswer: 'Đúng',
      explanation: 'Từ biểu đồ τ-σ, ta xác định được c (tung độ gốc) và φ (góc nghiêng đường Mohr-Coulomb).',
      tags: ['cắt trực tiếp', 'Mohr-Coulomb'],
      createdBy: 'user-teacher-01',
      createdByName: 'GV. Nguyễn Văn A',
      createdAt: '2024-10-05T10:00:00Z',
      updatedAt: '2024-10-05T10:00:00Z',
      status: 'approved',
      reviewedBy: 'user-admin-01',
    },
    {
      id: 'bq-3',
      chapterId: 'ch3',
      type: 'multiple-choice',
      difficulty: 'vận dụng',
      question: 'Theo bài toán Boussinesq, khi điểm tính ứng suất phụ thêm càng xa tâm tải trọng tập trung thì σz sẽ?',
      options: ['Tăng lên', 'Giảm đi', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 'Giảm đi',
      explanation: 'σz giảm nhanh khi r/z tăng. Biểu đồ đường đẳng ứng suất cho thấy ứng suất phân bố hình củ hành.',
      tags: ['Boussinesq', 'ứng suất phụ thêm'],
      createdBy: 'user-admin-01',
      createdByName: 'Admin UTC',
      createdAt: '2024-10-10T14:00:00Z',
      updatedAt: '2024-10-10T14:00:00Z',
      status: 'approved',
      reviewedBy: 'user-admin-01',
    },
    {
      id: 'bq-4',
      chapterId: 'ch5',
      type: 'multiple-choice',
      difficulty: 'thông hiểu',
      question: 'Trong công thức Terzaghi, khi đất hoàn toàn không có lực dính (c = 0), SCT giới hạn phụ thuộc vào thành phần nào?',
      options: ['Chỉ cNc', 'γDfNq và 0.5γBNγ', 'Chỉ 0.5γBNγ', 'Tất cả ba thành phần'],
      correctAnswer: 'γDfNq và 0.5γBNγ',
      explanation: 'Khi c = 0, thành phần cNc = 0. SCT chỉ phụ thuộc chiều sâu chôn và bề rộng móng.',
      tags: ['Terzaghi', 'đất rời'],
      createdBy: 'user-teacher-01',
      createdByName: 'GV. Nguyễn Văn A',
      createdAt: '2024-11-01T09:00:00Z',
      updatedAt: '2024-11-01T09:00:00Z',
      status: 'pending',
    },
  ];
  saveQuestions(seed);
  return seed;
}

// ---- PUBLIC API ----

export async function fetchQuestionBank(filter?: QuestionBankFilter): Promise<BankQuestion[]> {
  await new Promise(r => setTimeout(r, 200));
  let questions = getStoredQuestions();

  if (filter) {
    if (filter.chapterId) questions = questions.filter(q => q.chapterId === filter.chapterId);
    if (filter.difficulty) questions = questions.filter(q => q.difficulty === filter.difficulty);
    if (filter.type) questions = questions.filter(q => q.type === filter.type);
    if (filter.status) questions = questions.filter(q => q.status === filter.status);
    if (filter.createdBy) questions = questions.filter(q => q.createdBy === filter.createdBy);
    if (filter.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      questions = questions.filter(item =>
        item.question.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }
  }

  return questions;
}

export async function addQuestion(data: CreateQuestionData, userId: string, userName: string): Promise<BankQuestion> {
  await new Promise(r => setTimeout(r, 300));
  const questions = getStoredQuestions();

  const newQ: BankQuestion = {
    id: `bq-${Date.now()}`,
    ...data,
    tags: data.tags || [],
    createdBy: userId,
    createdByName: userName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending',
  };

  questions.push(newQ);
  saveQuestions(questions);
  return newQ;
}

export async function updateQuestion(questionId: string, data: Partial<CreateQuestionData>): Promise<BankQuestion> {
  await new Promise(r => setTimeout(r, 300));
  const questions = getStoredQuestions();
  const idx = questions.findIndex(q => q.id === questionId);
  if (idx === -1) throw new Error('Không tìm thấy câu hỏi.');

  questions[idx] = {
    ...questions[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveQuestions(questions);
  return questions[idx];
}

export async function deleteQuestion(questionId: string): Promise<void> {
  await new Promise(r => setTimeout(r, 200));
  const questions = getStoredQuestions();
  saveQuestions(questions.filter(q => q.id !== questionId));
}

export async function approveQuestion(questionId: string, reviewerId: string, note?: string): Promise<BankQuestion> {
  await new Promise(r => setTimeout(r, 300));
  const questions = getStoredQuestions();
  const idx = questions.findIndex(q => q.id === questionId);
  if (idx === -1) throw new Error('Không tìm thấy câu hỏi.');

  questions[idx] = {
    ...questions[idx],
    status: 'approved',
    reviewedBy: reviewerId,
    reviewNote: note,
    updatedAt: new Date().toISOString(),
  };
  saveQuestions(questions);
  return questions[idx];
}

export async function rejectQuestion(questionId: string, reviewerId: string, note?: string): Promise<BankQuestion> {
  await new Promise(r => setTimeout(r, 300));
  const questions = getStoredQuestions();
  const idx = questions.findIndex(q => q.id === questionId);
  if (idx === -1) throw new Error('Không tìm thấy câu hỏi.');

  questions[idx] = {
    ...questions[idx],
    status: 'rejected',
    reviewedBy: reviewerId,
    reviewNote: note || 'Không đạt yêu cầu.',
    updatedAt: new Date().toISOString(),
  };
  saveQuestions(questions);
  return questions[idx];
}

export async function bulkImportQuestions(
  data: CreateQuestionData[],
  userId: string,
  userName: string
): Promise<BankQuestion[]> {
  await new Promise(r => setTimeout(r, 500));
  const questions = getStoredQuestions();
  const newQuestions: BankQuestion[] = data.map((d, i) => ({
    id: `bq-${Date.now()}-${i}`,
    ...d,
    tags: d.tags || [],
    createdBy: userId,
    createdByName: userName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending' as QuestionStatus,
  }));
  questions.push(...newQuestions);
  saveQuestions(questions);
  return newQuestions;
}

// ---- Generate quiz from bank for exam/flashcard ----
export function bankQuestionsToQuiz(bankQuestions: BankQuestion[]): Quiz[] {
  return bankQuestions.map(bq => ({
    id: bq.id,
    chapterId: bq.chapterId,
    type: bq.type,
    difficulty: bq.difficulty,
    question: bq.question,
    options: bq.options,
    correctAnswer: bq.correctAnswer,
    explanation: bq.explanation,
    tags: bq.tags,
    sourceRefs: [{
      fileId: 'question-bank',
      fileName: `Ngân hàng câu hỏi — ${bq.createdByName}`,
      fileType: 'exercise' as const,
      confidence: 'high' as const,
    }],
  }));
}

export function getApprovedBankStats(): { total: number; byChapter: Record<string, number>; byDifficulty: Record<string, number> } {
  const questions = getStoredQuestions().filter(q => q.status === 'approved');
  const byChapter: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};

  questions.forEach(q => {
    byChapter[q.chapterId] = (byChapter[q.chapterId] || 0) + 1;
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
  });

  return { total: questions.length, byChapter, byDifficulty };
}
