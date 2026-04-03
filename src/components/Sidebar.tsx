'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import { allChapters } from '@/lib/data/chapters';
import { allLabs } from '@/lib/data/labs';
import { canManageUsers, canManageQuestionBank, ROLE_CONFIG } from '@/types/auth';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  requiresAuth?: boolean;
  minRole?: 'teacher' | 'moderator' | 'admin';
}

const mainNav: NavItem[] = [
  { path: '/dashboard', label: 'Tổng quan', icon: '🏠' },
  { path: '/chapters', label: 'Học theo chương', icon: '📖' },
  { path: '/exercises', label: 'Bài tập', icon: '✏️' },
  { path: '/exam', label: 'Thi thử', icon: '🎯' },
  { path: '/flashcard', label: 'Ôn tập Flashcard', icon: '🃏' },
  { path: '/materials', label: 'Tài liệu', icon: '📚' },
  { path: '/labs', label: 'Thí nghiệm', icon: '🔬' },
  { path: '/reports', label: 'Báo cáo', icon: '📋' },
];

const managementNav: NavItem[] = [
  { path: '/question-bank', label: 'Ngân hàng câu hỏi', icon: '📝', requiresAuth: true, minRole: 'teacher' },
  { path: '/admin/users', label: 'Quản lý người dùng', icon: '👥', requiresAuth: true, minRole: 'moderator' },
];

export function Sidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    selectedLabId,
    setSelectedLab,
    selectedChapterId,
    setSelectedChapter,
    progress,
  } = useAppStore();

  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  // Detect current mode from URL
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

  // Get active chapter ID from URL (for theory mode)
  const activeChapterId = pathname?.startsWith('/chapters/')
    ? pathname.split('/')[2]
    : null;

  // Filter management nav based on user role
  const visibleManagementNav = managementNav.filter(item => {
    if (!isAuthenticated || !user) return false;
    if (item.minRole) {
      const roleLevel = ROLE_CONFIG[user.role]?.level || 0;
      const requiredLevel = ROLE_CONFIG[item.minRole]?.level || 0;
      return roleLevel >= requiredLevel;
    }
    return true;
  });

  return (
    <aside
      className={`fixed left-0 top-0 h-full glass border-r border-white/5 z-20 transition-all duration-300 flex flex-col ${
        sidebarOpen ? 'w-72' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-2xl hover:scale-110 transition-transform"
          title="Toggle sidebar"
        >
          🏗️
        </button>
        {sidebarOpen && (
          <div className="animate-fade-in">
            <h1 className="font-display font-bold text-lg gradient-text">
              Cơ Học Đất
            </h1>
            <p className="text-[10px] text-dark-400 tracking-wider">
              ĐH GIAO THÔNG VẬN TẢI
            </p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="p-3 border-b border-white/5">
        {mainNav.map(({ path, label, icon }) => {
          const isActive =
            path === '/chapters'
              ? currentMode === 'theory'
              : pathname?.startsWith(path);

          return (
            <Link
              key={path}
              href={path === '/chapters' ? '/chapters/ch1' : path}
              className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
            >
              <span className="text-lg">{icon}</span>
              {sidebarOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Management Nav (role-based) */}
      {visibleManagementNav.length > 0 && (
        <div className="p-3 border-b border-white/5">
          {sidebarOpen && (
            <p className="text-xs text-dark-500 uppercase tracking-wider mb-2 px-4">
              Quản lý
            </p>
          )}
          {visibleManagementNav.map(({ path, label, icon }) => {
            const isActive = pathname?.startsWith(path);
            return (
              <Link
                key={path}
                href={path}
                className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
              >
                <span className="text-lg">{icon}</span>
                {sidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </div>
      )}

      {/* Context navigation */}
      {sidebarOpen && (
        <div className="flex-1 overflow-y-auto p-3 animate-fade-in">
          {/* Theory mode: chapters as Links */}
          {currentMode === 'theory' && (
            <>
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-4">
                Chương
              </p>
              {allChapters.map((ch) => (
                <Link
                  key={ch.id}
                  href={`/chapters/${ch.id}`}
                  className={`sidebar-item w-full text-left ${
                    activeChapterId === ch.id ? 'active' : ''
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                      progress.completedChapters.includes(ch.id)
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-dark-400'
                    }`}
                  >
                    {ch.chapterNumber}
                  </span>
                  <span className="truncate text-xs">{ch.shortTitle}</span>
                </Link>
              ))}
            </>
          )}

          {/* Exercises mode: chapters as filter buttons */}
          {currentMode === 'exercises' && (
            <>
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-4">
                Chương có bài tập
              </p>
              {allChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className={`sidebar-item w-full text-left ${
                    selectedChapterId === ch.id ? 'active' : ''
                  }`}
                >
                  <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-white/5 text-dark-400">
                    {ch.chapterNumber}
                  </span>
                  <span className="truncate text-xs">{ch.shortTitle}</span>
                </button>
              ))}
            </>
          )}

          {/* Labs & Reports: lab list */}
          {(currentMode === 'labs' || currentMode === 'reports') && (
            <>
              <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-4">
                Bài thí nghiệm
              </p>
              {allLabs.map((lab) => (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLab(lab.id)}
                  className={`sidebar-item w-full text-left ${
                    selectedLabId === lab.id ? 'active' : ''
                  }`}
                >
                  <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-white/5 text-dark-400">
                    {lab.labNumber}
                  </span>
                  <span className="truncate text-xs">
                    {lab.title.replace('Xác định ', '')}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* User info & Progress */}
      {sidebarOpen && (
        <div className="p-4 border-t border-white/5">
          {/* Current user info */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                user.role === 'admin' ? 'bg-gradient-to-br from-rose-500 to-pink-600' :
                user.role === 'moderator' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                user.role === 'teacher' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                'bg-gradient-to-br from-blue-500 to-cyan-600'
              }`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{user.name}</p>
                <p className="text-[10px] text-dark-500">
                  {ROLE_CONFIG[user.role]?.icon} {ROLE_CONFIG[user.role]?.label}
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-dark-400 mb-2">Tiến độ học tập</p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(progress.completedChapters.length / 7) * 100}%`,
              }}
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
