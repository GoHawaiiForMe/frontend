import Image from "next/image";
import CustomerInput from "@/components/Receive/CustomerInput";
import CheckFilter from "../components/Receive/CheckFilter";
import FastDropdown from "@/components/Receive/FastDropdown";
import RequestDetails from "@/components/Receive/RequestDetails";
import writing from "@public/assets/icon_writing.png";
import mobilefilter from "@public/assets/icon_filterbutton.png";
import ModalFilter from "@/components/Receive/ModalFilter";
import { useState } from "react";
import CheckFilter2 from "@/components/Receive/CheckFilter2";

export default function Receive() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="mt-[88px]">
      <p className="font-semibold text-[24px] py-[32px] ">받은 요청</p>
      <div className="flex gap-[107px] ">
        <CheckFilter2 />
        <div className="w-full">
          <CustomerInput />
          <div className="flex justify-between items-center mt-[24px] mb-[32px]">
            <p>전체 (totalcount)건</p>
            <div className="flex items-center gap-[4px]">
              <FastDropdown />
              <Image
                src={mobilefilter}
                className="mobile-tablet:block pc:hidden"
                alt="filter"
                width={32}
                height={32}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
          <div className="border border-color-line-100 rounded-[16px] pt-[20px] pb-[12px] px-[24px] shadow-md mobile:w-[328px] mobile:mx-[auto] mobile:px-[14px] mobile:py-[16px]">
            <RequestDetails />
            <div className="flex justify-between items-center gap-[11px] mobile-tablet:gap-[8px] mobile:flex-col mobile:justify-normal">
              <button className="flex justify-center items-center gap-[10px] bg-color-blue-300 rounded-[16px] w-[448px] h-[64px] mobile:w-[300px] mobile:h-[48px] tablet:w-[280px] tablet:h-[48px]">
                <p className="text-white font-semibold text-[20px] leading-[32px] whitespace-nowrap">견적 보내기</p>
                <Image src={writing} alt="send" width={24} height={24} />
              </button>
              <button className="bg-white rounded-[16px] border border-color-blue-300 w-[448px] h-[64px] text-color-blue-300 font-semibold text-[20px] leading-[32px] mobile:w-[300px] mobile:h-[48px] tablet:w-[280px] tablet:h-[48px]">
                반려
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <ModalFilter closeModal={() => setIsOpen(false)} />}
    </div>
  );
}
