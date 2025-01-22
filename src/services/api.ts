import apiClient from "./apiClient";

export const api = {
  get: async <T, P extends Record<string, unknown>>(url: string, params?: P): Promise<T> => {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },

  post: async <T, D extends Record<string, unknown>>(
    url: string,
    data?: D,
    withCredentials: boolean = false,
  ): Promise<T> => {
    const config = withCredentials ? { withCredentials: true } : {};
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  patch: async <T, D extends Record<string, unknown>>(url: string, data?: D): Promise<T> => {
    const response = await apiClient.patch<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};
