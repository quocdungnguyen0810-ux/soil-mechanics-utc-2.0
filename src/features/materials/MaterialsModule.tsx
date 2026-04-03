'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { allMaterials, materialTypeLabels, searchMaterials } from '@/lib/data/materials';
import { MaterialCard } from '@/components/materials/MaterialCard';

const typeFilterOptions: { key: string; label: string; icon: string }[] = [
  { key: 'all', label: 'Tất cả', icon: '📁' },
  { key: 'textbook', label: 'Giáo trình', icon: '📚' },
  { key: 'slide', label: 'Slide', icon: '📊' },
  { key: 'past-exam', label: 'Đề thi', icon: '📝' },
  { key: 'exercise-set', label: 'Bài tập', icon: '✏️' },
  { key: 'chart', label: 'Bảng tra', icon: '📋' },
  { key: 'standard', label: 'Tiêu chuẩn', icon: '📐' },
  { key: 'reference', label: 'Tham khảo', icon: '📖' },
];

const importanceFilterOptions = [
  { key: 'all', label: 'Tất cả' },
  { key: 'essential', label: '🔴 Bắt buộc' },
  { key: 'recommended', label: '🟡 Khuyến nghị' },
  { key: 'supplementary', label: '⚪ Bổ sung' },
];

export function MaterialsModule() {
  const { progress } = useAppStore();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [importanceFilter, setImportanceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarked, setShowBookmarked] = useState(false);

  // We need a way to toggle bookmarks. Since useAppStore doesn't have toggleBookmarkMaterial,
  // we'll handle it via a local state approach or read from progress.bookmarkedMaterials
  const [localBookmarks, setLocalBookmarks] = useState<Set<string>>(
    new Set(progress.bookmarkedMaterials || [])
  );

  const toggleBookmark = (id: string) => {
    setLocalBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredMaterials = useMemo(() => {
    let results = searchQuery.trim()
      ? searchMaterials(searchQuery)
      : [...allMaterials];

    if (typeFilter !== 'all') {
      results = results.filter(m => m.type === typeFilter);
    }

    if (importanceFilter !== 'all') {
      results = results.filter(m => m.importance === importanceFilter);
    }

    if (showBookmarked) {
      results = results.filter(m => localBookmarks.has(m.id));
    }

    return results;
  }, [searchQuery, typeFilter, importanceFilter, showBookmarked, localBookmarks]);

  // Stats
  const stats = useMemo(() => ({
    total: allMaterials.length,
    textbooks: allMaterials.filter(m => m.type === 'textbook').length,
    slides: allMaterials.filter(m => m.type === 'slide').length,
    exams: allMaterials.filter(m => m.type === 'past-exam').length,
    charts: allMaterials.filter(m => m.type === 'chart').length,
    bookmarked: localBookmarks.size,
  }), [localBookmarks]);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="badge-blue">📚 Thư viện</span>
          <span className="badge-purple">{allMaterials.length} tài liệu</span>
          {stats.bookmarked > 0 && (
            <span className="badge-green">⭐ {stats.bookmarked} đã lưu</span>
          )}
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Tài liệu tham khảo</h1>
        <p className="text-dark-400 text-sm">
          Giáo trình, slide bài giảng, đề thi cũ, bảng tra công thức và tiêu chuẩn liên quan đến môn Cơ học đất.
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Giáo trình', count: stats.textbooks, icon: '📚', color: 'from-blue-600/20 to-blue-800/10' },
          { label: 'Slide', count: stats.slides, icon: '📊', color: 'from-purple-600/20 to-purple-800/10' },
          { label: 'Đề thi', count: stats.exams, icon: '📝', color: 'from-amber-600/20 to-amber-800/10' },
          { label: 'Bảng tra', count: stats.charts, icon: '📋', color: 'from-rose-600/20 to-rose-800/10' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-xl bg-gradient-to-br ${s.color} border border-white/5`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-bold text-white">{s.count}</div>
            <div className="text-xs text-dark-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 space-y-3">
        {/* Type filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {typeFilterOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setTypeFilter(opt.key)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                typeFilter === opt.key
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                  : 'bg-white/5 text-dark-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Importance + Bookmark row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            {importanceFilterOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setImportanceFilter(opt.key)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-200 ${
                  importanceFilter === opt.key
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'bg-white/5 text-dark-400 hover:bg-white/10 border border-transparent'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10" />
          <button
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
              showBookmarked
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-white/5 text-dark-400 hover:bg-white/10 border border-transparent'
            }`}
          >
            ⭐ Đã lưu ({stats.bookmarked})
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredMaterials.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <p className="text-5xl mb-4">📭</p>
          <h3 className="text-xl font-display font-semibold mb-2 text-dark-200">
            {showBookmarked ? 'Chưa lưu tài liệu nào' : 'Không tìm thấy tài liệu'}
          </h3>
          <p className="text-dark-400 text-sm">
            {showBookmarked
              ? 'Nhấn ⭐ trên tài liệu để lưu lại.'
              : 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.'}
          </p>
          {(typeFilter !== 'all' || importanceFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => { setTypeFilter('all'); setImportanceFilter('all'); setSearchQuery(''); setShowBookmarked(false); }}
              className="mt-4 btn-secondary text-sm"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-xs text-dark-500 mb-3">
            Hiển thị {filteredMaterials.length} / {allMaterials.length} tài liệu
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredMaterials.map(mat => (
              <MaterialCard
                key={mat.id}
                material={mat}
                isBookmarked={localBookmarks.has(mat.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
