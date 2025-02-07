import { api } from "./api";

type Role = "DREAMER" | "MAKER";

interface LoginResponse {
  accessToken: string;
}
export interface UserInfo {
  id: string;
  role: Role;
  nickName: string;
  email: string;
  phoneNumber: string;
  coconut: number;
}

interface ProfileInfo {
  userId: string;
  nickName?: string;
  image: string;
  serviceArea: string[];
  averageRating?: number;
  totalReviews?: number;
  totalConfirms?: number;
  tripTypes?: string[];
  serviceTypes?: string[];
  gallery?: string;
  description?: string;
  detailDescription?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReviewWriter {
  nickName: string;
}

interface ReviewItem {
  id: string;
  writer: ReviewWriter;
  rating: number;
  content: string;
  createdAt: string;
}

interface RatingCount {
  rating: string;
  count: number;
}

interface MakerReviewResponse {
  totalCount: number;
  groupByCount: RatingCount[];
  list: ReviewItem[];
}

interface MakerReviewParams {
  page?: number;
  pageSize?: number;
}

const userService = {
  signUp: async (data: any) => {
    try {
      const response = await api.post("/auth/signup", data);
      return response;
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
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },

  getUserInfo: async (): Promise<UserInfo> => {
    try {
      const response = await api.get<UserInfo, Record<string, unknown>>("/users/me");
      return response;
    } catch (error) {
      console.error("유저 정보 조회 실패", error);
      throw error;
    }
  },

  getProfileInfo: async (makerId?: string): Promise<ProfileInfo> => {
    try {
      const endpoint = makerId ? `/users/profile/${makerId}` : "/users/profile";
      const response = await api.get<ProfileInfo, Record<string, unknown>>(endpoint);
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
  }): Promise<void> => {
    try {
      await api.patch("/users/update", payload);
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
      const response = await api.patch("/users/update/profile", payload);
      return response;
    } catch (error) {
      console.error("프로필 수정 실패", error);
      throw error;
    }
  },

  patchProfileMaker: async (payload: {
    image?: string;
    serviceTypes?: string[];
    serviceArea?: string[];
    gallery?: string;
    description?: string;
    detailDescription?: string;
  }) => {
    try {
      const response = await api.patch("/users/update/profile", payload);
      return response;
    } catch (error) {
      console.error("메이커 프로필 수정 실패", error);
      throw error;
    }
  },

  getMakerMypage: async (
    makerId: string,
    params: MakerReviewParams = {},
  ): Promise<MakerReviewResponse> => {
    try {
      const { page = 1, pageSize = 5 } = params;
      const queryString = `?page=${page}&pageSize=${pageSize}`;
      const response = await api.get<MakerReviewResponse, {}>(`/reviews/${makerId}${queryString}`);
      return response;
    } catch (error) {
      console.error("메이커 마이페이지 조회 실패", error);
      throw error;
    }
  },
};

export default userService;
