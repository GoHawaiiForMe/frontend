import RequestDetails from "@/components/Receive/RequestDetails";
import Image from "next/image";
import clipshare from "@public/assets/icon_outline.png";
import facebook from "@public/assets/icon_facebook.png";
import kakao from "@public/assets/icon_kakao.png";

export default function QuotationDetail() {
  return (
    <>
      <p className="font-semibold text-2xl py-8 mb-6 ">견적 상세</p>
      <div className="flex justify-between mobile-tablet:flex-col mobile-tablet:gap-6 ">
        <div className=" border grow border-color-line-100 rounded-[16px] p-6 mr-[117px] shadow-md">
          {/* <RequestDetails data={data} onSendQuotation={() => {}} onReject={() => {}} /> */}
        </div>
        <div className=" flex flex-col gap-4 mobile-tablet:pb-6 mobile-tablet:border-b mobile-tablet:border-color-line-100 mobile-tablet:mb-6">
          <p className="text-xl font-semibold tablet:text-lg mobile:text-md whitespace-nowrap">
            견적서 공유하기
          </p>
          <div className="flex items-center gap-4">
            <Image
              src={clipshare}
              alt="clipshare"
              className="shadow-md rounded-[16px] mobile-tablet:w-[40px] mobile-tablet:h-[40px]"
              width={64}
              height={64}
            />
            <Image
              src={facebook}
              alt="facebook"
              className="shadow-md rounded-[16px] mobile-tablet:w-[40px] mobile-tablet:h-[40px]"
              width={64}
              height={64}
            />
            <Image
              src={kakao}
              alt="kakao"
              className="shadow-md rounded-[16px] mobile-tablet:w-[40px] mobile-tablet:h-[40px]"
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10 pb-10 mb-10 border-b border-color-line-100 mobile-tablet:mt-0 mobile-tablet:pb-6 mobile-tablet:mb-6 mobile-tablet:gap-2">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">Maker의 코멘트</p>
        <p className="text-xl medium mobile-tablet:text-xl">성심성의것 해드리겠습니다.</p>
      </div>
      <div className="flex flex-col gap-8 mt-10 pb-10 mb-10 border-b border-color-line-100 mobile-tablet:mt-0 mobile-tablet:pb-6 mobile-tablet:mb-6 mobile-tablet:gap-4">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">견적가</p>
        <p className="text-3xl font-bold mobile-tablet:text-xl">1,000,000원</p>
      </div>
      <div className="flex flex-col gap-10 mobile-tablet:gap-6 mb-[322px] tablet:mb-[72px] mobile:mb-[110px]">
        <p className="text-2xl font-semibold mobile-tablet:text-lg ">플랜 정보</p>
        <div className="flex flex-col gap-4 px-10 py-8 shadow-md bg-color-line-100 rounded-[16px] mobile-tablet:gap-[10px] tablet:px-8 tablet:py-6 mobile-tablet:px-5 mobile-tablet:py-4">
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">견적 요청일</p>
            <p className="text-2lg mobile-tablet:text-md">24.08.26</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">서비스</p>
            <p className="text-2lg mobile-tablet:text-md">맛집탐방형</p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">이용일</p>
            <p className="text-2lg mobile-tablet:text-md">2024.08.26(월) 오전10:00 </p>
          </div>
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">여행지</p>
            <p className="text-2lg mobile-tablet:text-md">서울특별시 강남구</p>
          </div>
          <div className="flex items-center gap-5">
            <p className="w-[110px] text-2lg text-color-gray-300 mobile-tablet:text-md">세부요청사항</p>
            <p className="text-2lg mobile-tablet:text-md">이것저것 해주세요~</p>
          </div>
        </div>
      </div>
    </>
  );
}
