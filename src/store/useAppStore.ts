import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppMode, UserProgress, StudentInfo } from '@/types';

interface AppStore {
  // Navigation
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  selectedChapterId: string | null;
  setSelectedChapter: (id: string | null) => void;
  selectedLabId: string | null;
  setSelectedLab: (id: string | null) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Progress
  progress: UserProgress;
  toggleBookmarkFormula: (id: string) => void;
  toggleBookmarkExample: (id: string) => void;
  markChapterCompleted: (id: string) => void;
  markExerciseCompleted: (id: string) => void;
  setQuizScore: (chapterId: string, score: number) => void;

  // Student info for reports
  studentInfo: StudentInfo;
  setStudentInfo: (info: Partial<StudentInfo>) => void;

  // Lab data storage
  labInputData: Record<string, Record<string, number | string>>;
  setLabInput: (labId: string, fieldId: string, value: number | string) => void;
  clearLabData: (labId: string) => void;
}

const defaultStudentInfo: StudentInfo = {
  universityName: 'TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI',
  facultyName: 'KHOA CÔNG TRÌNH',
  departmentName: 'BỘ MÔN ĐỊA KỸ THUẬT',
  studentName: '',
  studentId: '',
  className: '',
  courseYear: '',
  group: '',
  team: '',
  labDate: '',
  instructor: '',
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentMode: 'theory',
      setMode: (mode) => set({ currentMode: mode }),
      selectedChapterId: 'ch1',
      setSelectedChapter: (id) => set({ selectedChapterId: id }),
      selectedLabId: null,
      setSelectedLab: (id) => set({ selectedLabId: id }),
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      progress: {
        completedChapters: [],
        completedExercises: [],
        completedLabs: [],
        bookmarkedFormulas: [],
        bookmarkedExamples: [],
        quizScores: {},
      },

      toggleBookmarkFormula: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            bookmarkedFormulas: s.progress.bookmarkedFormulas.includes(id)
              ? s.progress.bookmarkedFormulas.filter((f) => f !== id)
              : [...s.progress.bookmarkedFormulas, id],
          },
        })),

      toggleBookmarkExample: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            bookmarkedExamples: s.progress.bookmarkedExamples.includes(id)
              ? s.progress.bookmarkedExamples.filter((e) => e !== id)
              : [...s.progress.bookmarkedExamples, id],
          },
        })),

      markChapterCompleted: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            completedChapters: s.progress.completedChapters.includes(id)
              ? s.progress.completedChapters
              : [...s.progress.completedChapters, id],
          },
        })),

      markExerciseCompleted: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            completedExercises: s.progress.completedExercises.includes(id)
              ? s.progress.completedExercises
              : [...s.progress.completedExercises, id],
          },
        })),

      setQuizScore: (chapterId, score) =>
        set((s) => ({
          progress: {
            ...s.progress,
            quizScores: { ...s.progress.quizScores, [chapterId]: score },
          },
        })),

      studentInfo: defaultStudentInfo,
      setStudentInfo: (info) =>
        set((s) => ({ studentInfo: { ...s.studentInfo, ...info } })),

      labInputData: {},
      setLabInput: (labId, fieldId, value) =>
        set((s) => ({
          labInputData: {
            ...s.labInputData,
            [labId]: { ...s.labInputData[labId], [fieldId]: value },
          },
        })),
      clearLabData: (labId) =>
        set((s) => {
          const newData = { ...s.labInputData };
          delete newData[labId];
          return { labInputData: newData };
        }),
    }),
    { name: 'co-hoc-dat-storage' }
  )
);
