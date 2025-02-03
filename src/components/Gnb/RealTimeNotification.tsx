import { useEffect } from "react";
import notificationService, { NotificationProps } from "@/services/notificationService";

interface RealTimeNotificationProps {
  setRealTimeNotifications: React.Dispatch<React.SetStateAction<NotificationProps[]>>;
}

export default function RealTimeNotification({
  setRealTimeNotifications,
}: RealTimeNotificationProps) {
  useEffect(() => {
    const eventSource = notificationService.realTimeNotification(
      (notification: NotificationProps) => {
        setRealTimeNotifications((prev) => [...prev, notification]);
      },
    );

    return () => {
      eventSource.close();
      console.log("SSE 연결 종료");
    };
  }, [setRealTimeNotifications]);

  return null;
}
