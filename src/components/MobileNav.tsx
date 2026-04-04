'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { allChapters } from '@/lib/data/chapters';
import { allLabs } from '@/lib/data/labs';

/* ── Bottom tab items ────────────────────────────────────── */
const tabs = [
  { path: '/dashboard',  icon: '🏠', label: 'Tổng quan' },
  { path: '/chapters',   icon: '📖', label: 'Chương' },
  { path: '/exercises',  icon: '✏️', label: 'Bài tập' },
  { path: '/labs',       icon: '🔬', label: 'Thí nghiệm' },
  { path: '/more',       icon: '☰',  label: 'Thêm' },
];

const moreItems = [
  { path: '/exam',       icon: '🎯', label: 'Thi thử' },
  { path: '/flashcard',  icon: '🃏', label: 'Flashcard' },
  { path: '/materials',  icon: '📚', label: 'Tài liệu' },
  { path: '/reports',    icon: '📋', label: 'Báo cáo' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { setSelectedChapter, setSelectedLab, selectedChapterId, selectedLabId } = useAppStore();
  const [showMore, setShowMore] = useState(false);
  const [showChapterDrawer, setShowChapterDrawer] = useState(false);
  const [showLabDrawer, setShowLabDrawer] = useState(false);

  const isActive = (path: string) => {
    if (path === '/chapters') return pathname?.startsWith('/chapters');
    if (path === '/more') return ['/exam', '/flashcard', '/materials', '/reports'].some(p => pathname?.startsWith(p));
    return pathname?.startsWith(path);
  };

  const handleTabClick = (path: string) => {
    setShowMore(false);
    if (path === '/more') {
      setShowMore(prev => !prev);
      return null; // will handle via state
    }
    if (path === '/chapters') {
      setShowChapterDrawer(prev => !prev);
      setShowLabDrawer(false);
    } else if (path === '/labs') {
      setShowLabDrawer(prev => !prev);
      setShowChapterDrawer(false);
    } else {
      setShowChapterDrawer(false);
      setShowLabDrawer(false);
    }
    return path;
  };

  return (
    <>
      {/* ── Overlay drawers ─────────────────────────────────── */}

      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowMore(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-16 left-0 right-0 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1f2e47, #182338)',
              borderTop: '1px solid rgba(212,160,23,0.15)',
              borderRadius: '16px 16px 0 0',
              padding: '16px 12px',
            }}
          >
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 8 }}>
              Chức năng khác
            </p>
            <div className="grid grid-cols-4 gap-2">
              {moreItems.map(({ path, icon, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setShowMore(false)}
                  className="flex flex-col items-center gap-1 py-3 rounded-xl transition-all"
                  style={{
                    background: pathname?.startsWith(path) ? 'rgba(212,160,23,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${pathname?.startsWith(path) ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.05)'}`,
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.65rem', color: pathname?.startsWith(path) ? 'var(--utc-gold-light)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter drawer */}
      {showChapterDrawer && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowChapterDrawer(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-16 left-0 right-0 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1f2e47, #182338)',
              borderTop: '1px solid rgba(212,160,23,0.15)',
              borderRadius: '16px 16px 0 0',
              padding: '12px',
              maxHeight: '50vh',
              overflowY: 'auto',
            }}
          >
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 6 }}>
              Chọn chương
            </p>
            <div className="space-y-1">
              {allChapters.map((ch) => (
                <Link
                  key={ch.id}
                  href={`/chapters/${ch.id}`}
                  onClick={() => { setSelectedChapter(ch.id); setShowChapterDrawer(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                  style={{
                    background: (pathname?.includes(ch.id) || selectedChapterId === ch.id) ? 'rgba(212,160,23,0.1)' : 'transparent',
                    borderLeft: (pathname?.includes(ch.id) || selectedChapterId === ch.id) ? '2px solid var(--utc-gold)' : '2px solid transparent',
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: 'rgba(52,104,184,0.2)', color: '#93c5fd',
                    }}
                  >
                    {ch.chapterNumber}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {ch.shortTitle}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lab drawer */}
      {showLabDrawer && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowLabDrawer(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-16 left-0 right-0 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1f2e47, #182338)',
              borderTop: '1px solid rgba(212,160,23,0.15)',
              borderRadius: '16px 16px 0 0',
              padding: '12px',
              maxHeight: '50vh',
              overflowY: 'auto',
            }}
          >
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 6 }}>
              Chọn bài thí nghiệm
            </p>
            <div className="space-y-1">
              {allLabs.map((lab) => (
                <Link
                  key={lab.id}
                  href="/labs"
                  onClick={() => { setSelectedLab(lab.id); setShowLabDrawer(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                  style={{
                    background: selectedLabId === lab.id ? 'rgba(212,160,23,0.1)' : 'transparent',
                    borderLeft: selectedLabId === lab.id ? '2px solid var(--utc-gold)' : '2px solid transparent',
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'rgba(34,197,94,0.15)', color: '#86efac' }}
                  >
                    {lab.labNumber}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {lab.title.replace('Xác định ', '')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Tab Bar ───────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(24,35,56,0.97), rgba(17,24,39,0.99))',
          borderTop: '1px solid rgba(212,160,23,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="flex items-stretch justify-around">
          {tabs.map(({ path, icon, label }) => {
            const active = isActive(path);
            const isMoreBtn = path === '/more';

            return isMoreBtn ? (
              <button
                key={path}
                onClick={() => {
                  setShowChapterDrawer(false);
                  setShowLabDrawer(false);
                  setShowMore(prev => !prev);
                }}
                className="flex flex-col items-center justify-center gap-0.5 py-2 flex-1 transition-all relative"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                {active && (
                  <div style={{
                    position: 'absolute', top: 0, left: '25%', right: '25%', height: 2,
                    background: 'var(--utc-gold)', borderRadius: '0 0 2px 2px',
                  }} />
                )}
                <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{showMore ? '✕' : icon}</span>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--utc-gold-light)' : 'var(--text-muted)',
                  lineHeight: 1,
                }}>
                  {showMore ? 'Đóng' : label}
                </span>
              </button>
            ) : (
              <Link
                key={path}
                href={
                  path === '/chapters'
                    ? `/chapters/${selectedChapterId || 'ch1'}`
                    : path
                }
                onClick={() => {
                  handleTabClick(path);
                }}
                className="flex flex-col items-center justify-center gap-0.5 py-2 flex-1 transition-all relative"
              >
                {active && !isMoreBtn && (
                  <div style={{
                    position: 'absolute', top: 0, left: '25%', right: '25%', height: 2,
                    background: 'var(--utc-gold)', borderRadius: '0 0 2px 2px',
                  }} />
                )}
                <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{icon}</span>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--utc-gold-light)' : 'var(--text-muted)',
                  lineHeight: 1,
                }}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
