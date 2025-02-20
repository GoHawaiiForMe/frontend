import axios from "axios";
import { getAccessToken, setAccessToken } from "@/utils/tokenUtils";
import authService from "./authService";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response?.status === 401) {
      try {
        const newAccessToken = await authService.refreshToken();
        alert("새 토큰 발급!");
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      } catch (error: any) {
        console.error("토큰 갱신 실패", error);

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
