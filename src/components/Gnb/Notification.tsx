import Image from "next/image";
import closeIcon from "@public/assets/icon_X.svg";
import NotificationService from "@/services/NotificationService";

export default function Notification({ closeModal }: { closeModal: () => void }) {


  return (
    <>
      <div className="fixed flex top-20 right-16 z-[9999] pc:right-64  tablet:right-20">
        <div className=" bg-color-gray-50 rounded-2xl px-8 py-3 w-[300px] shadow-lg text-2xl semibold border pc:w-[360px]">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2lg">알림</span>
            <Image
              src={closeIcon}
              alt="닫기"
              width={36}
              height={36}
              onClick={closeModal}
              className="cursor-pointer"
            />
            {/* TODO: 알림 API */}
          </div>
        </div>
      </div>
    </>
  );
}
