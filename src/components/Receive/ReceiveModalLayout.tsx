import closeIcon from "@public/assets/icon_X.svg";
import Image from "next/image";

interface ModalLayoutProps {
  label: string;
  children: React.ReactNode;
  closeModal: () => void;
}
export default function ReceiveModalLayout({ label, children, closeModal }: ModalLayoutProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mobile:items-end ">
      <div className="bg-white rounded-2xl  px-[24px] py-[32px]  mobile:rounded-b-none mobile:pb-[32px]">
        <div className="flex text-2xl font-semibold justify-between items-center mb-10">
          {label}
          <Image
            src={closeIcon}
            alt="닫기"
            width={36}
            height={36}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
