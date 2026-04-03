'use client';

import { Material } from '@/types';
import { materialTypeLabels } from '@/lib/data/materials';

interface MaterialCardProps {
  material: Material;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function MaterialCard({ material, isBookmarked, onToggleBookmark }: MaterialCardProps) {
  const typeInfo = materialTypeLabels[material.type];

  const importanceBadge = {
    essential: { label: 'Bắt buộc', cls: 'bg-red-500/20 text-red-300 border-red-500/30' },
    recommended: { label: 'Khuyến nghị', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    supplementary: { label: 'Bổ sung', cls: 'bg-dark-600 text-dark-300 border-dark-500' },
  }[material.importance];

  return (
    <div className="glass-card group hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
      {/* Subtle gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-purple-600/0 group-hover:from-primary-600/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">{typeInfo.icon}</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-base text-white truncate group-hover:text-primary-300 transition-colors">
                {material.title}
              </h3>
              {material.author && (
                <p className="text-xs text-dark-400 mt-0.5">{material.author}{material.year ? ` (${material.year})` : ''}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => onToggleBookmark(material.id)}
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                : 'bg-white/5 text-dark-500 hover:bg-white/10 hover:text-dark-300'
            }`}
            title={isBookmarked ? 'Bỏ lưu' : 'Lưu tài liệu'}
          >
            {isBookmarked ? '⭐' : '☆'}
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-dark-300 leading-relaxed mb-4">
          {material.description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${importanceBadge.cls}`}>
            {importanceBadge.label}
          </span>
          {material.chapterId && (
            <span className="px-2 py-1 rounded bg-white/5 text-dark-400 text-xs border border-white/10">
              Ch.{material.chapterId.replace('ch', '')}
            </span>
          )}
          {material.pages && (
            <span className="text-xs text-dark-500">{material.pages}</span>
          )}
        </div>

        {/* Tags */}
        {material.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
            {material.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full bg-dark-700/80 text-dark-400 text-[11px] border border-dark-600/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Source */}
        {material.source && (
          <div className="mt-3 text-xs text-dark-500 italic">
            Nguồn: {material.source}
          </div>
        )}
      </div>
    </div>
  );
}
