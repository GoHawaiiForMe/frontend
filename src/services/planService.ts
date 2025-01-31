import { api } from "./api";

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
};

export default planService;
