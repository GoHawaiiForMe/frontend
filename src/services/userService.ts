import { api } from "./api"

type Role = "DREAMER" | "MAKER";

interface LoginResponse {
  accessToken: string;
}
interface UserInfo {
  id: string;
  role: Role;
  nickName: string;
  email: string;
  phoneNumber: string;
  coconut: number;
}

interface ProfileInfo {
  userId: string;
  image: string;
  serviceArea: string[];
  tripTypes?: string[];
  serviceTypes?: string[];
  gallery?: string;
  description?: string;
  detailDescription?: string;
  createdAt: string;
  updatedAt: string;
}


const userService = {

  signUp: async (data: any) => {
    try {
      const response = await api.post("/user/signup", data);
      return response;
    } catch (error) {
      console.error("회원가입 실패", error);
      throw error;
    }
  },
  checkNickName: async (data: { nickName: string }) => {
    try {
      const response = await api.post("/user/check/nickName", data);
      return response;
    }
    catch (error) {
      console.error("닉네임 체크 불가", error);
    }
  },
  checkEmail: async (data: { email: string }) => {
    try {
      const response = await api.post("/user/check/email", data);
      return response;
    }
    catch (error) {
      console.error("이메일 체크 불가", error);
    }
  },
  login: async (data: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse, { email: string; password: string }>("/user/login", data);
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },

  getUserInfo: async (): Promise<UserInfo> => {
    try {
      const response = await api.get<UserInfo, {}>("/user");
      return response;
    } catch (error) {
      console.error("유저 정보 조회 실패", error);
      throw error;
    }
  },

  getProfileInfo: async (): Promise<ProfileInfo> => {
    try {
      const response = await api.get<ProfileInfo, {}>("/user/profile");
      return response;
    } catch (error) {
      console.error("프로필 정보 조회 실패", error);
      throw error;
    }
  },

  patchBasicInfo: async (payload: {
    nickName?: string;
    phoneNumber?: string;
    password?: string;
    newPassword?: string;
  }) => {
    try {
      const response = await api.patch("/user/update", payload);
      return response;
    } catch (error) {
      console.error("기본 정보 수정 실패", error);
      throw error;
    }
  },

  patchProfileDreamer: async (payload: {
    image?: string;
    tripTypes?: string[];
    serviceArea?: string[];
  }) => {
    try {
      const response = await api.patch("/user/update/profile", payload);
      return response;
    } catch (error) {
      console.error("프로필 수정 실패", error);
      throw error;
    }
  },

};

export default userService;