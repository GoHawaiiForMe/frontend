import closeIcon from "@public/assets/icon_X.svg";
import Image from "next/image";
import { useEffect } from "react";

interface ModalLayoutProps {
  label: string;
  children: React.ReactNode;
  closeModal: () => void;
}
export default function ReceiveModalLayout({ label, children, closeModal }: ModalLayoutProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mobile:items-end overflow-y-scroll pt-[100px] mobile-tablet::pt-0 ">
      <div className="bg-white rounded-2xl  px-[24px] py-[32px]  mobile:rounded-b-none mobile:pb-[32px]">
        <div className="flex text-2xl font-bold justify-between items-center mb-10 tablet:text-2lg tablet:mb-[24px] mobile:mb-[24px] ">
          {label}
          <Image
            src={closeIcon}
            alt="닫기"
            width={36}
            height={36}
            onClick={closeModal}
            className="cursor-pointer tablet:w-[24px] tablet:h-[24px] "
          />
        </div>
        {children}
      </div>
    </div>
  );
}
