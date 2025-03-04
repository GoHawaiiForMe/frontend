import { BAD_REQUEST, CONFLICT, NOT_FOUND, FORBIDDEN } from "@/utils/errorStatus";
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
    } catch (error: any) {
      throw error("플랜 목록을 불러오는데 실패했습니다.");
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
      throw error("여행 데이터를 불러오는데 실패했습니다.");
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
    } catch (error: any) {
      throw error("완료 플랜을 불러오는데 실패했습니다.");
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
    } catch (error: any) {
      throw error("리뷰 가능 플랜을 불러오는데 실패했습니다.");
    }
  },

  deletePlan: async (planId: string) => {
    try {
      const response = await api.delete(`/plans/${planId}`);
      return response;
    } catch (error: any) {
      if (error.response?.status === BAD_REQUEST) {
        throw new Error("진행중인 플랜은 삭제할 수 없습니다.");
      } else if (error.response?.status === FORBIDDEN) {
        throw new Error("해당 플랜을 삭제할 권한이 없습니다.");
      }
    }
  },

  completePlan: async (planId: string) => {
    try {
      const response = await api.patch(`/plans/${planId}/complete`);
      return response;
    } catch (error: any) {
      if (error.response?.status === BAD_REQUEST) {
        // 서버에서 응답이 왔을 때 (500, 404 등)
        throw new Error("플랜 완료 요청은 진행중(확정견적이 있는) 상태일 때만 가능합니다.");
      } else if (error.response?.status === NOT_FOUND) {
        throw new Error("해당 플랜을 찾을 수 없습니다.");
      } else if (error.request) {
        // 요청은 갔지만 응답이 없을 때 (네트워크 문제)
        throw new Error("서버로부터 응답이 없습니다. 다시 시도해 주세요.");
      } else {
        // 요청 자체의 문제 (설정 오류 등)
        throw new Error("요청 오류 입니다.");
      }
    }
  },
};

export default planService;
