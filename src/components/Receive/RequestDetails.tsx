import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";

export default function RequestDetails() {
  return (
    <div className="flex flex-col mb-[32px]">
      <div className="flex justify-between items-center text-xs text-color-gray-500 mb-[16px]">
        <div className="flex justify-center items-center gap-[12px]">
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
        <div className="">1 시간전</div>
      </div>
      <div>
        <p className="text-xl font-semibold">일본도쿄여행 혼자서 외롭게 다녀오실분~</p>
        <p className="text-md font-medium pb-[18px] border-b border-color-line-200 mb-[18px] ">
          김인서 고객님
        </p>
        <div className="flex items-center gap-[12px] mobile:grid mobile:grid-cols-2 mobile:gap-[0px]">
          <div className="flex items-center gap-[4px] mobile:col-span-2 mobile:mb-2">
            <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
              이사일
            </p>
            <p className="text-[18px] medium leading-[26px] text-color-black-300 mobile:text-md">
              2024.07.01(월)
            </p>
          </div>
          <p className="text-color-line-200 mobile:hidden">ㅣ</p>
          <div className="flex items-center gap-[12px] mobile:border-r mobile:border-color-line-200 mobile:pr-[2px]">
            <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
              출발
            </p>
            <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile:text-md">
              서울 강남구
            </p>
          </div>
          <p className="text-color-line-200 mobile:hidden">ㅣ</p>
          <div className="flex items-center gap-[12px] mobile:pl-[7px]">
            <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
              도착
            </p>
            <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile:text-md">
              경기도 수원시
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
