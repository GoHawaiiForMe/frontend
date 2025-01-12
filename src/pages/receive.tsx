import Image from "next/image";
import CustomerInput from "@/components/Receive/CustomerInput";
import CheckFilter from "../components/Receive/CheckFilter";
import FastDropdown from "@/components/Receive/FastDropdown";
import RequestDetails from "@/components/Receive/RequestDetails";
import writing from "@public/assets/icon_writing.png";
import mobilefilter from "@public/assets/icon_filterbutton.png";
import ModalFilter from "@/components/Receive/ModalFilter";
import { useState } from "react";
import Quotation from "@/components/Receive/Quotation";
import ReceiveModalLayout from "@/components/Receive/ReceiveModalLayout";
import Reject from "@/components/Receive/Reject";

export default function Receive() {
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [quotationIsOpen, setQuotationIsOpen] = useState<boolean>(false);
  const [rejectIsOpen, setRejectIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className=" mx-[auto] mobile:w-[327px] mobile:mx-[auto] tablet:w-[600px] tablet:mx-[auto] overflow-hidden ">
        <p className="font-semibold text-4 py-8 ">받은 요청</p>
      </div>
      <div className="flex gap-[107px] ">
        <CheckFilter />
        <div className="w-full ">
          <CustomerInput />
          <div className="flex justify-between items-center w-[955px] mt-4 mb-8 tablet:w-[600px] tablet:mx-[auto] mobile:w-[327px] mobile:mx-[auto]">
            <p>전체 (totalcount)건</p>
            <div className="flex items-center gap-[4px]">
              <FastDropdown />
              <Image
                src={mobilefilter}
                className="mobile-tablet:block pc:hidden"
                alt="filter"
                width={32}
                height={32}
                onClick={() => setFilterIsOpen(true)}
              />
            </div>
          </div>
          <div className="border border-color-line-100 w-[955px] rounded-[16px] pt-[20px] pb-[12px] px-4 shadow-md tablet:w-[600px] tablet:mx-[auto] mobile:w-[328px] mobile:mx-[auto] mobile:px-[14px] mobile:py-[16px]">
            <RequestDetails />
            <div className="flex justify-between items-center gap-[11px] mobile-tablet:gap-[8px] mobile:flex-col mobile:justify-normal">
              <button
                onClick={() => setQuotationIsOpen(true)}
                className="flex justify-center items-center gap-[10px] bg-color-blue-300 rounded-[16px] w-[448px] h-[64px] mobile:w-[300px] mobile:h-[48px]  tablet:w-[280px] tablet:h-[48px]"
              >
                <p className="text-white font-semibold text-xl whitespace-nowrap">견적 보내기</p>
                <Image src={writing} alt="send" width={24} height={24} />
              </button>
              <button
                onClick={() => setRejectIsOpen(true)}
                className="bg-white rounded-[16px] border border-color-blue-300 w-[448px] h-[64px] text-color-blue-300 font-semibold text-xl mobile:w-[300px] mobile:h-[48px] tablet:w-[280px] tablet:h-[48px]"
              >
                반려
              </button>
            </div>
          </div>
        </div>
      </div>
      {filterIsOpen && <ModalFilter closeModal={() => setFilterIsOpen(false)} />}
      {quotationIsOpen && (
        <ReceiveModalLayout label="견적 보내기" closeModal={() => setQuotationIsOpen(false)}>
          <Quotation />
        </ReceiveModalLayout>
      )}
      {rejectIsOpen && (
        <ReceiveModalLayout label="요청 반려하기" closeModal={() => setRejectIsOpen(false)}>
          <Reject />
        </ReceiveModalLayout>
      )}
    </div>
  );
}
