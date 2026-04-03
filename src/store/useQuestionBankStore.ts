import { create } from 'zustand';
import {
  BankQuestion, QuestionBankFilter, CreateQuestionData,
  fetchQuestionBank, addQuestion, updateQuestion, deleteQuestion,
  approveQuestion, rejectQuestion, bulkImportQuestions,
} from '@/lib/services/questionBankService';

interface QuestionBankStore {
  questions: BankQuestion[];
  isLoading: boolean;
  error: string | null;
  filter: QuestionBankFilter;

  // Actions
  setFilter: (filter: Partial<QuestionBankFilter>) => void;
  resetFilter: () => void;
  fetchQuestions: (filter?: QuestionBankFilter) => Promise<void>;
  createQuestion: (data: CreateQuestionData, userId: string, userName: string) => Promise<void>;
  editQuestion: (questionId: string, data: Partial<CreateQuestionData>) => Promise<void>;
  removeQuestion: (questionId: string) => Promise<void>;
  approve: (questionId: string, reviewerId: string, note?: string) => Promise<void>;
  reject: (questionId: string, reviewerId: string, note?: string) => Promise<void>;
  bulkImport: (data: CreateQuestionData[], userId: string, userName: string) => Promise<number>;
  clearError: () => void;
}

export const useQuestionBankStore = create<QuestionBankStore>()((set, get) => ({
  questions: [],
  isLoading: false,
  error: null,
  filter: {},

  setFilter: (partial) => {
    const newFilter = { ...get().filter, ...partial };
    set({ filter: newFilter });
    // Auto-fetch with new filter
    get().fetchQuestions(newFilter);
  },

  resetFilter: () => {
    set({ filter: {} });
    get().fetchQuestions({});
  },

  fetchQuestions: async (filter) => {
    set({ isLoading: true, error: null });
    try {
      const questions = await fetchQuestionBank(filter || get().filter);
      set({ questions, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  createQuestion: async (data, userId, userName) => {
    set({ isLoading: true, error: null });
    try {
      await addQuestion(data, userId, userName);
      await get().fetchQuestions();
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  editQuestion: async (questionId, data) => {
    set({ isLoading: true, error: null });
    try {
      await updateQuestion(questionId, data);
      await get().fetchQuestions();
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  removeQuestion: async (questionId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteQuestion(questionId);
      await get().fetchQuestions();
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  approve: async (questionId, reviewerId, note) => {
    set({ isLoading: true, error: null });
    try {
      await approveQuestion(questionId, reviewerId, note);
      await get().fetchQuestions();
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  reject: async (questionId, reviewerId, note) => {
    set({ isLoading: true, error: null });
    try {
      await rejectQuestion(questionId, reviewerId, note);
      await get().fetchQuestions();
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  bulkImport: async (data, userId, userName) => {
    set({ isLoading: true, error: null });
    try {
      const imported = await bulkImportQuestions(data, userId, userName);
      await get().fetchQuestions();
      set({ isLoading: false });
      return imported.length;
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
