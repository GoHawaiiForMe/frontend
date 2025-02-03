import { api } from "./api";

export interface NotificationProps {
  id: string;
  payload: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  event: string;
  content: string;
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
  realTimeNotification: (callback: (notification: NotificationProps) => void) => {
    const eventSource = new EventSource("/notifications/stream");

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      console.log(notification);
      callback(notification);
    };

    eventSource.onopen = () => console.log("✅ SSE 연결 ON");
    eventSource.onerror = (err) => {
      console.error("❌ SSE 연결 ERROR", err);
      eventSource.close();
    };

    return eventSource;
  },
};

export default notificationService;
