import { api } from "./api";

const authService = {
  googleLogin: async () => {
    try {
      const response = await api.post("/auth/google");
      return response;
    } catch (error) {
      console.error("구글 로그인 실패", error);
      throw error;
    }
  },
  kakaoLogin: async () => {
    try {
      const response = await api.post("/auth/kakao");
      return response;
    } catch (error) {
      console.error("카카오 로그인 실패", error);
      throw error;
    }
  },
  naverLogin: async () => {
    try {
      const response = await api.post("/auth/naver");
      return response;
    } catch (error) {
      console.error("네이버 로그인 실패", error);
      throw error;
    }
  },
};

export default authService;
