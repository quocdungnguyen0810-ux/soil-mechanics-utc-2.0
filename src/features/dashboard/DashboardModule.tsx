'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ROLE_CONFIG, canManageQuestionBank, canManageUsers } from '@/types/auth';
import { allChapters } from '@/lib/data/chapters';
import { allExercises } from '@/lib/data/exercises';
import { allMaterials } from '@/lib/data/materials';
import { allLabs } from '@/lib/data/labs';

export function DashboardModule() {
  const { progress } = useAppStore();
  const { user, isAuthenticated } = useAuthStore();

  const stats = useMemo(() => {
    const totalChapters = allChapters.length;
    const completedChapters = progress.completedChapters.length;
    const totalQuizzes = allChapters.reduce((acc, ch) => acc + ch.quizzes.length, 0);
    const quizzesAttempted = Object.keys(progress.quizScores).length;
    const avgScore = quizzesAttempted > 0
      ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / quizzesAttempted)
      : 0;
    const totalExercises = allExercises.length;
    const completedExercises = progress.completedExercises.length;
    const bookmarkedFormulas = progress.bookmarkedFormulas.length;

    return {
      totalChapters, completedChapters,
      totalQuizzes, quizzesAttempted, avgScore,
      totalExercises, completedExercises,
      bookmarkedFormulas,
      totalMaterials: allMaterials.length,
      totalLabs: allLabs.length,
      completedLabs: progress.completedLabs.length,
    };
  }, [progress]);

  const chapterProgress = Math.round((stats.completedChapters / stats.totalChapters) * 100);

  // Quick action cards data
  const quickActions = [
    { href: '/chapters/ch1', icon: '📖', label: 'Học lý thuyết', desc: 'Bắt đầu từ chương 1' },
    { href: '/exercises', icon: '✏️', label: 'Làm bài tập', desc: `${stats.totalExercises} bài tập` },
    { href: '/exam', icon: '🎯', label: 'Thi thử', desc: 'Tạo đề ngẫu nhiên' },
    { href: '/flashcard', icon: '🃏', label: 'Ôn tập Flashcard', desc: 'Lật thẻ ôn bài' },
    { href: '/labs', icon: '🔬', label: 'Thí nghiệm', desc: `${stats.totalLabs} bài TN` },
  ];

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="badge-blue">🏠 Dashboard</span>
          {isAuthenticated && user && (
            <span className={ROLE_CONFIG[user.role]?.badgeClass || 'badge-blue'}>
              {ROLE_CONFIG[user.role]?.icon} {ROLE_CONFIG[user.role]?.label}
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">
          {isAuthenticated && user ? `Xin chào, ${user.name}` : 'Tổng quan học tập'}
        </h1>
        <p className="text-dark-400 text-sm">
          Theo dõi tiến độ và bắt đầu học tập ngay hôm nay.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="📖"
          value={`${stats.completedChapters}/${stats.totalChapters}`}
          label="Chương hoàn thành"
          pct={chapterProgress}
          gradient="from-blue-600/20 to-blue-800/10"
        />
        <StatCard
          icon="📝"
          value={`${stats.quizzesAttempted}/${stats.totalChapters}`}
          label="Quiz đã làm"
          extra={stats.avgScore > 0 ? `TB: ${stats.avgScore}%` : undefined}
          gradient="from-purple-600/20 to-purple-800/10"
        />
        <StatCard
          icon="✏️"
          value={`${stats.completedExercises}/${stats.totalExercises}`}
          label="Bài tập đã làm"
          gradient="from-emerald-600/20 to-emerald-800/10"
        />
        <StatCard
          icon="⭐"
          value={String(stats.bookmarkedFormulas)}
          label="Công thức đã lưu"
          gradient="from-amber-600/20 to-amber-800/10"
        />
      </div>

      {/* Overall Progress Bar */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold">Tiến độ tổng thể</h3>
          <span className="text-primary-400 font-bold text-lg">{chapterProgress}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-700"
            style={{ width: `${Math.max(chapterProgress, 2)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-dark-500">
          <span>{stats.completedChapters} chương xong</span>
          <span>{stats.totalChapters - stats.completedChapters} còn lại</span>
        </div>
      </div>

      {/* Chapter Progress Detail */}
      <div className="glass-card p-5 mb-8">
        <h3 className="font-display font-semibold mb-4">Chi tiết theo chương</h3>
        <div className="space-y-3">
          {allChapters.map(ch => {
            const isCompleted = progress.completedChapters.includes(ch.id);
            const quizScore = progress.quizScores[ch.id];
            const hasQuiz = quizScore !== undefined;

            return (
              <Link
                key={ch.id}
                href={`/chapters/${ch.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary-500/20 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/5 text-dark-400'
                }`}>
                  {isCompleted ? '✅' : ch.chapterNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-primary-300 transition-colors">
                    Chương {ch.chapterNumber}: {ch.shortTitle}
                  </p>
                  <div className="flex gap-2 mt-0.5">
                    {hasQuiz && (
                      <span className={`text-xs ${quizScore >= 70 ? 'text-emerald-400' : quizScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        Quiz: {quizScore}%
                      </span>
                    )}
                    <span className="text-xs text-dark-500">{ch.quizzes.length} câu hỏi</span>
                  </div>
                </div>
                <span className="text-dark-600 group-hover:text-dark-400 transition-colors text-sm">→</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="font-display font-semibold mb-4">Bắt đầu nhanh</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {quickActions.map(action => (
            <Link
              key={action.href}
              href={action.href}
              className="glass-card p-4 text-center hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-600/10 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <p className="text-sm font-semibold text-white">{action.label}</p>
              <p className="text-xs text-dark-400 mt-0.5">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Role-based management panel */}
      {isAuthenticated && user && canManageQuestionBank(user.role) && (
        <div className="glass-card p-5 border border-purple-500/20">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
            {ROLE_CONFIG[user.role].icon} Công cụ quản lý
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-xl font-bold text-white">{stats.totalChapters}</div>
              <div className="text-xs text-dark-400">Chương</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-xl font-bold text-white">{stats.totalQuizzes}</div>
              <div className="text-xs text-dark-400">Câu hỏi</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-xl font-bold text-white">{stats.totalExercises}</div>
              <div className="text-xs text-dark-400">Bài tập</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-xl font-bold text-white">{stats.totalMaterials}</div>
              <div className="text-xs text-dark-400">Tài liệu</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/question-bank"
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary-500/20 transition-all flex items-center gap-3 group">
              <span className="text-2xl">📝</span>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">Ngân hàng câu hỏi</p>
                <p className="text-xs text-dark-400">Thêm, sửa, duyệt câu hỏi trắc nghiệm</p>
              </div>
            </Link>
            {canManageUsers(user.role) && (
              <Link href="/admin/users"
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary-500/20 transition-all flex items-center gap-3 group">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">Quản lý người dùng</p>
                  <p className="text-xs text-dark-400">Tạo, sửa, phân vai trò, duyệt tài khoản</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Not logged in nudge */}
      {!isAuthenticated && (
        <div className="glass-card p-5 border border-primary-500/20 text-center">
          <p className="text-dark-300 mb-3">
            🔓 Đăng nhập để lưu tiến độ học tập và truy cập đầy đủ tính năng.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-600/25 transition-all"
          >
            Đăng nhập ngay
          </Link>
        </div>
      )}
    </div>
  );
}

// ---- Stat Card Component ----
function StatCard({ icon, value, label, pct, extra, gradient }: {
  icon: string;
  value: string;
  label: string;
  pct?: number;
  extra?: string;
  gradient: string;
}) {
  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} border border-white/5 relative overflow-hidden`}>
      <div className="relative z-10">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-dark-400 mt-0.5">{label}</div>
        {extra && <div className="text-xs text-primary-400 mt-1">{extra}</div>}
      </div>
      {pct !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
          <div className="h-full bg-primary-500/50" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}
