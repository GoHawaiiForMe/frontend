import { setAccessToken } from "@/utils/tokenUtils";
import { api } from "./api";

interface OAuthResponse {
  provider?: string;
  providerId?: string;
  accessToken?: string;
  redirectUrl: string;
}

interface LoginResponse {
  accessToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

const authService = {
  signUp: async (data: any, oauthToken?: string) => {
    try {
      const config = oauthToken ? { headers: { Authorization: `Bearer ${oauthToken}` } } : {};
      if (config) {
        const response = await api.post("/auth/signup", data, true, config);
        return response;
      } else {
        const response = await api.post("/auth/signup");
        return response;
      }
    } catch (error) {
      console.error("회원가입 실패", error);
      throw error;
    }
  },
  checkNickName: async (data: { nickName: string }) => {
    try {
      const response = await api.post("/auth/check/nickName", data);
      return response;
    } catch (error) {
      console.error("닉네임 체크 불가", error);
    }
  },
  checkEmail: async (data: { email: string }) => {
    try {
      const response = await api.post("/auth/check/email", data);
      return response;
    } catch (error) {
      console.error("이메일 체크 불가", error);
    }
  },
  login: async (data: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse, { email: string; password: string }>(
        "/auth/login",
        data,
      );
      setAccessToken(response.accessToken);

      return response;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },
  googleLogin: async () => {
    try {
      const response = await api.get<OAuthResponse, Record<string, unknown>>("/auth/google");
      return response.redirectUrl;
    } catch (error) {
      console.error("구글 로그인 실패", error);
      throw error;
    }
  },
  kakaoLogin: async () => {
    try {
      const response = await api.get<OAuthResponse, Record<string, unknown>>("/auth/kakao");
      return response.redirectUrl;
    } catch (error) {
      console.error("카카오 로그인 실패", error);
      throw error;
    }
  },
  naverLogin: async () => {
    try {
      const response = await api.get<OAuthResponse, Record<string, unknown>>("/auth/naver");
      return response.redirectUrl;
    } catch (error) {
      console.error("네이버 로그인 실패", error);
      throw error;
    }
  },
  refreshToken: async (): Promise<string> => {
    try {
      const response: RefreshTokenResponse = await api.post("/auth/refresh/token", true);
      return response.accessToken;
    } catch (error) {
      console.error("리프레시 토큰 발급 실패", error);
      throw error;
    }
  },
};

export default authService;
