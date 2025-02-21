import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/utils/tokenUtils";
import authService from "./authService";
import router from "next/router";
import useAuthStore from "@/stores/useAuthStore";

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
        removeAccessToken();
        router.push("/login");
        alert("새로 로그인해주세요!");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
