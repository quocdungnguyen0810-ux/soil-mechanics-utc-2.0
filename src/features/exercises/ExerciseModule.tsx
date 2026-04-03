'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getExercisesByChapter, chaptersMissingExercises } from '@/lib/data/exercises';
import { allChapters } from '@/lib/data/chapters';
import { ExerciseCard } from '@/components/exercises/ExerciseCard';

export function ExerciseModule() {
  const { selectedChapterId } = useAppStore();
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const chapter = allChapters.find(ch => ch.id === selectedChapterId) || allChapters[0];
  const allExercises = getExercisesByChapter(chapter.id);
  const hasMissing = (chaptersMissingExercises as string[]).includes(chapter.id);

  const filteredExercises = allExercises.filter(ex => {
    if (difficultyFilter === 'all') return true;
    return (ex.difficulty as string) === difficultyFilter;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="badge-blue">Chương {chapter.chapterNumber}</span>
          <span className="badge-purple">{allExercises.length} bài tập</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Bài tập tự luận: {chapter.title}</h1>
        {hasMissing && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-3">
            <p className="text-sm text-amber-300">⚠️ Đang cập nhật thêm bài tập cho chương này.</p>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      {allExercises.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button 
            onClick={() => setDifficultyFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${difficultyFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-white/5 text-dark-300 hover:bg-white/10'}`}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setDifficultyFilter('nhận biết')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${difficultyFilter === 'nhận biết' ? 'bg-green-600 text-white' : 'bg-white/5 text-dark-300 hover:bg-white/10'}`}
          >
            Nhận biết
          </button>
          <button 
            onClick={() => setDifficultyFilter('thông hiểu')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${difficultyFilter === 'thông hiểu' ? 'bg-blue-600 text-white' : 'bg-white/5 text-dark-300 hover:bg-white/10'}`}
          >
            Thông hiểu
          </button>
          <button 
            onClick={() => setDifficultyFilter('vận dụng')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${difficultyFilter === 'vận dụng' ? 'bg-purple-600 text-white' : 'bg-white/5 text-dark-300 hover:bg-white/10'}`}
          >
            Vận dụng
          </button>
        </div>
      )}

      {allExercises.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">✏️</p>
          <h3 className="text-xl font-display font-semibold mb-2">Chưa có bài tập</h3>
          <p className="text-dark-400">Đang cập nhật dữ liệu cho chương {chapter.chapterNumber}.</p>
        </div>
      ) : filteredExercises.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-dark-300">Không tìm thấy bài tập nào với độ khó này trong chương {chapter.chapterNumber}.</p>
          <button onClick={() => setDifficultyFilter('all')} className="mt-4 btn-secondary text-sm">
            Xem tất cả bài tập
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredExercises.map((ex, idx) => (
            <ExerciseCard key={ex.id} exercise={ex} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
