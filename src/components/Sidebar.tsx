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
      className={`fixed left-0 top-0 h-full z-20 transition-all duration-300 flex flex-col ${
        sidebarOpen ? 'w-72' : 'w-16'
      }`}
      style={{
        background: 'linear-gradient(180deg, #182338 0%, #111827 100%)',
        borderRight: '1px solid rgba(212,160,23,0.1)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* UTC Logo */}
      <div
        style={{
          padding: '1rem',
          borderBottom: '1px solid rgba(212,160,23,0.1)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: 'linear-gradient(135deg, rgba(27,58,107,0.5), rgba(24,35,56,0.8))',
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #1B3A6B, #254d8f)',
            border: '1px solid rgba(212,160,23,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', cursor: 'pointer', flexShrink: 0,
            boxShadow: '0 2px 12px rgba(27,58,107,0.4)',
            transition: 'all 0.2s',
          }}
          title="Thu/mở menu"
        >
          🎓
        </button>
        {sidebarOpen && (
          <div className="animate-fade-in min-w-0">
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #EBB83A, #F5D878)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.03em',
                lineHeight: 1.2,
              }}
            >
              CƠ HỌC ĐẤT
            </h1>
            <p style={{ fontSize: '0.6rem', color: 'rgba(176,187,204,0.55)', letterSpacing: '0.12em', marginTop: 2, fontWeight: 500 }}>
              ĐH GIAO THÔNG VẬN TẢI
            </p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div style={{ padding: '0.75rem', borderBottom: '1px solid rgba(212,160,23,0.06)' }}>
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
              <span style={{ fontSize: '1rem', width: 20, textAlign: 'center', flexShrink: 0 }}>{icon}</span>
              {sidebarOpen && <span style={{ fontSize: '0.85rem' }}>{label}</span>}
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
