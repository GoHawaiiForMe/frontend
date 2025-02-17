import { api } from "./api";

interface MakerInfo {
  nickName: string;
  image: string;
  gallery: string;
  serviceTypes: string[];
  isFollowed: boolean;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}
export interface QuotationDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  content: string;
  maker: MakerInfo;
  isConfirmed: false;
  isAssigned: false;
}

export interface QuotationResponse {
  totalCount: number;
  list: QuotationDetail[];
}

interface QuotationParams {
  planId?: string;
  page?: number;
  pageSize?: number;
}

export const QuotationServiceDreamer = {
  getQuotations: async ({
    page = 1,
    pageSize = 10,
    planId = "",
  }: QuotationParams = {}): Promise<QuotationResponse> => {
    try {
      let queryString = "";
      const params: string[] = [];

      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);

      queryString = params.length > 0 ? `?${params.join("&")}` : "";

      const response = await api.get<QuotationResponse, any>(
        `/plans/${planId}/quotes${queryString}`,
      );

      if (!response) {
        return { totalCount: 0, list: [] };
      }

      return response;
    } catch (error) {
      console.error("견적 목록 조회 실패", error);
      throw error;
    }
  },

  getQuotationDetail: async (planId: string): Promise<QuotationDetail> => {
    try {
      const response = await api.get<QuotationDetail, {}>(`/plans/${planId}/qoutes`);
      return response;
    } catch (error) {
      console.error("견적 상세 조회 실패", error);
      throw error;
    }
  },

  confirmQuotation: async (payload: { isConfirmed: boolean }, quoteId: string) => {
    try {
      const response = await api.patch(`quotes/${quoteId}/confirm`, payload);
      return response;
    } catch (error) {
      console.error("견적 확정에 실패 하였습니다.", error);
      throw error;
    }
  },
};
