import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/utils/tokenUtils";
import authService from "./authService";
import router from "next/router";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// request
apiClient.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    
    if (!token) {
      return config;
    }

    const decoded: any = jwtDecode(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeBuffer = 60 * 1000; // 1 minute buffer

    if (expirationTime - currentTime < timeBuffer) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await authService.refreshToken();
          isRefreshing = false;
          processQueue(null, newToken);
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (error) {
          processQueue(error, null);
          removeAccessToken();
          router.push("/login");
          throw error;
        }
      } else {
        // Wait for the token refresh
        try {
          const newToken = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (error) {
          throw error;
        }
      }
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// response
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Keep 401 handler as fallback
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const newToken = await authService.refreshToken();
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(error.config);
      } catch (refreshError) {
        removeAccessToken();
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
