import closeIcon from "@public/assets/icon_X.svg";
import Image from "next/image";

interface ModalLayoutProps {
  label: string;
  children: React.ReactNode;
  closeModal: () => void;
}
export default function ModalLayout({ label, children, closeModal }: ModalLayoutProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className=" bg-white rounded-2xl p-8 w-[608px] text-2xl semibold">
        <div className="flex justify-between items-center mb-10">
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
