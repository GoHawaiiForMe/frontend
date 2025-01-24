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
type PlanStatus = "CONFIRMED" | "PENDING";

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
}

const ReceiveRequest = async ({
  isAssigned,
  tripType,
  keyword,
  orderBy,
  page = 1,
  pageSize = 5,
}: RequestParams = {}): Promise<PlanResponse> => {
  try {
    console.log("받은 요청 조회 시작");

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

    params.push(`page=${page}`);
    params.push(`pageSize=${pageSize}`);

    queryString = params.length > 0 ? `?${params.join("&")}` : "";
    console.log("쿼리스트링", queryString);
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    const response = await api.get<PlanResponse, {}>(`/plans/maker${queryString}`);
    console.log("쿼리스트링", queryString);
    console.log("받은 요청 조회 완료", response);

    if (!response) {
      console.log("쿼리스트링", queryString);
      console.warn("데이터가 없습니다. 빈 데이터를 반환합니다.");
      return { totalCount: 0, groupByCount: [], list: [] };
    }

    return response;
  } catch (error) {
    console.error("받은 요청 조회 실패", error);
    throw error;
  }
};

export default ReceiveRequest;
