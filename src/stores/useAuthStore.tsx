import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Role = "DREAMER" | "MAKER" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  nickName: string;
  role: Role;
  coconut: number;
  setLogin: (userName: string, role: Role, coconut: number) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickName: "게스트",
      role: "guest",
      coconut: 0,
      setLogin: (nickName: string, role: Role, coconut: number) =>
        set({ isLoggedIn: true, nickName, role, coconut }),
      setLogout: () => set({ isLoggedIn: false, nickName: "게스트", role: "guest", coconut: 0 }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
