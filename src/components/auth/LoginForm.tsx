'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const { loginUser, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await loginUser({ email, password });
      router.push('/dashboard');
    } catch {
      // error is set in store
    }
  };

  const quickLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    clearError();
    try {
      await loginUser({ email, password });
      router.push('/dashboard');
    } catch {
      // error handled by store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏗️</div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-1">Cơ Học Đất</h1>
          <p className="text-dark-400 text-sm">ĐH Giao thông Vận tải</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-display font-bold mb-6 text-center">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@utc.edu.vn" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
            </div>

            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Mật khẩu</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                <p className="text-sm text-red-300">⚠️ {error}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 disabled:opacity-50 text-sm">
              {isLoading ? '⏳ Đang xử lý...' : '🔓 Đăng nhập'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/register" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/dashboard" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
              Tiếp tục không đăng nhập →
            </Link>
          </div>
        </div>

        {/* Quick Login Demo */}
        <div className="mt-6 glass-card p-5">
          <p className="text-xs text-dark-400 uppercase tracking-wider mb-3 text-center">Tài khoản demo</p>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin('sv.tran@utc.edu.vn', 'student123')}
              className="w-full px-4 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm hover:bg-blue-500/20 transition-all flex items-center justify-between"
            >
              <span>👨‍🎓 Sinh viên — Trần Văn B</span>
              <span className="text-xs text-dark-500">student123</span>
            </button>
            <button
              onClick={() => quickLogin('gv.nguyen@utc.edu.vn', 'teacher123')}
              className="w-full px-4 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm hover:bg-purple-500/20 transition-all flex items-center justify-between"
            >
              <span>👨‍🏫 Giáo viên — Nguyễn Văn A</span>
              <span className="text-xs text-dark-500">teacher123</span>
            </button>
            <button
              onClick={() => quickLogin('kd.le@utc.edu.vn', 'mod123')}
              className="w-full px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm hover:bg-amber-500/20 transition-all flex items-center justify-between"
            >
              <span>🛡️ Kiểm duyệt — Lê Thị C</span>
              <span className="text-xs text-dark-500">mod123</span>
            </button>
            <button
              onClick={() => quickLogin('admin@utc.edu.vn', 'admin123')}
              className="w-full px-4 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm hover:bg-rose-500/20 transition-all flex items-center justify-between"
            >
              <span>⚙️ Admin — Admin UTC</span>
              <span className="text-xs text-dark-500">admin123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
