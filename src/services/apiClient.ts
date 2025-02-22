import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/utils/tokenUtils";
import authService from "./authService";
import router from "next/router";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 기존 로직 유지
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) { // 동시 요청 들어올 시, 중복으로 refreshToken 요청 방지
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject }); // 이때는 아직 토큰이 재발급 전이니 클라이언트 요청 대기열에 추가
          });
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return apiClient(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = await authService.refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        processQueue(null, token); // 실질적인 요청 처리
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeAccessToken();
        router.push("/login"); // 토큰 재발급 실패 했을때 처리 필요함
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
