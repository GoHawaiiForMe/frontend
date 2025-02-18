import { api } from "./api";
import { PlanItem } from "./requestService";
import { UserInfo } from "./userService";
import { FORBIDDEN, NOT_FOUND } from "@/utils/errorStatus";

export interface QuotationItem extends PlanItem {
  id: string;
  price: number;
  content: string;
  plan: PlanItem;
  maker: UserInfo;
  isConfirmed: boolean;
  isAssigned: boolean;
}

export interface QuotationResponse {
  totalCount: number;
  list: QuotationItem[];
}

interface QuotationParams {
  isSent?: boolean;
  page?: number;
  pageSize?: number;
  planId?: string;
}

export const getQuotations = async ({
  isSent,
  page = 1,
  pageSize = 10,
}: QuotationParams = {}): Promise<QuotationResponse> => {
  try {
    let queryString = "";
    const params: string[] = [];

    if (typeof isSent === "boolean") {
      params.push(`isSent=${isSent}`);
    }
    params.push(`page=${page}`);
    params.push(`pageSize=${pageSize}`);

    queryString = params.length > 0 ? `?${params.join("&")}` : "";

    const response = await api.get<QuotationResponse, any>(`/quotes${queryString}`);

    if (!response) {
      return { totalCount: 0, list: [] };
    }

    return response;
  } catch (error) {
    console.error("견적 목록 조회 실패", error);
    throw error;
  }
};

export const getQuotationDetail = async (id: string): Promise<QuotationItem> => {
  try {
    const response = await api.get<QuotationItem, {}>(`/quotes/${id}`);
    return response;
  } catch (error: any) {
    if (error.response?.status === NOT_FOUND) {
      throw new Error("존재하지 않는 견적입니다.");
    }
    if (error.response?.status === FORBIDDEN) {
      throw new Error("잘못된 접근입니다.");
    }
    console.error("견적 상세 조회 실패", error);
    throw error;
  }
};
