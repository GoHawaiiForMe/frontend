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
    <div className="mobile-tablet::pt-0 fixed inset-0 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-50 pt-[100px] mobile:items-end">
      <div className="rounded-2xl bg-white px-[24px] py-[32px] mobile:rounded-b-none mobile:pb-[32px]">
        <div className="mb-10 flex items-center justify-between text-2xl font-bold mobile:mb-[24px] tablet:mb-[24px] tablet:text-2lg">
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
