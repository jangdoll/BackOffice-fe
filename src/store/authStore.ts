// src/store/authStore.ts
import { create } from "zustand";

export type AuthKey = "auth_inq" | "auth_new" | "auth_save" | "auth_excel" | "auth_del" | "always";

export type AuthMap = Record<AuthKey, boolean>;

interface AuthState {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null, remember: boolean,  userId: string | null) => void;
  logout: () => void;
  restoreSession: () => void;
  userAuth: AuthMap; // 추가! (PageToolbar 등에서 selector로 바로 씀)
  setUserAuth: (auth: Partial<AuthMap>) => void; // 필요시 동적 변경용
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  setToken: (token, remember, userId) => {
    set({ token, userId });
    if (token) {
      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId ?? "");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId ?? "");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }
  },
  logout: () => {
    set({ token: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  },
  restoreSession: () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (token) set({ token });
    if (userId) set({ userId });
  },
  userAuth: {
    auth_inq: true,
    auth_new: true,
    auth_save: true,
    auth_excel: true,
    auth_del: false,
    always: true,
  },
  setUserAuth: (auth: Partial<AuthMap>) => set((state) => ({
    userAuth: { ...state.userAuth, ...auth }
  })),
}));
