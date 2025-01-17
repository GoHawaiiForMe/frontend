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
  makerProfileData: {
    image?: string;
    serviceTypes: string[];
    serviceArea: string[];
    gallery: string;
    description: string;
    detailDescription: string;
  };
  setUserData: (data: Partial<SignUpState["userData"]>) => void;
  setProfileData: (data: Partial<SignUpState["profileData"]>) => void;
  setMakerProfileData: (data: Partial<SignUpState["makerProfileData"]>) => void;
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
  makerProfileData: {
    image: "",
    serviceTypes: [],
    serviceArea: [],
    gallery: "",
    description: "",
    detailDescription: "",
  },
  setUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
  setProfileData: (data) => set((state) => ({ profileData: { ...state.profileData, ...data } })),
  setMakerProfileData: (data) =>
    set((state) => ({ makerProfileData: { ...state.makerProfileData, ...data } })),
}));
