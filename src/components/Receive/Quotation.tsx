import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";
import { useState } from "react";

export default function Quotation() {
  const [price, setPrice] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const isButtonEnabled = price !== "" && comment.length >= 10;

  return (
    <>
      <div>
        <div className="flex  items-center gap-[12px] ">
          <div className="flex items-center gap-[4px] bg-color-blue-100 rounded-[4px] p-[4px]">
            <Image src={iconBox} alt="box" width={24} height={24} className="w-[20px] h-[20px]" />
            <p className="text-[16px] font-semibold leading-[26px] text-color-blue-300 mobile:text-sm">
              축제 참여형
            </p>
          </div>
          <div className="flex items-center gap-[4px] bg-color-red-100 rounded-[4px] p-[4px]">
            <Image
              src={iconDocument}
              alt="document"
              width={24}
              height={24}
              className="w-[20px] h-[20px]"
            />
            <p className="text-[16px] font-semibold leading-[26px] text-color-red-200 mobile:text-sm">
              지정 견적 요청
            </p>
          </div>
        </div>
        <div className="mt-[24px] py-[24px] border border-color-line-200 rounded-[8px] mb-[32px] w-[560px] tablet:border-none tablet:mt-[24px] tablet:py-[10px] tablet:w-[327px] mobile:mt-[24px] mobile:py-[10px] mobile:w-[327px] mobile:border-none">
          <p className="text-2xl px-[18px] font-semibold tablet:text-2lg mb-[8px] tablet:pl-0 mobile:px-0 mobile:text-2lg">
            일본도쿄여행 진짜 축제 제대로 즐기다 오실분! 우당탕탕 축제 참여형
          </p>
          <p className="text-md text-color-gray-500 pl-[18px] font-medium pb-[18px] border-b border-color-line-200 mb-[18px] tablet:pl-0 tablet:text-sm mobile:px-0 mobile:text-sm">
            김인서 고객님
          </p>
          <div className=" grid grid-cols-2 gap-[0px]">
            <div className="flex items-center gap-[4px] col-span-2 mb-2 pl-[18px] tablet:gap-[8px] tablet:pl-0 mobile:pl-0 mobile:text-sm">
              <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap tablet:text-md mobile:text-md">
                이사일
              </p>
              <p className="text-[18px] medium leading-[26px] text-color-black-300 mobile:text-md tablet:text-md">
                2024.07.01(월)
              </p>
            </div>
            <div className="flex items-center gap-[12px] border-r border-color-line-200  pl-[18px] tablet:pl-0 mobile:pl-0 mobile:text-sm">
              <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md tablet:text-md">
                출발
              </p>
              <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile:text-md tablet:text-md">
                서울 강남구
              </p>
            </div>
            <div className="flex items-center gap-[12px] pl-[14px]">
              <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
                도착
              </p>
              <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile:text-md tablet:text-md">
                경기도 수원시
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[64px] tablet:mb-[40px] mobile:mb-[40px]">
        <p className="text-2xl font-semibold">견적가를 입력해 주세요</p>
        <input
          type="number"
          placeholder="견적가 입력"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-[560px] h-[64x] bg-color-background-200 rounded-[16px] p-[14px] mt-[16px] text-xl tablet:w-[327px] tablet:h-[54px] tablet:text-lg mobile:w-[327px] mobile:h-[48px] mobile:text-lg"
        />
      </div>
      <div className="mb-[40px] tablet:mb-[24px] mobile:mb-[24px]">
        <p className="text-2xl font-semibold">코멘트를 입력해 주세요</p>
        <textarea
          placeholder="최소 10글자 이상 입력해 주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-[560px] h-[160px] bg-color-background-200 rounded-[16px] p-[14px] mt-[16px] text-xl resize-none tablet:w-[327px] tablet:h-[160px] tablet:text-lg mobile:w-[327px] mobile:h-[160px] mobile:text-lg"
        />
      </div>
      <button
        className={`rounded-[16px] w-[560px] h-[64px] text-white font-semibold text-[20px] leading-[32px] ${
          isButtonEnabled ? "bg-color-blue-300" : "bg-color-gray-100 cursor-not-allowed"
        } tablet:w-[327px] tablet:h-[54px] tablet:text-lg mobile:w-[327px] mobile:h-[48px] mobile:text-lg`}
        disabled={!isButtonEnabled}
      >
        견적 보내기
      </button>
    </>
  );
}
