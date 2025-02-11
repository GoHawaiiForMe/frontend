import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Role = "DREAMER" | "MAKER" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  nickName: string;
  role: Role;
  coconut: number;
  image?: string;
  setLogin: (userName: string, role: Role, coconut: number, image?: string) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickName: "게스트",
      role: "guest",
      coconut: 0,
      image: "",
      setLogin: (nickName: string, role: Role, coconut: number, image?: string) =>
        set({ isLoggedIn: true, nickName, role, coconut, image }),
      setLogout: () => set({ isLoggedIn: false, nickName: "게스트", role: "guest", coconut: 0 }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
