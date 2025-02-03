/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./api";

// 사용자 기본 정보 타입
interface User {
  id: string;
  role: "DREAMER" | "MAKER";
  nickName: string;
  coconut: number;
}

// 여행 타입
type TripType = "CULTURE" | "SHOPPING" | "FESTIVAL" | "ACTIVITY" | "FOOD_TOUR";

// 여행 상태
export type PlanStatus = "CONFIRMED" | "PENDING" | "COMPLETED";

// 서비스 지역
type ServiceArea =
  | "SEOUL"
  | "BUSAN"
  | "INCHEON"
  | "DAEGU"
  | "DAEJEON"
  | "GWANGJU"
  | "ULSAN"
  | "SEJONG"
  | "GYEONGGI"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "JEONBUK"
  | "JEONNAM"
  | "GYEONGBUK"
  | "GYEONGNAM"
  | "JEJU";

// 그룹별 카운트 타입
interface GroupCount {
  tripType: TripType;
  count: number;
}

// 플랜 아이템 타입
export interface PlanItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  tripDate: string;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  status: PlanStatus;
  assignees: User[];
  dreamer: User;
}

// 전체 응답 타입
export interface PlanResponse {
  totalCount: number;
  groupByCount: GroupCount[];
  list: PlanItem[];
}

type OrderBy = "RECENT" | "SCHEDULE_FIRST";

interface RequestParams {
  isAssigned?: boolean;
  tripType?: string[];
  keyword?: string;
  orderBy?: OrderBy;
  page?: number;
  pageSize?: number;
  id?: string;
}

const ReceiveRequest = async ({
  isAssigned,
  tripType,
  keyword,
  orderBy,
  page = 1,
  pageSize = 5,
  id,
}: RequestParams = {}): Promise<PlanResponse> => {
  try {
    let queryString = "";
    const params: string[] = [];

    if (isAssigned) {
      params.push(`isAssigned=${isAssigned}`);
    }

    if (tripType && tripType.length > 0) {
      tripType.forEach((type) => {
        params.push(`tripType=${type}`);
      });
    }

    if (keyword) {
      params.push(`keyword=${encodeURIComponent(keyword)}`);
    }

    if (orderBy) {
      params.push(`orderBy=${orderBy}`);
    }

    if (id) {
      params.push(`id=${id}`);
    }

    params.push(`page=${page}`);
    params.push(`pageSize=${pageSize}`);

    queryString = params.length > 0 ? `?${params.join("&")}` : "";

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    const response = await api.get<PlanResponse, {}>(`/plans/maker${queryString}`);

    if (!response) {
      console.warn("데이터가 없습니다. 빈 데이터를 반환합니다.");
      return { totalCount: 0, groupByCount: [], list: [] };
    }

    return response;
  } catch (error: any) {
    console.error("받은 요청 조회 실패", error);
    throw error;
  }
};

interface QuoteRequest {
  price: number;
  content: string;
}

const submitQuote = async (
  planId: string,
  quoteData: QuoteRequest,
): Promise<{ success: boolean; message: string }> => {
  try {
    await api.post<QuoteRequest, {}>(`/plans/${planId}/quotes`, quoteData);
    return { success: true, message: "견적이 성공적으로 보내졌습니다." };
  } catch (error: any) {

    if (error.response?.status === 409) {
      return { success: false, message: "이미 제출한 견적입니다." };
    } else if (error.response?.status === 404 || error.response?.status === 403) {
      return { success: false, message: "잘못된 접근입니다." };
    }
    return { success: false, message: "견적 보내기에 실패했습니다. 다시 시도해주세요." };
  }
};

const rejectRequest = async (planId: string): Promise<{ success: boolean; message: string }> => {
  try {
    await api.delete<{}>(`/plans/${planId}/assign`);
    return { success: true, message: "요청이 반려되었습니다." };
  } catch (error: any) {

    if ([400, 403, 404].includes(error.response?.status)) {
      return { success: false, message: "잘못된 방식으로 접근하셨습니다." };
    }
    return { success: false, message: "요청 반려에 실패했습니다." };
  }
};

export { submitQuote, rejectRequest };

export default ReceiveRequest;

export const getPlanDetail = async (planId: string): Promise<PlanItem> => {
  try {
    const response = await api.get<PlanItem, {}>(`/plans/${planId}`);
    return response;
  } catch (error: any) {
    console.error("플랜 상세 조회 실패", error);
    throw error;
  }

};
