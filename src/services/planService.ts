import { api } from "./api";

export interface Plan {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  tripDate: string;
  tripType: string;
  serviceArea: string;
  details: string;
  address?: string;
  status: string;
  assignees: [];
  dreamer: {};
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
    } catch (error) {
      console.error("여행 데이터 요청 실패", error);
      throw error;
    }
  },
  getPendingPlan: async () => {
    try {
      const response = await api.get<PlanResponse, {}>(`/plans/dreamer?status=PENDING`);
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
      if (error.response && error.response.status === 409) {
        throw new Error("이미 지정 견적을 요청하셨습니다!");
      }
    }
  },
  getStatistics: async (serviceArea?: string): Promise<StatisticResponse> => {
    try {
      const queryString = serviceArea ? `?serviceArea=${serviceArea}` : "";
      console.log(queryString);
      const response = await api.get<StatisticResponse, Record<string, unknown>>(
        `/plans/groupCount${queryString}`,
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("통계 자료 조회 실패", error);
      throw error;
    }
  },
};

export default planService;
