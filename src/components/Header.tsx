'use client';

import { useAppStore } from '@/store/useAppStore';

const modeLabels: Record<string, string> = {
  theory: 'Học theo chương',
  exercises: 'Bài tập',
  labs: 'Thí nghiệm',
  reports: 'Báo cáo thí nghiệm',
};

export function Header() {
  const { currentMode, searchQuery, setSearchQuery, progress } = useAppStore();

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 no-print">
      <div className="flex items-center gap-4">
        <h2 className="font-display font-semibold text-lg">{modeLabels[currentMode]}</h2>
        <div className="flex gap-2">
          {progress.bookmarkedFormulas.length > 0 && (
            <span className="badge-amber">
              ⭐ {progress.bookmarkedFormulas.length} đánh dấu
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-64 pl-10 text-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">🔍</span>
        </div>
      </div>
    </header>
  );
}
