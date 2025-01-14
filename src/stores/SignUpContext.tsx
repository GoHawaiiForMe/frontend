import { create } from "zustand";

interface SignUpState {
    userData: {
        role?: string;
        nickName?: string;
        email?: string;
        password?: string;
        phoneNumber?: string;
    };
    profileData: {
        image?: string;
        tripTypes: string[];
        serviceArea: string[];
    };
    setUserData: (data: Partial<SignUpState["userData"]>) => void;
    setProfileData: (data: Partial<SignUpState["profileData"]>) => void;

}

export const useSignUp = create<SignUpState>((set) => ({
    userData: {
        role: "",
        nickName: "",
        email: "",
        password: "",
        phoneNumber: "",
    },
    profileData: {
        image: "",
        tripTypes: [],
        serviceArea: [],
    },
    setUserData: (data) =>
        set((state) => ({ userData: { ...state.userData, ...data } })),
    setProfileData: (data) =>
        set((state) => ({ profileData: { ...state.profileData, ...data } })),
}));