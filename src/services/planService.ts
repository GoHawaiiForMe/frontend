import { api } from "./api"

interface PlanRequestProps {
    "title": string;
    "tripDate": string;
    "tripType": string;
    "serviceArea": string;
    "details": string;
    "address": string;
    [key: string]: unknown;
}

const planService = {
    planRequest: async (data: PlanRequestProps) => {
        try {
            const response = await api.post("/plans", data);
            return response;
        }
        catch (error) {
            console.error("여행 요청 실패", error);
            throw error;
        }
    },
}

export default planService;