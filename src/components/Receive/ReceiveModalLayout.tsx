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
    <div className="mobile-tablet::pt-0 mobile-tablet:pb-0 fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50 pb-[30px] pt-[100px] mobile:items-end">
      <div className="rounded-2xl bg-white px-[24px] py-[32px] mobile:rounded-b-none mobile:pb-[32px]">
        <div className=" flex items-center justify-between text-2xl font-bold tablet:text-2lg">
          {label}
          <Image
            src={closeIcon}
            alt="닫기"
            width={36}
            height={36}
            onClick={closeModal}
            className="cursor-pointer tablet:h-[24px] tablet:w-[24px]"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
