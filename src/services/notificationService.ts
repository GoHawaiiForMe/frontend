import { api } from "./api";

export interface NotificationProps {
  id: string;
  payload: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  event: string;
}

const notificationService = {
  getNotification: async (): Promise<NotificationProps[]> => {
    try {
      const response = await api.get<NotificationProps[], Record<string, unknown>>(
        "/notifications",
      );
      return response;
    } catch (error) {
      console.error("알림 get 실패", error);
      throw error;
    }
  },
  readNotification: async (notificationId: string) => {
    try {
      const response = await api.patch<NotificationProps, Record<string, unknown>>(
        `/notifications/${notificationId}`,
        {
          isRead: true,
        },
      );
      return response;
    } catch (error) {
      console.error("알림 patch 실패", error);
      throw error;
    }
  },
};

export default notificationService;
