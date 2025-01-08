import { create } from "zustand";

type Role = "Dreamer" | "Maker" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  role: Role;
  setLogin: (username: string, role: Role) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  nickname: null,
  role: "guest",
  setLogin: (nickname: string, role: Role) => set({ isLoggedIn: true, nickname, role }),
  setLogout: () => set({ isLoggedIn: false, nickname: null, role: "guest" }),
}));

export default useAuthStore;
