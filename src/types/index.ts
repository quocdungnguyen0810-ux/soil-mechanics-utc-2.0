// ============================================================
// Core Type Definitions — Cơ Học Đất UTC
// ============================================================

export interface SourceRef {
  fileId: string;
  fileName: string;
  fileType: 'chapter' | 'exercise' | 'answer' | 'lab-guide' | 'lab-template' | 'video';
  section?: string;
  confidence: 'high' | 'medium' | 'low';
}

// ---- DETAILED CHAPTER STRUCTURE ----

export interface ChapterSection {
  id: string;
  title: string;
  content: string; // Rich markdown-like text
  formulas?: Formula[];
  figures?: string[];
  notes?: string[];
  sourceRef?: SourceRef;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  shortTitle: string;
  detectedTopic: string;
  overview: string;
  learningObjectives: string[];
  detailedSummary: ChapterSection[];
  keyConcepts: KeyConcept[];
  formulas: Formula[];
  workedExamples: WorkedExample[];
  importantNotes: string[];
  commonMistakes: string[];
  reviewQuestions: ReviewQuestion[];
  quizzes: Quiz[];
  exercises: Exercise[];
  sourceRefs: SourceRef[];
  sourceCoverageOverall: number; // 0.0 – 1.0
}

export interface KeyConcept {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  importance: 'critical' | 'important' | 'supplementary';
  sourceRefs: SourceRef[];
}

export interface Formula {
  id: string;
  chapterId?: string;
  labId?: string;
  name: string;
  expression: string;
  latex?: string;
  variables: VariableDef[];
  meaning: string;
  usageContext: string;
  sourceRefs: SourceRef[];
}

export interface VariableDef {
  symbol: string;
  name: string;
  unit?: string;
  description?: string;
}

export interface WorkedExample {
  id: string;
  chapterId: string;
  title: string;
  problem: string;
  solution: string;
  steps: string[];
  sourceRefs: SourceRef[];
}

export interface ReviewQuestion {
  id: string;
  chapterId: string;
  question: string;
  answer?: string;
  sourceRefs: SourceRef[];
}

export interface Quiz {
  id: string;
  chapterId: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  difficulty: 'nhận biết' | 'thông hiểu' | 'vận dụng';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  sourceRefs: SourceRef[];
}

export interface Exercise {
  id: string;
  chapterId: string;
  exerciseNumber: number;
  title: string;
  prompt: string;
  hint?: string;
  answer?: string;
  explanation?: string;
  hasDetailedSolution: boolean;
  sourceRefs: SourceRef[];
}

// ---- LAB ----

export interface Lab {
  id: string;
  labNumber: number;
  title: string;
  objective: string;
  principle: string;
  apparatus: string[];
  steps: LabStep[];
  formulas: Formula[];
  inputFields: LabInputField[];
  calculatedFields: LabCalculatedField[];
  resultTableSchema: ResultTableColumn[];
  reportTemplateMapping: ReportMapping;
  youtubeVideos: YouTubeVideo[];
  questions: LabQuestion[];
  sourceRefs: SourceRef[];
}

export interface LabStep {
  stepNumber: number;
  description: string;
  note?: string;
}

export interface LabInputField {
  id: string;
  label: string;
  unit: string;
  type: 'number' | 'text';
  required: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  sampleIndex?: number;
}

export interface LabCalculatedField {
  id: string;
  label: string;
  unit: string;
  formula: string;
  dependsOn: string[];
}

export interface ResultTableColumn {
  key: string;
  header: string;
  unit?: string;
  isInput: boolean;
}

export interface ReportMapping {
  templateSection: string;
  fieldMappings: Record<string, string>;
}

export interface LabQuestion {
  id: string;
  question: string;
  suggestedAnswer?: string;
  sourceRefs: SourceRef[];
}

export interface YouTubeVideo {
  id: string;
  labId: string;
  title: string;
  url: string;
  sourceType: 'provided' | 'reference';
  notes?: string;
}

// ---- REPORT ----

export interface LabReport {
  id: string;
  studentInfo: StudentInfo;
  labSections: LabReportSection[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentInfo {
  universityName: string;
  facultyName: string;
  departmentName: string;
  studentName: string;
  studentId: string;
  className: string;
  courseYear: string;
  group: string;
  team: string;
  labDate: string;
  instructor: string;
}

export interface LabReportSection {
  labId: string;
  labTitle: string;
  objective: string;
  principle: string;
  formulas: string[];
  rawData: Record<string, any>[];
  calculatedResults: Record<string, any>[];
  answers: Record<string, string>;
  remarks: string;
}

// ---- APP ----

export type AppMode = 'theory' | 'exercises' | 'labs' | 'reports';

export interface UserProgress {
  completedChapters: string[];
  completedExercises: string[];
  completedLabs: string[];
  bookmarkedFormulas: string[];
  bookmarkedExamples: string[];
  quizScores: Record<string, number>;
}
