import { api } from "./api";
interface GoogleRespose {
  provider?: string;
  providerId?: string;
  accessToken?: string;
  headers?: any;
}

const authService = {
  googleLogin: async (): Promise<GoogleRespose> => {
    try {
      const response = await api.get<GoogleRespose, Record<string, unknown>>("/auth/google");
      //   const redirectUrl = response.headers.location;
      //   console.log("리다이렉트 주소::", redirectUrl);
      //   if (redirectUrl) {
      // window.open(redirectUrl, "_blank");
      //   }

      //   if (response.accessToken) {
      // localStorage.setItem("accessToken", response.accessToken);
      //   }

      console.log("api 쪽 리스폰스::", response);
      return response;
    } catch (error) {
      console.error("구글 로그인 실패", error);
      throw error;
    }
  },
  kakaoLogin: async () => {
    try {
      const response = await api.get("/auth/kakao");
      console.log("api 쪽 리스폰스::", response);
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
