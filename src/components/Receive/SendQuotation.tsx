import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";
import { useState } from "react";

export default function SendQuotation() {
  const [isRejected, setIsRejected] = useState<boolean>(false);
  
  return (
    <>
      <div className="flex flex-col mb-8 border px-6 pt-5 pb-3 rounded-[16px] border-color-line-100 shadow-md relative">
        <div className="flex justify-between items-center text-xs text-color-gray-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-color-blue-100 rounded-[4px] p-1">
              <Image src={iconBox} alt="box" width={24} height={24} className="w-5 h-5" />
              <p className="text-lg font-semibold  text-color-blue-300 mobile:text-sm">
                축제 참여형
              </p>
            </div>
            <div className="flex items-center gap-1 bg-color-red-100 rounded-[4px] p-1">
              <Image src={iconDocument} alt="document" width={24} height={24} className="w-5 h-5" />
              <p className="text-lg font-semibold  text-color-red-200 mobile:text-sm">
                지정 견적 요청
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold">일본도쿄여행 혼자서 외롭게 다녀오실분~</p>
          <p className="text-md font-medium pb-[18px] border-b border-color-line-200 mb-[18px] ">
            김인서 고객님
          </p>
          <div className="flex flex-col tablet:flex-row gap-1 mobile:grid mobile:grid-cols-2 mobile:gap-0">
            <div className="flex items-center gap-1 mobile:col-span-2 mobile:mb-2">
              <p className="text-2lg font-normal text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-1 whitespace-nowrap mobile:text-md">
                여행일
              </p>
              <p className="text-2lg medium text-color-black-300 mobile:text-md">2024.07.01(월)</p>
            </div>
            <div className="flex items-center gap-3 ">
              <p className="text-2lg font-normal text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-1 whitespace-nowrap mobile:text-md">
                여행지
              </p>
              <p className="text-2lg font-medium whitespace-nowrap text-color-black-300 mobile:text-md">
                서울 강남구
              </p>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 mt-4">
            <p className="text-2lg medium ">견적 금액</p>
            <p className="text-2xl font-bold ">1,000,000원</p>
          </div>
        </div>
       {isRejected && (<div className="text-white rounded-[16px] top-0 left-0 absolute w-full h-full  bg-color-black-400 opacity-50 flex items-center justify-center">
          반려된 요청이에요
        </div>)}
      </div>
    </>
  );
}
