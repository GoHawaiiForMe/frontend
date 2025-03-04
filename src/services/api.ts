import apiClient from "./apiClient";
import { AxiosRequestConfig } from "axios";

export const api = {
  get: async <T, P extends Record<string, unknown>>(url: string, params?: P): Promise<T> => {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },

  post: async <T, D>(
    url: string,
    data?: D,
    withCredentials: boolean = false,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      withCredentials,
    };
    const response = await apiClient.post<T>(url, data, axiosConfig);
    return response.data;
  },
  patch: async <T, D extends Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    const response = await apiClient.patch<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};
