import { create } from "zustand";

type Role = "DREAMER" | "MAKER" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  nickName: string | null;
  role: Role;
  coconut: number;
  setLogin: (userName: string, role: Role, coconut: number) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  nickName: null,
  role: "guest",
  coconut: 0,
  setLogin: (nickName: string, role: Role, coconut: number) => set({ isLoggedIn: true, nickName, role, coconut }),
  setLogout: () => set({ isLoggedIn: false, nickName: null, role: "guest", coconut: 0 }),
}));

export default useAuthStore;
