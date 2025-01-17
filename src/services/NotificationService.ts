import { api } from "./api"

export interface NotificationProps {
    id: string;
    content: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

const notificationService = {
    Notification: async (): Promise<NotificationProps[]> => {
        try {
            const response = await api.get<NotificationProps[], {}>("/notifications");
            return response;
        } catch (error) {
            console.error("알림 get 실패", error);
            throw error;
        }
    },
};

export default notificationService;