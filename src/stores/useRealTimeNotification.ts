import { useState, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill"; // Polyfill 사용

const useRealTimeNotification = () => {
  const [realTimeNotifications, setRealTimeNotifications] = useState<
    { id: string; content: string; timestamp: number }[]
  >([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/stream`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    eventSource.onopen = () => console.log("SSE 연결 ON ✅");

    eventSource.onerror = (err) => {
      console.error("SSE 연결 ERROR ❌", err);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      const notification = event.data;

      const newNotificationObject = {
        id: new Date().toISOString(),
        content: notification,
        timestamp: Date.now(),
      };

      setRealTimeNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotificationObject,
      ]);

      setTimeout(() => {
        setRealTimeNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== newNotificationObject.id),
        );
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { realTimeNotifications };
};

export default useRealTimeNotification;
