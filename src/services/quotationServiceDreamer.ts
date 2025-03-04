import { FORBIDDEN } from "@/utils/errorStatus";
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
    } catch (error: any) {
      if (error.response && error.response?.status === FORBIDDEN) {
        throw new Error("해당 견적서의 Dreamer만 조회할 수 있습니다.");
      }
      throw new Error("견적서를 불러 오는 중 오류가 발생했습니다.");
    }
  },

  getQuotationDetail: async (planId: string): Promise<QuotationDetail> => {
    try {
      const response = await api.get<QuotationDetail, {}>(`/plans/${planId}/quotes`);
      return response;
    } catch (error: any) {
      if (error.response && error.response?.status === FORBIDDEN) {
        throw new Error("해당 견적서의 Maker와 Dreamer만 조회할 수 있습니다.");
      }
      throw new Error("견적서를 불러 오는 중 오류가 발생했습니다.");
    }
  },

  confirmQuotation: async (payload: { isConfirmed: boolean }, quoteId: string) => {
    try {
      const response = await api.patch(`quotes/${quoteId}/confirm`, payload);
      return response;
    } catch (error: any) {
      if (error.response && error.response?.status === FORBIDDEN) {
        throw new Error("해당 견적서의 Dreamer만 확정할 수 있습니다.");
      }
    }
  },
};
