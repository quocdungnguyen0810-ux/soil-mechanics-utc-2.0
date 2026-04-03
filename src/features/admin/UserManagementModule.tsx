'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User, UserRole, UserStatus, ROLE_CONFIG, canManageUsers, CreateUserData } from '@/types/auth';

type ModalMode = 'create' | 'edit' | 'resetPassword' | null;

export function UserManagementModule() {
  const {
    user: currentUser, allUsers, usersLoading, isLoading, error,
    fetchAllUsers, addUser, editUser, removeUser, resetPassword,
    approveUserAccount, deactivateUserAccount, clearError,
  } = useAuthStore();

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('student');
  const [formStatus, setFormStatus] = useState<UserStatus>('active');
  const [formStudentId, setFormStudentId] = useState('');
  const [formClassName, setFormClassName] = useState('');
  const [formDepartment, setFormDepartment] = useState('');

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (!currentUser || !canManageUsers(currentUser.role)) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🔒</p>
        <h2 className="text-xl font-display font-semibold mb-2">Không có quyền truy cập</h2>
        <p className="text-dark-400">Chỉ Quản trị viên và Người kiểm duyệt mới có thể quản lý người dùng.</p>
      </div>
    );
  }

  const filteredUsers = allUsers.filter(u => {
    if (filterRole !== 'all' && u.role !== filterRole) return false;
    if (filterStatus !== 'all' && u.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) ||
             u.email.toLowerCase().includes(q) ||
             (u.studentId && u.studentId.includes(q));
    }
    return true;
  });

  const pendingCount = allUsers.filter(u => u.status === 'pending').length;

  const openCreateModal = () => {
    setFormName(''); setFormEmail(''); setFormPassword('');
    setFormRole('student'); setFormStatus('active');
    setFormStudentId(''); setFormClassName(''); setFormDepartment('');
    setModalMode('create');
    clearError();
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormName(user.name); setFormEmail(user.email);
    setFormRole(user.role); setFormStatus(user.status);
    setFormStudentId(user.studentId || '');
    setFormClassName(user.className || '');
    setFormDepartment(user.department || '');
    setModalMode('edit');
    clearError();
  };

  const openResetPasswordModal = (user: User) => {
    setSelectedUser(user);
    setNewPassword('');
    setModalMode('resetPassword');
    clearError();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser({
        name: formName,
        email: formEmail,
        password: formPassword,
        role: formRole,
        status: formStatus,
        studentId: formStudentId || undefined,
        className: formClassName || undefined,
        department: formDepartment || undefined,
      });
      setModalMode(null);
    } catch { }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await editUser(selectedUser.id, {
        name: formName,
        email: formEmail,
        role: formRole,
        status: formStatus,
        studentId: formStudentId || undefined,
        className: formClassName || undefined,
        department: formDepartment || undefined,
      });
      setModalMode(null);
    } catch { }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await resetPassword(selectedUser.id, newPassword);
      setModalMode(null);
    } catch { }
  };

  const handleDelete = async (user: User) => {
    if (user.id === currentUser.id) return;
    if (!confirm(`Xóa người dùng "${user.name}"? Hành động này không thể hoàn tác.`)) return;
    await removeUser(user.id);
  };

  const statusBadge = (status: UserStatus) => {
    const config: Record<UserStatus, { label: string; cls: string }> = {
      active: { label: 'Hoạt động', cls: 'badge-green' },
      pending: { label: 'Chờ duyệt', cls: 'badge-amber' },
      inactive: { label: 'Vô hiệu', cls: 'badge-rose' },
    };
    const c = config[status];
    return <span className={c.cls}>{c.label}</span>;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="badge-rose">⚙️ Quản lý người dùng</span>
          {pendingCount > 0 && (
            <span className="badge-amber">🔔 {pendingCount} chờ duyệt</span>
          )}
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Quản lý Người dùng</h1>
        <p className="text-dark-400 text-sm">
          Tạo, sửa, phân vai trò và quản lý trạng thái tài khoản người dùng.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="glass-card text-center py-3">
          <p className="text-xl font-bold text-white">{allUsers.length}</p>
          <p className="text-xs text-dark-400">Tổng số</p>
        </div>
        {(['student', 'teacher', 'moderator', 'admin'] as UserRole[]).map(role => (
          <div key={role} className="glass-card text-center py-3">
            <p className="text-xl font-bold text-white">{allUsers.filter(u => u.role === role).length}</p>
            <p className="text-xs text-dark-400">{ROLE_CONFIG[role].icon} {ROLE_CONFIG[role].label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button onClick={openCreateModal} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all">
          ➕ Tạo người dùng
        </button>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Tìm kiếm tên, email, mã SV..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">🔍</span>
        </div>

        <select
          value={filterRole}
          onChange={e => setFilterRole(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="student">Sinh viên</option>
          <option value="teacher">Giáo viên</option>
          <option value="moderator">Kiểm duyệt</option>
          <option value="admin">Admin</option>
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="pending">Chờ duyệt</option>
          <option value="inactive">Vô hiệu</option>
        </select>
      </div>

      {/* User Table */}
      {usersLoading ? (
        <div className="text-center py-12 text-dark-400">⏳ Đang tải...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <p className="text-4xl mb-3">👤</p>
          <p className="text-dark-300">Không tìm thấy người dùng nào.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredUsers.map(user => (
            <div key={user.id} className={`glass-card p-4 flex items-center gap-4 ${user.status === 'pending' ? 'border-l-4 border-l-amber-500' : ''}`}>
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                user.role === 'admin' ? 'bg-gradient-to-br from-rose-500 to-pink-600' :
                user.role === 'moderator' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                user.role === 'teacher' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                'bg-gradient-to-br from-blue-500 to-cyan-600'
              }`}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <span className={ROLE_CONFIG[user.role].badgeClass}>
                    {ROLE_CONFIG[user.role].icon} {ROLE_CONFIG[user.role].label}
                  </span>
                  {statusBadge(user.status)}
                </div>
                <p className="text-xs text-dark-400 mt-0.5">
                  {user.email}
                  {user.studentId && ` • MSV: ${user.studentId}`}
                  {user.className && ` • Lớp: ${user.className}`}
                  {user.department && ` • ${user.department}`}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {user.status === 'pending' && (
                  <button
                    onClick={() => approveUserAccount(user.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-500/20 transition-all"
                    title="Duyệt"
                  >
                    ✅ Duyệt
                  </button>
                )}
                {user.status === 'active' && user.id !== currentUser.id && (
                  <button
                    onClick={() => deactivateUserAccount(user.id)}
                    className="px-2 py-1.5 rounded-lg bg-white/5 text-dark-400 text-xs hover:bg-white/10 transition-all"
                    title="Vô hiệu hóa"
                  >
                    🚫
                  </button>
                )}
                {user.status === 'inactive' && (
                  <button
                    onClick={() => approveUserAccount(user.id)}
                    className="px-2 py-1.5 rounded-lg bg-white/5 text-dark-400 text-xs hover:bg-white/10 transition-all"
                    title="Kích hoạt lại"
                  >
                    🔄
                  </button>
                )}
                <button
                  onClick={() => openEditModal(user)}
                  className="px-2 py-1.5 rounded-lg bg-white/5 text-dark-400 text-xs hover:bg-white/10 transition-all"
                  title="Sửa"
                >
                  ✏️
                </button>
                <button
                  onClick={() => openResetPasswordModal(user)}
                  className="px-2 py-1.5 rounded-lg bg-white/5 text-dark-400 text-xs hover:bg-white/10 transition-all"
                  title="Đặt lại mật khẩu"
                >
                  🔑
                </button>
                {user.id !== currentUser.id && currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(user)}
                    className="px-2 py-1.5 rounded-lg bg-red-500/5 text-red-400 text-xs hover:bg-red-500/15 transition-all"
                    title="Xóa"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== MODALS ===== */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setModalMode(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-lg glass-card p-8" onClick={e => e.stopPropagation()}>
            {/* Create / Edit */}
            {(modalMode === 'create' || modalMode === 'edit') && (
              <form onSubmit={modalMode === 'create' ? handleCreate : handleEdit} className="space-y-4">
                <h2 className="text-xl font-display font-bold mb-4">
                  {modalMode === 'create' ? '➕ Tạo người dùng mới' : `✏️ Sửa: ${selectedUser?.name}`}
                </h2>

                <div>
                  <label className="block text-sm text-dark-300 mb-1">Họ và tên *</label>
                  <input type="text" value={formName} onChange={e => setFormName(e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                </div>

                <div>
                  <label className="block text-sm text-dark-300 mb-1">Email *</label>
                  <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                </div>

                {modalMode === 'create' && (
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Mật khẩu *</label>
                    <input type="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} required minLength={6}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-dark-300 mb-1.5">Vai trò *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['student', 'teacher', 'moderator', 'admin'] as UserRole[]).map(r => (
                      <button key={r} type="button" onClick={() => setFormRole(r)}
                        className={`px-3 py-2.5 rounded-lg text-xs text-center transition-all ${
                          formRole === r
                            ? 'bg-primary-600/20 border border-primary-500/30 text-primary-300'
                            : 'bg-white/5 border border-white/10 text-dark-400 hover:bg-white/10'
                        }`}
                      >
                        {ROLE_CONFIG[r].icon} {ROLE_CONFIG[r].label}
                      </button>
                    ))}
                  </div>
                </div>

                {modalMode === 'edit' && (
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Trạng thái</label>
                    <select value={formStatus} onChange={e => setFormStatus(e.target.value as UserStatus)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none">
                      <option value="active">Hoạt động</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="inactive">Vô hiệu</option>
                    </select>
                  </div>
                )}

                {formRole === 'student' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-dark-300 mb-1">Mã SV</label>
                      <input type="text" value={formStudentId} onChange={e => setFormStudentId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-300 mb-1">Lớp</label>
                      <input type="text" value={formClassName} onChange={e => setFormClassName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none" />
                    </div>
                  </div>
                )}

                {(formRole === 'teacher' || formRole === 'moderator') && (
                  <div>
                    <label className="block text-sm text-dark-300 mb-1">Bộ môn / Khoa</label>
                    <input type="text" value={formDepartment} onChange={e => setFormDepartment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none" />
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-300">⚠️ {error}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setModalMode(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-dark-300 text-sm hover:bg-white/10 transition-all">
                    Hủy
                  </button>
                  <button type="submit" disabled={isLoading}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50">
                    {isLoading ? '⏳...' : modalMode === 'create' ? '➕ Tạo' : '💾 Lưu'}
                  </button>
                </div>
              </form>
            )}

            {/* Reset Password */}
            {modalMode === 'resetPassword' && selectedUser && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <h2 className="text-xl font-display font-bold mb-2">🔑 Đặt lại mật khẩu</h2>
                <p className="text-sm text-dark-300 mb-4">Cho tài khoản: <strong>{selectedUser.name}</strong> ({selectedUser.email})</p>

                <div>
                  <label className="block text-sm text-dark-300 mb-1">Mật khẩu mới *</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-300">⚠️ {error}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setModalMode(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-dark-300 text-sm hover:bg-white/10 transition-all">
                    Hủy
                  </button>
                  <button type="submit" disabled={isLoading}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50">
                    {isLoading ? '⏳...' : '🔑 Đặt lại'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
