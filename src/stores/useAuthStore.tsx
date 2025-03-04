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
  profileImage?: string;
  setLogin: (
    userName: string,
    role: Role,
    coconut: number,
    email?: string,
    phoneNumber?: string,
    profileImage?: string,
  ) => void;
  setLogout: () => void;
  setCoconut: (newCoconut: number) => void;
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
      profileImage: "",
      setLogin: (
        nickName: string,
        role: Role,
        coconut: number,
        email?: string,
        phoneNumber?: string,
        profileImage?: string,
      ) => set({ isLoggedIn: true, nickName, role, coconut, email, phoneNumber, profileImage }),
      setLogout: () =>
        set({
          isLoggedIn: false,
          nickName: "게스트",
          role: "guest",
          coconut: 0,
          email: "",
          phoneNumber: "",
          profileImage: "",
        }),
      setCoconut: (newCoconut: number) => set({ coconut: newCoconut }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
