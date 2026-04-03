'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserRole, ROLE_CONFIG } from '@/types/auth';

export function RegisterForm() {
  const { registerUser, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [studentId, setStudentId] = useState('');
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMsg('');
    try {
      await registerUser({
        name, email, password, role,
        studentId: studentId || undefined,
        className: className || undefined,
        department: department || undefined,
      });
      router.push('/dashboard');
    } catch (err: any) {
      // Check if account was created but is pending
      if (err.message?.includes('chờ duyệt')) {
        setSuccessMsg('✅ Tài khoản đã được tạo! Vui lòng chờ Admin/Kiểm duyệt phê duyệt.');
      }
    }
  };

  const roleOptions: { key: UserRole; show: boolean }[] = [
    { key: 'student', show: true },
    { key: 'teacher', show: true },
    { key: 'moderator', show: true },
    { key: 'admin', show: true },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏗️</div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-1">Cơ Học Đất</h1>
          <p className="text-dark-400 text-sm">ĐH Giao thông Vận tải</p>
        </div>

        {/* Register Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-display font-bold mb-6 text-center">Đăng ký tài khoản</h2>

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4 animate-fade-in">
              <p className="text-sm text-emerald-300">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Họ và tên</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
            </div>

            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@utc.edu.vn" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
            </div>

            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Mật khẩu</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tối thiểu 6 ký tự" required minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm" />
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm text-dark-300 mb-1.5">Vai trò</label>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.filter(r => r.show).map(({ key }) => (
                  <button key={key} type="button" onClick={() => setRole(key)}
                    className={`px-3 py-2.5 rounded-lg text-xs text-center transition-all ${
                      role === key
                        ? 'bg-primary-600/20 border border-primary-500/30 text-primary-300'
                        : 'bg-white/5 border border-white/10 text-dark-400 hover:bg-white/10'
                    }`}
                  >
                    {ROLE_CONFIG[key].icon} {ROLE_CONFIG[key].label}
                  </button>
                ))}
              </div>
              {role !== 'student' && (
                <p className="text-xs text-amber-400 mt-2">
                  ⚠️ Tài khoản {ROLE_CONFIG[role].label} cần được Admin phê duyệt trước khi sử dụng.
                </p>
              )}
            </div>

            {/* Student-specific fields */}
            {role === 'student' && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-sm text-dark-300 mb-1.5">Mã SV</label>
                  <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="2012345"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1.5">Lớp</label>
                  <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="65DCKT01"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 transition-all text-sm" />
                </div>
              </div>
            )}

            {/* Teacher/Moderator fields */}
            {(role === 'teacher' || role === 'moderator') && (
              <div className="animate-fade-in">
                <label className="block text-sm text-dark-300 mb-1.5">Bộ môn / Khoa</label>
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Bộ môn Địa kỹ thuật"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 transition-all text-sm" />
              </div>
            )}

            {error && !successMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                <p className="text-sm text-red-300">⚠️ {error}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 disabled:opacity-50 text-sm">
              {isLoading ? '⏳ Đang xử lý...' : '📝 Tạo tài khoản'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
