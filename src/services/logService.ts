import { api } from "./api";

const logService = {
  metricRequest: async (query: string) => {
    try {
      const response = await api.get(`/api/v1/query`, {
        params: { query },
      });
      return response;
    } catch (error) {
      console.error("Prometheus 데이터 요청 실패", error);
      throw error;
    }
  },
};

export default logService;
