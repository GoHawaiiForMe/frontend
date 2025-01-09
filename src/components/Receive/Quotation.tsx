import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";

export default function Quotation() {
  return (
    <>
      <div>
        <div className="flex  items-center gap-[12px]">
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
        <div className="mt-[24px] py-[24px] border border-color-line-200 rounded-[8px] mb-[32px]">
          <p className="text-2xl pl-[18px] font-semibold ">일본도쿄여행 혼자서 외롭게 다녀오실분~</p>
          <p className="text-md pl-[18px] font-medium pb-[18px] border-b border-color-line-200 mb-[18px] ">
            김인서 고객님
          </p>
          <div className=" grid grid-cols-2 gap-[0px]">
            <div className="flex items-center gap-[4px] col-span-2 mb-2 pl-[18px]">
              <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
                이사일
              </p>
              <p className="text-[18px] medium leading-[26px] text-color-black-300 mobile:text-md">
                2024.07.01(월)
              </p>
            </div>
            <div className="flex items-center gap-[12px] border-r border-color-line-200  pl-[18px]">
              <p className="text-[18px] font-normal leading-[26px] text-color-gray-500 bg-color-background-400 rounded-[4px] px-[6px] py-[4px] whitespace-nowrap mobile:text-md">
                출발
              </p>
              <p className="text-[18px] font-medium leading-[26px] whitespace-nowrap text-color-black-300 mobile:text-md">
                서울 강남구
              </p>
            </div>
            <div className="flex items-center gap-[12px] pl-[14px]">
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
      <div>
        <p className="text-2xl font-semibold">견적가를 입력해 주세요</p>
        <input type="number" placeholder="견적가 입력" className="w-[560px] h-[64x] rounded-[16px] p-[14px] mt-[16px] text-md" />
      </div>
    </>
  );
}
