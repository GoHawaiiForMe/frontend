import { api } from "./api";
interface LoginRespose {
  provider?: string;
  providerId?: string;
  accessToken?: string;
  redirectUrl: string;
}

const authService = {
  googleLogin: async (): Promise<LoginRespose> => {
    try {
      const response = await api.get<LoginRespose, Record<string, unknown>>("/auth/google");
      const redirectUrl = response.redirectUrl;

      window.addEventListener("message", (event) => {
        if (event.origin === window.location.origin) {
          const userData = event.data;
          if (userData) {
            console.log("사용자 데이터:", userData);
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        }
      });

      return response;
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
      const response = await api.post("/auth/naver");
      return response;
    } catch (error) {
      console.error("네이버 로그인 실패", error);
      throw error;
    }
  },
};

export default authService;
