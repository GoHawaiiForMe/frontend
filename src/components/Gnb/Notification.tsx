import Image from "next/image";
import closeIcon from "@public/assets/icon_X.svg";
import NotificationService from "@/services/NotificationService";
import { useEffect, useState } from "react";
import { NotificationProps } from "@/services/NotificationService";
import { formatRelativeTime } from "@/utils/formatDate";

export default function Notification({ closeModal }: { closeModal: () => void }) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await NotificationService.Notification();
        setNotifications(Array.isArray(data) ? data : []);
        console.log(data);
      } catch (error) {
        console.error("알림 데이터를 가져오는데 실패했습니다.", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <div className="fixed top-20 right-16 z-[9999] pc:right-64 tablet:right-20">
        <div className=" bg-color-gray-50 rounded-2xl pl-8 pr-5 py-3 w-[300px] shadow-lg text-2xl semibold border pc:w-[360px]">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2lg">알림</span>
            <Image
              src={closeIcon}
              alt="닫기"
              width={36}
              height={36}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </div>
          <div>
            {notifications.length > 0 ? (
              <ul >
                {notifications.map((notification, index) => (
                  <div>
                    <li key={notification.id}>
                      <p className="text-lg">{notification.content}</p>
                      <p className="text-md text-color-gray-300">{formatRelativeTime(notification.createdAt)}</p>
                      {index < notifications.length - 1 && (
                        <div className="h-0.5 bg-color-line-100 my-4"></div>
                      )}
                    </li>

                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-lg mb-8">새로운 알림이 없습니다.</p>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
