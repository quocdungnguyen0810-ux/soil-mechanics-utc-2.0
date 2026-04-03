// ============================================================
// Auth Types — Cơ Học Đất UTC
// Roles: student, teacher, moderator, admin
// ============================================================

export type UserRole = 'student' | 'teacher' | 'moderator' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  studentId?: string;
  className?: string;
  department?: string;   // for teacher/moderator
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  studentId?: string;
  className?: string;
  department?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
  studentId?: string;
  className?: string;
  department?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  studentId?: string;
  className?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Role display config
export const ROLE_CONFIG: Record<UserRole, { label: string; icon: string; color: string; badgeClass: string; level: number }> = {
  student:   { label: 'Sinh viên',      icon: '👨‍🎓', color: 'blue',   badgeClass: 'badge-blue',   level: 1 },
  teacher:   { label: 'Giáo viên',      icon: '👨‍🏫', color: 'purple', badgeClass: 'badge-purple', level: 2 },
  moderator: { label: 'Người kiểm duyệt', icon: '🛡️', color: 'amber',  badgeClass: 'badge-amber',  level: 3 },
  admin:     { label: 'Quản trị viên',  icon: '⚙️',  color: 'rose',   badgeClass: 'badge-rose',   level: 4 },
};

// Permission helpers
export function hasMinRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_CONFIG[userRole].level >= ROLE_CONFIG[requiredRole].level;
}

export function canManageUsers(role: UserRole): boolean {
  return hasMinRole(role, 'moderator');
}

export function canManageQuestionBank(role: UserRole): boolean {
  return hasMinRole(role, 'teacher');
}

export function canCreateTests(role: UserRole): boolean {
  return hasMinRole(role, 'teacher');
}

export function canApproveContent(role: UserRole): boolean {
  return hasMinRole(role, 'moderator');
}
