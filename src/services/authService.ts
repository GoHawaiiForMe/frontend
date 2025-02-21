import { setAccessToken } from "@/utils/tokenUtils";
import { api } from "./api";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "@/utils/errorStatus";

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
    } catch (error: any) {
      if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("이미 존재하는 사용자입니다.");
      }
    }
  },
  checkNickName: async (data: { nickName: string }) => {
    try {
      const response = await api.post("/auth/check/nickName", data);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === INTERNAL_SERVER_ERROR) {
        throw new Error("email이 없습니다.");
      }
    }
  },
  checkEmail: async (data: { email: string }) => {
    try {
      const response = await api.post("/auth/check/email", data);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === INTERNAL_SERVER_ERROR) {
        throw new Error("닉네임이 없습니다.");
      }
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
    } catch (error: any) {
      if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("이메일과 비밀번호를 확인해주세요.");
      }
      throw new Error("로그인 중 오류가 발생했습니다.");
    }
  },
  googleLogin: async () => {
    try {
      const response = await api.get<OAuthResponse, Record<string, unknown>>("/auth/google");
      return response.redirectUrl;
    } catch (error: any) {
      if (error.response && error.response.status === INTERNAL_SERVER_ERROR) {
        throw new Error("구글 프로필 정보를 가져올 수 없습니다.");
      }
      throw new Error("구글 로그인에 실패했습니다.");
    }
  },
  kakaoLogin: async () => {
    try {
      const response = await api.get<OAuthResponse, Record<string, unknown>>("/auth/kakao");
      return response.redirectUrl;
    } catch (error: any) {
      if (error.response && error.response.status === INTERNAL_SERVER_ERROR) {
        throw new Error("카카오 프로필 정보를 가져올 수 없습니다.");
      }
      throw new Error("카카오 로그인에 실패했습니다.");
    }
  },
  naverLogin: async () => {
    try {
      const response = await api.get<OAuthResponse, Record<string, unknown>>("/auth/naver");
      return response.redirectUrl;
    } catch (error: any) {
      if (error.response && error.response.status === INTERNAL_SERVER_ERROR) {
        throw new Error("네이버 프로필 정보를 가져올 수 없습니다.");
      }
      throw new Error("네이버 로그인에 실패했습니다.");
    }
  },
  refreshToken: async () => {
    try {
      const response: RefreshTokenResponse = await api.post("/auth/refresh/token", true); //withCrediential
      const newAccessToken = response.accessToken;

      if (!newAccessToken) {
        throw new Error("서버에서 새로운 accessToken을 받지 못했습니다.");
      }

      return newAccessToken;
    } catch (error: any) {
      console.error("토큰 갱신 실패", error);
      throw error;
    }
  },
};

export default authService;
