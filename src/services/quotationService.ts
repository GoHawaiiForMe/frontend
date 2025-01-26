import { api } from "./api";
import { PlanItem } from "./RequestService";
import { UserInfo } from "./userService";

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

    console.log("쿼리스트링", queryString);
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
