import { api } from "./api";

export interface reviewProps {
  totalCount: number;
  list: Review[];
}

export interface Review {
  id: string;
  owner: OwnerInfo;
  plan: PlanInfo;
  rating: number;
  content: string;
  createdAt: string;
}

interface OwnerInfo {
  nickName: string;
  makerProfile: {
    image: string;
  };
}

interface PlanInfo {
  tripType: any;
  tripDate: string;
  quotes: {
    price: number;
    isAssigned: false;
  };
}

export interface CreateReview {
  makerId: string;
  rating: number;
  content: string;
  planId: string;
}

interface pageParams {
  page: number;
  pageSize: number;
}

const reviewService = {
  createReview: async (reviewData: CreateReview) => {
    try {
      const response = await api.post("/reviews", reviewData);
      return response;
    } catch (error) {
      console.error("리뷰 등록 실패", error);
      throw error;
    }
  },

  getMyReviews: async (params: pageParams): Promise<reviewProps> => {
    try {
      const { page = 1, pageSize = 6 } = params;
      const queryString = `?page=${page}&pageSize=${pageSize}`;
      const response = await api.get<reviewProps, {}>(`/reviews/me${queryString}`);

      return response;
    } catch (error) {
      console.error("리뷰 목록 조회 실패", error);
      throw error;
    }
  },
};

export default reviewService;
