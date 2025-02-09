import { api } from "./api";
interface LoginRespose {
  provider?: string;
  providerId?: string;
  accessToken?: string;
  redirectUrl: string;
}

const authService = {
  googleLogin: async () => {
    try {
      const response = await api.get<LoginRespose, Record<string, unknown>>("/auth/google");
      return response.redirectUrl;
    } catch (error) {
      console.error("구글 로그인 실패", error);
      throw error;
    }
  },
  kakaoLogin: async () => {
    try {
      const response = await api.get<LoginRespose, Record<string, unknown>>("/auth/kakao");
      return response.redirectUrl;
    } catch (error) {
      console.error("카카오 로그인 실패", error);
      throw error;
    }
  },
  naverLogin: async () => {
    try {
      const response = await api.get<LoginRespose, Record<string, unknown>>("/auth/naver");
      return response.redirectUrl;
    } catch (error) {
      console.error("네이버 로그인 실패", error);
      throw error;
    }
  },
};

export default authService;
