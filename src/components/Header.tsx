'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ROLE_CONFIG } from '@/types/auth';

const modeLabels: Record<string, { title: string; sub: string }> = {
  dashboard: { title: 'Tổng quan', sub: 'Cơ học đất — Học phần 2TC' },
  theory:    { title: 'Học theo chương', sub: 'Lý thuyết & Công thức' },
  exercises: { title: 'Bài tập', sub: 'Luyện tập & Kiểm tra' },
  exam:      { title: 'Thi thử', sub: 'Trắc nghiệm tổng hợp' },
  flashcard: { title: 'Ôn tập Flashcard', sub: 'Ghi nhớ nhanh' },
  materials: { title: 'Tài liệu tham khảo', sub: 'Giáo trình & Slide' },
  labs:      { title: 'Thí nghiệm', sub: 'Thực hành & Báo cáo' },
  reports:   { title: 'Báo cáo thí nghiệm', sub: 'Lập báo cáo tự động' },
  'question-bank': { title: 'Ngân hàng câu hỏi', sub: 'Quản lý đề thi' },
  admin:     { title: 'Quản lý hệ thống', sub: 'Admin panel' },
};

export function Header() {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, progress } = useAppStore();
  const { user, isAuthenticated, initialize, logoutUser } = useAuthStore();

  useEffect(() => { initialize(); }, [initialize]);

  const currentMode = Object.entries({
    dashboard: '/dashboard',
    theory: '/chapters',
    exercises: '/exercises',
    exam: '/exam',
    flashcard: '/flashcard',
    materials: '/materials',
    labs: '/labs',
    reports: '/reports',
    'question-bank': '/question-bank',
    admin: '/admin',
  }).find(([, path]) => pathname?.startsWith(path))?.[0] ?? 'dashboard';

  const modeInfo = modeLabels[currentMode];

  return (
    <header
      className="h-16 flex items-center justify-between px-6 no-print"
      style={{
        background: 'linear-gradient(135deg, rgba(24,35,56,0.96), rgba(17,24,39,0.98))',
        borderBottom: '1px solid rgba(212,160,23,0.1)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 1px 0 rgba(212,160,23,0.06)',
      }}
    >
      {/* Left: page title */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2
              className="font-display font-semibold text-base leading-tight truncate"
              style={{ color: '#EEF2FF' }}
            >
              {modeInfo?.title ?? currentMode}
            </h2>
            {progress.bookmarkedFormulas.length > 0 && (
              <span className="badge-amber shrink-0">
                ★ {progress.bookmarkedFormulas.length}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.68rem', color: 'rgba(176,187,204,0.5)', fontWeight: 400, marginTop: 1 }}>
            {modeInfo?.sub}
          </p>
        </div>
      </div>

      {/* Center: search */}
      <div className="flex-1 max-w-xs mx-6 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm nội dung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full pl-9 text-sm"
            style={{ fontSize: '0.8rem', height: 36, padding: '0 0.75rem 0 2.25rem' }}
          />
          <span
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: 10, fontSize: '0.8rem', color: 'var(--text-muted)' }}
          >
            🔍
          </span>
        </div>
      </div>

      {/* Right: user */}
      <div className="flex items-center gap-3 shrink-0">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#EEF2FF', lineHeight: 1.3 }}>
                {user.name}
              </p>
              <span className={ROLE_CONFIG[user.role]?.badgeClass || 'badge-blue'} style={{ fontSize: '0.65rem' }}>
                {ROLE_CONFIG[user.role]?.icon} {ROLE_CONFIG[user.role]?.label}
              </span>
            </div>
            <div
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--utc-navy-mid), var(--utc-gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#111827', fontWeight: 800, fontSize: '0.85rem',
                boxShadow: '0 0 0 2px rgba(212,160,23,0.3)',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={logoutUser}
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: 6 }}
              className="hover:text-white transition-colors"
              title="Đăng xuất"
            >
              🚪
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              background: 'rgba(27,58,107,0.35)',
              border: '1px solid rgba(212,160,23,0.25)',
              color: 'var(--utc-gold-light)',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}
