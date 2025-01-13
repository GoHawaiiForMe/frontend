import Image from "next/image";
import iconBox from "@public/assets/icon_boximg.png";
import iconDocument from "@public/assets/icon_document.png";

export default function RequestDetails() {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center text-xs text-color-gray-500 mb-4">
        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center gap-1 bg-color-blue-100 rounded-1 p-1">
            <Image src={iconBox} alt="box" width={24} height={24} className="w-[20px] h-[20px]" />
            <p className="text-2lg font-semibold text-color-blue-300 mobile:text-sm">
              축제 참여형
            </p>
          </div>
          <div className="flex items-center gap-1 bg-color-red-100 rounded-1 p-1">
            <Image
              src={iconDocument}
              alt="document"
              width={24}
              height={24}
              className="w-[20px] h-[20px]"
            />
            <p className="text-2lg font-semibold text-color-red-200 mobile:text-sm">
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
        <div className="flex items-center gap-1 mobile:grid mobile:grid-cols-2 mobile:gap-[0px]">
          <div className="flex items-center gap-1 mobile:col-span-2 mobile:mb-2">
            <p className="text-2lg font-normal  text-color-gray-500 bg-color-background-400 rounded-1 px-[6px] py-1 whitespace-nowrap mobile:text-md">
              여행일
            </p>
            <p className="text-2lg medium  text-color-black-300 mobile:text-md">
              2024.07.01(월)
            </p>
          </div>
          <p className="text-color-line-200 mobile:hidden">ㅣ</p>
          <div className="flex items-center gap-3 ">
            <p className="text-2lg font-normal text-color-gray-500 bg-color-background-400 rounded-1 px-[6px] py-1 whitespace-nowrap mobile:text-md">
              여행지
            </p>
            <p className="text-2lg font-medium whitespace-nowrap text-color-black-300 mobile:text-md">
              서울 강남구
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
