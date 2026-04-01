import { Chapter } from '@/types';
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5, chapter6, chapter7 } from './chapter5_6_7';

export const allChapters: Chapter[] = [
  chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7,
];

export function getChapterById(id: string): Chapter | undefined {
  return allChapters.find(ch => ch.id === id);
}

export function getChapterByNumber(num: number): Chapter | undefined {
  return allChapters.find(ch => ch.chapterNumber === num);
}
