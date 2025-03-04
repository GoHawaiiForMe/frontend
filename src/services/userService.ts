import { BAD_REQUEST } from "@/utils/errorStatus";
import { api } from "./api";

type Role = "DREAMER" | "MAKER";
export type ServiceType =
  | "SHOPPING"
  | "FOOD_TOUR"
  | "ACTIVITY"
  | "CULTURE"
  | "FESTIVAL"
  | "RELAXATION"
  | "REQUEST"
  | "PENDING"
  | "CONFIRMED";

export interface UserInfo {
  id: string;
  role: Role;
  nickName: string;
  email: string;
  phoneNumber: string;
  coconut: number;
}

export interface MakerProfileResponse {
  nickName: string;
  image: string;
  gallery: string;
  serviceTypes: string[];
  serviceArea: string[];
  description: string;
  detailDescription: string;
  isFollowed: boolean;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}

interface ProfileInfo {
  userId: string;
  id?: string;
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

export interface Maker {
  id: string;
  nickName: string;
  description: string;
  detailDescription: string;
  image: string;
  gallery: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  serviceTypes: ServiceType[];
  serviceArea: string[];
  isFollowed: boolean;
}

interface MakerResponse {
  totalCount: number;
  list: Maker[];
}

const userService = {
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
      const endpoint = makerId ? `/users/maker/${makerId}` : "/profile";
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
    } catch (error: any) {
      if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error(error.response.data.message || "알 수 없는 오류가 발생했습니다.");
      }
    }
  },

  patchProfileDreamer: async (payload: {
    image?: string;
    tripTypes?: string[];
    serviceArea?: string[];
  }) => {
    try {
      const response = await api.patch("/profile/update", payload);
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
      const response = await api.patch("/profile/update", payload);
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

  getMakerProfile: async (makerId: string): Promise<MakerProfileResponse | undefined> => {
    try {
      const response = await api.get<MakerProfileResponse, {}>(`/users/maker/${makerId}`);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("존재하지 않은 사이트입니다!");
      }
    }
  },

  getMakers: async (
    orderBy: string,
    serviceArea: string,
    serviceType: string,
    pageParam?: number,
    pageSize?: number,
    keyword?: string,
  ): Promise<MakerResponse> => {
    try {
      const url =
        `/users/makers?page=${pageParam}&pageSize=${pageSize}` +
        `${orderBy ? `&orderBy=${orderBy}` : ""}` +
        `${serviceArea ? `&serviceArea=${serviceArea}` : ""}` +
        `${serviceType ? `&serviceType=${serviceType}` : ""}` +
        `${keyword ? `&keyword=${keyword}` : ""}`;
      const response = await api.get(url);
      return response as MakerResponse;
    } catch (error) {
      console.error("Error fetching makers:", error);
      throw error;
    }
  },
};

export default userService;
