import { create } from 'zustand';
import { User, LoginCredentials, RegisterData, CreateUserData, UpdateUserData, UserRole, canManageUsers } from '@/types/auth';
import {
  login, register, logout, getStoredSession,
  getAllUsers, createUser, updateUser, deleteUser,
  resetUserPassword, approveUser, deactivateUser,
} from '@/lib/services/authService';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // All users (for admin panel)
  allUsers: User[];
  usersLoading: boolean;

  // Auth actions
  initialize: () => void;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  registerUser: (data: RegisterData) => Promise<void>;
  logoutUser: () => Promise<void>;
  clearError: () => void;

  // User Management actions (admin/moderator)
  fetchAllUsers: () => Promise<void>;
  addUser: (data: CreateUserData) => Promise<void>;
  editUser: (userId: string, data: UpdateUserData) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  resetPassword: (userId: string, newPassword: string) => Promise<void>;
  approveUserAccount: (userId: string) => Promise<void>;
  deactivateUserAccount: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  allUsers: [],
  usersLoading: false,

  initialize: () => {
    const session = getStoredSession();
    if (session) {
      set({ user: session, isAuthenticated: true });
    }
  },

  loginUser: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await login(credentials);
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (err: any) {
      set({ isLoading: false, error: err.message || 'Đăng nhập thất bại.' });
      throw err;
    }
  },

  registerUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await register(data);
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (err: any) {
      set({ isLoading: false, error: err.message || 'Đăng ký thất bại.' });
      throw err;
    }
  },

  logoutUser: async () => {
    set({ isLoading: true });
    await logout();
    set({ user: null, isAuthenticated: false, isLoading: false, error: null, allUsers: [] });
  },

  clearError: () => set({ error: null }),

  // ---- User Management ----

  fetchAllUsers: async () => {
    set({ usersLoading: true });
    try {
      const users = await getAllUsers();
      set({ allUsers: users, usersLoading: false });
    } catch {
      set({ usersLoading: false });
    }
  },

  addUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await createUser(data);
      // Refresh list
      const users = await getAllUsers();
      set({ allUsers: users, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  editUser: async (userId, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await updateUser(userId, data);
      const users = await getAllUsers();
      // If editing self, update session
      const currentUser = get().user;
      if (currentUser && currentUser.id === userId) {
        set({ user: updatedUser });
      }
      set({ allUsers: users, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  removeUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteUser(userId);
      const users = await getAllUsers();
      set({ allUsers: users, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  resetPassword: async (userId, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await resetUserPassword(userId, newPassword);
      set({ isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  approveUserAccount: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await approveUser(userId);
      const users = await getAllUsers();
      set({ allUsers: users, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  deactivateUserAccount: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await deactivateUser(userId);
      const users = await getAllUsers();
      set({ allUsers: users, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },
}));
