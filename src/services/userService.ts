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

const userService = {

  signUp: async (data: any) => {
    try {
      const response = await api.post("/user/signup", data);
      console.log("회원가입 성공", response);
      return response;
    } catch (error) {
      console.error("회원가입 실패", error);
      throw error;
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
      const response = await api.get<UserInfo, {}>("/user/");
      console.log("유저 정보 조회 성공", response); //삭제
      return response;
    } catch (error) {
      console.error("유저 정보 조회 실패", error);
      throw error;
    }
  },


};

export default userService;