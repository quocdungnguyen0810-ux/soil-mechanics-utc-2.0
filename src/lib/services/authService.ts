// ============================================================
// Auth Service — Cơ Học Đất UTC
// Mock localStorage-based. Ready for Supabase migration.
// Supports: login, register, CRUD users, role management
// ============================================================

import { User, LoginCredentials, RegisterData, CreateUserData, UpdateUserData, UserRole, UserStatus, hasMinRole } from '@/types/auth';

const STORAGE_KEY = 'co-hoc-dat-users';
const SESSION_KEY = 'co-hoc-dat-session';
const PASS_KEY = 'co-hoc-dat-passwords';

// ---- Internal Storage Helpers ----

function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const users: User[] = JSON.parse(raw);
      // Migration: ensure all users have 'status' field
      return users.map(u => ({ ...u, status: u.status || 'active' as UserStatus }));
    }
    return getDefaultUsers();
  } catch {
    return getDefaultUsers();
  }
}

function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getDefaultUsers(): User[] {
  const defaults: User[] = [
    {
      id: 'user-admin-01',
      name: 'Admin UTC',
      email: 'admin@utc.edu.vn',
      role: 'admin',
      status: 'active',
      department: 'Bộ môn Địa kỹ thuật',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'user-mod-01',
      name: 'KD. Lê Thị C',
      email: 'kd.le@utc.edu.vn',
      role: 'moderator',
      status: 'active',
      department: 'Bộ môn Địa kỹ thuật',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'user-teacher-01',
      name: 'GV. Nguyễn Văn A',
      email: 'gv.nguyen@utc.edu.vn',
      role: 'teacher',
      status: 'active',
      department: 'Bộ môn Địa kỹ thuật',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'user-student-01',
      name: 'Trần Văn B',
      email: 'sv.tran@utc.edu.vn',
      role: 'student',
      status: 'active',
      studentId: '2012345',
      className: '65DCKT01',
      createdAt: '2024-09-01T00:00:00Z',
    },
    {
      id: 'user-student-02',
      name: 'Phạm Thị D',
      email: 'sv.pham@utc.edu.vn',
      role: 'student',
      status: 'active',
      studentId: '2012346',
      className: '65DCKT01',
      createdAt: '2024-09-01T00:00:00Z',
    },
    {
      id: 'user-student-03',
      name: 'Hoàng Minh E',
      email: 'sv.hoang@utc.edu.vn',
      role: 'student',
      status: 'pending',
      studentId: '2012347',
      className: '65DCKT02',
      createdAt: '2024-09-15T00:00:00Z',
    },
  ];
  saveUsers(defaults);
  return defaults;
}

function getPasswords(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PASS_KEY);
    return raw ? JSON.parse(raw) : getDefaultPasswords();
  } catch {
    return getDefaultPasswords();
  }
}

function savePassword(email: string, password: string) {
  const passwords = getPasswords();
  passwords[email] = password;
  if (typeof window !== 'undefined') {
    localStorage.setItem(PASS_KEY, JSON.stringify(passwords));
  }
}

function removePassword(email: string) {
  const passwords = getPasswords();
  delete passwords[email];
  if (typeof window !== 'undefined') {
    localStorage.setItem(PASS_KEY, JSON.stringify(passwords));
  }
}

function getDefaultPasswords(): Record<string, string> {
  const defaults: Record<string, string> = {
    'admin@utc.edu.vn': 'admin123',
    'kd.le@utc.edu.vn': 'mod123',
    'gv.nguyen@utc.edu.vn': 'teacher123',
    'sv.tran@utc.edu.vn': 'student123',
    'sv.pham@utc.edu.vn': 'student123',
    'sv.hoang@utc.edu.vn': 'student123',
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(PASS_KEY, JSON.stringify(defaults));
  }
  return defaults;
}

// ---- PUBLIC AUTH API ----

export async function login(credentials: LoginCredentials): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 400));

  const users = getStoredUsers();
  const passwords = getPasswords();

  const user = users.find(u => u.email === credentials.email);
  if (!user) {
    throw new Error('Không tìm thấy tài khoản với email này.');
  }

  if (user.status === 'inactive') {
    throw new Error('Tài khoản đã bị vô hiệu hóa. Liên hệ quản trị viên.');
  }

  if (user.status === 'pending') {
    throw new Error('Tài khoản đang chờ duyệt. Liên hệ giáo viên hoặc quản trị viên.');
  }

  const storedPass = passwords[credentials.email];
  if (storedPass !== credentials.password) {
    throw new Error('Mật khẩu không chính xác.');
  }

  // Update last login time
  const updatedUser = { ...user, lastLoginAt: new Date().toISOString() };
  const idx = users.findIndex(u => u.id === user.id);
  users[idx] = updatedUser;
  saveUsers(users);

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
  }

  return updatedUser;
}

export async function register(data: RegisterData): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 400));

  const users = getStoredUsers();

  if (users.find(u => u.email === data.email)) {
    throw new Error('Email đã được sử dụng.');
  }

  // Students register as 'pending', teachers/mods need admin approval
  const status: UserStatus = data.role === 'student' ? 'active' : 'pending';

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    status,
    studentId: data.studentId,
    className: data.className,
    department: data.department,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  savePassword(data.email, data.password);

  if (status === 'pending') {
    throw new Error('Tài khoản đã được tạo và đang chờ duyệt bởi quản trị viên.');
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  }

  return newUser;
}

export async function logout(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getStoredSession(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---- USER MANAGEMENT API (Admin/Moderator) ----

export async function getAllUsers(): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return getStoredUsers();
}

export async function createUser(data: CreateUserData): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const users = getStoredUsers();

  if (users.find(u => u.email === data.email)) {
    throw new Error('Email đã tồn tại.');
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status || 'active',
    studentId: data.studentId,
    className: data.className,
    department: data.department,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  savePassword(data.email, data.password);

  return newUser;
}

export async function updateUser(userId: string, data: UpdateUserData): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const users = getStoredUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) throw new Error('Không tìm thấy người dùng.');

  // Check email conflict if email is changed
  if (data.email && data.email !== users[idx].email) {
    if (users.find(u => u.email === data.email)) {
      throw new Error('Email mới đã tồn tại.');
    }
  }

  users[idx] = { ...users[idx], ...data };
  saveUsers(users);

  // Update session if editing self
  const session = getStoredSession();
  if (session && session.id === userId) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(users[idx]));
  }

  return users[idx];
}

export async function deleteUser(userId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const users = getStoredUsers();
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('Không tìm thấy người dùng.');

  const filtered = users.filter(u => u.id !== userId);
  saveUsers(filtered);
  removePassword(user.email);
}

export async function resetUserPassword(userId: string, newPassword: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const users = getStoredUsers();
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('Không tìm thấy người dùng.');

  savePassword(user.email, newPassword);
}

export async function approveUser(userId: string): Promise<User> {
  return updateUser(userId, { status: 'active' });
}

export async function deactivateUser(userId: string): Promise<User> {
  return updateUser(userId, { status: 'inactive' });
}

// Legacy
export function hasPermission(user: User | null, requiredRole: UserRole): boolean {
  if (!user) return false;
  return hasMinRole(user.role, requiredRole);
}
