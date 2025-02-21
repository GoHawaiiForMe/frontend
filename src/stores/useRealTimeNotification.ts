import { useState, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from "@/utils/tokenUtils";

const useRealTimeNotification = () => {
  const [realTimeNotifications, setRealTimeNotifications] = useState<
    { id: string; content: string; timestamp: number }[]
  >([]);
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);

  const connectToSSE = () => {
    const accessToken = getAccessToken();
    const newEventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/stream`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    newEventSource.onopen = () => console.log("SSE 연결 ON ✅");

    newEventSource.onerror = (err) => {
      console.error("SSE 연결 ERROR ❌", err);
      newEventSource.close();

      setTimeout(() => {
        console.log("♻️ SSE 재연결 시도...");
        connectToSSE();
      }, 5000);
    };

    newEventSource.onmessage = (event) => {
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

    setEventSource(newEventSource);
  };

  useEffect(() => {
    connectToSSE();

    return () => {
      eventSource?.close();
    };
  }, []);

  return { realTimeNotifications };
};

export default useRealTimeNotification;
