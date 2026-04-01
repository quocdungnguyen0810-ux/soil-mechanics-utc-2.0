'use client';

import { useAppStore } from '@/store/useAppStore';
import { allChapters } from '@/lib/data/chapters';
import { allLabs } from '@/lib/data/labs';
import { AppMode } from '@/types';

const modeConfig: { mode: AppMode; label: string; icon: string }[] = [
  { mode: 'theory', label: 'Học theo chương', icon: '📖' },
  { mode: 'exercises', label: 'Bài tập', icon: '✏️' },
  { mode: 'labs', label: 'Thí nghiệm', icon: '🔬' },
  { mode: 'reports', label: 'Báo cáo', icon: '📋' },
];

export function Sidebar() {
  const {
    currentMode, setMode, sidebarOpen, toggleSidebar,
    selectedChapterId, setSelectedChapter,
    selectedLabId, setSelectedLab,
    progress,
  } = useAppStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full glass border-r border-white/5 z-20 transition-all duration-300 flex flex-col ${
        sidebarOpen ? 'w-72' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3">
        <button onClick={toggleSidebar} className="text-2xl hover:scale-110 transition-transform" title="Toggle sidebar">
          🏗️
        </button>
        {sidebarOpen && (
          <div className="animate-fade-in">
            <h1 className="font-display font-bold text-lg gradient-text">Cơ Học Đất</h1>
            <p className="text-[10px] text-dark-400 tracking-wider">ĐH GIAO THÔNG VẬN TẢI</p>
          </div>
        )}
      </div>

      {/* Mode Navigation */}
      <div className="p-3 border-b border-white/5">
        {modeConfig.map(({ mode, label, icon }) => (
          <button
            key={mode}
            onClick={() => setMode(mode)}
            className={`sidebar-item w-full ${currentMode === mode ? 'active' : ''}`}
          >
            <span className="text-lg">{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </button>
        ))}
      </div>

      {/* Context navigation */}
      {sidebarOpen && (
        <div className="flex-1 overflow-y-auto p-3 animate-fade-in">
          {currentMode === 'theory' && (
            <>
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-4">Chương</p>
              {allChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className={`sidebar-item w-full text-left ${selectedChapterId === ch.id ? 'active' : ''}`}
                >
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                    progress.completedChapters.includes(ch.id)
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/5 text-dark-400'
                  }`}>
                    {ch.chapterNumber}
                  </span>
                  <span className="truncate text-xs">{ch.shortTitle}</span>
                </button>
              ))}
            </>
          )}

          {currentMode === 'exercises' && (
            <>
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-4">Chương có bài tập</p>
              {allChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className={`sidebar-item w-full text-left ${selectedChapterId === ch.id ? 'active' : ''}`}
                >
                  <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-white/5 text-dark-400">
                    {ch.chapterNumber}
                  </span>
                  <span className="truncate text-xs">{ch.shortTitle}</span>
                </button>
              ))}
            </>
          )}

          {(currentMode === 'labs' || currentMode === 'reports') && (
            <>
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-4">Bài thí nghiệm</p>
              {allLabs.map((lab) => (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLab(lab.id)}
                  className={`sidebar-item w-full text-left ${selectedLabId === lab.id ? 'active' : ''}`}
                >
                  <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-white/5 text-dark-400">
                    {lab.labNumber}
                  </span>
                  <span className="truncate text-xs">{lab.title.replace('Xác định ', '')}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Progress */}
      {sidebarOpen && (
        <div className="p-4 border-t border-white/5">
          <p className="text-xs text-dark-400 mb-2">Tiến độ học tập</p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(progress.completedChapters.length / 7) * 100}%` }}
            />
          </div>
          <p className="text-xs text-dark-500 mt-1">
            {progress.completedChapters.length}/7 chương
          </p>
        </div>
      )}
    </aside>
  );
}
