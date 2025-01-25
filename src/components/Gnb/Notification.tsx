import Image from "next/image";
import closeIcon from "@public/assets/icon_X.svg";
import notificationService, { NotificationProps } from "@/services/notificationService";
import { formatRelativeTime } from "@/utils/formatDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getNotification = () => {
  const notificationData = notificationService.getNotification();
  return notificationData;
};

const readNotification = (notificationId: string) => {
  return notificationService.readNotification(notificationId);
};

const tripTypeMap: Record<string, string> = {
  FOOD_TOUR: "맛집 탐방형",
  SHOPPING: "기념품/쇼핑형",
  RELAXATION: "휴양형",
  CULTURE: "문화/역사탐방형",
  ACTIVITY: "액티비티/탐험형",
  FESTIVAL: "축제참여형",
};

const getTripType = (tripType: string): string => {
  return tripTypeMap[tripType] || "알 수 없는 여행 타입";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNotificationMessage = (event: string, payload: any) => {
  switch (event) {
    case "ARRIVE_REQUEST":
      return (
        <>
          {payload.nickName} Dreamer가
          <span className="text-color-red-200"> {getTripType(payload.tripType)}</span>
          <span className="text-color-blue-300"> 지정견적</span>을 요청했어요.
        </>
      );
    case "CONFIRM_REQUEST":
      return (
        <>
          {payload.nickName} Dreamer의 견적이 <span className="text-color-blue-300">확정</span>
          되었어요.
        </>
      );
    case "SCHEDULE":
      return (
        <>
          내일은 <span className="text-color-red-200">{payload.planTitle}</span>
          <span className="text-color-blue-300"> 여행 예정일</span>
          이에요.
        </>
      );
    case "ARRIVE_QUOTE":
      return (
        <>
          {payload.nickName} Maker의
          <span className="text-color-red-200"> {getTripType(payload.tripType)}</span>
          <span className="text-color-blue-300"> 견적</span>이 도착했어요.
        </>
      );
    case "CONFIRM_QUOTE":
      return (
        <>
          {payload.nickName} Maker의 견적이 <span className="text-color-blue-300">확정</span>
          되었어요.
        </>
      );

    default:
      return <>알 수 없는 이벤트입니다.</>;
  }
};

export default function Notification({ closeModal }: { closeModal: () => void }) {
  const { data: initialNotificationData = [], isLoading } = useQuery<NotificationProps[]>({
    queryKey: ["notificationData"],
    queryFn: getNotification,
  });

  const [notificationData, setNotificationData] =
    useState<NotificationProps[]>(initialNotificationData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patchNotiMutation = useMutation<NotificationProps, any, string>({
    mutationFn: readNotification,
    onSuccess: (notification) => {
      setNotificationData((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleRead = async (notificationId: string) => {
    patchNotiMutation.mutate(notificationId);
  };

  useEffect(() => {
    if (!isLoading && initialNotificationData.length > 0) {
      setNotificationData(initialNotificationData);
    }
  }, [isLoading, initialNotificationData]);

  return (
    <>
      <div className="fixed right-16 top-20 z-[9999] tablet:right-20 pc:right-64">
        <div className="semibold w-[300px] rounded-2xl border bg-color-gray-50 py-3 text-2xl shadow-lg pc:w-[360px]">
          <div className="flex items-center justify-between pl-8 pr-5">
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
          {isLoading ? (
            <p className="mb-8 px-5 text-lg">로딩 중...</p>
          ) : notificationData.length === 0 ? (
            <p className="mb-8 px-5 text-lg">새로운 알림이 없습니다.</p>
          ) : (
            <ul>
              {notificationData.map((notification, index) => (
                <div key={notification.id}>
                  <li
                    onClick={() => handleRead(notification.id)}
                    className={`cursor-pointer pt-4 ${notification.isRead ? "bg-[#f1f1f1]" : "bg-color-gray-50"}`}
                  >
                    <p className="px-5 text-lg">
                      {getNotificationMessage(notification.event, notification.payload)}
                    </p>
                    <p className="px-5 pb-4 text-md text-color-gray-300">
                      {formatRelativeTime(notification.createdAt)}
                    </p>

                    {index < notificationData.length - 1 && (
                      <div className="h-0.5 bg-color-line-100"></div>
                    )}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
