import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Role = "DREAMER" | "MAKER" | "guest";

interface AuthState {
  isLoggedIn: boolean;
  nickName: string;
  role: Role;
  coconut: number;
  email?: string;
  phoneNumber?: string;
  setLogin: (userName: string, role: Role, coconut: number,email:string,phoneNumber:string) => void;
  setLogout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      nickName: "게스트",
      role: "guest",
      coconut: 0,
      email: "",
      phoneNumber: "",
      setLogin: (nickName: string, role: Role, coconut: number,email:string,phoneNumber:string) =>
        set({ isLoggedIn: true, nickName, role, coconut,email,phoneNumber }),
      setLogout: () => set({ isLoggedIn: false, nickName: "게스트", role: "guest", coconut: 0,email:"",phoneNumber:"" }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
