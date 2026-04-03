'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ROLE_CONFIG } from '@/types/auth';

const modeLabels: Record<string, string> = {
  dashboard: 'Tổng quan',
  theory: 'Học theo chương',
  exercises: 'Bài tập',
  exam: 'Thi thử trắc nghiệm',
  flashcard: 'Ôn tập Flashcard',
  materials: 'Tài liệu tham khảo',
  labs: 'Thí nghiệm',
  reports: 'Báo cáo thí nghiệm',
  'question-bank': 'Ngân hàng câu hỏi',
  admin: 'Quản lý hệ thống',
};

export function Header() {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, progress } = useAppStore();
  const { user, isAuthenticated, initialize, logoutUser } = useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Detect mode from URL
  const currentMode = pathname?.startsWith('/dashboard')
    ? 'dashboard'
    : pathname?.startsWith('/chapters')
      ? 'theory'
      : pathname?.startsWith('/exercises')
        ? 'exercises'
        : pathname?.startsWith('/exam')
          ? 'exam'
          : pathname?.startsWith('/flashcard')
            ? 'flashcard'
            : pathname?.startsWith('/materials')
              ? 'materials'
              : pathname?.startsWith('/labs')
                ? 'labs'
                : pathname?.startsWith('/reports')
                  ? 'reports'
                  : pathname?.startsWith('/question-bank')
                    ? 'question-bank'
                    : pathname?.startsWith('/admin')
                      ? 'admin'
                      : 'dashboard';

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 no-print">
      <div className="flex items-center gap-4">
        <h2 className="font-display font-semibold text-lg">
          {modeLabels[currentMode]}
        </h2>
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
            🔍
          </span>
        </div>

        {/* Auth section */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-white font-medium leading-tight">{user.name}</p>
              <span className={ROLE_CONFIG[user.role]?.badgeClass || 'badge-blue'}>
                {ROLE_CONFIG[user.role]?.icon} {ROLE_CONFIG[user.role]?.label}
              </span>
            </div>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
              user.role === 'admin' ? 'bg-gradient-to-br from-rose-500 to-pink-600' :
              user.role === 'moderator' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
              user.role === 'teacher' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
              'bg-gradient-to-br from-primary-500 to-purple-500'
            }`}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-dark-500 hover:text-red-400 transition-colors px-2 py-1"
              title="Đăng xuất"
            >
              🚪
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm hover:bg-primary-600/30 transition-all"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}
