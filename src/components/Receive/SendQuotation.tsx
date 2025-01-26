import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";
import { useState } from "react";

export default function SendQuotation() {
  const [isRejected, setIsRejected] = useState<boolean>(false);

  const handleReject = () => {
    setIsRejected(true);
  };

  return (
    <>
      <div className="relative mb-8 flex flex-col rounded-[16px] border border-color-line-100 px-6 pb-3 pt-5 shadow-md">
        <div className="mb-4 flex items-center justify-between text-xs text-color-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-[4px] bg-color-blue-100 p-1">
              <Image src={iconBox} alt="box" width={24} height={24} className="h-5 w-5" />
              <p className="text-lg font-semibold text-color-blue-300 mobile:text-sm">
                축제 참여형
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-[4px] bg-color-red-100 p-1">
              <Image src={iconDocument} alt="document" width={24} height={24} className="h-5 w-5" />
              <p className="text-lg font-semibold text-color-red-200 mobile:text-sm">
                지정 견적 요청
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold">일본도쿄여행 혼자서 외롭게 다녀오실분~</p>
          <p className="mb-[18px] border-b border-color-line-200 pb-[18px] text-md font-medium">
            김인서 고객님
          </p>
          <div className="flex flex-col gap-1 mobile:grid mobile:grid-cols-2 mobile:gap-0 tablet:flex-row">
            <div className="flex items-center gap-1 mobile:col-span-2 mobile:mb-2">
              <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-1 text-2lg font-normal text-color-gray-500 mobile:text-md">
                여행일
              </p>
              <p className="medium text-2lg text-color-black-300 mobile:text-md">2024.07.01(월)</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="whitespace-nowrap rounded-[4px] bg-color-background-400 px-[6px] py-1 text-2lg font-normal text-color-gray-500 mobile:text-md">
                여행지
              </p>
              <p className="whitespace-nowrap text-2lg font-medium text-color-black-300 mobile:text-md">
                서울 강남구
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <p className="medium text-2lg">견적 금액</p>
            <p className="text-2xl font-bold">1,000,000원</p>
          </div>
        </div>
        <button onClick={handleReject}>임시 반려요청</button>
        {isRejected && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-[16px] bg-color-black-400 text-white opacity-50">
            반려된 요청이에요
          </div>
        )}
      </div>
    </>
  );
}
