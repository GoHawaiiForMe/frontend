import { create } from "zustand";

type Role = "DREAMER" | "MAKER" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  nickName: string | null;
  role: Role;
  setLogin: (userName: string, role: Role) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  nickName: null,
  role: "guest",
  setLogin: (nickName: string, role: Role) => set({ isLoggedIn: true, nickName, role }),
  setLogout: () => set({ isLoggedIn: false, nickName: null, role: "guest" }),
}));

export default useAuthStore;
