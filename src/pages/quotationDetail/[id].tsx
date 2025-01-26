// import RequestDetails from "@/components/Receive/RequestDetails";
import Image from "next/image";
import clipshare from "@public/assets/icon_outline.png";
import facebook from "@public/assets/icon_facebook.png";
import kakao from "@public/assets/icon_kakao.png";

export default function QuotationDetail() {
  return (
    <>
      <p className="mb-6 py-8 text-2xl font-semibold">견적 상세</p>
      <div className="flex justify-between mobile-tablet:flex-col mobile-tablet:gap-6">
        <div className="mr-[117px] grow rounded-[16px] border border-color-line-100 p-6 shadow-md">
          {/* <RequestDetails /> */}
        </div>
        <div className="flex flex-col gap-4 mobile-tablet:mb-6 mobile-tablet:border-b mobile-tablet:border-color-line-100 mobile-tablet:pb-6">
          <p className="whitespace-nowrap text-xl font-semibold mobile:text-md tablet:text-lg">
            견적서 공유하기
          </p>
          <div className="flex items-center gap-4">
            <Image
              src={clipshare}
              alt="clipshare"
              className="rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
            />
            <Image
              src={facebook}
              alt="facebook"
              className="rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
            />
            <Image
              src={kakao}
              alt="kakao"
              className="rounded-[16px] shadow-md mobile-tablet:h-[40px] mobile-tablet:w-[40px]"
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
      <div className="mb-10 mt-10 flex flex-col gap-4 border-b border-color-line-100 pb-10 mobile-tablet:mb-6 mobile-tablet:mt-0 mobile-tablet:gap-2 mobile-tablet:pb-6">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">Maker의 코멘트</p>
        <p className="medium text-xl mobile-tablet:text-xl">성심성의것 해드리겠습니다.</p>
      </div>
      <div className="mb-10 mt-10 flex flex-col gap-8 border-b border-color-line-100 pb-10 mobile-tablet:mb-6 mobile-tablet:mt-0 mobile-tablet:gap-4 mobile-tablet:pb-6">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">견적가</p>
        <p className="text-3xl font-bold mobile-tablet:text-xl">1,000,000원</p>
      </div>
      <div className="mb-[322px] flex flex-col gap-10 mobile:mb-[110px] tablet:mb-[72px] mobile-tablet:gap-6">
        <p className="text-2xl font-semibold mobile-tablet:text-lg">플랜 정보</p>
        <div className="flex flex-col gap-4 rounded-[16px] bg-color-line-100 px-10 py-8 shadow-md tablet:px-8 tablet:py-6 mobile-tablet:gap-[10px] mobile-tablet:px-5 mobile-tablet:py-4">
          <div className="flex items-center gap-8">
            <p className="w-[100px] text-2lg text-color-gray-300 mobile-tablet:text-md">
              견적 요청일
            </p>
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
            <p className="w-[110px] text-2lg text-color-gray-300 mobile-tablet:text-md">
              세부요청사항
            </p>
            <p className="text-2lg mobile-tablet:text-md">이것저것 해주세요~</p>
          </div>
        </div>
      </div>
    </>
  );
}
