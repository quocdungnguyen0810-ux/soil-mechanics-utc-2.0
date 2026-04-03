// ============================================================
// Exam Generator — Tạo đề thi tự động từ ngân hàng câu hỏi
// ============================================================

import { Quiz, DifficultyLevel } from '@/types';
import { allChapters } from '@/lib/data/chapters';
import { fetchQuestionBank, bankQuestionsToQuiz } from './questionBankService';

export interface ExamConfig {
  includeBank: boolean;     // include approved question bank items
  title: string;
  totalQuestions: number;
  chapters: string[];         // chapter IDs to include
  difficultyMix: {
    'nhận biết': number;      // percentage 0-100
    'thông hiểu': number;
    'vận dụng': number;
    'vận dụng cao': number;
  };
  duration: number;           // minutes
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

export interface GeneratedExam {
  id: string;
  config: ExamConfig;
  questions: Quiz[];
  createdAt: string;
}

export interface ExamResult {
  examId: string;
  answers: Record<string, string>;  // questionId -> selected answer
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  timeSpent: number; // seconds
}

// Default exam config
export const defaultExamConfig: ExamConfig = {
  includeBank: true,
  title: 'Đề kiểm tra Cơ học đất',
  totalQuestions: 20,
  chapters: ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7'],
  difficultyMix: {
    'nhận biết': 30,
    'thông hiểu': 40,
    'vận dụng': 25,
    'vận dụng cao': 5,
  },
  duration: 45,
  shuffleQuestions: true,
  shuffleOptions: true,
};

// Predefined exam templates
export const examTemplates: { name: string; config: ExamConfig }[] = [
  {
    name: '📝 Kiểm tra 15 phút',
    config: {
      ...defaultExamConfig,
      title: 'Kiểm tra 15 phút',
      totalQuestions: 10,
      duration: 15,
      difficultyMix: { 'nhận biết': 50, 'thông hiểu': 40, 'vận dụng': 10, 'vận dụng cao': 0 },
    },
  },
  {
    name: '📋 Kiểm tra giữa kỳ',
    config: {
      ...defaultExamConfig,
      title: 'Kiểm tra giữa kỳ Cơ học đất',
      totalQuestions: 30,
      chapters: ['ch1', 'ch2', 'ch3', 'ch4'],
      duration: 45,
      difficultyMix: { 'nhận biết': 25, 'thông hiểu': 40, 'vận dụng': 30, 'vận dụng cao': 5 },
    },
  },
  {
    name: '📄 Thi cuối kỳ',
    config: {
      ...defaultExamConfig,
      title: 'Thi cuối kỳ Cơ học đất',
      totalQuestions: 40,
      duration: 60,
      difficultyMix: { 'nhận biết': 20, 'thông hiểu': 35, 'vận dụng': 35, 'vận dụng cao': 10 },
    },
  },
];

// ---- CORE ALGORITHM ----

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getQuizPool(chapterIds: string[]): Quiz[] {
  return allChapters
    .filter(ch => chapterIds.includes(ch.id))
    .flatMap(ch => ch.quizzes);
}

// Get combined pool (chapters + bank)
async function getCombinedPool(chapterIds: string[], includeBank: boolean): Promise<Quiz[]> {
  const chapterQuizzes = getQuizPool(chapterIds);
  if (!includeBank) return chapterQuizzes;

  try {
    const bankQuestions = await fetchQuestionBank({ status: 'approved' });
    const filteredBank = bankQuestions.filter(q => chapterIds.includes(q.chapterId));
    const bankQuizzes = bankQuestionsToQuiz(filteredBank);
    // Combine and deduplicate by ID
    const seen = new Set(chapterQuizzes.map(q => q.id));
    const uniqueBank = bankQuizzes.filter(q => !seen.has(q.id));
    return [...chapterQuizzes, ...uniqueBank];
  } catch {
    return chapterQuizzes;
  }
}

export async function generateExam(config: ExamConfig): Promise<GeneratedExam> {
  const pool = await getCombinedPool(config.chapters, config.includeBank);

  // Group by difficulty
  const byDifficulty: Record<string, Quiz[]> = {
    'nhận biết': [],
    'thông hiểu': [],
    'vận dụng': [],
    'vận dụng cao': [],
  };

  pool.forEach(q => {
    const d = q.difficulty || 'thông hiểu';
    if (byDifficulty[d]) {
      byDifficulty[d].push(q);
    }
  });

  // Calculate target count per difficulty
  const targets: Record<string, number> = {};
  let allocated = 0;
  const difficulties: DifficultyLevel[] = ['nhận biết', 'thông hiểu', 'vận dụng', 'vận dụng cao'];

  difficulties.forEach(d => {
    const pct = config.difficultyMix[d] || 0;
    const target = Math.round(config.totalQuestions * pct / 100);
    targets[d] = target;
    allocated += target;
  });

  // Adjust for rounding
  if (allocated < config.totalQuestions) {
    targets['thông hiểu'] += config.totalQuestions - allocated;
  } else if (allocated > config.totalQuestions) {
    targets['thông hiểu'] -= allocated - config.totalQuestions;
  }

  // Select questions
  let selected: Quiz[] = [];

  difficulties.forEach(d => {
    const available = shuffle(byDifficulty[d]);
    const needed = targets[d];
    selected.push(...available.slice(0, needed));
  });

  // If we didn't get enough, fill from remaining pool
  if (selected.length < config.totalQuestions) {
    const usedIds = new Set(selected.map(q => q.id));
    const remaining = shuffle(pool.filter(q => !usedIds.has(q.id)));
    const deficit = config.totalQuestions - selected.length;
    selected.push(...remaining.slice(0, deficit));
  }

  // Trim if too many
  selected = selected.slice(0, config.totalQuestions);

  // Shuffle questions
  if (config.shuffleQuestions) {
    selected = shuffle(selected);
  }

  // Shuffle options
  if (config.shuffleOptions) {
    selected = selected.map(q => ({
      ...q,
      options: q.options ? shuffle(q.options) : undefined,
    }));
  }

  return {
    id: `exam-${Date.now()}`,
    config,
    questions: selected,
    createdAt: new Date().toISOString(),
  };
}

export function gradeExam(exam: GeneratedExam, answers: Record<string, string>): ExamResult {
  let correct = 0;
  exam.questions.forEach(q => {
    if (answers[q.id] === q.correctAnswer) {
      correct++;
    }
  });

  return {
    examId: exam.id,
    answers,
    score: correct,
    total: exam.questions.length,
    percentage: Math.round((correct / exam.questions.length) * 100),
    completedAt: new Date().toISOString(),
    timeSpent: 0,
  };
}
