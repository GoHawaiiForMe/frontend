import { BAD_REQUEST, CONFLICT } from "@/utils/errorStatus";
import { api } from "./api";
import { ServiceArea } from "@/utils/formatRegion";

export interface Plan {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  tripDate: string;
  tripType: any;
  serviceArea: ServiceArea;
  details: string;
  address?: string;
  status: string;
  assignees: [];
  dreamer: {
    id: string;
    nickName: string;
  };
  quotes?: quoteInfo[];
}

export interface quoteInfo {
  id: string;
  price: number;
  maker: {
    id: string;
    nickName: string;
    image: string;
  };
}

interface PlanResponse {
  totalCount: number; // 전체 플랜 개수
  list: Plan[]; // 여행 플랜 리스트
}

interface StatisticResponse {
  totalCount: number;
  groupByCount: Statistic[];
}

interface Statistic {
  serviceArea: number;
  count: number;
}

interface pageParams {
  page: number;
  pageSize: number;
}

const planService = {
  planRequest: async (data: any) => {
    try {
      const response = await api.post("/plans", data);
      return response;
    } catch (error) {
      console.error("여행 요청 실패", error);
      throw error;
    }
  },

  getPlanList: async ({
    status = [],
    page = 1,
    pageSize = 5,
  }: {
    status?: string[];
    page?: number;
    pageSize?: number;
  }): Promise<PlanResponse> => {
    try {
      let queryString = "";
      const params: string[] = [];

      if (status.length > 0) {
        status.forEach((s) => {
          params.push(`status=${s}`);
        });
      }

      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);
      params.push(`orderBy=RECENT`);

      queryString = params.length > 0 ? `?${params.join("&")}` : "";

      const response = await api.get<PlanResponse, {}>(`/plans/dreamer${queryString}`);

      if (!response) {
        console.warn("데이터가 없습니다. 빈 데이터를 반환합니다.");
        return { totalCount: 0, list: [] }; // 빈 데이터 반환
      }

      return response;
    } catch (error) {
      console.error("여행 조회 실패", error);
      throw error;
    }
  },

  getPlanDetail: async (planId: string): Promise<Plan> => {
    try {
      const response = await api.get<Plan, {}>(`/plans/${planId}`);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        window.location.href = "/404";
        return Promise.reject(new Error("해당 여행 플랜을 찾을 수 없습니다."));
      }
      console.error("여행 데이터 요청 실패", error);
      throw error;
    }
  },

  getPendingPlan: async () => {
    try {
      const response = await api.get<PlanResponse, {}>(`/plans/dreamer?status=PENDING&pageSize=99`);
      return response.list;
    } catch (error) {
      console.error("지정 플랜 조회 실패", error);
    }
  },

  postPlanRequest: async (planId: string, assigneeId: string) => {
    try {
      const response = await api.post(`/plans/${planId}/assign`, { assigneeId });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === CONFLICT) {
        throw new Error("이미 지정 견적을 요청하셨습니다!");
      } else if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("Maker가 서비스하는 지역이 아닙니다.");
      }
    }
  },

  getStatistics: async (serviceArea?: string): Promise<StatisticResponse> => {
    try {
      const queryString = serviceArea ? `?serviceArea=${serviceArea}` : "";
      const response = await api.get<StatisticResponse, Record<string, unknown>>(
        `/plans/groupCount${queryString}`,
      );
      return response;
    } catch (error) {
      console.error("통계 자료 조회 실패", error);
      throw error;
    }
  },

  getReadyToCompletePlan: async (params: pageParams) => {
    try {
      const { page = 1, pageSize = 6 } = params;
      const queryString = `&page=${page}&pageSize=${pageSize}`;
      const response = await api.get<PlanResponse, {}>(
        `/plans/dreamer?readyToComplete=true${queryString}`,
      );
      return response;
    } catch (error) {
      console.error("완료 플랜 조회 실패", error);
    }
  },

  getReviewablePlan: async (params: pageParams) => {
    try {
      const { page = 1, pageSize = 6 } = params;
      const queryString = `&page=${page}&pageSize=${pageSize}`;
      const response = await api.get<PlanResponse, {}>(
        `/plans/dreamer?reviewed=false${queryString}`,
      );
      return response;
    } catch (error) {
      console.error("리뷰 작성 가능 플랜 조회 실패", error);
    }
  },

  deletePlan: async (planId: string) => {
    try {
      const response = await api.delete(`/plans/${planId}`);
      return response;
    } catch (error) {
      console.error("플랜 취소 실패", error);
    }
  },
};

export default planService;
